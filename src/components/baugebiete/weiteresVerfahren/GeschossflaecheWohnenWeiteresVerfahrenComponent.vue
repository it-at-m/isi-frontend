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
          :rules="[validateGeschossflaecheWohnen(abfragevariante)]"
          class="mx-3"
          label="Gesamt"
          :suffix="SQUARE_METER"
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
          :suffix="SQUARE_METER"
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
          :suffix="SQUARE_METER"
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import type { AbfragevarianteWeiteresVerfahrenDto } from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import {
  countDecimals,
  geschossflaecheWohnenAbfragevariante,
  geschossflaecheWohnenAbfragevarianteFormatted,
  verteilteGeschossflaecheWohnenAbfragevariante,
  verteilteGeschossflaecheWohnenAbfragevarianteFormatted,
} from "@/utils/CalculationUtil";
import { SQUARE_METER } from "@/utils/FieldPrefixesSuffixes";
import _ from "lodash";
import type { Rule } from "@/utils/FieldValidationRules";

interface Props {
  abfragevariante?: AbfragevarianteWeiteresVerfahrenDto;
  isEditable?: boolean;
}

const baugebiet = defineModel<BaugebietModel>({ required: true });

const geplanteGeschossflaecheWohnenTitle = "Geplante Geschossfläche Wohnen";

withDefaults(defineProps<Props>(), { isEditable: false });

function validateGeschossflaecheWohnen(abfragevariante: AbfragevarianteWeiteresVerfahrenDto | undefined): Rule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (v: string | undefined | null) => {
    return (
      _.round(
        verteilteGeschossflaecheWohnenAbfragevariante(abfragevariante),
        countDecimals(geschossflaecheWohnenAbfragevariante(abfragevariante)),
      ) <= geschossflaecheWohnenAbfragevariante(abfragevariante) ||
      `Insgesamt sind ${verteilteGeschossflaecheWohnenAbfragevarianteFormatted(
        abfragevariante,
      )} m² von ${geschossflaecheWohnenAbfragevarianteFormatted(abfragevariante)} m² verteilt.`
    );
  };
}
</script>
