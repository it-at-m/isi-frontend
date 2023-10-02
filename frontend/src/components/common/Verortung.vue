<template>
  <field-group-card :card-title="verortungCardTitle">
    <city-map
      height="300"
      :zoom="14"
      expandable
      :editable="isEditable"
      :look-at="coordinate"
      :geo-json="geoJsonObjectsToShow"
      :geo-json-options="geoJsonOptionsToShow"
      @click-in-map="handleClickInMap($event)"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />
    <v-label v-if="stadtbezirke.length !== 0">Stadtbezirke</v-label>
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
    <v-label v-if="gemarkungen.length !== 0">Gemarkungen</v-label>
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
    <v-label v-if="flurstuecke.length !== 0">Flurstücke</v-label>
    <v-chip-group
      v-if="flurstuecke.length !== 0"
      title="Flurstücke"
      active-class="primary--text"
      column
    >
      <v-chip
        v-for="(flurstueck, index) in flurstuecke"
        :key="index"
      >
        <div v-if="flurstueck.eigentumsart">
          {{ flurstueck.gemarkungNummer + `/` + flurstueck.zaehler + `/` + flurstueck.nenner + `/städtisch` }}
        </div>
        <div v-else>
          {{ flurstueck.gemarkungNummer + `/` + flurstueck.zaehler + `/` + flurstueck.nenner + `/nicht städtisch` }}
        </div>
      </v-chip>
    </v-chip-group>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch, VModel } from "vue-property-decorator";
import CityMap from "@/components/map/CityMap.vue";
import L, { GeoJSONOptions, LatLng, LatLngLiteral } from "leaflet";
import { Feature, MultiPolygon } from "geojson";
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
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";

export const enum VerortungContext {
  UNDEFINED = "UNDEFINED",
  ABFRAGE = "ABFRAGE",
  BAUVORHABEN = "BAUVORHABEN",
}

@Component({
  components: { CityMap },
})
export default class Verortung extends Mixins(GeodataEaiApiRequestMixin, SaveLeaveMixin, AbfrageSecurityMixin) {
  private verortungCardTitle = "Verortung";

  @VModel({ type: VerortungModel }) verortungModel?: VerortungModel;

  @Prop({ type: String, default: VerortungContext.UNDEFINED })
  private readonly context!: VerortungContext;

  @Prop()
  private readonly lookAt?: AdresseDto;

  /**
   * Repräsentiert das Multipolygon je Flurstück.
   */
  private geoJson: Array<Feature> = [];

  /**
   * Repräsentiert die gewählten Flurstücke identifiziert über die Flurstücksnummer.
   */
  private selectedFlurstuecke: Map<string, FlurstueckDto> = new Map<string, FlurstueckDto>();

  mounted(): void {
    this.onVerortungModelChanged();
  }

  get isEditable(): boolean {
    let editable = false;
    if (this.context === VerortungContext.ABFRAGE) {
      editable = this.isEditableByAbfrageerstellung();
    } else if (this.context === VerortungContext.BAUVORHABEN) {
      editable = this.isRoleAdminOrSachbearbeitung();
    }
    return editable;
  }

  get coordinate(): LatLngLiteral | undefined {
    const lat = this.lookAt?.coordinate?.latitude;
    const lng = this.lookAt?.coordinate?.longitude;

    if (lat && lng) {
      return { lat, lng };
    }
    return undefined;
  }

  get geoJsonObjectsToShow(): Array<Feature> {
    return this.geoJson;
  }

  get geoJsonOptionsToShow(): GeoJSONOptions {
    return {
      // Farbe des Multipolygons
      style: function () {
        return { color: "#E91E63" };
      },
      onEachFeature: function (feature, layer) {
        // Tooltip je Multipolygon
        if (feature.properties && feature.properties.nummer) {
          layer.bindTooltip(
            "<b>Flurstück:</b><br>" +
              "Nummer:&nbsp;" +
              feature.properties.nummer +
              "<br>" +
              "Gemarkung:&nbsp;" +
              feature.properties.nummerGemarkung,
            {
              sticky: true,
              direction: "top",
              offset: L.point(0, -2),
            },
          );
          layer.on("mouseover", function () {
            layer.openTooltip();
          });
          layer.on("mouseout", function () {
            layer.closeTooltip();
          });
        }
      },
    };
  }

  get stadtbezirke(): Array<StadtbezirkDto> {
    return _.isNil(this.verortungModel) ? [] : _.sortBy(Array.from(this.verortungModel?.stadtbezirke), ["nummer"]);
  }

  get gemarkungen(): Array<GemarkungDto> {
    return _.isNil(this.verortungModel) ? [] : _.sortBy(Array.from(this.verortungModel?.gemarkungen), ["nummer"]);
  }

  get flurstuecke(): Array<FlurstueckDto> {
    return this.gemarkungen.flatMap((gemarkung) =>
      _.sortBy(Array.from(gemarkung.flurstuecke), ["gemarkungNummer", "zaehler", "nenner"]),
    );
  }

  @Watch("selectedFlurstuecke", { deep: true })
  private onSelectedFlurstueckeChanged(): void {
    this.geoJson = this.flurstueckeToGeoJsonFeature(Array.from(this.selectedFlurstuecke.values()));
  }

  @Watch("verortungModel", { deep: true })
  private onVerortungModelChanged(): void {
    const flurstueckeFromVerortungModel = Array.from(
      _.isNil(this.verortungModel) ? [] : this.verortungModel.gemarkungen,
    ).flatMap((gemarkung) => Array.from(gemarkung.flurstuecke));
    this.selectedFlurstuecke = this.createMapForFlurstuecke(flurstueckeFromVerortungModel);
  }

  private handleClickInMap(latlng: LatLng): void {
    if (this.isEditable) {
      const point = this.createPointGeometry(latlng);
      this.getFlurstueckeForPoint(point, true).then((flurstuecke: Array<FeatureDtoFlurstueckDto>) => {
        const flurstueckeBackend = this.flurstueckeGeoDataEaiToFlurstueckeBackend(flurstuecke);
        this.selectedFlurstuecke = this.adaptMapForSelectedFlurstuecke(flurstueckeBackend);
      });
    }
  }

  private handleDeselectGeoJson(): void {
    this.selectedFlurstuecke = new Map<string, FlurstueckDto>();
  }

  private async handleAcceptSelectedGeoJson(): Promise<void> {
    let verortung: VerortungDto | undefined;
    if (this.selectedFlurstuecke.size !== 0) {
      verortung = await this.createVerortungDtoFromSelectedFlurstuecke();
      if (!_.isNil(verortung)) {
        this.verortungModel = new VerortungModel(verortung);
        this.formChanged();
      }
    } else {
      this.verortungModel = undefined;
      this.formChanged();
    }
  }

  /**
   * Die Methode dient dazu, die im Parameter gegebenen Flurstücke an eine Kopie der Variablen "selectedFlurstuecke" anzufügen.
   * Ist ein Flurstück, gegeben im Parameter, bereits in der Kopie der Variablen "selectedFlurstuecke" vorhanden,
   * wird das Flurstück aus der Variablen entfernt.
   * Es wird die angepasste Kopie der Variablen "selectedFlurstuecke" zurückgegeben.
   */
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

  /**
   * Erstellt eine Map mit den im Parameter gegebenen Flurstücken und gibt diese zurück.
   * Der Key der Map ist die Flurstücknummer und der Value das entsprechende Flurstück.
   */
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
    this.selectedFlurstuecke.forEach((flurstueck: FlurstueckDto) => {
      const flurstueckMultiPolygon = flurstueck.multiPolygon as MultiPolygonGeometryDtoBackend;
      flurstueckMultiPolygon?.coordinates?.forEach((polygon) => {
        multipolygon.coordinates?.push(polygon);
      });
    });
    return multipolygon;
  }

  /**
   * Erstellt das VerortungDto auf Basis der in den geoJson-Variable hinterlegten Flurstück-Multipolygone.
   * Tritt ein fehler bei der Erstellung des VerortungDtos auf, so wird undefined zurückgegeben.
   */
  private async createVerortungDtoFromSelectedFlurstuecke(): Promise<VerortungDto | undefined> {
    const multipolygon = this.createMultiPolygonGeometryFromSelectedFlurstuecke();
    try {
      const unifiedMultipolygon = await this.getUnionOfMultipolygon(multipolygon, true);
      const stadtbezirke: Array<FeatureDtoStadtbezirkDto> = await this.getStadtbezirkeForMultipolygon(
        unifiedMultipolygon,
        true,
      );
      const stadtbezirkeBackend: Array<StadtbezirkDto> = this.stadtbezirkeGeoDataEaiToStadtbezirkeBackend(stadtbezirke);
      const gemarkungen: Array<FeatureDtoGemarkungDto> = await this.getGemarkungenForMultipolygon(
        unifiedMultipolygon,
        true,
      );
      const gemarkungenBackend: Array<GemarkungDto> = this.gemarkungenGeoDataEaiToGemarkungenBackend(gemarkungen);
      // Anfügen der Flurstücke an Gemarkung
      this.selectedFlurstuecke.forEach((selectedFlurstueck) => {
        const matchingGemarkung = gemarkungenBackend.find(
          (gemarkung) => gemarkung.nummer === selectedFlurstueck.gemarkungNummer,
        );
        matchingGemarkung?.flurstuecke.add(selectedFlurstueck);
      });
      // Erstellung des VerortungDto
      return {
        gemarkungen: new Set<GemarkungDto>(gemarkungenBackend),
        stadtbezirke: new Set<StadtbezirkDto>(stadtbezirkeBackend),
        multiPolygon: JSON.parse(JSON.stringify(unifiedMultipolygon)) as MultiPolygonGeometryDtoBackend,
      } as VerortungDto;
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
          nummerGemarkung: flurstueck.gemarkungNummer,
        },
      };
    });
  }
}
</script>

<style scoped></style>
