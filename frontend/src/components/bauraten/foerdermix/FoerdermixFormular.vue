<template>
  <v-container>
    <field-group-card :card-title="anteileFMCardTitle">
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <!-- Slot für das FoerdermixStaemmeDropDown -->
          <slot />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            id="foerdermix_gesamtsumme"
            v-model="gesamtsumme"
            label="Summe"
            filled
            readonly="readonly"
            :rules="[fieldValidationRules.nichtGleich100Prozent(foerdermix)]"
            :suffix="fieldPrefixesSuffixes.percent"
          />
        </v-col>
      </v-row>
      <v-row>
        <template v-for="(foerderart, foerderartIndex) in foerdermix.foerderarten">
          <v-col
            :key="foerderartIndex"
            cols="12"
            md="4"
          >
            <num-field
              :id="'foerdermix_foerderart_' + foerderartIndex"
              :key="foerderartIndex"
              v-model="foerderart.anteilProzent"
              :label="foerderart.bezeichnung"
              :suffix="fieldPrefixesSuffixes.percent"
            />
          </v-col>
        </template>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { addiereAnteile } from "@/utils/CalculationUtil";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FormattingMixin from "@/mixins/FormattingMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import NumField from "@/components/common/NumField.vue";

@Component({ components: { NumField, FieldGroupCard } })
export default class FoerdermixFormular extends Mixins(
  FieldValidationRulesMixin,
  FieldPrefixesSuffixes,
  FormattingMixin,
  SaveLeaveMixin
) {
  @VModel({ type: FoerdermixModel }) foerdermix!: FoerdermixModel;

  private anteileFMCardTitle = "Anteile Fördermix";

  private readonly = true;

  private sumOver100 = false;

  get gesamtsumme(): string {
    const sum: number = addiereAnteile(this.foerdermix);
    this.sumOver100 = sum > 100;
    return this.formatGesammtsumme(sum);
  }
}
</script>

<style></style>
