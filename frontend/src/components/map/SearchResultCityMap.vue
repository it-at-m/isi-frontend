<template>
  <city-map
    :geo-json="geoJson"
    :geo-json-options="geoJsonOptions"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
  AbfrageSearchResultDto,
  BauvorhabenSearchResultDto,
  InfrastruktureinrichtungSearchResultDto,
  MultiPolygonGeometryDto,
  SearchResultDto,
  SearchResultDtoTypeEnum,
  Wgs84Dto,
} from "@/api/api-client/isi-backend";
import { Feature, MultiPolygon, Point } from "geojson";
import L, { GeoJSONOptions } from "leaflet";
import CityMap from "./CityMap.vue";
import router from "@/router";
import { COLOR_POLYGON_UMGRIFF, ICON_ABFRAGE, ICON_BAUVORHABEN, ICON_INFRASTRUKTUREINRICHTUNG } from "@/utils/MapUtil";

type EntityFeature = Feature<Point | MultiPolygon, { type: SearchResultDtoTypeEnum; id: string; name: string }>;
@Component({
  components: {
    CityMap,
  },
})
export default class SearchResultCityMap extends Vue {
  private geoJsonOptions: GeoJSONOptions = {
    pointToLayer: (feature: EntityFeature, latlng) => {
      let icon: L.Icon;
      if (feature.properties.type === SearchResultDtoTypeEnum.Abfrage) {
        icon = ICON_ABFRAGE;
      } else if (feature.properties.type === SearchResultDtoTypeEnum.Bauvorhaben && feature.geometry.type === "Point") {
        icon = ICON_BAUVORHABEN;
      } else if (feature.properties.type === SearchResultDtoTypeEnum.Infrastruktureinrichtung) {
        icon = ICON_INFRASTRUKTUREINRICHTUNG;
      } else {
        return L.marker(latlng);
      }
      return L.marker(latlng, { icon });
    },
    style: function () {
      return { color: COLOR_POLYGON_UMGRIFF };
    },
    onEachFeature: (feature: EntityFeature, layer) => {
      const contentTooltip = `<b>${feature.properties.name}</b><br>
                   Typ: ${this.getSearchResultDtoTypeFormattedString(feature.properties.type)}`;
      if (feature.geometry.type === "Point") {
        layer.bindTooltip(contentTooltip);
      } else {
        layer.bindTooltip(contentTooltip, {
          sticky: true,
          direction: "top",
          offset: L.point(0, -2),
        });
      }

      layer.on("mouseover", function () {
        layer.openTooltip();
      });
      layer.on("mouseout", function () {
        layer.closeTooltip();
      });

      layer.on("click", () => {
        if (feature.properties.type === SearchResultDtoTypeEnum.Abfrage) {
          router.push({
            name: "updateabfrage",
            params: { id: feature.properties.id },
          });
        } else if (
          feature.properties.type === SearchResultDtoTypeEnum.Bauvorhaben &&
          feature.geometry.type === "Point"
        ) {
          router.push({
            name: "editBauvorhaben",
            params: { id: feature.properties.id },
          });
        } else if (feature.properties.type === SearchResultDtoTypeEnum.Infrastruktureinrichtung) {
          router.push({
            name: "editInfrastruktureinrichtung",
            params: { id: feature.properties.id },
          });
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
      let umgriff: MultiPolygonGeometryDto | undefined;

      if (type === SearchResultDtoTypeEnum.Abfrage) {
        id = (result as AbfrageSearchResultDto).id;
        name = (result as AbfrageSearchResultDto).name;
        coordinate = (result as AbfrageSearchResultDto).coordinate;
      } else if (type === SearchResultDtoTypeEnum.Bauvorhaben) {
        id = (result as BauvorhabenSearchResultDto).id;
        name = (result as BauvorhabenSearchResultDto).nameVorhaben;
        coordinate = (result as BauvorhabenSearchResultDto).coordinate;
        umgriff = (result as BauvorhabenSearchResultDto).umgriff;
      } else if (type === SearchResultDtoTypeEnum.Infrastruktureinrichtung) {
        id = (result as InfrastruktureinrichtungSearchResultDto).id;
        name = (result as InfrastruktureinrichtungSearchResultDto).nameEinrichtung;
        coordinate = (result as InfrastruktureinrichtungSearchResultDto).coordinate;
      }

      if (type && id && name && coordinate) {
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [coordinate.longitude, coordinate.latitude] },
          properties: { type, id, name },
        });
        if (umgriff) {
          features.push({
            type: "Feature",
            geometry: { type: "MultiPolygon", coordinates: umgriff.coordinates } as MultiPolygon,
            properties: { type, id, name },
          });
        }
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
