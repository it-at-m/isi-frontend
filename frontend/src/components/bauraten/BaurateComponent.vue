<template>
  <v-container>
    <field-group-card>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="bauraten_jahr"
            v-model="baurate.jahr"
            :disabled="!isEditable"
            label="Jahr (JJJJ)"
            :min="baugebietRealisierungVonOr1900"
            :max="2100"
            integer
            no-grouping
            required
            maxlength="4"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="bauraten_anzahlWeGeplant"
            v-model="baurate.weGeplant"
            :disabled="!isEditable"
            :rules="[validateWohneinheiten(baugebiet, abfragevariante)]"
            label="Geplante Anzahl Wohneinheiten"
            :suffix="suffixWohneinheiten"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="bauraten_geschossflaecheWohnenGeplant"
            v-model="baurate.gfWohnenGeplant"
            :disabled="!isEditable"
            :rules="[validateGeschossflaecheWohnen(baugebiet, abfragevariante)]"
            label="Geplante Geschossfläche Wohnen"
            :suffix="suffixGeschossflaecheWohnen"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <v-row>
      <foerdermix-formular
        id="foerdermix_formular_component"
        ref="Foerdermix"
        v-model="baurate.foerdermix"
        :is-editable="isEditable"
      />
    </v-row>
    <v-row>
      <v-spacer />
      <v-btn
        v-if="showUebernehmenButton()"
        id="bauraten_foerdermix_uebernehmen_button"
        :disabled="!isEditable"
        color="primary"
        variant="flat"
        style="width: 400px; min-width: 400px; max-width: 400px"
        @click="uebernehmeFoerdermix()"
        >Fördermix für alle Bauraten übernehmen</v-btn
      >
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { AbfragevarianteBauleitplanverfahrenDto, BaugebietDto } from "@/api/api-client/isi-backend";
import FoerdermixFormular from "@/components/bauraten/foerdermix/FoerdermixFormular.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import {
  countDecimals,
  geschossflaecheWohnen,
  geschossflaecheWohnenFormatted,
  verteilteGeschossflaecheWohnen,
  verteilteGeschossflaecheWohnenFormatted,
  verteilteWohneinheiten,
  verteilteWohneinheitenFormatted,
  wohneinheiten,
  wohneinheitenFormatted,
} from "@/utils/CalculationUtil";
import { SQUARE_METER } from "@/utils/FieldPrefixesSuffixes";
import _ from "lodash";
import type { Rule } from "@/utils/FieldValidationRules";
import { useToast } from "vue-toastification";
import { toast } from "@/plugins/toast";
interface Props {
  baugebiet?: BaugebietDto;
  abfragevariante?: AbfragevarianteBauleitplanverfahrenDto;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false });
const baurate = defineModel<BaurateModel>({ required: true });
const toast = useToast();

function validateWohneinheiten(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): Rule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (v: string | undefined | null) => {
    return (
      verteilteWohneinheiten(baugebiet, abfragevariante) <= wohneinheiten(baugebiet, abfragevariante) ||
      `Insgesamt sind ${verteilteWohneinheitenFormatted(baugebiet, abfragevariante)} von ${wohneinheitenFormatted(
        baugebiet,
        abfragevariante,
      )} verteilt.`
    );
  };
}

function validateGeschossflaecheWohnen(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): Rule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (v: string | undefined | null) => {
    return (
      _.round(
        verteilteGeschossflaecheWohnen(baugebiet, abfragevariante),
        countDecimals(geschossflaecheWohnen(baugebiet, abfragevariante)),
      ) <= geschossflaecheWohnen(baugebiet, abfragevariante) ||
      `Insgesamt sind ${verteilteGeschossflaecheWohnenFormatted(
        baugebiet,
        abfragevariante,
      )} m² von ${geschossflaecheWohnenFormatted(baugebiet, abfragevariante)} m² verteilt.`
    );
  };
}

const baugebietRealisierungVonOr1900 = computed(() => {
  let year: number;
  if (!_.isNil(props.baugebiet) && props.baugebiet?.technical) {
    year =
      !_.isNil(props.abfragevariante) && !_.isNil(props.abfragevariante.realisierungVon)
        ? props.abfragevariante.realisierungVon
        : 1900;
  } else if (!_.isNil(props.baugebiet) && !props.baugebiet?.technical) {
    year = !_.isNil(props.baugebiet.realisierungVon) ? props.baugebiet.realisierungVon : 1900;
  } else {
    year = 1900;
  }
  return year;
});

function uebernehmeFoerdermix(): void {
  props.abfragevariante?.bauabschnitte?.forEach((bauabschnitt) => {
    bauabschnitt.baugebiete.forEach((baugebiet) => {
      baugebiet.bauraten.forEach((baurateTemp) => {
        baurateTemp.foerdermix = _.cloneDeep(baurate.value.foerdermix);
      });
    });
  });
  toast.success("Fördermix wurde für alle Bauraten übernommen.");
}

function showUebernehmenButton(): boolean {
  return !_.isEmpty(baurate.value.foerdermix.bezeichnung) && !_.isEmpty(baurate.value.foerdermix.bezeichnungJahr);
}

const suffixWohneinheiten = computed(() => {
  return `von ${wohneinheitenFormatted(props.baugebiet, props.abfragevariante)}`;
});

const suffixGeschossflaecheWohnen = computed(() => {
  return `von ${geschossflaecheWohnenFormatted(props.baugebiet, props.abfragevariante)} ${SQUARE_METER}`;
});
</script>
