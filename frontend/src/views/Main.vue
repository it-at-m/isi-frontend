<template>
  <v-container fluid>
    <spreadsheet-bauratendatei-input
      v-model="input"
      :is-editable="true"
      :foerderarten-bauratendatei-input-basis="foerderarten"
    >
    </spreadsheet-bauratendatei-input>
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
import {
  AbfrageDtoArtAbfrageEnum,
  SearchResultDtoTypeEnum,
  WohneinheitenProFoerderartProJahrDto,
} from "@/api/api-client/isi-backend";
import { Feature, Point } from "geojson";
import SpreadsheetBauratendateiInput from "@/components/abfragevarianten/SpreadsheetBauratendateiInput.vue";

type EntityFeature = Feature<Point, { type: SearchResultDtoTypeEnum; id: string; name: string }>;

@Component({
  components: {
    SpreadsheetBauratendateiInput,
    SearchAndFilterOptions,
    SearchResultCityMap,
    SearchResultList,
    DefaultLayout,
  },
})
export default class Main extends Vue {
  private input: Array<WohneinheitenProFoerderartProJahrDto> = [
    {
      jahr: "2024",
      foerderart: "test1",
      wohneinheiten: 100,
    },
    {
      jahr: "2024",
      foerderart: "test2",
      wohneinheiten: 100,
    },
    {
      jahr: "2025",
      foerderart: "test1",
      wohneinheiten: 99,
    },
    {
      jahr: "2025",
      foerderart: "test2",
      wohneinheiten: 99,
    },
  ];

  private foerderarten: Array<string> = ["test1", "test2"];

  private speedDialOpen = false;

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
