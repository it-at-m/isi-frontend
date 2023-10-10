<template>
  <field-group-card :card-title="allgemeineInfoZurAbfrageCardTitle">
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <date-picker
          id="bearbeitungsfrist_datepicker"
          ref="bearbeitungsfristDatepicker"
          v-model="abfrage.fristBearbeitung"
          :disabled="!isEditableByAbfrageerstellung()"
          label="Bearbeitungsfrist"
          :rules="[fieldValidationRules.pflichtfeld]"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <tri-switch
          id="offizielle_mitteilung_triswitch"
          ref="offizielleMitteilungTriswitch"
          v-model="abfrage.offiziellerVerfahrensschritt"
          :disabled="!isEditableByAbfrageerstellung()"
          off-text="Nein"
          on-text="Ja"
          :rules="[fieldValidationRules.notUnspecified]"
        >
          <template #label> Offizielle Mitteilung <span class="secondary--text">*</span> </template>
        </tri-switch>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-textarea
          id="anmerkung_field"
          ref="anmerkungField"
          v-model="abfrage.anmerkung"
          :disabled="!isEditableByAbfrageerstellung()"
          label="Anmerkungen"
          auto-grow
          rows="3"
          maxlength="255"
          @input="formChanged"
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import BauleitplanverfahrenModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import TriSwitch from "@/components/common/TriSwitch.vue";

@Component({
  components: { TriSwitch },
})
export default class AllgemeineInformationenComponent extends Mixins(
  SaveLeaveMixin,
  FieldValidationRulesMixin,
  AbfrageSecurityMixin,
) {
  @VModel({ type: BauleitplanverfahrenModel }) abfrage!: BauleitplanverfahrenModel;

  private allgemeineInfoZurAbfrageCardTitle = "Allgemeine Informationen zur Abfrage";
}
</script>
