<template>
  <v-checkbox
    id="muechner_kitafoerderung"
    ref="muenchnerKitafoerderungCheckbox"
    v-model="infrastruktureinrichtung.muenchnerKitafoerderung"
    :disabled="!isEditable"
    class="mx-3"
    color="primary"
    label="Münchner Kitaförderung"
    Kitaförderung
    hide-details
  />
</template>

<script setup lang="ts">
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const infrastruktureinrichtung = defineModel<KinderkrippeModel | KindergartenModel | HausFuerKinderModel>({
  required: true,
});
</script>
