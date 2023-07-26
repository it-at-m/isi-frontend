<template>
  <v-autocomplete
    id="suchfeld"
    v-model="selectedSuggestion"
    :items="suchwortSuggestions"
    :search-input.sync="searchQuery"
    clearable
    flat
    hide-details
    label="Suche"
    no-filter
    prepend-inner-icon="mdi-magnify"
    return-object
    solo-inverted
    @keyup.enter="addSelectedSuggestionsToSearchQueryOrSearchForEntities"
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
import { SearchQueryForEntitiesDto, SuchwortSuggestionsDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";

@Component({})
export default class SearchInputField extends Mixins(SearchApiRequestMixin) {
  // Suche
  private searchQuery = "";

  private currentIndexSuchwortSuggestion = -1;

  private suggestions: SuchwortSuggestionsDto = { suchwortSuggestions: [] };

  private selectedSuggestion = "";

  get suchwortSuggestions(): Array<string> {
    return _.isNil(this.suggestions.suchwortSuggestions) ? [] : this.suggestions.suchwortSuggestions;
  }

  private updateSearchQuery(itemIndex: number) {
    this.currentIndexSuchwortSuggestion = itemIndex;
    console.log(itemIndex);
  }

  private suggest(query: string): void {
    const splittedSearchwords = _.split(query, " ");
    const searchQueryForSuggestion = _.last(splittedSearchwords);
    if (!_.isNil(searchQueryForSuggestion) && !_.isEmpty(searchQueryForSuggestion)) {
      this.searchForSearchwordSuggestion(searchQueryForSuggestion).then((suchwortSuggestions) => {
        this.suggestions = suchwortSuggestions;
      });
    }
  }

  private addSelectedSuggestionsToSearchQueryOrSearchForEntities(): void {
    if (this.currentIndexSuchwortSuggestion < 0) {
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
      this.searchForEntities(searchQueryForEntitiesDto).then((searchResults) => searchResults);
    } else {
      this.selectedSuggestion += this.suchwortSuggestions[this.currentIndexSuchwortSuggestion] + " ";
      this.searchQuery += this.selectedSuggestion + "";
      console.log("selectedSuggestion: " + this.selectedSuggestion);
      console.log("this.searchQuery: " + this.searchQuery);
    }
  }

  private clearSearch(): void {
    this.suggestions = {
      suchwortSuggestions: [],
    };
    this.searchQuery = "";
    this.selectedSuggestion = "";
  }
}
</script>

<style scoped></style>
