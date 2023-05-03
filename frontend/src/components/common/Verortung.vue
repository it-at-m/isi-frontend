<template>
  <field-group-card :card-title="verortungCardTitle">
    <city-map
      height="300"
      :zoom="14"
      expandable
      editable
      :look-at="coordinate"
      :geo-json="geoJsonObjectsToShow"
      @click-in-map="handleClickInMap($event)"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />
  </field-group-card>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch, VModel } from "vue-property-decorator";
import CityMap from "@/components/map/CityMap.vue";
import { LatLng, LatLngLiteral, polygon } from "leaflet";
import { GeoJsonObject } from "geojson";
import GeodataEaiApiRequestMixin from "@/mixins/requests/eai/GeodataEaiApiRequestMixin";
import { FeatureDtoFlurstueckDto, MultiPolygonGeometryDto, PointGeometryDto } from "@/api/api-client/isi-geodata-eai";
import _ from "lodash";
import VerortungModel from "@/types/model/common/VerortungModel";
import { AdresseDto } from "@/api/api-client/isi-backend";

@Component({
  components: { CityMap },
})
export default class Verortung extends Mixins(GeodataEaiApiRequestMixin) {
  private verortungCardTitle = "Verortung";

  @VModel({ type: VerortungModel }) abfrage!: VerortungModel;

  @Prop()
  private readonly lookAt?: AdresseDto;

  private geoJson: Array<GeoJsonObject> = [];

  private selectedFlurstuecke: Map<number, FeatureDtoFlurstueckDto> = new Map<number, FeatureDtoFlurstueckDto>();

  get coordinate(): LatLngLiteral | undefined {
    const lat = this.lookAt?.coordinate?.latitude;
    const lng = this.lookAt?.coordinate?.longitude;

    if (lat && lng) {
      return { lat, lng };
    }
    return undefined;
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

  private handleDeselectGeoJson(): void {
    this.selectedFlurstuecke = new Map<number, FeatureDtoFlurstueckDto>();
  }

  private async handleAcceptSelectedGeoJson(): Promise<void> {
    const multipolygon = this.createMultiPolygonFromSelectedFlurstuecke();
    const unifiedMultipolygon = await this.getUnionOfMultipolygon(multipolygon, true);
    const stadtbezirke = await this.getStadtbezirkeForMultipolygon(unifiedMultipolygon, true);
    const gemarkungen = await this.getGemarkungenForMultipolygon(unifiedMultipolygon, true);
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

  private createMultiPolygonFromSelectedFlurstuecke(): MultiPolygonGeometryDto {
    const multipolygon: MultiPolygonGeometryDto = {
      type: "MultiPolygon",
      coordinates: [],
    };
    this.selectedFlurstuecke.forEach((flurstueck: FeatureDtoFlurstueckDto, key: number) => {
      const flurstueckMultiPolygon = flurstueck.geometry as MultiPolygonGeometryDto;
      flurstueckMultiPolygon?.coordinates?.forEach((polygon) => {
        multipolygon.coordinates?.push(polygon);
      });
    });
    return multipolygon;
  }
}
</script>

<style scoped></style>
