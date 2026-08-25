import L, { type WMSOptions, type LatLngLiteral, type MapOptions, TileLayer } from "leaflet";
import iconAbfrageUrl from "@/assets/marker-icon-abfrage.png";
import iconBauvorhabenUrl from "@/assets/marker-icon-bauvorhaben.png";
import iconInfrastruktureinrichtungUrl from "@/assets/marker-icon-infrastruktureinrichtung.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
// import "@/types/common/Leaflet";

enum GRUPPE {
  UNDEFINED,
  VERWALTUNG,
  PLANUNG_UND_BAUEN,
  SCHUL_UND_KITAPLANUNG,
}

class LayerGruppe {
  public gruppe: GRUPPE;
  public displayName: string;
  public layerDetails: LayerDetail[];

  constructor(gruppe: GRUPPE, displayName: string, layerDetails: LayerDetail[] = []) {
    this.gruppe = gruppe;
    this.displayName = displayName;
    this.layerDetails = layerDetails;
  }
}

class LayerDetail {
  public displayName: string;
  public layer: TileLayer.WMS;

  constructor(displayName: string, layer: TileLayer.WMS) {
    this.displayName = displayName;
    this.layer = layer;
  }
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

export const OVERLAYS_GRUNDKARTE = new Map([["Flurstücke", "Flurstücke,Flst.Nr."]]); // old

export const LAYER_STRUCTURE: LayerGruppe[] = [
  new LayerGruppe(GRUPPE.VERWALTUNG, "Verwaltung"),
  new LayerGruppe(GRUPPE.PLANUNG_UND_BAUEN, "Planung und Bauen"),
  new LayerGruppe(GRUPPE.SCHUL_UND_KITAPLANUNG, "Schul- und Kitaplanung"),
];

export interface OverlayUrlMapping {
  displayName: string;
  internalName: string;
  transparent: boolean;
  urlPar: string;
  migrated: boolean;
  gruppe: GRUPPE;
}

export const OVERLAYS_ARCGIS: OverlayUrlMapping[] = [
  {
    displayName: "Flurstücke",
    internalName: "Flurstücke,Flst.Nr.",
    transparent: true,
    urlPart: "Grundkarten",
    migrated: false,
    gruppe: GRUPPE.VERWALTUNG,
  },
  {
    displayName: "Gemarkungen",
    internalName: "Gemarkungen",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: GRUPPE.VERWALTUNG,
  },
  {
    displayName: "Stadtviertel",
    internalName: "Stadtviertel",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: GRUPPE.VERWALTUNG,
  },
  {
    displayName: "Bezirksteile",
    internalName: "Bezirksteile",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: GRUPPE.VERWALTUNG,
  },
  {
    displayName: "Stadtbezirke",
    internalName: "Stadtbezirke",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.VERWALTUNG,
  },
  {
    displayName: "Flächennutzungsplan",
    internalName: "Flächennutzungsplan",
    transparent: false,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.PLANUNG_UND_BAUEN,
  },
  {
    displayName: "Baublöcke",
    internalName: "Baublöcke",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.PLANUNG_UND_BAUEN,
  },
  {
    displayName: "Umgriffe Bebauungspläne",
    internalName: "BB-Umgriff",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: GRUPPE.PLANUNG_UND_BAUEN,
  },
  {
    displayName: "Kitaplanungsbereiche",
    internalName: "Kitaplanungsbereiche",
    transparent: true,
    urlPart: "Bildung_und_Soziales",
    migrated: false,
    gruppe: GRUPPE.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "Grundschulsprengel",
    internalName: "Grundschulsprengel",
    transparent: true,
    urlPart: "Bildung_und_Soziales",
    migrated: false,
    gruppe: GRUPPE.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "Mittelschulsprengel",
    internalName: "Mittelschulsprengel",
    transparent: true,
    urlPart: "Bildung_und_Soziales",
    migrated: false,
    gruppe: GRUPPE.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "SFZ Sprengel GS",
    internalName: "SFZ_Schulsprengel_der_GS-Stufe10796",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: GRUPPE.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "SFZ Sprengel MS",
    internalName: "SFZ_Schulsprengel_der_MS-Stufe16646",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: GRUPPE.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "FZgE Sprengel GS",
    internalName: "FZgE_Schulsprengel_der_GS-Stufe3565",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: GRUPPE.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "FZgE Sprengel MS",
    internalName: "FZgE_Schulsprengel_der_MS-Stufe13927",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: GRUPPE.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "FZesE Sprengel GS und MS",
    internalName: "FZesE_Schulsprengel_(Grund-_und_Mittelschule)20303",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: GRUPPE.SCHUL_UND_KITAPLANUNG,
  },
];
/* old - Anfang
export const OVERLAYS_ARCGIS_INTRANSPARENT: OverlayUrlMapping[] = [
  {
    displayName: "Flächennutzungsplan",
    internalName: "Flächennutzungsplan",
    transparent: false,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.PLANUNG_UND_BAUEN,
  },
];

export const OVERLAYS_ARCGIS_TRANSPARENT: OverlayUrlMapping[] = [
  {
    displayName: "Gemarkungen",
    internalName: "Gemarkungen",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.VERWALTUNG,
  },
  {
    displayName: "Stadtviertel",
    internalName: "Stadtviertel",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.VERWALTUNG,
  },
  {
    displayName: "Bezirksteile",
    internalName: "Bezirksteile",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.VERWALTUNG,
  },
  {
    displayName: "Stadtbezirke",
    internalName: "Stadtbezirke",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.VERWALTUNG,
  },
  {
    displayName: "Kitaplanungsbereiche",
    internalName: "Kitaplanungsbereiche",
    transparent: true,
    urlPart: "Bildung_und_Soziales",
    migrated: false,
    gruppe: Gruppe.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "Grundschulsprengel",
    internalName: "Grundschulsprengel",
    transparent: true,
    urlPart: "Bildung_und_Soziales",
    migrated: false,
    gruppe: Gruppe.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "Mittelschulsprengel",
    internalName: "Mittelschulsprengel",
    transparent: true,
    urlPart: "Bildung_und_Soziales",
    migrated: false,
    gruppe: Gruppe.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "Baublöcke",
    internalName: "Baublöcke",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.PLANUNG_UND_BAUEN,
  },
  {
    displayName: "Umgriffe Bebauungspläne",
    internalName: "BB-Umgriff",
    transparent: true,
    urlPart: "basis",
    migrated: false,
    gruppe: Gruppe.PLANUNG_UND_BAUEN,
  },
  {
    displayName: "SFZ Sprengel GS",
    internalName: "SFZ_Schulsprengel_der_GS-Stufe10796",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: Gruppe.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "SFZ Sprengel MS",
    internalName: "SFZ_Schulsprengel_der_MS-Stufe16646",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: Gruppe.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "FZgE Sprengel GS",
    internalName: "FZgE_Schulsprengel_der_GS-Stufe3565",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: Gruppe.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "FZgE Sprengel MS",
    internalName: "FZgE_Schulsprengel_der_MS-Stufe13927",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: Gruppe.SCHUL_UND_KITAPLANUNG,
  },
  {
    displayName: "FZesE Sprengel GS und MS",
    internalName: "FZesE_Schulsprengel_(Grund-_und_Mittelschule)20303",
    transparent: true,
    urlPart: "Förderschulen",
    migrated: true,
    gruppe: Gruppe.SCHUL_UND_KITAPLANUNG,
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
/*
export function assembleBaseLayersForLayerControl_old(): Record<string, TileLayer.WMS> {
  const layers: Record<string, TileLayer.WMS> = {};

  for (const overlay of OVERLAYS_GRUNDKARTE) {
    const layer = L.nonTiledLayer.wms(getArcgisUrl("Grundkarten"), {
      layers: overlay[1],
      transparent: true,
      ...LAYER_OPTIONS,
    });
    layers[overlay[0]] = layer;
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

  for (const overlay of OVERLAYS_GRUNDKARTE) {
    const url = import.meta.env.VITE_ARCGIS_URL as string;
    const layer = L.nonTiledLayer.wms(getArcgisUrl(url, "Grundkarten"), {
      layers: overlay[1],
      transparent: true,
      ...LAYER_OPTIONS,
    });
    layers[overlay[0]] = layer;
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
// old - Ende
*/

/**
 * Die Methode erstellt die Standardlayer welche als Overlay über eine Karte gelegt werden können.
 *
 * Damit ein Overlay-Layer nicht die darunterliegenden Layer verdeckt, ist es wichtig,
 * `transparent: true` zu setzen sowie ein Bildformat anzufordern welches Transparenz unterstützt.
 *
 * Overlay-Layer werden als NonTiledLayer hinzugefügt, um "abgeschnittene" Segment zu vermeiden.
 * @see https://github.com/ptv-logistics/Leaflet.NonTiledLayer
 */
export function assembleBaseLayersForLayerControl(): Record<string, Record<string, TileLayer.WMS>> {
  const groups: Record<string, Record<string, TileLayer.WMS>> = {};

  convertLayerStructure2Record(groups);
  return groups;
}

function convertLayerStructure2Record(record: Record<string, Record<string, TileLayer.WMS>>): void {
  buildLayerStructure();
  for (const layerGruppe of LAYER_STRUCTURE) {
    const groupKey = layerGruppe.gruppe.toString();
    if (!record[groupKey]) {
      record[groupKey] = {};
    }
    for (const layerDetail of layerGruppe.layerDetails) {
      record[groupKey][layerDetail.displayName] = layerDetail.layer;
    }
  }
}

function buildLayerStructure(): void {
  for (const overlay of OVERLAYS_ARCGIS) {
    const url = !overlay.migrated
      ? (import.meta.env.VITE_ARCGIS_URL as string)
      : (import.meta.env.VITE_ARCGIS_URL2 as string);
    const layer = L.nonTiledLayer.wms(getArcgisUrl(url, overlay.urlPart), {
      layers: overlay.internalName,
      transparent: overlay.transparent,
      ...LAYER_OPTIONS,
    });
    addLayer(overlay.gruppe, new LayerDetail(overlay.displayName, layer));
  }
}

function addLayer(gruppe: GRUPPE, layerDetails: LayerDetail) {
  const currentGruppe = LAYER_STRUCTURE.find((g) => g.gruppe === gruppe);

  if (currentGruppe) {
    currentGruppe.layerDetails.push(layerDetails);
  }
}

export function getArcgisUrl(url: string, service: string): string {
  return url.replace("{1}", service);
}

export function getBackgroundMapUrl(): string {
  return import.meta.env.VITE_BACKGROUND_MAP_URL as string;
}
