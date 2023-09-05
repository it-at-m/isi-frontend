<template>
  <v-container
    fluid
    class="fill-height pa-1"
  >
    <v-row class="fill-height justify-center">
      <v-col
        cols="12"
        md="3"
      >
        <search-result-list />
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <city-map />
      </v-col>
    </v-row>
    <v-speed-dial
      v-model="speedDialOpen"
      class="button-speed-dial-entity-creation"
      bottom
      right
      absolute
    >
      <template #activator>
        <v-btn
          v-model="speedDialOpen"
          color="secondary"
          dark
          fab
          large
        >
          <v-icon v-if="speedDialOpen"> mdi-close </v-icon>
          <v-icon v-else> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-btn
        class="text-h6"
        fab
        dark
        color="red"
        @click="createInfrastruktureinrichtung"
        v-text="'I'"
      />
      <v-btn
        class="text-h6"
        fab
        dark
        color="indigo"
        @click="createBauvorhaben"
        v-text="'B'"
      />
      <v-btn
        class="text-h6"
        fab
        dark
        color="green"
        @click="createAbfrage"
        v-text="'A'"
      />
    </v-speed-dial>
    <v-btn
      class="button-search-and-filter-options"
      color="secondary"
      dark
      fab
      bottom
      right
      large
      absolute
      @click="openSearchAndFilterDialog"
    >
      <v-icon>mdi-filter-outline</v-icon>
    </v-btn>
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
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DefaultLayout from "@/components/DefaultLayout.vue";
import SearchResultList from "@/components/search/SearchResultList.vue";
import CityMap from "@/components/map/CityMap.vue";
import router from "@/router";
import SearchAndFilterOptions from "@/components/search/filter/SearchAndFilterOptions.vue";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import _ from "lodash";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import MapLayout from "@/components/map/MapLayout.vue";

@Component({
  components: {
    MapLayout,
    SearchAndFilterOptions,
    CityMap,
    SearchResultList,
    DefaultLayout,
  },
})
export default class Main extends Vue {
  private searchAndFilterDialogOpen = false;

  private speedDialOpen = false;

  private searchQueryAndSorting: SearchQueryAndSortingModel = createSearchQueryAndSortingModel();

  get searchQueryAndSortingStore(): SearchQueryAndSortingModel {
    return _.cloneDeep(this.$store.getters["search/requestSearchQueryAndSorting"]);
  }

  set searchQueryAndSortingStore(searchQueryForEntities: SearchQueryAndSortingModel) {
    this.$store.commit("search/requestSearchQueryAndSorting", _.cloneDeep(searchQueryForEntities));
  }

  private createAbfrage(): void {
    router.push({
      name: "newabfrage",
    });
  }

  private createBauvorhaben(): void {
    router.push({
      name: "createBauvorhaben",
    });
  }

  private createInfrastruktureinrichtung(): void {
    router.push({
      name: "createInfrastruktureinrichtung",
    });
  }

  private openSearchAndFilterDialog(): void {
    this.searchQueryAndSorting = this.searchQueryAndSortingStore;
    this.searchAndFilterDialogOpen = true;
  }

  private handleAdoptSearchAndFilterOptions(): void {
    this.searchQueryAndSortingStore = this.searchQueryAndSorting;
    this.searchAndFilterDialogOpen = false;
  }

  private handleResetSearchAndFilterOptions(): void {
    this.searchQueryAndSorting = createSearchQueryAndSortingModel();
    this.handleAdoptSearchAndFilterOptions();
  }
}
</script>

<style>
.button-speed-dial-entity-creation {
  margin-bottom: 96px;
}

.button-search-and-filter-options {
  margin-bottom: 64px;
}
</style>
