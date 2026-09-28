<template>
  <v-card
    variant="outlined"
    class="mx-3 mt-0 mb-6 px-3 pt-2 pb-3"
    style="border: 1px solid #d3d3d3"
  >
    <v-row class="justify-start">
      <v-col
        cols="12"
        md="2"
        class="d-flex align-center"
      >
        <span class="v-label theme--light"> Datum: {{ erstellungsdatumFormatted }} </span>
      </v-col>
      <v-col
        cols="12"
        md="3"
        class="d-flex align-center"
      >
        <span class="v-label theme--light"> Letzte Bearbeitung: {{ datumLetzteAenderungFormatted }} </span>
      </v-col>
      <v-col
        cols="12"
        md="5"
        class="d-flex align-center"
      >
        <span class="v-label theme--light"> Letzter Bearbeiter: {{ letzteBearbeitendePerson }} </span>
      </v-col>
      <v-col
        cols="12"
        md="2"
      >
        <v-card-actions>
          <v-spacer />
          <v-tooltip location="bottom">
            <template #activator="{ props: activatorProps }">
              <v-btn
                id="save_kommentar"
                icon
                :disabled="!isSaveable || !isEditable || !kommentar.isDirty"
                v-bind="activatorProps"
                @click="saveKommentar"
              >
                <v-icon :color="kommentar.isDirty ? 'secondary' : undefined">mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Kommentar speichern</span>
          </v-tooltip>
          <v-tooltip location="bottom">
            <template #activator="{ props: activatorProps }">
              <v-btn
                id="delete_kommentar"
                variant="plain"
                icon="mdi-delete"
                :disabled="!isDeletable || !isEditable"
                v-bind="activatorProps"
                @click="deleteDialog = true"
              />
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
          variant="filled"
          rows="5"
          :readonly="!isEditable"
          @update:model-value="changed"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
import { computed, ref } from "vue";
import KommentarModel from "@/types/model/common/KommentarBauvorhabenModel";
import _ from "lodash";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import Dokumente from "../dokumente/Dokumente.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import moment from "moment";

interface Props {
  isEditable?: boolean;
}

interface Emits {
  (event: "save-kommentar", value: KommentarModel): void;
  (event: "delete-kommentar", value: KommentarModel): void;
}

const deleteDialogTitle = "Kommentar löschen";
const deleteDialogText = "Hiermit wird der Kommentar unwiderruflich gelöscht.";
const deleteDialogYesText = "Löschen";
const deleteDialogNoText = "Abbrechen";
const nameRootFolder = "kommentare";
const { commentChanged } = useSaveLeave();
const emit = defineEmits<Emits>();
const kommentar = defineModel<KommentarModel>({ required: true });
const deleteDialog = ref(false);
const isSaveable = computed(() => !_.isEmpty(kommentar.value.text));
const isDeletable = computed(() => !_.isNil(kommentar.value.id) || (_.isNil(kommentar.value.id) && isSaveable.value));
const erstellungsdatumFormatted = computed(() => moment(kommentar.value.erstellungsdatum).format("DD.MM.YYYY"));
const datumLetzteAenderungFormatted = computed(() =>
  !_.isNil(kommentar.value.lastModifiedDateTime)
    ? moment(kommentar.value.lastModifiedDateTime).format("DD.MM.YYYY")
    : "",
);
const letzteBearbeitendePerson = computed(() =>
  !_.isNil(kommentar.value.bearbeitendePerson) ? kommentar.value.bearbeitendePerson.name : "",
);

withDefaults(defineProps<Props>(), { isEditable: false });

function cancelDeletion(): void {
  deleteDialog.value = false;
}

function changed(): void {
  kommentar.value.isDirty = true;
  // kommentar.value = _.cloneDeep(kommentar.value);
  commentChanged();
}

function saveKommentar(): void {
  emit("save-kommentar", kommentar.value);
}

function deleteKommentar(): void {
  cancelDeletion();
  emit("delete-kommentar", kommentar.value);
}
</script>
