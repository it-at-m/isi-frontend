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

function createQueryFull(searchText: string) {
  return {
    ...createQuery(searchText),
    page: 1,
    pageSize: 20,
    sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
  };
}

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

function abbrechen(): void {
  clearSearch();
  dialogOpen.value = false;
}

function uebernehmen(): void {
  if (!selectedBauvorhabenId.value) {
    return;
  }
  dialogOpen.value = false;
}

watch(dialogOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    bauvorhabenSuchField.value?.focus?.();
    return;
  }

  clearSearch();
});

onBeforeUnmount(() => {
  isComponentActive = false;
  clearSearch();
});
</script>
