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
            :disabled="!isEditableByAbfrageerstellung()"
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
            v-model="baurate.anzahlWeGeplant"
            :disabled="!isEditableByAbfrageerstellung()"
            label="Anzahl Wohneinheiten geplant"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <num-field
            id="bauraten_geschossflaecheWohnenGeplant"
            v-model="baurate.geschossflaecheWohnenGeplant"
            :disabled="!isEditableByAbfrageerstellung()"
            label="Geschossfläche Wohnen geplant"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
      </v-row>
      <v-row class="justify-start">
        <v-col
          class="pt-0 pb-2"
          cols="12"
          md="4"
        />
        <v-col
          class="pt-0 pb-2"
          cols="12"
          md="4"
        >
          <v-tooltip
            right
            :open-delay="250"
          >
            <template #activator="{ on }">
              <v-chip
                small
                v-on="on"
              >
                {{ verteilteWohneinheiten }} / {{ wohneinheiten }}
              </v-chip>
            </template>
            <span>{{ tooltipTextWohneinheiten }}</span>
          </v-tooltip>
        </v-col>
        <v-col
          class="pt-0 pb-2"
          cols="12"
          md="4"
        >
          <v-tooltip
            right
            :open-delay="250"
          >
            <template #activator="{ on }">
              <v-chip
                small
                v-on="on"
              >
                {{ verteilteGeschossflaecheWohnen }} / {{ geschossflaecheWohnen }}
                {{ fieldPrefixesSuffixes.squareMeter }}
              </v-chip>
            </template>
            <span>{{ tooltipTextGeschossflaecheWohnen }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </field-group-card>
    <v-row>
      <foerdermix-formular
        id="foerdermix_formular_component"
        ref="Foerdermix"
        v-model="baurate.foerdermix"
      >
        <foerdermix-staemme-drop-down
          id="foerdermix_stammdaten_dropdown_component"
          ref="Foerdermix Staemme Drop Down"
          v-model="baurate.foerdermix"
        />
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
import FoerdermixStaemmeDropDown from "@/components/bauraten/foerdermix/FoerdermixStaemmeDropDown.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import { AbfragevarianteDto, BaugebietDto } from "@/api/api-client/isi-backend";
import NumField from "@/components/common/NumField.vue";
import _ from "lodash";
import {
  anzahlUeberBauratenVerteilteWohneinheitenForAbfragevariante,
  anzahlUeberBauratenVerteilteWohneinheitenForBaugebiet,
  anzahlUeberBauratenVerteilteGeschossflaecheWohnenForAbfragevariante,
  anzahlUeberBauratenVerteilteGeschossflaecheWohnenForBaugebiet,
  numberToFormattedStringZeroDecimals,
  numberToFormattedStringTwoDecimals,
} from "@/utils/CalculationUtil";

@Component({
  components: { NumField, FoerdermixFormular, FoerdermixStaemmeDropDown, FieldGroupCard },
})
export default class BaurateComponent extends Mixins(
  ValidatorMixin,
  FieldPrefixesSuffixes,
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  @VModel({ type: BaurateModel }) baurate!: BaurateModel;

  @Prop()
  private baugebiet: BaugebietDto | undefined;

  @Prop()
  private abfragevariante: AbfragevarianteDto | undefined;

  get baugebietRealisierungVonOr1900(): number {
    return _.isNil(this.baugebiet) ? 1900 : this.baugebiet.realisierungVon;
  }

  get wohneinheiten(): string {
    let value: number;
    if (this.baugebiet?.technical) {
      value =
        !_.isNil(this.abfragevariante) && !_.isNil(this.abfragevariante?.gesamtanzahlWe)
          ? this.abfragevariante.gesamtanzahlWe
          : 0;
    } else {
      value = !_.isNil(this.baugebiet) && !_.isNil(this.baugebiet?.gesamtanzahlWe) ? this.baugebiet.gesamtanzahlWe : 0;
    }
    return numberToFormattedStringZeroDecimals(value);
  }

  get verteilteWohneinheiten(): string {
    let value: number;
    if (this.baugebiet?.technical) {
      value = _.isNil(this.abfragevariante)
        ? 0
        : anzahlUeberBauratenVerteilteWohneinheitenForAbfragevariante(this.abfragevariante);
    } else {
      value = _.isNil(this.baugebiet) ? 0 : anzahlUeberBauratenVerteilteWohneinheitenForBaugebiet(this.baugebiet);
    }
    return numberToFormattedStringZeroDecimals(value);
  }

  get tooltipTextWohneinheiten(): string {
    return (
      `Es sind ${this.verteilteWohneinheiten} m² von ${this.wohneinheiten} m² ` +
      `Geschossfläche Wohnen ${
        this.baugebiet?.technical ? "der Abfragevariante" : "des Baugebiets"
      } auf Bauraten verteilt.`
    );
  }

  get geschossflaecheWohnen(): string {
    let value: number;
    if (this.baugebiet?.technical) {
      value =
        !_.isNil(this.abfragevariante) && !_.isNil(this.abfragevariante?.geschossflaecheWohnen)
          ? this.abfragevariante.geschossflaecheWohnen
          : 0;
    } else {
      value =
        !_.isNil(this.baugebiet) && !_.isNil(this.baugebiet?.geschossflaecheWohnen)
          ? this.baugebiet.geschossflaecheWohnen
          : 0;
    }
    return numberToFormattedStringTwoDecimals(value);
  }

  get verteilteGeschossflaecheWohnen(): string {
    let value: number;
    if (this.baugebiet?.technical) {
      value = _.isNil(this.abfragevariante)
        ? 0
        : anzahlUeberBauratenVerteilteGeschossflaecheWohnenForAbfragevariante(this.abfragevariante);
    } else {
      value = _.isNil(this.baugebiet)
        ? 0
        : anzahlUeberBauratenVerteilteGeschossflaecheWohnenForBaugebiet(this.baugebiet);
    }
    return numberToFormattedStringTwoDecimals(value);
  }

  get tooltipTextGeschossflaecheWohnen(): string {
    return (
      `Es sind ${this.verteilteGeschossflaecheWohnen} m² von ${this.geschossflaecheWohnen} m² ` +
      `Geschossfläche Wohnen ${
        this.baugebiet?.technical ? "der Abfragevariante" : "des Baugebiets"
      } auf Bauraten verteilt.`
    );
  }
}
</script>

<style></style>
