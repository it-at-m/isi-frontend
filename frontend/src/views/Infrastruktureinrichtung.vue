<template>
  <v-form ref="form">
    <default-layout>
      <template #content>
        <infrastruktureinrichtung-typ-component
          id="infrastruktureinrichtung_infrastruktureinrichtungtyp_component"
          ref="infrastruktureinrichtungTypComponent"
          v-model="infrastruktureinrichtung.infrastruktureinrichtungTyp"
          :lfd-nr="lfdNr"
          :mode="mode"
          :is-editable="isRoleAdminOrSachbearbeitung"
        />
        <infrastruktureinrichtung-component
          v-show="isInfrastruktureinrichtungTypNotUnspecified"
          id="infrastruktureinrichtung_infrastruktureinrichtung_component"
          ref="infrastruktureinrichtungComponent"
          v-model="infrastruktureinrichtung"
          :is-editable="isRoleAdminOrSachbearbeitung"
        />
        <kinderkrippe-component
          v-if="isKinderkrippe"
          id="infrastruktureinrichtung_kinderkrippe_component"
          ref="kinderkrippeComponent"
          v-model="infrastruktureinrichtung"
          :is-editable="isRoleAdminOrSachbearbeitung"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
        />
        <kindergarten-component
          v-if="isKindergarten"
          id="infrastruktureinrichtung_kindergarten_component"
          ref="kindergartenComponent"
          v-model="infrastruktureinrichtung"
          :is-editable="isRoleAdminOrSachbearbeitung"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
        />
        <haus-fuer-kinder-component
          v-if="isHausFuerKinder"
          id="infrastruktureinrichtung_hausFuerKinder_component"
          ref="hausFuerKinderComponent"
          v-model="infrastruktureinrichtung"
          :is-editable="isRoleAdminOrSachbearbeitung"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
        />
        <gs-nachmittag-betreuung-component
          v-if="isGsNachmittagBetreuung"
          id="infrastruktureinrichtung_gsNachmittagBetreuung_component"
          ref="gsNachmittagBetreuungComponent"
          v-model="infrastruktureinrichtung"
          :is-editable="isRoleAdminOrSachbearbeitung"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
        />
        <grundschule-component
          v-if="isGrundschule"
          id="infrastruktureinrichtung_grundschule_component"
          ref="grundschuleComponent"
          v-model="infrastruktureinrichtung"
          :is-editable="isRoleAdminOrSachbearbeitung"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
        />
        <mittelschule-component
          v-if="isMittelschule"
          id="infrastruktureinrichtung_mittelschule_component"
          ref="mittelschuleComponent"
          v-model="infrastruktureinrichtung"
          :is-editable="isRoleAdminOrSachbearbeitung"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
        />
        <kommentare
          v-if="componentSecurity.areKommentareVisible(Context.INFRASTRUKTUREINRICHTUNG) && !isNew"
          id="infrastruktureinrichtung_kommentare"
          :context="Context.INFRASTRUKTUREINRICHTUNG"
          :is-editable="isRoleAdminOrSachbearbeitung"
        />
        <yes-no-dialog
          id="infrastruktureinrichtung_yes_no_dialog_löschen"
          v-model="deleteDialogOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          dialogtext="Hiermit wird die Infrastruktureinrichtung unwiderruflich gelöscht."
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogNo"
          @yes="yesNoDialogYes"
        />
        <yes-no-dialog
          id="infrastruktureinrichtung_yes_no_dialog_save_leave"
          v-model="saveLeaveDialog"
          :dialogtitle="saveLeaveDialogTitle"
          :dialogtext="saveLeaveDialogText"
          :no-text="saveLeaveNoText"
          :yes-text="saveLeaveYesText"
          @yes="leave"
          @no="cancel"
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
                id="infrastruktureinrichtung_displayName"
                class="text-h6 font-weight-bold"
              >
                {{ infrastruktureinrichtungDisplayName }}
              </span>
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
      <template #action>
        <v-btn
          v-if="!isNew"
          id="infrastruktureinrichtung_löschen_button"
          class="my-4 px-1"
          color="primary"
          elevation="1"
          style="width: 200px"
          :disabled="!isRoleAdminOrSachbearbeitung"
          @click="openDeleteDialog"
        >
          Löschen
        </v-btn>
        <v-spacer />
        <v-btn
          id="infrastruktureinrichtung_speichern_button"
          class="mt-2 px-1"
          color="secondary"
          elevation="1"
          :disabled="!isFormDirty || !isRoleAdminOrSachbearbeitung"
          style="width: 200px"
          @click="saveInfrastruktureinrichtung()"
        >
          {{ isNew ? "Speichern" : "Aktualisieren" }}
        </v-btn>
        <v-btn
          id="infrastruktureinrichtung_abbrechen_button"
          color="primary"
          elevation="1"
          class="mt-2 px-1"
          style="width: 200px"
          @click="returnToUebersicht"
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
  type KindergartenDto,
  type KinderkrippeDto,
  type MittelschuleDto,
  type GrundschuleDto,
  type GsNachmittagBetreuungDto,
  type HausFuerKinderDto,
  type InfrastruktureinrichtungDto,
  InfrastruktureinrichtungDtoStatusEnum,
  InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum,
} from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import Kommentare from "@/components/common/kommentar/Kommentare.vue";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import GrundschuleComponent from "@/components/infrastruktureinrichtung/GrundschuleComponent.vue";
import GsNachmittagBetreuungComponent from "@/components/infrastruktureinrichtung/GsNachmittagBetreuungComponent.vue";
import HausFuerKinderComponent from "@/components/infrastruktureinrichtung/HausFuerKinderComponent.vue";
import InfrastruktureinrichtungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungComponent.vue";
import InfrastruktureinrichtungTypComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungTypComponent.vue";
import KindergartenComponent from "@/components/infrastruktureinrichtung/KindergartenComponent.vue";
import KinderkrippeComponent from "@/components/infrastruktureinrichtung/KinderkrippeComponent.vue";
import MittelschuleComponent from "@/components/infrastruktureinrichtung/MittelschuleComponent.vue";
import DisplayMode from "@/types/common/DisplayMode";
import GrundschuleModel from "@/types/model/infrastruktureinrichtung/GrundschuleModel";
import GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import MittelschuleModel from "@/types/model/infrastruktureinrichtung/MittelschuleModel";
import { Context } from "@/utils/Context";
import {
  createGrundschuleDto,
  createGsNachmittagBetreuungDto,
  createHausFuerKinderDto,
  createInfrastruktureinrichtungDto,
  createKindergartenDto,
  createKinderkrippeDto,
  createMittelschuleDto,
} from "@/utils/Factories";
import _ from "lodash";
import Benutzerinformationen from "@/components/common/Benutzerinformationen.vue";
import BenutzerinformationenModel from "@/types/model/common/Benutzerinformationen";
import { useSearchStore } from "@/stores/SearchStore";
import { useRoute, useRouter } from "vue-router";
import { useSecurity } from "@/composables/security/Security";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useToast, TYPE } from "vue-toastification";
import { useInfrastruktureinrichtungApi } from "@/composables/requests/InfrastruktureinrichtungApi";
import {
  findFaultInKinderkrippeForSave,
  findFaultInKindergartenForSave,
  findFaultInHausFuerKinderForSave,
  findFaultInGsNachmittagBetreuungForSave,
  findFaultInGrundschuleForSave,
  findFaultInMittelschuleForSave,
} from "@/utils/Validators";
import { useComponentSecurity } from "@/composables/security/ComponentSecurity";

const {
  isFormDirty,
  saveLeaveDialog,
  saveLeaveDialogText,
  saveLeaveDialogTitle,
  saveLeaveNoText,
  saveLeaveYesText,
  leave,
  cancel,
} = useSaveLeave();
const searchStore = useSearchStore();
const componentSecurity = useComponentSecurity();
const { isRoleAdminOrSachbearbeitung } = useSecurity();
const {
  createInfrastruktureinrichtung,
  getInfrastruktureinrichtungById,
  deleteInfrastruktureinrichtungById,
  updateInfrastruktureinrichtung,
} = useInfrastruktureinrichtungApi();
const toast = useToast();
const router = useRouter();
const infrastruktureinrichtungId = useRoute().params.id as string;
const form = ref<VForm | null>(null);
const deleteDialogOpen = ref(false);
const isNew = ref(true);
const mode = ref(DisplayMode.UNDEFINED);
const infrastruktureinrichtung = ref(new InfrastruktureinrichtungModel(createInfrastruktureinrichtungDto()));

const lfdNr = computed(() => {
  if (!_.isNil(infrastruktureinrichtung.value) && !_.isNil(infrastruktureinrichtung.value.lfdNr)) {
    return infrastruktureinrichtung.value.lfdNr.toString();
  }
  return "";
});

const infrastruktureinrichtungDisplayName = computed(() => {
  if (!_.isNil(infrastruktureinrichtung.value) && !isNew.value) {
    return infrastruktureinrichtung.value.nameEinrichtung;
  }
  return "";
});

const bearbeitungsinformationen = computed(() => {
  return new BenutzerinformationenModel(
    infrastruktureinrichtung.value?.bearbeitendePerson,
    infrastruktureinrichtung.value?.lastModifiedDateTime,
  );
});

const isEinrichtungstraegerRequired = computed(() => {
  return (
    infrastruktureinrichtung.value.status === InfrastruktureinrichtungDtoStatusEnum.Bestand ||
    infrastruktureinrichtung.value.status === InfrastruktureinrichtungDtoStatusEnum.GesichertePlanungErwPlaetzeBestEinr
  );
});

const isInfrastruktureinrichtungTypNotUnspecified = computed(() => {
  return (
    infrastruktureinrichtung.value?.infrastruktureinrichtungTyp !==
    InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Unspecified
  );
});

const isKinderkrippe = computed(() => {
  return (
    infrastruktureinrichtung.value?.infrastruktureinrichtungTyp ===
    InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kinderkrippe
  );
});

const isKindergarten = computed(() => {
  return (
    infrastruktureinrichtung.value.infrastruktureinrichtungTyp ===
    InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kindergarten
  );
});

const isHausFuerKinder = computed(() => {
  return (
    infrastruktureinrichtung.value.infrastruktureinrichtungTyp ===
    InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.HausFuerKinder
  );
});

const isGsNachmittagBetreuung = computed(() => {
  return (
    infrastruktureinrichtung.value.infrastruktureinrichtungTyp ===
    InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung
  );
});

const isGrundschule = computed(() => {
  return (
    infrastruktureinrichtung.value.infrastruktureinrichtungTyp ===
    InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Grundschule
  );
});

const isMittelschule = computed(() => {
  return (
    infrastruktureinrichtung.value.infrastruktureinrichtungTyp ===
    InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Mittelschule
  );
});

onBeforeMount(async () => {
  isNew.value = infrastruktureinrichtungId === undefined;
  mode.value = isNew.value ? DisplayMode.NEU : DisplayMode.AENDERUNG;

  if (!isNew.value) {
    infrastruktureinrichtung.value = await getInfrastruktureinrichtungById(infrastruktureinrichtungId);
  }
});

watch(
  infrastruktureinrichtung,
  () => {
    searchStore.setSelectedInfrastruktureinrichtung(infrastruktureinrichtung.value);
  },
  { deep: true },
);

watch(
  () => infrastruktureinrichtung.value.infrastruktureinrichtungTyp,
  () => {
    if (isNew.value) {
      setNewInfrastruktureinrichtung();
    }
  },
);

function setNewInfrastruktureinrichtung(): void {
  infrastruktureinrichtung.value = getModelOfNewDtoForInfrastruktureinrichtungTyp(
    infrastruktureinrichtung.value.infrastruktureinrichtungTyp,
  );
}

function openDeleteDialog(): void {
  deleteDialogOpen.value = true;
}

function yesNoDialogNo(): void {
  deleteDialogOpen.value = false;
}

async function yesNoDialogYes(): Promise<void> {
  await deleteInfrastruktureinrichtung();
  yesNoDialogNo();
}

function validateInfrastruktureinrichtung(infrastruktureinrichtung: InfrastruktureinrichtungDto): string | null {
  switch (infrastruktureinrichtung?.infrastruktureinrichtungTyp) {
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kinderkrippe:
      return findFaultInKinderkrippeForSave(infrastruktureinrichtung as KinderkrippeDto);
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kindergarten:
      return findFaultInKindergartenForSave(infrastruktureinrichtung as KindergartenDto);
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.HausFuerKinder:
      return findFaultInHausFuerKinderForSave(infrastruktureinrichtung as HausFuerKinderDto);
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung:
      return findFaultInGsNachmittagBetreuungForSave(infrastruktureinrichtung as GsNachmittagBetreuungDto);
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Grundschule:
      return findFaultInGrundschuleForSave(infrastruktureinrichtung as GrundschuleDto);
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Mittelschule:
      return findFaultInMittelschuleForSave(infrastruktureinrichtung as MittelschuleDto);
    default:
      return null;
  }
}

function getModelOfNewDtoForInfrastruktureinrichtungTyp(
  infrastruktureinrichtungTyp: InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum | undefined,
):
  | KinderkrippeModel
  | KindergartenModel
  | HausFuerKinderModel
  | GsNachmittagBetreuungModel
  | GrundschuleModel
  | MittelschuleModel
  | InfrastruktureinrichtungModel {
  switch (infrastruktureinrichtungTyp) {
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kinderkrippe:
      return new KinderkrippeModel(createKinderkrippeDto());
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kindergarten:
      return new KindergartenModel(createKindergartenDto());
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.HausFuerKinder:
      return new HausFuerKinderModel(createHausFuerKinderDto());
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung:
      return new GsNachmittagBetreuungModel(createGsNachmittagBetreuungDto());
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Grundschule:
      return new GrundschuleModel(createGrundschuleDto());
    case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Mittelschule:
      return new MittelschuleModel(createMittelschuleDto());
    default:
      return new InfrastruktureinrichtungModel(createInfrastruktureinrichtungDto());
  }
}

async function saveInfrastruktureinrichtung(): Promise<void> {
  if ((await form.value?.validate())?.valid) {
    const validationMessage: string | null = validateInfrastruktureinrichtung(infrastruktureinrichtung.value);
    if (_.isNil(validationMessage)) {
      if (!_.isNil(infrastruktureinrichtung)) {
        if (isNew.value) {
          const savedInfrastruktureinrichtung = await createInfrastruktureinrichtung(infrastruktureinrichtung.value);
          handleSuccess(savedInfrastruktureinrichtung);
        } else {
          const savedInfrastruktureinrichtung = await updateInfrastruktureinrichtung(infrastruktureinrichtung.value);
          handleSuccess(savedInfrastruktureinrichtung);
        }
      }
    } else {
      toast.error(validationMessage, { timeout: false });
    }
  } else {
    toast.error("Es gibt noch Validierungsfehler");
  }
}

async function deleteInfrastruktureinrichtung(): Promise<void> {
  if (!_.isNil(infrastruktureinrichtungId)) {
    await deleteInfrastruktureinrichtungById(infrastruktureinrichtungId);
    searchStore.removeSearchResultById(infrastruktureinrichtungId);
    returnToUebersicht("Die Infrastruktureinrichtung wurde erfolgreich gelöscht", TYPE.SUCCESS);
  }
}

function returnToUebersicht(message?: string, type?: TYPE): void {
  if (message && type) {
    toast(message, { type });
  }
  router.push("/");
}

function handleSuccess(dto: InfrastruktureinrichtungDto): void {
  infrastruktureinrichtung.value = dto;
  if (isNew.value) {
    router.push("/");
    toast.success("Die Infrastruktureinrichtung wurde erfolgreich gespeichert");
  } else {
    toast.success("Die Infrastruktureinrichtung wurde erfolgreich aktualisiert");
  }
}
</script>
