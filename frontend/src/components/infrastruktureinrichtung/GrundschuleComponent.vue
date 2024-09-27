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

interface Props {
  isEditable?: boolean;
  isEinrichtungstraegerRequired?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: false });

const grundschule = defineModel<GrundschuleModel>({ required: true });
</script>
