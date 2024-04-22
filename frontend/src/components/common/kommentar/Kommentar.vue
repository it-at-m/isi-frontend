<template>
  <v-card class="mx-3 mt-0 mb-6 px-3 pt-2 pb-3">
    <v-row class="justify-start">
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          id="kommentar_datum"
          v-model.trim="kommentar.datum"
          maxlength="32"
          filled
          :disabled="!isEditable"
          @input="changed"
        >
          <template #label> Datum </template>
        </v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <v-card-actions>
          <v-spacer />
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                id="save_kommentar"
                icon
                :disabled="!isSaveable || !isEditable || !kommentar.isDirty"
                v-on="on"
                @click="saveKommentar"
              >
                <v-icon :color="kommentar.isDirty ? 'secondary' : undefined">mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Kommentar speichern</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                id="delete_kommentar"
                icon
                :disabled="!isDeletable || !isEditable"
                v-on="on"
                @click="deleteDialog = true"
              >
                <v-icon> mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Kommentar löschen</span>
          </v-tooltip>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          id="kommentar_anmerkungen"
          v-model.trim="kommentar.text"
          label="Anmerkungen"
          auto-grow
          filled
          rows="5"
          :disabled="!isEditable"
          @input="changed"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="text-h6 grey--text">Anhänge</p>
        <dokumente
          id="kommentar_dokumente"
          v-model="kommentar.dokumente"
          :name-root-folder="nameRootFolder"
          :is-dokumente-editable="isEditable"
          in-comment
          @change="changed"
        />
      </v-col>
    </v-row>
    <yes-no-dialog
      id="kommentar_anmerkungen_yes_no_dialog_delete"
      v-model="deleteDialog"
      :dialogtitle="deleteDialogTitle"
      :dialogtext="deleteDialogText"
      :yes-text="deleteDialogYesText"
      :no-text="deleteDialogNoText"
      @yes="deleteKommentar"
      @no="cancelDeletion"
    />
  </v-card>
</template>
<script setup lang="ts">
import KommentarModel from "@/types/model/common/KommentarModel";
import _ from "lodash";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { defineModel } from "@/utils/Vue";

interface Props {
  value: KommentarModel;
  isEditable?: boolean;
}

interface Emits {
  (event: "input", value: KommentarModel): void;
  (event: "saveKommentar", value: KommentarModel): void;
  (event: "deleteKommentar", value: KommentarModel): void;
}

const deleteDialogTitle = "Kommentar löschen";
const deleteDialogText = "Hiermit wird der Kommentar unwiderruflich gelöscht.";
const deleteDialogYesText = "Löschen";
const deleteDialogNoText = "Abbrechen";
const nameRootFolder = "kommentare";
const { commentChanged } = useSaveLeave();
const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const kommentar = defineModel(props, emit);
const deleteDialog = ref(false);
const isSaveable = computed(() => !_.isEmpty(kommentar.value.datum) || !_.isEmpty(kommentar.value.text));
const isDeletable = computed(() => !_.isNil(kommentar.value.id) || (_.isNil(kommentar.value.id) && isSaveable));

function cancelDeletion(): void {
  deleteDialog.value = false;
}

function changed(): void {
  const clone = _.cloneDeep(kommentar.value);
  clone.isDirty = true;
  kommentar.value = clone;
  commentChanged();
}

function saveKommentar(): void {
  emit("saveKommentar", kommentar.value);
}

function deleteKommentar(): void {
  cancelDeletion();
  emit("deleteKommentar", kommentar.value);
}
</script>
