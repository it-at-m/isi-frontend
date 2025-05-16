<template>
  <field-group-card card-title="Allgemeine Informationen zum Verfahren / Bauvorhaben">
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          id="bebauungsplannummer_field"
          ref="bebauungsplannummerField"
          v-model="abfrage.bebauungsplannummer"
          variant="underlined"
          :disabled="!isEditable"
          label="Bebauungsplannummer"
          maxlength="255"
          @update:model-value="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="5"
        class="d-flex align-center"
      >
        <span
          v-if="isBauverfahrenEditable"
          class="v-label theme--light"
        >
          {{ nameBauvorhaben }}
        </span>
        <span
          v-else
          class="v-label text-grey-lighten-1"
        >
          {{ nameBauvorhaben }}
        </span>
      </v-col>
      <v-col
        cols="12"
        md="1"
        class="d-flex align-right"
      >
        <v-btn
          id="open_auswahl_bauvorhaben"
          class="mt-3 ml-2"
          variant="plain"
          :icon="isBauverfahrenEditable ? 'mdi-pencil-outline' : 'mdi-eye-outline'"
          :disabled="!isBauverfahrenEditable"
          @click="isAuswahlBauvorhabenDialogOpen = true"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <tri-switch
          id="sobon_relevant_triswitch"
          ref="sobonRelevantTriswitch"
          v-model="abfrage.sobonRelevant"
          :disabled="!isEditable"
          off-text="Nein"
          on-text="Ja"
          :rules="[notUnspecified]"
        >
          <template #label> SoBoN-relevant <span class="text-secondary">*</span></template>
        </tri-switch>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-slide-y-reverse-transition>
          <v-select
            v-if="sobonJahrVisible"
            id="sobon_jahr_dropdown"
            ref="sobonJahrDropdown"
            v-model="abfrage.sobonJahr"
            variant="underlined"
            :disabled="!isEditable"
            :items="lookupStore.sobonVerfahrensgrundsaetzeJahr"
            item-value="key"
            item-title="value"
            :rules="[pflichtfeld]"
            @update:model-value="formChanged"
          >
            <template #label>
              Jahr der anzuwendenden Verfahrensgrundsätze <span class="text-secondary">*</span>
            </template>
          </v-select>
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          id="stand_verfahren_dropdown"
          ref="standVerfahrenDropdown"
          v-model="abfrage.standVerfahren"
          variant="underlined"
          :disabled="!isEditable"
          :items="lookupStore.standVerfahrenBauleitplanverfahren"
          item-value="key"
          item-title="value"
          :rules="[pflichtfeld, notUnspecified]"
          @update:model-value="formChanged"
        >
          <template #label> Stand des Verfahrens <span class="text-secondary">*</span></template>
        </v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-slide-y-reverse-transition>
          <v-text-field
            v-if="standVerfahrenFreieEingabeVisible"
            id="stand_verfahren_freie_eingabe_field"
            ref="standVerfahrenFreieEingabeField"
            v-model="abfrage.standVerfahrenFreieEingabe"
            variant="underlined"
            :disabled="!isEditable"
            label="Freie Eingabe"
            maxlength="1000"
            @update:model-value="formChanged"
          />
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
  </field-group-card>
  <auswahl-bauvorhaben-dialog
    id="auswahl_bauvorhaben_dialog"
    v-model="isAuswahlBauvorhabenDialogOpen"
    @bauvorhaben-uebernehmen="bauvorhabenUebernehmen"
    @bauvorhaben-auswahl-abbrechen="isAuswahlBauvorhabenDialogOpen = false"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import {
  type BauvorhabenSearchResultDto,
  BauleitplanverfahrenDtoStandVerfahrenEnum,
  UncertainBoolean,
} from "@/api/api-client/isi-backend";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import TriSwitch from "@/components/common/TriSwitch.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import _ from "lodash";
import AuswahlBauvorhabenDialog from "@/components/common/AuswahlBauvorhabenDialog.vue";
import { Context } from "@/utils/Context";

interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const abfrage = defineModel<BauleitplanverfahrenModel>({ required: true });
const standVerfahrenFreieEingabeVisible = ref(false);
const sobonJahrVisible = ref(false);
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);
const isAuswahlBauvorhabenDialogOpen = ref(false);
const isBauverfahrenEditable = computed(() => {
  return isEditableByAbfrageerstellung.value || isEditableBySachbearbeitung.value;
});
const nameBauvorhaben = computed(() =>
  !_.isNil(bauvorhaben.value) && !_.isNil(bauvorhaben.value.nameVorhaben)
    ? bauvorhaben.value.nameVorhaben
    : isBauverfahrenEditable
      ? "Kein Bauvorhaben zugeordnet"
      : "",
);
withDefaults(defineProps<Props>(), { isEditable: false });

watch(
  () => abfrage.value.standVerfahren,
  (value) => {
    if (value?.includes(BauleitplanverfahrenDtoStandVerfahrenEnum.FreieEingabe)) {
      standVerfahrenFreieEingabeVisible.value = true;
    } else {
      standVerfahrenFreieEingabeVisible.value = false;
      abfrage.value.standVerfahrenFreieEingabe = undefined;
    }
  },
  { immediate: true },
);

watch(
  () => abfrage.value.sobonRelevant,
  (value) => {
    if (value === UncertainBoolean.True) {
      sobonJahrVisible.value = true;
    } else {
      sobonJahrVisible.value = false;
      abfrage.value.sobonJahr = undefined;
    }
  },
  { immediate: true },
);

function bauvorhabenUebernehmen(value: BauvorhabenSearchResultDto): void {
  bauvorhaben.value = _.cloneDeep(value);
  abfrage.value.bauvorhaben = bauvorhaben.value.id;
  isAuswahlBauvorhabenDialogOpen.value = false;
  formChanged();
}
</script>
