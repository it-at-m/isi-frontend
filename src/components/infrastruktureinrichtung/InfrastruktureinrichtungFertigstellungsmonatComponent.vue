<template>
  <num-field
    id="infrastruktureinrichtung_fertigstellungsmonat"
    v-model="infrastruktureinrichtung.fertigstellungsmonat"
    label="Fertigstellungsmonat (1–12)"
    class="mx-3"
    maxlength="2"
    :rules="[month]"
    :readonly="!isEditable"
    :class="isEditable ? '' : 'text-grey-lighten-1'"
  />
</template>

<script setup lang="ts">
import KinderkrippeModelModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import NumField from "@/components/common/NumField.vue";
import { month } from "@/utils/FieldValidationRules";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const infrastruktureinrichtung = defineModel<KinderkrippeModelModel>({ required: true });
</script>
