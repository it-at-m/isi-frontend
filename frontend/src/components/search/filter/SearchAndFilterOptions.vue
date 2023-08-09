<template>
  <v-card flat>
    <v-card-title>
      <v-icon left>mdi-filter-outline</v-icon>
      Filter-/Sucheinstellungen
    </v-card-title>

    <v-card-text>
      <v-sheet
        width="100%"
        class="overflow-y-auto"
      >
        <v-expansion-panels
          hover
          focusable
        >
          <entity-selection-and-sorting-panel v-model="searchQueryForEntitiesDto" />
        </v-expansion-panels>
      </v-sheet>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        @click="adopt"
        >Übernehmen
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="reset"
        >Zurücksetzen
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";
import { SearchQueryAndSortingDto } from "@/api/api-client/isi-backend";
import { createSearchQueryAndSortingDto } from "@/utils/Factories";
import EntitySelectionAndSortingPanel from "@/components/search/filter/EntitySelectionAndSortingPanel.vue";

@Component({
  components: { EntitySelectionAndSortingPanel },
})
export default class SearchAndFilterOptions extends Vue {
  private searchQueryForEntitiesDto: SearchQueryAndSortingDto = this.searchQueryAndSortingStore;

  mounted() {
    this.searchQueryForEntitiesDto = this.searchQueryAndSortingStore;
  }

  get searchQueryAndSortingStore(): SearchQueryAndSortingDto {
    return _.cloneDeep(this.$store.getters["search/requestSearchQueryAndSorting"]);
  }

  set searchQueryAndSortingStore(searchQueryForEntitiesDto: SearchQueryAndSortingDto) {
    this.$store.commit("search/requestSearchQueryAndSorting", _.cloneDeep(searchQueryForEntitiesDto));
  }

  private adopt() {
    this.searchQueryAndSortingStore = this.searchQueryForEntitiesDto;
  }

  private reset() {
    this.searchQueryForEntitiesDto = createSearchQueryAndSortingDto();
    this.adopt();
  }
}
</script>

<style scoped></style>
