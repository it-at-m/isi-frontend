<template>
  <v-card outlined>
    <v-row class="justify-start">
      <v-col
        cols="12"
        md="3"
      >
        <v-text-field
          id="kommentar_datum"
          v-model.trim="kommentar.datum"
          maxlength="32"
        >
          <template #label> Datum </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          id="kommentar_anmerkungen"
          v-model="kommentar.text"
          label="Anmerkungen"
          auto-grow
          rows="3"
        />
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer />
      <v-btn
        id="yes_no_dialog-btn-no"
        class="text-wrap"
        text
        :disabled="!isSaveable"
        @click="saveKommentar"
        v-text="textSaveButton"
      />
      <v-btn
        id="yes_no_dialog-btn-yes"
        class="text-wrap"
        color="primary"
        :disabled="!isDeletable"
        @click="deleteKommentar"
        v-text="'Löschen'"
      />
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import KommentarApiRequestMixin from "@/mixins/requests/KommentarApiRequestMixin";
import { Component, Mixins, Emit, Prop } from "vue-property-decorator";
import KommentarModel from "@/types/model/common/KommentarModel";
import _ from "lodash";

@Component({})
export default class Kommentar extends Mixins(KommentarApiRequestMixin) {
  @Prop()
  private kommentar!: KommentarModel;

  get textSaveButton(): string {
    return _.isNil(this.kommentar.id) ? "Speichern" : "Aktualisieren";
  }

  get isSaveable(): boolean {
    return !_.isEmpty(this.kommentar.datum) || !_.isEmpty(this.kommentar.text);
  }

  get isDeletable(): boolean {
    return !_.isNil(this.kommentar.id);
  }

  @Emit()
  private saveKommentar(): KommentarModel {
    return this.kommentar;
  }

  @Emit()
  private deleteKommentar(): KommentarModel {
    return this.kommentar;
  }
}
</script>

<style scoped></style>
