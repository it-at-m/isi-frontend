<template>
  <v-checkbox
    id="integrationseinrichtung_checkbox"
    ref="integrationseinrichtungKitaCheckbox"
    v-model="infrastruktureinrichtung.integrationseinrichtung"
    :disabled="!isEditable"
    class="mx-3"
    color="primary"
    label="Integrationseinrichtung"
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
