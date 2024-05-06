<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-checkbox
          id="has_bauratendatei_checkbox"
          v-model="abfragevarianteSachbearbeitung.hasBauratendateiInput"
          class="mx-3"
          label="Daten für Bauratendatei angeben"
          color="primary"
          :disabled="!isEditable"
          @change="checkBoxChanged"
        />
      </v-col>
    </v-row>
    <div v-if="showTables">
      <v-card
        v-for="(input, index) in abfragevarianteSachbearbeitung.bauratendateiInput"
        :key="index"
        class="px-3 pt-3 pb-3 mt-10"
        outlined
      >
        <v-row class="justify-end">
          <v-btn
            class="my-0 mr-0 py-0 pr-0"
            icon
            :disabled="!isEditable"
            @click="deleteInput(index)"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-combobox
              v-model="input.grundschulsprengel"
              label="Grundschulsprengel"
              hide-no-data
              :append-icon="''"
              multiple
              chips
              deletable-chips
              :disabled="!isEditable"
              @input="formChanged"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-combobox
              v-model="input.mittelschulsprengel"
              label="Mittelschulsprengel"
              hide-no-data
              :append-icon="''"
              multiple
              chips
              deletable-chips
              :disabled="!isEditable"
              @input="formChanged"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-combobox
              v-model="input.viertel"
              label="Viertel"
              hide-no-data
              :append-icon="''"
              multiple
              chips
              deletable-chips
              :disabled="!isEditable"
              @input="formChanged"
            />
          </v-col>
        </v-row>
        <spreadsheet-bauratendatei-input
          :id="'spreadsheet_bauratendatei_input_' + index"
          v-model="input.wohneinheiten"
          :foerderarten-bauratendatei-input-basis="foerderartenBauratendateiInputBasis"
          :is-editable="isEditable"
        />
      </v-card>
      <v-toolbar flat>
        <v-spacer />
        <v-btn
          :disabled="!isEditable"
          @click="addInput"
          v-text="'Neuer Eintrag'"
        />
        <v-spacer />
      </v-toolbar>
    </div>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          id="abfragevarianteSachbearbeitung_bauratendatei_anmerkung"
          v-model="abfragevarianteSachbearbeitung.anmerkungBauratendateiInput"
          :disabled="!isEditable"
          label="Anmerkungen"
          auto-grow
          rows="3"
          maxlength="1000"
          @input="formChanged"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SpreadsheetBauratendateiInput from "@/components/abfragevarianten/SpreadsheetBauratendateiInput.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import _ from "lodash";

interface Props {
  isEditable?: boolean;
}

const abfragevarianteSachbearbeitung = defineModel<AbfragevarianteBauleitplanverfahrenModel>({ required: true });
const { formChanged } = useSaveLeave();

const foerderartenBauratendateiInputBasis = computed(() => {
  const wohneinheiten = _.toArray(abfragevarianteSachbearbeitung.value.bauratendateiInput)
    .flatMap((bauratendateiInput) => _.toArray(bauratendateiInput.wohneinheiten))
    .filter((wohneinheitenProFoerderartProJahr) => !_.isNil(wohneinheitenProFoerderartProJahr.foerderart))
    .map((wohneinheitenProFoerderartProJahr) => wohneinheitenProFoerderartProJahr.foerderart);
  return _.uniq(wohneinheiten.sort());
});

const showTables = computed(() => {
  return (
    abfragevarianteSachbearbeitung.value.hasBauratendateiInput === true &&
    !_.isNil(abfragevarianteSachbearbeitung.value.bauratendateiInputBasis)
  );
});

withDefaults(defineProps<Props>(), { isEditable: false });

function checkBoxChanged(): void {
  const isBaurateninputCheckboxChecked =
    !_.isNil(abfragevarianteSachbearbeitung.value.hasBauratendateiInput) &&
    abfragevarianteSachbearbeitung.value.hasBauratendateiInput;
  if (!isBaurateninputCheckboxChecked) {
    abfragevarianteSachbearbeitung.value.bauratendateiInputBasis = undefined;
    abfragevarianteSachbearbeitung.value.bauratendateiInput = [];
  }
  formChanged();
}

function deleteInput(index: number): void {
  abfragevarianteSachbearbeitung.value.bauratendateiInput?.splice(index, 1);
  formChanged();
}

function addInput(): void {
  const newInput = _.cloneDeep(abfragevarianteSachbearbeitung.value.bauratendateiInputBasis);
  if (!_.isNil(newInput)) {
    newInput.id = undefined;
    newInput.createdDateTime = undefined;
    newInput.lastModifiedDateTime = undefined;
    newInput.version = undefined;
    abfragevarianteSachbearbeitung.value.bauratendateiInput?.push(newInput);
  }
  formChanged();
}
</script>
