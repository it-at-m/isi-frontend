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
          validate-on="blur"
          @update:model-value="formChanged"
        >
          <template #label> Bezeichnung des Baugebiets <span class="text-secondary">*</span> </template>
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
          item-title="value"
          :rules="[pflichtfeld, notUnspecified]"
          @update:model-value="formChanged"
        >
          <template #label> Art der baulichen Nutzung <span class="text-secondary">*</span> </template>
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
            @update:model-value="formChanged"
          />
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { AnyAbfragevarianteDto } from "@/types/common/Abfrage";
import { BaugebietDtoArtBaulicheNutzungEnum } from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import _ from "lodash";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";

interface Props {
  abfragevariante?: AnyAbfragevarianteDto;
  isEditable?: boolean;
}

const baugebiet = defineModel<BaugebietModel>({ required: true });
const artBaulicheNutzungFreieEingabeVisible = ref<boolean>(false);
const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const artBaulicheNutzungList = computed(() => lookupStore.artBaulicheNutzung);

withDefaults(defineProps<Props>(), { isEditable: false });

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
