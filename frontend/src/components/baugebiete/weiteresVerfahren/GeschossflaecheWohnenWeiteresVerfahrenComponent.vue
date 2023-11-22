<template>
  <field-group-card :card-title="geplanteGeschossflaecheWohnenTitle">
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="gf_wohnen_geplant_field"
          ref="gfWohnenGeplantField"
          v-model="baugebiet.gfWohnenGeplant"
          :disabled="!isEditable"
          :rules="[validationRules.validateGeschossflaecheWohnen(abfragevariante)]"
          class="mx-3"
          label="Gesamt"
          :suffix="fieldPrefixesSuffixes.squareMeter"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="gf_wohnen_baurechtlich_genehmigt_field"
          ref="gfWohnenBaurechtlichGenehmigtField"
          v-model="baugebiet.gfWohnenBaurechtlichGenehmigt"
          :disabled="!isEditable"
          class="mx-3"
          label="Baurechtlich genehmigt"
          :suffix="fieldPrefixesSuffixes.squareMeter"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="gf_wohnen_baurechtlich_festgesetzt_field"
          ref="gfWohnenBaurechtlichFestgesetztField"
          v-model="baugebiet.gfWohnenBaurechtlichFestgesetzt"
          :disabled="!isEditable"
          class="mx-3"
          label="Baurechtlich festgesetzt"
          :suffix="fieldPrefixesSuffixes.squareMeter"
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
  countDecimals,
  geschossflaecheWohnenAbfragevariante,
  geschossflaecheWohnenAbfragevarianteFormatted,
  verteilteGeschossflaecheWohnenAbfragevariante,
  verteilteGeschossflaecheWohnenAbfragevarianteFormatted,
} from "@/utils/CalculationUtil";
import _ from "lodash";

@Component({ components: { FieldGroupCard, NumField } })
export default class GeschossflaecheWohnenWeiteresVerfahrenComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop()
  private abfragevariante: AbfragevarianteWeiteresVerfahrenDto | undefined;

  private geplanteGeschossflaecheWohnenTitle = "Geplante Geschossfläche Wohnen";

  private validationRules: unknown = {
    validateGeschossflaecheWohnen: (
      abfragevariante: AbfragevarianteWeiteresVerfahrenDto | undefined,
    ): boolean | string => {
      return (
        _.round(
          verteilteGeschossflaecheWohnenAbfragevariante(abfragevariante),
          countDecimals(geschossflaecheWohnenAbfragevariante(abfragevariante)),
        ) <= geschossflaecheWohnenAbfragevariante(abfragevariante) ||
        `Insgesamt sind ${verteilteGeschossflaecheWohnenAbfragevarianteFormatted(
          abfragevariante,
        )} m² von ${geschossflaecheWohnenAbfragevarianteFormatted(abfragevariante)} m² verteilt.`
      );
    },
  };
}
</script>
