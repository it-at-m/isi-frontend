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
    @keyup.enter="searchForEntitiesWithSearchQuery"
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

  private currentIndexSuchwortSuggestion = -1;

  private suggestions: Array<string> = [];

  private selectedSuggestion = "";

  private updateSearchQuery(itemIndex: number) {
    this.currentIndexSuchwortSuggestion = itemIndex;
    console.log(itemIndex);
    if (itemIndex > -1) {
      this.searchQuery = this.suggestions[itemIndex];
    }
  }

  private suggest(query: string): void {
    const splittedSearchwords = _.split(query, " ");
    const searchQueryForSuggestion = _.last(splittedSearchwords);
    if (!_.isNil(searchQueryForSuggestion) && !_.isEmpty(searchQueryForSuggestion)) {
      console.log("suggest: " + searchQueryForSuggestion);
      this.searchForSearchwordSuggestion(searchQueryForSuggestion).then((suchwortSuggestions) => {
        this.suggestions = _.toArray(suchwortSuggestions.suchwortSuggestions).map((suchwortSuggestion) => {
          const numberOfSplittedSearchwords = splittedSearchwords.length;
          if (numberOfSplittedSearchwords > 0) {
            splittedSearchwords[numberOfSplittedSearchwords - 1] = suchwortSuggestion;
          }
          return _.join(splittedSearchwords, " ");
        });
      });
    }
  }

  private searchForEntitiesWithSearchQuery(): void {
    console.log("Do Search: " + this.currentIndexSuchwortSuggestion);
    const searchQueryForEntitiesDto = {
      searchQuery: this.searchQuery,
      selectInfrastrukturabfrage: true,
      selectBauvorhaben: true,
      selectGrundschule: true,
      selectGsNachmittagBetreuung: true,
      selectHausFuerKinder: true,
      selectKindergarten: true,
      selectKinderkrippe: true,
      selectMittelschule: true,
    } as SearchQueryForEntitiesDto;
    console.log("Do Search: " + this.searchQuery);
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
