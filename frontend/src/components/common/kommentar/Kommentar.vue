<template>
  <v-card class="mx-3 mt-0 mb-6 px-3 pt-2 pb-3">
    <v-row class="justify-start">
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          id="kommentar_datum"
          v-model.trim="kommentar.datum"
          maxlength="32"
          filled
          :disabled="!isEditable"
        >
          <template #label> Datum </template>
        </v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <v-card-actions>
          <v-spacer />
          <v-btn
            id="save_kommentar"
            icon
            :disabled="!isSaveable || !isEditable"
            @click="saveKommentar"
          >
            <v-icon> mdi-content-save</v-icon>
          </v-btn>
          <v-btn
            id="delete_kommentar"
            icon
            :disabled="!isDeletable || !isEditable"
            @click="deleteDialog = true"
          >
            <v-icon> mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          id="kommentar_anmerkungen"
          v-model.trim="kommentar.text"
          label="Anmerkungen"
          auto-grow
          filled
          rows="5"
          :disabled="!isEditable"
        />
      </v-col>
    </v-row>
    <yes-no-dialog
      id="kommentar_anmerkungen_yes_no_dialog_delete"
      v-model="deleteDialog"
      :dialogtitle="deleteDialogTitle"
      :dialogtext="deleteDialogText"
      :yes-text="deleteDialogYesText"
      :no-text="deleteDialogNoText"
      @yes="deleteKommentar"
      @no="cancelDeletion"
    />
  </v-card>
</template>
<script lang="ts">
import KommentarApiRequestMixin from "@/mixins/requests/KommentarApiRequestMixin";
import { Component, Mixins, Emit, Prop } from "vue-property-decorator";
import KommentarModel from "@/types/model/common/KommentarModel";
import _ from "lodash";
import YesNoDialog from "@/components/common/YesNoDialog.vue";

@Component({
  components: { YesNoDialog },
})
export default class Kommentar extends Mixins(KommentarApiRequestMixin) {
  @Prop()
  private kommentar!: KommentarModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private deleteDialog = false;
  private deleteDialogTitle = "Kommentar löschen";
  private deleteDialogText = "Hiermit wird dar Kommentar unwiderruflich gelöscht.";
  private deleteDialogYesText = "Löschen";
  private deleteDialogNoText = "Abbrechen";

  get isSaveable(): boolean {
    return !_.isEmpty(this.kommentar.datum) || !_.isEmpty(this.kommentar.text);
  }

  get isDeletable(): boolean {
    return !_.isNil(this.kommentar.id) || (_.isNil(this.kommentar.id) && this.isSaveable);
  }

  private cancelDeletion(): void {
    this.deleteDialog = false;
  }

  @Emit()
  private saveKommentar(): KommentarModel {
    return this.kommentar;
  }

  @Emit()
  private deleteKommentar(): KommentarModel {
    this.cancelDeletion();
    return this.kommentar;
  }
}
</script>

<style scoped></style>
