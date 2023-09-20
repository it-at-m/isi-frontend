<template>
  <v-container class="transition-swing">
    <v-expansion-panels>
      <v-expansion-panel @click="getKommentare()">
        <v-expansion-panel-header> Test </v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
export const enum KommentarContext {
  UNDEFINED = "UNDEFINED",
  ABFRAGE = "ABFRAGE",
  BAUVORHABEN = "BAUVORHABEN",
  INFRASTRUKTUREINRICHTUNG = "INFRASTRUKTUREINRICHTUNG",
}

import { Vue, Component, VModel, Prop } from "vue-property-decorator";

@Component({})
export default class Kommentare extends Vue {
  @Prop({ type: String, default: KommentarContext.UNDEFINED })
  private readonly context!: KommentarContext;

  private isKommentarListOpen = false;

  private getKommentare() {
    if (!this.isKommentarListOpen) {
      this.isKommentarListOpen = true;
      if (this.context === KommentarContext.BAUVORHABEN) {
      } else if (this.context === KommentarContext.INFRASTRUKTUREINRICHTUNG) {
      }
    } else {
      this.isKommentarListOpen = false;
    }
  }
}
</script>

<style scoped></style>
