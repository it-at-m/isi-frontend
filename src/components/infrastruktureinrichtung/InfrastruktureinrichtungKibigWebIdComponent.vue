<template>
  <v-text-field
    id="kibig_web_id_field"
    ref="kibigWebIdField"
    v-model="infrastruktureinrichtung.idKibigWeb"
    label="KiBiG-Web-ID"
    maxlength="255"
    variant="underlined"
    :readonly="!isEditable"
    :class="isEditable ? '' : 'text-grey-lighten-1'"
    @update:model-value="formChanged"
  />
</template>

<script setup lang="ts">
import { KinderkrippeKindergartenModel } from "@/types/common/Infrastruktureinrichtung";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const { formChanged } = useSaveLeave();
const infrastruktureinrichtung = defineModel<KinderkrippeKindergartenModel>({
  required: true,
});
</script>
