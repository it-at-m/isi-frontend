<template>
  <v-checkbox
    id="mini_kita_checkbox"
    ref="miniKitaCheckbox"
    v-model="infrastruktureinrichtung.miniKita"
    :disabled="!isEditable"
    class="mx-3"
    color="primary"
    label="Mini-Kita"
    hide-details
  />
</template>

<script setup lang="ts">
import { KinderkrippeKindergartenModel } from "@/types/common/Infrastruktureinrichtung";
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
