<template>
  <v-sheet
    :height="height"
    :width="width"
  >
    <l-map
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
        name="Gemarkungen"
        :base-url="getGiwUrl('WMS_Stadtgrundkarte')"
        layers="Gemarkungen"
        format="image/png"
        layer-type="overlay"
        :visible="false"
        :transparent="true"
      />
      <l-wms-tile-layer
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
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { LMap, LPopup, LControlLayers, LWMSTileLayer } from 'vue2-leaflet';
import WfsEaiApiRequestMixin from "@/mixins/requests/eai/WfsEaiApiRequestMixin";
import { CoordinateDto, CoordinatesDto, FlurstueckFeatureDto } from '@/api/api-client/isi-wfs-eai';
import { VerortungState, MultiPolygon } from '@/store/modules/VerortungStore';
import L, { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * Nutzt Leaflet.js um Daten von einem oder mehreren WMS-Servern zu holen und eine Karte von München und der Umgebung zu rendern.
 * Die Leaflet-Karte wurde für Stylebarkeit in eine Vuetify Sheet-Komponente eingebettet.
 */
@Component({
  components: {
    LMap,
    LPopup,
    LControlLayers,
    'l-wms-tile-layer': LWMSTileLayer,
  }
})
export default class CityMap extends Mixins(
  WfsEaiApiRequestMixin
) {
  private readonly WMS_BASE_URL = "https://geoinfoweb.muenchen.de/arcgis/services/WMS_Stadtkarte/MapServer/WMSServer?";
  private readonly MUNICH_CENTER = [48.137227, 11.575517];
  private readonly MAP_OPTIONS = {attributionControl: false};

  @Prop({default: "100%"})
  private readonly height!: number | string;
  @Prop({default: "100%"})
  private readonly width!: number | string;
  @Prop({default: 16})
  private readonly zoom!: number;

  private readonly popup = L.popup();
  private map!: L.Map;
  private flurstueckPolygon?: L.Polygon;
  private loading = false;

  mounted(): void {
    // Erzeugt einen "Shortcut" zum mapObject, da in den unteren Funktionen ansonsten immer `this.map.mapObject` aufgerufen werden müsste.
    this.map = (this.$refs.map as LMap).mapObject;
    this.redraw();
  }

  /**
   * Da GeoInfoWeb mehrere Services anbietet, wird mit dieser Funktion der notwendige Service ausgewählt (ohne die URL kopieren zu müssen).
   */
  private getGiwUrl(service: string): string {
    return (import.meta.env.VITE_GIS_URL as string).replace('{1}', service);
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

    this.popup
      .setLatLng(latlng)
      .setContent("Lädt...")
      .openOn(this.map);

    const coordinate: CoordinateDto = { lat: latlng.lat, lon: latlng.lng };
    const fetchedFlurstuecke = await this.getFlurstuecke(coordinate, false);
    const flurstuecke: FlurstueckFeatureDto[] = [];
    const flurstueckMap = this.$store.getters["verortung/flurstuecke"] as VerortungState["flurstuecke"];
    
    for (const flurstueck of fetchedFlurstuecke) {
      const id = flurstueck.properties?.flurstueckId;

      if (id && flurstueck.geometry) {
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        multiPolygonArray.push(flurstueck.geometry!.coordinates as MultiPolygon);
      }

      let coordinatesArray = this.multiPolygonArrayToCoordinatesArray(multiPolygonArray);
      
      if (coordinatesArray.length > 1) {
        coordinatesArray = await this.getUnion(coordinatesArray, false);
      }

      this.$store.dispatch("verortung/setCoordinates", coordinatesArray);
      
      this.redraw();
      this.map.closePopup(this.popup);
    } else {
      this.popup.setContent("Keine Flurstücke an dieser Koordinate");
    }

    this.loading = false;
  }

  private redraw(): void {
    const coordinates = this.$store.getters["verortung/coordinates"] as VerortungState["coordinates"];
    const leafletCoordinates = this.coordinatesArrayToLeafletFormat(coordinates);
    
    if (this.flurstueckPolygon) {
      this.flurstueckPolygon.setLatLngs(leafletCoordinates);
      this.flurstueckPolygon.redraw();
    } else {
      this.flurstueckPolygon = L.polygon(leafletCoordinates, {
        color: "#455A64",
        fillColor: "#546E7A",
        fillOpacity: 0.5
      }).addTo(this.map);
    }
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
      latLngArray.pop();
      formatted.push(latLngArray);
    }

    return formatted;
  }
}
</script>
