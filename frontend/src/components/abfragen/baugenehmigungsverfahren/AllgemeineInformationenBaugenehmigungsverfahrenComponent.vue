<template>
  <field-group-card card-title="Allgemeine Informationen zum Verfahren / Bauvorhaben">
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          id="aktenzeichen_pro_lbk_field"
          ref="aktenzeichenProLbkField"
          v-model="abfrage.aktenzeichenProLbk"
          :disabled="!isEditable"
          variant="underlined"
          label="Aktenzeichen ProLBK"
          maxlength="255"
          @update:model-value="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          id="bebauungsplannummer_field"
          ref="bebauungsplannummerField"
          v-model="abfrage.bebauungsplannummer"
          :disabled="!isEditable"
          variant="underlined"
          label="Bebauungsplannummer"
          maxlength="255"
          @update:model-value="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-label
          v-if="isEditableByAbfrageerstellung || isEditableBySachbearbeitung"
          class="my-2"
          variant="underlined"
        >
          {{ nameBauvorhaben() }}
        </v-label>
        <v-label
          v-else
          class="my-2 text-grey-lighten-1"
          variant="underlined"
        >
          {{ nameBauvorhaben() }}
        </v-label>
        <v-btn
          id="bauvorhaben_auswahl_button"
          class="my-4"
          color="primary"
          elevation="1"
          width="120"
          :disabled="!(isEditableByAbfrageerstellung || isEditableBySachbearbeitung)"
          @click="isBausverfahrenAuswahlDialogOpen = true"
        >
          Bauvorhaben
        </v-btn>
        <!--
        <v-autocomplete
          id="bauvorhaben_dropdown"
          ref="bauvorhabenDropdown"
          v-model="abfrage.bauvorhaben"
          :disabled="!(isEditableByAbfrageerstellung || isEditableBySachbearbeitung)"
          variant="underlined"
          :items="bauvorhaben"
          item-title="nameVorhaben"
          item-value="id"
          label="Bauvorhaben"
          clearable
          @update:focused="!$event || fetchBauvorhaben()"
          @update:model-value="formChanged"
        />
        -->
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
          :disabled="!isEditable"
          variant="underlined"
          :items="lookupStore.standVerfahrenBaugenehmigungsverfahren"
          item-value="key"
          item-title="value"
          :rules="[pflichtfeld, notUnspecified]"
          @update:model-value="formChanged"
        >
          <template #label> Stand des Verfahrens <span class="text-secondary">*</span> </template>
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
            :disabled="!isEditable"
            variant="underlined"
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
    v-model="isBausverfahrenAuswahlDialogOpen"
    @abfrage-uebernehmen="bauvorhabenUebernehmen"
    @uebernahme-abbrechen="isBausverfahrenAuswahlDialogOpen = false"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import {
  type BauvorhabenSearchResultDto,
  BaugenehmigungsverfahrenDtoStandVerfahrenEnum,
} from "@/api/api-client/isi-backend";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import { useLookupStore } from "@/stores/LookupStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import _ from "lodash";
import AuswahlBauvorhabenDialog from "@/components/common/AuswahlBauvorhabenDialog.vue";

interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const abfrage = defineModel<BaugenehmigungsverfahrenModel>({ required: true });
const standVerfahrenFreieEingabeVisible = ref(false);
const bauvorhaben = ref<BauvorhabenSearchResultDto>({});
const isBausverfahrenAuswahlDialogOpen = ref(false);

withDefaults(defineProps<Props>(), { isEditable: false });

watch(
  () => abfrage.value.standVerfahren,
  (value) => {
    if (value?.includes(BaugenehmigungsverfahrenDtoStandVerfahrenEnum.FreieEingabe)) {
      standVerfahrenFreieEingabeVisible.value = true;
    } else {
      standVerfahrenFreieEingabeVisible.value = false;
      abfrage.value.standVerfahrenFreieEingabe = undefined;
    }
  },
  { immediate: true },
);

function nameBauvorhaben() {
  return !_.isNil(bauvorhaben.value) && !_.isNil(bauvorhaben.value.nameVorhaben) ? bauvorhaben.value.nameVorhaben : "";
}
function bauvorhabenUebernehmen(value: BauvorhabenSearchResultDto): void {
  bauvorhaben.value = _.cloneDeep(value);
  abfrage.value.bauvorhaben = bauvorhaben.value.id;
  formChanged();
  isBausverfahrenAuswahlDialogOpen.value = false;
}
</script>
