<template>
  <v-text-field
    id="kibig_web_id_field"
    ref="kibigWebIdField"
    v-model="infrastruktureinrichtung.idKibigWeb"
    label="KiBiG-Web-ID"
    variant="underlined"
    readonly
  />
</template>

<script setup lang="ts">
import { AnyInfrastruktureinrichtungModel } from "@/types/common/Infrastruktureinrichtung";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const infrastruktureinrichtung = defineModel<AnyInfrastruktureinrichtungModel>({
  required: true,
});
</script>
