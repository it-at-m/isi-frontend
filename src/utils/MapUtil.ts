import L, { type WMSOptions, type LatLngLiteral, type MapOptions, TileLayer } from "leaflet";
import iconAbfrageUrl from "@/assets/marker-icon-abfrage.png";
import iconBauvorhabenUrl from "@/assets/marker-icon-bauvorhaben.png";
import iconInfrastruktureinrichtungUrl from "@/assets/marker-icon-infrastruktureinrichtung.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import RequestUtils from "@/utils/RequestUtils";

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

export const OVERLAYS_ARCGIS_INTRANSPARENT = new Map([["Flächennutzungsplan", "Flächennutzungsplan"]]);

export class OverlayUrlMapping {
  static readonly BASIS_URL_PART = "basis";
  static readonly BILDUNG_UND_SOZIALES_URL_PART = "Bildung_und_Soziales";
  static readonly FIS_URL_PART = "FIS2_FS_ISI";

  displayName: String;
  internalName: String;
  urlPart: String;
  authentification: Boolean;
}
export const OVERLAYS_ARCGIS_TRANSPARENT: OverlayUrlMapping[] = [
  {
    displayName: "Gemarkungen",
    internalName: "Gemarkungen",
    urlPart: OverlayUrlMapping.BASIS_URL_PART,
    authentification: false,
  },
  {
    displayName: "Stadtviertel",
    internalName: "Stadtviertel",
    urlPart: OverlayUrlMapping.BASIS_URL_PART,
    authentification: false,
  },
  {
    displayName: "Stadtviertel",
    internalName: "Stadtviertel",
    urlPart: OverlayUrlMapping.BASIS_URL_PART,
    authentification: false,
  },
  {
    displayName: "Bezirksteile",
    internalName: "Bezirksteile",
    urlPart: OverlayUrlMapping.BASIS_URL_PART,
    authentification: false,
  },
  {
    displayName: "Stadtbezirke",
    internalName: "Stadtbezirke",
    urlPart: OverlayUrlMapping.BASIS_URL_PART,
    authentification: false,
  },
  {
    displayName: "Kitaplanungsbereiche",
    internalName: "Kitaplanungsbereiche",
    urlPart: OverlayUrlMapping.BILDUNG_UND_SOZIALES_URL_PART,
    authentification: false,
  },
  {
    displayName: "Grundschulsprengel",
    internalName: "Grundschulsprengel",
    urlPart: OverlayUrlMapping.BILDUNG_UND_SOZIALES_URL_PART,
    authentification: false,
  },
  {
    displayName: "Mittelschulsprengel",
    internalName: "Mittelschulsprengel",
    urlPart: OverlayUrlMapping.BILDUNG_UND_SOZIALES_URL_PART,
    authentification: false,
  },
  {
    displayName: "Baublöcke",
    internalName: "Baublöcke",
    urlPart: OverlayUrlMapping.BASIS_URL_PART,
    authentification: false,
  },
  {
    displayName: "Umgriffe Bebauungspläne",
    internalName: "BB-Umgriff",
    urlPart: OverlayUrlMapping.BASIS_URL_PART,
    authentification: false,
  },
  {
    displayName: "FIS Status Baurecht vorhanden",
    internalName: "FIS Status Baurecht vorhanden",
    urlPart: OverlayUrlMapping.FIS_URL_PART,
    authentification: true,
  },
  {
    displayName: "FIS Status Potenziale",
    internalName: "FIS Status Potenziale",
    urlPart: OverlayUrlMapping.FIS_URL_PART,
    authentification: true,
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

  for (const overlay of OVERLAYS_ARCGIS_INTRANSPARENT) {
    const layer = (L as any).nonTiledLayer.wms(getArcgisUrl("basis"), {
      layers: overlay[1],
      transparent: false,
      ...LAYER_OPTIONS,
    });
    layers[overlay[0]] = layer;
  }

  for (const overlay of OVERLAYS_GRUNDKARTE) {
    const layer = L.nonTiledLayer.wms(getArcgisUrl("Grundkarten"), {
      layers: overlay[1],
      transparent: true,
      ...LAYER_OPTIONS,
    });
    layers[overlay[0]] = layer;
  }

  for (const overlay of OVERLAYS_ARCGIS_TRANSPARENT) {
    const layer = L.nonTiledLayer.wms(getArcgisUrl(overlay.urlPart), {
      layers: overlay.internalName,
      transparent: true,
      ...LAYER_OPTIONS,
    });

    if (overlay.authentification) {
      //layer.setUrl(RequestUtils.getBasicFetchConfigurationForBackend().basePath + "/layer/" + btoa(layer.getUrl())); // hier weitermachen
    }
    layers[overlay.displayName] = layer;
  }
  return layers;
}

export function getArcgisUrl(service: string): string {
  return (import.meta.env.VITE_ARCGIS_URL as string).replace("{1}", service);
}

export function getGeodataEaiUrl(layerUrl: string): string {
  return (import.meta.env.VITE_GEODATA_EAI_URL as string).replace("{1}", layerUrl);
}

export function getBackgroundMapUrl(): string {
  return import.meta.env.VITE_BACKGROUND_MAP_URL as string;
}
