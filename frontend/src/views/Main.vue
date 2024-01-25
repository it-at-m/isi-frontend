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
        <city-map
          :geo-json="geoJson"
          :geo-json-options="geoJsonOptions"
        />
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
import CityMap from "@/components/map/CityMap.vue";
import router from "@/router";
import SearchAndFilterOptions from "@/components/search/filter/SearchAndFilterOptions.vue";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import _ from "lodash";
import MapLayout from "@/components/map/MapLayout.vue";
import {
  AbfrageDtoArtAbfrageEnum,
  SearchResultDto,
  SearchResultDtoTypeEnum,
  Wgs84Dto,
} from "@/api/api-client/isi-backend";
import { Feature, Point } from "geojson";
import L, { GeoJSONOptions } from "leaflet";
import iconAbfrageUrl from "@/assets/marker-icon-abfrage.png";
import iconBauvorhabenUrl from "@/assets/marker-icon-bauvorhaben.png";
import iconInfrastruktureinrichtungUrl from "@/assets/marker-icon-infrastruktureinrichtung.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

interface GenericSearchResult extends SearchResultDto {
  id?: string;
  coordinate?: Wgs84Dto;
}

type EntityFeature = Feature<Point, { type: SearchResultDtoTypeEnum; id: string }>;

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

  private iconOptions = {
    shadowUrl: iconShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  };

  private iconAbfrage = L.icon(this.iconOptions && { iconUrl: iconAbfrageUrl });

  private iconBauvorhaben = L.icon(this.iconOptions && { iconUrl: iconBauvorhabenUrl });

  private iconInfrastruktureinrichtung = L.icon(this.iconOptions && { iconUrl: iconInfrastruktureinrichtungUrl });

  private geoJsonOptions: GeoJSONOptions = {
    pointToLayer: (feature: EntityFeature, latlng) => {
      let icon: L.Icon;
      switch (feature.properties.type) {
        case "ABFRAGE":
          icon = this.iconAbfrage;
          break;
        case "BAUVORHABEN":
          icon = this.iconBauvorhaben;
          break;
        case "INFRASTRUKTUREINRICHTUNG":
          icon = this.iconInfrastruktureinrichtung;
          break;
        default:
          return L.marker(latlng);
      }
      return L.marker(latlng, { icon });
    },
    onEachFeature: (feature: EntityFeature, layer) => {
      layer.on("click", () => {
        switch (feature.properties.type) {
          case "ABFRAGE":
            router.push({
              name: "updateabfrage",
              params: { id: feature.properties.id },
            });
            break;
          case "BAUVORHABEN":
            router.push({
              name: "editBauvorhaben",
              params: { id: feature.properties.id },
            });
            break;
          case "INFRASTRUKTUREINRICHTUNG":
            router.push({
              name: "editInfrastruktureinrichtung",
              params: { id: feature.properties.id },
            });
            break;
        }
      });
    },
  };

  get searchQueryAndSortingStore(): SearchQueryAndSortingModel {
    return _.cloneDeep(this.$store.getters["search/requestSearchQueryAndSorting"]);
  }

  set searchQueryAndSortingStore(searchQueryForEntities: SearchQueryAndSortingModel) {
    this.$store.commit("search/requestSearchQueryAndSorting", _.cloneDeep(searchQueryForEntities));
  }

  get geoJson(): EntityFeature[] {
    const results: GenericSearchResult[] = this.$store.getters["search/searchResults"].searchResults;
    const features: EntityFeature[] = [];

    for (const result of results) {
      if (result.type && result.id && result.coordinate) {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [result.coordinate.longitude, result.coordinate.latitude] },
          properties: { type: result.type, id: result.id },
        });
      }
    }

    return features;
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
