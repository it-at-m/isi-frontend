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
import _ from "lodash";
import KommentarModel from "@/types/model/common/KommentarModel";

export const enum KommentarContext {
  UNDEFINED = "UNDEFINED",
  BAUVORHABEN = "BAUVORHABEN",
  INFRASTRUKTUREINRICHTUNG = "INFRASTRUKTUREINRICHTUNG",
}

@Component({})
export default class Kommentare extends Mixins(KommentarApiRequestMixin) {
  @Prop({ type: String, default: KommentarContext.UNDEFINED })
  private readonly context!: KommentarContext;

  /**
   * Die ID des Bauvorhabens oder der Infrastruktureinrichtung.
   */
  private id!: string;

  private isKommentarListOpen = false;

  private kommentare: Array<KommentarModel> = [];

  mounted(): void {
    this.id = this.$route.params.id;
  }

  private getKommentare() {
    if (!this.isKommentarListOpen && !_.isNil(this.id)) {
      this.isKommentarListOpen = true;
      if (this.context === KommentarContext.BAUVORHABEN) {
        this.getKommentareForBauvorhaben(this.id, true).then((kommentare) => {
          this.kommentare = this.map(kommentare);
        });
      } else if (this.context === KommentarContext.INFRASTRUKTUREINRICHTUNG) {
        this.getKommentareForInfrastruktureinrichtung(this.id, true).then((kommentare) => {
          this.kommentare = this.map(kommentare);
        });
      }
    } else {
      this.isKommentarListOpen = false;
      this.kommentare = [];
    }
  }

  private map(kommentare: Array<KommentarDto>): Array<KommentarModel> {
    let index = 0;
    return kommentare.map((kommentar) => new KommentarModel(kommentar, index++));
  }

  private createNewUnsavedKommentarAndAppendToKommentare(): void {
    const kommentar = new KommentarModel({}, this.kommentare.length);
    if (this.context === KommentarContext.BAUVORHABEN) {
      kommentar.bauvorhaben = this.id;
    } else if (this.context === KommentarContext.INFRASTRUKTUREINRICHTUNG) {
      kommentar.infrastruktureinrichtung = this.id;
    }
    this.kommentare.push(kommentar);
  }

  private saveKommentar(kommentar: KommentarModel): void {
    if (_.isNil(kommentar.id)) {
      this.createKommentar(kommentar, true).then((createdKommentar) => {
        const model = new KommentarModel(createdKommentar, kommentar.index);
        this.replaceSavedKommentarInKommentare(model);
      });
    } else {
      this.updateKommentar(kommentar, true).then((updatedKommentar) => {
        const model = new KommentarModel(updatedKommentar, kommentar.index);
        this.replaceSavedKommentarInKommentare(model);
      });
    }
  }

  private replaceSavedKommentarInKommentare(kommentar: KommentarModel) {
    this.kommentare = this.kommentare.map((kommentarInArray) =>
      kommentarInArray.index === kommentar.index ? kommentar : kommentarInArray
    );
  }

  private deleteKommentar(kommentar: KommentarModel): void {
    if (!_.isNil(kommentar.id)) {
      this.delete(kommentar.id, true);
    }
  }
}
</script>

<style scoped></style>
