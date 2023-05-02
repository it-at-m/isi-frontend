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
import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
import CityMap from "@/components/map/CityMap.vue";
import { LatLng, LatLngLiteral } from "leaflet";
import { MultiPolygonGeometryDto } from "@/api/api-client/isi-backend";
import { GeoJsonObject } from "geojson";
import GeodataEaiApiRequestMixin from "@/mixins/requests/eai/GeodataEaiApiRequestMixin";
import { FeatureDtoFlurstueckDto, PointGeometryDto } from "@/api/api-client/isi-geodata-eai";

@Component({
  components: { CityMap },
})
export default class Verortung extends Mixins(GeodataEaiApiRequestMixin) {
  @Prop()
  private readonly lookAt?: LatLngLiteral;

  private geoJson: Array<GeoJsonObject> = [];

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
      this.geoJson = this.mapToGeoJsonObject(flurstuecke);
    });
  }

  private mapToGeoJsonObject(flurstuecke: Array<FeatureDtoFlurstueckDto>) {
    return flurstuecke.map((flurstuecke: FeatureDtoFlurstueckDto) => {
      const geoJsonString: string = JSON.stringify(flurstuecke);
      return JSON.parse(geoJsonString) as GeoJsonObject;
    });
  }
}
</script>

<style scoped></style>
