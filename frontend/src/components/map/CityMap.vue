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
        :base-url="OSM_BASE_URL"
        layers="OSM-WMS"
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
import { CoordinateDto, FlurstueckDto } from '@/api/api-client/isi-wfs-eai';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import _ from 'lodash';

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
  private readonly OSM_BASE_URL = "https://ows.terrestris.de/osm/service?";
  private readonly MUNICH_CENTER = [48.137227, 11.575517];
  private readonly MAP_OPTIONS = {attributionControl: false};

  @Prop({default: "100%"})
  private readonly height!: number | string;
  @Prop({default: "100%"})
  private readonly width!: number | string;
  @Prop({default: 18})
  private readonly zoom!: number;

  private readonly popup = L.popup();
  private map!: L.Map;

  mounted(): void {
    // Erzeugt einen "Shortcut" zum mapObject, da in den unteren Funktionen ansonsten immer `this.map.mapObject` aufgerufen werden müsste.
    this.map = (this.$refs.map as LMap).mapObject;
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
    const latlng = event.latlng;

    this.popup
      .setLatLng(latlng)
      .setContent("Lädt...")
      .openOn(this.map);

    const coordinate: CoordinateDto = { lat: latlng.lat, lon: latlng.lng };
    const flurstuecke = await this.getFlurstuecke(coordinate, false);
    console.log(flurstuecke);
    
    if (flurstuecke.length !== 0) {
      let message = "";
      
      for (const flurstueck of flurstuecke) {
        const data = flurstueck.properties;

        // TODO: data undefinded müsste auch zu "Keine Flurstücke an dieser Koordinate" führen
        if (data && data.flurstueckId) {
          if (!this.$store.getters["cityMap/flurstuecke"].has(data.flurstueckId)) {
            this.$store.dispatch("cityMap/addFlurstueck", flurstueck);
            message += this.flurstueckToHtml(data) + "<br><br>";
          } else {
            this.$store.dispatch("cityMap/removeFlurstueck", data.flurstueckId);
          }
        }
      }

      // TODO: Alle Polygone rendern
      for (const flurstueck of this.$store.getters["cityMap/flurstuecke"]) {
        const polygon = flurstueck.geometry.coordinates as LatLngExpression[][][];
        // Die letzte Koordinate ist immer ein Duplikat der Ersten und sollte für Leaflet entfernt werden
        polygon.pop();
        L.polygon(polygon).addTo(this.map);
      }
      
      // Entfernt den letzten doppelten Zeilenumbruch
      message = message.replace(/<br><br>$/, "");
      this.popup.setContent(message);
    } else {
      this.popup.setContent("Keine Flurstücke an dieser Koordinate");
    }
  }

  private flurstueckToHtml(flurstueck: FlurstueckDto): string {
    return `
      <b>Nummer:</b> ${_.defaultTo(flurstueck.fluerstueckNummer, "keine")}<br>
      <b>NummerZ:</b> ${_.defaultTo(flurstueck.fluerstueckNummerZ, "keine")}<br>
      <b>Gemarkung:</b> ${_.defaultTo(flurstueck.gemarkungName, "keine")}<br>
      <b>Eigentumsart:</b> ${_.defaultTo(flurstueck.eigentumsart, "keine")}<br>
      <b>Nutzungsart:</b> ${_.defaultTo(flurstueck.nutzungsart, "keine")}<br>
      <b>Fläche:</b> ${_.defaultTo(flurstueck.flaecheQm, "keine")}
    `;
  }
}
</script>
