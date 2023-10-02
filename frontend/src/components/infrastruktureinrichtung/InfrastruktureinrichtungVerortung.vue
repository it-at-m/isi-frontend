<template>
  <field-group-card :card-title="verortungCardTitle">
    <city-map
      height="300"
      :zoom="14"
      expandable
      :editable="isEditable"
      :look-at="lookAt"
      :geo-json="geoJson"
      @click-in-map="handleClickInMap($event)"
      @deselect-geo-json="handleDeselectGeoJson"
      @accept-selected-geo-json="handleAcceptSelectedGeoJson"
    />
  </field-group-card>
</template>

<script lang="ts">
import { Component, Prop, Mixins, VModel, Watch } from "vue-property-decorator";
import CityMap from "@/components/map/CityMap.vue";
import { LatLng, LatLngLiteral } from "leaflet";
import { Feature, Point } from "geojson";
import _ from "lodash";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { AdresseDto } from "@/api/api-client/isi-backend";

@Component({
  components: { CityMap },
})
export default class InfrastruktureinrichtungVerortung extends Mixins(SaveLeaveMixin) {
  private verortungCardTitle = "Verortung";

  @VModel({ type: Object })
  private adresse?: AdresseDto;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  /**
   * Repräsentiert eine einzige Punktkoordinate.
   */
  private geoJson: Array<Feature<Point>> = [];

  private mounted(): void {
    if (this.adresseCoordinate) {
      this.setGeoJsonFromLatLng(this.adresseCoordinate);
    }
  }

  /**
   * Dient als Reaktion auf Änderungen der Adresse aus der Elternkomponente.
   */
  @Watch("adresse", { deep: true })
  private onAdresseChanged(): void {
    if (this.adresse?.strasse && this.adresseCoordinate) {
      this.setGeoJsonFromLatLng(this.adresseCoordinate);
    }
  }

  get adresseCoordinate(): LatLngLiteral | undefined {
    const lat = this.adresse?.coordinate?.latitude;
    const lng = this.adresse?.coordinate?.longitude;

    if (lat && lng) {
      return { lat, lng };
    }

    return undefined;
  }

  get lookAt(): LatLngLiteral | undefined {
    if (!_.isEmpty(this.geoJson)) {
      const coordinates = this.geoJson[0].geometry.coordinates;
      return { lng: coordinates[0], lat: coordinates[1] };
    }

    return undefined;
  }

  private handleClickInMap(latlng: LatLng): void {
    if (!this.adresse?.strasse && this.isEditable) {
      this.setGeoJsonFromLatLng(latlng);
    }
  }

  private handleDeselectGeoJson(): void {
    this.adresse = {};
    this.geoJson = [];
    this.formChanged();
  }

  private async handleAcceptSelectedGeoJson(): Promise<void> {
    if (!this.adresse?.strasse && !_.isEmpty(this.geoJson)) {
      const coordinates = this.geoJson[0].geometry.coordinates;
      this.adresse = { coordinate: { longitude: coordinates[0], latitude: coordinates[1] } };
      this.formChanged();
    }
  }

  private setGeoJsonFromLatLng(latlng: LatLngLiteral): void {
    this.geoJson = [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [latlng.lng, latlng.lat] },
        properties: null,
      },
    ];
  }
}
</script>
