<template>
  <v-text-field
    id="infrastruktureinrichtung_fertigstellungsjahr"
    ref="infrastruktureinrichtungFertigstellungsjahr"
    v-model="infrastruktureinrichtung.fertigstellungsjahr"
    label="Fertigstellungsjahr (JJJJ)"
    variant="underlined"
    :rules="fertigstellungsjahrValidator"
    :readonly="!isEditable"
    maxlength="4"
    :class="isEditable ? '' : 'text-grey-lighten-1'"
  >
    <template
      #label
      v-if="isFertigstellungsjahrRequired"
    >
      Fertigstellungsjahr (JJJJ)
      <span class="text-secondary">*</span>
    </template>

    <template
      #label
      v-else
    >
      Fertigstellungsjahr(JJJJ)
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import NumField from "@/components/common/NumField.vue";
import {
  InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum,
  InfrastruktureinrichtungDtoStatusEnum,
} from "@/api/api-client/isi-backend";
import { digits, max, min, pflichtfeld } from "@/utils/FieldValidationRules";
import { computed } from "vue";
import type { VSelect } from "vuetify/components";
// Workaround um den Validation Rule Type zu bekommen
// https://stackoverflow.com/questions/77201639/how-to-import-typescript-types-in-vuetify-3
type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;
type ValidationRule = UnwrapReadonlyArray<VSelect["rules"]>;

interface Props {
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });

const isFertigstellungsjahrRequired = computed(() => {
  return (
    infrastruktureinrichtung.value.status !== InfrastruktureinrichtungDtoStatusEnum.Bestand &&
    infrastruktureinrichtung.value.infrastruktureinrichtungTyp !==
      InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Nachbarschaftstreff
  );
});

const fertigstellungsjahrValidator = computed<ValidationRule[]>(() => {
  if (!props.isEditable) {
    return [];
  }
  const usedRules: ValidationRule[] = [digits, min(1900), max(2100)];

  if (isFertigstellungsjahrRequired) {
    usedRules.push(pflichtfeld);
  }

  return usedRules;
});
</script>
