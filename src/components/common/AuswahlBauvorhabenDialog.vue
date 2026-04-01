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
 */
const isResultSelected = computed<boolean>(() => selectedItem.value?.type === "result");

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

  console.log("[Dialog] suggest START", {
    query,
    trimmedQuery,
    requestId,
    currentSuggestionRequestId,
  });

  if (_.isEmpty(trimmedQuery)) {
    suggestions.value = [];
    console.log("[Dialog] suggest ABORT - empty query");
    return;
  }

  loadingSuggestions.value = true;

  try {
    const result = await searchForSearchwordSuggestion(createQuery(trimmedQuery));

    console.log("[Dialog] suggest RESPONSE", {
      requestId,
      currentSuggestionRequestId,
      isComponentActive,
      suchwortSuggestions: result.suchwortSuggestions,
    });

    if (!isComponentActive || requestId !== currentSuggestionRequestId) {
      console.log("[Dialog] suggest IGNORED", {
        requestId,
        currentSuggestionRequestId,
        isComponentActive,
      });
      return;
    }

    const foundSuggestions = _.toArray(result.suchwortSuggestions ?? []);
    suggestions.value = _.uniq([trimmedQuery, ...foundSuggestions]);

    console.log("[Dialog] suggest APPLIED", {
      suggestions: suggestions.value,
    });
  } finally {
    if (isComponentActive && requestId === currentSuggestionRequestId) {
      loadingSuggestions.value = false;
    }

    console.log("[Dialog] suggest END", {
      loadingSuggestions: loadingSuggestions.value,
      requestId,
      currentSuggestionRequestId,
    });
  }
}

/**
 * Lädt die tatsächlichen Bauvorhaben-Ergebnisse für den aktuellen Suchtext.
 *
 * @param query Der aktuelle Suchtext aus dem Eingabefeld.
 * @returns Ein Promise, das abgeschlossen ist, sobald die Suchergebnisse verarbeitet wurden.
 */
async function search(query: string): Promise<void> {
  const trimmedQuery = _.trim(query);
  const requestId = ++currentSearchRequestId;

  console.log("[Dialog] search START", {
    query,
    trimmedQuery,
    requestId,
    currentSearchRequestId,
  });

  if (_.isEmpty(trimmedQuery)) {
    bauvorhaben.value = [];
    console.log("[Dialog] search ABORT - empty query");
    return;
  }

  loading.value = true;

  try {
    const result = await searchForEntities(createQueryFull(trimmedQuery));

    console.log("[Dialog] search RESPONSE", {
      requestId,
      currentSearchRequestId,
      isComponentActive,
      rawResults: result.searchResults,
    });

    if (!isComponentActive || requestId !== currentSearchRequestId) {
      console.log("[Dialog] search IGNORED", {
        requestId,
        currentSearchRequestId,
        isComponentActive,
      });
      return;
    }

    const normalizedQuery = trimmedQuery.toLowerCase();

    bauvorhaben.value =
      result.searchResults
        ?.map((entry) => entry as BauvorhabenSearchResultDto)
        .filter((entry) => (entry.nameVorhaben ?? "").toLowerCase().includes(normalizedQuery)) ?? [];

    console.log("[Dialog] search APPLIED", {
      normalizedQuery,
      filteredResults: bauvorhaben.value,
    });
  } finally {
    if (isComponentActive && requestId === currentSearchRequestId) {
      loading.value = false;
    }

    console.log("[Dialog] search END", {
      loading: loading.value,
      requestId,
      currentSearchRequestId,
    });
  }
}

const debouncedSuggest = _.debounce((query: string) => {
  console.log("[Dialog] debouncedSuggest FIRE", { query });
  void suggest(query);
}, 200);

const debouncedSearch = _.debounce((query: string) => {
  console.log("[Dialog] debouncedSearch FIRE", { query });
  void search(query);
}, 300);

/**
 * Reagiert auf Änderungen im Suchfeld.
 *
 * @param query Der aktuelle Inhalt des Suchfelds.
 */
function handleSearchInput(query: string): void {
  console.log("[Dialog] handleSearchInput BEFORE", {
    query,
    searchQuery: searchQuery.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
  });

  searchQuery.value = query;

  if (_.isEmpty(_.trim(query))) {
    console.log("[Dialog] handleSearchInput -> clearSearch");
    clearSearch();
    return;
  }

  if (selectedItem.value?.type === "result" && selectedItem.value.label !== query) {
    console.log("[Dialog] handleSearchInput reset selectedItem", {
      previousSelectedItem: selectedItem.value,
      reason: "query differs from selected result label",
    });
    selectedItem.value = null;
  }

  debouncedSuggest(query);
  debouncedSearch(query);

  console.log("[Dialog] handleSearchInput AFTER", {
    searchQuery: searchQuery.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
  });
}

/**
 * Reagiert auf das Drücken der Enter-Taste.
 */
function handleEnter(): void {
  console.log("[Dialog] handleEnter BEFORE", {
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
    combinedItems: combinedItems.value,
    searchQuery: searchQuery.value,
  });

  if (selectedItem.value?.type === "result") {
    console.log("[Dialog] handleEnter -> uebernehmen existing result");
    uebernehmen();
    return;
  }

  const firstResult = combinedItems.value.find((item) => item.type === "result");
  if (!firstResult) {
    console.log("[Dialog] handleEnter ABORT - no result found");
    return;
  }

  selectedItem.value = firstResult;
  searchQuery.value = firstResult.label;

  console.log("[Dialog] handleEnter AFTER", {
    selectedItem: selectedItem.value,
    searchQuery: searchQuery.value,
  });
}

/**
 * Setzt nur den internen Suchzustand der Komponente zurück.
 */
function resetSearchState(): void {
  console.log("[Dialog] resetSearchState BEFORE", {
    searchQuery: searchQuery.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
    suggestions: suggestions.value,
    bauvorhaben: bauvorhaben.value,
  });

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

  console.log("[Dialog] resetSearchState AFTER", {
    searchQuery: searchQuery.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
    currentSearchRequestId,
    currentSuggestionRequestId,
  });
}

/**
 * Setzt den kompletten Zustand der Suche zurück.
 */
function clearSearch(): void {
  console.log("[Dialog] clearSearch BEFORE", {
    searchQuery: searchQuery.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
  });

  resetSearchState();
  selectedBauvorhabenId.value = undefined;

  console.log("[Dialog] clearSearch AFTER", {
    searchQuery: searchQuery.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
  });
}

/**
 * Bricht die Auswahl ab.
 */
function abbrechen(): void {
  console.log("[Dialog] abbrechen BEFORE", {
    dialogOpen: dialogOpen.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
  });

  clearSearch();
  dialogOpen.value = false;

  console.log("[Dialog] abbrechen AFTER", {
    dialogOpen: dialogOpen.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
  });
}

/**
 * Übernimmt das aktuell ausgewählte Bauvorhaben.
 */
function uebernehmen(): void {
  console.log("[Dialog] uebernehmen BEFORE", {
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
    dialogOpen: dialogOpen.value,
    searchQuery: searchQuery.value,
  });

  if (selectedItem.value?.type !== "result") {
    console.log("[Dialog] uebernehmen ABORT - kein result ausgewählt");
    return;
  }

  selectedBauvorhabenId.value = selectedItem.value.value;
  dialogOpen.value = false;

  console.log("[Dialog] uebernehmen AFTER", {
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
    dialogOpen: dialogOpen.value,
  });
}

/**
 * Beobachtet, ob der Dialog geöffnet oder geschlossen ist.
 *
 * @param isOpen Gibt an, ob der Dialog aktuell geöffnet ist.
 */
watch(dialogOpen, async (isOpen) => {
  console.log("[Dialog] watch dialogOpen", {
    isOpen,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
    searchQuery: searchQuery.value,
  });

  if (isOpen) {
    await nextTick();
    bauvorhabenSuchField.value?.focus?.();
    console.log("[Dialog] watch dialogOpen -> focused search field");
    return;
  }

  resetSearchState();
});

/**
 * Beobachtet die an den Parent gebundene Bauvorhaben-ID.
 *
 * @param newValue Neuer Wert.
 * @param oldValue Alter Wert.
 */
watch(
  () => selectedBauvorhabenId.value,
  (newValue, oldValue) => {
    console.log("[Dialog] watch selectedBauvorhabenId", {
      oldValue,
      newValue,
      dialogOpen: dialogOpen.value,
      selectedItem: selectedItem.value,
    });
  },
);

/**
 * Beobachtet das aktuell ausgewählte Autocomplete-Element.
 *
 * @param newValue Neuer Wert.
 * @param oldValue Alter Wert.
 */
watch(
  () => selectedItem.value,
  (newValue, oldValue) => {
    console.log("[Dialog] watch selectedItem", {
      oldValue,
      newValue,
      dialogOpen: dialogOpen.value,
      searchQuery: searchQuery.value,
      selectedBauvorhabenId: selectedBauvorhabenId.value,
    });
  },
  { deep: true },
);

/**
 * Beobachtet den Suchtext.
 *
 * @param newValue Neuer Wert.
 * @param oldValue Alter Wert.
 */
watch(
  () => searchQuery.value,
  (newValue, oldValue) => {
    console.log("[Dialog] watch searchQuery", {
      oldValue,
      newValue,
      dialogOpen: dialogOpen.value,
      selectedItem: selectedItem.value,
      selectedBauvorhabenId: selectedBauvorhabenId.value,
    });
  },
);

/**
 * Wird aufgerufen, bevor die Komponente aus dem DOM entfernt wird.
 */
onBeforeUnmount(() => {
  console.log("[Dialog] onBeforeUnmount BEFORE", {
    dialogOpen: dialogOpen.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
    searchQuery: searchQuery.value,
  });

  isComponentActive = false;
  resetSearchState();

  console.log("[Dialog] onBeforeUnmount AFTER", {
    dialogOpen: dialogOpen.value,
    selectedItem: selectedItem.value,
    selectedBauvorhabenId: selectedBauvorhabenId.value,
    searchQuery: searchQuery.value,
    isComponentActive,
  });
});
</script>
