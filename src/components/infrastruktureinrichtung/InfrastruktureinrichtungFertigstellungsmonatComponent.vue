<template>
  <num-field
    id="infrastruktureinrichtung_fertigstellungsmonat"
    v-model="infrastruktureinrichtung.fertigstellungsmonat"
    label="Fertigstellungsmonat (MM)"
    class="mx-3"
    maxlength="2"
    :readonly="!isEditable"
    :class="isEditable ? '' : 'text-grey-lighten-1'"
  />
</template>

<script setup lang="ts">
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import NumField from "@/components/common/NumField.vue";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const infrastruktureinrichtung = defineModel<KinderkrippeModel>({ required: true });
</script>
