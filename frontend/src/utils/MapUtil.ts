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

export const OVERLAYS_ARCGIS = new Map([
  ["Gemarkungen", "Gemarkungen"],
  ["Baublöcke", "Baublöcke"],
  ["Kitaplanungsbereiche", "Kitaplanungsbereiche"],
  ["Stadtbezirke", "Stadtbezirke"],
  ["Bezirksteile", "Bezirksteile"],
  ["Stadtviertel", "Stadtviertel"],
  ["Grundschulsprengel", "Grundschulsprengel"],
  ["Umgriffe Bebauungspläne", "BB-Umgriff"],
]);

export function assembleDefaultLayersForLayerControl(layerUriWithPlaceholder: string): Map<string, TileLayer.WMS> {
  const layers = new Map<string, TileLayer.WMS>();

  for (const overlay of OVERLAYS_GRUNDKARTE) {
    const layer = (L as any).nonTiledLayer.wms(layerUriWithPlaceholder.replace("{1}", "Grundkarten"), {
      layers: overlay[1],
      transparent: true,
      ...LAYER_OPTIONS,
    });
    layers.set(overlay[0], layer);
  }

  for (const overlay of OVERLAYS_ARCGIS) {
    const layer = (L as any).nonTiledLayer.wms(layerUriWithPlaceholder.replace("{1}", "basis"), {
      layers: overlay[1],
      transparent: true,
      ...LAYER_OPTIONS,
    });
    layers.set(overlay[0], layer);
  }

  return layers;
}
