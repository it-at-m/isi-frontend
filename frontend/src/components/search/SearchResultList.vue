<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import { SearchQueryForEntitiesDto, SearchResultDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";

@Component({})
export default class SearchResultList extends Mixins(SearchApiRequestMixin) {
  private searchResults: Array<SearchResultDto> = [];

  @Watch("$store.state.search.searchResults", { immediate: true, deep: true })
  private watchSearchResults(): void {
    this.searchResults = this.$store.getters["search/searchResults"];
  }
}
</script>

<style scoped></style>
