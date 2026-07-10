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
        md="4"
      >
        <v-autocomplete
          id="wesentliche_rechtsgrundlage_dropdown"
          v-model="abfragevariante.wesentlicheRechtsgrundlage"
          :items="wesentlicheRechtsgrundlageWeiteresVerfahrenList"
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
            Wesentliche Rechtsgrundlage
            <span class="text-secondary">*</span>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-slide-y-reverse-transition>
          <v-text-field
            v-if="wesentlicheRechtsgrundlageFreieEingabeVisible"
            id="wesentliche_rechtsgrundlage_freie_eingabe_field"
            v-model="abfragevariante.wesentlicheRechtsgrundlageFreieEingabe"
            :readonly="!isEditable"
            variant="underlined"
            label="Freie Eingabe"
            maxlength="1000"
            @update:model-value="formChanged"
            :class="isEditable ? '' : 'text-grey-lighten-1'"
          />
        </v-slide-y-reverse-transition>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-slide-y-reverse-transition>
          <v-text-field
            v-if="wesentlicheRechtsgrundlageAngabenZurBefreiungVisible"
            id="wesentliche_rechtsgrundlage_angaben_zur_befreiung_field"
            v-model="abfragevariante.wesentlicheRechtsgrundlageAngabenZurBefreiung"
            :readonly="!isEditable"
            variant="underlined"
            label="Angaben zur Befreiung"
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
import {
  AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum,
  AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum,
} from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import { notUnspecified, pflichtfeld, pflichtfeldMehrfachauswahl } from "@/utils/FieldValidationRules";
import _ from "lodash";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import { existsBauraten, deleteBauraten } from "@/utils/AbfragevarianteUtil";

interface Props {
  isEditable?: boolean;
}

const abfragevariante = defineModel<AbfragevarianteWeiteresVerfahrenModel>({ required: true });

const wesentlicheRechtsgrundlageFreieEingabeVisible = ref<boolean | null>();

const wesentlicheRechtsgrundlageAngabenZurBefreiungVisible = ref<boolean | null>();

const lookupStore = useLookupStore();

const { formChanged } = useSaveLeave();

const isDialogBauratenLoeschenOpen = ref(false);

const originalRealisierungVon = ref<number | null>();

const wesentlicheRechtsgrundlageWeiteresVerfahrenList = computed(
  () => lookupStore.wesentlicheRechtsgrundlageWeiteresVerfahren,
);

const calcRealisierungBis = computed(() => {
  const jahre: Array<number> | undefined = abfragevariante.value.bauabschnitte
    ?.flatMap((bauabschnitt) => bauabschnitt.baugebiete)
    .flatMap((baugebiet) => baugebiet.bauraten)
    .map((baurate) => baurate.jahr);
  return _.max(jahre);
});

withDefaults(defineProps<Props>(), { isEditable: false });

watch(() => abfragevariante.value.wesentlicheRechtsgrundlage, wesentlicheRechtsgrundlageChanged, { immediate: true });

function wesentlicheRechtsgrundlageChanged(): void {
  if (
    abfragevariante.value.wesentlicheRechtsgrundlage?.includes(
      AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum.FreieEingabe,
    )
  ) {
    wesentlicheRechtsgrundlageFreieEingabeVisible.value = true;
  } else {
    abfragevariante.value.wesentlicheRechtsgrundlageFreieEingabe = undefined;
    wesentlicheRechtsgrundlageFreieEingabeVisible.value = false;
  }
  if (
    abfragevariante.value.wesentlicheRechtsgrundlage?.includes(
      AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum.Befreiung,
    )
  ) {
    wesentlicheRechtsgrundlageAngabenZurBefreiungVisible.value = true;
  } else {
    abfragevariante.value.wesentlicheRechtsgrundlageAngabenZurBefreiung = undefined;
    wesentlicheRechtsgrundlageAngabenZurBefreiungVisible.value = false;
  }
}

function saveRealisierungVon(): void {
  originalRealisierungVon.value = abfragevariante.value.realisierungVon;
}

function realisierungVonChanged(): void {
  isDialogBauratenLoeschenOpen.value =
    originalRealisierungVon.value != abfragevariante.value.realisierungVon &&
    existsBauraten(abfragevariante.value.bauabschnitte);
}

function yesNoDialogBauratenLoeschenYes(): void {
  deleteBauraten(abfragevariante.value.bauabschnitte);
  yesNoDialogBauratenLoeschenNo();
}

function yesNoDialogBauratenLoeschenNo(): void {
  isDialogBauratenLoeschenOpen.value = false;
}
</script>
