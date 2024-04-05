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
          class="mx-3"
          label="Daten für Bauratendatei angeben"
          color="primary"
          :disabled="!isEditable"
          @change="checkBoxChanged"
        />
      </v-col>
    </v-row>
    <div v-if="abfragevarianteSachbearbeitung.hasBauratendateiInput === true">
      <v-card
        v-for="(input, index) in abfragevarianteSachbearbeitung.bauratendateiInput"
        :key="index"
        class="px-3 pt-2 pb-3 mt-10"
        outlined
      >
        <v-spacer />
        <v-btn
          icon
          :disabled="!isEditable"
          @click="deleteInput(index)"
        >
          <v-icon> mdi-delete </v-icon>
        </v-btn>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-combobox
              v-model="input.grundschulsprengel"
              label="Grundschulsprengel"
              hide-no-data
              :append-icon="''"
              multiple
              chips
              deletable-chips
              :disabled="!isEditable"
              @input="formChanged"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-combobox
              v-model="input.mittelschulsprengel"
              label="Mittelschulsprengel"
              hide-no-data
              :append-icon="''"
              multiple
              chips
              deletable-chips
              :disabled="!isEditable"
              @input="formChanged"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-combobox
              v-model="input.viertel"
              label="Viertel"
              hide-no-data
              :append-icon="''"
              multiple
              chips
              deletable-chips
              :disabled="!isEditable"
              @input="formChanged"
            />
          </v-col>
        </v-row>
        <spreadsheet-bauratendatei-input
          :id="'spreadsheet_bauratendatei_input_' + index"
          v-model="input.wohneinheiten"
          :foerderarten-bauratendatei-input-basis="foerderartenBauratendateiInputBasis"
          :is-editable="isEditable"
        />
      </v-card>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-btn
            :disabled="!isEditable"
            @click="addInput"
            v-text="'Neuer Eintrag'"
          />
        </v-col>
      </v-row>
    </div>
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
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import _ from "lodash";
import SpreadsheetBauratendateiInput from "@/components/abfragevarianten/SpreadsheetBauratendateiInput.vue";

@Component({ components: { SpreadsheetBauratendateiInput, FieldGroupCard } })
export default class BauratendateiInput extends Mixins(SaveLeaveMixin) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get foerderartenBauratendateiInputBasis(): Array<string | undefined> {
    const wohneinheiten = _.toArray(this.abfragevarianteSachbearbeitung?.bauratendateiInput)
      .flatMap((bauratendateiInput) => _.toArray(bauratendateiInput.wohneinheiten))
      .filter((wohneinheitenProFoerderartProJahr) => !_.isNil(wohneinheitenProFoerderartProJahr.foerderart))
      .map((wohneinheitenProFoerderartProJahr) => wohneinheitenProFoerderartProJahr.foerderart);
    return _.uniq(wohneinheiten.sort());
  }

  private checkBoxChanged(): void {
    const isBaurateninputCheckboxChecked =
      !_.isNil(this.abfragevarianteSachbearbeitung.hasBauratendateiInput) &&
      this.abfragevarianteSachbearbeitung.hasBauratendateiInput;
    if (!isBaurateninputCheckboxChecked) {
      this.abfragevarianteSachbearbeitung.bauratendateiInputBasis = undefined;
      this.abfragevarianteSachbearbeitung.bauratendateiInput = [];
    }
    this.formChanged();
  }

  private deleteInput(index: number): void {
    this.abfragevarianteSachbearbeitung.bauratendateiInput?.splice(index, 1);
    this.formChanged();
  }

  private addInput(): void {
    const newInput = _.cloneDeep(this.abfragevarianteSachbearbeitung.bauratendateiInputBasis);
    if (!_.isNil(newInput)) {
      newInput.id = undefined;
      newInput.createdDateTime = undefined;
      newInput.lastModifiedDateTime = undefined;
      newInput.version = undefined;
      this.abfragevarianteSachbearbeitung.bauratendateiInput?.push(newInput);
    }
    this.formChanged();
  }
}
</script>
