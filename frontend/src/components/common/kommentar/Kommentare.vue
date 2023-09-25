<template>
  <v-container class="transition-swing pa-0 mb-2">
    <v-expansion-panels class="ma-0 pa-0">
      <v-expansion-panel
        class="pa-0"
        @click="getKommentare()"
      >
        <v-expansion-panel-header class="grey--text text-h6"> Kommentare </v-expansion-panel-header>
        <v-expansion-panel-content>
          <kommentar
            v-for="(kommentar, index) in kommentare"
            :key="index"
            :kommentar="kommentar"
            @save-kommentar="saveKommentar"
            @delete-kommentar="deleteKommentar"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import KommentarApiRequestMixin from "@/mixins/requests/KommentarApiRequestMixin";
import { Component, Prop, Mixins } from "vue-property-decorator";
import _ from "lodash";
import KommentarModel from "@/types/model/common/KommentarModel";
import Kommentar from "@/components/common/kommentar/Kommentar.vue";
import { Context } from "@/utils/Context";

@Component({
  components: { Kommentar },
})
export default class Kommentare extends Mixins(KommentarApiRequestMixin) {
  @Prop({ type: String, default: Context.UNDEFINED })
  private readonly context!: Context;

  private isKommentarListOpen = false;

  private kommentare: Array<KommentarModel> = [];

  private getKommentare() {
    const id = this.$route.params.id;
    console.log(this.context);
    if (!this.isKommentarListOpen && !_.isNil(id)) {
      this.isKommentarListOpen = true;
      if (this.context === Context.BAUVORHABEN) {
        this.getKommentareForBauvorhaben(id, true).then((kommentare) => {
          this.kommentare = kommentare.map((kommentar) => new KommentarModel(kommentar));
          this.kommentare.push(this.createNewUnsavedKommentarForBauvorhaben());
        });
      } else if (this.context === Context.INFRASTRUKTUREINRICHTUNG) {
        this.getKommentareForInfrastruktureinrichtung(id, true).then((kommentare) => {
          this.kommentare = kommentare.map((kommentar) => new KommentarModel(kommentar));
          this.kommentare.push(this.createNewUnsavedKommentarForInfrastruktureinrichtung());
        });
      }
    } else {
      this.isKommentarListOpen = false;
      this.kommentare = [];
    }
  }

  private createNewUnsavedKommentar(): KommentarModel {
    let kommentar;
    if (this.context === Context.BAUVORHABEN) {
      kommentar = this.createNewUnsavedKommentarForBauvorhaben();
    } else {
      kommentar = this.createNewUnsavedKommentarForInfrastruktureinrichtung();
    }
    return kommentar;
  }

  private createNewUnsavedKommentarForBauvorhaben(): KommentarModel {
    const kommentar = new KommentarModel({});
    kommentar.bauvorhaben = this.$route.params.id;
    return kommentar;
  }

  private createNewUnsavedKommentarForInfrastruktureinrichtung(): KommentarModel {
    const kommentar = new KommentarModel({});
    kommentar.infrastruktureinrichtung = this.$route.params.id;
    return kommentar;
  }

  private saveKommentar(kommentar: KommentarModel): void {
    if (_.isNil(kommentar.id)) {
      this.createKommentar(kommentar, true).then((createdKommentar) => {
        const model = new KommentarModel(createdKommentar);
        this.replaceSavedKommentarInKommentare(model);
        this.kommentare.push(this.createNewUnsavedKommentar());
      });
    } else {
      this.updateKommentar(kommentar, true).then((updatedKommentar) => {
        const model = new KommentarModel(updatedKommentar);
        this.replaceSavedKommentarInKommentare(model);
      });
    }
  }

  private replaceSavedKommentarInKommentare(kommentar: KommentarModel) {
    let kommentarReplacedInArray = false;
    this.kommentare = this.kommentare.map((kommentarInArray) => {
      if (kommentarInArray.id === kommentar.id) {
        kommentarReplacedInArray = true;
        return kommentar;
      } else {
        return kommentarInArray;
      }
    });
    if (!kommentarReplacedInArray) {
      this.kommentare.splice(this.kommentare.length - 1, 1, kommentar);
    }
  }

  private deleteKommentar(kommentar: KommentarModel): void {
    if (_.isNil(kommentar.id)) {
      this.kommentare[this.kommentare.length - 1].datum = undefined;
      this.kommentare[this.kommentare.length - 1].text = undefined;
    } else {
      this.delete(kommentar.id, true).then(() => {
        const removeIndex = this.kommentare.map((kommentarInArray) => kommentarInArray.id).indexOf(kommentar.id);
        removeIndex > 0 && this.kommentare.splice(removeIndex, 1);
      });
    }
  }
}
</script>

<style scoped></style>
