<template>
  <num-field
    id="infrastruktureinrichtung_fertigstellungsjahr"
    v-model="infrastruktureinrichtung.fertigstellungsjahr"
    label="Fertigstellungsjahr (JJJJ)"
    class="mx-3"
    year
    :required="isFertigstellungsjahrRequired()"
    maxlength="4"
    :readonly="!isEditable"
    :class="isEditable ? '' : 'text-grey-lighten-1'"
  />
</template>

<script setup lang="ts">
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import NumField from "@/components/common/NumField.vue";
import {
  InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum,
  InfrastruktureinrichtungDtoStatusEnum,
} from "@/api/api-client/isi-backend";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });

function isFertigstellungsjahrRequired(): boolean {
  return (
    infrastruktureinrichtung.value.status !== InfrastruktureinrichtungDtoStatusEnum.Bestand &&
    infrastruktureinrichtung.value.infrastruktureinrichtungTyp !==
      InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Nachbarschaftstreff
  );
}
</script>
