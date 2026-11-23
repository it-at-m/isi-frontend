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
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
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
