import "leaflet";

declare module "leaflet" {
  namespace Control {
    interface GroupedLayers {
      addOverlay(layer: Layer, name: string, group?: string): this;
      addBaseLayer(layer: Layer, name: string): this;
      removeLayer(layer: Layer): this;
    }
  }

  namespace control {
    function groupedLayers(
      baseLayers: { [index: string]: Layer },
      groupedOverlays: { [index: string]: { [index: string]: Layer } },
      options: GroupedLayersOptions,
    ): Control.GroupedLayers;
  }
}
