<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <span
          class="text-h6 font-weight-bold"
          v-text="headline"
        />
      </v-col>
    </v-row>
    <common-bauleitplanverfahren-component
      id="common_bauleitplanverfahren_component"
      ref="commonBauleitplanverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-geschossflaeche-wohnen-bauleitplanverfahren-component
      id="geplante_geschossflaeche_wohnen_bauleitplanverfahren_component"
      ref="geplanteGeschossflaecheWohnenBauleitplanverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-anzahl-wohneinheiten-component
      id="geplante_anzahl_wohneinheiten_component"
      ref="geplanteAnzahlWohneinheitenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <bauraten-aggregiert-component :aggregate-bauraten="abfragevariante" />
    <sachbearbeitung-component
      id="sachbearbeitung_component"
      ref="sachbearbeitungComponent"
      v-model="abfragevariante"
    />
    <bedarfsmeldung-fachreferate-component
      id="bedarfsmeldung_fachreferate_component"
      ref="bedarfsmeldungFachreferateComponent"
      v-model="abfragevariante"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, VModel, Prop } from "vue-property-decorator";
import CommonBauleitplanverfahrenComponent from "@/components/abfragevarianten/CommonBauleitplanverfahrenComponent.vue";
import GeplanteGeschossflaecheWohnenBauleitplanverfahrenComponent from "@/components/abfragevarianten/GeplanteGeschossflaecheWohnenBauleitplanverfahrenComponent.vue";
import GeplanteAnzahlWohneinheitenComponent from "@/components/abfragevarianten/GeplanteAnzahlWohneinheitenComponent.vue";
import SachbearbeitungComponent from "@/components/abfragevarianten/SachbearbeitungComponent.vue";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import BedarfsmeldungFachreferateComponent from "@/components/abfragevarianten/BedarfsmeldungFachreferateComponent.vue";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";

@Component({
  components: {
    FieldGroupCard,
    CommonBauleitplanverfahrenComponent,
    GeplanteGeschossflaecheWohnenBauleitplanverfahrenComponent,
    GeplanteAnzahlWohneinheitenComponent,
    SachbearbeitungComponent,
    BedarfsmeldungFachreferateComponent,
    BauratenAggregiertComponent,
  },
})
export default class AbfragevarianteBauleitplanverfahrenComponent extends Vue {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevariante!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop()
  private anzeigeContextAbfragevariante!: AnzeigeContextAbfragevariante;

  get headline(): string {
    const headline = `Abfragevariante ${new AbfragevarianteBauleitplanverfahrenModel(
      this.abfragevariante,
    ).getAbfragevariantenNrForContextAnzeigeAbfragevariante(this.anzeigeContextAbfragevariante)} - `;
    return headline.concat(`${this.abfragevariante.name}`);
  }
}
</script>

<style></style>
