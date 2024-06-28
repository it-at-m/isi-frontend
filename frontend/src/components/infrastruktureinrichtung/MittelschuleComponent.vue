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

interface Props {
  isEditable?: boolean;
  isEinrichtungstraegerRequired?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: false });
const mittelschule = defineModel<MittelschuleModel>({ required: true });
</script>
