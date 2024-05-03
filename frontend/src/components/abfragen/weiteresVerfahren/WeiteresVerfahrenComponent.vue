<template>
  <v-container>
    <abfrage-common-component
      id="abfrage_common_component"
      ref="abfrageCommonComponent"
      v-model="weiteresVerfahren"
      :is-new="isNew"
      :is-editable="isEditableByAbfrageerstellung"
    />
    <allgemeine-informationen-weiteres-verfahren-component
      id="allgemeine_informationen_weiteres_verfahren_component"
      ref="allgemeineInformationenWeiteresVerfahrenComponent"
      v-model="weiteresVerfahren"
      :is-editable="isEditableByAbfrageerstellung"
    />
    <adresse-component
      id="adresse_component"
      ref="adresseComponent"
      v-model="weiteresVerfahren.adresse"
      :show-in-information-list="true"
      :is-editable="isEditableByAbfrageerstellung"
    />
    <verortung
      id="verortung_component"
      ref="verortungComponent"
      v-model="weiteresVerfahren.verortung"
      :context="Context.ABFRAGE"
      :look-at="weiteresVerfahren.adresse"
    />
    <allgemeine-informationen-zur-abfrage-weiteres-verfahren-component
      id="allgemeine_informationen_zur_abfrage_weiteres_verfahren-component"
      ref="allgemeineInformationenZurAbfrageWeiteresVerfahrenComponent"
      v-model="weiteresVerfahren"
      :look-at="weiteresVerfahren"
      :is-editable="isEditableByAbfrageerstellung"
      :is-eakte-editable="isEditableByAbfrageerstellung || isEditableBySachbearbeitung"
    />
    <dokumente
      id="dokumente_component"
      ref="dokumenteComponent"
      v-model="weiteresVerfahren.dokumente"
      :name-root-folder="nameRootFolder"
      :is-dokumente-editable="isEditableByAbfrageerstellung"
      @change="formChanged"
    />
  </v-container>
</template>

<script setup lang="ts">
import AbfrageCommonComponent from "@/components/abfragen/AbfrageCommonComponent.vue";
import AllgemeineInformationenWeiteresVerfahrenComponent from "@/components/abfragen/weiteresVerfahren/AllgemeineInformationenWeiteresVerfahrenComponent.vue";
import AllgemeineInformationenZurAbfrageWeiteresVerfahrenComponent from "@/components/abfragen/weiteresVerfahren/AllgemeineInformationenZurAbfrageWeiteresVerfahrenComponent.vue";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import { Context } from "@/utils/Context";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { defineModel } from "@/utils/Vue";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";

interface Props {
  value: WeiteresVerfahrenModel;
  isNew?: boolean;
}

interface Emits {
  (event: "input", value: WeiteresVerfahrenModel): void;
}

const nameRootFolder = "weiteresVerfahren";
const { formChanged } = useSaveLeave();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const props = withDefaults(defineProps<Props>(), { isNew: false });
const emit = defineEmits<Emits>();
const weiteresVerfahren = defineModel(props, emit);
</script>
