<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-checkbox
          id="has_bauratendatei_checkbox"
          v-model="abfragevarianteSachbearbeitung.hasBauratendateiInput"
          label="Daten für Bauratendatei angeben"
          color="primary"
          :disabled="!isEditable"
          @change="checkBoxChanged"
        />
      </v-col>
    </v-row>
    <div
      v-for="(input, index) in abfragevarianteSachbearbeitung.bauratendateiInput"
      :key="index"
    >
      <v-divider />
      <v-btn
        @click="deleteInput(index)"
        v-text="'Löschen'"
      />
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-autocomplete
            :id="'bauratendatei_grundschulsprengel_' + index"
            v-model="input.grundschulsprengel"
            :items="abfragevarianteSachbearbeitung?.bauratendateiInputBasis?.grundschulsprengel"
            item-value="key"
            item-text="value"
            multiple
            chips
            label="Grundschulesprengel"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-autocomplete
            :id="'abfragevarianteSachbearbeitung_bauratendatei_mittelschulsprengel_' + index"
            v-model="input.mittelschulsprengel"
            :items="abfragevarianteSachbearbeitung.bauratendateiInputBasis?.mittelschulsprengel"
            item-value="key"
            item-text="value"
            multiple
            chips
            label="Mittelschulsprengel"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-autocomplete
            :id="'abfragevarianteSachbearbeitung_bauratendatei_viertel_' + index"
            v-model="input.viertel"
            :items="abfragevarianteSachbearbeitung.bauratendateiInputBasis?.viertel"
            item-value="key"
            item-text="value"
            multiple
            chips
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
          <spreadsheet-bauratendatei-input
            :id="'spreadsheet_bauratendatei_input_' + index"
            :foerderarten-bauratendatei-input-basis="foerderartenBauratendateiInputBasis"
            :is-editable="isEditable"
            v-model="abfragevarianteSachbearbeitung.bauratendateiInput"
          />
        </v-col>
      </v-row>
    </div>
    <v-btn
      @click="addInput"
      v-text="'Neuer Eintrag'"
    />
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          id="abfragevarianteSachbearbeitung_bauratendatei_anmerkung"
          v-model="abfragevarianteSachbearbeitung.anmerkungBauratendateiInput"
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
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import Spreadsheet from "@/components/common/Spreadsheet.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import _ from "lodash";
import SpreadsheetBauratendateiInput from "@/components/abfragevarianten/SpreadsheetBauratendateiInput.vue";

@Component({ components: { SpreadsheetBauratendateiInput, FieldGroupCard, Spreadsheet } })
export default class BauratendateiInput extends Mixins(SaveLeaveMixin) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private foerderartenBauratendateiInputBasis(): Array<string | undefined> {
    const wohneinheiten = _.toArray(this.abfragevarianteSachbearbeitung?.bauratendateiInput)
      .flatMap((bauratendateiInput) => _.toArray(bauratendateiInput.wohneinheiten))
      .filter((wohneinheitenProFoerderartProJahr) => !_.isNil(wohneinheitenProFoerderartProJahr.foerderart))
      .map((wohneinheitenProFoerderartProJahr) => wohneinheitenProFoerderartProJahr.foerderart);
    return _.uniq(wohneinheiten);
  }

  private checkBoxChanged(): void {
    const isBaurateninputCheckboxChecked =
      !_.isNil(this.abfragevarianteSachbearbeitung.hasBauratendateiInput) &&
      this.abfragevarianteSachbearbeitung.hasBauratendateiInput;
    if (!isBaurateninputCheckboxChecked) {
      this.abfragevarianteSachbearbeitung.anmerkungBauratendateiInput = undefined;
      this.abfragevarianteSachbearbeitung.bauratendateiInput = [];
    }
    this.formChanged();
  }

  private deleteInput(index: number): void {
    this.abfragevarianteSachbearbeitung.bauratendateiInput?.splice(index, 1);
    this.formChanged();
  }

  private addInput(): void {
    this.abfragevarianteSachbearbeitung.bauratendateiInput?.push({});
    this.formChanged();
  }
}
</script>
