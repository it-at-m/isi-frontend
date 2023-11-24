<template>
  <field-group-card :card-title="geplanteAnzahlWohneinheitenTitle">
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="we_geplant_field"
          ref="weGeplantField"
          v-model="baugebiet.weGeplant"
          :disabled="!isEditable"
          :rules="[validationRules.validateWohneinheiten(abfragevariante)]"
          class="mx-3"
          label="Gesamt"
          integer
          max-value-signed-integer
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="we_baurechtlich_genehmigt_field"
          ref="weBaurechtlichGenehmigtField"
          v-model="baugebiet.weBaurechtlichGenehmigt"
          :disabled="!isEditable"
          class="mx-3"
          label="Baurechtlich genehmigt"
          integer
          max-value-signed-integer
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="we_baurechtlich_festgesetzt_field"
          ref="weBaurechtlichFestgesetztField"
          v-model="baugebiet.weBaurechtlichFestgesetzt"
          :disabled="!isEditable"
          class="mx-3"
          label="Baurechtlich festgesetzt"
          integer
          max-value-signed-integer
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { AbfragevarianteWeiteresVerfahrenDto } from "@/api/api-client/isi-backend";
import {
  verteilteWohneinheitenAbfragevariante,
  verteilteWohneinheitenAbfragevarianteFormatted,
  wohneinheitenAbfragevariante,
  wohneinheitenAbfragevarianteFormatted,
} from "@/utils/CalculationUtil";

@Component({ components: { FieldGroupCard, NumField } })
export default class AnzahlWohneinheitenWeiteresVerfahrenComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop()
  private abfragevariante: AbfragevarianteWeiteresVerfahrenDto | undefined;

  private geplanteAnzahlWohneinheitenTitle = "Geplante Anzahl Wohneinheiten";

  private validationRules: unknown = {
    validateWohneinheiten: (abfragevariante: AbfragevarianteWeiteresVerfahrenDto | undefined): boolean | string => {
      return (
        verteilteWohneinheitenAbfragevariante(abfragevariante) <= wohneinheitenAbfragevariante(abfragevariante) ||
        `Insgesamt sind ${verteilteWohneinheitenAbfragevarianteFormatted(
          abfragevariante,
        )} von ${wohneinheitenAbfragevarianteFormatted(abfragevariante)} verteilt.`
      );
    },
  };
}
</script>
