<template>
  <field-group-card>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="abfragevariante_realisierungvon"
          v-model="baugebiet.realisierungVon"
          :disabled="!isEditable"
          label="Realisierung von (JJJJ)"
          class="mx-3"
          :min="abfragevarianteRealisierungVonOr1900"
          :max="2100"
          integer
          no-grouping
          required
          maxlength="4"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="abfragevariante_realisierungBis"
          v-model="calcRealisierungBis"
          :disabled="true"
          label="Realisierung bis (JJJJ)"
          class="mx-3"
          year
          maxlength="4"
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import {
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
} from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import { defineModel } from "@/utils/Vue";
import _ from "lodash";
import { computed } from "vue";

interface Props {
  value: BaugebietModel;
  abfragevariante:
    | AbfragevarianteBauleitplanverfahrenDto
    | AbfragevarianteBaugenehmigungsverfahrenDto
    | AbfragevarianteWeiteresVerfahrenDto
    | undefined;
  isEditable: boolean;
}

interface Emits {
  (event: "input", value: BaugebietModel): void;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const baugebiet = defineModel(props, emit);

const calcRealisierungBis = computed(() => _.max(baugebiet.value.bauraten.map((baurate) => baurate.jahr)));

const abfragevarianteRealisierungVonOr1900 = computed(() => {
  return !_.isNil(props.abfragevariante) && !_.isNil(props.abfragevariante.realisierungVon)
    ? props.abfragevariante.realisierungVon
    : 1900;
});
</script>
