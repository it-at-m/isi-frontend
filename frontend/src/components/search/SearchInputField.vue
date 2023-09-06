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
    solo-inverted
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
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { SearchQueryDto, SearchQueryAndSortingDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";

@Component({})
export default class SearchInputField extends Mixins(SearchApiRequestMixin) {
  private searchQuery = "";

  private suggestions: Array<string> = [];

  private selectedSuggestion = "";

  mounted() {
    this.searchEntitiesForSelectedSuggestion();
  }

  get getSearchQueryAndSorting(): SearchQueryAndSortingDto {
    return _.cloneDeep(this.$store.getters["search/requestSearchQueryAndSorting"]);
  }

  private updateSearchQuery(itemIndex: number) {
    if (itemIndex > -1) {
      this.searchQuery = this.suggestions[itemIndex];
    }
  }

  private suggest(query: string): void {
    const splittedSearchwords = _.split(query, " ");
    const queryForSearchwordSuggestion = _.defaultTo(_.last(splittedSearchwords), "");
    if (!_.isEmpty(queryForSearchwordSuggestion)) {
      const searchQueryForEntitiesDto = this.getSearchQueryAndSorting;
      const searchQueryDto = {
        searchQuery: queryForSearchwordSuggestion,
        selectInfrastrukturabfrage: searchQueryForEntitiesDto.selectInfrastrukturabfrage,
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
    const searchQueryForEntitiesDto = this.getSearchQueryAndSorting;
    searchQueryForEntitiesDto.searchQuery = _.isNil(this.searchQuery) ? "" : this.searchQuery;
    searchQueryForEntitiesDto.page = 1;
    searchQueryForEntitiesDto.pageSize = 2;
    this.suggestions = [searchQueryForEntitiesDto.searchQuery];
    this.selectedSuggestion = searchQueryForEntitiesDto.searchQuery;
    this.$store.commit("search/requestSearchQueryAndSorting", searchQueryForEntitiesDto);
    this.searchForEntities(searchQueryForEntitiesDto).then((searchResults) => {
      this.$store.commit("search/searchResults", _.cloneDeep(searchResults));
    });
  }

  private clearSearch(): void {
    this.suggestions = [];
    this.searchQuery = "";
    this.selectedSuggestion = "";
  }
}
</script>

<style scoped></style>
