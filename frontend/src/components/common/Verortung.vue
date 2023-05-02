<template>
  <city-map
    height="300"
    :zoom="14"
    expandable
    :look-at="coordinate"
    :geo-json="geoJsonObjectsToShow"
    @click-in-map="handleClickInMap($event)"
  />
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
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

  private selectedFlurstuecke: Map<FlurstueckDto, FeatureDtoFlurstueckDto> = new Map<
    FlurstueckDto,
    FeatureDtoFlurstueckDto
  >();

  get coordinate(): LatLngLiteral | undefined {
    return this.lookAt;
  }

  get geoJsonObjectsToShow(): Array<GeoJsonObject> {
    return this.geoJson;
  }

  private handleClickInMap(latlng: LatLng): void {
    const point: PointGeometryDto = {
      type: "Point",
      coordinates: [latlng.lng, latlng.lat],
    };
    this.getFlurstueckeForPoint(point, true).then((flurstuecke: Array<FeatureDtoFlurstueckDto>) => {
      flurstuecke.forEach((flurstueck: FeatureDtoFlurstueckDto) => {
        const flurstueckProperties = _.isNil(flurstueck.properties) ? {} : flurstueck.properties;
        const alreadySelected = this.selectedFlurstuecke.has(flurstueckProperties);
        if (alreadySelected) {
          this.selectedFlurstuecke.delete(flurstueckProperties);
        } else {
          this.selectedFlurstuecke.set(flurstueckProperties, flurstueck);
        }
      });
      this.geoJson = this.mapToGeoJsonObject(Array.from(this.selectedFlurstuecke.values()));
    });
  }

  private mapToGeoJsonObject(flurstuecke: Array<FeatureDtoFlurstueckDto>) {
    return flurstuecke.map((flurstueck: FeatureDtoFlurstueckDto) => {
      const geoJsonString: string = JSON.stringify(flurstueck);
      return JSON.parse(geoJsonString) as GeoJsonObject;
    });
  }
}
</script>

<style scoped></style>
