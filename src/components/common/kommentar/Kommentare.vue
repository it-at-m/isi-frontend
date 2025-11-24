<template>
  <v-container class="scale-transition pa-0 mb-2">
    <v-expansion-panels
      variant="accordion"
      @update:model-value="getKommentare()"
    >
      <v-expansion-panel class="pa-0">
        <v-expansion-panel-title class="text-grey text-h6"> Kommentare </v-expansion-panel-title>
        <v-expansion-panel-text v-if="loading">
          <loading-progress-circular
            icon="mdi-comment-text-multiple"
            text="Kommentare werden geladen..."
          />
        </v-expansion-panel-text>
        <v-expansion-panel-text v-else>
          <kommentar
            v-for="(kommentar, index) in kommentare"
            :key="index"
            v-model="kommentare[index]"
            :is-editable="isEditable"
            @save-kommentar="saveKommentar"
            @delete-kommentar="deleteKommentar"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import _ from "lodash";
import KommentarBauvorhabenModel from "@/types/model/common/KommentarBauvorhabenModel";
import KommentarInfrastruktureinrichtungModel from "@/types/model/common/KommentarInfrastruktureinrichtungModel";
import Kommentar from "@/components/common/kommentar/Kommentar.vue";
import { Context } from "@/utils/Context";
import { createKommentarBauvorhabenDto, createKommentarInfrastruktureinrichtungDto } from "@/utils/Factories";
import { useKommentarApi } from "@/composables/requests/KommentarApi";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useRoute } from "vue-router";
import { findFaultInKommentar } from "@/utils/Validators";
import { useToast } from "vue-toastification";

interface Props {
  context?: Context;
  isEditable?: boolean;
}

const { isCommentDirty, commentChanged, resetCommentDirty } = useSaveLeave();
const kommentarApi = useKommentarApi();
const toast = useToast();
const routeId = useRoute().params.id as string;
const props = withDefaults(defineProps<Props>(), { context: Context.UNDEFINED, isEditable: false });
const kommentare = ref<KommentarBauvorhabenModel[] | KommentarInfrastruktureinrichtungModel[]>([]);
let isKommentarListOpen = false;

watch(kommentare, () => {
  if (!hasDirtyComment()) {
    resetCommentDirty();
  } else {
    commentChanged();
  }
});

function hasDirtyComment(): boolean {
  return kommentare.value.some((kommentar) => kommentar.isDirty);
}

async function getKommentare(): Promise<void> {
  if (!isCommentDirty.value) {
    if (!isKommentarListOpen && !_.isNil(routeId)) {
      isKommentarListOpen = true;
      if (props.context === Context.BAUVORHABEN) {
        const fetchedKommentare = await kommentarApi.getKommentareForBauvorhaben(routeId);
        kommentare.value = fetchedKommentare.map((kommentar) => new KommentarBauvorhabenModel(kommentar));
        if (props.isEditable) {
          kommentare.value.unshift(createNewUnsavedKommentarForBauvorhaben());
        }
      } else if (props.context === Context.INFRASTRUKTUREINRICHTUNG) {
        const fetchedKommentare = await kommentarApi.getKommentareForInfrastruktureinrichtung(routeId);
        kommentare.value = fetchedKommentare.map((kommentar) => new KommentarInfrastruktureinrichtungModel(kommentar));
        if (props.isEditable) {
          kommentare.value.unshift(createNewUnsavedKommentarForInfrastruktureinrichtung());
        }
      }
    } else {
      isKommentarListOpen = false;
      kommentare.value = [];
    }
  }
}

function createNewUnsavedKommentar(): KommentarBauvorhabenModel | KommentarInfrastruktureinrichtungModel {
  let kommentar;
  if (props.context === Context.BAUVORHABEN) {
    kommentar = createNewUnsavedKommentarForBauvorhaben();
  } else {
    kommentar = createNewUnsavedKommentarForInfrastruktureinrichtung();
  }
  return kommentar;
}

function createNewUnsavedKommentarForBauvorhaben(): KommentarBauvorhabenModel {
  const kommentar = new KommentarBauvorhabenModel(createKommentarBauvorhabenDto());
  kommentar.bauvorhaben = routeId;
  kommentar.isDirty = false;
  return kommentar;
}

function createNewUnsavedKommentarForInfrastruktureinrichtung(): KommentarInfrastruktureinrichtungModel {
  const kommentar = new KommentarInfrastruktureinrichtungModel(createKommentarInfrastruktureinrichtungDto());
  kommentar.infrastruktureinrichtung = routeId;
  return kommentar;
}

async function saveKommentar(
  kommentar: KommentarBauvorhabenModel | KommentarInfrastruktureinrichtungModel,
): Promise<void> {
  const validationMessage = findFaultInKommentar(kommentar);
  if (_.isNil(validationMessage)) {
    let model: KommentarBauvorhabenModel | KommentarInfrastruktureinrichtungModel;
    if (_.isNil(kommentar.id)) {
      if (props.context === Context.BAUVORHABEN) {
        model = new KommentarBauvorhabenModel(await kommentarApi.createKommentarForBauvorhaben(kommentar));
      } else {
        model = new KommentarInfrastruktureinrichtungModel(
          await kommentarApi.createKommentarForInfrastruktureinrichtung(kommentar),
        );
      }
      model.isDirty = false;
      replaceSavedKommentarInKommentare(model);
      kommentare.value.unshift(createNewUnsavedKommentar());
    } else {
      if (props.context === Context.BAUVORHABEN) {
        model = new KommentarBauvorhabenModel(await kommentarApi.updateKommentarForBauvorhaben(kommentar));
      } else {
        model = new KommentarInfrastruktureinrichtungModel(
          await kommentarApi.updateKommentarForInfrastruktureinrichtung(kommentar),
        );
      }
      model.isDirty = false;
      replaceSavedKommentarInKommentare(model);
    }
  } else {
    toast.error(validationMessage, { timeout: false });
  }
}

function replaceSavedKommentarInKommentare(
  kommentar: KommentarBauvorhabenModel | KommentarInfrastruktureinrichtungModel,
): void {
  let kommentarReplacedInArray = false;
  kommentare.value = kommentare.value.map((kommentarInArray) => {
    if (kommentarInArray.id === kommentar.id) {
      kommentarReplacedInArray = true;
      return kommentar;
    } else {
      return kommentarInArray;
    }
  });
  if (!kommentarReplacedInArray) {
    kommentare.value.splice(0, 1, kommentar);
  }
}

async function deleteKommentar(
  kommentar: KommentarBauvorhabenModel | KommentarInfrastruktureinrichtungModel,
): Promise<void> {
  if (_.isNil(kommentar.id)) {
    // Wenn es sich um ein neues, unsaved Kommentar handelt, wird es entfernt
    const index = kommentare.value.indexOf(kommentar);
    if (index > -1) {
      kommentare.value.splice(index, 1);
    }
  } else {
    if (props.context === Context.BAUVORHABEN) {
      await kommentarApi.deleteKommentarForBauvorhaben(kommentar.id);
    } else {
      await kommentarApi.deleteKommentarForInfrastruktureinrichtung(kommentar.id);
    }
    const removeIndex = kommentare.value.findIndex((k) => k.id === kommentar.id);
    if (removeIndex > -1) {
      kommentare.value.splice(removeIndex, 1);
      // Überprüfen, ob gelöschter Kommentar der erste im Array war
      if (removeIndex === 0) {
        // isDirty-Flag des ersten Kommentars auf false setzten
        kommentare.value[0].isDirty = false;
      }
    }
  }
}
</script>
