<template>
  <div v-if="!erledigtOhneFachreferatStepper()">
    <v-stepper
      v-if="!isCancelled()"
      :value="getStatusIndex()"
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
        <template v-for="(statusLabel, index) in statusLabels.slice(1)">
          <v-divider :key="index"></v-divider>
          <v-stepper-step
            :key="index"
            :complete="getStatusIndex() > index"
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
      :value="getShortenedStatusIndex()"
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
        <template v-for="(shortenedStatusLabel, index) in shortenedStatusLabels.slice(1)">
          <v-divider :key="index"></v-divider>
          <v-stepper-step
            :key="index"
            :complete="getShortenedStatusIndex() > index"
            step=""
          >
            {{ shortenedStatusLabel }}
          </v-stepper-step>
        </template>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class StatusleisteComponent extends Vue {
  @Prop({ type: AbfrageModel })
  abfrage!: AbfrageModel;

  private statusLabels = [
    "angelegt",
    "Übermittelt zur Bearbeitung",
    "Start Bearbeitung",
    "Einpflegen Bedarfsmeldung",
    "Einplanung Bedarfe",
    "erledigt",
  ];

  private shortenedStatusLabels = ["angelegt", "Übermittelt zur Bearbeitung", "Start Bearbeitung", "erledigt"];

  private isCancelled(): boolean {
    return this.abfrage.statusAbfrage === StatusAbfrage.Abbruch;
  }

  private getStatusIndex(): number {
    switch (this.abfrage.statusAbfrage) {
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
  }

  private getShortenedStatusIndex(): number {
    switch (this.abfrage.statusAbfrage) {
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
  }

  private erledigtOhneFachreferatStepper(): boolean {
    return this.abfrage.statusAbfrage === StatusAbfrage.ErledigtOhneFachreferat;
  }
}
</script>

<style></style>
