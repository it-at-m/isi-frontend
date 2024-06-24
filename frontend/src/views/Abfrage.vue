<template>
  <v-form ref="form">
    <default-layout resizable>
      <template #content>
        <bauleitplanverfahren-component
          v-if="isBauleitplanverfahrenFormularOpen"
          id="bauleitverfahren_component"
          v-model="selected"
          :is-new="isNew"
        />
        <baugenehmigungsverfahren-component
          v-else-if="isBaugenehmigungsverfahrenFormularOpen"
          id="baugenehmigungsverfahren_component"
          v-model="selected"
          :is-new="isNew"
        />
        <weiteres-verfahren-component
          v-else-if="isWeiteresVerfahrenFormularOpen"
          id="weiteres_verfahren_component"
          v-model="selected"
          :is-new="isNew"
        />
        <abfragevariante-bauleitplanverfahren-component
          v-else-if="isAbfragevarianteBauleitplanverfahrenFormularOpen"
          id="abfragevariante_bauleitplanverfahren_component"
          v-model="selected"
          :is-editable="isEditable"
          :anzeige-context-abfragevariante="anzeigeContextAbfragevariante"
        />
        <abfragevariante-baugenehmigungsverfahren-component
          v-else-if="isAbfragevarianteBaugenehmigungsverfahrenFormularOpen"
          id="abfragevariante_baugenehmigungsverfahren_component"
          v-model="selected"
          :is-editable="isEditable"
          :anzeige-context-abfragevariante="anzeigeContextAbfragevariante"
        />
        <abfragevariante-weiteres-verfahren-component
          v-else-if="isAbfragevarianteWeiteresVerfahrenFormularOpen"
          id="abfragevariante_weiteres_verfahren_component"
          v-model="selected"
          :is-editable="isEditable"
          :anzeige-context-abfragevariante="anzeigeContextAbfragevariante"
        />
        <bauabschnitt-component
          v-else-if="isBauabschnittFormularOpen"
          id="bauabschnitt_component"
          v-model="selected"
          :is-editable="isEditable"
        />
        <baugebiet-bauleitplanverfahren-component
          v-else-if="isBaugebietBauleitplanverfahrenFormularOpen"
          id="baugebiet_bauleitplanverfahren_component"
          v-model="selected"
          :is-editable="isEditable"
          :abfragevariante="abfragevarianteAncestor"
        />
        <baugebiet-baugenehmigungsverfahren-component
          v-else-if="isBaugebietBaugenehmigungsverfahrenFormularOpen"
          id="baugebiet_baugenehmigungsverfahren_component"
          v-model="selected"
          :is-editable="isEditable"
          :abfragevariante="abfragevarianteAncestor"
        />
        <baugebiet-weiteres-verfahren-component
          v-else-if="isBaugebietWeiteresVerfahrenFormularOpen"
          id="baugebiet_weiteres_verfahren_component"
          v-model="selected"
          :is-editable="isEditable"
          :abfragevariante="abfragevarianteAncestor"
        />
        <baurate-component
          v-else-if="isBaurateFormularOpen"
          id="baurate_component"
          v-model="selected"
          :is-editable="isEditable"
          :baugebiet="baugebietAncestor"
          :abfragevariante="abfragevarianteAncestor"
        />
        <yes-no-dialog
          id="abfrage_yes_no_dialog_loeschen"
          v-model="isDeleteDialogAbfrageOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          dialogtext="Hiermit wird die Abfrage und alle dazugehörigen Abfragevarianten unwiderruflich gelöscht."
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogDeleteAbfrageNo"
          @yes="yesNoDialogDeleteAbfrageYes"
        />
        <yes-no-dialog
          id="abfrage_yes_no_dialog_statusuebergang"
          ref="yesNoDialogStatusuebergang"
          v-model="isStatusUebergangDialogOpen"
          icon="mdi-account-arrow-right"
          dialogtitle="Hinweis"
          :dialogtext="dialogTextStatus"
          no-text="Abbrechen"
          :yes-text="'Zustimmen'"
          :anmerkung-max-length="anmerkungMaxLength"
          @anmerkung="changeAnmkerung($event)"
          @no="yesNoDialogStatusUebergangeNo"
          @yes="yesNoDialogStatusUebergangYes"
        />
        <yes-no-dialog
          id="abfrage_yes_no_dialog_save_leave"
          v-model="saveLeaveDialog"
          :dialogtitle="saveLeaveDialogTitle"
          :dialogtext="saveLeaveDialogText"
          :no-text="saveLeaveNoText"
          :yes-text="saveLeaveYesText"
          @yes="leave"
          @no="cancel"
        />
        <yes-no-dialog
          id="abfrage_abfragevariante_yes_no_dialog_loeschen"
          v-model="isDeleteDialogAbfragevarianteOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          :dialogtext="deleteAbfragevarianteDialogText"
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogAbfragevarianteNo"
          @yes="yesNoDialogAbfragevarianteYes"
        />
        <yes-no-dialog
          id="abfrage_abfragevariante_bauabschnitt_yes_no_dialog_loeschen"
          v-model="isDeleteDialogBauabschnittOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          :dialogtext="deleteBauabschnittDialogText"
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogBauabschnittNo"
          @yes="yesNoDialogBauabschnittYes"
        />
        <yes-no-dialog
          id="abfrage_abfragevariante_bauabschnitt_baugebiet_yes_no_dialog_loeschen"
          v-model="isDeleteDialogBaugebietOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          :dialogtext="deleteBaugebietDialogText"
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogBaugebietNo"
          @yes="yesNoDialogBaugebietYes"
        />
        <yes-no-dialog
          id="abfrage_abfragevariante_bauabschnitt_baugebiet_baurate_yes_no_dialog_loeschen"
          v-model="isDeleteDialogBaurateOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          :dialogtext="deleteBaurateDialogText"
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogBaurateNo"
          @yes="yesNoDialogBaurateYes"
        />
        <yes-no-dialog
          id="abfrage_abfragevariante_relevante_abfragevariante_dialog"
          v-model="isRelevanteAbfragevarianteDialogOpen"
          icon="mdi-marker"
          dialogtitle="Hinweis"
          :dialogtext="relevanteAbfragevarianteDialogText"
          no-text="Abbrechen"
          :yes-text="relevanteAbfragevarianteYesButtonText"
          @no="yesNoDialogRelevanteAbfragevarianteNo"
          @yes="yesNoDialogRelevanteAbfragevarianteYes"
        />
        <data-transfer-dialog
          id="abfrage_datenuebernahme"
          v-model="isDataTransferDialogOpen"
          :context="Context.ABFRAGE"
          @abfrage-uebernehmen="abfrageUebernehmen"
          @uebernahme-abbrechen="isDataTransferDialogOpen = false"
        />
      </template>
      <template #heading>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="11"
            >
              <span
                id="abfrage_displayName"
                class="text-h6 font-weight-bold"
              >
                {{ abfrage.displayName }}
              </span>
            </v-col>
            <v-col
              cols="12"
              sm="1"
            >
              <bearbeitungshistorie v-model="abfrage.bearbeitungshistorie" />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template #navigation>
        <abfrage-navigation-tree
          id="abfrage_navigation_tree"
          ref="abfrageNavigationTree"
          :abfrage="abfrage"
          :selected-item-id="selectedTreeItemId"
          :relevante-abfragevariante-id="relevanteAbfragevarianteId"
          @select-abfrage="handleSelectAbfrage"
          @select-abfragevariante="handleSelectAbfragevariante"
          @select-bauabschnitt="handleSelectBauabschnitt"
          @select-baugebiet="handleSelectBaugebiet"
          @select-baurate="handleSelectBaurate"
          @create-abfragevariante="handleCreateAbfragevariante"
          @create-abfragevariante-sachbearbeitung="handleCreateAbfragevarianteSachbearbeitung"
          @create-bauabschnitt="handleCreateBauabschnitt"
          @create-baugebiet="handleCreateBaugebiet"
          @create-baurate="handleCreateBaurate"
          @delete-abfragevariante="handleDeleteAbfragevariante"
          @delete-bauabschnitt="handleDeleteBauabschnitt"
          @delete-baugebiet="handleDeleteBaugebiet"
          @delete-baurate="handleDeleteBaurate"
          @set-abfragevariante-relevant="handleSetAbfragevarianteRelevant"
          @determine-bauraten-for-abfragevariante="handleDetermineBauratenForAbfragevariante"
          @determine-bauraten-for-baugebiet="handleDetermineBauratenForBaugebiet"
        />
        <v-spacer />
      </template>
      <template #action>
        <v-btn
          v-if="!isNew"
          id="abfrage_loeschen_button"
          class="my-4 px-1"
          color="primary"
          elevation="1"
          style="width: 200px"
          :disabled="!(isEditableByAbfrageerstellung || isEditableByAdmin)"
          @click="deleteAbfrage()"
        >
          Löschen
        </v-btn>
        <v-btn
          v-else
          id="abfrage_datenuebernahme_button"
          class="my-4 px-1"
          color="primary"
          elevation="1"
          style="width: 200px"
          :disabled="!isRoleAdminOrAbfrageerstellung"
          @click="isDataTransferDialogOpen = true"
        >
          Datenübernahme
        </v-btn>
        <v-spacer />
        <v-btn
          v-for="(transition, index) in possibleTransitions"
          v-show="!isNew"
          :id="'abfrage_status_aenderung' + index + '_button'"
          :key="index"
          :disabled="isFormDirty"
          stacked
          color="secondary"
          class="mt-2 px-1"
          elevation="1"
          style="width: 200px; height: 36px"
          @click="statusUebergang(transition)"
        >
          {{ transition.buttonName }}
        </v-btn>
        <v-btn
          id="abfrage_speichern_button"
          class="mt-2 px-1"
          color="secondary"
          elevation="1"
          :disabled="(!isNew && !isFormDirty) || containsNotAllowedDokument(abfrage.dokumente)"
          style="width: 200px"
          @click="saveAbfrage()"
        >
          {{ isNew ? "Entwurf Speichern" : "Aktualisieren" }}
        </v-btn>
        <v-btn
          id="abfrage_abbrechen_button"
          color="primary"
          elevation="1"
          class="mt-2 px-1"
          style="width: 200px"
          @click="returnToUebersicht()"
        >
          Abbrechen
        </v-btn>
      </template>
    </default-layout>
  </v-form>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";
import type { VForm } from "vuetify/components";
import {
  type AbfragevarianteBauleitplanverfahrenDto,
  type AbfragevarianteBaugenehmigungsverfahrenDto,
  type AbfragevarianteWeiteresVerfahrenDto,
  type BaurateDto,
  type BauleitplanverfahrenAngelegtDto,
  type BauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  type BauleitplanverfahrenInBearbeitungFachreferatDto,
  type BauleitplanverfahrenBedarfsmeldungErfolgtDto,
  type BaugenehmigungsverfahrenAngelegtDto,
  type BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
  type BaugenehmigungsverfahrenInBearbeitungFachreferatDto,
  type BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto,
  type WeiteresVerfahrenAngelegtDto,
  type WeiteresVerfahrenInBearbeitungSachbearbeitungDto,
  type WeiteresVerfahrenInBearbeitungFachreferatDto,
  type WeiteresVerfahrenBedarfsmeldungErfolgtDto,
  type TransitionDto,
  AbfrageDtoArtAbfrageEnum,
  AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum,
  AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum,
  AbfrageDto,
  FoerdermixDto,
} from "@/api/api-client/isi-backend";
import AbfrageNavigationTree from "@/components/abfragen/AbfrageNavigationTree.vue";
import BauleitplanverfahrenComponent from "@/components/abfragen/bauleitplanverfahren/BauleitplanverfahrenComponent.vue";
import BaugenehmigungsverfahrenComponent from "@/components/abfragen/baugenehmigungsverfahren/BaugenehmigungsverfahrenComponent.vue";
import WeiteresVerfahrenComponent from "@/components/abfragen/weiteresVerfahren/WeiteresVerfahrenComponent.vue";
import AbfragevarianteBauleitplanverfahrenComponent from "@/components/abfragevarianten/bauleitplanverfahren/AbfragevarianteBauleitplanverfahrenComponent.vue";
import AbfragevarianteBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/AbfragevarianteBaugenehmigungsverfahrenComponent.vue";
import AbfragevarianteWeiteresVerfahrenComponent from "@/components/abfragevarianten/weiteresVerfahren/AbfragevarianteWeiteresVerfahrenComponent.vue";
import BauabschnittComponent from "@/components/bauabschnitte/BauabschnittComponent.vue";
import BaugebietBauleitplanverfahrenComponent from "@/components/baugebiete/bauleitplanverfahren/BaugebietBauleitplanverfahrenComponent.vue";
import BaugebietBaugenehmigungsverfahrenComponent from "@/components/baugebiete/baugenehmigungsverfahren/BaugebietBaugenehmigungsverfahrenComponent.vue";
import BaugebietWeiteresVerfahrenComponent from "@/components/baugebiete/weiteresVerfahren/BaugebietWeiteresVerfahrenComponent.vue";
import BaurateComponent from "@/components/bauraten/BaurateComponent.vue";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import DataTransferDialog from "@/components/common/DataTransferDialog.vue";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import { containsNotAllowedDokument } from "@/utils/DokumenteUtil";
import {
  createAbfragevarianteBauleitplanverfahrenDto,
  createAbfragevarianteBaugenehmigungsverfahrenDto,
  createAbfragevarianteWeiteresVerfahrenDto,
  createBauabschnittDto,
  createBaugebietDto,
  createBaurateDto,
  createBauleitplanverfahrenDto,
  createBaugenehmigungsverfahrenDto,
  createWeiteresVerfahrenDto,
  createTechnicalBauabschnittDto,
  createTechnicalBaugebietDto,
} from "@/utils/Factories";
import {
  mapToBauleitplanverfahrenAngelegt,
  mapToBaugenehmigungsverfahrenAngelegt,
  mapToWeiteresVerfahrenAngelegt,
  mapToBauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  mapToBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
  mapToWeiteresVerfahrenInBearbeitungSachbearbeitungDto,
  mapToBauleitplanverfahrenInBearbeitungFachreferatDto,
  mapToBaugenehmigungsverfahrenInBearbeitungFachreferatDto,
  mapToWeiteresVerfahrenInBearbeitungFachreferatDto,
  mapToBauleitplanverfahrenBedarfsmeldungErfolgtDto,
  mapToBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto,
  mapToWeiteresVerfahrenBedarfsmeldungErfolgtDto,
  copyAbfrage,
} from "@/utils/MapperUtil";
import _ from "lodash";
import { useToast, TYPE } from "vue-toastification";
import Bearbeitungshistorie from "@/components/common/Bearbeitungshistorie.vue";
import { findFaultInAbfrageForSave } from "@/utils/Validators";
import { useSearchStore } from "@/stores/SearchStore";
import { useFoerdermixStore } from "@/stores/FoerdermixStore";
import { Context } from "@/utils/Context";
import {
  type AbfrageDtoWithForm,
  type AbfrageTreeItem,
  type AnyAbfrageModel,
  type AnyAbfragevarianteModel,
  type AnyAbfrageDto,
  AnzeigeContextAbfragevariante,
  AbfrageFormType,
} from "@/types/common/Abfrage";
import { useRoute, useRouter } from "vue-router";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useTransitionApi } from "@/composables/requests/TransitionApi";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import { useSecurity } from "@/composables/security/Security";
import { useBauvorhabenApi } from "@/composables/requests/BauvorhabenApi";
import { useAbfragenApi } from "@/composables/requests/AbfragenApi";
import { useStatusUebergangApi } from "@/composables/requests/StatusUebergangApi";
import { useBauratenApi } from "@/composables/requests/BauratenApi";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";

const {
  saveLeaveDialog,
  saveLeaveDialogTitle,
  saveLeaveDialogText,
  saveLeaveNoText,
  saveLeaveYesText,
  isFormDirty,
  formChanged,
  cancel,
  leave,
} = useSaveLeave();
const {
  isEditableByAbfrageerstellung,
  isEditableBySachbearbeitung,
  isEditableByBedarfsmeldung,
  isBedarfsmeldungEditableByAbfrageerstellung,
  isEditableByAdmin,
  isEditableWithAnzeigeContextAbfragevariante,
} = useAbfrageSecurity();
const { isRoleAdminOrAbfrageerstellung } = useSecurity();
const {
  save,
  patchAngelegt,
  patchInBearbeitungSachbearbeitung,
  patchInBearbeitungFachreferat,
  patchBedarfsmeldungErfolgt,
  getById,
  deleteById,
} = useAbfragenApi();
const { getBauvorhabenById, changeRelevanteAbfragevariante } = useBauvorhabenApi();
const { determineBauraten } = useBauratenApi();
const { getTransitions } = useTransitionApi();
const { statusUebergangRequest } = useStatusUebergangApi();
const toast = useToast();
const searchStore = useSearchStore();
const foerdermixStore = useFoerdermixStore();
const route = useRoute();
const router = useRouter();

const RELEVANTE_ABFRAGEVARIANTE_DIALOG_TEXT_BASE = "Hiermit wird die vorhandene Markierung überschrieben.";
const TRANSITION_URL_ERLEDIGT_OHNE_FACHREFERAT = "erledigt-ohne-fachreferat";
const abfrageId = route.params.id as string;
let relevanteAbfragevarianteToBeSet: AnyAbfragevarianteModel | undefined;
let currentTransition: TransitionDto | undefined;
let anmerkung = "";

const abfrage = ref(new BauleitplanverfahrenModel(createBauleitplanverfahrenDto()));
const isNew = ref(true);
const selected = ref<AbfrageDtoWithForm>(abfrage.value);
const openForm = ref(AbfrageFormType.BAULEITPLANVERFAHREN);
const suggestedArtAbfrage = ref(route.query.art as string);
const dialogTextStatus = ref("");
const possibleTransitions = ref<TransitionDto[]>([]);
const isDeleteDialogAbfrageOpen = ref(false);
const isStatusUebergangDialogOpen = ref(false);
const isDeleteDialogAbfragevarianteOpen = ref(false);
const isDeleteDialogBauabschnittOpen = ref(false);
const isDeleteDialogBaugebietOpen = ref(false);
const isDeleteDialogBaurateOpen = ref(false);
const isDataTransferDialogOpen = ref(false);
const isRelevanteAbfragevarianteDialogOpen = ref(false);
const relevanteAbfragevarianteId = ref<string | undefined>(undefined);
const relevanteAbfragevarianteDialogText = ref("");
const relevanteAbfragevarianteYesButtonText = ref("Ok");
const anzeigeContextAbfragevariante = ref(AnzeigeContextAbfragevariante.UNDEFINED);
const selectedTreeItemId = ref("");
const treeItemToDelete = ref<AbfrageTreeItem | undefined>(undefined);
const anmerkungMaxLength = ref(0);
const abfragevarianteAncestor = ref<AnyAbfragevarianteModel>(
  new AbfragevarianteBauleitplanverfahrenModel(createAbfragevarianteBauleitplanverfahrenDto()),
);
const baugebietAncestor = ref<BaugebietModel>(new BaugebietModel(createBaugebietDto()));
const form = ref<VForm | null>(null);
const abfrageNavigationTree = ref<typeof AbfrageNavigationTree | null>(null);
const yesNoDialogStatusuebergang = ref<typeof YesNoDialog | null>(null);

const isEditable = computed(() => isEditableWithAnzeigeContextAbfragevariante(anzeigeContextAbfragevariante.value));
const artAbfrage = computed(() => (isNew.value ? suggestedArtAbfrage.value : abfrage.value.artAbfrage));
const isBauleitplanverfahren = computed(() => artAbfrage.value === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren);
const isBaugenehmigungsverfahren = computed(
  () => artAbfrage.value === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren,
);
const isWeiteresVerfahren = computed(() => artAbfrage.value === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren);
const isBauleitplanverfahrenFormularOpen = computed(() => openForm.value === AbfrageFormType.BAULEITPLANVERFAHREN);
const isBaugenehmigungsverfahrenFormularOpen = computed(
  () => openForm.value === AbfrageFormType.BAUGENEHMIGUNGSVERFAHREN,
);
const isWeiteresVerfahrenFormularOpen = computed(() => openForm.value === AbfrageFormType.WEITERES_VERFAHREN);
const isAbfragevarianteBauleitplanverfahrenFormularOpen = computed(
  () => openForm.value === AbfrageFormType.ABFRAGEVARIANTE_BAULEITPLANVERFAHREN,
);
const isAbfragevarianteBaugenehmigungsverfahrenFormularOpen = computed(
  () => openForm.value === AbfrageFormType.ABFRAGEVARIANTE_BAUGENEHMIGUNGSVERFAHREN,
);
const isAbfragevarianteWeiteresVerfahrenFormularOpen = computed(
  () => openForm.value === AbfrageFormType.ABFRAGEVARIANTE_WEITERES_VERFAHREN,
);
const isBauabschnittFormularOpen = computed(() => openForm.value === AbfrageFormType.BAUABSCHNITT);
const isBaugebietBauleitplanverfahrenFormularOpen = computed(
  () => openForm.value === AbfrageFormType.BAUGEBIET_BAULEITPLANVERFAHREN,
);
const isBaugebietBaugenehmigungsverfahrenFormularOpen = computed(
  () => openForm.value === AbfrageFormType.BAUGEBIET_BAUGENEHMIGUNGSVERFAHREN,
);
const isBaugebietWeiteresVerfahrenFormularOpen = computed(
  () => openForm.value === AbfrageFormType.BAUGEBIET_WEITERES_VERFAHREN,
);
const isBaurateFormularOpen = computed(() => openForm.value === AbfrageFormType.BAURATE);

const deleteAbfragevarianteDialogText = computed(() => {
  const item = treeItemToDelete.value;
  if (item) {
    let name: string | undefined;
    if (isAbfragevarianteBaugenehmigungsverfahren(item, item.value)) {
      name = item.value.getAbfragevariantenNrForContextAnzeigeAbfragevariante(item.context);
    } else if (isAbfragevarianteBauleitplanverfahren(item, item.value)) {
      name = item.value.getAbfragevariantenNrForContextAnzeigeAbfragevariante(item.context);
    } else if (isAbfragevarianteWeiteresVerfahren(item, item.value)) {
      name = item.value.getAbfragevariantenNrForContextAnzeigeAbfragevariante(item.context);
    }
    if (name) {
      return `Hiermit wird die Abfragevariante Nr. ${name} und alle dazugehörigen Angaben unwiderruflich gelöscht.`;
    }
  }
  return "Hiermit wird die Abfragevariante und alle dazugehörigen Angaben unwiderruflich gelöscht.";
});

const deleteBauabschnittDialogText = computed(() => {
  const item = treeItemToDelete.value;
  if (item && isBauabschnitt(item, item.value) && item.value.bezeichnung) {
    return `Hiermit wird der Bauabschnitt "${item.value.bezeichnung}" und alle dazugehörigen Baugebiete unwiderruflich gelöscht.`;
  }
  return "Hiermit wird der Bauabschnitt und alle dazugehörigen Baugebiete unwiderruflich gelöscht.";
});

const deleteBaugebietDialogText = computed(() => {
  const item = treeItemToDelete.value;
  if (item && isBaugebiet(item, item.value) && item.value.bezeichnung) {
    return `Hiermit wird das Baugebiet "${item.value.bezeichnung}" und alle dazugehörigen Bauraten unwiderruflich gelöscht.`;
  }
  return "Hiermit wird das Baugebiet und alle dazugehörigen Bauraten unwiderruflich gelöscht.";
});

const deleteBaurateDialogText = computed(() => {
  const item = treeItemToDelete.value;
  if (item && isBaurate(item, item.value) && item.value.jahr) {
    return `Hiermit wird die Baurate für das Jahr ${item.value.jahr} unwiderruflich gelöscht.`;
  }
  return "Hiermit wird die Baurate unwiderruflich gelöscht.";
});

watch(
  abfrage,
  () => {
    searchStore.setSelectedAbfrage(abfrage.value);
  },
  { deep: true, immediate: true },
);

watch(
  () => abfrage.value.bauvorhaben,
  async (id) => {
    if (id) {
      const dto = await getBauvorhabenById(id);
      relevanteAbfragevarianteId.value = dto.relevanteAbfragevariante;
    }
  },
);

watch(
  () => foerdermixStore.zuUebernehmenderFoerdermix,
  () => {
    if (
      !_.isNil(foerdermixStore.zuUebernehmenderFoerdermix) &&
      !_.isNil(foerdermixStore.zuUbernehmendeAbfragevarianteId)
    ) {
      foedermixUebernehmen(abfrage.value);
    }
  },
  { immediate: true },
);

onBeforeMount(async () => {
  isNew.value = abfrageId === undefined;
  await resetAbfrage();
});

async function resetAbfrage(): Promise<void> {
  if (isNew.value) {
    if (isBauleitplanverfahren.value) {
      abfrage.value = new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
    } else if (isBaugenehmigungsverfahren.value) {
      abfrage.value = new BaugenehmigungsverfahrenModel(createBaugenehmigungsverfahrenDto());
    } else if (isWeiteresVerfahren.value) {
      abfrage.value = new WeiteresVerfahrenModel(createWeiteresVerfahrenDto());
    }
  } else {
    try {
      const dto = await getById(abfrageId);
      if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
        abfrage.value = new BauleitplanverfahrenModel(dto);
      } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
        abfrage.value = new BaugenehmigungsverfahrenModel(dto);
      } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
        abfrage.value = new WeiteresVerfahrenModel(dto);
      }
    } catch {
      searchStore.setSelectedAbfrage(undefined);
    }
    possibleTransitions.value = await getTransitions(abfrageId);
  }
  selectAbfrage();
}

function deleteAbfrage(): void {
  isDeleteDialogAbfrageOpen.value = true;
}

function statusUebergang(transition: TransitionDto): void {
  currentTransition = transition;
  anmerkungMaxLength.value = 0;
  dialogTextStatus.value = transition.dialogText as string;

  if (transition.url === TRANSITION_URL_ERLEDIGT_OHNE_FACHREFERAT) {
    // Verfügbare Zeichen = (maximale Zeichenanzahl) - (benutzte Zeichen) - (Zeilenumbruch)
    const availableLength = 1000 - (abfrage.value.anmerkung?.length ?? 0) - 1;
    if (availableLength > 0) {
      anmerkungMaxLength.value = availableLength;
      dialogTextStatus.value += " Sie können eine Anmerkung hinzufügen.";
    } else {
      dialogTextStatus.value += " Für eine Anmerkung gibt es im Anmerkungsfeld nicht mehr genug Platz.";
    }
  }

  isStatusUebergangDialogOpen.value = true;
}

function changeAnmkerung(test: string): void {
  anmerkung = test;
}

function yesNoDialogDeleteAbfrageYes(): void {
  deleteBauleitplanverfahren();
  yesNoDialogDeleteAbfrageNo();
}

function yesNoDialogDeleteAbfrageNo(): void {
  isDeleteDialogAbfrageOpen.value = false;
}

async function yesNoDialogStatusUebergangYes(): Promise<void> {
  if (!_.isNil(currentTransition)) {
    await startStatusUebergang(currentTransition);
  }
  yesNoDialogStatusUebergangeNo();
}

function yesNoDialogStatusUebergangeNo(): void {
  isStatusUebergangDialogOpen.value = false;
  yesNoDialogStatusuebergang.value?.resetTextarea();
  anmerkung = "";
}

function yesNoDialogAbfragevarianteYes(): void {
  removeAbfragevarianteFromAbfrage();
  yesNoDialogAbfragevarianteNo();
}

function yesNoDialogAbfragevarianteNo(): void {
  isDeleteDialogAbfragevarianteOpen.value = false;
}

async function deleteBauleitplanverfahren(): Promise<void> {
  await deleteById(abfrageId);
  searchStore.removeSearchResultById(abfrageId);
  returnToUebersicht("Die Abfrage wurde erfolgreich gelöscht", TYPE.SUCCESS);
}

function yesNoDialogBauabschnittYes(): void {
  removeBauabschnittFromAbfragevariante();
  yesNoDialogBauabschnittNo();
}

function yesNoDialogBauabschnittNo(): void {
  isDeleteDialogBauabschnittOpen.value = false;
}

function yesNoDialogBaugebietYes(): void {
  removeBaugebietFromBauabschnitt();
  yesNoDialogBaugebietNo();
}

function yesNoDialogBaugebietNo(): void {
  isDeleteDialogBaugebietOpen.value = false;
}

function yesNoDialogBaurateYes(): void {
  removeBaurateFromBaugebiet();
  yesNoDialogBaurateNo();
}

function yesNoDialogBaurateNo(): void {
  isDeleteDialogBaurateOpen.value = false;
}

async function yesNoDialogRelevanteAbfragevarianteYes(): Promise<void> {
  if (relevanteAbfragevarianteToBeSet) {
    await setRelevanteAbfragevariante(null);
    await setRelevanteAbfragevariante(relevanteAbfragevarianteToBeSet);
  }
  yesNoDialogRelevanteAbfragevarianteNo();
}

function yesNoDialogRelevanteAbfragevarianteNo(): void {
  isRelevanteAbfragevarianteDialogOpen.value = false;
}

async function saveAbfrage(): Promise<void> {
  if ((await form.value?.validate())?.valid) {
    const validationMessage: string | null = findFaultInAbfrageForSave(abfrage.value);
    if (_.isNil(validationMessage)) {
      if (isNew.value) {
        handleSave(abfrage.value);
      } else if (isEditableByAbfrageerstellung.value) {
        handlePatchAngelegt(abfrage.value);
      } else if (isEditableBySachbearbeitung.value) {
        handlePatchInBearbeitungSachbearbeitung(abfrage.value);
      } else if (isEditableByBedarfsmeldung.value) {
        handlePatchInBearbeitungFachreferat(abfrage.value);
      } else if (isBedarfsmeldungEditableByAbfrageerstellung.value) {
        handlePatchBedarfsmeldungErfolgt(abfrage.value);
      }
    } else {
      toast.error(validationMessage, { timeout: false });
    }
  } else {
    toast.error("Es gibt noch Validierungsfehler");
  }
}

async function handleSave(model: AnyAbfrageModel): Promise<void> {
  let abfrageAngelegtDto:
    | BauleitplanverfahrenAngelegtDto
    | BaugenehmigungsverfahrenAngelegtDto
    | WeiteresVerfahrenAngelegtDto
    | undefined = undefined;
  if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfrageAngelegtDto = mapToBauleitplanverfahrenAngelegt(model);
  } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfrageAngelegtDto = mapToBaugenehmigungsverfahrenAngelegt(model);
  } else {
    abfrageAngelegtDto = mapToWeiteresVerfahrenAngelegt(model);
  }
  const dto = await save(abfrageAngelegtDto);
  handleSuccess(dto, true);
}

async function handlePatchAngelegt(model: AnyAbfrageModel): Promise<void> {
  let abfrageAngelegtDto:
    | BauleitplanverfahrenAngelegtDto
    | BaugenehmigungsverfahrenAngelegtDto
    | WeiteresVerfahrenAngelegtDto
    | undefined = undefined;
  if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfrageAngelegtDto = mapToBauleitplanverfahrenAngelegt(model);
  } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfrageAngelegtDto = mapToBaugenehmigungsverfahrenAngelegt(model);
  } else {
    abfrageAngelegtDto = mapToWeiteresVerfahrenAngelegt(model);
  }
  const dto = await patchAngelegt(abfrageAngelegtDto, abfrageId);
  handleSuccess(dto, true);
}

async function handlePatchInBearbeitungSachbearbeitung(model: AnyAbfrageModel): Promise<void> {
  let abfrageInBearbeitungSachbearbeitungDto:
    | BauleitplanverfahrenInBearbeitungSachbearbeitungDto
    | BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
    | WeiteresVerfahrenInBearbeitungSachbearbeitungDto
    | undefined = undefined;
  if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfrageInBearbeitungSachbearbeitungDto = mapToBauleitplanverfahrenInBearbeitungSachbearbeitungDto(model);
  } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfrageInBearbeitungSachbearbeitungDto = mapToBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto(model);
  } else {
    abfrageInBearbeitungSachbearbeitungDto = mapToWeiteresVerfahrenInBearbeitungSachbearbeitungDto(model);
  }
  const dto = await patchInBearbeitungSachbearbeitung(abfrageInBearbeitungSachbearbeitungDto, abfrageId);
  handleSuccess(dto, true);
}

async function handlePatchInBearbeitungFachreferat(model: AnyAbfrageModel): Promise<void> {
  let abfrageInBearbeitungFachreferatDto:
    | BauleitplanverfahrenInBearbeitungFachreferatDto
    | BaugenehmigungsverfahrenInBearbeitungFachreferatDto
    | WeiteresVerfahrenInBearbeitungFachreferatDto
    | undefined = undefined;
  if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfrageInBearbeitungFachreferatDto = mapToBauleitplanverfahrenInBearbeitungFachreferatDto(model);
  } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfrageInBearbeitungFachreferatDto = mapToBaugenehmigungsverfahrenInBearbeitungFachreferatDto(model);
  } else {
    abfrageInBearbeitungFachreferatDto = mapToWeiteresVerfahrenInBearbeitungFachreferatDto(model);
  }
  const dto = await patchInBearbeitungFachreferat(abfrageInBearbeitungFachreferatDto, abfrageId);
  handleSuccess(dto, true);
}

async function handlePatchBedarfsmeldungErfolgt(model: AnyAbfrageModel): Promise<void> {
  let abfrageBedarfsmeldungErfolgtDto:
    | BauleitplanverfahrenBedarfsmeldungErfolgtDto
    | BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto
    | WeiteresVerfahrenBedarfsmeldungErfolgtDto
    | undefined = undefined;
  if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfrageBedarfsmeldungErfolgtDto = mapToBauleitplanverfahrenBedarfsmeldungErfolgtDto(model);
  } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfrageBedarfsmeldungErfolgtDto = mapToBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto(model);
  } else {
    abfrageBedarfsmeldungErfolgtDto = mapToWeiteresVerfahrenBedarfsmeldungErfolgtDto(model);
  }
  const dto = await patchBedarfsmeldungErfolgt(abfrageBedarfsmeldungErfolgtDto, abfrageId);
  handleSuccess(dto, true);
}

function handleSuccess(dto: AnyAbfrageDto, showToast: boolean): void {
  if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfrage.value = new BauleitplanverfahrenModel(dto);
  } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfrage.value = new BaugenehmigungsverfahrenModel(dto);
  } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
    abfrage.value = new WeiteresVerfahrenModel(dto);
  }
  if (isNew.value) {
    router.push("/");
    toast.success(`Die Abfrage wurde erfolgreich gespeichert`);
  } else if (showToast) {
    toast.success(`Die Abfrage wurde erfolgreich aktualisiert`);
  }
  selectAbfrage();
}

async function startStatusUebergang(transition: TransitionDto) {
  if (!isFormDirty.value) {
    if ((await form.value?.validate())?.valid) {
      let toastMessage = "Die Abfrage hatte einen erfolgreichen Statuswechsel";
      if (transition.url === TRANSITION_URL_ERLEDIGT_OHNE_FACHREFERAT) {
        toastMessage = "Die Abfrage wird ohne Einbindung der Fachreferate abgeschlossen";
      }
      const validationMessage: string | null = findFaultInAbfrageForSave(abfrage.value);
      if (_.isNil(validationMessage)) {
        const response = await statusUebergangRequest(transition, abfrageId, anmerkung);
        if (response.ok) {
          if (transition.url !== "in-bearbeitung-setzen") {
            returnToUebersicht(toastMessage, TYPE.SUCCESS);
          } else {
            resetAbfrage();
          }
        }
      } else {
        toast.error(validationMessage, { timeout: false });
      }
    } else {
      toast.error("Es gibt noch Validierungsfehler");
    }
  } else {
    toast.error("Bitte speichern vor einem Statusübergang");
  }
}

async function setRelevanteAbfragevariante(abfragevariante: AnyAbfragevarianteModel | null): Promise<void> {
  if (_.isNil(abfragevariante)) {
    const bauvorhabenId = abfrage.value.bauvorhaben;
    if (bauvorhabenId) {
      const bauvorhaben = await getBauvorhabenById(bauvorhabenId);
      const relevanteAbfragevariante = bauvorhaben.relevanteAbfragevariante;
      if (relevanteAbfragevariante) {
        await changeRelevanteAbfragevariante(relevanteAbfragevariante);
      }
    }
    return;
  }

  if (abfragevariante.id) {
    const result = await changeRelevanteAbfragevariante(abfragevariante.id);
    if (typeof result !== "string") {
      const relevanteId = result.relevanteAbfragevariante;
      relevanteAbfragevarianteId.value = relevanteId;
      toast.success(
        `Die Abfragevariante ${abfragevariante.name} in Abfrage ${abfrage.value.displayName} ist nun ${
          relevanteId ? "relevant" : "nicht mehr relevant"
        }.`,
      );
    } else {
      relevanteAbfragevarianteToBeSet = abfragevariante;
      if (
        result ===
        "Die Abfrage ist keinem Bauvorhaben zugeordnet. Somit kann keine Abfragevariante als relevant markiert werden."
      ) {
        relevanteAbfragevarianteDialogText.value = result;
        relevanteAbfragevarianteYesButtonText.value = "Ok";
      } else {
        relevanteAbfragevarianteDialogText.value = result + " " + RELEVANTE_ABFRAGEVARIANTE_DIALOG_TEXT_BASE;
        relevanteAbfragevarianteYesButtonText.value = "Überschreiben";
      }
      isRelevanteAbfragevarianteDialogOpen.value = true;
    }
  } else {
    toast.error("Bitte speichern vor Relevantsetzung einer Abfragevariante");
  }
}

function returnToUebersicht(message?: string, type?: TYPE): void {
  if (message && type) {
    toast(message, { type });
  }
  router.push("/");
}

function handleSelectAbfrage(): void {
  selectAbfrage();
}

function handleSelectAbfragevariante(item: AbfrageTreeItem): void {
  selectItem(item);
}

function handleSelectBauabschnitt(item: AbfrageTreeItem): void {
  selectItem(item);
}

function handleSelectBaugebiet(item: AbfrageTreeItem): void {
  const abfragevariante = getFirstAncestorOfTypeAbfragevariante(item);

  if (abfragevariante) {
    abfragevarianteAncestor.value = abfragevariante;
    selectItem(item);
  }
}

function handleSelectBaurate(item: AbfrageTreeItem): void {
  const abfragevariante = getFirstAncestorOfTypeAbfragevariante(item);
  const baugebiet = getFirstAncestorOfTypeBaugebiet(item);

  if (abfragevariante && baugebiet) {
    abfragevarianteAncestor.value = abfragevariante;
    baugebietAncestor.value = baugebiet;
    selectItem(item);
  }
}

function handleCreateAbfragevariante(parent: AbfrageTreeItem): void {
  const abfragevariante = createAbfragevarianteModel();
  if (!_.isNil(abfragevariante)) {
    if (isBauleitplanverfahren.value) {
      (abfrage.value as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren?.push(abfragevariante);
      renumberingAbfragevarianten((abfrage.value as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren);
    } else if (isBaugenehmigungsverfahren.value) {
      (abfrage.value as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren?.push(abfragevariante);
      renumberingAbfragevarianten(
        (abfrage.value as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren,
      );
    } else {
      (abfrage.value as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren?.push(abfragevariante);
      renumberingAbfragevarianten((abfrage.value as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren);
    }
    formChanged();
    selectCreatedEntity(
      abfragevariante,
      getAbfrageFormTypeAbfragevariante(abfragevariante),
      parent,
      AnzeigeContextAbfragevariante.ABFRAGEVARIANTE,
    );
  }
}

function handleCreateAbfragevarianteSachbearbeitung(parent: AbfrageTreeItem): void {
  const abfragevariante = createAbfragevarianteModel();
  if (!_.isNil(abfragevariante)) {
    if (isBauleitplanverfahren.value) {
      (abfrage.value as BauleitplanverfahrenModel).abfragevariantenSachbearbeitungBauleitplanverfahren?.push(
        abfragevariante,
      );
      renumberingAbfragevarianten(
        (abfrage.value as BauleitplanverfahrenModel).abfragevariantenSachbearbeitungBauleitplanverfahren,
      );
    } else if (isBaugenehmigungsverfahren.value) {
      (abfrage.value as BaugenehmigungsverfahrenModel).abfragevariantenSachbearbeitungBaugenehmigungsverfahren?.push(
        abfragevariante,
      );
      renumberingAbfragevarianten(
        (abfrage.value as BaugenehmigungsverfahrenModel).abfragevariantenSachbearbeitungBaugenehmigungsverfahren,
      );
    } else {
      (abfrage.value as WeiteresVerfahrenModel).abfragevariantenSachbearbeitungWeiteresVerfahren?.push(abfragevariante);
      renumberingAbfragevarianten(
        (abfrage.value as WeiteresVerfahrenModel).abfragevariantenSachbearbeitungWeiteresVerfahren,
      );
    }
    formChanged();
    selectCreatedEntity(
      abfragevariante,
      getAbfrageFormTypeAbfragevariante(abfragevariante),
      parent,
      AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG,
    );
  }
}

function getAbfrageFormTypeAbfragevariante(abfragevariante: AnyAbfragevarianteModel): AbfrageFormType {
  if (
    abfragevariante.artAbfragevariante ===
    AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren
  ) {
    return AbfrageFormType.ABFRAGEVARIANTE_BAULEITPLANVERFAHREN;
  } else if (
    abfragevariante.artAbfragevariante ===
    AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum.Baugenehmigungsverfahren
  ) {
    return AbfrageFormType.ABFRAGEVARIANTE_BAUGENEHMIGUNGSVERFAHREN;
  } else {
    return AbfrageFormType.ABFRAGEVARIANTE_WEITERES_VERFAHREN;
  }
}

function createAbfragevarianteModel(): AnyAbfragevarianteModel | undefined {
  if (isBauleitplanverfahren.value) {
    return new AbfragevarianteBauleitplanverfahrenModel(createAbfragevarianteBauleitplanverfahrenDto());
  } else if (isBaugenehmigungsverfahren.value) {
    return new AbfragevarianteBaugenehmigungsverfahrenModel(createAbfragevarianteBaugenehmigungsverfahrenDto());
  } else if (isWeiteresVerfahren.value) {
    return new AbfragevarianteWeiteresVerfahrenModel(createAbfragevarianteWeiteresVerfahrenDto());
  } else {
    return undefined;
  }
}

function handleCreateBauabschnitt(parent: AbfrageTreeItem): void {
  const abfragevariante = parent.value;
  if (
    isAbfragevarianteBauleitplanverfahren(parent, abfragevariante) ||
    isAbfragevarianteBaugenehmigungsverfahren(parent, abfragevariante) ||
    isAbfragevarianteWeiteresVerfahren(parent, abfragevariante)
  ) {
    if (_.isNil(abfragevariante.bauabschnitte)) {
      abfragevariante.bauabschnitte = [];
    }

    const bauabschnitt = new BauabschnittModel(createBauabschnittDto());
    abfragevariante.bauabschnitte.push(bauabschnitt);
    formChanged();
    selectCreatedEntity(bauabschnitt, AbfrageFormType.BAUABSCHNITT, parent, parent.context);
  }
}

function handleCreateBaugebiet(parent: AbfrageTreeItem): void {
  let bauabschnitt: BauabschnittModel | undefined;
  if (
    isAbfragevarianteBauleitplanverfahren(parent, parent.value) ||
    isAbfragevarianteBaugenehmigungsverfahren(parent, parent.value) ||
    isAbfragevarianteWeiteresVerfahren(parent, parent.value)
  ) {
    bauabschnitt = getTechnicalBauabschnitt(parent.value);
  } else if (isBauabschnitt(parent, parent.value)) {
    bauabschnitt = parent.value;
  }

  if (bauabschnitt) {
    const baugebiet = new BaugebietModel(createBaugebietDto());
    const abfragevariante = getFirstAncestorOfTypeAbfragevariante(parent)!;
    baugebiet.realisierungVon = abfragevariante.realisierungVon!;
    bauabschnitt.baugebiete.push(baugebiet);
    abfragevarianteAncestor.value = abfragevariante;
    formChanged();
    selectCreatedEntity(baugebiet, getAbfrageFormTypeBaugebiet(abfragevariante), parent, parent.context);
  }
}

function getAbfrageFormTypeBaugebiet(abfragevariante: AnyAbfragevarianteModel): AbfrageFormType {
  if (
    abfragevariante.artAbfragevariante ===
    AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren
  ) {
    return AbfrageFormType.BAUGEBIET_BAULEITPLANVERFAHREN;
  } else if (
    abfragevariante.artAbfragevariante ===
    AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum.Baugenehmigungsverfahren
  ) {
    return AbfrageFormType.BAUGEBIET_BAUGENEHMIGUNGSVERFAHREN;
  } else {
    return AbfrageFormType.BAUGEBIET_WEITERES_VERFAHREN;
  }
}

function handleCreateBaurate(parent: AbfrageTreeItem): void {
  let baugebiet: BaugebietModel | undefined;
  if (
    isAbfragevarianteBauleitplanverfahren(parent, parent.value) ||
    isAbfragevarianteBaugenehmigungsverfahren(parent, parent.value) ||
    isAbfragevarianteWeiteresVerfahren(parent, parent.value)
  ) {
    baugebiet = getTechnicalBaugebiet(parent.value);
  } else if (isBaugebiet(parent, parent.value)) {
    baugebiet = parent.value;
  }

  if (baugebiet) {
    const baurate = new BaurateModel(createBaurateDto());
    const abfragevariante = getFirstAncestorOfTypeAbfragevariante(parent)!;
    baugebiet.bauraten.push(baurate);
    abfragevarianteAncestor.value = abfragevariante;
    baugebietAncestor.value = baugebiet;
    formChanged();
    selectCreatedEntity(baurate, AbfrageFormType.BAURATE, parent, parent.context);
  }
}

function handleDeleteAbfragevariante(item: AbfrageTreeItem): void {
  treeItemToDelete.value = item;
  isDeleteDialogAbfragevarianteOpen.value = true;
}

function handleDeleteBauabschnitt(item: AbfrageTreeItem): void {
  treeItemToDelete.value = item;
  isDeleteDialogBauabschnittOpen.value = true;
}

function handleDeleteBaugebiet(item: AbfrageTreeItem): void {
  treeItemToDelete.value = item;
  isDeleteDialogBaugebietOpen.value = true;
}

function handleDeleteBaurate(item: AbfrageTreeItem): void {
  treeItemToDelete.value = item;
  isDeleteDialogBaurateOpen.value = true;
}

function removeAbfragevarianteFromAbfrage(): void {
  if (
    treeItemToDelete.value &&
    (isAbfragevarianteBauleitplanverfahren(treeItemToDelete.value, treeItemToDelete.value.value) ||
      isAbfragevarianteBaugenehmigungsverfahren(treeItemToDelete.value, treeItemToDelete.value.value) ||
      isAbfragevarianteWeiteresVerfahren(treeItemToDelete.value, treeItemToDelete.value.value))
  ) {
    const context = treeItemToDelete.value.context;

    let abfragevarianten = undefined;
    if (isBauleitplanverfahren.value) {
      abfragevarianten = (abfrage.value as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren;
    } else if (isBaugenehmigungsverfahren.value) {
      abfragevarianten = (abfrage.value as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren;
    } else {
      abfragevarianten = (abfrage.value as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren;
    }

    let abfragevariantenSachbearbeitung = undefined;
    if (isBauleitplanverfahren.value) {
      abfragevariantenSachbearbeitung = (abfrage.value as BauleitplanverfahrenModel)
        .abfragevariantenSachbearbeitungBauleitplanverfahren;
    } else if (isBaugenehmigungsverfahren.value) {
      abfragevariantenSachbearbeitung = (abfrage.value as BaugenehmigungsverfahrenModel)
        .abfragevariantenSachbearbeitungBaugenehmigungsverfahren;
    } else {
      abfragevariantenSachbearbeitung = (abfrage.value as WeiteresVerfahrenModel)
        .abfragevariantenSachbearbeitungWeiteresVerfahren;
    }

    const abfragevariantenContext =
      context === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE ? abfragevarianten! : abfragevariantenSachbearbeitung!;
    _.remove(abfragevariantenContext, (abfragevariante) => abfragevariante === treeItemToDelete.value!.value);
    renumberingAbfragevarianten(abfragevariantenContext);
    formChanged();
    selectItem(treeItemToDelete.value.parent!);
    treeItemToDelete.value = undefined;
  }
}

function removeBauabschnittFromAbfragevariante(): void {
  if (treeItemToDelete.value && isBauabschnitt(treeItemToDelete.value, treeItemToDelete.value.value)) {
    const abfragevariante = getFirstAncestorOfTypeAbfragevariante(treeItemToDelete.value);
    if (abfragevariante && abfragevariante.bauabschnitte) {
      _.remove(abfragevariante.bauabschnitte, (bauabschnitt) => bauabschnitt === treeItemToDelete.value!.value);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      abfragevariante.bauabschnitte = [...abfragevariante.bauabschnitte];
      formChanged();
      selectItem(treeItemToDelete.value.parent!);
      treeItemToDelete.value = undefined;
    }
  }
}

function removeBaugebietFromBauabschnitt(): void {
  if (treeItemToDelete.value && isBaugebiet(treeItemToDelete.value, treeItemToDelete.value.value)) {
    const bauabschnitt = getFirstAncestorOfTypeBauabschnitt(treeItemToDelete.value);
    if (bauabschnitt) {
      _.remove(bauabschnitt.baugebiete, (baugebiet) => baugebiet === treeItemToDelete.value!.value);
      clearTechnicalEntities(getFirstAncestorOfTypeAbfragevariante(treeItemToDelete.value)!);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      bauabschnitt.baugebiete = [...bauabschnitt.baugebiete];
      formChanged();
      selectItem(treeItemToDelete.value.parent!);
      treeItemToDelete.value = undefined;
    }
  }
}

function removeBaurateFromBaugebiet(): void {
  if (treeItemToDelete.value && isBaurate(treeItemToDelete.value, treeItemToDelete.value.value)) {
    const baugebiet = getFirstAncestorOfTypeBaugebiet(treeItemToDelete.value);
    if (baugebiet) {
      _.remove(baugebiet.bauraten, (baurate) => baurate === treeItemToDelete.value!.value);
      clearTechnicalEntities(getFirstAncestorOfTypeAbfragevariante(treeItemToDelete.value)!);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      baugebiet.bauraten = [...baugebiet.bauraten];
      formChanged();
      selectItem(treeItemToDelete.value.parent!);
      treeItemToDelete.value = undefined;
    }
  }
}

async function handleSetAbfragevarianteRelevant(item: AbfrageTreeItem): Promise<void> {
  const abfragevariante = item.value;
  if (
    isAbfragevarianteBauleitplanverfahren(item, abfragevariante) ||
    isAbfragevarianteBaugenehmigungsverfahren(item, abfragevariante) ||
    isAbfragevarianteWeiteresVerfahren(item, abfragevariante)
  ) {
    await setRelevanteAbfragevariante(abfragevariante);
  }
}

async function handleDetermineBauratenForAbfragevariante(item: AbfrageTreeItem): Promise<void> {
  const abfragevariante = item.value;

  if (
    isAbfragevarianteBauleitplanverfahren(item, abfragevariante) ||
    isAbfragevarianteBaugenehmigungsverfahren(item, abfragevariante) ||
    isAbfragevarianteWeiteresVerfahren(item, abfragevariante)
  ) {
    const bauraten = await determineBauraten(
      abfragevariante.realisierungVon!,
      abfragevariante.weGesamt,
      abfragevariante.gfWohnenGesamt,
    );
    const technicalBaugebiet = getTechnicalBaugebiet(abfragevariante);
    if (abfragevariante.bauabschnitte && !_.isNil(technicalBaugebiet)) {
      technicalBaugebiet.bauraten = bauraten.map((baurate: BaurateDto) => new BaurateModel(baurate));
      abfragevariante.bauabschnitte[0].baugebiete = [technicalBaugebiet];
      formChanged();
    }
  }
}

async function handleDetermineBauratenForBaugebiet(item: AbfrageTreeItem): Promise<void> {
  const baugebiet = item.value;

  if (isBaugebiet(item, baugebiet)) {
    const bauraten = await determineBauraten(baugebiet.realisierungVon, baugebiet.weGeplant, baugebiet.gfWohnenGeplant);
    baugebiet.bauraten = bauraten.map((baurate: BaurateDto) => new BaurateModel(baurate));
    formChanged();
  }
}

/* Diese "Ancestor"-Methoden sind prinzipiell dafür da, einen Vorfahren von einem bestimmten Typ zu finden.
 * Jedoch können sie auch das übergebene Item selbst zurückgeben, wenn es dem Typen entspricht.
 */

function getFirstAncestorOfTypeAbfragevariante(item: AbfrageTreeItem): AnyAbfragevarianteModel | undefined {
  while (item.parent) {
    if (
      isAbfragevarianteBauleitplanverfahren(item, item.value) ||
      isAbfragevarianteBaugenehmigungsverfahren(item, item.value) ||
      isAbfragevarianteWeiteresVerfahren(item, item.value)
    ) {
      return item.value;
    }
    item = item.parent;
  }

  return undefined;
}

function getFirstAncestorOfTypeBauabschnitt(item: AbfrageTreeItem): BauabschnittModel | undefined {
  if (isBauabschnitt(item, item.value)) {
    return item.value;
  }

  const parent = item.parent;
  if (parent) {
    if (
      isAbfragevarianteBauleitplanverfahren(parent, parent.value) ||
      isAbfragevarianteBaugenehmigungsverfahren(parent, parent.value) ||
      isAbfragevarianteWeiteresVerfahren(parent, parent.value)
    ) {
      return getTechnicalBauabschnitt(parent.value);
    } else if (isBauabschnitt(parent, parent.value)) {
      return parent.value;
    } else if (isBaugebiet(parent, parent.value)) {
      if (parent.parent && isBauabschnitt(parent.parent, parent.parent.value)) {
        return parent.parent.value;
      }
    }
  }

  return undefined;
}

function getFirstAncestorOfTypeBaugebiet(item: AbfrageTreeItem): BaugebietModel | undefined {
  if (isBaugebiet(item, item.value)) {
    return item.value;
  }

  const parent = item.parent;
  if (parent) {
    if (
      isAbfragevarianteBauleitplanverfahren(parent, parent.value) ||
      isAbfragevarianteBaugenehmigungsverfahren(parent, parent.value) ||
      isAbfragevarianteWeiteresVerfahren(parent, parent.value)
    ) {
      return getTechnicalBaugebiet(parent.value);
    } else if (isBaugebiet(parent, parent.value)) {
      return parent.value;
    }
  }

  return undefined;
}

function renumberingAbfragevarianten(
  abfragevarianten:
    | Array<AbfragevarianteBauleitplanverfahrenDto>
    | Array<AbfragevarianteBaugenehmigungsverfahrenDto>
    | Array<AbfragevarianteWeiteresVerfahrenDto>
    | undefined,
): void {
  abfragevarianten?.forEach((value, index) => {
    value.abfragevariantenNr = index + 1;
  });
}

function selectAbfrage(): void {
  if (isBauleitplanverfahren.value) {
    selectEntity(abfrage.value, AbfrageFormType.BAULEITPLANVERFAHREN, "", AnzeigeContextAbfragevariante.UNDEFINED);
  } else if (isBaugenehmigungsverfahren.value) {
    selectEntity(abfrage.value, AbfrageFormType.BAUGENEHMIGUNGSVERFAHREN, "", AnzeigeContextAbfragevariante.UNDEFINED);
  } else if (isWeiteresVerfahren.value) {
    selectEntity(abfrage.value, AbfrageFormType.WEITERES_VERFAHREN, "", AnzeigeContextAbfragevariante.UNDEFINED);
  }
}

function selectItem(item: AbfrageTreeItem): void {
  selectEntity(item.value, item.type, item.id, item.context);
}

function selectCreatedEntity(
  entity: AbfrageDtoWithForm,
  type: AbfrageFormType,
  parent: AbfrageTreeItem,
  context: AnzeigeContextAbfragevariante,
): void {
  // Da das TreeItem zu diesem Zeitpunkt noch nicht existiert, muss die ID "vorhergesagt" werden.
  selectEntity(
    entity,
    type,
    abfrageNavigationTree.value?.generateTreeItemId(parent.id, parent.children.length),
    context,
  );
}

function selectEntity(
  entity: AbfrageDtoWithForm,
  type: AbfrageFormType,
  itemId: string,
  context: AnzeigeContextAbfragevariante,
): void {
  anzeigeContextAbfragevariante.value = context;
  selected.value = entity;
  openForm.value = type;
  selectedTreeItemId.value = itemId;
  window.scrollTo(0, 0);
}

function isAbfragevarianteBauleitplanverfahren(
  item: AbfrageTreeItem,
  value: AbfrageDtoWithForm,
): value is AbfragevarianteBauleitplanverfahrenModel {
  return item.type === AbfrageFormType.ABFRAGEVARIANTE_BAULEITPLANVERFAHREN;
}

function isAbfragevarianteBaugenehmigungsverfahren(
  item: AbfrageTreeItem,
  value: AbfrageDtoWithForm,
): value is AbfragevarianteBaugenehmigungsverfahrenModel {
  return item.type === AbfrageFormType.ABFRAGEVARIANTE_BAUGENEHMIGUNGSVERFAHREN;
}

function isAbfragevarianteWeiteresVerfahren(
  item: AbfrageTreeItem,
  value: AbfrageDtoWithForm,
): value is AbfragevarianteWeiteresVerfahrenModel {
  return item.type === AbfrageFormType.ABFRAGEVARIANTE_WEITERES_VERFAHREN;
}

function isBauabschnitt(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is BauabschnittModel {
  return item.type === AbfrageFormType.BAUABSCHNITT;
}

function isBaugebiet(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is BaugebietModel {
  return (
    item.type === AbfrageFormType.BAUGEBIET_BAULEITPLANVERFAHREN ||
    item.type === AbfrageFormType.BAUGEBIET_BAUGENEHMIGUNGSVERFAHREN ||
    item.type === AbfrageFormType.BAUGEBIET_WEITERES_VERFAHREN
  );
}

function isBaurate(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is BaurateModel {
  return item.type === AbfrageFormType.BAURATE;
}

/**
 * Ermittelt oder erstellt bei Bedarf einen Platzhalter-Bauabschnitt für "alleinstehende" Baugebiete und -raten.
 */
function getTechnicalBauabschnitt(abfragevariante: AnyAbfragevarianteModel): BauabschnittModel | undefined {
  let bauabschnitt: BauabschnittModel | undefined;

  if (!_.isNil(abfragevariante.bauabschnitte)) {
    bauabschnitt = abfragevariante.bauabschnitte[0];
  } else {
    abfragevariante.bauabschnitte = [];
  }

  if (_.isNil(bauabschnitt)) {
    bauabschnitt = new BauabschnittModel(createTechnicalBauabschnittDto());
    abfragevariante.bauabschnitte.push(bauabschnitt);
  }

  if (bauabschnitt.technical) {
    return bauabschnitt;
  } else {
    return undefined;
  }
}

/**
 * Ermittelt oder erstellt bei Bedarf ein Platzhalter-Baugebiet für "alleinstehende" Bauraten.
 */
function getTechnicalBaugebiet(abfragevariante: AnyAbfragevarianteModel): BaugebietModel | undefined {
  const bauabschnitt = getTechnicalBauabschnitt(abfragevariante);

  if (!_.isNil(bauabschnitt)) {
    let baugebietDto = bauabschnitt.baugebiete[0];

    if (_.isNil(baugebietDto)) {
      baugebietDto = new BaugebietModel(createTechnicalBaugebietDto());
      bauabschnitt.baugebiete.push(baugebietDto);
    }

    if (baugebietDto.technical) {
      baugebietDto.realisierungVon = abfragevariante.realisierungVon!;
      return baugebietDto;
    }
  }

  return undefined;
}

/**
 * Soll nach dem Löschen von Baugebieten und -raten aufgerufen werden, um Platzhalter ohne Kinder zu beseitigen.
 */
function clearTechnicalEntities(abfragevariante: AnyAbfragevarianteModel): void {
  if (!_.isNil(abfragevariante.bauabschnitte)) {
    const bauabschnittIndex = abfragevariante.bauabschnitte.findIndex((dto) => dto.technical);

    if (bauabschnittIndex !== -1) {
      const bauabschnitt = abfragevariante.bauabschnitte[bauabschnittIndex];
      const baugebietIndex = bauabschnitt?.baugebiete.findIndex((dto) => dto.technical);

      if (baugebietIndex !== -1) {
        const baugebiet = bauabschnitt.baugebiete[baugebietIndex];
        if (baugebiet.bauraten.length === 0) {
          bauabschnitt.baugebiete.splice(baugebietIndex, 1);
        }
      }

      if (bauabschnitt.baugebiete.length === 0) {
        abfragevariante.bauabschnitte.splice(bauabschnittIndex, 1);
      }
    }
  }
}

function abfrageUebernehmen(value: AbfrageDto): void {
  abfrage.value = copyAbfrage(value);
  if (value.artAbfrage) {
    suggestedArtAbfrage.value = value.artAbfrage;
  }
  selectAbfrage();
  formChanged();
  isDataTransferDialogOpen.value = false;
}

function foedermixUebernehmen(value: AbfrageDto): AbfrageModel {
  if (isBauleitplanverfahren.value) {
    (value as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren?.forEach((abfragevariante) => {
      if (abfragevariante.id === foerdermixStore.zuUbernehmendeAbfragevarianteId) {
        abfragevariante.bauabschnitte?.forEach((bauabschnitt) => {
          bauabschnitt.baugebiete.forEach((baugebiet) => {
            baugebiet.bauraten.forEach((baurate) => {
              baurate.foerdermix = foerdermixStore.zuUebernehmenderFoerdermix as FoerdermixDto;
            });
          });
        });
      }
    });

    (value as BauleitplanverfahrenModel).abfragevariantenSachbearbeitungBauleitplanverfahren?.forEach(
      (abfragevariante) => {
        if (abfragevariante.id === foerdermixStore.zuUbernehmendeAbfragevarianteId) {
          abfragevariante.bauabschnitte?.forEach((bauabschnitt) => {
            bauabschnitt.baugebiete.forEach((baugebiet) => {
              baugebiet.bauraten.forEach((baurate) => {
                baurate.foerdermix = foerdermixStore.zuUebernehmenderFoerdermix as FoerdermixDto;
              });
            });
          });
        }
      },
    );

    if (isBaugenehmigungsverfahren.value) {
      (value as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren?.forEach((abfragevariante) => {
        if (abfragevariante.id === foerdermixStore.zuUbernehmendeAbfragevarianteId) {
          abfragevariante.bauabschnitte?.forEach((bauabschnitt) => {
            bauabschnitt.baugebiete.forEach((baugebiet) => {
              baugebiet.bauraten.forEach((baurate) => {
                baurate.foerdermix = foerdermixStore.zuUebernehmenderFoerdermix as FoerdermixDto;
              });
            });
          });
        }
      });

      (value as BaugenehmigungsverfahrenModel).abfragevariantenSachbearbeitungBaugenehmigungsverfahren?.forEach(
        (abfragevariante) => {
          if (abfragevariante.id === foerdermixStore.zuUbernehmendeAbfragevarianteId) {
            abfragevariante.bauabschnitte?.forEach((bauabschnitt) => {
              bauabschnitt.baugebiete.forEach((baugebiet) => {
                baugebiet.bauraten.forEach((baurate) => {
                  baurate.foerdermix = foerdermixStore.zuUebernehmenderFoerdermix as FoerdermixDto;
                });
              });
            });
          }
        },
      );
    }

    if (isWeiteresVerfahren.value) {
      (value as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren?.forEach((abfragevariante) => {
        if (abfragevariante.id === foerdermixStore.zuUbernehmendeAbfragevarianteId) {
          abfragevariante.bauabschnitte?.forEach((bauabschnitt) => {
            bauabschnitt.baugebiete.forEach((baugebiet) => {
              baugebiet.bauraten.forEach((baurate) => {
                baurate.foerdermix = foerdermixStore.zuUebernehmenderFoerdermix as FoerdermixDto;
              });
            });
          });
        }
      });
      (value as WeiteresVerfahrenModel).abfragevariantenSachbearbeitungWeiteresVerfahren?.forEach((abfragevariante) => {
        if (abfragevariante.id === foerdermixStore.zuUbernehmendeAbfragevarianteId) {
          abfragevariante.bauabschnitte?.forEach((bauabschnitt) => {
            bauabschnitt.baugebiete.forEach((baugebiet) => {
              baugebiet.bauraten.forEach((baurate) => {
                baurate.foerdermix = foerdermixStore.zuUebernehmenderFoerdermix as FoerdermixDto;
              });
            });
          });
        }
      });
    }
  }
  toast.success("Fördermix wurde für alle Bauraten übernommen.");
  foerdermixStore.uebernehmeWerte(undefined, undefined);

  return value;
}
</script>
