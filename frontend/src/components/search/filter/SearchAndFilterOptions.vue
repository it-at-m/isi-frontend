<template>
  <v-card flat>
    <v-card-title>
      <v-icon left>mdi-filter-outline</v-icon>
      Such- und Filtereinstellungen
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
          <entity-selection-and-sorting-panel v-model="searchQueryAndSorting" />
        </v-expansion-panels>
      </v-sheet>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        @click="adoptSearchAndFilterOptions"
        >Übernehmen
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="resetSearchAndFilterOptions"
        >Zurücksetzen
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, VModel, Vue } from "vue-property-decorator";
import EntitySelectionAndSortingPanel from "@/components/search/filter/EntitySelectionAndSortingPanel.vue";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";

@Component({
  components: { EntitySelectionAndSortingPanel },
})
export default class SearchAndFilterOptions extends Vue {
  @VModel({ type: SearchQueryAndSortingModel }) searchQueryAndSorting!: SearchQueryAndSortingModel;

  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private adoptSearchAndFilterOptions(): void {}

  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private resetSearchAndFilterOptions(): void {}
}
</script>

<style scoped></style>
