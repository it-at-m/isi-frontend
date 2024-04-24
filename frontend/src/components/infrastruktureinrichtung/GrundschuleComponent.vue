<template>
  <div>
    <schule-component
      id="infrastruktureinrichtung_grundschule_schule_component"
      ref="schule-component"
      v-model="grundschule.schule"
      :is-editable="isEditable"
      :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
    />
  </div>
</template>

<script setup lang="ts">
import GrundschuleModel from "@/types/model/infrastruktureinrichtung/GrundschuleModel";
import SchuleComponent from "@/components/infrastruktureinrichtung/SchuleComponent.vue";
import { defineModel } from "@/utils/Vue";

interface Props {
  value: GrundschuleModel;
  isEditable?: boolean;
  isEinrichtungstraegerRequired?: boolean;
}

interface Emits {
  (event: "input", value: GrundschuleModel): void;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: false });
const emit = defineEmits<Emits>();
const grundschule = defineModel(props, emit);
</script>
<style></style>
