<template>
  <field-group-card :card-title="geschossflaecheWohnenTitle">
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
          class="mx-3"
          label="Geplante Geschossfläche Wohnen"
          :suffix="fieldPrefixesSuffixes.squareMeter"
          max-value-decimal-numeral-precision10-scale2
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
          v-model="baugebiet.gfWohnenBaurechtlichFestgesetzt"
          :disabled="!isEditable"
          class="mx-3"
          label="Baurechtlich festgesetzt"
          :suffix="fieldPrefixesSuffixes.squareMeter"
          max-value-decimal-numeral-precision10-scale2
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

@Component({ components: { FieldGroupCard, NumField } })
export default class GeschossflaecheWohnenBaugenehmigungsverfahrenComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private geschossflaecheWohnenTitle = "Geschossfläche Wohnen";
}
</script>
