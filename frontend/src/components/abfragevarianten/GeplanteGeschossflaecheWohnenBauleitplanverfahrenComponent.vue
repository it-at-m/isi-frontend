<template>
  <field-group-card :card-title="geplanteGeschossflaecheWohnenTitle">
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="gf_wohnen_gesamt_field"
          ref="gfWohnenGesamtField"
          v-model="abfragevariante.gfWohnenGesamt"
          :disabled="!isEditable"
          class="mx-3"
          label="Gesamt"
          :suffix="fieldPrefixesSuffixes.squareMeter"
        />
      </v-col>
      <!-- Space für Platzhalter -->
      <v-col
        cols="12"
        md="8"
      />
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="2"
      />
      <v-col
        cols="12"
        md="2"
      >
        <span>davon</span>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="gf_wohnen_sobon_ursaechlich_field"
          ref="gfWohnenSobonUrsaechlichField"
          v-model="abfragevariante.gfWohnenSobonUrsaechlich"
          :disabled="!isEditable"
          class="mx-3"
          label="SoBoN-ursächlich"
          :suffix="fieldPrefixesSuffixes.squareMeter"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="gf_wohnen_bestandswohnbaurecht_field"
          ref="gfWohnenBestandswohnbaurechtField"
          v-model="abfragevariante.gfWohnenBestandswohnbaurecht"
          :disabled="!isEditable"
          class="mx-3"
          label="Bestandswohnbaurecht"
          :suffix="fieldPrefixesSuffixes.squareMeter"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-checkbox
          id="gf_sonderwohnformen_checkbox"
          ref="gfSonderwohnformenCheckbox"
          v-model="abfragevariante.gfWohnenSonderwohnformen"
          :disabled="!isEditable"
          class="mx-3"
          label="Sonderwohnformen"
          color="primary"
        />
      </v-col>
      <!-- Space für Platzhalter -->
      <v-col
        cols="12"
        md="8"
      />
    </v-row>
    <v-expand-transition>
      <div>
        <v-row
          v-if="abfragevariante.gfWohnenSonderwohnformen"
          justify="center"
        >
          <v-col
            cols="12"
            md="2"
          />
          <v-col
            cols="12"
            md="2"
          >
            <span>davon</span>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="gf_studentisches_wohnen_field"
              ref="gfStudentischesWohnenField"
              v-model="abfragevariante.gfWohnenStudentischesWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Studentisches Wohnen"
              :suffix="fieldPrefixesSuffixes.squareMeter"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="gf_seniorInnen_wohnen_field"
              ref="gfSeniorInnenWohnenField"
              v-model="abfragevariante.gfWohnenSeniorinnenWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Senior*innenwohnen"
              :suffix="fieldPrefixesSuffixes.squareMeter"
            />
          </v-col>
        </v-row>
        <v-row
          v-if="abfragevariante.gfWohnenSonderwohnformen"
          justify="center"
        >
          <v-col
            cols="12"
            md="4"
          >
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="gf_wohnen_field"
              ref="gfWohnenField"
              v-model="abfragevariante.gfWohnenGenossenschaftlichesWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Genossenschaftliches Wohnen"
              :suffix="fieldPrefixesSuffixes.squareMeter"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="gf_nicht_infrastruktur_relevantes_wohnen_field"
              ref="gfNichtInfrastrukturRelevantesWohnenField"
              v-model="abfragevariante.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Weiteres nicht-infrastrukturrelevantes Wohnen"
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

  private geplanteGeschossflaecheWohnenTitle = "Geplante Geschossfläche Wohnen";

  @Watch("abfragevariante", { immediate: true, deep: true })
  public clearSonderwohnformData(): void {
    if (!this.abfragevariante.gfWohnenSonderwohnformen) {
      this.abfragevariante.gfWohnenStudentischesWohnen = undefined;
      this.abfragevariante.gfWohnenSeniorinnenWohnen = undefined;
      this.abfragevariante.gfWohnenGenossenschaftlichesWohnen = undefined;
      this.abfragevariante.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen = undefined;
    }
  }
}
</script>
