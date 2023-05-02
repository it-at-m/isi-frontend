<template>
  <city-map
    height="300"
    :zoom="14"
    expandable
    :look-at="coordinate"
    :geo-json="geoJsonObjectsToShow"
    @click-in-map="handleClickInMap($event)"
    @clear-geo-json="handleClearGeoJson"
  />
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch } from "vue-property-decorator";
import CityMap from "@/components/map/CityMap.vue";
import { LatLng, LatLngLiteral } from "leaflet";
import { GeoJsonObject } from "geojson";
import GeodataEaiApiRequestMixin from "@/mixins/requests/eai/GeodataEaiApiRequestMixin";
import { FeatureDtoFlurstueckDto, FlurstueckDto, PointGeometryDto } from "@/api/api-client/isi-geodata-eai";
import _ from "lodash";

@Component({
  components: { CityMap },
})
export default class Verortung extends Mixins(GeodataEaiApiRequestMixin) {
  @Prop()
  private readonly lookAt?: LatLngLiteral;

  private geoJson: Array<GeoJsonObject> = [];

  private selectedFlurstuecke: Map<number, FeatureDtoFlurstueckDto> = new Map<number, FeatureDtoFlurstueckDto>();

  get coordinate(): LatLngLiteral | undefined {
    return this.lookAt;
  }

  get geoJsonObjectsToShow(): Array<GeoJsonObject> {
    return this.geoJson;
  }

  @Watch("selectedFlurstuecke", { deep: true })
  private onSelectedFlurstueckeChanged(): void {
    this.geoJson = this.mapToGeoJsonObject(Array.from(this.selectedFlurstuecke.values()));
  }

  private handleClickInMap(latlng: LatLng): void {
    const point = this.createPointGeometry(latlng);
    this.getFlurstueckeForPoint(point, true).then((flurstuecke: Array<FeatureDtoFlurstueckDto>) => {
      this.selectedFlurstuecke = this.createMapOfSelectedFlurstuecke(flurstuecke);
    });
  }

  private handleClearGeoJson(): void {
    this.selectedFlurstuecke = new Map<number, FeatureDtoFlurstueckDto>();
  }

  private createPointGeometry(latlng: LatLng): PointGeometryDto {
    return {
      type: "Point",
      coordinates: [latlng.lng, latlng.lat],
    };
  }

  private createMapOfSelectedFlurstuecke(
    flurstuecke: Array<FeatureDtoFlurstueckDto>
  ): Map<number, FeatureDtoFlurstueckDto> {
    const clonedMap = _.cloneDeep(this.selectedFlurstuecke);
    flurstuecke.forEach((flurstueck: FeatureDtoFlurstueckDto) => {
      const flurstueckId = _.isNil(flurstueck.properties)
        ? -1
        : _.isNil(flurstueck.properties.flurstueckId)
        ? -1
        : flurstueck.properties.flurstueckId;
      const alreadySelected = clonedMap.has(flurstueckId);
      if (alreadySelected) {
        clonedMap.delete(flurstueckId);
      } else {
        clonedMap.set(flurstueckId, flurstueck);
      }
    });
    return clonedMap;
  }

  private mapToGeoJsonObject(flurstuecke: Array<FeatureDtoFlurstueckDto>): Array<GeoJsonObject> {
    return flurstuecke.map((flurstueck: FeatureDtoFlurstueckDto) => {
      const geoJsonString: string = JSON.stringify(flurstueck);
      return JSON.parse(geoJsonString) as GeoJsonObject;
    });
  }
}
</script>

<style scoped></style>
