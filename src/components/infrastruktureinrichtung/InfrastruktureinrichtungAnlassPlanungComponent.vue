<template>
  <v-select
    id="anlass_planung_dropdown"
    v-model="infrastruktureinrichtung.anlassPlanung"
    :items="anlassPlanungList"
    variant="underlined"
    item-value="key"
    item-title="value"
    :disabled="!isEditable"
    @update:model-value="formChanged"
  >
    <template #label>Anlass der Planung <span class="text-secondary"></span></template>
  </v-select>
</template>

<script setup lang="ts">
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";
import { computed } from "vue";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const lookupStore = useLookupStore();
const anlassPlanungList = computed(() => lookupStore.anlassPlanung);

const { formChanged } = useSaveLeave();
const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });
</script>
