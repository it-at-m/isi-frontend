<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-checkbox
          id="abfragevarianteSachbearbeitung_bauratendatei_checkbox"
          v-model="hasBauratenDateiInput"
          label="Daten für Bauratendatei angeben"
          :disabled="!isEditable"
          @change="checkboxChanged"
        />
      </v-col>
    </v-row>
    <v-slide-y-reverse-transition>
      <div
        v-for="(entry, index) in bauratenDateiInput"
        :key="index"
      >
        <v-divider />
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              :id="'abfragevarianteSachbearbeitung_bauratendatei_grundschulsprengel_' + index"
              label="Grundschulesprengel"
              :disabled="!isEditable"
              @input="formChanged"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              :id="'abfragevarianteSachbearbeitung_bauratendatei_mittelschulsprengel_' + index"
              label="Mittelschulsprengel"
              :disabled="!isEditable"
              @input="formChanged"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              :id="'abfragevarianteSachbearbeitung_bauratendatei_viertel_' + index"
              label="Viertel"
              :disabled="!isEditable"
              @input="formChanged"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <spreadsheet :id="'abfragevarianteSachbearbeitung_bauratendatei_wohneinheiten_' + index" />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-textarea
              :id="'abfragevarianteSachbearbeitung_bauratendatei_anmerkung_' + index"
              v-model="abfragevarianteSachbearbeitung.anmerkung"
              :disabled="!isEditable"
              label="Anmerkungen"
              auto-grow
              rows="3"
              maxlength="1000"
              @input="formChanged"
            />
          </v-col>
        </v-row>
      </div>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import Spreadsheet from "@/components/common/Spreadsheet.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({ components: { FieldGroupCard, Spreadsheet } })
export default class BauratenDateiInput extends Mixins(SaveLeaveMixin) {
  // TODO: type: BauratenDateiInputModel
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  // TODO = bauratenDateiInput.length > 0
  private hasBauratenDateiInput = false;

  private checkboxChanged(): void {
    if (this.hasBauratenDateiInput) {
      // TODO: Felder vorbefüllen
    } else {
      // TODO: this.bauratenDateiInput = [];
    }

    this.formChanged();
  }
}
</script>
