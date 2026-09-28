<template>
  <field-group-card>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="abfragevariante_realisierungvon"
          v-model="baugebiet.realisierungVon"
          :readonly="!isEditable"
          label="Realisierung von (JJJJ)"
          class="mx-3"
          :min="abfragevarianteRealisierungVonOr1900"
          :max="2100"
          integer
          no-grouping
          required
          maxlength="4"
          @focus="saveRealisierungVon"
          @blur="realisierungVonChanged"
          help="Erfolgt bei Datum 'Realisierung von' eine Eingabe, werden alle Bauraten gelöscht."
          :class="isEditable ? '' : 'text-grey-lighten-1'"
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
  </field-group-card>
  <yes-no-dialog
    id="bauraten_loeschen_yes_no_dialog"
    v-model="isDialogBauratenLoeschenOpen"
    icon="mdi-delete-forever"
    dialogtitle="Hinweis"
    dialogtext="Hiermit werden alle Bauraten unwiderruflich gelöscht."
    no-text="Abbrechen"
    yes-text="Ändern"
    @no="yesNoDialogBauratenLoeschenNo"
    @yes="yesNoDialogBauratenLoeschenYes"
  />
</template>

<script setup lang="ts">
import type { AnyAbfragevarianteDto } from "@/types/common/Abfrage";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import _ from "lodash";
import { computed, ref } from "vue";
import { deleteBauraten, existsBauraten } from "@/utils/AbfragevarianteUtil";
import YesNoDialog from "@/components/common/YesNoDialog.vue";

interface Props {
  abfragevariante?: AnyAbfragevarianteDto;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false });
const baugebiet = defineModel<BaugebietModel>({ required: true });
const originalRealisierungVon = ref<number | null>();
const isDialogBauratenLoeschenOpen = ref(false);

const calcRealisierungBis = computed(() => _.max(baugebiet.value.bauraten.map((baurate) => baurate.jahr)));

const abfragevarianteRealisierungVonOr1900 = computed(() => {
  return !_.isNil(props.abfragevariante) && !_.isNil(props.abfragevariante.realisierungVon)
    ? props.abfragevariante.realisierungVon
    : 1900;
});

function saveRealisierungVon(): void {
  originalRealisierungVon.value = baugebiet.value.realisierungVon;
}

function realisierungVonChanged(): void {
  isDialogBauratenLoeschenOpen.value =
    originalRealisierungVon.value != baugebiet.value.realisierungVon && !_.isEmpty(baugebiet.value.bauraten);
}
function yesNoDialogBauratenLoeschenYes(): void {
  baugebiet.value.bauraten = [];
  yesNoDialogBauratenLoeschenNo();
}

function yesNoDialogBauratenLoeschenNo(): void {
  isDialogBauratenLoeschenOpen.value = false;
}
</script>
