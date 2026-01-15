// Alle Leaflet Plugins müssen hier deklariert werden.
declare namespace L {
  export const nonTiledLayer: { wms: (baseUrl: string, options: TileLayer.WMS.options) => TileLayer.WMS };
  export const markerClusterGroup: () => LayerGroup;
}
