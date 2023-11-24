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
          max-value-decimal-numeral-precision10-scale2
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
          id="gf_wohnen_baurechtlich_genehmigt_field"
          ref="gfWohnenBaurechtlichGenehmigtField"
          v-model="abfragevariante.gfWohnenBaurechtlichGenehmigt"
          :disabled="!isEditable"
          class="mx-3"
          label="Baurechtlich genehmigt"
          :suffix="fieldPrefixesSuffixes.squareMeter"
          max-value-decimal-numeral-precision10-scale2
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="gf_wohnen_baurechtlich_festgesetzt_field"
          ref="gfWohnenBaurechtlichFestgesetztField"
          v-model="abfragevariante.gfWohnenBaurechtlichFestgesetzt"
          :disabled="!isEditable"
          class="mx-3"
          label="Baurechtlich festgesetzt"
          :suffix="fieldPrefixesSuffixes.squareMeter"
          max-value-decimal-numeral-precision10-scale2
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <!-- Space für Platzhalter -->
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
          max-value-decimal-numeral-precision10-scale2
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <!-- Space für Platzhalter -->
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
              max-value-decimal-numeral-precision10-scale2
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
              max-value-decimal-numeral-precision10-scale2
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
            <!-- Space für Platzhalter -->
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
              max-value-decimal-numeral-precision10-scale2
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
              max-value-decimal-numeral-precision10-scale2
            />
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop, Watch } from "vue-property-decorator";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({ components: { FieldGroupCard, NumField } })
export default class GeplanteGeschossflaecheWohnenBaugenehmigungsverfahrenComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: AbfragevarianteBaugenehmigungsverfahrenModel })
  abfragevariante!: AbfragevarianteBaugenehmigungsverfahrenModel;

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
