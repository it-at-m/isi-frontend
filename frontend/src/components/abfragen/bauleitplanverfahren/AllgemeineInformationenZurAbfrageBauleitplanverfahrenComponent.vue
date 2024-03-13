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
          :disabled="!isEditable"
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
          id="offizielle_mitzeichnung_triswitch"
          ref="offizielleMitzeichnungTriswitch"
          v-model="abfrage.offizielleMitzeichnung"
          :disabled="!isEditable"
          off-text="Nein"
          on-text="Ja"
          :rules="[fieldValidationRules.notUnspecified]"
        >
          <template #label> Offizielle Mitzeichnung <span class="secondary--text">*</span> </template>
        </tri-switch>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-textarea
          id="anmerkung_field"
          ref="anmerkungField"
          v-model="abfrage.anmerkung"
          :disabled="!isEditable"
          label="Anmerkungen"
          auto-grow
          rows="1"
          maxlength="1000"
          @input="formChanged"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <eakte
          id="eakte_component"
          ref="eakteComponent"
          v-model="abfrage.linkEakte"
          :is-editable="isEakteEditable"
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import TriSwitch from "@/components/common/TriSwitch.vue";
import Eakte from "@/components/common/Eakte.vue";

@Component({
  components: { TriSwitch, Eakte },
})
export default class AllgemeineInformationenBauleitplanverfahrenComponent extends Mixins(
  SaveLeaveMixin,
  FieldValidationRulesMixin,
) {
  @VModel({ type: BauleitplanverfahrenModel }) abfrage!: BauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: true })
  private isEditableProp!: boolean;

  @Prop({ type: Boolean, default: false })
  private isEakteEditableProp!: boolean;

  get isEditable(): boolean {
    return this.isEditableProp;
  }

  get isEakteEditable(): boolean {
    return this.isEakteEditableProp;
  }

  private allgemeineInfoZurAbfrageCardTitle = "Allgemeine Informationen zur Abfrage";
}
</script>
