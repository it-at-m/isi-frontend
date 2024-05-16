<template>
  <div v-if="!erledigtOhneFachreferatStepper">
    <v-stepper
      v-if="!isCancelled"
      :value="statusIndex"
      alt-labels
      flat
    >
      <v-stepper-header>
        <v-stepper-step
          complete
          step=""
        >
          {{ statusLabels[0] }}
        </v-stepper-step>
        <template
          v-for="(statusLabel, index) in statusLabels.slice(1)"
          :key="index"
        >
          <v-divider></v-divider>
          <v-stepper-step
            :complete="statusIndex > index"
            step=""
          >
            {{ statusLabel }}
          </v-stepper-step>
        </template>
      </v-stepper-header>
    </v-stepper>
    <v-stepper v-else>
      <v-stepper-header>
        <v-stepper-step :rules="[() => false]">Abfrage wurde storniert</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
  <div v-else>
    <v-stepper
      :value="shortenedStatusIndex"
      alt-labels
      flat
    >
      <v-stepper-header>
        <v-stepper-step
          complete
          step=""
        >
          {{ shortenedStatusLabels[0] }}
        </v-stepper-step>
        <template
          v-for="(shortenedStatusLabel, index) in shortenedStatusLabels.slice(1)"
          :key="index"
        >
          <v-divider></v-divider>
          <v-stepper-step
            :complete="shortenedStatusIndex > index"
            step=""
          >
            {{ shortenedStatusLabel }}
          </v-stepper-step>
        </template>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";

interface Props {
  abfrage: AbfrageModel;
}

const props = defineProps<Props>();
const statusLabels = [
  "angelegt",
  "Übermittelt zur Bearbeitung",
  "Start Bearbeitung",
  "Einpflegen Bedarfsmeldung",
  "Einplanung Bedarfe",
  "erledigt",
];
const shortenedStatusLabels = ["angelegt", "Übermittelt zur Bearbeitung", "Start Bearbeitung", "erledigt"];
const isCancelled = computed(() => props.abfrage.statusAbfrage === StatusAbfrage.Abbruch);
const erledigtOhneFachreferatStepper = computed(
  () => props.abfrage.statusAbfrage === StatusAbfrage.ErledigtOhneFachreferat,
);

const statusIndex = computed(() => {
  switch (props.abfrage.statusAbfrage) {
    case StatusAbfrage.Angelegt:
      return 0;
    case StatusAbfrage.Offen:
      return 1;
    case StatusAbfrage.InBearbeitungSachbearbeitung:
      return 2;
    case StatusAbfrage.InBearbeitungFachreferate:
      return 3;
    case StatusAbfrage.BedarfsmeldungErfolgt:
      return 4;
    case StatusAbfrage.ErledigtMitFachreferat:
      return 5;
    default:
      return 0;
  }
});

const shortenedStatusIndex = computed(() => {
  switch (props.abfrage.statusAbfrage) {
    case StatusAbfrage.Angelegt:
      return 0;
    case StatusAbfrage.Offen:
      return 1;
    case StatusAbfrage.InBearbeitungSachbearbeitung:
      return 2;
    case StatusAbfrage.ErledigtOhneFachreferat:
      return 3;
    default:
      return 0;
  }
});
</script>
