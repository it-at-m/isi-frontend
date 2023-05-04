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
import { Feature, GeoJsonObject, MultiPolygon } from "geojson";
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

  private selectedFlurstuecke: Map<string, FlurstueckDto> = new Map<string, FlurstueckDto>();

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
    console.log(Array.from(this.selectedFlurstuecke.values()));

    this.geoJson = this.flurstueckeToGeoJsonFeature(Array.from(this.selectedFlurstuecke.values()));
    console.log("this.geoJson");
    console.log(this.geoJson);
  }

  @Watch("verortungModel", { deep: true })
  private onVerortungModelChanged(): void {
    const flurstueckeFromVerortungModel = Array.from(this.verortungModel.gemarkungen).flatMap((gemarkung) =>
      Array.from(gemarkung.flurstuecke)
    );
    console.log(flurstueckeFromVerortungModel);
    this.selectedFlurstuecke = this.createMapForFlurstuecke(flurstueckeFromVerortungModel);
    console.log("this.selectedFlurstuecke");
    console.log(this.selectedFlurstuecke);
  }

  private handleClickInMap(latlng: LatLng): void {
    const point = this.createPointGeometry(latlng);
    this.getFlurstueckeForPoint(point, true).then((flurstuecke: Array<FeatureDtoFlurstueckDto>) => {
      const flurstueckeBackend = this.flurstueckeGeoDataEaiToFlurstueckeBackend(flurstuecke);
      this.selectedFlurstuecke = this.adaptMapForSelectedFlurstuecke(flurstueckeBackend);
    });
  }

  private handleDeselectGeoJson(): void {
    this.selectedFlurstuecke = new Map<string, FlurstueckDto>();
  }

  private async handleAcceptSelectedGeoJson(): Promise<void> {
    const verortung: VerortungDto = await this.createVerortungDtoFromSelectedFlurstuecke();
    this.verortungModel = new VerortungModel(verortung);
  }

  private adaptMapForSelectedFlurstuecke(flurstuecke: Array<FlurstueckDto>): Map<string, FlurstueckDto> {
    const clonedMap = _.cloneDeep(this.selectedFlurstuecke);
    flurstuecke.forEach((flurstueck: FlurstueckDto) => {
      const flurstueckNummer: string = _.isNil(flurstueck.nummer) ? "" : flurstueck.nummer;
      const alreadySelected = clonedMap.has(flurstueckNummer);
      if (alreadySelected) {
        clonedMap.delete(flurstueckNummer);
      } else {
        clonedMap.set(flurstueckNummer, flurstueck);
      }
    });
    return clonedMap;
  }

  private createMapForFlurstuecke(flurstuecke: Array<FlurstueckDto>): Map<string, FlurstueckDto> {
    const flurstueckMap = new Map<string, FlurstueckDto>();
    flurstuecke.forEach((flurstueck: FlurstueckDto) => {
      const flurstueckNummer: string = _.isNil(flurstueck.nummer) ? "" : flurstueck.nummer;
      flurstueckMap.set(flurstueckNummer, flurstueck);
    });
    return flurstueckMap;
  }

  private createPointGeometry(latlng: LatLng): PointGeometryDto {
    return {
      type: "Point",
      coordinates: [latlng.lng, latlng.lat],
    };
  }

  private createMultiPolygonGeometryFromSelectedFlurstuecke(): MultiPolygonGeometryDtoGeoDataEai {
    const multipolygon: MultiPolygonGeometryDtoGeoDataEai = {
      type: "MultiPolygon",
      coordinates: [],
    };
    this.selectedFlurstuecke.forEach((flurstueck: FlurstueckDto, key: string) => {
      const flurstueckMultiPolygon = flurstueck.multiPolygon as MultiPolygonGeometryDtoBackend;
      flurstueckMultiPolygon?.coordinates?.forEach((polygon) => {
        multipolygon.coordinates?.push(polygon);
      });
    });
    return multipolygon;
  }

  private async createVerortungDtoFromSelectedFlurstuecke(): Promise<VerortungDto> {
    const multipolygon = this.createMultiPolygonGeometryFromSelectedFlurstuecke();
    const unifiedMultipolygon = await this.getUnionOfMultipolygon(multipolygon, true);
    const stadtbezirke: Array<FeatureDtoStadtbezirkDto> = await this.getStadtbezirkeForMultipolygon(
      unifiedMultipolygon,
      true
    );
    const stadtbezirkeBackend: Array<StadtbezirkDto> = this.stadtbezirkeGeoDataEaiToStadtbezirkeBackend(stadtbezirke);
    const gemarkungen: Array<FeatureDtoGemarkungDto> = await this.getGemarkungenForMultipolygon(
      unifiedMultipolygon,
      true
    );
    const gemarkungenBackend: Array<GemarkungDto> = this.gemarkungenGeoDataEaiToGemarkungenBackend(gemarkungen);
    this.selectedFlurstuecke.forEach((selectedFlurstueck, key) => {
      const matchingGemarkung = gemarkungenBackend.find(
        (gemarkung) => gemarkung.nummer === selectedFlurstueck.gemarkungNummer
      );
      matchingGemarkung?.flurstuecke.add(selectedFlurstueck);
    });
    const verortung: VerortungDto = {
      gemarkungen: new Set<GemarkungDto>(gemarkungenBackend),
      stadtbezirke: new Set<StadtbezirkDto>(stadtbezirkeBackend),
      multiPolygon: JSON.parse(JSON.stringify(unifiedMultipolygon)) as MultiPolygonGeometryDtoBackend,
    };
    return verortung;
  }

  private stadtbezirkeGeoDataEaiToStadtbezirkeBackend(
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

  private gemarkungenGeoDataEaiToGemarkungenBackend(
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

  private flurstueckeGeoDataEaiToFlurstueckeBackend(
    flurstueckGeoDataEai: Array<FeatureDtoFlurstueckDto>
  ): Array<FlurstueckDto> {
    return flurstueckGeoDataEai.map(this.flurstueckGeoDataEaiToFlurstueckBackend);
  }

  private flurstueckGeoDataEaiToFlurstueckBackend(flurstueckGeoDataEai: FeatureDtoFlurstueckDto): FlurstueckDto {
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
      gemarkungNummer: flurstueckGeoDataEai.properties?.gemarkung,
      multiPolygon: JSON.parse(JSON.stringify(flurstueckGeoDataEai.geometry)) as MultiPolygonGeometryDtoBackend,
    };
  }

  private flurstueckeToGeoJsonFeature(flurstuecke: Array<FlurstueckDto>): Array<Feature> {
    return flurstuecke.map((flurstueck: FlurstueckDto) => {
      return {
        type: "Feature",
        geometry: JSON.parse(JSON.stringify(flurstueck.multiPolygon)) as MultiPolygon,
        properties: {
          nummer: flurstueck.nummer,
          zaehler: flurstueck.zaehler,
          nenner: flurstueck.nenner,
          eigentumsart: flurstueck.eigentumsart,
          eigentumsartBedeutung: flurstueck.eigentumsartBedeutung,
          flaecheQm: flurstueck.flaecheQm,
        },
      };
    });
  }
}
</script>

<style scoped></style>
