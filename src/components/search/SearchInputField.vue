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
      <v-tooltip
        location="bottom"
        open-delay="500"
      >
        <template #activator="{ props: activatorProps }">
          <v-icon
            :color="lastFilterSource === 'dialog' ? 'secondary' : ''"
            @click="openSearchAndFilterDialog"
            v-bind="activatorProps"
          >
            {{ checkCurrentFilter() ? "mdi-filter-outline" : "mdi-filter" }}
          </v-icon>
        </template>
        <span>Such- und Filtereinstellungen</span>
      </v-tooltip>
      <v-menu
        v-model="quickFilterMenuOpen"
        offset-y
        min-width="220"
        max-width="320"
      >
        <template #activator="{ props }">
          <v-tooltip
            location="bottom"
            open-delay="500"
          >
            <template #activator="{ props: tooltipProps }">
              <v-icon
                size="20"
                class="ml-2"
                :color="lastFilterSource === 'quick' ? 'secondary' : ''"
                v-bind="Object.assign({}, props, tooltipProps)"
                @click.stop
              >
                mdi-bookmark-multiple-outline
              </v-icon>
            </template>
            <span>Gespeicherte Filter</span>
          </v-tooltip>
        </template>
        <quick-filter-list
          :active-filter-id="activeQuickFilterId"
          @apply-filter="onQuickFilterSelected"
          @reset-filter="resetQuickFilter"
        />
      </v-menu>
      <v-dialog
        v-model="searchAndFilterDialogOpen"
        max-width="1000px"
        @click:outside="onFilterDialogClickOutside"
      >
        <search-and-filter-options
          ref="filterDialogRef"
          v-model="searchQueryAndSorting"
          @adopt-search-and-filter-options="handleAdoptSearchAndFilterOptions"
          @reset-search-and-filter-options="handleResetSearchAndFilterOptions"
        />
      </v-dialog>
      <yes-no-dialog
        v-model="confirmCloseDialogOpen"
        dialogtitle="Filtermaske verlassen?"
        dialogtext="Änderungen am ausgewählten Filter werden nicht gespeichert. Trotzdem verlassen?"
        yes-text="Weiter"
        no-text="Zurück"
        @yes="confirmCloseDialogYes()"
        @no="confirmCloseDialogNo()"
      />
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, nextTick } from "vue";
import { SearchQueryDto, UncertainBoolean } from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchAndFilterOptions from "@/components/search/filter/SearchAndFilterOptions.vue";
import { useSearchStore } from "@/stores/SearchStore";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useRoute, useRouter } from "vue-router";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import QuickFilterList from "@/components/search/filter/QuickFilterList.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const filterDialogRef = ref();
const quickFilterMenuOpen = ref(false);
const lastFilterSource = ref<"dialog" | "quick" | null>(null);
const activeQuickFilterId = ref<string | null>(null);
const confirmCloseDialogOpen = ref(false);
const lastSelectedFilter = ref<string | null>(null);
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

// Schnellfilter
function onQuickFilterSelected(filter: { id: string; name: string; filterSettings: any }) {
  try {
    searchQueryAndSorting.value = { ...filter.filterSettings };
    searchQueryAndSortingStore.value = searchQueryAndSorting.value;
    quickFilterMenuOpen.value = false;
    searchEntitiesForSelectedSuggestion();
    checkCurrentFilter();
    lastFilterSource.value = "quick";
    activeQuickFilterId.value = filter.id;
    toast.success(`Filter übernommen.`);
  } catch (e) {
    toast.error("Beim Übernehmen des Filters ist ein Fehler aufgetreten.");
  }
}

function resetQuickFilter() {
  handleResetSearchAndFilterOptions();
  quickFilterMenuOpen.value = false;
  toast.success("Filter zurückgesetzt.");
}

// Großer Filter Dialog
function onFilterDialogClickOutside() {
  const isModified = filterDialogRef.value?.isFilterModified;
  const selectedFilter = filterDialogRef.value?.selectedFilter;
  if (isModified && selectedFilter) {
    lastSelectedFilter.value = selectedFilter;
    confirmCloseDialogOpen.value = true;
  } else {
    searchAndFilterDialogOpen.value = false;
  }
}

function confirmCloseDialogYes(): void {
  if (lastSelectedFilter) {
    lastSelectedFilter.value = null;
  }
  searchAndFilterDialogOpen.value = false;
  confirmCloseDialogOpen.value = false;
}

function confirmCloseDialogNo(): void {
  confirmCloseDialogOpen.value = false;
  nextTick(() => {
    searchAndFilterDialogOpen.value = true;
    nextTick(() => {
      filterDialogRef.value?.onFiltermaskOpen(lastSelectedFilter.value);
    });
  });
}

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
  nextTick(() => {
    filterDialogRef.value?.onFiltermaskOpen();
  });
}

function handleAdoptSearchAndFilterOptions(): void {
  searchQueryAndSortingStore.value = searchQueryAndSorting.value;
  searchAndFilterDialogOpen.value = false;
  searchEntitiesForSelectedSuggestion();
  checkCurrentFilter();
  lastFilterSource.value = "dialog";
}

function handleResetSearchAndFilterOptions(): void {
  searchQueryAndSorting.value = createSearchQueryAndSortingModel();
  handleAdoptSearchAndFilterOptions();
  searchEntitiesForSelectedSuggestion();
  lastFilterSource.value = null;
  activeQuickFilterId.value = null;
}

function checkCurrentFilter(): boolean {
  const excludeProperties = [
    "page",
    "pageSize",
    "searchQuery",
    // Abhängig von der Eingabe in der GUI können die Filtereinstellung undefined oder ein leeres Array sein.
    "filterStadtbezirkNummer",
    "filterKitaplanungsbereichKitaPlbT",
    "filterGrundschulsprengelNummer",
    "filterMittelschulsprengelNummer",
    "filterStatusAbfrage",
    "filterVerfahrensstand",
    "filterInfrastruktureinrichtungStatus",
    // Abhängig von der Eingabe in der GUI kann die Filtereinstellung undefined sein oder die Ausprägung Unspecified besitzen.
    "filterSobonRelevant",
  ];
  const requestSearchQueryAndSorting = _.omit(searchStore.requestSearchQueryAndSorting, excludeProperties);
  const defaultSearchQueryAndSortingFilter = _.omit(searchStore.defaultSearchQueryAndSortingFilter, excludeProperties);

  return (
    _.isEqual(requestSearchQueryAndSorting, defaultSearchQueryAndSortingFilter) &&
    // Explizite Prüfung der Filterlisten da diese Abhängig von der Eingabe in der GUI undefined oder ein leeres Array sein können.
    _.isEmpty(searchStore.requestSearchQueryAndSorting.filterStadtbezirkNummer) &&
    _.isEmpty(searchStore.requestSearchQueryAndSorting.filterKitaplanungsbereichKitaPlbT) &&
    _.isEmpty(searchStore.requestSearchQueryAndSorting.filterGrundschulsprengelNummer) &&
    _.isEmpty(searchStore.requestSearchQueryAndSorting.filterMittelschulsprengelNummer) &&
    _.isEmpty(searchStore.requestSearchQueryAndSorting.filterStatusAbfrage) &&
    _.isEmpty(searchStore.requestSearchQueryAndSorting.filterVerfahrensstand) &&
    _.isEmpty(searchStore.requestSearchQueryAndSorting.filterInfrastruktureinrichtungStatus) &&
    // Abhängig von der Eingabe in der GUI kann die Filtereinstellung undefined sein oder die Ausprägung Unspecified besitzen.
    (_.isNil(searchStore.requestSearchQueryAndSorting.filterSobonRelevant) ||
      searchStore.requestSearchQueryAndSorting.filterSobonRelevant === UncertainBoolean.Unspecified)
  );
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
