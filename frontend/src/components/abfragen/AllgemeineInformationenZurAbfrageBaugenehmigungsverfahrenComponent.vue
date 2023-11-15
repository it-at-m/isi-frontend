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
          rows="3"
          maxlength="255"
          @input="formChanged"
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import TriSwitch from "@/components/common/TriSwitch.vue";

@Component({
  components: { TriSwitch },
})
export default class AllgemeineInformationenBauleitplanverfahrenComponent extends Mixins(
  SaveLeaveMixin,
  FieldValidationRulesMixin,
) {
  @VModel({ type: BaugenehmigungsverfahrenModel }) abfrage!: BaugenehmigungsverfahrenModel;

  @Prop({ type: Boolean, default: true })
  private isEditableProp!: boolean;

  get isEditable(): boolean {
    return this.isEditableProp;
  }

  private allgemeineInfoZurAbfrageCardTitle = "Allgemeine Informationen zur Abfrage";
}
</script>
