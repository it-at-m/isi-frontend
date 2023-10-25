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
            :is-editable="isEditable"
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
import { Component, Prop, Mixins, Watch } from "vue-property-decorator";
import _ from "lodash";
import KommentarModel from "@/types/model/common/KommentarModel";
import Kommentar from "@/components/common/kommentar/Kommentar.vue";
import { Context } from "@/utils/Context";
import { createKommentarDto } from "@/utils/Factories";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({
  components: { Kommentar },
})
export default class Kommentare extends Mixins(KommentarApiRequestMixin, SaveLeaveMixin) {
  @Prop({ type: String, default: Context.UNDEFINED })
  private readonly context!: Context;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private isKommentarListOpen = false;

  private kommentare: Array<KommentarModel> = [];

  private get hasDirtyComment(): boolean {
    return this.kommentare.some((kommentar) => kommentar.isDirty);
  }

  @Watch("kommentare", { immediate: true, deep: true })
  private resetCommentDirtyFlagWhenNoCommentsAreDirty(): void {
    if (!this.hasDirtyComment) {
      this.resetCommentDirty();
    } else {
      this.commentChanged();
    }
  }

  private getKommentare(): void {
    if (!this.isCommentDirty()) {
      const id = this.$route.params.id;
      if (!this.isKommentarListOpen && !_.isNil(id)) {
        this.isKommentarListOpen = true;
        if (this.context === Context.BAUVORHABEN) {
          this.getKommentareForBauvorhaben(id, true).then((kommentare) => {
            this.kommentare = kommentare.map((kommentar) => new KommentarModel(kommentar));
            if (this.isEditable) {
              this.kommentare.unshift(this.createNewUnsavedKommentarForBauvorhaben());
            }
          });
        } else if (this.context === Context.INFRASTRUKTUREINRICHTUNG) {
          this.getKommentareForInfrastruktureinrichtung(id, true).then((kommentare) => {
            this.kommentare = kommentare.map((kommentar) => new KommentarModel(kommentar));
            if (this.isEditable) {
              this.kommentare.unshift(this.createNewUnsavedKommentarForInfrastruktureinrichtung());
            }
          });
        }
      } else {
        this.isKommentarListOpen = false;
        this.kommentare = [];
      }
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
    const kommentar = new KommentarModel(createKommentarDto());
    kommentar.bauvorhaben = this.$route.params.id;
    kommentar.isDirty = false;
    return kommentar;
  }

  private createNewUnsavedKommentarForInfrastruktureinrichtung(): KommentarModel {
    const kommentar = new KommentarModel(createKommentarDto());
    kommentar.infrastruktureinrichtung = this.$route.params.id;
    return kommentar;
  }

  private saveKommentar(kommentar: KommentarModel): void {
    if (_.isNil(kommentar.id)) {
      this.createKommentar(kommentar, true).then((createdKommentar) => {
        const model = new KommentarModel(createdKommentar);
        model.isDirty = false;
        this.replaceSavedKommentarInKommentare(model);
        this.kommentare.unshift(this.createNewUnsavedKommentar());
      });
    } else {
      this.updateKommentar(kommentar, true).then((updatedKommentar) => {
        const model = new KommentarModel(updatedKommentar);
        model.isDirty = false;
        this.replaceSavedKommentarInKommentare(model);
      });
    }
  }

  private replaceSavedKommentarInKommentare(kommentar: KommentarModel): void {
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
      this.kommentare.splice(0, 1, kommentar);
    }
  }

  private deleteKommentar(kommentar: KommentarModel): void {
    if (_.isNil(kommentar.id)) {
      // Wenn es sich um ein neues, unsaved Kommentar handelt, wird es entfernt
      const index = this.kommentare.indexOf(kommentar);
      if (index > -1) {
        this.kommentare.splice(index, 1);
      }
    } else {
      this.delete(kommentar.id, true).then(() => {
        const removeIndex = this.kommentare.findIndex((k) => k.id === kommentar.id);
        if (removeIndex > -1) {
          this.kommentare.splice(removeIndex, 1);
          // Überprüfen, ob gelöschter Kommentar der erste im Array war
          if (removeIndex === 0) {
            // isDirty-Flag des ersten Kommentars auf false setzten
            this.kommentare[0].isDirty = false;
          }
        }
      });
    }
  }
}
</script>

<style scoped></style>
