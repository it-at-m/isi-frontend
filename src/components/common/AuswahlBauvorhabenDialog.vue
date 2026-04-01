<template>
  <v-dialog
    v-model="dialogOpen"
    persistent
    max-width="720"
  >
    <v-card
      class="rounded-xl"
      elevation="8"
    >
      <v-card-title class="px-6 pt-6 pb-2 text-h6"> Mit Bauvorhaben verknüpfen </v-card-title>

      <v-card-text class="px-6 pb-2">
        <v-autocomplete
          ref="bauvorhabenSuchField"
          v-model="selectedItem"
          v-model:search="searchQuery"
          :items="combinedItems"
          :loading="loading || loadingSuggestions"
          item-title="label"
          return-object
          clearable
          no-filter
          hide-details="auto"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          label="Bauvorhaben suchen"
          prepend-inner-icon="mdi-magnify"
          @update:search="handleSearchInput"
          @update:model-value="handleSelection"
          @keydown.enter.prevent="handleEnter"
          @click:clear="clearSearch"
        >
          <template #item="{ props, item }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.type === 'suggestion' ? 'mdi-magnify' : 'mdi-office-building'"
              :subtitle="item.type === 'suggestion' ? 'Suchvorschlag' : 'Bauvorhaben'"
              :title="item.label"
            />
          </template>

          <template #no-data>
            <v-list-item>
              <v-list-item-title>Keine Ergebnisse</v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-card-text>

      <v-card-actions class="px-6 pb-6 pt-4">
        <v-spacer />
        <v-btn
          variant="text"
          @click="abbrechen"
        >
          Abbrechen
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!selectedBauvorhabenId"
          @click="uebernehmen"
        >
          Übernehmen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import _ from "lodash";
import {
  type BauvorhabenSearchResultDto,
  type SearchQueryDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import { useSearchApi } from "@/composables/requests/search/SearchApi";

type AutocompleteItem = {
  label: string;
  value: string;
  type: "suggestion" | "result";
};

const dialogOpen = defineModel<boolean>({ required: true });
const selectedBauvorhabenId = defineModel<string | undefined>("selectedBauvorhabenId");

const { searchForEntities, searchForSearchwordSuggestion } = useSearchApi();

const bauvorhabenSuchField = ref();
const searchQuery = ref("");
const selectedItem = ref<AutocompleteItem | null>(null);

const suggestions = ref<string[]>([]);
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);

const loading = ref(false);
const loadingSuggestions = ref(false);

let currentSearchRequestId = 0;
let currentSuggestionRequestId = 0;
let isComponentActive = true;

/**
 * Führt Suchvorschläge und echte Bauvorhaben-Ergebnisse
 * zu einer gemeinsamen Liste für das Autocomplete-Feld zusammen.
 *
 * Die Liste enthält zwei Arten von Einträgen:
 * - Suchvorschläge, die nur den eingegebenen Suchtext ergänzen
 * - echte Bauvorhaben-Ergebnisse, die ausgewählt und übernommen werden können
 *
 * Doppelte Einträge werden entfernt.
 */
const combinedItems = computed<AutocompleteItem[]>(() => {
  const suggestionItems: AutocompleteItem[] = suggestions.value.map((suggestion) => ({
    label: suggestion,
    value: suggestion,
    type: "suggestion",
  }));

  const resultItems: AutocompleteItem[] = bauvorhaben.value
    .filter((entry) => !_.isEmpty(entry.id) && !_.isEmpty(entry.nameVorhaben))
    .map((entry) => ({
      label: entry.nameVorhaben ?? "",
      value: entry.id ?? "",
      type: "result",
    }));

  return _.uniqBy([...suggestionItems, ...resultItems], (item) => `${item.type}-${item.value}`);
});

/**
 * Erstellt die grundlegende Suchanfrage für die Suche nach Bauvorhaben.
 *
 * Der Filter ist fest auf Bauvorhaben gesetzt. Andere Objektarten
 * wie Verfahren oder Schulen werden hier bewusst ausgeschlossen.
 *
 * @param searchText Der Text, nach dem gesucht werden soll.
 * @returns Eine Suchanfrage, die nur auf Bauvorhaben eingeschränkt ist.
 */
function createQuery(searchText: string): SearchQueryDto {
  return {
    searchQuery: searchText,
    selectBauvorhaben: true,
    selectBauleitplanverfahren: false,
    selectBaugenehmigungsverfahren: false,
    selectWeiteresVerfahren: false,
    selectGrundschule: false,
    selectGsNachmittagBetreuung: false,
    selectHausFuerKinder: false,
    selectKindergarten: false,
    selectKinderkrippe: false,
    selectMittelschule: false,
    page: undefined,
    pageSize: undefined,
  } as SearchQueryDto;
}

/**
 * Erstellt eine vollständige Suchanfrage für Bauvorhaben
 * inklusive Seitengröße und Sortierung.
 *
 * Zusätzlich zur normalen Suchanfrage wird hier festgelegt,
 * dass die Ergebnisse in Seiten geladen und nach dem letzten Änderungszeitpunkt
 * absteigend sortiert werden.
 *
 * @param searchText Der Text, nach dem gesucht werden soll.
 * @returns Eine vollständige Suchanfrage mit Paging und Sortierung.
 */
function createQueryFull(searchText: string) {
  return {
    ...createQuery(searchText),
    page: 1,
    pageSize: 20,
    sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
  };
}

/**
 * Lädt Suchvorschläge für den aktuell eingegebenen Suchtext.
 *
 * Suchvorschläge sind mögliche Ergänzungen oder Fortsetzungen
 * des aktuell eingegebenen Begriffs.
 *
 * Damit ältere, langsamer zurückkommende Server-Antworten keine neueren Ergebnisse
 * überschreiben, wird mit einer Request-ID gearbeitet:
 * Nur die zuletzt gestartete Anfrage darf das Ergebnis setzen.
 *
 * @param query Der aktuelle Suchtext aus dem Eingabefeld.
 * @returns Ein Promise, das abgeschlossen ist, sobald die Vorschläge verarbeitet wurden.
 */
async function suggest(query: string): Promise<void> {
  const trimmedQuery = _.trim(query);
  const requestId = ++currentSuggestionRequestId;

  if (_.isEmpty(trimmedQuery)) {
    suggestions.value = [];
    return;
  }

  loadingSuggestions.value = true;

  try {
    const result = await searchForSearchwordSuggestion(createQuery(trimmedQuery));

    if (!isComponentActive || requestId !== currentSuggestionRequestId) {
      return;
    }

    const foundSuggestions = _.toArray(result.suchwortSuggestions ?? []);
    suggestions.value = _.uniq([trimmedQuery, ...foundSuggestions]);
  } finally {
    if (isComponentActive && requestId === currentSuggestionRequestId) {
      loadingSuggestions.value = false;
    }
  }
}

/**
 * Lädt die tatsächlichen Bauvorhaben-Ergebnisse für den aktuell eingegebenen Suchtext.
 *
 * Im Unterschied zu den Suchvorschlägen werden hier echte Treffer geladen,
 * die später übernommen werden können.
 *
 * Auch hier wird mit einer Request-ID sichergestellt,
 * dass nur die Antwort der zuletzt gestarteten Suche verwendet wird.
 *
 * @param query Der aktuelle Suchtext aus dem Eingabefeld.
 * @returns Ein Promise, das abgeschlossen ist, sobald die Suchergebnisse verarbeitet wurden.
 */
async function search(query: string): Promise<void> {
  const trimmedQuery = _.trim(query);
  const requestId = ++currentSearchRequestId;

  if (_.isEmpty(trimmedQuery)) {
    bauvorhaben.value = [];
    return;
  }

  loading.value = true;

  try {
    const result = await searchForEntities(createQueryFull(trimmedQuery));

    if (!isComponentActive || requestId !== currentSearchRequestId) {
      return;
    }

    bauvorhaben.value = result.searchResults?.map((entry) => entry as BauvorhabenSearchResultDto) ?? [];
  } finally {
    if (isComponentActive && requestId === currentSearchRequestId) {
      loading.value = false;
    }
  }
}

const debouncedSuggest = _.debounce((query: string) => {
  void suggest(query);
}, 200);

const debouncedSearch = _.debounce((query: string) => {
  void search(query);
}, 300);

/**
 * Reagiert auf Änderungen im Suchfeld.
 *
 * Wenn der Benutzer tippt, wird nicht bei jedem einzelnen Tastendruck sofort
 * eine Server-Anfrage ausgelöst. Stattdessen wird die Suche "verzögert gebündelt".
 *
 * "Debounced" bedeutet in diesem Zusammenhang:
 * Eine Funktion wird erst kurz nach der letzten Eingabe ausgeführt.
 * Tippt der Benutzer schnell weiter, wird der vorherige geplante Aufruf verworfen
 * und durch einen neuen ersetzt.
 *
 * Das verhindert unnötig viele Anfragen und verbessert die Performance.
 *
 * Diese Methode startet deshalb zeitverzögert:
 * - die Suche nach Suchvorschlägen
 * - die Suche nach echten Bauvorhaben-Ergebnissen
 *
 * @param query Der aktuelle Inhalt des Suchfelds.
 */
function handleSearchInput(query: string): void {
  searchQuery.value = query;

  if (_.isEmpty(_.trim(query))) {
    clearSearch();
    return;
  }

  selectedBauvorhabenId.value = undefined;
  debouncedSuggest(query);
  debouncedSearch(query);
}

/**
 * Verarbeitet die Auswahl eines Eintrags aus dem Autocomplete-Feld.
 *
 * Es wird zwischen zwei Fällen unterschieden:
 * - Ergebnis: Ein echtes Bauvorhaben wurde ausgewählt.
 *   In diesem Fall wird dessen ID gespeichert.
 * - Suchvorschlag: Es wurde nur ein vorgeschlagener Suchtext ausgewählt.
 *   In diesem Fall wird noch kein Bauvorhaben übernommen,
 *   sondern eine neue Suche mit diesem Text gestartet.
 *
 * @param item Der ausgewählte Eintrag aus dem Autocomplete-Feld.
 *             Kann auch null sein, wenn die Auswahl entfernt wurde.
 */
function handleSelection(item: AutocompleteItem | null): void {
  selectedItem.value = item;

  if (_.isNil(item)) {
    selectedBauvorhabenId.value = undefined;
    return;
  }

  if (item.type === "result") {
    selectedBauvorhabenId.value = item.value;
    searchQuery.value = item.label;
    return;
  }

  searchQuery.value = item.label;
  selectedBauvorhabenId.value = undefined;
  debouncedSuggest(item.label);
  debouncedSearch(item.label);
}

/**
 * Reagiert auf das Drücken der Enter-Taste im Suchfeld.
 *
 * Wenn bereits ein echtes Bauvorhaben ausgewählt wurde,
 * wird dieses direkt übernommen.
 *
 * Wenn noch nichts Konkretes ausgewählt wurde, aber Suchergebnisse vorhanden sind,
 * wird automatisch das erste gefundene Bauvorhaben ausgewählt.
 */
function handleEnter(): void {
  if (selectedItem.value?.type === "result") {
    uebernehmen();
    return;
  }

  const firstResult = combinedItems.value.find((item) => item.type === "result");
  if (!firstResult) {
    return;
  }

  selectedItem.value = firstResult;
  selectedBauvorhabenId.value = firstResult.value;
  searchQuery.value = firstResult.label;
}

/**
 * Setzt den gesamten Suchzustand der Komponente zurück.
 *
 * Dabei werden:
 * - laufende zeitverzögerte Funktionsaufrufe abgebrochen
 * - der Suchtext geleert
 * - die aktuelle Auswahl entfernt
 * - Vorschläge und Ergebnisse gelöscht
 * - Ladezustände zurückgesetzt
 *
 * Zusätzlich werden die internen Request-IDs erhöht,
 * damit verspätet eintreffende Antworten alter Suchanfragen ignoriert werden.
 */
function clearSearch(): void {
  debouncedSuggest.cancel();
  debouncedSearch.cancel();

  searchQuery.value = "";
  selectedItem.value = null;
  suggestions.value = [];
  bauvorhaben.value = [];
  selectedBauvorhabenId.value = undefined;
  loading.value = false;
  loadingSuggestions.value = false;

  currentSearchRequestId++;
  currentSuggestionRequestId++;
}

/**
 * Bricht die Auswahl ab.
 *
 * Dabei wird zuerst der interne Zustand der Suche zurückgesetzt
 * und danach der Dialog geschlossen.
 */
function abbrechen(): void {
  clearSearch();
  dialogOpen.value = false;
}

/**
 * Übernimmt das aktuell ausgewählte Bauvorhaben
 * und schließt anschließend den Dialog.
 *
 * Ein Schließen erfolgt nur dann,
 * wenn tatsächlich eine Bauvorhaben-ID ausgewählt wurde.
 */
function uebernehmen(): void {
  if (!selectedBauvorhabenId.value) {
    return;
  }
  dialogOpen.value = false;
}

/**
 * Beobachtet, ob der Dialog geöffnet oder geschlossen ist.
 *
 * Beim Öffnen wird das Suchfeld automatisch fokussiert,
 * damit der Benutzer direkt mit der Eingabe beginnen kann.
 *
 * Beim Schließen wird die Suche vollständig zurückgesetzt,
 * damit der Dialog beim nächsten Öffnen wieder in einem sauberen Zustand startet.
 *
 * @param isOpen Gibt an, ob der Dialog aktuell geöffnet ist.
 */
watch(dialogOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    bauvorhabenSuchField.value?.focus?.();
    return;
  }

  clearSearch();
});

/**
 * Wird aufgerufen, bevor die Komponente aus dem DOM entfernt wird.
 *
 * Hier werden noch laufende, zeitverzögerte Suchaufrufe sowie der interne Zustand
 * sauber beendet bzw. zurückgesetzt.
 *
 * Das verhindert, dass verspätete Antworten oder nachträgliche Aufrufe
 * noch versuchen, auf eine bereits entfernte Komponente zuzugreifen.
 */
onBeforeUnmount(() => {
  isComponentActive = false;
  clearSearch();
});
</script>
