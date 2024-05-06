<template>
  <v-container class="transition-swing pa-0 mb-2">
    <v-expansion-panels class="ma-0 pa-0">
      <v-expansion-panel
        class="pa-0"
        @click="getKommentare()"
      >
        <v-expansion-panel-header class="grey--text text-h6"> Kommentare </v-expansion-panel-header>
        <v-expansion-panel-content>
          <kommentar
            v-for="(kommentar, index) in kommentare"
            :key="index"
            :value="kommentar"
            :is-editable="isEditable"
            @input="updateEntry(index, $event)"
            @save-kommentar="saveKommentar"
            @delete-kommentar="deleteKommentar"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import _ from "lodash";
import KommentarModel from "@/types/model/common/KommentarModel";
import Kommentar from "@/components/common/kommentar/Kommentar.vue";
import { Context } from "@/utils/Context";
import { createKommentarDto } from "@/utils/Factories";
import { useKommentarApi } from "@/composables/requests/KommentarApi";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useRoute } from "vue-router";

interface Props {
  context?: Context;
  isEditable?: boolean;
}

const { isCommentDirty, commentChanged, resetCommentDirty } = useSaveLeave();
const kommentarApi = useKommentarApi();
const routeId = useRoute().params.id as string;
const props = withDefaults(defineProps<Props>(), { context: Context.UNDEFINED, isEditable: false });
const kommentare = ref<KommentarModel[]>([]);
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
        const fetchedKommentare = await kommentarApi.getKommentareForBauvorhaben(id, true);
        kommentare.value = fetchedKommentare.map((kommentar) => new KommentarModel(kommentar));
        if (props.isEditable) {
          kommentare.value.unshift(createNewUnsavedKommentarForBauvorhaben());
        }
      } else if (props.context === Context.INFRASTRUKTUREINRICHTUNG) {
        const fetchedKommentare = await kommentarApi.getKommentareForInfrastruktureinrichtung(id, true);
        kommentare.value = fetchedKommentare.map((kommentar) => new KommentarModel(kommentar));
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

function createNewUnsavedKommentar(): KommentarModel {
  let kommentar;
  if (props.context === Context.BAUVORHABEN) {
    kommentar = createNewUnsavedKommentarForBauvorhaben();
  } else {
    kommentar = createNewUnsavedKommentarForInfrastruktureinrichtung();
  }
  return kommentar;
}

function createNewUnsavedKommentarForBauvorhaben(): KommentarModel {
  const kommentar = new KommentarModel(createKommentarDto());
  kommentar.bauvorhaben = routeId;
  kommentar.isDirty = false;
  return kommentar;
}

function createNewUnsavedKommentarForInfrastruktureinrichtung(): KommentarModel {
  const kommentar = new KommentarModel(createKommentarDto());
  kommentar.infrastruktureinrichtung = routeId;
  return kommentar;
}

async function saveKommentar(kommentar: KommentarModel): Promise<void> {
  if (_.isNil(kommentar.id)) {
    const createdKommentar = await kommentarApi.createKommentar(kommentar, true);
    const model = new KommentarModel(createdKommentar);
    model.isDirty = false;
    replaceSavedKommentarInKommentare(model);
    kommentare.value.unshift(createNewUnsavedKommentar());
  } else {
    const updatedKommentar = await kommentarApi.updateKommentar(kommentar, true);
    const model = new KommentarModel(updatedKommentar);
    model.isDirty = false;
    replaceSavedKommentarInKommentare(model);
  }
}

function replaceSavedKommentarInKommentare(kommentar: KommentarModel): void {
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

async function deleteKommentar(kommentar: KommentarModel): Promise<void> {
  if (_.isNil(kommentar.id)) {
    // Wenn es sich um ein neues, unsaved Kommentar handelt, wird es entfernt
    const index = kommentare.value.indexOf(kommentar);
    if (index > -1) {
      kommentare.value.splice(index, 1);
    }
  } else {
    await kommentarApi.deleteKommentar(kommentar.id, true);
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

function updateEntry(index: number, kommentar: KommentarModel): void {
  kommentare.value[index] = kommentar;
}
</script>
