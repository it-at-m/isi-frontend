<template>
  <field-group-card>
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
          id="baugebiet_bezeichnung"
          v-model.trim="baugebiet.bezeichnung"
          :disabled="!isEditable"
          :rules="[pflichtfeld]"
          maxlength="255"
          validate-on-blur
          @input="formChanged"
        >
          <template #label> Bezeichnung des Baugebiets <span class="secondary--text">*</span> </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-select
          id="baugebiet_art_bauliche_nutzung"
          v-model="baugebiet.artBaulicheNutzung"
          :disabled="!isEditable"
          class="mx-3"
          :items="artBaulicheNutzungList"
          item-value="key"
          item-text="value"
          :rules="[pflichtfeld, notUnspecified]"
          @change="formChanged"
        >
          <template #label> Art der baulichen Nutzung <span class="secondary--text">*</span> </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-slide-y-reverse-transition>
          <v-text-field
            v-if="artBaulicheNutzungFreieEingabeVisible"
            id="art_bauliche_nutzung_freie_eingabe_field"
            ref="artBaulicheNutzungFreieEingabeField"
            v-model="baugebiet.artBaulicheNutzungFreieEingabe"
            :disabled="!isEditable"
            label="Freie Eingabe"
            maxlength="1000"
            @input="formChanged"
          />
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import {
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
  BaugebietDtoArtBaulicheNutzungEnum,
} from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import { defineModel } from "@/utils/Vue";
import _ from "lodash";
import { computed, watch } from "vue";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";

interface Props {
  value: BaugebietModel;
  abfragevariante:
    | AbfragevarianteBauleitplanverfahrenDto
    | AbfragevarianteBaugenehmigungsverfahrenDto
    | AbfragevarianteWeiteresVerfahrenDto
    | undefined;
  isEditable: boolean;
}

interface Emits {
  (event: "input", value: BaugebietModel): void;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const baugebiet = defineModel(props, emit);
let artBaulicheNutzungFreieEingabeVisible = ref<boolean>(false);
const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const artBaulicheNutzungList = computed(() => lookupStore.artBaulicheNutzung);

watch(() => baugebiet.value.artBaulicheNutzung, artFnpChanged, { immediate: true });

function artFnpChanged(): void {
  if (_.isEqual(baugebiet.value.artBaulicheNutzung, BaugebietDtoArtBaulicheNutzungEnum.FreieEingabe)) {
    artBaulicheNutzungFreieEingabeVisible.value = true;
  } else {
    baugebiet.value.artBaulicheNutzungFreieEingabe = undefined;
    artBaulicheNutzungFreieEingabeVisible.value = false;
  }
}
</script>
