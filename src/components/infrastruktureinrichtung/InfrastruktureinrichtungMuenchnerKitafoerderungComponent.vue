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
import { ref, watch } from "vue";
import { AnyInfrastruktureinrichtungModel } from "@/types/common/Infrastruktureinrichtung";
import TriSwitch from "@/components/common/TriSwitch.vue";
import { InfrastruktureinrichtungDtoAnlassPlanungEnum, UncertainBoolean } from "@/api/api-client/isi-backend";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const infrastruktureinrichtung = defineModel<AnyInfrastruktureinrichtungModel>({
  required: true,
});

const sobonRelevantEditable = ref(false);

watch(
  () => infrastruktureinrichtung.value.anlassPlanung,
  () => {
    anlassPlanungChanged();
  },
  { immediate: true },
);

function anlassPlanungChanged(): void {
  if (
    infrastruktureinrichtung.value.anlassPlanung === InfrastruktureinrichtungDtoAnlassPlanungEnum.NeubauBebauungsplan
  ) {
    sobonRelevantEditable.value = true;
  } else {
    infrastruktureinrichtung.value.sobonRelevant = UncertainBoolean.Unspecified;
    sobonRelevantEditable.value = false;
  }
}
</script>
