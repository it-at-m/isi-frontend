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
    <common-baugenehmigungsverfahren-component
      id="common_baugenehmigungsverfahren_component"
      ref="commonBaugenehmigungsverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-geschossflaeche-wohnen-baugenehmigungsverfahren-component
      id="geplante_geschossflaeche_wohnen_baugenehmigungsverfahren_component"
      ref="geplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-anzahl-wohneinheiten-baugenehmigungsverfahren-component
      id="geplante_anzahl_wohneinheiten_baugenehmigungsverfahren_component"
      ref="geplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <bauraten-aggregiert-component :aggregate-bauraten="abfragevariante" />
    <sachbearbeitung-component
      id="sachbearbeitung_component"
      ref="sachbearbeitungComponent"
      v-model="abfragevariante"
    />
    <bedarfsmeldung-component
      id="bedarfsmeldung_fachreferate_component"
      ref="bedarfsmeldungFachreferateComponent"
      v-model="abfragevariante.bedarfsmeldungFachreferate"
      :is-editable="isEditableByBedarfsmeldung()"
      :bedarfsmeldung-title="bedarfsmeldungFachreferate"
    />
    <bedarfsmeldung-component
      id="bedarfsmeldung_abfrageerstellung_component"
      ref="bedarfsmeldungAbfrageerstellungComponent"
      v-model="abfragevariante.bedarfsmeldungAbfrageersteller"
      :is-editable="isBedarfsmeldungEditableByAbfrageerstellung()"
      :bedarfsmeldung-title="bedarfsmeldungAbfrageerstellung"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import CommonBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/CommonBaugenehmigungsverfahrenComponent.vue";
import GeplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/GeplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent.vue";
import GeplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/GeplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent.vue";
import SachbearbeitungComponent from "@/components/abfragevarianten/SachbearbeitungComponent.vue";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import BedarfsmeldungComponent, {
  BedarfsmeldungTitle,
} from "@/components/abfragevarianten/BedarfsmeldungComponent.vue";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";

@Component({
  components: {
    FieldGroupCard,
    CommonBaugenehmigungsverfahrenComponent,
    GeplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent,
    GeplanteAnzahlWohneinheitenBaugenehmigungsverfahrenComponent,
    SachbearbeitungComponent,
    BedarfsmeldungComponent,
    BauratenAggregiertComponent,
  },
})
export default class AbfragevarianteBaugenehmigungsverfahrenComponent extends Mixins(AbfrageSecurityMixin) {
  @VModel({ type: AbfragevarianteBaugenehmigungsverfahrenModel })
  abfragevariante!: AbfragevarianteBaugenehmigungsverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop()
  private anzeigeContextAbfragevariante!: AnzeigeContextAbfragevariante;

  get headline(): string {
    const headline = `Abfragevariante ${new AbfragevarianteBaugenehmigungsverfahrenModel(
      this.abfragevariante,
    ).getAbfragevariantenNrForContextAnzeigeAbfragevariante(this.anzeigeContextAbfragevariante)} - `;
    return headline.concat(`${this.abfragevariante.name}`);
  }

  get bedarfsmeldungFachreferate(): BedarfsmeldungTitle {
    return BedarfsmeldungTitle.FACHREFERATE;
  }
  get bedarfsmeldungAbfrageerstellung(): BedarfsmeldungTitle {
    return BedarfsmeldungTitle.ABFRAGEERSTELLUNG;
  }
}
</script>

<style></style>
