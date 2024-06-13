<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">{{ headline }}</span>
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
    <geschossflaeche-wohnen-baugenehmigungsverfahren-component
      v-model="baugebiet"
      :abfragevariante="abfragevariante"
      :is-editable="isEditable"
    />
    <anzahl-wohneinheiten-baugenehmigungsverfahren-component
      v-model="baugebiet"
      :abfragevariante="abfragevariante"
      :is-editable="isEditable"
    />
    <bauraten-aggregiert-component :aggregate-bauraten="baugebiet" />
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { AbfragevarianteBaugenehmigungsverfahrenDto } from "@/api/api-client/isi-backend";
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import CommonBezeichnungBaulicheNutzungComponent from "../CommonBezeichnungBaulicheNutzungComponent.vue";
import CommonRealisierungszeitraumComponent from "../CommonRealisierungszeitraumComponent.vue";
import AnzahlWohneinheitenBaugenehmigungsverfahrenComponent from "./AnzahlWohneinheitenBaugenehmigungsverfahrenComponent.vue";
import GeschossflaecheWohnenBaugenehmigungsverfahrenComponent from "./GeschossflaecheWohnenBaugenehmigungsverfahrenComponent.vue";

interface Props {
  abfragevariante?: AbfragevarianteBaugenehmigungsverfahrenDto;
  isEditable?: boolean;
}

const baugebiet = defineModel<BaugebietModel>({ required: true });

const headline = computed(() => `Baugebiet ${baugebiet.value.bezeichnung} `);

withDefaults(defineProps<Props>(), { isEditable: false });
</script>
