<template>
  <v-sheet
    ref="sheet"
    :height="height"
    :width="width"
  >
    <l-map
      id="karte"
      ref="map"
      :options="MAP_OPTIONS"
      :center="initialCenter"
      :zoom="zoom"
      style="z-index: 1"
      @click="openPopup($event)"
    >
      <!-- Fügt ein Steuerungselement hinzu, mit welchem sich ein Base-Layer und eine beliebige Anzahl von Overlay-Layern aktivieren lässt. -->
      <l-control-layers />
      <!-- Die Base-Layer der Karte. Es kann nur einer zur selben Zeit sichtbar sein, da der Base-Layer der Hintergrund der Karte ist. -->
      <l-wms-tile-layer
        id="karte_hintergrund"
        name="Hintergrund"
        :base-url="WMS_BASE_URL"
        layers="Hintergrund"
        format="image/png"
        layer-type="base"
        :visible="true"
      />
      <!-- Die Overlay-Layer der Karte. Es können beliebig viele von ihnen zur selben Zeit sichtbar sein, da sie nur spezifische Merkmale darstellen sollen. -->
      <!-- Damit ein Overlay-Layer nicht die darunerliegenden Layer verdeckt, ist es wichtig, :transparent="true" zu setzen sowie ein Bildformat anzufordern, welches Transparenz unterstützt. -->
      <l-wms-tile-layer
        id="karte_gemarkungen"
        name="Gemarkungen"
        :base-url="getGiwUrl('WMS_Stadtgrundkarte')"
        layers="Gemarkungen"
        format="image/png"
        layer-type="overlay"
        :visible="false"
        :transparent="true"
      />
      <l-wms-tile-layer
        id="karte_flurstuecke"
        name="Flurstücke"
        :base-url="getGiwUrl('WMS_Stadtgrundkarte')"
        layers="Flurstücke"
        format="image/png"
        layer-type="overlay"
        :visible="false"
        :transparent="true"
      />
    </l-map>
    <v-dialog
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

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { LMap, LPopup, LControlLayers, LWMSTileLayer } from "vue2-leaflet";
import L, { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";

type Ref = Vue & { $el: HTMLElement };

/**
 * Nutzt Leaflet.js um Daten von einem oder mehreren WMS-Servern zu holen und eine Karte von München und der Umgebung zu rendern.
 * Die Leaflet-Karte wurde für Stylebarkeit in eine Vuetify Sheet-Komponente eingebettet.
 */
@Component({
  components: {
    LMap,
    LPopup,
    LControlLayers,
    "l-wms-tile-layer": LWMSTileLayer,
  },
})
export default class CityMap extends Vue {
  private static readonly MUNICH_CENTER: LatLngLiteral = { lat: 48.137227, lng: 11.575517 };
  private readonly WMS_BASE_URL = "https://geoinfoweb.muenchen.de/arcgis/services/WMS_Stadtkarte/MapServer/WMSServer?";
  private readonly MAP_OPTIONS = { attributionControl: false };

  private readonly EXPANSION_TITLE = "Erweitern";
  private readonly COLLAPSE_TITLE = "Einklappen";
  private readonly EXPANSION_ICON = new URL("@/assets/arrow-expand.svg", import.meta.url).href;
  private readonly COLLAPSE_ICON = new URL("@/assets/arrow-collapse.svg", import.meta.url).href;

  @Prop({ default: "100%" })
  private readonly height!: number | string;

  @Prop({ default: "100%" })
  private readonly width!: number | string;

  @Prop({ default: 12 })
  private readonly zoom!: number;

  @Prop({ default: () => CityMap.MUNICH_CENTER })
  private readonly initialCenter!: LatLngLiteral;

  @Prop({ type: Boolean, default: false })
  private readonly expandable!: boolean;

  @Prop()
  private readonly center?: LatLngLiteral;

  private readonly popup = L.popup();
  private map!: L.Map;
  private expanded = false;

  mounted(): void {
    // Erzeugt einen "Shortcut" zum mapObject, da in den unteren Funktionen ansonsten immer `this.map.mapObject` aufgerufen werden müsste.
    this.map = (this.$refs.map as LMap).mapObject;

    if (this.expandable) {
      this.addExpansionControl();
    }
  }

  /**
   * Da GeoInfoWeb mehrere Services anbietet, wird mit dieser Funktion der notwendige Service ausgewählt (ohne die URL kopieren zu müssen).
   */
  private getGiwUrl(service: string): string {
    return (import.meta.env.VITE_GIS_URL as string).replace("{1}", service);
  }

  /**
   * Öffnet an der angeklickten Bildschirmposition ein Popup, welches die Koordinaten der Kartenposition anzeigt.
   */
  private openPopup(event: L.LeafletMouseEvent): void {
    this.popup
      .setLatLng(event.latlng)
      .setContent(event.latlng.lat + ", " + event.latlng.lng)
      .openOn(this.map);
  }

  /**
   * Fügt der der Karte ein Leaflet-Control hinzu, welches sie in einen Dialog verschieben und größer machen kann.
   */
  private addExpansionControl(): void {
    const Control = L.Control.extend({
      onAdd: () => {
        const anchor = L.DomUtil.create("a");
        const image = L.DomUtil.create("img");

        anchor.id = "karte_erweitern_button";
        anchor.title = this.EXPANSION_TITLE;
        anchor.href = "#";
        anchor.classList.add("expansion-control");
        anchor.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

          this.expanded = !this.expanded;

          if (this.expanded) {
            (this.$refs.dialogCard as Ref).$el.appendChild((this.$refs.map as Ref).$el);
            anchor.title = this.COLLAPSE_TITLE;
            image.src = this.COLLAPSE_ICON;
          } else {
            (this.$refs.sheet as Ref).$el.appendChild((this.$refs.map as Ref).$el);
            anchor.title = this.EXPANSION_TITLE;
            image.src = this.EXPANSION_ICON;
          }

          /* Der Map muss signalisiert werden, dass sich die Größe des umgebenden Containers geändert hat.
             Jedoch darf dies erst nach einem minimalen Delay gemacht werden, da der Dialog sich erst öffnen muss. */
          setTimeout(() => this.map.invalidateSize());
        });

        image.id = "karte_erweitern_icon";
        image.src = this.EXPANSION_ICON;
        image.style.filter = "opacity(60%)";
        anchor.appendChild(image);

        return anchor;
      },
      onRemove: () => {
        // Keine Logik benötigt
      },
    });

    new Control({ position: "bottomright" }).addTo(this.map);
  }

  @Watch("center", { deep: true })
  private onCenterChange(): void {
    if (this.center) {
      this.map.flyTo(this.center, 16);
    }
  }
}
</script>

<style>
.expansion-control {
  width: 44px;
  height: 44px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: white;
}
</style>
