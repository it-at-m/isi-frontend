<template>
  <field-group-card :card-title="verortungCardTitle">
    <city-map
      height="300"
      :zoom="14"
      expandable
      :editable="isEditable"
      :look-at="lookAt"
      :geo-json="geoJson"
      @click-in-map="handleClickInMap($event)"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />
    <v-label v-if="pointExits">Koordinaten</v-label>
    <v-chip-group
      v-if="pointExits"
      title="Koordinate"
      active-class="primary--text"
      column
    >
      <v-chip>
        <div>{{ pointToDisplay() }}</div>
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

  private verortungCardTitle = "Verortung";

  /**
   * Repräsentiert eine einzige Punktkoordinate.
   */
  private geoJson: Array<Feature<Point>> = [];

  private mounted(): void {
    if (this.adresseCoordinate) {
      this.setGeoJsonFromLatLng(this.adresseCoordinate);
    }
  }

  /**
   * Dient als Reaktion auf Änderungen der Adresse aus der Elternkomponente.
   */
  @Watch("adresse", { deep: true })
  private onAdresseChanged(): void {
    if (this.adresse?.strasse && this.adresseCoordinate) {
      this.setGeoJsonFromLatLng(this.adresseCoordinate);
    }
  }

  get adresseCoordinate(): LatLngLiteral | undefined {
    const lat = this.adresse?.coordinate?.latitude;
    const lng = this.adresse?.coordinate?.longitude;

    if (lat && lng) {
      return { lat, lng };
    }

    return undefined;
  }

  get pointExits(): boolean {
    return !_.isEmpty(this.pointToDisplay());
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
      return {
        type: "Point",
        coordinates: [coordinates[0], coordinates[1]],
      } as PointGeometryDto;
    }
    return undefined;
  }

  private handleClickInMap(latlng: LatLng): void {
    this.setGeoJsonFromLatLng(latlng);
  }

  private handleDeselectGeoJson(): void {
    this.adresse = {};
    this.geoJson = [];
    this.formChanged();
  }

  private async handleAcceptSelectedGeoJson(): Promise<void> {
    const point = this.getPointGeometry();
    console.log("point: " + point);
    if (!_.isNil(point)) {
      const verortung = await this.createVerortungPointDtoFromSelectedPoint(point);
      console.log("Verortung: " + verortung);
      this.verortungModel = verortung;
      this.formChanged();
    }
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
      console.log("stadtbezirke: " + stadtbezirke.length);
      console.log("stadtbezirkeBackend: " + stadtbezirkeBackend.length);
      // Gemarkungen ermitteln
      const gemarkungen: Array<FeatureDtoGemarkungDto> = await this.getGemarkungenForPoint(point, true);
      const gemarkungenBackend: Array<GemarkungDto> = this.gemarkungenGeoDataEaiToGemarkungenBackend(gemarkungen);
      console.log("gemarkungen: " + gemarkungen.length);
      console.log("gemarkungenBackend: " + gemarkungenBackend.length);

      // Flurstücke ermitteln
      const flurstuecke: Array<FeatureDtoFlurstueckDto> = await this.getFlurstueckeForPoint(point, true);
      const flurstueckeBackend: Array<FlurstueckDto> = this.flurstueckeGeoDataEaiToFlurstueckeBackend(flurstuecke);
      console.log("flurstuecke: " + flurstuecke.length);
      console.log("flurstueckeBackend: " + flurstueckeBackend.length);

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

  async pointToDisplay(): Promise<string> {
    const utmDto = await this.getUtm32(this.getPointGeometry());
    console.log("pointToDisplay, utmDto: " + utmDto);
    return !_.isNil(utmDto) ? `${utmDto.zone}U ${utmDto?.north} ${utmDto?.east}` : "";
  }

  async getUtm32(point: PointGeometryDto | undefined): Promise<UtmDto | undefined> {
    let utmDto: UtmDto | undefined = undefined;
    console.log("getUtm32, 1: " + point);
    if (!_.isNil(point) && !_.isNil(point.coordinates) && point.coordinates.length === 2) {
      const wgs84 = {
        longitude: point.coordinates[0],
        latitude: point.coordinates[1],
      } as Wgs84Dto;
      console.log("getUtm32, wgs84 longitude: " + wgs84.longitude);
      console.log("getUtm32, wgs84 latitude: " + wgs84.latitude);
      await this.wgs84toUtm32(wgs84, true).then((dto: UtmDto) => {
        console.log("getUtm32, dto: " + dto);
        utmDto = dto;
      });
    }
    return utmDto;
  }
}
</script>
