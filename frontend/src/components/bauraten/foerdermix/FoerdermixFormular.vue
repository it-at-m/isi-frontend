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
          <num-field
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
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="foerdermix_anteilFreifinanzierterGeschosswohnungsbau"
            v-model="foerdermix.anteilFreifinanzierterGeschosswohnungsbau"
            label="Freifinanzierter Geschosswohnungsbau"
            :suffix="fieldPrefixesSuffixes.percent"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="foerdermix_anteilGefoerderterMietwohnungsbau"
            v-model="foerdermix.anteilGefoerderterMietwohnungsbau"
            label="Geförderter Mietwohnungsbau"
            :suffix="fieldPrefixesSuffixes.percent"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="foerdermix_anteilMuenchenModell"
            v-model="foerdermix.anteilMuenchenModell"
            label="MünchenModell"
            :suffix="fieldPrefixesSuffixes.percent"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="foerdermix_anteilPreisgedaempfterMietwohnungsbau"
            v-model="foerdermix.anteilPreisgedaempfterMietwohnungsbau"
            label="Preisgedämpfter Mietwohnungsbau"
            :suffix="fieldPrefixesSuffixes.percent"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="foerdermix_anteilKonzeptionellerMietwohnungsbau"
            v-model="foerdermix.anteilKonzeptionellerMietwohnungsbau"
            label="Konzeptioneller Mietwohnungsbau"
            :suffix="fieldPrefixesSuffixes.percent"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="foerdermix_anteilBaugemeinschaften"
            v-model="foerdermix.anteilBaugemeinschaften"
            label="Baugemeinschaften"
            :suffix="fieldPrefixesSuffixes.percent"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="foerdermix_anteilEinUndZweifamilienhaeuser"
            v-model="foerdermix.anteilEinUndZweifamilienhaeuser"
            label="Ein- und Zweifamilienhäuser"
            :suffix="fieldPrefixesSuffixes.percent"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        />
        <v-col
          cols="12"
          md="4"
        />
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

@Component({ components: { FieldGroupCard } })
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

  get gesamtsumme(): number {
    const sum: number = addiereAnteile(this.foerdermix);
    this.sumOver100 = sum > 100;
    //console.log("Gesamtsumme: " + sum);
    return sum;
  }
}
</script>

<style></style>
