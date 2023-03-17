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
            label="Jahr (JJJJ)"
            year
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
            label="Geschossfläche Wohnen geplant"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
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
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-btn
          id="bauraten_speichern_button"
          class="text-wrap"
          elevation="1"
          @click="saveBaurate()"
          v-text="'Baurate speichern (nur Vorübergehend)'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import BauratenApiRequestMixin from "@/mixins/requests/BauratenApiRequestMixin";
import FoerdermixFormular from "@/components/bauraten/foerdermix/FoerdermixFormular.vue";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import _ from "lodash";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import FoerdermixStaemmeDropDown from "@/components/bauraten/foerdermix/FoerdermixStaemmeDropDown.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({
  components: { FoerdermixFormular, FoerdermixStaemmeDropDown, FieldGroupCard },
})
export default class BauratenComponent extends Mixins(
  BauratenApiRequestMixin,
  ValidatorMixin,
  FieldPrefixesSuffixes,
  SaveLeaveMixin 
) {

  @VModel({ type: BaurateModel }) baurate!: BaurateModel;

  private async saveBaurate(): Promise<void> {
    let validationMessage: string | null = this.findFaultInBaurate(
      this.baurate
    );

    if (_.isNull(validationMessage)) {
      await this.createBaurate(this.baurate, true).then(() => {
        this.handleSucces();
      });
    } else {
      this.showWarningInInformationList(validationMessage);
    }
  }

  private handleSucces(): void {
    this.showSuccessInInformationList(
      "Die Baurate wurde erfolgreich gespeichert"
    );
  }
}
</script>

<style>
</style>
