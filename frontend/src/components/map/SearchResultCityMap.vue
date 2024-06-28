<template>
  <city-map
    :look-at="CITY_CENTER"
    :look-at-zoom="12"
    :geo-json="geoJson"
    :geo-json-options="geoJsonOptions"
    :layers-for-layer-control="layersForLayerControl"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  type AbfrageSearchResultDto,
  type BauvorhabenSearchResultDto,
  type InfrastruktureinrichtungSearchResultDto,
  type SearchResultDto,
  type Wgs84Dto,
  SearchResultDtoTypeEnum,
} from "@/api/api-client/isi-backend";
import type { Feature, MultiPolygon, Point } from "geojson";
import L, { type GeoJSONOptions, Layer } from "leaflet";
import CityMap from "./CityMap.vue";
import { useRouter } from "vue-router";
import { COLOR_POLYGON_UMGRIFF, ICON_ABFRAGE, ICON_BAUVORHABEN, ICON_INFRASTRUKTUREINRICHTUNG } from "@/utils/MapUtil";
import _ from "lodash";
import { useSearchStore } from "@/stores/SearchStore";
import { CITY_CENTER } from "@/utils/MapUtil";
type EntityFeature = Feature<Point | MultiPolygon, { type: SearchResultDtoTypeEnum; id: string; name: string }>;

const router = useRouter();

const geoJsonOptions: GeoJSONOptions = {
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
                   Typ: ${getSearchResultDtoTypeFormattedString(feature.properties.type)}`;
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
        router.push("/abfrage/" + feature.properties.id);
      } else if (feature.properties.type === SearchResultDtoTypeEnum.Bauvorhaben && feature.geometry.type === "Point") {
        router.push("/bauvorhaben/" + feature.properties.id);
      } else if (feature.properties.type === SearchResultDtoTypeEnum.Infrastruktureinrichtung) {
        router.push("/infrastruktureinrichtung/" + feature.properties.id);
      }
    });
  },
};

const searchStore = useSearchStore();

const geoJson = computed(() => {
  const results: SearchResultDto[] = searchResults.value;
  const features: EntityFeature[] = [];

  for (const result of results) {
    const type = result.type;
    let id: string | undefined;
    let name: string | undefined;
    let coordinate: Wgs84Dto | undefined;

    if (type === SearchResultDtoTypeEnum.Abfrage) {
      id = (result as AbfrageSearchResultDto).id;
      name = (result as AbfrageSearchResultDto).name;
      coordinate = (result as AbfrageSearchResultDto).coordinate;
    } else if (type === SearchResultDtoTypeEnum.Bauvorhaben) {
      id = (result as BauvorhabenSearchResultDto).id;
      name = (result as BauvorhabenSearchResultDto).nameVorhaben;
      coordinate = (result as BauvorhabenSearchResultDto).coordinate;
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
    }
  }
  return features;
});

const layersForLayerControl = computed(() => {
  const featureUmgriffe: EntityFeature[] = [];
  const results: SearchResultDto[] = searchResults.value;
  _.toArray(results)
    .filter((result) => result.type === SearchResultDtoTypeEnum.Bauvorhaben)
    .forEach((result) => {
      const type = result.type;
      const id = (result as BauvorhabenSearchResultDto).id;
      const name = (result as BauvorhabenSearchResultDto).nameVorhaben;
      const umgriff = (result as BauvorhabenSearchResultDto).umgriff;
      if (umgriff) {
        const feature = {
          type: "Feature",
          geometry: { type: "MultiPolygon", coordinates: umgriff.coordinates } as MultiPolygon,
          properties: { type, id, name },
        } as EntityFeature;
        featureUmgriffe.push(feature);
      }
    });
  const layerGroup = new L.LayerGroup();
  L.geoJSON(featureUmgriffe, geoJsonOptions).addTo(layerGroup);
  const layers = new Map<string, Layer>();
  layers.set("Umgriffe Bauvorhaben", layerGroup);
  return layers;
});

const searchResults = computed(() => {
  return !_.isNil(searchStore.searchResults.searchResults) ? searchStore.searchResults.searchResults : [];
});

function getSearchResultDtoTypeFormattedString(searchResultDtoTypeEnum: SearchResultDtoTypeEnum): string {
  if (searchResultDtoTypeEnum == SearchResultDtoTypeEnum.Abfrage) {
    return "Abfrage";
  } else if (searchResultDtoTypeEnum == SearchResultDtoTypeEnum.Bauvorhaben) {
    return "Bauvorhaben";
  } else if (searchResultDtoTypeEnum == SearchResultDtoTypeEnum.Infrastruktureinrichtung) {
    return "Infrastruktureinrichtung";
  }
  return "";
}
</script>
