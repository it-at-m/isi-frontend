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
    <common-weiteres-verfahren-component
      id="common_weiteres_verfahren_component"
      ref="commonWeiteresVerfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-geschossflaeche-wohnen-weiteres-verfahren-component
      id="geplante_geschossflaeche_wohnen_weiteres_verfahren_component"
      ref="geplanteGeschossflaecheWohnenWeiteresVerfahrenComponent"
      v-model="abfragevariante"
      :is-editable="isEditable"
    />
    <geplante-anzahl-wohneinheiten-weiteres-verfahren-component
      id="geplante_anzahl_wohneinheiten_weiteres_verfahren_component"
      ref="geplanteAnzahlWohneinheitenWeiteresVerfahrenrenComponent"
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
import GeplanteGeschossflaecheWohnenWeiteresVerfahrenComponent from "@/components/abfragevarianten/weiteresVerfahren/GeplanteGeschossflaecheWohnenWeiteresVerfahrenComponent.vue";
import GeplanteAnzahlWohneinheitenWeiteresVerfahrenComponent from "@/components/abfragevarianten/weiteresVerfahren/GeplanteAnzahlWohneinheitenWeiteresVerfahrenComponent.vue";
import SachbearbeitungComponent from "@/components/abfragevarianten/SachbearbeitungComponent.vue";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import BedarfsmeldungFachreferateComponent, {
  BedarfsmeldungTitle,
} from "@/components/abfragevarianten/BedarfsmeldungComponent.vue";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";

@Component({
  components: {
    FieldGroupCard,
    CommonBaugenehmigungsverfahrenComponent,
    GeplanteGeschossflaecheWohnenWeiteresVerfahrenComponent,
    GeplanteAnzahlWohneinheitenWeiteresVerfahrenComponent,
    SachbearbeitungComponent,
    BedarfsmeldungFachreferateComponent,
    BauratenAggregiertComponent,
  },
})
export default class AbfragevarianteWeiteresVerfahrenComponent extends Mixins(AbfrageSecurityMixin) {
  @VModel({ type: AbfragevarianteWeiteresVerfahrenModel })
  abfragevariante!: AbfragevarianteWeiteresVerfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop()
  private anzeigeContextAbfragevariante!: AnzeigeContextAbfragevariante;

  get headline(): string {
    const headline = `Abfragevariante ${new AbfragevarianteWeiteresVerfahrenModel(
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
