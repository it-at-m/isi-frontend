<template>
  <v-sheet
    ref="sheet"
    :height="height"
    :width="width"
  >
    <l-map
      id="karte"
      ref="map"
      :options="MAP_OPTIONS"
      :center="CITY_CENTER"
      :zoom="initialZoom"
      style="z-index: 1"
      @click="onClickInMap($event)"
    >
      <!-- Fügt ein Steuerungselement hinzu, mit welchem sich ein Base-Layer und eine beliebige Anzahl von Overlay-Layern aktivieren lässt. -->
      <l-control-layers />
      <!-- Die Base-Layer der Karte. Es kann nur einer zur selben Zeit sichtbar sein, da der Base-Layer der Hintergrund der Karte ist. -->
      <l-wms-tile-layer
        id="karte_hintergrund"
        name="Hintergrund"
        :base-url="getGeoUrl('WMS_Stadtkarte')"
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
        :base-url="getGeoUrl('WMS_Stadtgrundkarte')"
        layers="Gemarkungen"
        format="image/png"
        layer-type="overlay"
        :visible="false"
        :transparent="true"
      />
      <l-wms-tile-layer
        id="karte_flurstuecke"
        name="Flurstücke"
        :base-url="getGeoUrl('WMS_Stadtgrundkarte')"
        layers="Flurstücke"
        format="image/png"
        layer-type="overlay"
        :visible="false"
        :transparent="true"
      />
      <l-control
        v-if="expandable"
        position="bottomright"
      >
        <button
          id="karte_erweitern_button"
          class="expansion-control"
          :title="expanded ? 'Einklappen' : 'Erweitern'"
          @click="toggleExpansion"
        >
          <v-icon large>{{ expanded ? "mdi-arrow-collapse" : "mdi-arrow-expand" }}</v-icon>
        </button>
      </l-control>
    </l-map>
    <v-dialog
      id="karte_dialog"
      v-model="expanded"
      persistent
      eager
      height="80vh"
      width="80%"
    >
      <v-card
        ref="dialogCard"
        height="80vh"
        width="100%"
      />
    </v-dialog>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { LMap, LPopup, LControlLayers, LWMSTileLayer, LControl } from "vue2-leaflet";
import L, { LatLng, LatLngLiteral, LayerGroup, LeafletMouseEvent, MapOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MultiPolygonGeometryDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import { GeoJsonObject } from "geojson";

type Ref = Vue & { $el: HTMLElement };

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
    LControl,
  },
})
export default class CityMap extends Vue {
  private readonly CITY_CENTER: LatLngLiteral = { lat: 48.137227, lng: 11.575517 };
  private readonly MAP_OPTIONS: MapOptions = { attributionControl: false };

  @Prop({ default: "100%" })
  private readonly height!: number | string;

  @Prop({ default: "100%" })
  private readonly width!: number | string;

  @Prop({ default: 12 })
  private readonly zoom!: number;

  private initialZoom!: number;

  @Prop({ type: Boolean, default: false })
  private readonly expandable!: boolean;

  @Prop()
  private readonly lookAt?: LatLngLiteral;

  @Prop({ default: [] })
  private readonly geoJson?: GeoJsonObject[];

  private layerGroup: LayerGroup = new LayerGroup();

  private readonly popup = L.popup();
  private map!: L.Map;
  private expanded = false;

  created(): void {
    /* Da die Karte ihren Zoom selber ändern kann, soll dieser Wert nur einmalig gesetzt werden.
       Ändert das Elternelement im Nachhinein den Wert vom "zoom"-Prop, soll dies die Karte nicht beeinflussen. */
    this.initialZoom = this.zoom;
  }

  mounted(): void {
    // Erzeugt einen "Shortcut" zum mapObject, da in den unteren Funktionen ansonsten immer `this.map.mapObject` aufgerufen werden müsste.
    this.map = (this.$refs.map as LMap).mapObject;
    // Workaround für anderes Fetch-Verhalten bei Infrastruktureinrichtungen.
    this.onLookAtChanged();
  }

  @Watch("lookAt", { deep: true })
  private onLookAtChanged(): void {
    if (this.lookAt) {
      this.map.flyTo(this.lookAt, 16);
    }
  }

  @Watch("geoJson", { deep: true })
  private onGeoJsonChanged(): void {
    this.addGeoJsonToMap();
  }

  private onClickInMap(event: LeafletMouseEvent): void {
    this.clickInMap(event);
  }

  /**
   * Da der Geo-Dienst mehrere Services anbietet, wird mit dieser Funktion der notwendige Service ausgewählt (ohne die URL kopieren zu müssen).
   */
  private getGeoUrl(service: string): string {
    return (import.meta.env.VITE_GIS_URL as string).replace("{1}", service);
  }

  /**
   * Erweitert bzw. klappt die Karte ein. Dafür muss sie entweder in den Dialog oder zurück zum Ausgangspunkt verschoben werden.
   */
  private toggleExpansion(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.expanded = !this.expanded;

    if (this.expanded) {
      (this.$refs.dialogCard as Ref).$el.appendChild((this.$refs.map as Ref).$el);
    } else {
      (this.$refs.sheet as Ref).$el.appendChild((this.$refs.map as Ref).$el);
    }

    /* Der Map muss signalisiert werden, dass sich die Größe des umgebenden Containers geändert hat.
       Jedoch darf dies erst nach einem minimalen Delay gemacht werden, da der Dialog sich erst öffnen muss. */
    setTimeout(() => this.map.invalidateSize());
  }

  private addGeoJsonToMap(): void {
    this.map.removeLayer(this.layerGroup);
    this.layerGroup = new L.LayerGroup();
    this.layerGroup.addTo(this.map);
    L.geoJSON(this.geoJson, {
      style: function () {
        return { color: "#ff0000" };
      },
    }).addTo(this.layerGroup);
  }

  @Emit()
  private clickInMap(event: LeafletMouseEvent): LatLng {
    return event.latlng;
  }
}
</script>

<style>
.expansion-control {
  width: 44px;
  height: 44px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}
</style>
