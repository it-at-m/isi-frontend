<template>
  <field-group-card :card-title="verortungCardTitle">
    <city-map
      height="300"
      :zoom="14"
      expandable
      editable
      :look-at="coordinate"
      :geo-json="geoJsonObjectsToShow"
      :geo-json-options="geoJsonOptionsToShow"
      @click-in-map="handleClickInMap($event)"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />
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

@Component({
  components: { CityMap },
})
export default class Verortung extends Mixins(GeodataEaiApiRequestMixin, SaveLeaveMixin) {
  private verortungCardTitle = "Verortung";

  @VModel({ type: VerortungModel }) verortungModel?: VerortungModel;

  @Prop()
  private readonly lookAt?: AdresseDto;

  private geoJson: Array<Feature> = [];

  private selectedFlurstuecke: Map<string, FlurstueckDto> = new Map<string, FlurstueckDto>();

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
            }
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

  @Watch("selectedFlurstuecke", { deep: true })
  private onSelectedFlurstueckeChanged(): void {
    this.geoJson = this.flurstueckeToGeoJsonFeature(Array.from(this.selectedFlurstuecke.values()));
  }

  @Watch("verortungModel", { deep: true })
  private onVerortungModelChanged(): void {
    const flurstueckeFromVerortungModel = Array.from(
      _.isNil(this.verortungModel) ? [] : this.verortungModel.gemarkungen
    ).flatMap((gemarkung) => Array.from(gemarkung.flurstuecke));
    this.selectedFlurstuecke = this.createMapForFlurstuecke(flurstueckeFromVerortungModel);
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
    let newVerortungModel: VerortungModel | undefined;
    if (this.selectedFlurstuecke.size !== 0) {
      const verortung: VerortungDto = await this.createVerortungDtoFromSelectedFlurstuecke();
      newVerortungModel = new VerortungModel(verortung);
    } else {
      newVerortungModel = undefined;
    }
    if (!this.isEqual(this.verortungModel, newVerortungModel)) {
      this.verortungModel = newVerortungModel;
      this.formChanged();
    }
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
    this.selectedFlurstuecke.forEach((flurstueck: FlurstueckDto) => {
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
    this.selectedFlurstuecke.forEach((selectedFlurstueck) => {
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
          nummerGemarkung: flurstueck.gemarkungNummer,
        },
      };
    });
  }

  private isEqual(value: VerortungModel | undefined, other: VerortungModel | undefined): boolean {
    let clonedValue = _.cloneDeep(value);
    if (!_.isNil(clonedValue) && !(clonedValue instanceof VerortungModel)) {
      clonedValue = new VerortungModel(clonedValue);
    }
    let clonedOther = _.cloneDeep(other);
    if (!_.isNil(clonedOther) && !(clonedOther instanceof VerortungModel)) {
      clonedOther = new VerortungModel(clonedOther);
    }
    if (!_.isNil(clonedValue)) clonedValue.id = undefined;
    if (!_.isNil(clonedValue)) clonedValue.version = undefined;
    if (!_.isNil(clonedValue)) clonedValue.createdDateTime = undefined;
    if (!_.isNil(clonedValue)) clonedValue.lastModifiedDateTime = undefined;
    if (!_.isNil(clonedValue)) clonedValue.multiPolygon.coordinates = [];
    clonedValue?.stadtbezirke.forEach((stadtbezirk) => {
      stadtbezirk.id = undefined;
      stadtbezirk.version = undefined;
      stadtbezirk.createdDateTime = undefined;
      stadtbezirk.lastModifiedDateTime = undefined;
      stadtbezirk.multiPolygon.coordinates = [];
    });
    clonedValue?.gemarkungen.forEach((gemarkung) => {
      gemarkung.id = undefined;
      gemarkung.version = undefined;
      gemarkung.createdDateTime = undefined;
      gemarkung.lastModifiedDateTime = undefined;
      gemarkung.multiPolygon.coordinates = [];
      gemarkung.flurstuecke.forEach((flurstueck) => {
        flurstueck.id = undefined;
        flurstueck.version = undefined;
        flurstueck.createdDateTime = undefined;
        flurstueck.lastModifiedDateTime = undefined;
        flurstueck.multiPolygon = undefined;
      });
    });
    if (!_.isNil(clonedOther)) clonedOther.id = undefined;
    if (!_.isNil(clonedOther)) clonedOther.version = undefined;
    if (!_.isNil(clonedOther)) clonedOther.createdDateTime = undefined;
    if (!_.isNil(clonedOther)) clonedOther.lastModifiedDateTime = undefined;
    if (!_.isNil(clonedOther)) clonedOther.multiPolygon.coordinates = [];
    clonedOther?.stadtbezirke.forEach((stadtbezirk) => {
      stadtbezirk.id = undefined;
      stadtbezirk.version = undefined;
      stadtbezirk.createdDateTime = undefined;
      stadtbezirk.lastModifiedDateTime = undefined;
      stadtbezirk.multiPolygon.coordinates = [];
    });
    clonedOther?.gemarkungen.forEach((gemarkung) => {
      gemarkung.id = undefined;
      gemarkung.version = undefined;
      gemarkung.createdDateTime = undefined;
      gemarkung.lastModifiedDateTime = undefined;
      gemarkung.multiPolygon.coordinates = [];
      gemarkung.flurstuecke.forEach((flurstueck) => {
        flurstueck.id = undefined;
        flurstueck.version = undefined;
        flurstueck.createdDateTime = undefined;
        flurstueck.lastModifiedDateTime = undefined;
        flurstueck.multiPolygon = undefined;
      });
    });
    return _.isEqual(clonedValue, clonedOther);
  }
}
</script>

<style scoped></style>
