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
        v-show="editable"
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
          v-show="isGeoJsonNotEmpty"
          id="clear_geojson_button"
          class="map-control"
          title="Auswahl aufheben"
          @click="onDeselectGeoJson"
        >
          <v-icon size="x-large">mdi-delete-outline</v-icon>
        </button>
      </l-control>
      <l-control
        v-show="props.expandable"
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
let groupedControl: any;
let alreadyAddedLayersForLayerControl: Map<string, Layer> | undefined;
let firstGeoJsonFeatureAdded = false;
let mapMarkerClusterGroup = L.markerClusterGroup();

onMounted(() => {
  initMap();
});

function initMap(): void {
  map = L.map(mapRef.value as HTMLElement, { zoom: props.zoom, ...MAP_OPTIONS }).on("click", (event) =>
    emit("click-in-map", event.latlng),
  );

  // Workaround für dynamische Größe des Karten-Containers auf der Hauptseite
  setTimeout(() => map.invalidateSize(), 500);

  // Der Base-Layer der Karte.
  const wmsTileLayer = L.tileLayer
    .wms(getBackgroundMapUrl(), { layers: "gsm:g_stadtkarte_gesamt", ...LAYER_OPTIONS })
    .addTo(map);

  // Basis-Layer Objekt
  const baseMaps = { ["Hintergrund"]: wmsTileLayer };

  // Erzeuge die strukturierte Layer-Liste (füllt LAYER_STRUCTURE in MapUtil)
  const LAYER_STRUCTURE = assembleBaseLayersForLayerControl();

  // Erzeuge ein gruppiertes Layer-Control (Gruppen als Überschriften, nicht selektierbar)
  groupedControl = createGroupedLayerControl(baseMaps, LAYER_STRUCTURE);
  groupedControl.addTo(map);

  // Füge ggf. zusätzliche Layer aus props hinzu
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

/**
 * Fügt eigene Layer (props.layersForLayerControl) dem gruppierten Control hinzu.
 * Entfernt zuvor hinzugefügte eigene Layer.
 */
function updateLayerControlWithCustomLayers(): void {
  // Entfernen der in einer vorherigen Aktualisierung hinzugefügten Overlays
  if (!_.isNil(alreadyAddedLayersForLayerControl)) {
    alreadyAddedLayersForLayerControl.forEach((layer: Layer) => {
      try {
        groupedControl.removeOverlay(layer);
      } catch (e) {
        // ignore
      }
      if (map.hasLayer(layer)) map.removeLayer(layer);
    });
  }

  // Hinzufügen der neuen Layer (unter Gruppe "Eigene Layer")
  if (!_.isNil(props.layersForLayerControl)) {
    props.layersForLayerControl.forEach((layer: L.Layer, name: string) => {
      groupedControl.addOverlay(layer, name, "Weitere Layer");
    });
  }

  alreadyAddedLayersForLayerControl = props.layersForLayerControl;
}

/**
 * Erzeugt ein gruppiertes Layer-Control, das Gruppen als Überschriften darstellt.
 * Gruppen sind nicht selektierbar; nur einzelne Layer innerhalb der Gruppen besitzen Checkboxen.
 */
function createGroupedLayerControl(baseMaps: Record<string, Layer>, layerStructure: any) {
  const control = L.control({ position: "topright" });
  const overlayInputs = new Map<Layer, HTMLInputElement>();
  let containerDiv: HTMLDivElement | null = null;

  control.onAdd = function (mapInstance: L.Map) {
    const div = L.DomUtil.create("div", "leaflet-control grouped-layer-control") as HTMLDivElement;
    containerDiv = div;
    div.style.background = "white";
    div.style.padding = "6px";
    div.style.maxHeight = "60vh";
    div.style.overflow = "auto";
    /*
    const title = L.DomUtil.create("div", "glc-title", div);
    title.innerHTML = "<strong>Layer</strong>";

    // Basiskarten als Radiobuttons
    const baseDiv = L.DomUtil.create("div", "glc-group", div);
    const baseTitle = L.DomUtil.create("div", "glc-group-title", baseDiv);
    baseTitle.innerText = "Basiskarten";
    let first = true;
    for (const key of Object.keys(baseMaps)) {
      const item = L.DomUtil.create("label", "glc-item", baseDiv) as HTMLLabelElement;
      item.style.display = "flex";
      item.style.alignItems = "center";
      const input = L.DomUtil.create("input", "", item) as HTMLInputElement;
      input.type = "radio";
      input.name = "glc-baselayer";
      input.style.marginRight = "6px";
      input.checked = first;
      input.onchange = function () {
        if (input.checked) {
          Object.values(baseMaps).forEach((b: Layer) => mapInstance.removeLayer(b));
          (baseMaps as any)[key].addTo(mapInstance);
        }
      };
      const span = L.DomUtil.create("span", "", item);
      span.innerText = key;
      first = false;
    }
    */
    // Overlay-Gruppen: Überschrift (klickbar) + Layer-Checkboxen (collapsible)
    for (const group of layerStructure) {
      const groupDiv = L.DomUtil.create("div", "glc-group", div);

      // Header mit Titel und Indicator
      const header = L.DomUtil.create("div", "glc-group-header", groupDiv) as HTMLDivElement;
      header.style.display = "flex";
      header.style.alignItems = "center";
      header.style.justifyContent = "space-between";
      header.style.cursor = "pointer";
      header.style.marginTop = "6px";

      const groupTitle = L.DomUtil.create("div", "glc-group-title", header);
      groupTitle.innerText = (group.gruppe || "Gruppe") as string;
      groupTitle.style.fontWeight = "600";

      const indicator = L.DomUtil.create("span", "glc-group-indicator", header);
      indicator.innerText = "▾";
      indicator.style.marginLeft = "8px";

      // Container für die Items (ein- / ausblendbar)
      const itemsContainer = L.DomUtil.create("div", "glc-group-items", groupDiv) as HTMLDivElement;
      itemsContainer.style.marginLeft = "6px";
      itemsContainer.style.marginTop = "4px";

      // Toggle-Funktion
      header.onclick = function (ev) {
        ev.stopPropagation();
        if (itemsContainer.style.display === "none") {
          itemsContainer.style.display = "";
          indicator.innerText = "▾";
        } else {
          itemsContainer.style.display = "none";
          indicator.innerText = "▸";
        }
      };

      // standardmäßig geschlossen
      itemsContainer.style.display = "none"; // geöffnet: ""

      for (const detail of group.layerDetails) {
        const item = L.DomUtil.create("label", "glc-item", itemsContainer) as HTMLLabelElement;
        item.style.display = "flex";
        item.style.alignItems = "center";
        const input = L.DomUtil.create("input", "", item) as HTMLInputElement;
        input.type = "checkbox";
        input.style.marginRight = "6px";
        input.onchange = function () {
          if (input.checked) {
            detail.layer.addTo(mapInstance);
            overlayInputs.set(detail.layer, input);
          } else {
            mapInstance.removeLayer(detail.layer);
            overlayInputs.delete(detail.layer);
          }
        };
        const span = L.DomUtil.create("span", "", item);
        span.innerText = detail.displayName;
      }
    }

    return div;
  };

  control.onRemove = function (_map: L.Map) {
    containerDiv = null;
    overlayInputs.clear();
  };

  // Fügt ein Overlay (z.B. props.layersForLayerControl) unter einer Gruppe ein (erstellt Gruppe falls nötig)
  (control as any).addOverlay = function (layer: Layer, name: string, groupName: string = "Weitere") {
    if (!containerDiv) return;
    let groupDiv = Array.from(containerDiv.querySelectorAll(".glc-group")).find((gd) => {
      const title = gd.querySelector(".glc-group-title");
      return title && title.textContent === groupName;
    }) as HTMLDivElement | undefined;
    if (!groupDiv) {
      groupDiv = L.DomUtil.create("div", "glc-group", containerDiv) as HTMLDivElement;
      // Header
      const header = L.DomUtil.create("div", "glc-group-header", groupDiv) as HTMLDivElement;
      header.style.display = "flex";
      header.style.alignItems = "center";
      header.style.justifyContent = "space-between";
      header.style.cursor = "pointer";
      header.style.marginTop = "6px";
      const groupTitle = L.DomUtil.create("div", "glc-group-title", header);
      groupTitle.innerText = groupName;
      groupTitle.style.fontWeight = "600";
      const indicator = L.DomUtil.create("span", "glc-group-indicator", header);
      indicator.innerText = "▾";
      indicator.style.marginLeft = "8px";

      // Items container
      const itemsContainer = L.DomUtil.create("div", "glc-group-items", groupDiv) as HTMLDivElement;
      itemsContainer.style.marginLeft = "6px";
      itemsContainer.style.marginTop = "4px";
      itemsContainer.style.display = "none";

      header.onclick = function (ev) {
        ev.stopPropagation();
        if (itemsContainer.style.display === "none") {
          itemsContainer.style.display = "";
          indicator.innerText = "▾";
        } else {
          itemsContainer.style.display = "none";
          indicator.innerText = "▸";
        }
      };
    }

    // Find the group's items container to append the new item
    let targetGroupItems = groupDiv.querySelector(".glc-group-items") as HTMLDivElement | null;
    if (!targetGroupItems) {
      targetGroupItems = L.DomUtil.create("div", "glc-group-items", groupDiv) as HTMLDivElement;
      targetGroupItems.style.marginLeft = "6px";
      targetGroupItems.style.marginTop = "4px";
    }

    const item = L.DomUtil.create("label", "glc-item", targetGroupItems) as HTMLLabelElement;
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.marginBottom = "4px";
    const input = L.DomUtil.create("input", "", item) as HTMLInputElement;
    input.type = "checkbox";
    input.style.marginRight = "6px";
    input.onchange = function () {
      if (input.checked) map.addLayer(layer);
      else map.removeLayer(layer);
    };
    const span = L.DomUtil.create("span", "", item);
    span.innerText = name;
    overlayInputs.set(layer, input);
  };

  (control as any).removeOverlay = function (layer: Layer) {
    const input = overlayInputs.get(layer);
    if (input && input.parentElement) input.parentElement.remove();
    if ((map as L.Map).hasLayer(layer)) (map as L.Map).removeLayer(layer);
    overlayInputs.delete(layer);
  };

  return control;
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
