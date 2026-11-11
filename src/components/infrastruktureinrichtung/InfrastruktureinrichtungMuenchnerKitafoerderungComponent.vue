<template>
  <tri-switch
    id="muenchner_kitafoerderung_triswitch"
    ref="muenchnerKitafoerderungTriswitch"
    v-model="infrastruktureinrichtung.muenchnerKitafoerderung"
    :disabled="!isEditable"
    off-text="Nein"
    on-text="Ja"
  >
    <template #label> Münchner Kitaförderung <span class="text-secondary">*</span></template>
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
