<template>
  <v-sheet
    ref="sheet"
    :height="height"
    :width="width"
  >
    <l-map
      id="karte"
      ref="map"
      :options="mapOptions"
      :center="cityCenter"
      :max-zoom="maxZoom"
      :zoom="initialZoom"
      style="z-index: 1"
      @click="onClickInMap($event)"
    >
      <!-- Fügt ein Steuerungselement hinzu, mit welchem sich ein Base-Layer und eine beliebige Anzahl von Overlay-Layern aktivieren lässt. -->
      <l-control-layers
        v-if="showLayerControlElement"
        id="city-map-layer-control"
        ref="layerControl"
        @ready="onLayerControlReady"
      />
      <!-- Die Base-Layer der Karte. Es kann nur einer zur selben Zeit sichtbar sein, da der Base-Layer der Hintergrund der Karte ist. -->
      <l-wms-tile-layer
        id="karte_hintergrund"
        name="Hintergrund"
        :base-url="backgroundMapUrl"
        layers="gsm:g_stadtkarte_gesamt"
        :visible="true"
        :options="layerOptions"
      />
      <l-control
        v-if="editable"
        position="bottomleft"
      >
        <button
          id="save_geojson_button"
          class="map-control"
          title="Auswahl übernehmen"
          @click="onAcceptSelectedGeoJson"
        >
          <v-icon large> mdi-checkbox-marked-outline </v-icon>
        </button>
        <button
          v-if="isGeoJsonNotEmpty"
          id="clear_geojson_button"
          class="map-control"
          title="Auswahl aufheben"
          @click="onDeselectGeoJson"
        >
          <v-icon large> mdi-delete-outline </v-icon>
        </button>
      </l-control>
      <l-control
        v-if="expandable"
        position="bottomright"
      >
        <button
          id="karte_erweitern_button"
          class="map-control"
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
import { LMap, LControlLayers, LWMSTileLayer, LControl } from "vue2-leaflet";
import L, {
  GeoJSONOptions,
  LatLng,
  LatLngBounds,
  LatLngBoundsLiteral,
  LatLngLiteral,
  LayerGroup,
  WMSOptions,
  LeafletMouseEvent,
  MapOptions,
  Layer,
} from "leaflet";
import "leaflet.nontiledlayer";
import "leaflet/dist/leaflet.css";
import _ from "lodash";
import { Feature } from "geojson";
import { CITY_CENTER, getBackgroundMapUrl, LAYER_OPTIONS, MAP_OPTIONS, MAX_ZOOM, MIN_ZOOM } from "@/utils/MapUtil";

type Ref = Vue & { $el: HTMLElement };

/**
 * Nutzt Leaflet.js um Daten von einem oder mehreren WMS-Servern zu holen und eine Karte von München und der Umgebung zu rendern.
 * Die Leaflet-Karte wurde für Stylebarkeit in eine Vuetify Sheet-Komponente eingebettet.
 */
@Component({
  components: {
    LMap,
    LControlLayers,
    "l-wms-tile-layer": LWMSTileLayer,
    LControl,
  },
})
export default class CityMap extends Vue {
  @Prop({ default: "100%" })
  private readonly height!: number | string;

  @Prop({ default: "100%" })
  private readonly width!: number | string;

  @Prop({ default: 12 })
  private readonly zoom!: number;

  private initialZoom!: number;

  @Prop({ type: Boolean, default: false })
  private readonly expandable!: boolean;

  /**
   * True falls Buttons zum Feuern der Events "acceptSelectedGeoJson" und
   * "deselectGeoJson" auf der Karte angezeigt werden sollen.
   * Andernfalls false.
   */
  @Prop({ type: Boolean, default: false })
  private readonly editable!: boolean;

  /**
   * Property zur Definition der initialen Kartenposition.
   */
  @Prop()
  private readonly lookAt?: LatLngLiteral;

  private firstGeoJsonFeatureAdded = false;

  /**
   * Die Feature welche in der Karte dargestellt werden sollen.
   */
  @Prop({ default: () => [] })
  private readonly geoJson?: Feature[];

  /**
   * Die Konfiguration der Darstellung und des Verhaltens der Feature in der Property "geoJson".
   */
  @Prop({ default: undefined })
  private readonly geoJsonOptions?: GeoJSONOptions;

  @Prop({ type: Boolean, default: false })
  private readonly automaticZoomToPolygons!: boolean;

  @Prop({ default: () => undefined })
  private readonly layersForLayerControl?: Map<string, Layer>;

  private layerGroup: LayerGroup = new LayerGroup();
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
    // Workaround für das Verschwinden von Markern nach einem Wechsel der Seite.
    this.onGeoJsonChanged();
  }

  @Watch("lookAt", { deep: true })
  private onLookAtChanged(): void {
    this.flyToPositionOnMap(this.lookAt);
  }

  @Watch("geoJson", { deep: true })
  private onGeoJsonChanged(): void {
    this.addGeoJsonToMap();
    if (!_.isEmpty(this.geoJson) && !this.firstGeoJsonFeatureAdded && this.automaticZoomToPolygons) {
      this.firstGeoJsonFeatureAdded = true;
      this.flyToCenterOfPolygonsInMap();
    }
  }

  get mapOptions(): MapOptions {
    return MAP_OPTIONS;
  }

  get cityCenter(): LatLngLiteral {
    return CITY_CENTER;
  }

  get layerOptions(): WMSOptions {
    return LAYER_OPTIONS;
  }

  get maxZoom(): number {
    return MAX_ZOOM;
  }

  get minZoom(): number {
    return MIN_ZOOM;
  }

  get isGeoJsonNotEmpty(): boolean {
    return !_.isEmpty(this.geoJson);
  }

  get backgroundMapUrl(): string {
    return getBackgroundMapUrl();
  }

  get showLayerControlElement(): boolean {
    return !_.isEmpty(this.layersForLayerControl);
  }

  private onClickInMap(event: LeafletMouseEvent): void {
    this.clickInMap(event);
  }

  /**
   * Fügt die Overlay-Layer hinzu. Es können beliebig viele von ihnen zur selben Zeit sichtbar sein, da sie nur spezifische Merkmale darstellen sollen.
   * Damit ein Overlay-Layer nicht die darunerliegenden Layer verdeckt, ist es wichtig, `transparent: true` zu setzen sowie ein Bildformat anzufordern, welches Transparenz unterstützt.
   *
   * Overlay-Layer werden als NonTiledLayer hinzugefügt, um "abschnittene" Segment zu vermeiden.
   * @see https://github.com/ptv-logistics/Leaflet.NonTiledLayer
   */
  private onLayerControlReady(): void {
    const layerControl = (this.$refs.layerControl as LControlLayers).mapObject;
    if (!_.isNil(this.layersForLayerControl) && this.showLayerControlElement) {
      this.layersForLayerControl.forEach((value, key) => layerControl.addOverlay(value, key));
    }
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

  private onDeselectGeoJson(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.deselectGeoJson();
  }

  private onAcceptSelectedGeoJson(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.acceptSelectedGeoJson();
  }

  private addGeoJsonToMap(): void {
    this.map.removeLayer(this.layerGroup);
    this.layerGroup = new L.LayerGroup();
    this.layerGroup.addTo(this.map);
    L.geoJSON(this.geoJson, this.geoJsonOptions).addTo(this.layerGroup);
  }

  private flyToPositionOnMap(position: LatLngLiteral | undefined) {
    if (position) this.map.flyTo(position, 16);
  }

  private flyToCenterOfPolygonsInMap(): void {
    const polygonCenter: Array<L.LatLng> = [];
    this.map.eachLayer(function (layer) {
      if (layer instanceof L.Polygon) {
        const polygon = layer as L.Polygon;
        polygonCenter.push(polygon.getBounds().getCenter());
      }
    });
    if (polygonCenter.length === 1 || polygonCenter.length === 2) {
      const center: L.LatLng = polygonCenter[0];
      this.flyToPositionOnMap({ lat: center.lat, lng: center.lng });
    } else if (polygonCenter.length >= 2) {
      const bounds = polygonCenter.map((latLng) => [latLng.lat, latLng.lng]) as LatLngBoundsLiteral;
      const center: L.LatLng = new LatLngBounds(bounds).getCenter();
      this.flyToPositionOnMap({ lat: center.lat, lng: center.lng });
    }
  }

  @Emit()
  private clickInMap(event: LeafletMouseEvent): LatLng {
    return event.latlng;
  }

  @Emit()
  private deselectGeoJson(): void {
    // Clears geoJson
  }

  @Emit()
  private acceptSelectedGeoJson(): void {
    // Accept geoJson
  }
}
</script>

<style>
.map-control {
  width: 44px;
  height: 44px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}
</style>
