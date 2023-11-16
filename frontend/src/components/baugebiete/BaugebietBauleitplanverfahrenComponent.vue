<template>
  <v-container>
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
            :disabled="!isEditable"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="255"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Bezeichnung des Baugebiets <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-select
            id="baugebiet_art_bauliche_nutzung"
            v-model="baugebiet.artBaulicheNutzung"
            :disabled="!isEditable"
            class="mx-3"
            :items="artBaulicheNutzungList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld]"
            @change="formChanged"
          >
            <template #label> Art der baulichen Nutzung <span class="secondary--text">*</span> </template>
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
            :disabled="!isEditable"
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
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="baugebiet_geplante_anzahl_we"
            v-model="baugebiet.weGeplant"
            :disabled="!isEditable"
            :rules="[validationRules.validateWohneinheiten(abfragevariante)]"
            class="mx-3"
            label="Geplante Anzahl Wohneinheiten"
            :suffix="suffixWohneinheiten"
            integer
            max-value-signed-integer
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="baugebiet_geplante_geschossflaeche_wohnen"
            v-model="baugebiet.gfWohnenGeplant"
            :disabled="!isEditable"
            :rules="[validationRules.validateGeschossflaecheWohnen(abfragevariante)]"
            class="mx-3"
            label="Geplante Geschossfläche Wohnen"
            :suffix="suffixGeschossflaecheWohnen"
            max-value-decimal-numeral-precision10-scale2
          />
        </v-col>
      </v-row>
    </field-group-card>
    <bauraten-aggregiert-component :aggregate-bauraten="baugebiet" />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import { AbfragevarianteBauleitplanverfahrenDto, LookupEntryDto } from "@/api/api-client/isi-backend";
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
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";

@Component({ components: { NumField, FieldGroupCard, BauratenAggregiertComponent } })
export default class BaugebietBauleiplanverfahrenComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
) {
  private geschossflaecheWohnenCardTitle = "Geschossfläche Wohnen";

  private anzahlWECardTitle = "Anzahl Wohneinheiten";

  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  @Prop()
  private abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined;

  @Prop()
  private mode!: DisplayMode;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private validationRules: unknown = {
    validateWohneinheiten: (abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined): boolean | string => {
      return (
        verteilteWohneinheitenAbfragevariante(abfragevariante) <= wohneinheitenAbfragevariante(abfragevariante) ||
        `Insgesamt sind ${verteilteWohneinheitenAbfragevarianteFormatted(
          abfragevariante,
        )} von ${wohneinheitenAbfragevarianteFormatted(abfragevariante)} verteilt.`
      );
    },
    validateGeschossflaecheWohnen: (
      abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
    ): boolean | string => {
      return (
        verteilteGeschossflaecheWohnenAbfragevariante(abfragevariante) <=
          geschossflaecheWohnenAbfragevariante(abfragevariante) ||
        `Insgesamt sind ${verteilteGeschossflaecheWohnenAbfragevarianteFormatted(
          abfragevariante,
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
    return headline;
  }

  get artBaulicheNutzungList(): LookupEntryDto[] {
    return this.$store.getters["lookup/artBaulicheNutzung"];
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
