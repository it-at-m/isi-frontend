<template>
  <v-expansion-panel>
    <v-expansion-panel-header> Filter </v-expansion-panel-header>
    <v-expansion-panel-content class="mt-1">
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Filter"
      />
      <panel-header
        font-size="small"
        font-weight="normal"
        header-text="Hier befinden sich die Filtereinstellung."
      />
      <v-row
        class="align-start justify-center"
        dense
      >
        <v-col cols="4"> </v-col>
        <v-col cols="4"> </v-col>
        <v-col cols="4"> </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import PanelHeader from "@/components/search/filter/PanelHeader.vue";
import {
  LookupEntryDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";

@Component({
  components: { PanelHeader },
})
export default class EntitySelectionAndSortingPanel extends Vue {}
</script>

<style scoped></style>
