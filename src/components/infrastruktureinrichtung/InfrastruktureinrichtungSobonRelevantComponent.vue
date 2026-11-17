<template>
  <tri-switch
    id="sobon_relevant_triswitch"
    ref="sobonRelevantTriswitch"
    :key="triSwitchKey"
    v-model="infrastruktureinrichtung.sobonRelevant"
    :disabled="!isEditable || !isSobonRelevant"
    off-text="Nein"
    on-text="Ja"
    :rules="isEditable && isSobonRelevant ? [notUnspecified] : undefined"
  >
    <template #label> SoBoN-relevant <span class="text-secondary">*</span></template>
  </tri-switch>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { KinderkrippeKindergartenModel } from "@/types/common/Infrastruktureinrichtung";
import TriSwitch from "@/components/common/TriSwitch.vue";
import { InfrastruktureinrichtungDtoAnlassPlanungEnum, UncertainBoolean } from "@/api/api-client/isi-backend";
import { notUnspecified } from "@/utils/FieldValidationRules";
interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const isSobonRelevant = ref(false);
const infrastruktureinrichtung = defineModel<KinderkrippeKindergartenModel>({
  required: true,
});

watch(
  () => infrastruktureinrichtung.value?.anlassPlanung,
  (newAnlassPlanung, oldAnlassPlanung) => {
    anlassPlanungChanged(newAnlassPlanung, oldAnlassPlanung);
  },
  {
    immediate: true,
  },
);

const triSwitchKey = ref(0);

function anlassPlanungChanged(newAnlassPlanung: String, oldAnlassPlanung: String): void {
  const isRelevant = newAnlassPlanung === InfrastruktureinrichtungDtoAnlassPlanungEnum.NeubauBebauungsplan;

  const wasRelevant = oldAnlassPlanung === InfrastruktureinrichtungDtoAnlassPlanungEnum.NeubauBebauungsplan;

  if (!isRelevant) {
    infrastruktureinrichtung.value.sobonRelevant = UncertainBoolean.Unspecified;

    // Nur bei einem tatsächlichen Wechsel neu erzeugen
    if (wasRelevant) {
      triSwitchKey.value++;
    }
  }

  isSobonRelevant.value = isRelevant;
}
</script>
