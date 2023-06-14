<template>
  <div>
    <v-row>
      <v-col cols="12">
        <span
          class="text-h6 font-weight-bold"
          v-text="headline"
        />
      </v-col>
    </v-row>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="baugebiet_bezeichnung"
            v-model.trim="baugebiet.bezeichnung"
            :disabled="!isEditableByAbfrageerstellung()"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="255"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Bezeichnung des Baugegebiets <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-select
            id="baugebiet_baugebietTyp"
            v-model="baugebiet.baugebietTyp"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            :items="baugebietTypList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld]"
            @change="formChanged"
          >
            <template #label> Baugebiet Typ <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
    </field-group-card>

    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungvon"
            v-model="baugebiet.realisierungVon"
            :disabled="!isEditableByAbfrageerstellung()"
            label="Realisierung von (JJJJ)"
            class="mx-3"
            :min="abfragevarianteRealisierungVonOr1900"
            :max="2100"
            integer
            no-grouping
            required
            maxlength="4"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungBis"
            v-model="calcRealisierungBis"
            :disabled="true"
            label="Realisierung bis (JJJJ)"
            class="mx-3"
            year
            maxlength="4"
          />
        </v-col>
      </v-row>
    </field-group-card>

    <field-group-card :card-title="geschossflaecheWohnenCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_geschossflaecheWohnenFestgesetzt"
            v-model="baugebiet.geschossflaecheWohnen"
            :disabled="!isEditableByAbfrageerstellung()"
            :rules="[validationRules.validateGeschossflaecheWohnen(abfragevariante)]"
            class="mx-3"
            label="Gesamt"
            :suffix="suffixGeschossflaecheWohnen"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_geschossflaecheWohnenGenehmigt"
            v-model="baugebiet.geschossflaecheWohnenGenehmigt"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Baurechtlich Genehmigt"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_geschossflaecheWohnenFestgesetzt"
            v-model="baugebiet.geschossflaecheWohnenFestgesetzt"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Baurechtlich Festgesetzt"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="anzahlWECardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_anzahlWeBaurechtlichGenehmigt"
            v-model="baugebiet.gesamtanzahlWe"
            :disabled="!isEditableByAbfrageerstellung()"
            :rules="[validationRules.validateWohneinheiten(abfragevariante)]"
            class="mx-3"
            label="Gesamt"
            :suffix="suffixWohneinheiten"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_anzahlWeBaurechtlichGenehmigt"
            v-model="baugebiet.anzahlWohneinheitenBaurechtlichGenehmigt"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Baurechtlich genehmigt"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="baugebiet_anzahlWeBaurechtlichFestgesetzt"
            v-model="baugebiet.anzahlWohneinheitenBaurechtlichFestgesetzt"
            :disabled="!isEditableByAbfrageerstellung()"
            class="mx-3"
            label="Baurechtlich festgesetzt"
            integer
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import { AbfragevarianteDto, LookupEntryDto } from "@/api/api-client/isi-backend";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import NumField from "@/components/common/NumField.vue";
import _ from "lodash";
import {
  verteilteGeschossflaecheWohnenAbfragevariante,
  wohneinheitenAbfragevariante,
  verteilteWohneinheitenAbfragevariante,
  verteilteWohneinheitenAbfragevarianteFormatted,
  wohneinheitenAbfragevarianteFormatted,
  geschossflaecheWohnenAbfragevariante,
  geschossflaecheWohnenAbfragevarianteFormatted,
  verteilteGeschossflaecheWohnenAbfragevarianteFormatted,
} from "@/utils/CalculationUtil";

@Component({ components: { NumField, FieldGroupCard } })
export default class BauabschnittComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  private geschossflaecheWohnenCardTitle = "Geschossfläche Wohnen";

  private anzahlWECardTitle = "Anzahl Wohneinheiten";

  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  @Prop()
  private abfragevariante: AbfragevarianteDto | undefined;

  @Prop()
  private mode!: DisplayMode;

  private validationRules: unknown = {
    validateWohneinheiten: (abfragevariante: AbfragevarianteDto | undefined): boolean | string => {
      return (
        verteilteWohneinheitenAbfragevariante(abfragevariante) <= wohneinheitenAbfragevariante(abfragevariante) ||
        `Insgesamt sind ${verteilteWohneinheitenAbfragevarianteFormatted(
          abfragevariante
        )} von ${wohneinheitenAbfragevarianteFormatted(abfragevariante)} verteilt.`
      );
    },
    validateGeschossflaecheWohnen: (abfragevariante: AbfragevarianteDto | undefined): boolean | string => {
      return (
        verteilteGeschossflaecheWohnenAbfragevariante(abfragevariante) <=
          geschossflaecheWohnenAbfragevariante(abfragevariante) ||
        `Insgesamt sind ${verteilteGeschossflaecheWohnenAbfragevarianteFormatted(
          abfragevariante
        )} m² von ${geschossflaecheWohnenAbfragevarianteFormatted(abfragevariante)} m² verteilt.`
      );
    },
  };

  get displayMode(): DisplayMode {
    return this.mode;
  }

  set displayMode(mode: DisplayMode) {
    this.$emit("input", mode);
  }

  get calcRealisierungBis(): number | undefined {
    return _.max(this.baugebiet.bauraten.map((baurate) => baurate.jahr));
  }

  get headline(): string {
    const headline = `Baugebiet ${this.baugebiet.bezeichnung} `;
    return this.displayMode === DisplayMode.NEU ? headline.concat("anlegen") : headline.concat("ändern");
  }

  get baugebietTypList(): LookupEntryDto[] {
    return this.$store.getters["lookup/baugebietTyp"];
  }

  get abfragevarianteRealisierungVonOr1900(): number {
    return !_.isNil(this.abfragevariante) && !_.isNil(this.abfragevariante.realisierungVon)
      ? this.abfragevariante.realisierungVon
      : 1900;
  }

  get suffixWohneinheiten(): string {
    return `von ${wohneinheitenAbfragevarianteFormatted(this.abfragevariante)}`;
  }

  get suffixGeschossflaecheWohnen(): string {
    return `von ${geschossflaecheWohnenAbfragevarianteFormatted(this.abfragevariante)} ${
      this.fieldPrefixesSuffixes.squareMeter
    }`;
  }
}
</script>
