<template>
  <div>
    <schule-component
      id="infrastruktureinrichtung_mittelschule_schule_component"
      ref="schule-component"
      v-model="mittelschule.schule"
      :is-editable="isEditable"
      :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
    />
  </div>
</template>

<script setup lang="ts">
import MittelschuleModel from "@/types/model/infrastruktureinrichtung/MittelschuleModel";
import SchuleComponent from "@/components/infrastruktureinrichtung/SchuleComponent.vue";
import { defineModel } from "@/utils/Vue";

interface Props {
  value: MittelschuleModel;
  isEditable?: boolean;
  isEinrichtungstraegerRequired?: boolean;
}

interface Emits {
  (event: "input", value: MittelschuleModel): void;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: false });
const emit = defineEmits<Emits>();
const mittelschule = defineModel(props, emit);
</script>
