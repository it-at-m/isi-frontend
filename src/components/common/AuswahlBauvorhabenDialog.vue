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
          :disabled="!isResultSelected"
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
 * in einer gemeinsamen Liste für das Autocomplete-Feld zusammen.
 *
 * Die Liste enthält:
 * - Suchvorschläge, die den Suchtext ergänzen
 * - echte Bauvorhaben-Ergebnisse, die übernommen werden können
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
 * Prüft, ob aktuell ein echtes Bauvorhaben-Ergebnis ausgewählt ist.
 *
 * Suchvorschläge zählen dabei nicht als gültige Auswahl.
 */
const isResultSelected = computed<boolean>(() => selectedItem.value?.type === "result");

/**
 * Erstellt die grundlegende Suchanfrage für Bauvorhaben.
 *
 * Der Filter ist fest auf Bauvorhaben gesetzt.
 * Andere Objektarten werden bewusst ausgeschlossen.
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
 * Suchvorschläge sind mögliche Ergänzungen des aktuell eingegebenen Begriffs.
 * Damit langsame ältere Antworten keine neueren Ergebnisse überschreiben,
 * wird mit einer Request-ID gearbeitet.
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
 * Lädt die tatsächlichen Bauvorhaben-Ergebnisse für den aktuellen Suchtext.
 *
 * Zusätzlich zur Backend-Suche werden die Ergebnisse im Frontend
 * noch einmal nach dem Namen des Bauvorhabens gefiltert.
 * Dadurch werden nur Einträge angezeigt, deren Name den Suchtext
 * tatsächlich enthält.
 *
 * Damit langsame ältere Antworten keine neueren Ergebnisse überschreiben,
 * wird mit einer Request-ID gearbeitet.
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

    const normalizedQuery = trimmedQuery.toLowerCase();

    bauvorhaben.value =
      result.searchResults
        ?.map((entry) => entry as BauvorhabenSearchResultDto)
        .filter((entry) => (entry.nameVorhaben ?? "").toLowerCase().includes(normalizedQuery)) ?? [];
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
 * Die Suchaufrufe werden nicht bei jedem einzelnen Tastendruck sofort ausgeführt,
 * sondern zeitverzögert gesammelt.
 *
 * "Debounced" bedeutet hier:
 * Die Funktion wird erst kurz nach der letzten Eingabe ausgeführt.
 * Wenn der Benutzer schnell weitertippt, wird der vorherige geplante Aufruf
 * verworfen und durch einen neuen ersetzt.
 *
 * Das reduziert unnötige Server-Anfragen und verbessert die Performance.
 *
 * Wenn zuvor ein echtes Ergebnis ausgewählt war und der Benutzer danach
 * wieder frei tippt, wird diese Auswahl verworfen.
 *
 * @param query Der aktuelle Inhalt des Suchfelds.
 */
function handleSearchInput(query: string): void {
  searchQuery.value = query;

  if (_.isEmpty(_.trim(query))) {
    clearSearch();
    return;
  }

  if (selectedItem.value?.type === "result" && selectedItem.value.label !== query) {
    selectedItem.value = null;
  }

  debouncedSuggest(query);
  debouncedSearch(query);
}

/**
 * Reagiert auf das Drücken der Enter-Taste.
 *
 * Wenn bereits ein echtes Bauvorhaben ausgewählt wurde,
 * wird dieses direkt übernommen.
 *
 * Wenn noch nichts Konkretes ausgewählt wurde, aber Ergebnisse vorhanden sind,
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
  searchQuery.value = firstResult.label;
}

/**
 * Setzt nur den internen Suchzustand der Komponente zurück.
 *
 * Dabei bleiben bereits im Parent übernommene Daten erhalten.
 * Diese Methode wird verwendet, wenn der Dialog geschlossen wird,
 * ohne dass der bereits gespeicherte Parent-Wert gelöscht werden soll.
 */
function resetSearchState(): void {
  debouncedSuggest.cancel();
  debouncedSearch.cancel();

  searchQuery.value = "";
  selectedItem.value = null;
  suggestions.value = [];
  bauvorhaben.value = [];
  loading.value = false;
  loadingSuggestions.value = false;

  currentSearchRequestId++;
  currentSuggestionRequestId++;
}

/**
 * Setzt den kompletten Zustand der Suche zurück.
 *
 * Zusätzlich zum Suchzustand wird auch der an den Parent
 * gebundene Bauvorhaben-Wert entfernt.
 * Diese Methode wird verwendet, wenn die Auswahl bewusst verworfen werden soll,
 * zum Beispiel beim Klick auf "Abbrechen" oder beim Leeren der Eingabe.
 */
function clearSearch(): void {
  resetSearchState();
  selectedBauvorhabenId.value = undefined;
}

/**
 * Bricht die Auswahl ab.
 *
 * Dabei wird der komplette Zustand zurückgesetzt
 * und der Dialog anschließend geschlossen.
 */
function abbrechen(): void {
  clearSearch();
  dialogOpen.value = false;
}

/**
 * Übernimmt das aktuell ausgewählte Bauvorhaben
 * in das an den Parent gebundene Modell
 * und schließt anschließend den Dialog.
 *
 * Ein Schließen erfolgt nur dann,
 * wenn tatsächlich ein echtes Bauvorhaben-Ergebnis ausgewählt wurde.
 */
function uebernehmen(): void {
  if (selectedItem.value?.type !== "result") {
    return;
  }

  selectedBauvorhabenId.value = selectedItem.value.value;
  dialogOpen.value = false;
}

/**
 * Beobachtet, ob der Dialog geöffnet oder geschlossen ist.
 *
 * Beim Öffnen wird das Suchfeld automatisch fokussiert.
 * Beim Schließen wird nur der interne Suchzustand zurückgesetzt,
 * der bereits übernommene Parent-Wert bleibt dabei erhalten.
 *
 * @param isOpen Gibt an, ob der Dialog aktuell geöffnet ist.
 */
watch(dialogOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    bauvorhabenSuchField.value?.focus?.();
    return;
  }

  resetSearchState();
});

/**
 * Wird aufgerufen, bevor die Komponente aus dem DOM entfernt wird.
 *
 * Hier werden laufende zeitverzögerte Suchaufrufe und der interne Zustand
 * sauber beendet bzw. zurückgesetzt.
 *
 * Das verhindert, dass verspätete Antworten noch versuchen,
 * auf eine bereits entfernte Komponente zuzugreifen.
 */
onBeforeUnmount(() => {
  isComponentActive = false;
  resetSearchState();
});
</script>
