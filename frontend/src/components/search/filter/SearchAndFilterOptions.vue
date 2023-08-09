<template>
  <v-container> </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";
import { SearchQueryAndSortingDto } from "@/api/api-client/isi-backend";

@Component({})
export default class SearchFilter extends Vue {
  private filterDialog = false;

  get searchQueryAndSorting(): SearchQueryAndSortingDto {
    return _.cloneDeep(this.$store.getters["search/requestSearchQueryAndSorting"]);
  }

  set searchQueryAndSortingDto(searchQueryForEntitiesDto: SearchQueryAndSortingDto) {
    this.$store.commit("search/requestSearchQueryAndSorting", _.cloneDeep(searchQueryForEntitiesDto));
  }
}
</script>

<style scoped></style>
