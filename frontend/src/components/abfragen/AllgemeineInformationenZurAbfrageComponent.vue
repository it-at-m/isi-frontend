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
          v-model="infrastrukturabfrage.abfrage.fristStellungnahme"
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
          v-model="infrastrukturabfrage.offiziellerVerfahrensschritt"
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
          id="abfrage_anmerkung"
          v-model="infrastrukturabfrage.abfrage.anmerkung"
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
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import { LookupEntryDto, UncertainBoolean } from "@/api/api-client/isi-backend";
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
  @VModel({ type: InfrastrukturabfrageModel }) infrastrukturabfrage!: InfrastrukturabfrageModel;

  private allgemeineInfoZurAbfrageCardTitle = "Allgemeine Informationen zur Abfrage";
}
</script>
