<template>
  <v-row justify="center">
    <v-col
      cols="12"
      md="6"
    >
      <v-select
        id="infrastruktureinrichtung_kooperation_dropdown"
        v-model="nachbarschaftstreff.kooperation"
        :items="kooperationList"
        variant="underlined"
        item-value="key"
        item-title="value"
        :disabled="!isEditable"
        label="Kooperation mit"
        @update:model-value="formChanged"
      >
      </v-select>
    </v-col>
    <v-col
      cols="12"
      md="6"
    >
      <v-slide-y-reverse-transition>
        <v-text-field
          v-if="kooperationFreieEingabeVisible"
          id="kooperation_freie_eingabe_field"
          ref="kooperationFreieEingabeField"
          v-model="nachbarschaftstreff.kooperationFreieEingabe"
          variant="underlined"
          :readonly="!isEditable"
          label="Freie Eingabe für Kooperation mit"
          maxlength="1000"
          @update:model-value="formChanged"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-slide-y-reverse-transition>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useLookupStore } from "@/stores/LookupStore";
import { NachbarschaftstreffDtoKooperationEnum } from "@/api/api-client/isi-backend";
import NachbarschaftstreffModel from "@/types/model/infrastruktureinrichtung/NachbarschaftstreffModel";
import { useSaveLeave } from "@/composables/SaveLeave";
import _ from "lodash";
import { computed, ref, watch } from "vue";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const { formChanged } = useSaveLeave();
const nachbarschaftstreff = defineModel<NachbarschaftstreffModel>({ required: true });
const lookupStore = useLookupStore();
const kooperationFreieEingabeVisible = ref<boolean | null>();

watch(() => nachbarschaftstreff.value.kooperation, kooperationChanged, { immediate: true });
const kooperationList = computed(() => lookupStore.kooperation);

function kooperationChanged(): void {
  if (!_.isNil(nachbarschaftstreff.value.kooperation)) {
    if (nachbarschaftstreff.value.kooperation === NachbarschaftstreffDtoKooperationEnum.Sonstiges) {
      kooperationFreieEingabeVisible.value = true;
    } else {
      nachbarschaftstreff.value.kooperationFreieEingabe = undefined;
      kooperationFreieEingabeVisible.value = false;
    }
  }
}
</script>
