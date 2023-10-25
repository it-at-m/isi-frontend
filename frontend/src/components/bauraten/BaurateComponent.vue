<template>
  <v-container>
    <field-group-card>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="bauraten_jahr"
            v-model="baurate.jahr"
            :disabled="!isEditable"
            label="Jahr (JJJJ)"
            :min="baugebietRealisierungVonOr1900"
            :max="2100"
            integer
            no-grouping
            required
            maxlength="4"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="bauraten_anzahlWeGeplant"
            v-model="baurate.weGeplant"
            :disabled="!isEditable"
            :rules="[validationRules.validateWohneinheiten(baugebiet, abfragevariante)]"
            label="Geplante Anzahl Wohneinheiten"
            :suffix="suffixWohneinheiten"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="bauraten_geschossflaecheWohnenGeplant"
            v-model="baurate.gfWohnenGeplant"
            :disabled="!isEditable"
            :rules="[validationRules.validateGeschossflaecheWohnen(baugebiet, abfragevariante)]"
            label="Geplante Geschossfläche Wohnen"
            :suffix="suffixGeschossflaecheWohnen"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <v-row>
      <foerdermix-formular
        id="foerdermix_formular_component"
        ref="Foerdermix"
        v-model="baurate.foerdermix"
        :is-editable="isEditable"
      >
      </foerdermix-formular>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import FoerdermixFormular from "@/components/bauraten/foerdermix/FoerdermixFormular.vue";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import { AbfragevarianteBauleitplanverfahrenDto, BaugebietDto } from "@/api/api-client/isi-backend";
import NumField from "@/components/common/NumField.vue";
import _ from "lodash";
import {
  wohneinheiten,
  wohneinheitenFormatted,
  verteilteWohneinheiten,
  verteilteWohneinheitenFormatted,
  geschossflaecheWohnenFormatted,
  verteilteGeschossflaecheWohnen,
  geschossflaecheWohnen,
  verteilteGeschossflaecheWohnenFormatted,
} from "@/utils/CalculationUtil";

@Component({
  components: { NumField, FoerdermixFormular, FieldGroupCard },
})
export default class BaurateComponent extends Mixins(
  ValidatorMixin,
  FieldPrefixesSuffixes,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
) {
  @VModel({ type: BaurateModel }) baurate!: BaurateModel;

  @Prop()
  private baugebiet: BaugebietDto | undefined;

  @Prop()
  private abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private validationRules: unknown = {
    validateWohneinheiten: (
      baugebiet: BaugebietDto | undefined,
      abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
    ): boolean | string => {
      return (
        verteilteWohneinheiten(baugebiet, abfragevariante) <= wohneinheiten(baugebiet, abfragevariante) ||
        `Insgesamt sind ${verteilteWohneinheitenFormatted(baugebiet, abfragevariante)} von ${wohneinheitenFormatted(
          baugebiet,
          abfragevariante,
        )} verteilt.`
      );
    },
    validateGeschossflaecheWohnen: (
      baugebiet: BaugebietDto | undefined,
      abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
    ): boolean | string => {
      return (
        verteilteGeschossflaecheWohnen(baugebiet, abfragevariante) <=
          geschossflaecheWohnen(baugebiet, abfragevariante) ||
        `Insgesamt sind ${verteilteGeschossflaecheWohnenFormatted(
          baugebiet,
          abfragevariante,
        )} m² von ${geschossflaecheWohnenFormatted(baugebiet, abfragevariante)} m² verteilt.`
      );
    },
  };

  get baugebietRealisierungVonOr1900(): number {
    let year: number;
    if (!_.isNil(this.baugebiet) && this.baugebiet?.technical) {
      year =
        !_.isNil(this.abfragevariante) && !_.isNil(this.abfragevariante.realisierungVon)
          ? this.abfragevariante.realisierungVon
          : 1900;
    } else if (!_.isNil(this.baugebiet) && !this.baugebiet?.technical) {
      year = !_.isNil(this.baugebiet.realisierungVon) ? this.baugebiet.realisierungVon : 1900;
    } else {
      year = 1900;
    }
    return year;
  }

  get suffixWohneinheiten(): string {
    return `von ${wohneinheitenFormatted(this.baugebiet, this.abfragevariante)}`;
  }

  get suffixGeschossflaecheWohnen(): string {
    return `von ${geschossflaecheWohnenFormatted(this.baugebiet, this.abfragevariante)} ${
      this.fieldPrefixesSuffixes.squareMeter
    }`;
  }
}
</script>

<style></style>
