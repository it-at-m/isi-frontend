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
        id="city-map-layer-control"
        ref="layerControl"
        @ready="onLayerControlReady"
      />
      <!-- Die Base-Layer der Karte. Es kann nur einer zur selben Zeit sichtbar sein, da der Base-Layer der Hintergrund der Karte ist. -->
      <l-w-m-s-tile-layer
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
        v-if="props.expandable"
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

<script setup lang="ts">
import { onMounted, computed } from "vue";
import {
  CITY_CENTER,
  LAYER_OPTIONS,
  MAP_OPTIONS,
  MAX_ZOOM,
  MIN_ZOOM,
  assembleDefaultLayersForLayerControl,
  getBackgroundMapUrl,
} from "@/utils/MapUtil";
import { Feature } from "geojson";
import L, { GeoJSONOptions, LatLngBounds, LatLngBoundsLiteral, LatLngLiteral, Layer, LeafletMouseEvent } from "leaflet";
import "leaflet.nontiledlayer";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import _ from "lodash";
import { LControl, LControlLayers, LMap, LWMSTileLayer } from "vue2-leaflet";

/**
 * Nutzt Leaflet.js um Daten von einem oder mehreren WMS-Servern zu holen und eine Karte von München und der Umgebung zu rendern.
 * Die Leaflet-Karte wurde für Stylebarkeit in eine Vuetify Sheet-Komponente eingebettet.
 */

interface Props {
  height?: number | string;
  width?: number | string;
  zoom?: number;
  expandable?: boolean;
  /**
   * True falls Buttons zum Feuern der Events "acceptSelectedGeoJson" und
   * "deselectGeoJson" auf der Karte angezeigt werden sollen.
   * Andernfalls false.
   */
  editable?: boolean;
  /**
   * Property zur Definition der initialen Kartenposition.
   */
  lookAt?: LatLngLiteral;
  /**
   * Die Feature welche in der Karte dargestellt werden sollen.
   */
  geoJson?: Feature[];
  /**
   * Die Konfiguration der Darstellung und des Verhaltens der Feature in der Property "geoJson".
   */
  geoJsonOptions?: GeoJSONOptions;
  automaticZoomToPolygons?: boolean;
  layersForLayerControl?: Map<string, Layer>;
}

interface Emits {
  (event: "accept-selected-geo-json", value: void): void;
  (event: "deselect-geo-json", value: void): void;
  (event: "click-in-map", value: L.LatLng): L.LatLng;
}

const props = withDefaults(defineProps<Props>(), {
  height: "100%",
  width: "100%",
  zoom: 12,
  expandable: false,
  geoJson: () => [],
  geoJsonOptions: undefined,
  automaticZoomToPolygons: false,
  layersForLayerControl: undefined,
});

const emit = defineEmits<Emits>();
const sheet = ref<HTMLFormElement | null>(null);
const map = ref<HTMLFormElement | null>(null);
const layerControl = ref<HTMLFormElement | null>(null);
const dialogCard = ref<HTMLFormElement | null>(null);

const initialZoom = props.zoom;
let firstGeoJsonFeatureAdded = false;
let expanded = false;
let addedLayersForLayerControl: Map<string, Layer>;
let mapMarkerClusterGroup = L.markerClusterGroup();
let mapRefCopy!: L.Map;

const mapOptions = computed(() => MAP_OPTIONS);
const cityCenter = computed(() => CITY_CENTER);
const layerOptions = computed(() => LAYER_OPTIONS);
const maxZoom = computed(() => MAX_ZOOM);
const minZoom = computed(() => MIN_ZOOM);
const isGeoJsonNotEmpty = computed(() => !_.isEmpty(props.geoJson));
const backgroundMapUrl = computed(() => getBackgroundMapUrl());

onMounted(() => {
  // Erzeugt einen "Shortcut" zum mapObject, da in den unteren Funktionen ansonsten immer `map.mapObject` aufgerufen werden müsste.
  mapRefCopy = map.value?.mapObject;
  // Workaround für anderes Fetch-Verhalten bei Infrastruktureinrichtungen.
  onLookAtChanged();
  // Workaround für das Verschwinden von Markern nach einem Wechsel der Seite.
  onGeoJsonChanged();
});

watch(() => props.lookAt, onLookAtChanged, { deep: true });
watch(() => props.geoJson, onGeoJsonChanged, { deep: true });
watch(() => props.layersForLayerControl, updateLayerControlWithCustomLayers, { deep: true });

function addGeoJsonToMap(): void {
  mapRefCopy.removeLayer(mapMarkerClusterGroup);
  mapMarkerClusterGroup = L.markerClusterGroup().addTo(mapRefCopy);
  L.geoJSON(props.geoJson, props.geoJsonOptions).addTo(mapMarkerClusterGroup);
}

function flyToPositionOnMap(position: LatLngLiteral | undefined): void {
  if (position) mapRefCopy.flyTo(position, 16);
}

/**
 * Fügt die Layer sowie die in der Property "layersForLayerControl" bereits existierenden Layer dem Overlay der LayerControl hinzu.
 * Es können beliebig viele Layer zur selben Zeit sichtbar sein, da diese spezifische Merkmale darstellen sollen.
 */
function onLayerControlReady(): void {
  const layerControlCopy = layerControl.value?.mapObject;
  assembleDefaultLayersForLayerControl().forEach((layer, name) => layerControlCopy.addOverlay(layer, name));
  updateLayerControlWithCustomLayers();
}

function onClickInMap(event: LeafletMouseEvent): void {
  clickInMap(event);
}

function flyToCenterOfPolygonsInMap(): void {
  const polygonCenter: Array<L.LatLng> = [];
  mapRefCopy.eachLayer(function (layer) {
    if (layer instanceof L.Polygon) {
      const polygon = layer as L.Polygon;
      polygonCenter.push(polygon.getBounds().getCenter());
    }
  });
  if (polygonCenter.length === 1 || polygonCenter.length === 2) {
    const center: L.LatLng = polygonCenter[0];
    flyToPositionOnMap({ lat: center.lat, lng: center.lng });
  } else if (polygonCenter.length >= 2) {
    const bounds = polygonCenter.map((latLng) => [latLng.lat, latLng.lng]) as LatLngBoundsLiteral;
    const center: L.LatLng = new LatLngBounds(bounds).getCenter();
    flyToPositionOnMap({ lat: center.lat, lng: center.lng });
  }
}

function toggleExpansion(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();

  expanded = !expanded;

  if (expanded) {
    dialogCard.value?.$el.appendChild(map.value?.$el);
  } else {
    sheet.value?.$el.appendChild(map.value?.$el);
  }

  /* Der Map muss signalisiert werden, dass sich die Größe des umgebenden Containers geändert hat.
     Jedoch darf dies erst nach einem minimalen Delay gemacht werden, da der Dialog sich erst öffnen muss. */
  setTimeout(() => mapRefCopy.invalidateSize());
}

function onLookAtChanged(): void {
  flyToPositionOnMap(props.lookAt);
}

function onGeoJsonChanged() {
  addGeoJsonToMap();
  if (!_.isEmpty(props.geoJson) && !firstGeoJsonFeatureAdded && props.automaticZoomToPolygons) {
    firstGeoJsonFeatureAdded = true;
    flyToCenterOfPolygonsInMap();
  }
}

function updateLayerControlWithCustomLayers(): void {
  const layerControlCopy = layerControl.value?.mapObject;

  // Entfernen der in einer vorherigen Aktualisierung hinzugefügten Overlays
  if (!_.isNil(addedLayersForLayerControl)) {
    addedLayersForLayerControl.forEach((layer: Layer) => {
      // Entfernen aus LayerControl-Element
      layerControlCopy.removeLayer(layer);
      // Entfernen aus Karte falls Layer in LayerControl mittels Checkbox aktiviert
      mapRefCopy.removeLayer(layer);
    });
  }

  // Ersetzen der obig entfernten Layer durch die neuen Layer.
  addedLayersForLayerControl = _.cloneDeep(props.layersForLayerControl!);

  // Hinzufügen der neuen Layer
  if (!_.isNil(addedLayersForLayerControl)) {
    addedLayersForLayerControl.forEach((layer: Layer, name: string) => layerControlCopy.addOverlay(layer, name));
  }
}

function clickInMap(event: LeafletMouseEvent): void {
  emit("click-in-map", event.latlng);
}

function onDeselectGeoJson(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();
  emit("deselect-geo-json");
}

function onAcceptSelectedGeoJson(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();
  emit("accept-selected-geo-json");
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
