<template>
  <v-text-field
    id="infrastruktureinrichtung_name_traeger"
    ref="infrastruktureinrichtungNameTraeger"
    v-model="infrastruktureinrichtung.nameTraeger"
    label="Name des Trägers"
    variant="underlined"
    :readonly="!isEditable"
    maxlength="255"
    :class="isEditable ? '' : 'text-grey-lighten-1'"
    @update:modelValue="formChanged"
  />
</template>

<script setup lang="ts">
import KinderkrippeModelModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const { formChanged } = useSaveLeave();
const infrastruktureinrichtung = defineModel<KinderkrippeModelModel>({ required: true });
</script>
