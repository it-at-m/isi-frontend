<template>
  <field-group-card :card-title="verortungCardTitle">
    <city-map
      height="300"
      :zoom="14"
      expandable
      :editable="isVerortungEditable"
      :look-at="lookAt"
      :geo-json="geoJson"
      @click-in-map="handleClickInMap($event)"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />
    <v-label v-if="pointToDisplayNotEmpty">Koordinaten</v-label>
    <v-chip-group
      v-if="pointToDisplayNotEmpty"
      title="Koordinate"
      active-class="primary--text"
      column
    >
      <v-chip>
        <div>{{ pointToDisplay }}</div>
      </v-chip>
    </v-chip-group>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Prop, Mixins, VModel, Watch } from "vue-property-decorator";
import CityMap from "@/components/map/CityMap.vue";
import { LatLng, LatLngLiteral } from "leaflet";
import { Feature, Point } from "geojson";
import _ from "lodash";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import {
  AdresseDto,
  FlurstueckDto,
  GemarkungDto,
  StadtbezirkDto,
  VerortungPointDto,
  MultiPolygonGeometryDto as MultiPolygonGeometryDtoBackend,
  Wgs84Dto,
  UtmDto,
} from "@/api/api-client/isi-backend";
import {
  FeatureDtoFlurstueckDto,
  FeatureDtoGemarkungDto,
  FeatureDtoStadtbezirkDto,
  PointGeometryDto,
} from "@/api/api-client/isi-geodata-eai";
import GeodataEaiApiRequestMixin from "@/mixins/requests/eai/GeodataEaiApiRequestMixin";
import KoordinatenApiRequestMixin from "@/mixins/requests/KoordinatenApiRequestMixin";
import VerortungPointModel from "@/types/model/common/VerortungPointModel";

@Component({
  components: { CityMap },
})
export default class InfrastruktureinrichtungVerortung extends Mixins(
  SaveLeaveMixin,
  GeodataEaiApiRequestMixin,
  KoordinatenApiRequestMixin,
) {
  @VModel({ type: VerortungPointModel }) verortungModel?: VerortungPointModel;

  @Prop({ type: Object })
  private adresse?: AdresseDto;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get isVerortungEditable(): boolean {
    return this.isEditable && !this.adresseValid();
  }

  private adresseValid(): boolean {
    return !_.isNil(this.adresse) && !_.isEmpty(this.adresse.strasse) && !_.isNil(this.adresseCoordinate);
  }

  private verortungCardTitle = "Verortung";

  private pointCoordinatesAsUtm32 = "";

  /**
   * Repräsentiert eine einzige Punktkoordinate.
   */
  private geoJson: Array<Feature<Point>> = [];

  get adresseCoordinate(): LatLngLiteral | undefined {
    const lng = this.adresse?.coordinate?.longitude;
    const lat = this.adresse?.coordinate?.latitude;

    if (lng && lat) {
      return { lng, lat };
    }
    return undefined;
  }

  get verortungPointCoordinate(): LatLngLiteral | undefined {
    let lng: number = Number.NaN;
    let lat: number = Number.NaN;

    if (
      !_.isNil(this.verortungModel) &&
      !_.isNil(this.verortungModel.point) &&
      this.verortungModel.point.coordinates.length == 2
    ) {
      lng = this.verortungModel.point.coordinates[0];
      lat = this.verortungModel.point.coordinates[1];
    }
    if (!_.isNaN(lng) && !_.isNaN(lat)) {
      return { lng, lat };
    }
    return undefined;
  }

  get pointToDisplay(): string {
    return this.pointCoordinatesAsUtm32;
  }

  set pointToDisplay(pointCoordinatesAsUtm32: string) {
    this.pointCoordinatesAsUtm32 = pointCoordinatesAsUtm32;
  }

  get pointToDisplayNotEmpty(): boolean {
    return !_.isEmpty(this.pointCoordinatesAsUtm32);
  }

  get lookAt(): LatLngLiteral | undefined {
    if (!_.isEmpty(this.geoJson)) {
      const coordinates = this.geoJson[0].geometry.coordinates;
      return { lng: coordinates[0], lat: coordinates[1] };
    }

    return undefined;
  }

  private getPointGeometry(): PointGeometryDto | undefined {
    if (!_.isEmpty(this.geoJson)) {
      const coordinates = this.geoJson[0].geometry.coordinates;
      if (coordinates.length == 2) {
        return {
          type: "Point",
          coordinates: [coordinates[0], coordinates[1]], // [0] = longitude, [1] = latitude
        } as PointGeometryDto;
      }
    }
    return undefined;
  }

  private handleClickInMap(latlng: LatLng): void {
    this.setGeoJsonFromLatLng(latlng);
  }

  private handleDeselectGeoJson(): void {
    this.geoJson = [];
    this.verortungModel = undefined;
    this.formChanged();
  }

  private handleAcceptSelectedGeoJson(): void {
    this.createVerortung(this.getPointGeometry());
    this.formChanged();
  }

  private createVerortung(point: PointGeometryDto | undefined): void {
    if (!_.isNil(point)) {
      this.createVerortungPointDtoFromSelectedPoint(point).then((verortung: VerortungPointDto | undefined) => {
        this.verortungModel = verortung;
      });
    } else {
      this.verortungModel = undefined;
    }
  }

  /**
   * Dient als Reaktion auf Änderungen der Adresse aus der Elternkomponente.
   */
  @Watch("adresse", { deep: true })
  private handleAdresseChanged(): void {
    if (this.adresseValid()) {
      this.geoJson = [];
      this.verortungModel = undefined;
      this.refresh();
    }
  }

  @Watch("verortungModel", { deep: true })
  private handleVerortungModelChanged(): void {
    if (!_.isNil(this.verortungPointCoordinate)) {
      this.setGeoJsonFromLatLng(this.verortungPointCoordinate);
      this.refresh();
    } else {
      this.geoJson = [];
    }
  }

  private refresh(): void {
    const point = this.getPointGeometry();
    if (!_.isNil(point)) {
      this.getUtm32(point).then((utm32) => {
        this.pointToDisplay = !_.isNil(utm32) ? `${utm32.zone} ${utm32.north} ${utm32.east}` : "";
      });
    } else {
      this.pointToDisplay = "";
    }
  }

  private async getUtm32(point: PointGeometryDto | undefined): Promise<UtmDto | undefined> {
    let utm32: UtmDto | undefined = undefined;
    if (!_.isNil(point) && !_.isNil(point.coordinates) && point.coordinates.length === 2) {
      const wgs84 = {
        longitude: point.coordinates[0],
        latitude: point.coordinates[1],
      } as Wgs84Dto;
      utm32 = await this.wgs84toUtm32(wgs84, true);
    }
    return utm32;
  }

  private setGeoJsonFromLatLng(latlng: LatLngLiteral): void {
    this.geoJson = [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [latlng.lng, latlng.lat] },
        properties: null,
      },
    ];
  }

  /**
   * Erstellt das VerortungPointDto auf Basis einer Punktkoordinate.
   * Tritt ein fehler bei der Erstellung des VerortungPointDtos auf, so wird undefined zurückgegeben.
   */
  private async createVerortungPointDtoFromSelectedPoint(
    point: PointGeometryDto,
  ): Promise<VerortungPointDto | undefined> {
    try {
      // Stadtbezirke ermitteln
      const stadtbezirke: Array<FeatureDtoStadtbezirkDto> = await this.getStadtbezirkeForPoint(point, true);
      const stadtbezirkeBackend: Array<StadtbezirkDto> = this.stadtbezirkeGeoDataEaiToStadtbezirkeBackend(stadtbezirke);
      // Gemarkungen ermitteln
      const gemarkungen: Array<FeatureDtoGemarkungDto> = await this.getGemarkungenForPoint(point, true);
      const gemarkungenBackend: Array<GemarkungDto> = this.gemarkungenGeoDataEaiToGemarkungenBackend(gemarkungen);

      // Flurstücke ermitteln
      const flurstuecke: Array<FeatureDtoFlurstueckDto> = await this.getFlurstueckeForPoint(point, true);
      const flurstueckeBackend: Array<FlurstueckDto> = this.flurstueckeGeoDataEaiToFlurstueckeBackend(flurstuecke);

      // Anfügen der Flurstücke an Gemarkung
      flurstueckeBackend.forEach((flurstueck) => {
        const matchingGemarkung = gemarkungenBackend.find(
          (gemarkung) => gemarkung.nummer === flurstueck.gemarkungNummer,
        );
        matchingGemarkung?.flurstuecke.add(flurstueck);
      });
      // Erstellung des VerortungPointDto
      return new VerortungPointModel({
        gemarkungen: new Set<GemarkungDto>(gemarkungenBackend),
        stadtbezirke: new Set<StadtbezirkDto>(stadtbezirkeBackend),
        point: point,
      } as VerortungPointDto);
    } catch (error) {
      return undefined;
    }
  }
  private stadtbezirkeGeoDataEaiToStadtbezirkeBackend(
    stadtbezirkeGeoDataEai: Array<FeatureDtoStadtbezirkDto>,
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
    gemarkungenGeoDataEai: Array<FeatureDtoGemarkungDto>,
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
    flurstueckGeoDataEai: Array<FeatureDtoFlurstueckDto>,
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
}
</script>
