<template>
  <tri-switch
    id="sobon_relevant_triswitch"
    ref="sobonRelevantTriswitch"
    v-model="infrastruktureinrichtung.sobonRelevant"
    :disabled="!isEditable"
    off-text="Nein"
    on-text="Ja"
  >
    <template #label> SoBoN-relevant <span class="text-secondary">*</span></template>
  </tri-switch>
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
