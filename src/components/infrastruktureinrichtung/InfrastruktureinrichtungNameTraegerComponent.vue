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
  />
</template>

<script setup lang="ts">
import KinderkrippeModelModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import { digits, min, max } from "@/utils/FieldValidationRules";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const infrastruktureinrichtung = defineModel<KinderkrippeModelModel>({ required: true });
</script>
