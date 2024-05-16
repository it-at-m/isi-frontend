<template>
  <v-container>
    <abfrage-common-component
      id="abfrage_common_component"
      ref="abfrageCommonComponent"
      v-model="baugenehmigungsverfahren"
      :is-new="isNew"
      :is-editable="isEditableByAbfrageerstellung"
    />
    <allgemeine-informationen-baugenehmigungsverfahren-component
      id="allgemeine_informationen_baugenehmigungsverfahren-component"
      ref="allgemeineInformationenBaugenehmigungsverfahrenComponent"
      v-model="baugenehmigungsverfahren"
      :is-editable="isEditableByAbfrageerstellung"
    />
    <adresse-component
      id="adresse_component"
      ref="adresseComponent"
      v-model="baugenehmigungsverfahren.adresse"
      :is-editable="isEditableByAbfrageerstellung"
    />
    <verortung
      id="verortung_component"
      ref="verortungComponent"
      v-model="baugenehmigungsverfahren.verortung"
      :context="Context.ABFRAGE"
      :look-at="baugenehmigungsverfahren.adresse"
    />
    <allgemeine-informationen-zur-abfrage-baugenehmigungsverfahren-component
      id="allgemeine_informationen_zur_abfrage_baugenehmigunsverfahren-component"
      ref="allgemeineInformationenZurAbfrageBaugenehmigungsverfahrenComponent"
      v-model="baugenehmigungsverfahren"
      :look-at="baugenehmigungsverfahren"
      :is-editable="isEditableByAbfrageerstellung"
      :is-eakte-editable="isEditableByAbfrageerstellung || isEditableBySachbearbeitung"
    />
    <dokumente
      id="dokumente_component"
      ref="dokumenteComponent"
      v-model="baugenehmigungsverfahren.dokumente"
      :name-root-folder="nameRootFolder"
      :is-dokumente-editable="isEditableByAbfrageerstellung"
      @change="formChanged"
    />
  </v-container>
</template>

<script setup lang="ts">
import AbfrageCommonComponent from "@/components/abfragen/AbfrageCommonComponent.vue";
import AllgemeineInformationenBaugenehmigungsverfahrenComponent from "@/components/abfragen/baugenehmigungsverfahren/AllgemeineInformationenBaugenehmigungsverfahrenComponent.vue";
import AllgemeineInformationenZurAbfrageBaugenehmigungsverfahrenComponent from "@/components/abfragen/baugenehmigungsverfahren/AllgemeineInformationenZurAbfrageBaugenehmigungsverfahrenComponent.vue";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import { Context } from "@/utils/Context";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";

interface Props {
  isNew?: boolean;
}

const nameRootFolder = "baugenehmigungsverfahren";
const { formChanged } = useSaveLeave();
const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung } = useAbfrageSecurity();
const baugenehmigungsverfahren = defineModel<BaugenehmigungsverfahrenModel>({ required: true });

withDefaults(defineProps<Props>(), { isNew: false });
</script>
