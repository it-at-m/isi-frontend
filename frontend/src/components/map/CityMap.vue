<template>
  <v-sheet
    ref="sheet"
    :height="height"
    :width="width"
  >
    <div
      id="karte"
      ref="mapRef"
      style="width: 100%; height: 100%"
    >
      <l-control
        v-if="editable"
        ref="geoJsonControl"
        position="bottomleft"
      >
        <button
          id="save_geojson_button"
          class="map-control"
          title="Auswahl übernehmen"
          @click="onAcceptSelectedGeoJson"
        >
          <v-icon size="x-large"> mdi-checkbox-marked-outline </v-icon>
        </button>
        <button
          v-if="isGeoJsonNotEmpty"
          id="clear_geojson_button"
          class="map-control"
          title="Auswahl aufheben"
          @click="onDeselectGeoJson"
        >
          <v-icon size="x-large">mdi-delete-outline</v-icon>
        </button>
      </l-control>
      <l-control
        v-if="props.expandable"
        ref="expansionControl"
        position="bottomright"
      >
        <button
          id="karte_erweitern_button"
          class="map-control"
          :title="expanded ? 'Einklappen' : 'Erweitern'"
          @click="toggleExpansion"
        >
          <v-icon size="x-large">{{ expanded ? "mdi-arrow-collapse" : "mdi-arrow-expand" }}</v-icon>
        </button>
      </l-control>
    </div>
  </v-sheet>
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
</template>

<script setup lang="ts">
import { onMounted, computed, watch, ref, onBeforeUnmount } from "vue";
import type { VCard, VSheet } from "vuetify/components";
import { LAYER_OPTIONS, MAP_OPTIONS, assembleBaseLayersForLayerControl, getBackgroundMapUrl } from "@/utils/MapUtil";
import type { Feature } from "geojson";
import L, { type GeoJSONOptions, type LatLngBoundsLiteral, type LatLngLiteral, Layer, LatLngBounds } from "leaflet";
import LControl from "./LControl.vue";
import "leaflet.nontiledlayer";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet/dist/leaflet.css";
import _ from "lodash";

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
  lookAtZoom?: number;
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
  lookAtZoom: 16,
});

const emit = defineEmits<Emits>();
const mapRef = ref<HTMLDivElement | null>(null);
const sheet = ref<VSheet | null>(null);
const dialogCard = ref<VCard | null>(null);
const geoJsonControl = ref<typeof LControl | null>(null);
const expansionControl = ref<typeof LControl | null>(null);
const expanded = ref(false);
const isGeoJsonNotEmpty = computed(() => !_.isEmpty(props.geoJson));

let map: L.Map;
let layerControl: L.Control.Layers;
let firstGeoJsonFeatureAdded = false;
let mapMarkerClusterGroup = L.markerClusterGroup();

onMounted(() => {
  initMap();
});

function initMap(): void {
  map = L.map(mapRef.value as HTMLElement, { zoom: props.zoom, ...MAP_OPTIONS }).on("click", (event) =>
    emit("click-in-map", event.latlng),
  );

  // Der Base-Layer der Karte.
  const wmsTileLayer = L.tileLayer
    .wms(getBackgroundMapUrl(), { layers: "gsm:g_stadtkarte_gesamt", ...LAYER_OPTIONS })
    .addTo(map);

  // Fügt ein Steuerungselement hinzu, mit welchem sich der Base-Layer und eine beliebige Anzahl von Overlay-Layern aktivieren lässt.
  layerControl = L.control.layers({ ["Hintergrund"]: wmsTileLayer }, assembleBaseLayersForLayerControl()).addTo(map);

  updateLayerControlWithCustomLayers();

  // Fügt zusätzliche Steuerelement hinzu
  geoJsonControl.value?.control?.addTo(map);
  expansionControl.value?.control?.addTo(map);

  // Workaround für anderes Fetch-Verhalten bei Infrastruktureinrichtungen.
  onLookAtChanged();
  // Workaround für das Verschwinden von Markern nach einem Wechsel der Seite.
  onGeoJsonChanged();
}

onBeforeUnmount(() => {
  map.remove();
});

watch(() => props.lookAt, onLookAtChanged, { deep: true });
watch(() => props.geoJson, onGeoJsonChanged, { deep: true });
watch(() => props.layersForLayerControl, updateLayerControlWithCustomLayers, { deep: true });

function addGeoJsonToMap(): void {
  (map as L.Map).removeLayer(mapMarkerClusterGroup);
  mapMarkerClusterGroup = L.markerClusterGroup().addTo(map);
  L.geoJSON(props.geoJson, props.geoJsonOptions).addTo(mapMarkerClusterGroup);
}

function flyToPositionOnMap(position: LatLngLiteral | undefined): void {
  if (position) map.flyTo(position, props.lookAtZoom);
}

function flyToCenterOfPolygonsInMap(): void {
  const polygonCenter: Array<L.LatLng> = [];
  map.eachLayer(function (layer) {
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

  expanded.value = !expanded.value;

  if (mapRef.value) {
    if (expanded.value) {
      dialogCard.value?.$el.appendChild(mapRef.value);
    } else {
      sheet.value?.$el.appendChild(mapRef.value);
    }
  }

  /* Der Map muss signalisiert werden, dass sich die Größe des umgebenden Containers geändert hat.
     Jedoch darf dies erst nach einem minimalen Delay gemacht werden, da der Dialog sich erst öffnen muss. */
  setTimeout(() => map.invalidateSize());
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
  if (!_.isNil(props.layersForLayerControl)) {
    // Entfernen der in einer vorherigen Aktualisierung hinzugefügten Overlays
    props.layersForLayerControl.forEach((layer: Layer) => {
      // Entfernen aus LayerControl-Element
      layerControl.removeLayer(layer);
      // Entfernen aus Karte falls Layer in LayerControl mittels Checkbox aktiviert
      map.removeLayer(layer);
    });

    // Hinzufügen der neuen Layer
    props.layersForLayerControl.forEach((layer: Layer, name: string) => layerControl.addOverlay(layer, name));
  }
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

<style scoped>
.map-control {
  width: 44px;
  height: 44px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}
</style>
