<template>
  <field-group-card :card-title="geplanteAnzahlWohneinheitenTitle">
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="we_gesamt_field"
          ref="weGesamtField"
          v-model="abfragevariante.weGesamt"
          :disabled="!isEditable"
          class="mx-3"
          label="Gesamt"
          integer
        />
      </v-col>
      <!-- Space für Platzhalter -->
      <v-col
        cols="12"
        md="8"
      >
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-checkbox
          id="we_sonderwohnformen_checkbox"
          ref="weSonderwohnformenCheckbox"
          v-model="abfragevariante.weSonderwohnformen"
          :disabled="!isEditable"
          class="mx-3"
          label="Sonderwohnformen"
          color="primary"
          @change="formChanged"
        />
      </v-col>
      <!-- Space für Platzhalter -->
      <v-col
        cols="12"
        md="8"
      >
      </v-col>
    </v-row>
    <v-expand-transition>
      <div>
        <v-row
          v-if="abfragevariante.weSonderwohnformen"
          justify="center"
        >
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="we_studentenwohnungen_field"
              ref="weStudentenwohnungenField"
              v-model="abfragevariante.weStudentischesWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Studentenwohnungen"
              integer
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="we_seniorInnen_wohnungen_field"
              ref="weSeniorInnenWohnungenField"
              v-model="abfragevariante.weSeniorinnenWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Senior*innenwohnungen"
              integer
            />
          </v-col>
        </v-row>
        <v-row
          v-if="abfragevariante.weSonderwohnformen"
          justify="center"
        >
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="we_genossenschaftswohnungen_field"
              ref="weGenossenschaftswohnungenField"
              v-model="abfragevariante.weGenossenschaftlichesWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Genossenschaftswohnungen"
              :suffix="fieldPrefixesSuffixes.squareMeter"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="we_nicht_infrastruktur_relevante_wohnungen_field"
              ref="weNichtInfrastrukturRelevanteWohnungenField"
              v-model="abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="weitere nicht-infrastrukturrelevante Wohnungen"
              :suffix="fieldPrefixesSuffixes.squareMeter"
            />
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop, Watch } from "vue-property-decorator";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({ components: { FieldGroupCard, NumField } })
export default class GeplanteGeschossflaecheWohnenComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevariante!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private geplanteAnzahlWohneinheitenTitle = "geplante Anzahl Wohneinheiten";

  @Watch("abfragevariante", { immediate: true, deep: true })
  public clearSonderwohnformData(): void {
    if (!this.abfragevariante.weSonderwohnformen) {
      this.abfragevariante.weStudentischesWohnen = undefined;
      this.abfragevariante.weSeniorinnenWohnen = undefined;
      this.abfragevariante.weGenossenschaftlichesWohnen = undefined;
      this.abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen = undefined;
    }
  }
}
</script>
