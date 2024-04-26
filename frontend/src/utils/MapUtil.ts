import L, { LatLngLiteral, MapOptions, TileLayer, WMSOptions } from "leaflet";
import iconAbfrageUrl from "@/assets/marker-icon-abfrage.png";
import iconBauvorhabenUrl from "@/assets/marker-icon-bauvorhaben.png";
import iconInfrastruktureinrichtungUrl from "@/assets/marker-icon-infrastruktureinrichtung.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

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

export const MAP_OPTIONS: MapOptions = { attributionControl: false };

export const COLOR_POLYGON_UMGRIFF = "#E91E63";

export const MAX_ZOOM = 20;

export const MIN_ZOOM = 10;

export const LAYER_OPTIONS: WMSOptions = { format: "image/png", minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM };

export const OVERLAYS_GRUNDKARTE = new Map([["Flurstücke", "Flurstücke,Flst.Nr."]]);

export const OVERLAYS_ARCGIS_INTRANSPARENT = new Map([["Flächennutzungsplan", "Flächennutzungsplan"]]);

export const OVERLAYS_ARCGIS_TRANSPARENT = new Map([
  ["Gemarkungen", "Gemarkungen"],
  ["Baublöcke", "Baublöcke"],
  ["Kitaplanungsbereiche", "Kitaplanungsbereiche"],
  ["Stadtbezirke", "Stadtbezirke"],
  ["Bezirksteile", "Bezirksteile"],
  ["Stadtviertel", "Stadtviertel"],
  ["Grundschulsprengel", "Grundschulsprengel"],
  ["Mittelschulsprengel", "Mittelschulsprengel"],
  ["Umgriffe Bebauungspläne", "BB-Umgriff"],
]);

/**
 * Die Methode erstellt die Standardlayer welche als Overlay über eine Karte gelegt werden können.
 *
 * Damit ein Overlay-Layer nicht die darunterliegenden Layer verdeckt, ist es wichtig,
 * `transparent: true` zu setzen sowie ein Bildformat anzufordern welches Transparenz unterstützt.
 *
 * Overlay-Layer werden als NonTiledLayer hinzugefügt, um "abgeschnittene" Segment zu vermeiden.
 * @see https://github.com/ptv-logistics/Leaflet.NonTiledLayer
 */
export function assembleDefaultLayersForLayerControl(): Map<string, TileLayer.WMS> {
  const layers = new Map<string, TileLayer.WMS>();

  for (const overlay of OVERLAYS_ARCGIS_INTRANSPARENT) {
    const layer = (L as any).nonTiledLayer.wms(getArcgisUrl("basis"), {
      layers: overlay[1],
      transparent: false,
      ...LAYER_OPTIONS,
    });
    layers.set(overlay[0], layer);
  }

  for (const overlay of OVERLAYS_GRUNDKARTE) {
    const layer = (L as any).nonTiledLayer.wms(getArcgisUrl("Grundkarten"), {
      layers: overlay[1],
      transparent: true,
      ...LAYER_OPTIONS,
    });
    layers.set(overlay[0], layer);
  }

  for (const overlay of OVERLAYS_ARCGIS_TRANSPARENT) {
    const layer = (L as any).nonTiledLayer.wms(getArcgisUrl("basis"), {
      layers: overlay[1],
      transparent: true,
      ...LAYER_OPTIONS,
    });
    layers.set(overlay[0], layer);
  }

  return layers;
}

export function getArcgisUrl(service: string): string {
  return (import.meta.env.VITE_ARCGIS_URL as string).replace("{1}", service);
}

export function getBackgroundMapUrl(): string {
  return import.meta.env.VITE_BACKGROUND_MAP_URL as string;
}
