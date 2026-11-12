<template>
  <v-text-field
    id="infrastruktureinrichtung_fertigstellungsmonat"
    ref="infrastruktureinrichtungFertigstellungsmonat"
    v-model="infrastruktureinrichtung.fertigstellungsmonat"
    label="Fertigstellungsmonat (1–12)"
    variant="underlined"
    :rules="[digits, min(1), max(12)]"
    :readonly="!isEditable"
    maxlength="2"
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
