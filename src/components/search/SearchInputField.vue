<template>
  <div class="d-flex align-center ga-2 w-100">
    <v-autocomplete
      id="suchfeld"
      v-model="selectedSuggestion"
      v-model:search="searchQuery"
      :items="suggestions"
      density="compact"
      clearable
      hide-details
      label="Suche"
      no-filter
      prepend-inner-icon="mdi-magnify"
      return-object
      variant="outlined"
      base-color="primary"
      bg-color="white"
      color="primary"
      class="flex-grow-1"
      @keyup.enter="searchEntitiesForSelectedSuggestion"
      @update:search="suggest"
      @click:clear="clearSearch"
    >
      <template #no-data>
        <v-list class="pa-3">
          <v-list-item-title> Keine Suchvorschläge... </v-list-item-title>
        </v-list>
      </template>
    </v-autocomplete>
    <v-select
      id="suchfeld_filter"
      :model-value="filterAuswahl"
      :items="filterOptionen"
      item-title="name"
      item-value="id"
      label="Filter"
      variant="outlined"
      base-color="primary"
      bg-color="white"
      color="primary"
      density="compact"
      hide-details
      style="max-width: 220px; min-width: 160px"
      @update:model-value="onFilterSelected"
      @update:menu="onFilterMenu"
    >
      <template #append-inner>
        <v-tooltip
          location="bottom"
          open-delay="500"
        >
          <template #activator="{ props: tooltipProps }">
            <!-- Der Klick öffnet das Filtermenü und nicht die Auswahlliste des Feldes. -->
            <v-icon
              id="suchfeld_filter_einstellungen"
              v-bind="tooltipProps"
              :color="isFilterActive ? 'secondary' : undefined"
              @mousedown.stop
              @click.stop="openSearchAndFilterDialog"
            >
              mdi-filter
            </v-icon>
          </template>
          <span>Such- und Filtereinstellungen</span>
        </v-tooltip>
      </template>
    </v-select>
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
        @close-search-and-filter-options="closeSearchAndFilterDialog"
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, nextTick } from "vue";
import { SearchQueryDto, UncertainBoolean } from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchAndFilterOptions from "@/components/filter/SearchAndFilterOptions.vue";
import { useSearchStore } from "@/stores/SearchStore";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { isKeineEntitaetMarkiert, useEntitySearch } from "@/composables/requests/search/useEntitySearch";
import { useFilterPersistence } from "@/composables/requests/filter/useFilterPersistence";
import { useRoute, useRouter } from "vue-router";
import YesNoDialog from "@/components/common/YesNoDialog.vue";

/**
 * Eintrag der Filterauswahl für die Standardeinstellung. Entspricht der ID im Filtermenü.
 */
const STANDARDEINSTELLUNG_ID = "__default__";

const searchStore = useSearchStore();
const filterDialogRef = ref();
const confirmCloseDialogOpen = ref(false);
const lastSelectedFilter = ref<string | null>(null);
const searchAndFilterDialogOpen = ref<boolean>(false);
const searchQueryAndSorting = ref<SearchQueryAndSortingModel>(createSearchQueryAndSortingModel());
const searchQuery = ref<string>("");
const suggestions = ref<Array<string>>([]);
const selectedSuggestion = ref<string | null>(null);
const { searchForSearchwordSuggestion } = useSearchApi();
const { searchEntities, applyFilter } = useEntitySearch();
const { savedFilters, loadFilters } = useFilterPersistence();
const route = useRoute();
const router = useRouter();

const isFilterActive = computed(() => searchStore.isFilterActive);

const filterOptionen = computed(() => [
  { id: STANDARDEINSTELLUNG_ID, name: "Standardeinstellung" },
  ...savedFilters.value.map((filter) => ({ id: filter.id, name: filter.name })),
]);

/**
 * Zeigt den aktiven persönlichen Filter an. Wurden die Einstellungen im Filtermenü individuell
 * angepasst, bleibt die Auswahl leer, das Filtersymbol kennzeichnet den Filter aber weiterhin als aktiv.
 */
const filterAuswahl = computed(() => {
  if (!_.isNil(searchStore.activeFilterId)) {
    return searchStore.activeFilterId;
  }
  return isFilterActive.value ? null : STANDARDEINSTELLUNG_ID;
});

// Beim Laden wird bewusst keine Suche ausgelöst. Diese erfolgt erst per Enter oder über "Übernehmen".
onMounted(() => {
  clearSearch();
  ladePersoenlicheFilter();
});

// Filterauswahl
async function ladePersoenlicheFilter(): Promise<void> {
  try {
    await loadFilters();
  } catch {
    // handleError already provides user feedback.
  }
}

/**
 * Persönliche Filter können jederzeit im Filtermenü angelegt, umbenannt oder gelöscht werden.
 * Damit die Auswahl aktuell ist, werden sie beim Öffnen der Auswahl neu geladen.
 */
function onFilterMenu(geoeffnet: boolean): void {
  if (geoeffnet) {
    ladePersoenlicheFilter();
  }
}

function onFilterSelected(filterId: string | null): void {
  if (_.isNil(filterId)) {
    return;
  }
  if (filterId === STANDARDEINSTELLUNG_ID) {
    applyFilter(null);
  } else {
    const filter = savedFilters.value.find((savedFilter) => savedFilter.id === filterId);
    if (_.isNil(filter)) {
      return;
    }
    applyFilter(filter);
  }
  searchEntitiesForSelectedSuggestion();
}

// Großer Filter Dialog
function onFilterDialogClickOutside() {
  const isModified = filterDialogRef.value?.isFilterModified;
  const selectedFilter = filterDialogRef.value?.selectedFilter;
  if (isModified && selectedFilter) {
    lastSelectedFilter.value = selectedFilter;
    confirmCloseDialogOpen.value = true;
  } else {
    closeSearchAndFilterDialog();
  }
}

function confirmCloseDialogYes(): void {
  if (lastSelectedFilter) {
    lastSelectedFilter.value = null;
  }
  closeSearchAndFilterDialog();
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
  searchQueryAndSorting.value = _.cloneDeep(searchQueryAndSortingStore.value);
  searchAndFilterDialogOpen.value = true;
  nextTick(() => {
    filterDialogRef.value?.onFiltermaskOpen();
  });
}

function handleAdoptSearchAndFilterOptions(): void {
  searchQueryAndSortingStore.value = _.cloneDeep(searchQueryAndSorting.value);
  closeSearchAndFilterDialog();
  const selectedFilter: string | null = filterDialogRef.value?.selectedFilter ?? null;
  const isModified: boolean = filterDialogRef.value?.isFilterModified ?? false;
  if (selectedFilter === filterDialogRef.value?.STANDARD_FILTER_ID || isModified) {
    searchStore.setActiveFilterId(null);
  } else if (!_.isNil(selectedFilter)) {
    // Ein unverändert übernommener persönlicher Filter wird in der Filterauswahl angezeigt.
    searchStore.setActiveFilterId(selectedFilter);
  }
  searchStore.setFilterActive(!checkCurrentFilter());
  searchEntitiesForSelectedSuggestion();
}

function handleResetSearchAndFilterOptions(): void {
  searchQueryAndSorting.value = createSearchQueryAndSortingModel();
  handleAdoptSearchAndFilterOptions();
  searchStore.setFilterActive(false);
  searchStore.setActiveFilterId(null);
}

function closeSearchAndFilterDialog(): void {
  searchAndFilterDialogOpen.value = false;
}

/**
 * @returns true, wenn die Such- und Filtereinstellungen der Standardeinstellung entsprechen.
 */
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
  const searchQueryForEntitiesDto = getSearchQueryAndSorting.value;
  // Ohne markierte Entität lehnt das Backend die Anfrage ab, weshalb keine Vorschläge ermittelt werden.
  if (!_.isEmpty(queryForSearchwordSuggestion) && !isKeineEntitaetMarkiert(searchQueryForEntitiesDto)) {
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
  const suchbegriff = _.isNil(searchQuery.value) ? "" : searchQuery.value;
  suggestions.value = [suchbegriff];
  selectedSuggestion.value = suchbegriff;
  searchEntities(suchbegriff);
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
