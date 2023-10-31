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
      <v-tooltip left>
        <template #activator="{ on }">
          <v-btn
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
            slot="activator"
            class="text-h6"
            fab
            dark
            color="green lighten-1"
            v-on="on"
          >
            <v-icon>mdi-comment-alert</v-icon>
          </v-btn>
          <v-tooltip left>
            <template #activator="{ on }">
              <v-btn
                fab
                dark
                small
                color="green lighten-1"
                v-on="on"
                @click="createBauleitplanverfahren"
              >
                <v-icon>mdi-water-well</v-icon>
              </v-btn>
            </template>
            <span>Bauleitplanverfahren anlegen</span>
          </v-tooltip>
          <v-tooltip left>
            <template #activator="{ on }">
              <v-btn
                fab
                dark
                small
                color="green lighten-1"
                v-on="on"
                @click="createBaugenehmigungsverfahren"
              >
                <v-icon>mdi-pillar</v-icon>
              </v-btn>
            </template>
            <span>Baugenehmigungsverfahren anlegen</span>
          </v-tooltip>
        </template>
        <span>Abfrage erstellen</span>
      </v-tooltip>
    </v-speed-dial>
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
import MapLayout from "@/components/map/MapLayout.vue";
import { AbfrageDtoArtAbfrageEnum } from "@/api/api-client/isi-backend";

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
