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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { LMap, LPopup, LControlLayers, LWMSTileLayer } from 'vue2-leaflet';
import L from 'leaflet';
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
export default class CityMap extends Vue {
  
  private readonly OSM_BASE_URL = "https://ows.terrestris.de/osm/service?";
  private readonly MUNICH_CENTER = [48.137227, 11.575517] as const;
  private readonly MAP_OPTIONS = {attributionControl: false} as const;

  @Prop({default: "100%"})
  private readonly height!: number | string;
  @Prop({default: "100%"})
  private readonly width!: number | string;
  @Prop({default: 12})
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
  private openPopup(event: L.LeafletMouseEvent): void {
    this.popup
      .setLatLng(event.latlng)
      .setContent(event.latlng.lat + ", " + event.latlng.lng)
      .openOn(this.map);
  }

}
</script>
