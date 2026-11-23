<template>
  <v-checkbox
    id="kitz_checkbox"
    ref="kitzCheckbox"
    v-model="infrastruktureinrichtung.kitz"
    :disabled="!isEditable"
    class="mx-3"
    color="primary"
    label="KiTZ"
    hide-details
  />
</template>

<script setup lang="ts">
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const infrastruktureinrichtung = defineModel<HausFuerKinderModel>({
  required: true,
});
</script>
