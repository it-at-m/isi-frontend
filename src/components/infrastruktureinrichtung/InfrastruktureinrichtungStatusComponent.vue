<template>
  <v-select
    id="infrastruktureinrichtung_status_dropdown"
    v-model="infrastruktureinrichtung.status"
    :items="statusInfrastruktureinrichtungList"
    variant="underlined"
    item-value="key"
    item-title="value"
    :rules="[pflichtfeld, notUnspecified]"
    :disabled="!isEditable"
    @update:model-value="formChanged"
  >
    <template #label>Status der Infrastruktureinrichtung <span class="text-secondary">*</span></template>
  </v-select>
</template>

<script setup lang="ts">
import { computed } from "vue";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import { notUnspecified, pflichtfeld } from "@/utils/FieldValidationRules";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });
const statusInfrastruktureinrichtungList = computed(() => lookupStore.statusInfrastruktureinrichtung);
</script>
