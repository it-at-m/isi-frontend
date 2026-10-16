<template>
  <field-group-card :card-title="flaechenAngabenCardTitle">
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_flaecheGesamtgrundstueck"
          v-model="infrastruktureinrichtung.flaecheGesamtgrundstueck"
          class="mx-3"
          label="Fläche Gesamtgrundstück"
          :suffix="SQUARE_METER"
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_flaecheTeilgrundstueck"
          v-model="infrastruktureinrichtung.flaecheTeilgrundstueck"
          class="mx-3"
          label="Fläche Teilgrundstück"
          :suffix="SQUARE_METER"
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import { SQUARE_METER } from "@/utils/FieldPrefixesSuffixes";
import NumField from "@/components/common/NumField.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const flaechenAngabenCardTitle = "Flächenangaben zur Einrichtung";
const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });
</script>
