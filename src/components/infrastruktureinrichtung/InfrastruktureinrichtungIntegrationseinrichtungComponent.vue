<template>
  <v-checkbox
    id="integrationseinrichtung_checkbox"
    ref="integrationseinrichtungKitaCheckbox"
    v-model="infrastruktureinrichtung.integrationseinrichtung"
    :disabled="!isEditable"
    class="mx-3"
    color="primary"
    label="Integrationseinrichtung"
    hide-details
    @update:model-value="formChanged"
  />
</template>

<script setup lang="ts">
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const { formChanged } = useSaveLeave();
const infrastruktureinrichtung = defineModel<KinderkrippeModel | KindergartenModel>({
  required: true,
});
</script>
