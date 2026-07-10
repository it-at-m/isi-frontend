import L, { type WMSOptions, type LatLngLiteral, type MapOptions, TileLayer, LayerGroup } from "leaflet";
import iconAbfrageUrl from "@/assets/marker-icon-abfrage.png";
import iconBauvorhabenUrl from "@/assets/marker-icon-bauvorhaben.png";
import iconInfrastruktureinrichtungUrl from "@/assets/marker-icon-infrastruktureinrichtung.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
// import "@/types/common/Leaflet";

interface LayerGroup {
  gruppe: string;
  layerDetails: LayerDetail[];
}

interface LayerDetail {
  displayName: string;
  layer: TileLayer.WMS;
}

// Vgl. https://github.com/Leaflet/Leaflet/blob/main/src/layer/marker/Icon.Default.js#L22
export const DEFAULT_ICON_OPTIONS = {
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41] as [number, number],
  iconAnchor: [12, 41] as [number, number],
  popupAnchor: [1, -34] as [number, number],
  tooltipAnchor: [16, -28] as [number, number],
  shadowSize: [41, 41] as [number, number],
};
export const ICON_ABFRAGE = L.icon({ iconUrl: iconAbfrageUrl, ...DEFAULT_ICON_OPTIONS });
export const ICON_BAUVORHABEN = L.icon({ iconUrl: iconBauvorhabenUrl, ...DEFAULT_ICON_OPTIONS });
export const ICON_INFRASTRUKTUREINRICHTUNG = L.icon({
  iconUrl: iconInfrastruktureinrichtungUrl,
  ...DEFAULT_ICON_OPTIONS,
});

export const CITY_CENTER: LatLngLiteral = { lat: 48.137227, lng: 11.575517 };

export const MAX_ZOOM = 20;

export const MIN_ZOOM = 10;

export const MAP_OPTIONS: MapOptions = { attributionControl: false, center: CITY_CENTER, maxZoom: MAX_ZOOM };

export const LAYER_OPTIONS: WMSOptions = { format: "image/png", minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM };

export const COLOR_POLYGON_UMGRIFF = "#E91E63";

export const OVERLAYS_GRUNDKARTE = new Map([["Flurstücke", "Flurstücke,Flst.Nr."]]);

export const LAYER_STRUCTURE: LayerGroup[] = [
  { gruppe: "Verwaltung", layerDetails: [] },
  { gruppe: "Planung und Bauen", layerDetails: [] },
  { gruppe: "Schul- und Kitaplanung", layerDetails: [] },
];

export class OverlayUrlMapping {
  displayName: string = "";
  internalName: string = "";
  urlPart: string = "";
  migrated: boolean = false;
}

export const OVERLAYS_ARCGIS_INTRANSPARENT: OverlayUrlMapping[] = [
  {
    displayName: "Flächennutzungsplan",
    internalName: "Flächennutzungsplan",
    urlPart: "basis",
    migrated: false,
  },
];

export const OVERLAYS_ARCGIS_TRANSPARENT: OverlayUrlMapping[] = [
  {
    displayName: "Gemarkungen",
    internalName: "Gemarkungen",
    urlPart: "basis",
    migrated: false,
  },
  {
    displayName: "Stadtviertel",
    internalName: "Stadtviertel",
    urlPart: "basis",
    migrated: false,
  },
  {
    displayName: "Bezirksteile",
    internalName: "Bezirksteile",
    urlPart: "basis",
    migrated: false,
  },
  {
    displayName: "Stadtbezirke",
    internalName: "Stadtbezirke",
    urlPart: "basis",
    migrated: false,
  },
  {
    displayName: "Kitaplanungsbereiche",
    internalName: "Kitaplanungsbereiche",
    urlPart: "Bildung_und_Soziales",
    migrated: false,
  },
  {
    displayName: "Grundschulsprengel",
    internalName: "Grundschulsprengel",
    urlPart: "Bildung_und_Soziales",
    migrated: false,
  },
  {
    displayName: "Mittelschulsprengel",
    internalName: "Mittelschulsprengel",
    urlPart: "Bildung_und_Soziales",
    migrated: false,
  },
  {
    displayName: "Baublöcke",
    internalName: "Baublöcke",
    urlPart: "basis",
    migrated: false,
  },
  {
    displayName: "Umgriffe Bebauungspläne",
    internalName: "BB-Umgriff",
    urlPart: "basis",
    migrated: false,
  },
  {
    displayName: "SFZ Sprengel GS",
    internalName: "SFZ_Schulsprengel_der_GS-Stufe10796",
    urlPart: "Förderschulen",
    migrated: true,
  },
  {
    displayName: "SFZ Sprengel MS",
    internalName: "SFZ_Schulsprengel_der_MS-Stufe16646",
    urlPart: "Förderschulen",
    migrated: true,
  },
  {
    displayName: "FZgE Sprengel GS",
    internalName: "FZgE_Schulsprengel_der_GS-Stufe3565",
    urlPart: "Förderschulen",
    migrated: true,
  },
  {
    displayName: "FZgE Sprengel MS",
    internalName: "FZgE_Schulsprengel_der_MS-Stufe13927",
    urlPart: "Förderschulen",
    migrated: true,
  },
  {
    displayName: "FZesE Sprengel GS und MS",
    internalName: "FZesE_Schulsprengel_(Grund-_und_Mittelschule)20303",
    urlPart: "Förderschulen",
    migrated: true,
  },
];

/**
 * Die Methode erstellt die Standardlayer welche als Overlay über eine Karte gelegt werden können.
 *
 * Damit ein Overlay-Layer nicht die darunterliegenden Layer verdeckt, ist es wichtig,
 * `transparent: true` zu setzen sowie ein Bildformat anzufordern welches Transparenz unterstützt.
 *
 * Overlay-Layer werden als NonTiledLayer hinzugefügt, um "abgeschnittene" Segment zu vermeiden.
 * @see https://github.com/ptv-logistics/Leaflet.NonTiledLayer
 */
export function assembleBaseLayersForLayerControl(): Record<string, TileLayer.WMS> {
  const layers: Record<string, TileLayer.WMS> = {};

  for (const overlay of OVERLAYS_GRUNDKARTE) {
    const layer = L.nonTiledLayer.wms(getArcgisUrl("Grundkarten"), {
      layers: overlay[1],
      transparent: true,
      ...LAYER_OPTIONS,
    });
    layers[overlay[0]] = layer;
    addLayer("Verwaltung", { displayName: overlay[0], layer: layer });
  }

  for (const overlay of OVERLAYS_ARCGIS_INTRANSPARENT) {
    const url = !overlay.migrated
      ? (import.meta.env.VITE_ARCGIS_URL as string)
      : (import.meta.env.VITE_ARCGIS_URL2 as string);
    const layerIntransparent = L.nonTiledLayer.wms(getArcgisUrl(url, overlay.urlPart), {
      layers: overlay.internalName,
      transparent: false,
      ...LAYER_OPTIONS,
    });
    layers[overlay.displayName] = layerIntransparent;
  }

  for (const overlay of OVERLAYS_ARCGIS_TRANSPARENT) {
    const url = !overlay.migrated
      ? (import.meta.env.VITE_ARCGIS_URL as string)
      : (import.meta.env.VITE_ARCGIS_URL2 as string);
    const layerTransparent = L.nonTiledLayer.wms(getArcgisUrl(url, overlay.urlPart), {
      layers: overlay.internalName,
      transparent: true,
      ...LAYER_OPTIONS,
    });
    layers[overlay.displayName] = layerTransparent;
  }

  return layers;
}

function addLayer(gruppeName: string, layerDetails: LayerDetail) {
  const group = LAYER_STRUCTURE.find((g) => g.gruppe === gruppeName);

  if (group) {
    group.layerDetails.push(layerDetails);
  }
}

export function getArcgisUrl(url: string, service: string): string {
  return url.replace("{1}", service);
}

export function getBackgroundMapUrl(): string {
  return import.meta.env.VITE_BACKGROUND_MAP_URL as string;
}
