<template>
  <v-container
    fluid
    class="fill-height pa-0"
  >
    <v-row class="fill-height justify-center mx-0">
      <v-col
        class="py-0"
        cols="12"
        md="3"
      >
        <search-result-list />
      </v-col>
      <v-col
        class="pa-0"
        cols="12"
        md="9"
      >
        <search-result-city-map />
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
          id="speed_dial_create_button"
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
      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
            id="infrastruktureinrichtung_create_button"
            class="text-h6"
            fab
            dark
            color="red lighten-1"
            v-on="on"
            @click="createInfrastruktureinrichtung"
          >
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>
        <span>Infrastruktureinrichtung erstellen</span>
      </v-tooltip>
      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
            id="bauvorhaben_create_button"
            class="text-h6"
            fab
            dark
            color="indigo lighten-1"
            v-on="on"
            @click="createBauvorhaben"
          >
            <v-icon>mdi-account-hard-hat</v-icon>
          </v-btn>
        </template>
        <span>Bauvorhaben erstellen</span>
      </v-tooltip>
      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
            id="bauleitplanverfahren_create_button"
            class="text-h6"
            fab
            dark
            color="green lighten-1"
            v-on="on"
            @click="createBauleitplanverfahren"
          >
            <v-icon>mdi-comment-alert</v-icon>
          </v-btn>
        </template>
        <span>Bauleitplanverfahren erstellen</span>
      </v-tooltip>
      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
            id="baugenehmigungsverfahren_create_button"
            class="text-h6"
            fab
            dark
            color="green lighten-1"
            v-on="on"
            @click="createBaugenehmigungsverfahren"
          >
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
        </template>
        <span>Baugenehmigungsverfahren erstellen</span>
      </v-tooltip>
      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
            id="weiteres_verfahren_create_button"
            class="text-h6"
            fab
            dark
            color="green lighten-1"
            v-on="on"
            @click="createWeiteresVerfahren"
          >
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
        </template>
        <span>Weiteres Verfahren erstellen</span>
      </v-tooltip>
    </v-speed-dial>
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

type EntityFeature = Feature<Point, { type: SearchResultDtoTypeEnum; id: string; name: string }>;

@Component({
  components: {
    SearchAndFilterOptions,
    SearchResultCityMap,
    SearchResultList,
    DefaultLayout,
  },
})
export default class Main extends Vue {
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
