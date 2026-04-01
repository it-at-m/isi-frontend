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
          v-model="selectedValue"
          v-model:search="searchQuery"
          :items="combinedItems"
          :loading="loading || loadingSuggestions"
          item-title="label"
          item-value="value"
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
              :prepend-icon="item.raw.type === 'suggestion' ? 'mdi-magnify' : 'mdi-office-building'"
              :subtitle="item.raw.type === 'suggestion' ? 'Suchvorschlag' : 'Bauvorhaben'"
              :title="item.raw.label"
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
const selectedValue = ref<string | null>(null);

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
 * Für Suchvorschläge wird ein technischer Präfix im Wert verwendet,
 * damit sie nicht mit echten Bauvorhaben-IDs verwechselt werden.
 */
const combinedItems = computed<AutocompleteItem[]>(() => {
  const suggestionItems: AutocompleteItem[] = suggestions.value.map((suggestion) => ({
    label: suggestion,
    value: `suggestion::${suggestion}`,
    type: "suggestion",
  }));

  const resultItems: AutocompleteItem[] = bauvorhaben.value
    .filter((entry) => !_.isEmpty(entry.id) && !_.isEmpty(entry.nameVorhaben))
    .map((entry) => ({
      label: entry.nameVorhaben ?? "",
      value: entry.id ?? "",
      type: "result",
    }));

  return _.uniqBy([...suggestionItems, ...resultItems], (item) => item.value);
});

/**
 * Prüft, ob aktuell ein echtes Bauvorhaben-Ergebnis ausgewählt ist.
 */
const isResultSelected = computed<boolean>(() => {
  if (_.isEmpty(selectedValue.value)) {
    return false;
  }

  return combinedItems.value.some((item) => item.value === selectedValue.value && item.type === "result");
});

/**
 * Ermittelt das aktuell ausgewählte echte Bauvorhaben-Ergebnis.
 */
const selectedResultItem = computed<AutocompleteItem | undefined>(() => {
  if (_.isEmpty(selectedValue.value)) {
    return undefined;
  }

  return combinedItems.value.find((item) => item.value === selectedValue.value && item.type === "result");
});

/**
 * Erstellt die grundlegende Suchanfrage für Bauvorhaben.
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
 * @param query Der aktuelle Inhalt des Suchfelds.
 */
function handleSearchInput(query: string): void {
  searchQuery.value = query;

  if (_.isEmpty(_.trim(query))) {
    resetSearchState();
    return;
  }

  if (selectedResultItem.value && selectedResultItem.value.label !== query) {
    selectedValue.value = null;
  }

  debouncedSuggest(query);
  debouncedSearch(query);
}

/**
 * Verarbeitet die Auswahl eines Eintrags aus dem Autocomplete-Feld.
 *
 * Bei einem Suchvorschlag wird nur der Suchtext übernommen
 * und direkt eine neue Suche ausgelöst.
 *
 * Bei einem echten Ergebnis bleibt die ausgewählte Bauvorhaben-ID stabil erhalten.
 *
 * @param value Der technische Wert des ausgewählten Eintrags.
 */
function handleSelection(value: string | null): void {
  selectedValue.value = value;

  if (_.isEmpty(value)) {
    return;
  }

  if (value.startsWith("suggestion::")) {
    const suggestionText = value.replace("suggestion::", "");
    searchQuery.value = suggestionText;
    selectedValue.value = null;
    debouncedSuggest(suggestionText);
    debouncedSearch(suggestionText);
  }
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
  if (isResultSelected.value) {
    uebernehmen();
    return;
  }

  const firstResult = combinedItems.value.find((item) => item.type === "result");
  if (!firstResult) {
    return;
  }

  selectedValue.value = firstResult.value;
  searchQuery.value = firstResult.label;
}

/**
 * Setzt nur den internen Suchzustand der Komponente zurück.
 *
 * Dabei bleiben bereits im Parent übernommene Daten erhalten.
 */
function resetSearchState(): void {
  debouncedSuggest.cancel();
  debouncedSearch.cancel();

  searchQuery.value = "";
  selectedValue.value = null;
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
 */
function uebernehmen(): void {
  if (!selectedResultItem.value) {
    return;
  }

  selectedBauvorhabenId.value = selectedResultItem.value.value;
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
 */
onBeforeUnmount(() => {
  isComponentActive = false;
  resetSearchState();
});
</script>
