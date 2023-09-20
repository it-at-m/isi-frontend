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
import KommentarApiRequestMixin from "@/mixins/requests/KommentarApiRequestMixin";
import { Component, Prop, Mixins } from "vue-property-decorator";
import { KommentarDto } from "@/api/api-client/isi-backend";

export const enum KommentarContext {
  UNDEFINED = "UNDEFINED",
  BAUVORHABEN = "BAUVORHABEN",
  INFRASTRUKTUREINRICHTUNG = "INFRASTRUKTUREINRICHTUNG",
}

@Component({})
export default class Kommentare extends Mixins(KommentarApiRequestMixin) {
  @Prop({ type: String, default: KommentarContext.UNDEFINED })
  private readonly context!: KommentarContext;

  @Prop()
  private readonly id!: string;

  private isKommentarListOpen = false;

  private kommentare: Array<KommentarDto> = [];

  private getKommentare() {
    if (!this.isKommentarListOpen) {
      this.isKommentarListOpen = true;
      if (this.context === KommentarContext.BAUVORHABEN) {
        this.getKommentareForBauvorhaben(this.id, true).then((kommentare) => {
          this.kommentare = kommentare;
        });
      } else if (this.context === KommentarContext.INFRASTRUKTUREINRICHTUNG) {
        this.getKommentareForInfrastruktureinrichtung(this.id, true).then((kommentare) => {
          this.kommentare = kommentare;
        });
      }
    } else {
      this.isKommentarListOpen = false;
    }
  }
}
</script>

<style scoped></style>
