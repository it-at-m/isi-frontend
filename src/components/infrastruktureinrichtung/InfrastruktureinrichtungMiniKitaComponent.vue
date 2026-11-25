<template>
  <v-checkbox
    id="mini_kita_checkbox"
    ref="miniKitaCheckbox"
    v-model="infrastruktureinrichtung.miniKita"
    :disabled="!isEditable"
    class="mx-3"
    color="primary"
    label="Mini-Kita"
    hide-details
    @update:modelValue="formChanged"
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
