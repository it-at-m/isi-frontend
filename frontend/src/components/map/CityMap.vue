<template>
  <v-sheet
    :height="height"
    :width="width"
  >
    <l-map
      id="karte"
      ref="map"
      :options="MAP_OPTIONS"
      :center="MUNICH_CENTER"
      :zoom="zoom"
      style="z-index: 1"
      @click="openPopup($event)"
    >
      <!-- Fügt ein Steuerungselement hinzu, mit welchem sich ein Base-Layer und eine beliebige Anzahl von Overlay-Layern aktivieren lässt. -->
      <l-control-layers />
      <!-- Die Base-Layer der Karte. Es kann nur einer zur selben Zeit sichtbar sein, da der Base-Layer der Hintergrund der Karte ist. -->
      <l-wms-tile-layer
        id="karte_hintergrund"
        name="Hintergrund"
        :base-url="WMS_BASE_URL"
        layers="Hintergrund"
        format="image/png"
        layer-type="base"
        :visible="true"
      />
      <!-- Die Overlay-Layer der Karte. Es können beliebig viele von ihnen zur selben Zeit sichtbar sein, da sie nur spezifische Merkmale darstellen sollen. -->
      <!-- Damit ein Overlay-Layer nicht die darunerliegenden Layer verdeckt, ist es wichtig, :transparent="true" zu setzen sowie ein Bildformat anzufordern, welches Transparenz unterstützt. -->
      <l-wms-tile-layer
        id="karte_gemarkungen"
        name="Gemarkungen"
        :base-url="getGiwUrl('WMS_Stadtgrundkarte')"
        layers="Gemarkungen"
        format="image/png"
        layer-type="overlay"
        :visible="false"
        :transparent="true"
      />
      <l-wms-tile-layer
        id="karte_flurstuecke"
        name="Flurstücke"
        :base-url="getGiwUrl('WMS_Stadtgrundkarte')"
        layers="Flurstücke"
        format="image/png"
        layer-type="overlay"
        :visible="false"
        :transparent="true"
      />
    </l-map>
  </v-sheet>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Prop, Mixins } from "vue-property-decorator";
import { LMap, LPopup, LControlLayers, LWMSTileLayer } from "vue2-leaflet";
import WfsEaiApiRequestMixin from "@/mixins/requests/eai/WfsEaiApiRequestMixin";
import {
  FeatureCollectionDtoFeatureDtoFlurstueckDto,
  FeatureDtoFlurstueckDto,
  MultiPolygonGeometryDto,
  PointGeometryDto,
} from "@/api/api-client/isi-geodata-eai";
import { VerortungState, MultiPolygon } from "@/store/modules/VerortungStore";
import L, { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import _ from "lodash";
import { theme } from "@/plugins/vuetify";

/**
 * Nutzt Leaflet.js um Daten von einem oder mehreren WMS-Servern zu holen und eine Karte von München und der Umgebung zu rendern.
 * Die Leaflet-Karte wurde für Stylebarkeit in eine Vuetify Sheet-Komponente eingebettet.
 */
@Component({
  components: {
    LMap,
    LPopup,
    LControlLayers,
    "l-wms-tile-layer": LWMSTileLayer,
  },
})
export default class CityMap extends Mixins(WfsEaiApiRequestMixin) {
  private readonly WMS_BASE_URL = "https://geoinfoweb.muenchen.de/arcgis/services/WMS_Stadtkarte/MapServer/WMSServer?";
  private readonly MUNICH_CENTER = [48.137227, 11.575517];
  private readonly MAP_OPTIONS = { attributionControl: false };

  @Prop({ default: "100%" })
  private readonly height!: number | string;
  @Prop({ default: "100%" })
  private readonly width!: number | string;
  @Prop({ default: 16 })
  private readonly zoom!: number;

  private readonly popup = L.popup();
  private map!: L.Map;
  private flurstueckPolygon?: L.Polygon;
  private loading = false;

  mounted(): void {
    // Erzeugt einen "Shortcut" zum mapObject, da in den unteren Funktionen ansonsten immer `this.map.mapObject` aufgerufen werden müsste.
    this.map = (this.$refs.map as LMap).mapObject;
    this.updatePolygon();
  }

  /**
   * Da GeoInfoWeb mehrere Services anbietet, wird mit dieser Funktion der notwendige Service ausgewählt (ohne die URL kopieren zu müssen).
   */
  private getGiwUrl(service: string): string {
    return (import.meta.env.VITE_GIS_URL as string).replace("{1}", service);
  }

  /**
   * Öffnet an der angeklickten Bildschirmposition ein Popup, welches die Koordinaten der Kartenposition anzeigt.
   */
  private async openPopup(event: L.LeafletMouseEvent): Promise<void> {
    if (this.loading) {
      return;
    }
    this.loading = true;

    const latlng = event.latlng;

    this.popup.setLatLng(latlng).setContent("Lädt...").openOn(this.map);

    const point: PointGeometryDto = { coordinates: [latlng.lng, latlng.lat] };
    const fetchedFlurstuecke = await this.getFlurstuecke(point, false);
    const flurstuecke: FeatureDtoFlurstueckDto[] = [];
    const flurstueckMap: VerortungState["flurstuecke"] = this.$store.getters["verortung/flurstuecke"];

    for (const flurstueck of fetchedFlurstuecke) {
      /*
      Flurstücke mit fehlenden obligatorischen Werten werden in diesem Schritt "verworfen".
      Deswegen wird im weiteren Verlauf des Codes immer angenommen, dass die Werte vorhanden sind.
      */
      if (this.flurstueckIsValid(flurstueck)) {
        const id = flurstueck.properties!.flurstueckId!;

        if (!flurstueckMap.has(id)) {
          this.$store.dispatch("verortung/addFlurstueck", flurstueck);
        } else {
          this.$store.dispatch("verortung/removeFlurstueck", id);
        }

        flurstuecke.push(flurstueck);
      }
    }

    if (flurstuecke.length !== 0) {
      const multiPolygonArray: MultiPolygon[] = [];
      for (const flurstueck of flurstueckMap.values()) {
        multiPolygonArray.push(flurstueck.geometry!.coordinates as MultiPolygon);
      }

      let coordinatesArray = this.multiPolygonArrayToCoordinatesArray(multiPolygonArray);

      if (coordinatesArray.length > 1) {
        coordinatesArray = await this.getUnion(coordinatesArray, false);
      }

      this.$store.dispatch("verortung/setCoordinates", coordinatesArray);

      this.updatePolygon();
      this.map.closePopup(this.popup);

      this.updateVerortung();
    } else {
      this.popup.setContent("Keine Flurstücke an dieser Koordinate");
    }

    this.loading = false;
  }

  private updatePolygon(): void {
    const coordinates: VerortungState["coordinates"] = this.$store.getters["verortung/coordinates"];
    const leafletCoordinates = this.coordinatesArrayToLeafletFormat(coordinates);

    if (this.flurstueckPolygon) {
      this.flurstueckPolygon.setLatLngs(leafletCoordinates);
    } else {
      this.flurstueckPolygon = L.polygon(leafletCoordinates, {
        color: theme.themes.light.primary,
        fillColor: theme.themes.light.accent,
        fillOpacity: 0.5,
      }).addTo(this.map);
    }
  }

  private async updateVerortung(): Promise<void> {
    const verortung: VerortungState["verortung"] = { fluerstuck: [], gemarkung: [], stadtbezirk: [] };
    const flurstuecke: VerortungState["flurstuecke"] = this.$store.getters["verortung/flurstuecke"];
    const coordinates: VerortungState["coordinates"] = this.$store.getters["verortung/coordinates"];

    for (const flurstueck of flurstuecke.values()) {
      verortung.fluerstuck.push({
        flurstueckNr: flurstueck.properties!.flurstueckId!,
        zaehler: flurstueck.properties!.fluerstueckNummerZ!,
        nennner: flurstueck.properties!.fluerstueckNummer!,
        flaeche: flurstueck.properties!.flaecheQm!,
        staedtischesEigentum: !_.isNil(flurstueck.properties!.eigentumsart),
      });
    }

    for (const coordinate of coordinates) {
      const gemarkungen = await this.getGemarkungen(coordinate, false);
      for (const gemarkung of gemarkungen) {
        const nummer = gemarkung.properties?.gemarkung;
        const name = gemarkung.properties?.gemarkungName;
        if (nummer && name) {
          verortung.gemarkung.push({ nummer, name });
        }
      }

      const stadtbezirke = await this.getStadtbezirke(coordinate, false);
      for (const stadtbezirk of stadtbezirke) {
        const nummer = stadtbezirk.properties?.stadtbezirkNummer;
        const name = stadtbezirk.properties?.name;
        if (nummer && name) {
          verortung.stadtbezirk.push({ nummer: parseInt(nummer), name });
        }
      }
    }

    this.$store.dispatch("verortung/setVerortung", verortung);
  }

  private multiPolygonArrayToCoordinatesArray(multiPolygonArray: MultiPolygon[]): CoordinatesDto[] {
    const coordinatesArray: CoordinatesDto[] = [];

    for (const multiPolygon of multiPolygonArray) {
      for (const polygon of multiPolygon) {
        const coordinatesDto: CoordinatesDto = { coordinates: [] };
        for (const coords of polygon[0]) {
          coordinatesDto.coordinates.push({ lat: coords[1], lon: coords[0] });
        }
        coordinatesArray.push(coordinatesDto);
      }
    }

    return coordinatesArray;
  }

  private coordinatesArrayToLeafletFormat(coordinatesArray: CoordinatesDto[]): LatLngLiteral[][] {
    const formatted: LatLngLiteral[][] = [];

    for (const coordinates of coordinatesArray) {
      const latLngArray: LatLngLiteral[] = [];
      for (const coordinate of coordinates.coordinates) {
        latLngArray.push({ lat: coordinate.lat, lng: coordinate.lon });
      }
      formatted.push(latLngArray);
    }

    return formatted;
  }

  private flurstueckIsValid(flurstueck: FlurstueckFeatureDto): boolean {
    const id = !_.isNil(flurstueck.properties?.flurstueckId);
    const zaehler = !_.isNil(flurstueck.properties?.fluerstueckNummerZ);
    const nenner = !_.isNil(flurstueck.properties?.fluerstueckNummer);
    const flaeche = !_.isNil(flurstueck.properties?.flaecheQm);
    const coordinates = !_.isNil(flurstueck.geometry?.coordinates);

    if (id && zaehler && nenner && flaeche && coordinates) {
      return true;
    }

    return false;
  }
}
</script>
