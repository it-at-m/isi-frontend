<template>
  <v-container>
    <abfrage-common-component
      id="abfrage_common_component"
      ref="abfrageCommonComponent"
      v-model="bauleitplanverfahren"
      :is-new="isNew"
      :is-editable="isEditableByAbfrageerstellung"
    />
    <allgemeine-informationen-bauleitplanverfahren-component
      id="allgemeine_informationen_bauleitplanverfahren-component"
      ref="allgemeineInformationenBauleitplanverfahrenComponent"
      v-model="bauleitplanverfahren"
      :is-editable="isEditableByAbfrageerstellung"
    />
    <adresse-component
      id="adresse_component"
      ref="adresseComponent"
      v-model="bauleitplanverfahren.adresse"
      :show-in-information-list="true"
      :is-editable="isEditableByAbfrageerstellung"
    />
    <verortung
      id="verortung_component"
      ref="verortungComponent"
      v-model="bauleitplanverfahren.verortung"
      :context="Context.ABFRAGE"
      :look-at="bauleitplanverfahren.adresse"
    />
    <allgemeine-informationen-zur-abfrage-bauleitplanverfahren-component
      id="allgemeine_informationen_zur_abfrage_bauleitplanverfahren-component"
      ref="allgemeineInformationenZurAbfrageBauleitplanverfahrenComponent"
      v-model="bauleitplanverfahren"
      :look-at="bauleitplanverfahren"
      :is-editable="isEditableByAbfrageerstellung"
      :is-eakte-editable="isEditableByAbfrageerstellung || isEditableBySachbearbeitung"
    />
    <dokumente
      id="dokumente_component"
      ref="dokumenteComponent"
      v-model="bauleitplanverfahren.dokumente"
      :name-root-folder="nameRootFolder"
      :is-dokumente-editable="isEditableByAbfrageerstellung"
      @change="formChanged"
    />
  </v-container>
</template>

<script setup lang="ts">
import AbfrageCommonComponent from "@/components/abfragen/AbfrageCommonComponent.vue";
import AllgemeineInformationenBauleitplanverfahrenComponent from "@/components/abfragen/bauleitplanverfahren/AllgemeineInformationenBauleitplanverfahrenComponent.vue";
import AllgemeineInformationenZurAbfrageBauleitplanverfahrenComponent from "@/components/abfragen/bauleitplanverfahren/AllgemeineInformationenZurAbfrageBauleitplanverfahrenComponent.vue";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import { Context } from "@/utils/Context";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";

interface Props {
  isNew?: boolean;
}

const nameRootFolder = "bauleitplanverfahren";
const { formChanged } = useSaveLeave();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const bauleitplanverfahren = defineModel<BauleitplanverfahrenModel>({ required: true });

withDefaults(defineProps<Props>(), { isNew: false });
</script>
