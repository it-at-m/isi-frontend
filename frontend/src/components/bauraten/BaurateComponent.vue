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
      <v-row
        v-if="showVerteilungWohneinheiten || showVerteilungGeschossflaecheWohnen"
        class="justify-start"
      >
        <v-col
          cols="12"
          md="4"
        />
        <v-col
          cols="12"
          md="4"
        >
          <v-chip
            v-if="showVerteilungWohneinheiten"
            small
          >
            {{ verteilteWohneinheitenAbfragevariante }} / {{ wohneinheitenAbfragevariante }}
          </v-chip>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-chip
            v-if="showVerteilungGeschossflaecheWohnen"
            small
          >
            {{ verteilteGeschossflaecheWohnenAbfragevariante }} / {{ geschossflaecheWohnenAbfragevariante }}
          </v-chip>
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
  anzahlUeberBaugebieteVerteilteGeschossflaecheWohnen,
  anzahlUeberBaugebieteVerteilteWohneinheiten,
  anzahlUeberBauratenVerteilteGeschossflaecheWohnen,
  anzahlUeberBauratenVerteilteWohneinheiten,
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

  get showVerteilungWohneinheiten(): boolean {
    return this.wohneinheitenAbfragevariante !== undefined && this.verteilteWohneinheitenAbfragevariante !== undefined;
  }

  get wohneinheitenAbfragevariante(): number | undefined {
    return this.abfragevariante?.gesamtanzahlWe;
  }

  get verteilteWohneinheitenAbfragevariante(): number | undefined {
    let verteilteWohneiheiten: number | undefined;
    if (!_.isNil(this.abfragevariante)) {
      verteilteWohneiheiten = anzahlUeberBauratenVerteilteWohneinheiten(this.abfragevariante);
    }
    return verteilteWohneiheiten;
  }

  get showVerteilungGeschossflaecheWohnen(): boolean {
    return (
      this.geschossflaecheWohnenAbfragevariante !== undefined &&
      this.verteilteGeschossflaecheWohnenAbfragevariante !== undefined
    );
  }

  get geschossflaecheWohnenAbfragevariante(): number | undefined {
    return this.abfragevariante?.geschossflaecheWohnen;
  }

  get verteilteGeschossflaecheWohnenAbfragevariante(): number | undefined {
    let verteilteWohneiheiten: number | undefined;
    if (!_.isNil(this.abfragevariante)) {
      verteilteWohneiheiten = anzahlUeberBauratenVerteilteGeschossflaecheWohnen(this.abfragevariante);
    }
    return verteilteWohneiheiten;
  }
}
</script>

<style></style>
