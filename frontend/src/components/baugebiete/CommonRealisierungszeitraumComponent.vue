<template>
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
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import {
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
} from "@/api/api-client/isi-backend";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";
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

@Component({
  components: {
    NumField,
    FieldGroupCard,
  },
})
export default class CommonRealisierungszeitraumComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: BaugebietModel }) baugebiet!: BaugebietModel;

  @Prop()
  private abfragevariante:
    | AbfragevarianteBauleitplanverfahrenDto
    | AbfragevarianteBaugenehmigungsverfahrenDto
    | AbfragevarianteWeiteresVerfahrenDto
    | undefined;

  @Prop()
  private mode!: DisplayMode;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private validationRules: unknown = {
    validateWohneinheiten: (
      abfragevariante: AbfragevarianteBaugenehmigungsverfahrenDto | undefined,
    ): boolean | string => {
      return (
        verteilteWohneinheitenAbfragevariante(abfragevariante) <= wohneinheitenAbfragevariante(abfragevariante) ||
        `Insgesamt sind ${verteilteWohneinheitenAbfragevarianteFormatted(
          abfragevariante,
        )} von ${wohneinheitenAbfragevarianteFormatted(abfragevariante)} verteilt.`
      );
    },
    validateGeschossflaecheWohnen: (
      abfragevariante: AbfragevarianteBaugenehmigungsverfahrenDto | undefined,
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
