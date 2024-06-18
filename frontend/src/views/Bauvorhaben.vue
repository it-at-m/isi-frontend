<template>
  <v-form ref="form">
    <default-layout>
      <template #heading>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="11"
            >
              <v-text-field
                id="bauvorhaben_nameVorhaben"
                v-model.trim="bauvorhaben.nameVorhaben"
                :rules="[pflichtfeld]"
                maxlength="255"
                validate-on="blur"
                variant="underlined"
                :disabled="!isEditable"
                @update:model-value="formChanged"
              >
                <template #label> Name des Bauvorhabens <span class="text-secondary">*</span> </template>
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="1"
            >
              <benutzerinformationen :benutzerinformationen="bearbeitungsinformationen" />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template #content>
        <bauvorhaben-form
          id="bauvorhaben_bauvorhabenForm_component"
          v-model="bauvorhaben"
          :is-editable="isEditable"
        />
        <kommentare
          v-if="componentSecurity.areKommentareVisible(Context.BAUVORHABEN) && isEditable && !isNew"
          id="bauvorhaben_kommentare"
          :context="Context.BAUVORHABEN"
          :is-editable="isEditable"
        />
      </template>
      <template #action>
        <v-btn
          v-if="!isNew"
          id="bauvorhaben_loeschen_button"
          class="my-4"
          color="primary"
          elevation="1"
          width="200px"
          :disabled="!isEditable"
          @click="deleteDialogOpen = true"
        >
          Löschen
        </v-btn>
        <v-btn
          v-else
          id="bauvorhaben_datenuebernahme_button"
          class="my-4"
          color="primary"
          elevation="1"
          width="200px"
          :disabled="!isEditable"
          @click="dataTransferDialogOpen = true"
        >
          Datenübernahme
        </v-btn>
        <v-spacer />
        <v-btn
          id="bauvorhaben_speichern_button"
          color="secondary"
          elevation="1"
          class="mt-2 px-1"
          style="width: 200px"
          :disabled="(!isNew && !isFormDirty) || containsNotAllowedDokument(bauvorhaben.dokumente) || !isEditable"
          @click="validateAndProceed()"
        >
          {{ isNew ? "Speichern" : "Aktualisieren" }}
        </v-btn>
        <v-btn
          id="bauvorhaben_abbrechen_button"
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
    <yes-no-dialog
      id="bauvorhaben_yes_no_dialog_loeschen"
      v-model="deleteDialogOpen"
      icon="mdi-delete-forever"
      dialogtitle="Hinweis"
      dialogtext="Hiermit wird das Bauvorhaben unwiderruflich gelöscht."
      no-text="Abbrechen"
      yes-text="Löschen"
      @no="deleteDialogOpen = false"
      @yes="removeBauvorhaben()"
    />
    <yes-no-dialog
      id="bauvorhaben_yes_no_dialog_save_leave"
      v-model="saveLeaveDialog"
      :dialogtitle="saveLeaveDialogTitle"
      :dialogtext="saveLeaveDialogText"
      :no-text="saveLeaveNoText"
      :yes-text="saveLeaveYesText"
      @yes="leave"
      @no="cancel"
    />
    <bauvorhaben-data-transfer-dialog
      id="bauvorhaben_datenuebernahme"
      v-model="dataTransferDialogOpen"
      @abfrage-uebernehmen="abfrageUebernehmen($event)"
      @uebernahme-abbrechen="dataTransferDialogOpen = false"
    />
  </v-form>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";
import type { VForm } from "vuetify/components";
import { createAdresseDto, createBauvorhabenDto } from "@/utils/Factories";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import _ from "lodash";
import { pflichtfeld } from "@/utils/FieldValidationRules";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import { findFaultInBauvorhaben } from "@/utils/Validators";
import BauvorhabenForm from "@/components/bauvorhaben/BauvorhabenForm.vue";
import BauvorhabenDataTransferDialog from "@/components/bauvorhaben/BauvorhabenDataTransferDialog.vue";
import {
  type AbfrageDto,
  type BauleitplanverfahrenDto,
  type WeiteresVerfahrenDto,
  AbfrageDtoArtAbfrageEnum,
  BauvorhabenDtoStandVerfahrenEnum,
  UncertainBoolean,
} from "@/api/api-client/isi-backend";
import type { AnyAbfrageDto } from "@/types/common/Abfrage";
import { containsNotAllowedDokument } from "@/utils/DokumenteUtil";
import Kommentare from "@/components/common/kommentar/Kommentare.vue";
import { Context } from "@/utils/Context";
import Benutzerinformationen from "@/components/common/Benutzerinformationen.vue";
import BenutzerinformationenModel from "@/types/model/common/Benutzerinformationen";
import { useSearchStore } from "@/stores/SearchStore";
import { useRoute, useRouter } from "vue-router";
import { useSecurity } from "@/composables/security/Security";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useBauvorhabenApi } from "@/composables/requests/BauvorhabenApi";
import { useToast, TYPE } from "vue-toastification";
import { useComponentSecurity } from "@/composables/security/ComponentSecurity";

const routeId = useRoute().params.id as string;
const router = useRouter();
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
const { isRoleAdminOrSachbearbeitung } = useSecurity();
const { getBauvorhabenById, postBauvorhaben, putBauvorhaben, deleteBauvorhaben } = useBauvorhabenApi();
const searchStore = useSearchStore();
const componentSecurity = useComponentSecurity();
const toast = useToast();
const form = ref<VForm | null>(null);
const isEditable = computed(() => isRoleAdminOrSachbearbeitung.value);
const deleteDialogOpen = ref(false);
const dataTransferDialogOpen = ref(false);
const isNew = ref(true);
const bauvorhaben = ref(new BauvorhabenModel(createBauvorhabenDto()));
let datenuebernahmeAbfrageId: string | undefined = undefined;

const bearbeitungsinformationen = computed(
  () => new BenutzerinformationenModel(bauvorhaben.value.bearbeitendePerson, bauvorhaben.value.lastModifiedDateTime),
);

watch(
  bauvorhaben,
  () => {
    searchStore.setSelectedBauvorhaben(bauvorhaben.value);
  },
  { deep: true },
);

onBeforeMount(() => {
  isNew.value = routeId === undefined;

  if (!isNew.value) {
    fetchBauvorhabenById();
  }
});

/**
 * Löst zuerst eine Validierung des Formulars aus.
 * Ist das Formular valide, wird auf sonstige Mängel überprüft.
 * Gibt es keine sonstigen Mängel, wird entweder das neue Bauvorhaben gespeichert oder das vorhandene Bauvorhaben aktualisiert.
 */
async function validateAndProceed(): Promise<void> {
  if ((await form.value?.validate())?.valid) {
    const fault = findFaultInBauvorhaben(bauvorhaben.value);

    if (fault === null) {
      if (isNew.value) {
        saveBauvorhaben();
      } else {
        updateBauvorhaben();
      }
    } else {
      toast.error(fault, { timeout: false });
    }
  } else {
    toast.error("Es gibt noch Validierungsfehler");
  }
}

/**
 * Schickt eine GET-Anfrage für das ausgewählte Bauvorhaben ans Backend.
 */
async function fetchBauvorhabenById(): Promise<void> {
  const dto = await getBauvorhabenById(routeId);
  bauvorhaben.value = _.cloneDeep(dto);
}

/**
 * Schickt eine POST-Anfrage für das neue Bauvorhaben ans Backend.
 * Bei Erfolg kehrt man zur Bauvorhabenübersicht zurück.
 */
async function saveBauvorhaben(): Promise<void> {
  await postBauvorhaben(bauvorhaben.value, datenuebernahmeAbfrageId);
  returnToUebersicht("Das Bauvorhaben wurde erfolgreich gespeichert", TYPE.SUCCESS);
}

/**
 * Schickt eine PUT-Anfrage für das derzeitige Bauvorhaben ans Backend.
 * Bei Erfolg kehrt man zur Bauvorhabenübersicht zurück.
 */
async function updateBauvorhaben(): Promise<void> {
  const dto = await putBauvorhaben(bauvorhaben.value);
  bauvorhaben.value = _.cloneDeep(dto);
  toast.success("Das Bauvorhaben wurde erfolgreich aktualisiert");
}

/**
 * Schickt eine DELETE-Anfrage für das derzeitige Bauvorhaben ans Backend.
 * Bei Erfolg kehrt man zur Bauvorhabenübersicht zurück.
 */
async function removeBauvorhaben(): Promise<void> {
  deleteDialogOpen.value = false;

  await deleteBauvorhaben(routeId);
  searchStore.removeSearchResultById(routeId);
  returnToUebersicht("Das Bauvorhaben wurde erfolgreich gelöscht", TYPE.SUCCESS);
}

/**
 * Kehrt zur Bauvorhabenübersicht und setzt das im Store zurzeit ausgewählte Bauvorhaben auf undefined.
 * Zeigt dabei optionalerweise auch eine Nachricht per Toaster an.
 *
 * @param message Die anzuzeigende Nachricht. Optional.
 * @param level Das Level der anzuzeigenden Nachricht. Optional, doch obligatorisch in Kombination mit message.
 */
function returnToUebersicht(message?: string, type?: TYPE): void {
  if (message && type) {
    toast(message, { type });
  }

  router.push("/");
}

function abfrageUebernehmen(abfrage: AbfrageDto): void {
  datenuebernahmeAbfrageId = abfrage.id;
  if (abfrage.artAbfrage !== AbfrageDtoArtAbfrageEnum.Unspecified) {
    const verfahren: AnyAbfrageDto = abfrage;
    const newBauvorhaben = _.cloneDeep(bauvorhaben.value);
    newBauvorhaben.adresse = _.isNil(verfahren.adresse) ? createAdresseDto() : _.cloneDeep(verfahren.adresse);
    newBauvorhaben.verortung = _.isNil(verfahren.verortung) ? undefined : _.cloneDeep(verfahren.verortung);
    newBauvorhaben.standVerfahren = verfahren.standVerfahren as BauvorhabenDtoStandVerfahrenEnum;
    newBauvorhaben.standVerfahrenFreieEingabe = verfahren.standVerfahrenFreieEingabe;
    newBauvorhaben.bebauungsplannummer = verfahren.bebauungsplannummer;
    if (verfahren.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      newBauvorhaben.sobonRelevant = UncertainBoolean.Unspecified;
      newBauvorhaben.sobonJahr = undefined;
    } else {
      const verfahrenWithSobonAttribute: BauleitplanverfahrenDto | WeiteresVerfahrenDto = verfahren;
      newBauvorhaben.sobonRelevant = _.isNil(verfahrenWithSobonAttribute.sobonRelevant)
        ? UncertainBoolean.Unspecified
        : verfahrenWithSobonAttribute.sobonRelevant;
      newBauvorhaben.sobonJahr = verfahrenWithSobonAttribute.sobonJahr;
    }
    bauvorhaben.value = newBauvorhaben;
  }
  dataTransferDialogOpen.value = false;
}
</script>
