<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span
          class="text-h6 font-weight-bold"
          v-text="headline"
        />
      </v-col>
    </v-row>
    <common-bezeichnung-bauliche-nutzung-component
      v-model="baugebiet"
      :abfragevariante="abfragevariante"
      :is-editable="isEditable"
    />
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungvon"
            v-model="baugebiet.realisierungVon"
            :disabled="!isEditable"
            label="Realisierung von (JJJJ)"
            class="mx-3"
            :min="abfragevarianteRealisierungVonOr1900"
            :max="2100"
            integer
            no-grouping
            required
            maxlength="4"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungBis"
            v-model="calcRealisierungBis"
            :disabled="true"
            label="Realisierung bis (JJJJ)"
            class="mx-3"
            year
            maxlength="4"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="baugebiet_geplante_anzahl_we"
            v-model="baugebiet.weGeplant"
            :disabled="!isEditable"
            :rules="[validateWohneinheiten(abfragevariante)]"
            class="mx-3"
            label="Geplante Anzahl Wohneinheiten"
            :suffix="suffixWohneinheiten"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="baugebiet_geplante_geschossflaeche_wohnen"
            v-model="baugebiet.gfWohnenGeplant"
            :disabled="!isEditable"
            :rules="[validateGeschossflaecheWohnen(abfragevariante)]"
            class="mx-3"
            label="Geplante Geschossfläche Wohnen"
            :suffix="suffixGeschossflaecheWohnen"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <bauraten-aggregiert-component :aggregate-bauraten="baugebiet" />
  </v-container>
</template>

<script setup lang="ts">
import { AbfragevarianteBauleitplanverfahrenDto } from "@/api/api-client/isi-backend";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import {
  countDecimals,
  geschossflaecheWohnenAbfragevariante,
  geschossflaecheWohnenAbfragevarianteFormatted,
  verteilteGeschossflaecheWohnenAbfragevariante,
  verteilteGeschossflaecheWohnenAbfragevarianteFormatted,
  verteilteWohneinheitenAbfragevariante,
  verteilteWohneinheitenAbfragevarianteFormatted,
  wohneinheitenAbfragevariante,
  wohneinheitenAbfragevarianteFormatted,
} from "@/utils/CalculationUtil";
import { SQUARE_METER } from "@/utils/FieldPrefixesSuffixes";
import { defineModel } from "@/utils/Vue";
import _ from "lodash";
import CommonBezeichnungBaulicheNutzungComponent from "../CommonBezeichnungBaulicheNutzungComponent.vue";

interface Props {
  value: BaugebietModel;
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined;
  isEditable: boolean;
}

interface Emits {
  (event: "input", value: BaugebietModel): void;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const baugebiet = defineModel(props, emit);

function validateWohneinheiten(abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined): boolean | string {
  return (
    verteilteWohneinheitenAbfragevariante(abfragevariante) <= wohneinheitenAbfragevariante(abfragevariante) ||
    `Insgesamt sind ${verteilteWohneinheitenAbfragevarianteFormatted(
      abfragevariante,
    )} von ${wohneinheitenAbfragevarianteFormatted(abfragevariante)} verteilt.`
  );
}

function validateGeschossflaecheWohnen(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): boolean | string {
  return (
    _.round(
      verteilteGeschossflaecheWohnenAbfragevariante(abfragevariante),
      countDecimals(geschossflaecheWohnenAbfragevariante(abfragevariante)),
    ) <= geschossflaecheWohnenAbfragevariante(abfragevariante) ||
    `Insgesamt sind ${verteilteGeschossflaecheWohnenAbfragevarianteFormatted(
      abfragevariante,
    )} m² von ${geschossflaecheWohnenAbfragevarianteFormatted(abfragevariante)} m² verteilt.`
  );
}

const calcRealisierungBis = computed(() => _.max(baugebiet.value.bauraten.map((baurate) => baurate.jahr)));

const headline = computed(() => `Baugebiet ${baugebiet.value.bezeichnung}`);

const abfragevarianteRealisierungVonOr1900 = computed(() => {
  return !_.isNil(props.abfragevariante) && !_.isNil(props.abfragevariante.realisierungVon)
    ? props.abfragevariante.realisierungVon
    : 1900;
});

function suffixWohneinheiten(): string {
  return `von ${wohneinheitenAbfragevarianteFormatted(props.abfragevariante)}`;
}

function suffixGeschossflaecheWohnen(): string {
  return `von ${geschossflaecheWohnenAbfragevarianteFormatted(props.abfragevariante)} ${SQUARE_METER}`;
}
</script>
