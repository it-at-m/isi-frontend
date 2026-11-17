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
import { KinderkrippeKindergartenModel } from "@/types/common/Infrastruktureinrichtung";
import TriSwitch from "@/components/common/TriSwitch.vue";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const infrastruktureinrichtung = defineModel<KinderkrippeKindergartenModel>({
  required: true,
});
</script>
