<template>
  <city-map
    :geo-json="geoJson"
    :geo-json-options="geoJsonOptions"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
  AbfrageDtoArtAbfrageEnum,
  AbfrageSearchResultDto,
  BauvorhabenSearchResultDto,
  InfrastruktureinrichtungSearchResultDto,
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
import CityMap from "./CityMap.vue";
import router from "@/router";

type EntityFeature = Feature<Point, { type: SearchResultDtoTypeEnum; id: string; name: string }>;
@Component({
  components: {
    CityMap,
  },
})
export default class SearchResultCityMap extends Vue {
  private iconOptions = {
    shadowUrl: iconShadowUrl,
    iconSize: [25, 41] as [number, number],
    iconAnchor: [12, 41] as [number, number],
    popupAnchor: [1, -34] as [number, number],
    tooltipAnchor: [16, -28] as [number, number],
    shadowSize: [41, 41] as [number, number],
  };
  private iconAbfrage = L.icon({ iconUrl: iconAbfrageUrl, ...this.iconOptions });
  private iconBauvorhaben = L.icon({ iconUrl: iconBauvorhabenUrl, ...this.iconOptions });
  private iconInfrastruktureinrichtung = L.icon({ iconUrl: iconInfrastruktureinrichtungUrl, ...this.iconOptions });

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
      layer.bindTooltip(
        `<b>${feature.properties.name}</b><br>
                   Typ: ${this.getSearchResultDtoTypeFormattedString(feature.properties.type)}`,
      );

      layer.on("mouseover", function () {
        layer.openTooltip();
      });
      layer.on("mouseout", function () {
        layer.closeTooltip();
      });

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
  get geoJson(): EntityFeature[] {
    const results: SearchResultDto[] = this.$store.getters["search/searchResults"].searchResults;
    const features: EntityFeature[] = [];

    for (const result of results) {
      const type = result.type;
      let id: string | undefined;
      let name: string | undefined;
      let coordinate: Wgs84Dto | undefined;

      switch (type) {
        case "ABFRAGE":
          id = (result as AbfrageSearchResultDto).id;
          name = (result as AbfrageSearchResultDto).name;
          coordinate = (result as AbfrageSearchResultDto).coordinate;
          break;
        case "BAUVORHABEN":
          id = (result as BauvorhabenSearchResultDto).id;
          name = (result as BauvorhabenSearchResultDto).nameVorhaben;
          coordinate = (result as BauvorhabenSearchResultDto).coordinate;
          break;
        case "INFRASTRUKTUREINRICHTUNG":
          id = (result as InfrastruktureinrichtungSearchResultDto).id;
          name = (result as InfrastruktureinrichtungSearchResultDto).nameEinrichtung;
          coordinate = (result as InfrastruktureinrichtungSearchResultDto).coordinate;
          break;
      }

      if (type && id && name && coordinate) {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [coordinate.longitude, coordinate.latitude] },
          properties: { type, id, name },
        });
      }
    }
    return features;
  }

  private getSearchResultDtoTypeFormattedString(searchResultDtoTypeEnum: SearchResultDtoTypeEnum): string {
    if (searchResultDtoTypeEnum == SearchResultDtoTypeEnum.Abfrage) {
      return "Abfrage";
    } else if (searchResultDtoTypeEnum == SearchResultDtoTypeEnum.Bauvorhaben) {
      return "Bauvorhaben";
    } else if (searchResultDtoTypeEnum == SearchResultDtoTypeEnum.Infrastruktureinrichtung) {
      return "Infrastruktureinrichtung";
    }
    return "";
  }
}
</script>

<style scoped></style>
