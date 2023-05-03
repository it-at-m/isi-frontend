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
import {
  FeatureDtoFlurstueckDto,
  FeatureDtoGemarkungDto,
  FeatureDtoStadtbezirkDto,
  MultiPolygonGeometryDto as MultiPolygonGeometryDtoGeoDataEai,
  PointGeometryDto,
} from "@/api/api-client/isi-geodata-eai";
import _ from "lodash";
import VerortungModel from "@/types/model/common/VerortungModel";
import {
  AdresseDto,
  FlurstueckDto,
  GemarkungDto,
  MultiPolygonGeometryDto as MultiPolygonGeometryDtoBackend,
  StadtbezirkDto,
  VerortungDto,
} from "@/api/api-client/isi-backend";

@Component({
  components: { CityMap },
})
export default class Verortung extends Mixins(GeodataEaiApiRequestMixin) {
  private verortungCardTitle = "Verortung";

  @VModel({ type: VerortungModel }) verortungModel!: VerortungModel;

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
    this.geoJson = this.flurstueckeToGeoJsonObject(Array.from(this.selectedFlurstuecke.values()));
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
    const verortung: VerortungDto = await this.createVerortungDtoFromSelectedFlurstuecke();
    this.verortungModel = new VerortungModel(verortung);
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

  private flurstueckeToGeoJsonObject(flurstuecke: Array<FeatureDtoFlurstueckDto>): Array<GeoJsonObject> {
    return flurstuecke.map((flurstueck: FeatureDtoFlurstueckDto) => {
      const geoJsonString: string = JSON.stringify(flurstueck);
      return JSON.parse(geoJsonString) as GeoJsonObject;
    });
  }

  private createMultiPolygonFromSelectedFlurstuecke(): MultiPolygonGeometryDtoGeoDataEai {
    const multipolygon: MultiPolygonGeometryDtoGeoDataEai = {
      type: "MultiPolygon",
      coordinates: [],
    };
    this.selectedFlurstuecke.forEach((flurstueck: FeatureDtoFlurstueckDto, key: number) => {
      const flurstueckMultiPolygon = flurstueck.geometry as MultiPolygonGeometryDtoGeoDataEai;
      flurstueckMultiPolygon?.coordinates?.forEach((polygon) => {
        multipolygon.coordinates?.push(polygon);
      });
    });
    return multipolygon;
  }

  private async createVerortungDtoFromSelectedFlurstuecke(): Promise<VerortungDto> {
    const multipolygon = this.createMultiPolygonFromSelectedFlurstuecke();
    const unifiedMultipolygon = await this.getUnionOfMultipolygon(multipolygon, true);
    const stadtbezirke: Array<FeatureDtoStadtbezirkDto> = await this.getStadtbezirkeForMultipolygon(
      unifiedMultipolygon,
      true
    );
    const stadtbezirkeBackend: Array<StadtbezirkDto> =
      this.createStadtbezirkeBackendFromStadtbezirkeGeoDataEai(stadtbezirke);
    const gemarkungen: Array<FeatureDtoGemarkungDto> = await this.getGemarkungenForMultipolygon(
      unifiedMultipolygon,
      true
    );
    const gemarkungenBackend: Array<GemarkungDto> = this.createGemarkungenBackendFromGemarkungenGeoDataEai(gemarkungen);
    this.selectedFlurstuecke.forEach((selectedFlurstueck) => {
      const flurstueckBackend: FlurstueckDto = this.createFlurstueckBackendFromFlurstueckGeoDataEai(selectedFlurstueck);
      const matchingGemarkung = gemarkungenBackend.find(
        (gemarkung) => gemarkung.nummer === selectedFlurstueck.properties?.gemarkung
      );
      matchingGemarkung?.flurstuecke.add(flurstueckBackend);
    });
    const verortung: VerortungDto = {
      gemarkungen: new Set<GemarkungDto>(gemarkungenBackend),
      stadtbezirke: new Set<StadtbezirkDto>(stadtbezirkeBackend),
      multiPolygon: JSON.parse(JSON.stringify(unifiedMultipolygon)) as MultiPolygonGeometryDtoBackend,
    };
    return verortung;
  }

  private createStadtbezirkeBackendFromStadtbezirkeGeoDataEai(
    stadtbezirkeGeoDataEai: Array<FeatureDtoStadtbezirkDto>
  ): Array<StadtbezirkDto> {
    return stadtbezirkeGeoDataEai.map((stadtbezirk) => {
      return {
        nummer: stadtbezirk.properties?.stadtbezirkNummer,
        name: stadtbezirk.properties?.name,
        multiPolygon: JSON.parse(JSON.stringify(stadtbezirk.geometry)) as MultiPolygonGeometryDtoBackend,
      };
    });
  }

  private createGemarkungenBackendFromGemarkungenGeoDataEai(
    gemarkungenGeoDataEai: Array<FeatureDtoGemarkungDto>
  ): Array<GemarkungDto> {
    return gemarkungenGeoDataEai.map((gemarkung) => {
      return {
        flurstuecke: new Set<FlurstueckDto>(),
        name: gemarkung.properties?.gemarkungName,
        nummer: gemarkung.properties?.gemarkung,
        multiPolygon: JSON.parse(JSON.stringify(gemarkung.geometry)) as MultiPolygonGeometryDtoBackend,
      };
    });
  }

  private createFlurstueckBackendFromFlurstueckGeoDataEai(
    flurstueckGeoDataEai: FeatureDtoFlurstueckDto
  ): FlurstueckDto {
    return {
      nummer: [
        flurstueckGeoDataEai.properties?.fluerstueckNummerZ,
        flurstueckGeoDataEai.properties?.fluerstueckNummerN,
      ].join("/"),
      zaehler: flurstueckGeoDataEai.properties?.fluerstueckNummerZ,
      nenner: flurstueckGeoDataEai.properties?.fluerstueckNummerN,
      flaecheQm: flurstueckGeoDataEai.properties?.flaecheQm,
      eigentumsart: flurstueckGeoDataEai.properties?.eigentumsart,
      eigentumsartBedeutung: flurstueckGeoDataEai.properties?.eigentumsartBedeutung,
      multiPolygon: JSON.parse(JSON.stringify(flurstueckGeoDataEai.geometry)) as MultiPolygonGeometryDtoBackend,
    };
  }
}
</script>

<style scoped></style>
