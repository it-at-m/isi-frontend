<template>
  <v-container fluid>
    <spreadsheet
      v-model="items"
      :headers="headers"
      :is-editable="true"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DefaultLayout from "@/components/DefaultLayout.vue";
import SearchResultList from "@/components/search/SearchResultList.vue";
import SearchResultCityMap from "@/components/map/SearchResultCityMap.vue";
import router from "@/router";
import SearchAndFilterOptions from "@/components/search/filter/SearchAndFilterOptions.vue";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import _ from "lodash";
import { AbfrageDtoArtAbfrageEnum, SearchResultDtoTypeEnum } from "@/api/api-client/isi-backend";
import { Feature, Point } from "geojson";
import Spreadsheet from "@/components/common/Spreadsheet.vue";

type EntityFeature = Feature<Point, { type: SearchResultDtoTypeEnum; id: string; name: string }>;

@Component({
  components: {
    SearchAndFilterOptions,
    SearchResultCityMap,
    SearchResultList,
    DefaultLayout,
    Spreadsheet,
  },
})
export default class Main extends Vue {
  private speedDialOpen = false;

  private headers = [
    { text: "A", value: "a" },
    { text: "B", value: "b" },
    { text: "C", value: "c" },
  ];

  private items = [
    { a: 10, b: 20, c: 30 },
    { a: 50, b: 80, c: 20 },
    { a: 40, b: 40, c: 10 },
  ];

  get searchQueryAndSortingStore(): SearchQueryAndSortingModel {
    return _.cloneDeep(this.$store.getters["search/requestSearchQueryAndSorting"]);
  }

  set searchQueryAndSortingStore(searchQueryForEntities: SearchQueryAndSortingModel) {
    this.$store.commit("search/requestSearchQueryAndSorting", _.cloneDeep(searchQueryForEntities));
  }

  private createBauleitplanverfahren(): void {
    router.push({
      name: "newabfrage",
      params: { art: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren },
    });
  }

  private createBaugenehmigungsverfahren(): void {
    router.push({
      name: "newabfrage",
      params: { art: AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren },
    });
  }

  private createWeiteresVerfahren(): void {
    router.push({
      name: "newabfrage",
      params: { art: AbfrageDtoArtAbfrageEnum.WeiteresVerfahren },
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
}
</script>

<style>
.button-speed-dial-entity-creation {
  margin-bottom: 16px;
}
</style>
