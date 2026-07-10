<template>
  <field-group-card>
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
          id="name_field"
          v-model.trim="abfragevariante.name"
          :readonly="!isEditable"
          :rules="[pflichtfeld]"
          variant="underlined"
          maxlength="30"
          validate-on="blur"
          @update:model-value="formChanged"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        >
          <template #label> Name der Abfragevariante <span class="text-secondary">*</span> </template>
        </v-text-field>
      </v-col>
    </v-row>
  </field-group-card>
  <field-group-card>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <date-picker
          id="satzungsbeschluss_datepicker"
          v-model="abfragevariante.satzungsbeschluss"
          :disabled="!isEditable"
          label="Datum Satzungsbeschluss"
          month-picker
          @blur="datumSatzungsbeschlussChanged"
          help="Erfolgt bei Datum 'Satzungsbeschluss' eine Eingabe, werden alle Bauraten gelöscht."
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-autocomplete
          id="planart_dropdown"
          v-model="abfragevariante.planart"
          :items="planartList"
          variant="underlined"
          item-value="key"
          item-title="value"
          multiple
          chips
          :rules="[pflichtfeldMehrfachauswahl, notUnspecified]"
          :readonly="!isEditable"
          @update:model-value="formChanged"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        >
          <template #label>
            Planart
            <span class="text-secondary">*</span>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-slide-y-reverse-transition>
          <v-text-field
            v-if="planartFreieEingabeVisible"
            id="planart_freie_eingabe_field"
            v-model="abfragevariante.planartFreieEingabe"
            :readonly="!isEditable"
            variant="underlined"
            label="Freie Eingabe"
            maxlength="1000"
            @update:model-value="formChanged"
            :class="isEditable ? '' : 'text-grey-lighten-1'"
          />
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="abfragevariante_realisierungvon"
          v-model="abfragevariante.realisierungVon"
          :readonly="!isEditable"
          label="Realisierung von (JJJJ)"
          year
          maxlength="4"
          required
          @blur="realisierungVonChanged"
          help="Erfolgt bei Datum 'Satzungsbeschluss' eine Eingabe, wird das Datum 'Realisierung von' neu berechnet. 'Realisierung von' kann jedoch weiterhin geändert werden. Dabei werden alle Bauraten gelöscht."
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
          year
          maxlength="4"
          help="Nach Angabe bzw. Berechnung der Bauraten wird das Feld automatisch befüllt."
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
import { computed, ref, watch } from "vue";
import { AbfragevarianteBauleitplanverfahrenDtoPlanartEnum } from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DatePicker from "@/components/common/DatePicker.vue";
import NumField from "@/components/common/NumField.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import { notUnspecified, pflichtfeld, pflichtfeldMehrfachauswahl } from "@/utils/FieldValidationRules";
import _ from "lodash";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import { existsBauraten, deleteBauraten } from "@/utils/AbfragevarianteUtil";

interface Props {
  isEditable?: boolean;
}

const abfragevariante = defineModel<AbfragevarianteBauleitplanverfahrenModel>({ required: true });

const planartFreieEingabeVisible = ref<boolean | null>();

const isDialogBauratenLoeschenOpen = ref(false);

const lookupStore = useLookupStore();

const { formChanged } = useSaveLeave();

const planartList = computed(() => lookupStore.planart);

const calcRealisierungBis = computed(() => {
  const jahre: Array<number> | undefined = abfragevariante.value.bauabschnitte
    ?.flatMap((bauabschnitt) => bauabschnitt.baugebiete)
    .flatMap((baugebiet) => baugebiet.bauraten)
    .map((baurate) => baurate.jahr);
  return _.max(jahre);
});

/**
 * Das Jahr des Attributs "realisierungVon" darf nur rechnerisch ermittelt werden,
 * wenn noch kein Wert im Attribut "realisierungVon" gesetzt ist.
 */
function datumSatzungsbeschlussChanged(): void {
  const datumSatzungsbeschluss = abfragevariante.value.satzungsbeschluss;
  if (!_.isNil(datumSatzungsbeschluss)) {
    abfragevariante.value.realisierungVon =
      datumSatzungsbeschluss.getMonth() + 1 < 7
        ? datumSatzungsbeschluss.getFullYear() + 3
        : datumSatzungsbeschluss.getFullYear() + 4;
  }
  isDialogBauratenLoeschenOpen.value = existsBauraten(abfragevariante.value.bauabschnitte);
}

withDefaults(defineProps<Props>(), { isEditable: false });

watch(() => abfragevariante.value.planart, planartChanged, { immediate: true });

function planartChanged(): void {
  if (abfragevariante.value.planart?.includes(AbfragevarianteBauleitplanverfahrenDtoPlanartEnum.FreieEingabe)) {
    planartFreieEingabeVisible.value = true;
  } else {
    abfragevariante.value.planartFreieEingabe = undefined;
    planartFreieEingabeVisible.value = false;
  }
}

function realisierungVonChanged(): void {
  isDialogBauratenLoeschenOpen.value = existsBauraten(abfragevariante.value.bauabschnitte);
}

function yesNoDialogBauratenLoeschenYes(): void {
  deleteBauraten(abfragevariante.value.bauabschnitte);
  yesNoDialogBauratenLoeschenNo();
}

function yesNoDialogBauratenLoeschenNo(): void {
  isDialogBauratenLoeschenOpen.value = false;
}
</script>
