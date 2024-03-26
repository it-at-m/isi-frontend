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
            :items="abfragevarianteSachbearbeitung.bauratendateiInputBasis?.grundschulsprengel"
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
          <spreadsheet
            :id="'abfragevarianteSachbearbeitung_bauratendatei_wohneinheiten_' + index"
            :headers="headers(input)"
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
import { BauratendateiInputDto } from "@/api/api-client/isi-backend";
import { DataTableHeader } from "vuetify";
import _ from "lodash";

@Component({ components: { FieldGroupCard, Spreadsheet } })
export default class BauratendateiInputs extends Mixins(SaveLeaveMixin) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private headers(input: BauratendateiInputDto): DataTableHeader[] {
    const foerderarten = new Set<string>();
    if (input.wohneinheiten) {
      for (const wohneinheiten of input.wohneinheiten) {
        if (!_.isNil(wohneinheiten.foerderart)) {
          foerderarten.add(wohneinheiten.foerderart);
        }
      }
    }
    const headers = Array.from(foerderarten).map((foerdert) => {
      return { text: foerdert, value: foerdert };
    });
    headers.push({ text: "Jahr", value: "jahr" });
    return headers;
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
