<template>
  <v-autocomplete
    id="suchfeld"
    v-model="selectedSuggestion"
    :items="suggestions"
    :search-input.sync="searchQuery"
    dense
    clearable
    flat
    hide-details
    label="Suche"
    no-filter
    prepend-inner-icon="mdi-magnify"
    return-object
    solo
    @keyup.enter="searchEntitiesForSelectedSuggestion"
    @update:list-index="updateSearchQuery"
    @update:search-input="suggest"
    @click:clear="clearSearch"
  >
    <template #no-data>
      <v-list class="pa-3">
        <v-list-item-title> Keine Suchvorschläge... </v-list-item-title>
      </v-list>
    </template>
    <template #append-outer>
      <v-icon
        class="white--text"
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

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { SearchQueryDto, SearchQueryAndSortingDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchAndFilterOptions from "@/components/search/filter/SearchAndFilterOptions.vue";
import { useSearchStore } from "@/stores/SearchStore";
@Component({
  components: { SearchAndFilterOptions },
})
export default class SearchInputField extends Mixins(SearchApiRequestMixin) {
  private searchAndFilterDialogOpen = false;

  private searchQueryAndSorting: SearchQueryAndSortingModel = createSearchQueryAndSortingModel();

  private searchQuery = "";

  private suggestions: Array<string> = [];

  private selectedSuggestion = "";

  private searchStore = useSearchStore();

  mounted(): void {
    this.searchEntitiesForSelectedSuggestion();
    this.checkCurrentFilter();
  }

  // Filter Dialog

  get searchQueryAndSortingStore(): SearchQueryAndSortingModel {
    return _.cloneDeep(this.searchStore.requestSearchQueryAndSorting);
  }

  set searchQueryAndSortingStore(searchQueryForEntities: SearchQueryAndSortingModel) {
    this.searchStore.setRequestSearchQueryAndSorting(_.cloneDeep(searchQueryForEntities));
  }

  private openSearchAndFilterDialog(): void {
    this.searchQueryAndSorting = this.searchQueryAndSortingStore;
    this.searchAndFilterDialogOpen = true;
  }

  private handleAdoptSearchAndFilterOptions(): void {
    this.searchQueryAndSortingStore = this.searchQueryAndSorting;
    this.searchAndFilterDialogOpen = false;
    this.searchEntitiesForSelectedSuggestion();
    this.checkCurrentFilter();
  }

  private handleResetSearchAndFilterOptions(): void {
    this.searchQueryAndSorting = createSearchQueryAndSortingModel();
    this.handleAdoptSearchAndFilterOptions();
    this.searchEntitiesForSelectedSuggestion();
  }

  private checkCurrentFilter(): boolean {
    const excludeProperties = ["page", "pageSize", "searchQuery"];
    let requestSearchQueryAndSorting = _.omit(this.searchStore.requestSearchQueryAndSorting, excludeProperties);
    let defaultSearchQueryAndSortingFilter = _.omit(
      this.searchStore.defaultSearchQueryAndSortingFilter,
      excludeProperties,
    );

    return _.isEqual(requestSearchQueryAndSorting, defaultSearchQueryAndSortingFilter);
  }

  // Search

  get getSearchQueryAndSorting(): SearchQueryAndSortingDto {
    return _.cloneDeep(this.searchStore.requestSearchQueryAndSorting);
  }

  private updateSearchQuery(itemIndex: number) {
    if (itemIndex > -1) {
      this.searchQuery = this.suggestions[itemIndex];
    }
  }

  /**
   * Methode zur Ermittlung der Suchwortvorschläge auf Basis des letzen Wortes in der Suchquery.
   * @param query zur Ermittlung der Suchwortvorschläge.
   */
  private suggest(query: string): void {
    const splittedSearchwords = _.split(query, " ");
    const queryForSearchwordSuggestion = _.defaultTo(_.last(splittedSearchwords), "");
    if (!_.isEmpty(queryForSearchwordSuggestion)) {
      const searchQueryForEntitiesDto = this.getSearchQueryAndSorting;
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
      this.searchForSearchwordSuggestion(searchQueryDto).then((suchwortSuggestions) => {
        const foundSuggestions = _.toArray(suchwortSuggestions.suchwortSuggestions).map((suchwortSuggestion) => {
          const numberOfSplittedSearchwords = splittedSearchwords.length;
          if (numberOfSplittedSearchwords > 0) {
            splittedSearchwords[numberOfSplittedSearchwords - 1] = suchwortSuggestion;
          }
          return _.join(splittedSearchwords, " ");
        });
        this.suggestions = [query].concat(foundSuggestions);
      });
    }
  }

  private searchEntitiesForSelectedSuggestion(): void {
    this.routeToMainViewWhenNotInMain();
    const searchQueryForEntitiesDto = this.getSearchQueryAndSorting;
    searchQueryForEntitiesDto.searchQuery = _.isNil(this.searchQuery) ? "" : this.searchQuery;
    searchQueryForEntitiesDto.page = 1;
    searchQueryForEntitiesDto.pageSize = 20;
    this.suggestions = [searchQueryForEntitiesDto.searchQuery];
    this.selectedSuggestion = searchQueryForEntitiesDto.searchQuery;
    this.searchStore.setRequestSearchQueryAndSorting(new SearchQueryAndSortingModel(searchQueryForEntitiesDto));
    this.searchForEntities(searchQueryForEntitiesDto).then((searchResults) => {
      this.searchStore.setSearchResults(_.cloneDeep(searchResults));
    });
  }

  private clearSearch(): void {
    this.suggestions = [];
    this.searchQuery = "";
    this.selectedSuggestion = "";
  }

  private routeToMainViewWhenNotInMain() {
    const currentRoute = this.$router.currentRoute;
    if (currentRoute.path !== "/") {
      this.$router.push({ path: "/" });
    }
  }
}
</script>

<style scoped></style>
