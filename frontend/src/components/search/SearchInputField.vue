<template>
  <v-autocomplete
    id="suchfeld"
    v-model="selectedSuggestion"
    v-model:search="searchQuery"
    :items="suggestions"
    density="compact"
    clearable
    flat
    hide-details
    label="Suche"
    no-filter
    prepend-inner-icon="mdi-magnify"
    return-object
    variant="solo"
    @keyup.enter="searchEntitiesForSelectedSuggestion"
    @update:search="suggest"
    @click:clear="clearSearch"
  >
    <template #no-data>
      <v-list class="pa-3">
        <v-list-item-title> Keine Suchvorschläge... </v-list-item-title>
      </v-list>
    </template>
    <template #append>
      <v-icon
        :color="checkCurrentFilter() ? '' : 'secondary'"
        @click="openSearchAndFilterDialog"
      >
        {{ checkCurrentFilter() ? "mdi-filter-outline" : "mdi-filter" }}
      </v-icon>
      <v-dialog
        v-model="searchAndFilterDialogOpen"
        max-width="1024px"
      >
        <search-and-filter-options
          v-model="searchQueryAndSorting"
          @adopt-search-and-filter-options="handleAdoptSearchAndFilterOptions"
          @reset-search-and-filter-options="handleResetSearchAndFilterOptions"
        />
      </v-dialog>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import type { SearchQueryDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchAndFilterOptions from "@/components/search/filter/SearchAndFilterOptions.vue";
import { useSearchStore } from "@/stores/SearchStore";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useRoute, useRouter } from "vue-router";

const searchAndFilterDialogOpen = ref<boolean>(false);
const searchQueryAndSorting = ref<SearchQueryAndSortingModel>(createSearchQueryAndSortingModel());
const searchQuery = ref<string>("");
const suggestions = ref<Array<string>>([]);
const selectedSuggestion = ref<string | null>(null);
const { searchForSearchwordSuggestion, searchForEntities } = useSearchApi();
const route = useRoute();
const router = useRouter();

const searchStore = useSearchStore();

onMounted(() => {
  searchEntitiesForSelectedSuggestion();
  clearSearch();
});

// Filter Dialog

const searchQueryAndSortingStore = computed({
  get() {
    return _.cloneDeep(searchStore.requestSearchQueryAndSorting);
  },
  set(searchQueryForEntities: SearchQueryAndSortingModel) {
    searchStore.setRequestSearchQueryAndSorting(_.cloneDeep(searchQueryForEntities));
  },
});

function openSearchAndFilterDialog(): void {
  searchQueryAndSorting.value = searchQueryAndSortingStore.value;
  searchAndFilterDialogOpen.value = true;
}

function handleAdoptSearchAndFilterOptions(): void {
  searchQueryAndSortingStore.value = searchQueryAndSorting.value;
  searchAndFilterDialogOpen.value = false;
  searchEntitiesForSelectedSuggestion();
  checkCurrentFilter();
}

function handleResetSearchAndFilterOptions(): void {
  searchQueryAndSorting.value = createSearchQueryAndSortingModel();
  handleAdoptSearchAndFilterOptions();
  searchEntitiesForSelectedSuggestion();
}

function checkCurrentFilter(): boolean {
  const excludeProperties = ["page", "pageSize", "searchQuery"];
  const requestSearchQueryAndSorting = _.omit(searchStore.requestSearchQueryAndSorting, excludeProperties);
  const defaultSearchQueryAndSortingFilter = _.omit(searchStore.defaultSearchQueryAndSortingFilter, excludeProperties);

  return _.isEqual(requestSearchQueryAndSorting, defaultSearchQueryAndSortingFilter);
}

// Search

const getSearchQueryAndSorting = computed(() => _.cloneDeep(searchStore.requestSearchQueryAndSorting));

/**
 * Methode zur Ermittlung der Suchwortvorschläge auf Basis des letzen Wortes in der Suchquery.
 * @param query zur Ermittlung der Suchwortvorschläge.
 */
function suggest(query: string): void {
  const splittedSearchwords = _.split(query, " ");
  const queryForSearchwordSuggestion = _.defaultTo(_.last(splittedSearchwords), "");
  if (!_.isEmpty(queryForSearchwordSuggestion)) {
    const searchQueryForEntitiesDto = getSearchQueryAndSorting.value;
    const searchQueryDto = {
      searchQuery: queryForSearchwordSuggestion,
      selectBauleitplanverfahren: searchQueryForEntitiesDto.selectBauleitplanverfahren,
      selectBaugenehmigungsverfahren: searchQueryForEntitiesDto.selectBaugenehmigungsverfahren,
      selectWeiteresVerfahren: searchQueryForEntitiesDto.selectWeiteresVerfahren,
      selectBauvorhaben: searchQueryForEntitiesDto.selectBauvorhaben,
      selectGrundschule: searchQueryForEntitiesDto.selectGrundschule,
      selectGsNachmittagBetreuung: searchQueryForEntitiesDto.selectGsNachmittagBetreuung,
      selectHausFuerKinder: searchQueryForEntitiesDto.selectHausFuerKinder,
      selectKindergarten: searchQueryForEntitiesDto.selectKindergarten,
      selectKinderkrippe: searchQueryForEntitiesDto.selectKinderkrippe,
      selectMittelschule: searchQueryForEntitiesDto.selectMittelschule,
      page: undefined,
      pageSize: undefined,
    } as SearchQueryDto;
    searchForSearchwordSuggestion(searchQueryDto).then((suchwortSuggestions) => {
      const foundSuggestions = _.toArray(suchwortSuggestions.suchwortSuggestions).map((suchwortSuggestion) => {
        const numberOfSplittedSearchwords = splittedSearchwords.length;
        if (numberOfSplittedSearchwords > 0) {
          splittedSearchwords[numberOfSplittedSearchwords - 1] = suchwortSuggestion;
        }
        return _.join(splittedSearchwords, " ");
      });
      suggestions.value = [query].concat(foundSuggestions);
    });
  }
}

function searchEntitiesForSelectedSuggestion(): void {
  routeToMainViewWhenNotInMain();
  const searchQueryForEntitiesDto = getSearchQueryAndSorting.value;
  searchQueryForEntitiesDto.searchQuery = _.isNil(searchQuery.value) ? "" : searchQuery.value;
  searchQueryForEntitiesDto.page = 1;
  searchQueryForEntitiesDto.pageSize = 20;
  suggestions.value = [searchQueryForEntitiesDto.searchQuery];
  selectedSuggestion.value = searchQueryForEntitiesDto.searchQuery;
  searchStore.setRequestSearchQueryAndSorting(new SearchQueryAndSortingModel(searchQueryForEntitiesDto));
  searchForEntities(searchQueryForEntitiesDto).then((searchResults) => {
    searchStore.setSearchResults(_.cloneDeep(searchResults));
  });
}

function clearSearch(): void {
  suggestions.value = [];
  searchQuery.value = "";
  selectedSuggestion.value = "";
}

function routeToMainViewWhenNotInMain(): void {
  if (route.path !== "/") {
    router.push("/");
  }
}
</script>
