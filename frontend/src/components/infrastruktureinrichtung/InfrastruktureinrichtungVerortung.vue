<template>
  <field-group-card :card-title="verortungCardTitle">
    <city-map
      height="300"
      :zoom="14"
      expandable
      :editable="isVerortungEditable"
      :look-at="lookAt"
      :geo-json="geoJson"
      :geo-json-options="geoJsonOptions"
      @click-in-map="handleClickInMap($event)"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />
    <v-label v-if="pointToDisplayNotEmpty">Koordinate</v-label>
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
    <v-row class="justify-center">
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="stadtbezirke.length !== 0">Stadtbezirk</v-label>
        <v-chip-group
          v-if="stadtbezirke.length !== 0"
          title="Stadtbezirke"
          active-class="primary--text"
          column
        >
          <v-chip
            v-for="(stadtbezirk, index) in stadtbezirke"
            :key="index"
          >
            {{ stadtbezirk.nummer + `/` + stadtbezirk.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="kitaplanungsbereiche.length !== 0">Kitaplanungsbereich</v-label>
        <v-chip-group
          v-if="kitaplanungsbereiche.length !== 0"
          title="Kitaplanungsbereiche"
          active-class="primary--text"
          column
        >
          <v-chip
            v-for="(kitaplanungsbereich, index) in kitaplanungsbereiche"
            :key="index"
          >
            {{ kitaplanungsbereich.kitaPlbT }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="bezirksteile.length !== 0">Bezirksteil</v-label>
        <v-chip-group
          v-if="bezirksteile.length !== 0"
          title="Bezirksteile"
          active-class="primary--text"
          column
        >
          <v-chip
            v-for="(bezirksteil, index) in bezirksteile"
            :key="index"
          >
            {{ bezirksteil.nummer }}
          </v-chip>
        </v-chip-group>
      </v-col>

      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="grundschulsprengel.length !== 0">Grundschulsprengel</v-label>
        <v-chip-group
          v-if="grundschulsprengel.length !== 0"
          title="Grundschulsprengel"
          active-class="primary--text"
          column
        >
          <v-chip
            v-for="(grundschulsprengelItem, index) in grundschulsprengel"
            :key="index"
          >
            {{ grundschulsprengelItem.nummer }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="gemarkungen.length !== 0">Gemarkung</v-label>
        <v-chip-group
          v-if="gemarkungen.length !== 0"
          title="Gemarkungen"
          active-class="primary--text"
          column
        >
          <v-chip
            v-for="(gemarkung, index) in gemarkungen"
            :key="index"
          >
            {{ gemarkung.nummer + `/` + gemarkung.name }}
          </v-chip>
        </v-chip-group>
      </v-col>

      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="mittelschulsprengel.length !== 0">Mittelschulsprengel</v-label>
        <v-chip-group
          v-if="mittelschulsprengel.length !== 0"
          title="Mittelschulsprengel"
          active-class="primary--text"
          column
        >
          <v-chip
            v-for="(mittelschulsprengelItem, index) in mittelschulsprengel"
            :key="index"
          >
            {{ mittelschulsprengelItem.nummer }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Prop, Mixins, VModel, Watch } from "vue-property-decorator";
import AdresseModel from "@/types/model/common/AdresseModel";
import CityMap from "@/components/map/CityMap.vue";
import L, { GeoJSONOptions, LatLng, LatLngLiteral } from "leaflet";
import { Feature, Point } from "geojson";
import _ from "lodash";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import {
  FlurstueckDto,
  GemarkungDto,
  StadtbezirkDto,
  MultiPolygonGeometryDto as MultiPolygonGeometryDtoBackend,
  Wgs84Dto,
  UtmDto,
  VerortungPointDto,
  BezirksteilDto,
  KitaplanungsbereichDto,
  GrundschulsprengelDto,
  MittelschulsprengelDto,
  ViertelDto,
} from "@/api/api-client/isi-backend";
import {
  FeatureDtoBezirksteilDto,
  FeatureDtoFlurstueckDto,
  FeatureDtoGemarkungDto,
  FeatureDtoGrundschulsprengelDto,
  FeatureDtoKitaplanungsbereichDto,
  FeatureDtoMittelschulsprengelDto,
  FeatureDtoStadtbezirkDto,
  FeatureDtoViertelDto,
  PointGeometryDto,
} from "@/api/api-client/isi-geodata-eai";
import GeodataEaiApiRequestMixin from "@/mixins/requests/eai/GeodataEaiApiRequestMixin";
import KoordinatenApiRequestMixin from "@/mixins/requests/KoordinatenApiRequestMixin";
import VerortungPointModel from "@/types/model/common/VerortungPointModel";
import { ICON_INFRASTRUKTUREINRICHTUNG } from "@/utils/MapUtil";

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
  private adresse?: AdresseModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get isVerortungEditable(): boolean {
    return this.isEditable && !this.adresseValid();
  }

  private adresseValid(): boolean {
    return !_.isNil(this.adresse) && !_.isEmpty(this.adresse.strasse) && !_.isNil(this.adresseCoordinate);
  }

  private verortungCardTitle = "Verortung";

  private oldAdresse: AdresseModel | undefined = undefined;

  private pointCoordinatesAsUtm32 = "";

  /**
   * Repräsentiert eine einzige Punktkoordinate.
   */
  private geoJson: Array<Feature<Point>> = [];

  private geoJsonOptions: GeoJSONOptions = {
    pointToLayer: (feature: Feature, latlng) => {
      return L.marker(latlng, { icon: ICON_INFRASTRUKTUREINRICHTUNG });
    },
  };

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

  get stadtbezirke(): Array<StadtbezirkDto> {
    return _.isNil(this.verortungModel) ? [] : _.sortBy(_.toArray(this.verortungModel?.stadtbezirke), ["nummer"]);
  }

  get bezirksteile(): Array<BezirksteilDto> {
    return _.isNil(this.verortungModel) ? [] : _.sortBy(_.toArray(this.verortungModel?.bezirksteile), ["nummer"]);
  }

  get gemarkungen(): Array<GemarkungDto> {
    return _.isNil(this.verortungModel) ? [] : _.sortBy(_.toArray(this.verortungModel?.gemarkungen), ["nummer"]);
  }

  get kitaplanungsbereiche(): Array<KitaplanungsbereichDto> {
    return _.isNil(this.verortungModel)
      ? []
      : _.sortBy(_.toArray(this.verortungModel?.kitaplanungsbereiche), ["nummer"]);
  }

  get grundschulsprengel(): Array<GrundschulsprengelDto> {
    return _.isNil(this.verortungModel) ? [] : _.sortBy(_.toArray(this.verortungModel?.grundschulsprengel), ["nummer"]);
  }

  get mittelschulsprengel(): Array<MittelschulsprengelDto> {
    return _.isNil(this.verortungModel)
      ? []
      : _.sortBy(_.toArray(this.verortungModel?.mittelschulsprengel), ["nummer"]);
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
    if (this.isVerortungEditable) {
      this.setGeoJsonFromLatLng(latlng);
    }
  }

  private handleDeselectGeoJson(): void {
    this.geoJson = [];
    this.verortungModel = undefined;
    this.refresh();
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
    if (this.adresseChanged) {
      if (this.adresseValid()) {
        this.setGeoJsonFromLatLng(this.adresseCoordinate as LatLng);
      } else {
        this.geoJson = [];
      }
      this.handleAcceptSelectedGeoJson();
    }
  }

  get adresseChanged(): boolean {
    let changed = false;
    // Erstaufruf?
    if (_.isNil(this.oldAdresse) && !_.isNil(this.adresse)) {
      if (_.isNil(this.verortungModel)) {
        changed = !this.adresse.isEmpty; // Neuanlage mit Adressauswahl
      } else {
        /* Infrastruktureinrichtung mit existierender Adresse */
      }
      this.oldAdresse = _.cloneDeep(this.adresse);
    } else {
      // Folgeaufruf: Hat sich die ausgewählte Adresse geändert?
      if (!_.isNil(this.oldAdresse) && !_.isNil(this.adresse)) {
        if (!this.oldAdresse.isEmpty && !this.adresse.isEmpty) {
          changed = !this.oldAdresse.isEqual(this.adresse);
        } else if (
          (this.oldAdresse.isEmpty && !this.adresse.isEmpty) ||
          (!this.oldAdresse.isEmpty && this.adresse.isEmpty)
        ) {
          changed = true;
        }
      }
      if (changed) {
        if (!_.isNil(this.adresse)) {
          this.oldAdresse = _.cloneDeep(this.adresse);
        } else {
          this.oldAdresse = undefined;
        }
      }
    }
    return changed;
  }

  @Watch("verortungModel", { deep: true })
  private handleVerortungModelChanged(): void {
    if (!_.isNil(this.verortungPointCoordinate)) {
      this.setGeoJsonFromLatLng(this.verortungPointCoordinate);
    } else {
      this.geoJson = [];
    }
    this.refresh();
  }

  private refresh(): void {
    const point = this.getPointGeometry();
    if (!_.isNil(point)) {
      this.getUtm32(point).then((utm32) => {
        this.pointToDisplay = !_.isNil(utm32) ? `${_.round(utm32.east)} ${_.round(utm32.north)} (UTM)` : "";
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

      // Stadtbezirksteile ermitteln
      const bezirksteile: Array<FeatureDtoBezirksteilDto> = await this.getBezirksteileForPoint(point, true);
      const bezirksteileBackend: Array<BezirksteilDto> = this.bezirksteileGeoDataEaiToBezirksteileBackend(bezirksteile);

      // Viertel ermitteln
      const viertel: Array<FeatureDtoViertelDto> = await this.getViertelForPoint(point, true);
      const viertelBackend: Array<ViertelDto> = this.viertelGeoDataEaiToViertelBackend(viertel);

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

      // KitaPlb ermitteln
      const kitaplanungsbereiche: Array<FeatureDtoKitaplanungsbereichDto> = await this.getKitaplanungsbereicheForPoint(
        point,
        true,
      );
      const kitaplanungsbereicheBackend: Array<KitaplanungsbereichDto> =
        this.kitaplanungsbereicheGeoDataEaiToKitaplanungsbereicheBackend(kitaplanungsbereiche);

      // Grundschulsprengel ermitteln
      const grundschulsprengel: Array<FeatureDtoGrundschulsprengelDto> = await this.getGrundschulsprengelForPoint(
        point,
        true,
      );
      const grundschulsprengelBackend: Array<GrundschulsprengelDto> =
        this.grundschulsprengelGeoDataEaiToGrundschulsprengelBackend(grundschulsprengel);

      // Mittelschulsprengel ermitteln
      const mittelschulsprengel: Array<FeatureDtoMittelschulsprengelDto> = await this.getMittelschulsprengelForPoint(
        point,
        true,
      );
      const mittelschulsprengelBackend: Array<MittelschulsprengelDto> =
        this.mittelschulsprengelGeoDataEaiToMittelschulsprengelBackend(mittelschulsprengel);

      // Erstellung des VerortungPointDto
      return new VerortungPointModel({
        gemarkungen: new Set<GemarkungDto>(gemarkungenBackend),
        stadtbezirke: new Set<StadtbezirkDto>(stadtbezirkeBackend),
        bezirksteile: new Set<BezirksteilDto>(bezirksteileBackend),
        viertel: new Set<ViertelDto>(viertelBackend),
        kitaplanungsbereiche: new Set<KitaplanungsbereichDto>(kitaplanungsbereicheBackend),
        grundschulsprengel: new Set<GrundschulsprengelDto>(grundschulsprengelBackend),
        mittelschulsprengel: new Set<MittelschulsprengelDto>(mittelschulsprengelBackend),
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

  private bezirksteileGeoDataEaiToBezirksteileBackend(
    bezirksteileGeoDataEai: Array<FeatureDtoBezirksteilDto>,
  ): Array<BezirksteilDto> {
    return bezirksteileGeoDataEai.map((bezirksteil) => {
      return {
        nummer: bezirksteil.properties?.bezirksteilNummer,
        multiPolygon: JSON.parse(JSON.stringify(bezirksteil.geometry)) as MultiPolygonGeometryDtoBackend,
      };
    });
  }

  private viertelGeoDataEaiToViertelBackend(bezirksteileGeoDataEai: Array<FeatureDtoViertelDto>): Array<ViertelDto> {
    return bezirksteileGeoDataEai.map((viertel) => {
      return {
        nummer: viertel.properties?.viertelNummer,
        flaecheQm: viertel.properties?.flaecheQm,
        multiPolygon: JSON.parse(JSON.stringify(viertel.geometry)) as MultiPolygonGeometryDtoBackend,
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

  private kitaplanungsbereicheGeoDataEaiToKitaplanungsbereicheBackend(
    kitaplanungsbereicheGeoDataEai: Array<FeatureDtoKitaplanungsbereichDto>,
  ): Array<KitaplanungsbereichDto> {
    return kitaplanungsbereicheGeoDataEai.map((kitaplanungsbereich) => {
      return {
        kitaPlb: kitaplanungsbereich.properties?.kitaPlb,
        kitaPlbT: kitaplanungsbereich.properties?.kitaPlbT,
        multiPolygon: JSON.parse(JSON.stringify(kitaplanungsbereich.geometry)) as MultiPolygonGeometryDtoBackend,
      };
    });
  }

  private grundschulsprengelGeoDataEaiToGrundschulsprengelBackend(
    grundschulsprengelGeoDataEai: Array<FeatureDtoGrundschulsprengelDto>,
  ): Array<GrundschulsprengelDto> {
    return grundschulsprengelGeoDataEai.map((grundschulsprengel) => {
      return {
        nummer: grundschulsprengel.properties?.schulnummer,
        multiPolygon: JSON.parse(JSON.stringify(grundschulsprengel.geometry)) as MultiPolygonGeometryDtoBackend,
      };
    });
  }

  private mittelschulsprengelGeoDataEaiToMittelschulsprengelBackend(
    mittelschulsprengelGeoDataEai: Array<FeatureDtoMittelschulsprengelDto>,
  ): Array<MittelschulsprengelDto> {
    return mittelschulsprengelGeoDataEai.map((mittelschulsprengel) => {
      return {
        nummer: mittelschulsprengel.properties?.schulnummer,
        multiPolygon: JSON.parse(JSON.stringify(mittelschulsprengel.geometry)) as MultiPolygonGeometryDtoBackend,
      };
    });
  }
}
</script>
