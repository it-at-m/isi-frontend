<template>
  <field-group-card :card-title="verortungCardTitle">
    <city-map
      height="300"
      :zoom="14"
      expandable
      automatic-zoom-to-polygons
      :editable="isEditable"
      :look-at="coordinate"
      :geo-json="geoJsonObjectsToShow"
      :geo-json-options="geoJsonOptionsToShow"
      :layers-for-layer-control="layersForLayerControl"
      @click-in-map="handleClickInMap($event)"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />

    <v-row class="justify-center">
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
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
      </v-col>
      <v-col
        class="pb-0"
        cols="12"
        md="6"
      >
        <v-label v-if="kitaplanungsbereiche.length !== 0">Kitaplanungsbereiche</v-label>
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
        <v-label v-if="bezirksteile.length !== 0">Bezirksteile</v-label>
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
    <v-row class="justify-center">
      <v-col
        cols="12"
        md="12"
      >
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
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch, VModel } from "vue-property-decorator";
import CityMap from "@/components/map/CityMap.vue";
import L, { GeoJSONOptions, LatLng, LatLngLiteral, Layer, TileLayer } from "leaflet";
import { Feature, MultiPolygon } from "geojson";
import GeodataEaiApiRequestMixin from "@/mixins/requests/eai/GeodataEaiApiRequestMixin";
import {
  FeatureDtoBezirksteilDto,
  FeatureDtoFlurstueckDto,
  FeatureDtoGemarkungDto,
  FeatureDtoGrundschulsprengelDto,
  FeatureDtoKitaplanungsbereichDto,
  FeatureDtoMittelschulsprengelDto,
  FeatureDtoStadtbezirkDto,
  FeatureDtoViertelDto,
  MultiPolygonGeometryDto as MultiPolygonGeometryDtoGeoDataEai,
  PointGeometryDto,
} from "@/api/api-client/isi-geodata-eai";
import _ from "lodash";
import VerortungMultiPolygonModel from "@/types/model/common/VerortungMultiPolygonModel";
import {
  AdresseDto,
  BezirksteilDto,
  FlurstueckDto,
  GemarkungDto,
  GrundschulsprengelDto,
  KitaplanungsbereichDto,
  MittelschulsprengelDto,
  MultiPolygonGeometryDto as MultiPolygonGeometryDtoBackend,
  StadtbezirkDto,
  VerortungMultiPolygonDto,
  ViertelDto,
} from "@/api/api-client/isi-backend";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import { Context } from "@/utils/Context";
import { assembleDefaultLayersForLayerControl, COLOR_POLYGON_UMGRIFF } from "@/utils/MapUtil";

@Component({
  components: { CityMap },
})
export default class Verortung extends Mixins(GeodataEaiApiRequestMixin, SaveLeaveMixin, AbfrageSecurityMixin) {
  private verortungCardTitle = "Verortung";

  @VModel({ type: VerortungMultiPolygonModel }) verortungModel?: VerortungMultiPolygonModel;

  @Prop({ type: String, default: Context.UNDEFINED })
  private readonly context!: Context;

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
    if (this.context === Context.ABFRAGE) {
      editable = this.isEditableByAbfrageerstellung() || this.isEditableBySachbearbeitung();
    } else if (this.context === Context.BAUVORHABEN) {
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
        return { color: COLOR_POLYGON_UMGRIFF };
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

  get layersForLayerControl(): Map<string, Layer> {
    return assembleDefaultLayersForLayerControl();
  }

  get stadtbezirke(): Array<StadtbezirkDto> {
    return _.sortBy(_.toArray(this.verortungModel?.stadtbezirke), ["nummer"]);
  }

  get bezirksteile(): Array<BezirksteilDto> {
    return _.sortBy(_.toArray(this.verortungModel?.bezirksteile), ["nummer"]);
  }

  get gemarkungen(): Array<GemarkungDto> {
    return _.sortBy(_.toArray(this.verortungModel?.gemarkungen), ["nummer"]);
  }

  get flurstuecke(): Array<FlurstueckDto> {
    return this.gemarkungen.flatMap((gemarkung) =>
      _.sortBy(Array.from(gemarkung.flurstuecke), ["gemarkungNummer", "zaehler", "nenner"]),
    );
  }

  get kitaplanungsbereiche(): Array<KitaplanungsbereichDto> {
    return _.sortBy(_.toArray(this.verortungModel?.kitaplanungsbereiche), ["kitaPlb"]);
  }

  get grundschulsprengel(): Array<GrundschulsprengelDto> {
    return _.sortBy(_.toArray(this.verortungModel?.grundschulsprengel), ["nummer"]);
  }

  get mittelschulsprengel(): Array<MittelschulsprengelDto> {
    return _.sortBy(_.toArray(this.verortungModel?.mittelschulsprengel), ["nummer"]);
  }

  @Watch("selectedFlurstuecke", { deep: true })
  private onSelectedFlurstueckeChanged(): void {
    this.geoJson = this.flurstueckeToGeoJsonFeature(Array.from(this.selectedFlurstuecke.values()));
  }

  @Watch("verortungModel", { deep: true })
  private onVerortungModelChanged(): void {
    const gemarkungenFromVerortungModel: Array<GemarkungDto> = _.toArray(this.verortungModel?.gemarkungen);
    const flurstueckeFromVerortungModel: Array<FlurstueckDto> = gemarkungenFromVerortungModel.flatMap((gemarkung) =>
      Array.from(gemarkung.flurstuecke),
    );
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
    let verortung: VerortungMultiPolygonDto | undefined;
    if (this.selectedFlurstuecke.size !== 0) {
      verortung = await this.createVerortungMultiPolygonDtoFromSelectedFlurstuecke();
      if (!_.isNil(verortung)) {
        this.verortungModel = new VerortungMultiPolygonModel(verortung);
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
   * Erstellt das VerortungMultiPolygonDto auf Basis der in den geoJson-Variable hinterlegten Flurstück-Multipolygone.
   * Tritt ein fehler bei der Erstellung des VerortungMultiPolygonDtos auf, so wird undefined zurückgegeben.
   */
  private async createVerortungMultiPolygonDtoFromSelectedFlurstuecke(): Promise<VerortungMultiPolygonDto | undefined> {
    const multipolygon = this.createMultiPolygonGeometryFromSelectedFlurstuecke();
    try {
      const unifiedMultipolygon = await this.getUnionOfMultipolygon(multipolygon, true);

      const promiseStadtbezirke = this.getStadtbezirkeForMultipolygon(unifiedMultipolygon, true);
      const promiseBezirksteile = this.getBezirksteileForMultipolygon(unifiedMultipolygon, true);
      const promiseViertel = this.getViertelForMultipolygon(unifiedMultipolygon, true);
      const promiseGemarkungen = this.getGemarkungenForMultipolygon(unifiedMultipolygon, true);
      const promiseKitaplanungsbereiche = this.getKitaplanungsbereicheForMultipolygon(unifiedMultipolygon, true);
      const promiseGrundschulsprengel = this.getGrundschulsprengelForMultipolygon(unifiedMultipolygon, true);
      const promiseMittelschulsprengel = this.getMittelschulsprengelForMultipolygon(unifiedMultipolygon, true);

      // Stadtbezirke ermitteln
      const stadtbezirkeBackend: Array<StadtbezirkDto> = this.stadtbezirkeGeoDataEaiToStadtbezirkeBackend(
        await promiseStadtbezirke,
      );

      // Stadtbezirksteile ermitteln
      const bezirksteileBackend: Array<BezirksteilDto> = this.bezirksteileGeoDataEaiToBezirksteileBackend(
        await promiseBezirksteile,
      );

      // Viertel ermitteln
      const viertelBackend: Array<ViertelDto> = this.viertelGeoDataEaiToViertelBackend(await promiseViertel);

      // Gemarkungen ermitteln
      const gemarkungenBackend: Array<GemarkungDto> = this.gemarkungenGeoDataEaiToGemarkungenBackend(
        await promiseGemarkungen,
      );

      // Anfügen der Flurstücke an Gemarkung
      this.selectedFlurstuecke.forEach((selectedFlurstueck) => {
        const matchingGemarkung = gemarkungenBackend.find(
          (gemarkung) => gemarkung.nummer === selectedFlurstueck.gemarkungNummer,
        );
        matchingGemarkung?.flurstuecke.add(selectedFlurstueck);
      });

      // KitaPlb ermitteln
      const kitaplanungsbereicheBackend: Array<KitaplanungsbereichDto> =
        this.kitaplanungsbereicheGeoDataEaiToKitaplanungsbereicheBackend(await promiseKitaplanungsbereiche);

      // Grundschulsprengel ermitteln
      const grundschulsprengelBackend: Array<GrundschulsprengelDto> =
        this.grundschulsprengelGeoDataEaiToGrundschulsprengelBackend(await promiseGrundschulsprengel);

      // Mittelschulsprengel ermitteln
      const mittelschulsprengelBackend: Array<MittelschulsprengelDto> =
        this.mittelschulsprengelGeoDataEaiToMittelschulsprengelBackend(await promiseMittelschulsprengel);

      // Erstellung des VerortungMultiPolygonDto
      return {
        gemarkungen: new Set<GemarkungDto>(gemarkungenBackend),
        stadtbezirke: new Set<StadtbezirkDto>(stadtbezirkeBackend),
        bezirksteile: new Set<BezirksteilDto>(bezirksteileBackend),
        viertel: new Set<ViertelDto>(viertelBackend),
        kitaplanungsbereiche: new Set<KitaplanungsbereichDto>(kitaplanungsbereicheBackend),
        grundschulsprengel: new Set<GrundschulsprengelDto>(grundschulsprengelBackend),
        mittelschulsprengel: new Set<MittelschulsprengelDto>(mittelschulsprengelBackend),
        multiPolygon: JSON.parse(JSON.stringify(unifiedMultipolygon)) as MultiPolygonGeometryDtoBackend,
      } as VerortungMultiPolygonDto;
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

<style scoped></style>
