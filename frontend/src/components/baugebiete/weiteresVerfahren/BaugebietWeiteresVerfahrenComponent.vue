<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span
          class="text-h6 font-weight-bold"
          v-text="headline"
        />
      </v-col>
    </v-row>
    <common-bezeichnung-bauliche-nutzung-component
      v-model="baugebiet"
      :abfragevariante="abfragevariante"
      :is-editable="isEditable"
    />
    <common-realisierungszeitraum-component
      v-model="baugebiet"
      :abfragevariante="abfragevariante"
      :is-editable="isEditable"
    />
    <geschossflaeche-wohnen-weiteres-verfahren-component
      v-model="baugebiet"
      :abfragevariante="abfragevariante"
      :is-editable="isEditable"
    />
    <anzahl-wohneinheiten-weiteres-verfahren-component
      v-model="baugebiet"
      :abfragevariante="abfragevariante"
      :is-editable="isEditable"
    />
    <bauraten-aggregiert-component :aggregate-bauraten="baugebiet" />
  </v-container>
</template>

<script setup lang="ts">
import { AbfragevarianteWeiteresVerfahrenDto } from "@/api/api-client/isi-backend";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import { defineModel } from "@/utils/Vue";
import CommonBezeichnungBaulicheNutzungComponent from "../CommonBezeichnungBaulicheNutzungComponent.vue";
import CommonRealisierungszeitraumComponent from "../CommonRealisierungszeitraumComponent.vue";
import AnzahlWohneinheitenWeiteresVerfahrenComponent from "./AnzahlWohneinheitenWeiteresVerfahrenComponent.vue";
import GeschossflaecheWohnenWeiteresVerfahrenComponent from "./GeschossflaecheWohnenWeiteresVerfahrenComponent.vue";

interface Props {
  value: BaugebietModel;
  abfragevariante: AbfragevarianteWeiteresVerfahrenDto | undefined;
  isEditable: boolean;
}

interface Emits {
  (event: "input", value: BaugebietModel): void;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const baugebiet = defineModel(props, emit);
const headline = computed(() => `Baugebiet ${baugebiet.value.bezeichnung}`);
</script>
