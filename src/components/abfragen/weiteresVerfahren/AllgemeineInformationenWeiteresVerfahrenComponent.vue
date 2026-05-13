<template>
  <field-group-card card-title="Allgemeine Informationen zum Verfahren / Bauvorhaben">
    <v-row justify="center">
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          id="aktenzeichen_pro_lbk_field"
          ref="aktenzeichenProLbkField"
          v-model="abfrage.aktenzeichenProLbk"
          :readonly="!isEditable"
          variant="underlined"
          label="Aktenzeichen ProLBK"
          maxlength="255"
          @update:model-value="formChanged"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          id="bebauungsplannummer_field"
          ref="bebauungsplannummerField"
          v-model="abfrage.bebauungsplannummer"
          :readonly="!isEditable"
          variant="underlined"
          label="Bebauungsplannummer"
          maxlength="255"
          @update:model-value="formChanged"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
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
        md="2"
      >
        <div class="d-flex align-center ml-8">
          <v-btn
            id="open_auswahl_bauvorhaben"
            class="mt-3"
            variant="plain"
            :icon="isBauverfahrenEditable ? 'mdi-pencil-outline' : 'mdi-eye-outline'"
            :disabled="!isBauverfahrenEditable"
            @click="isAuswahlBauvorhabenDialogOpen = true"
          />
          <v-btn
            id="bauvorhaben_loeschen"
            variant="plain"
            class="mt-3"
            icon="mdi-delete"
            :disabled="!isBauverfahrenDeleteable"
            @click="deleteBauvorhaben"
          />
        </div>
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
            :disabled="!isEditable"
            variant="underlined"
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
          id="verfahrensstand_dropdown"
          ref="verfahrensstandDropdown"
          v-model="abfrage.verfahrensstand"
          :disabled="!isEditable"
          variant="underlined"
          :items="lookupStore.verfahrensstandWeiteresVerfahren"
          item-value="key"
          item-title="value"
          :rules="[pflichtfeld, notUnspecified]"
          @update:model-value="formChanged"
        >
          <template #label> Verfahrensstand <span class="text-secondary">*</span></template>
        </v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-slide-y-reverse-transition>
          <v-text-field
            v-if="verfahrensstandFreieEingabeVisible"
            id="verfahrensstand_freie_eingabe_field"
            ref="verfahrensstandFreieEingabeField"
            v-model="abfrage.verfahrensstandFreieEingabe"
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
  </field-group-card>
  <auswahl-bauvorhaben-dialog
    id="auswahl_bauvorhaben_dialog"
    v-model="isAuswahlBauvorhabenDialogOpen"
    v-model:selected-bauvorhaben-id="abfrage.bauvorhaben"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import {
  WeiteresVerfahrenDtoVerfahrensstandEnum,
  UncertainBoolean,
  BauvorhabenDto,
} from "@/api/api-client/isi-backend";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import TriSwitch from "@/components/common/TriSwitch.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { useSaveLeave } from "@/composables/SaveLeave";

const { getBauvorhabenById } = useBauvorhabenApi();
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import _ from "lodash";
import AuswahlBauvorhabenDialog from "@/components/common/AuswahlBauvorhabenDialog.vue";
import { useBauvorhabenApi } from "@/composables/requests/BauvorhabenApi";
import { createBauvorhabenDto } from "@/utils/Factories";

interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const abfrage = defineModel<WeiteresVerfahrenModel>({ required: true });
const verfahrensstandFreieEingabeVisible = ref(false);
const sobonJahrVisible = ref(false);
const bauvorhaben = ref<BauvorhabenDto>(createBauvorhabenDto());
const isAuswahlBauvorhabenDialogOpen = ref(false);

const isBauverfahrenEditable = computed(() => {
  return isEditableByAbfrageerstellung.value || isEditableBySachbearbeitung.value;
});
const isBauverfahrenDeleteable = computed(() => {
  return (
    (isEditableByAbfrageerstellung.value || isEditableBySachbearbeitung.value) && !_.isEmpty(abfrage.value.bauvorhaben)
  );
});
const nameBauvorhaben = computed(() => {
  return !_.isEmpty(bauvorhaben.value.nameVorhaben) ? bauvorhaben.value.nameVorhaben : "Kein Bauvorhaben zugeordnet";
});

watch(
  () => abfrage.value.bauvorhaben,
  async (newValue, oldValue) => {
    if (!_.isUndefined(oldValue) && newValue !== oldValue) {
      formChanged();
    }

    await getBauvorhaben();
  },
  { immediate: true },
);

/**
 * Lädt das aktuell referenzierte Bauvorhaben anhand der gespeicherten ID
 * und setzt es für die Anzeige im Formular.
 */
async function getBauvorhaben(): Promise<void> {
  if (!_.isNil(abfrage.value.bauvorhaben) && !_.isEmpty(abfrage.value.bauvorhaben)) {
    try {
      bauvorhaben.value = await getBauvorhabenById(abfrage.value.bauvorhaben);
    } catch {
      bauvorhaben.value = createBauvorhabenDto();
    }
  } else {
    bauvorhaben.value = createBauvorhabenDto();
  }
}

withDefaults(defineProps<Props>(), { isEditable: false });

watch(
  () => abfrage.value.verfahrensstand,
  (value) => {
    if (value?.includes(WeiteresVerfahrenDtoVerfahrensstandEnum.FreieEingabe)) {
      verfahrensstandFreieEingabeVisible.value = true;
    } else {
      verfahrensstandFreieEingabeVisible.value = false;
      abfrage.value.verfahrensstandFreieEingabe = undefined;
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

function deleteBauvorhaben(): void {
  abfrage.value.bauvorhaben = undefined;
  formChanged();
}
</script>
