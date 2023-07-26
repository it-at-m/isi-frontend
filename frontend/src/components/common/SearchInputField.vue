<template>
  <v-autocomplete
    id="suchfeld"
    v-model="selectedSuggestion"
    :items="suggestions"
    :search-input.sync="searchQuery"
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
import { SearchQueryForEntitiesDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";

@Component({})
export default class SearchInputField extends Mixins(SearchApiRequestMixin) {
  // Suche
  private searchQuery = "";

  private suggestions: Array<string> = [];

  private selectedSuggestion = "";

  private updateSearchQuery(itemIndex: number) {
    if (itemIndex > -1) {
      this.searchQuery = this.suggestions[itemIndex];
    }
  }

  private suggest(query: string): void {
    const splittedSearchwords = _.split(query, " ");
    const searchQueryForSuggestion = _.last(splittedSearchwords);
    if (!_.isNil(searchQueryForSuggestion) && !_.isEmpty(searchQueryForSuggestion)) {
      this.searchForSearchwordSuggestion(searchQueryForSuggestion).then((suchwortSuggestions) => {
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
    const searchQueryForEntitiesDto = {
      searchQuery: _.isNil(this.searchQuery) ? "" : this.searchQuery,
      selectInfrastrukturabfrage: true,
      selectBauvorhaben: true,
      selectGrundschule: true,
      selectGsNachmittagBetreuung: true,
      selectHausFuerKinder: true,
      selectKindergarten: true,
      selectKinderkrippe: true,
      selectMittelschule: true,
    } as SearchQueryForEntitiesDto;
    this.suggestions = [];
    this.selectedSuggestion = "";
    this.searchForEntities(searchQueryForEntitiesDto).then((searchResults) => searchResults);
  }

  private clearSearch(): void {
    this.suggestions = [];
    this.searchQuery = "";
    this.selectedSuggestion = "";
  }
}
</script>

<style scoped></style>
