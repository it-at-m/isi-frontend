<template>
  <v-form ref="form">
    <field-group-card :card-title="abfragevariantenCardTitle">
      <v-row justify="center">
        <v-col cols="12">
          <abfragevarianten-liste
            id="abfragevariante_liste_component"
            ref="abfragevariantenListe"
            v-model="abfragevarianten"
            @onEditAbfragevariante="editAbfragevariante"
            @onDeleteAbfragevariante="deleteAbfragevariante"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
        />
        <v-col
          cols="12"
          md="2"
        >
          <v-btn
            v-if="showAddAbfragevarianteButton"
            id="abfragevariante_hinzufuegen_button"
            block
            color="secondary"
            elevation="1"
            @click="openFormularDialog"
          >
            Hinzufügen
          </v-btn>
        </v-col>
      </v-row>
      <v-dialog
        v-model="showFormularDialog"
        persistent
        width="auto"                              
      >
        <v-card>
          <v-container>
            <abfragevariante-formular
              id="abfragevariante_formular_component"
              ref="abfragevarianteComponent"
              v-model="abfragevariante"              
              :mode="mode"             
              :sobon-relevant="isSobonRelevant" 
            />
            <v-card-actions>
              <v-spacer />
              <v-btn
                id="abfragevariante_abbrechen_dialog"
                text
                color="primary"
                @click="cancelFormularDialog"
              >
                Abbrechen
              </v-btn>
              <v-btn
                id="abfragevariante_uebernehmen_dialog"
                color="primary"
                @click="assumeAbfragevariante"
              >
                Übernehmen
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
    </field-group-card>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, VModel, Watch, Prop } from "vue-property-decorator";
import { UncertainBoolean } from "@/api/api-client";
import AbfragevariantenListe from "./AbfragevariantenListe.vue";
import AbfragevarianteFormular from "./AbfragevarianteFormular.vue";
import { createAbfragevarianteDto } from "@/utils/Factories";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import _ from "lodash";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import InformationListMixin from "@/mixins/requests/InformationListMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DisplayMode from "@/types/common/DisplayMode";
import Toaster from "@/components/common/toaster.type";
import { Levels } from "@/api/error";

@Component({
  components: {
    AbfragevariantenListe,
    AbfragevarianteFormular,
    FieldGroupCard
  },
})
export default class Abfragevarianten extends Mixins(
  ValidatorMixin,
  InformationListMixin,
  SaveLeaveMixin
) {
  @VModel({ type: Array }) abfragevarianten!: AbfragevarianteModel[];

  @Prop()
  private sobonRelevant!: UncertainBoolean;

  get isSobonRelevant(): UncertainBoolean {
    return this.sobonRelevant;
  }

  private abfragevariante = new AbfragevarianteModel(
    createAbfragevarianteDto()
  );

  private showAddAbfragevarianteButton = false;

  private abfragevariantenCardTitle = "Abfragevarianten";

  private showFormularDialog = false;

  private openFormularDialog(): void {
    this.showFormularDialog = true;
  }

  @Watch("abfragevarianten", { immediate: true, deep: true })
  private checkIfAbfragevariantenIsEmptyOrFull(): void {
    this.showAddAbfragevarianteButton = !_.isNil(this.abfragevarianten) && this.abfragevarianten.length <= 4; 
  }

  // Computed properties
  private get mode(): DisplayMode {
    let value: DisplayMode | undefined;
    value = _.isNaN(this.abfragevariante.abfragevariantenNr)
        ? DisplayMode.NEU
        : DisplayMode.AENDERUNG;
    return value;
  }

  /*
   * Abfragevariante aus Dialog übernehmen
  */
  private assumeAbfragevariante(): void {
    // alle Feld-Validatoren (:rules) werden aufgerufen, um sicherzustellen, dass diese Prüfungen vorher durchgeführt wurden
    if (this.validate()) {
      let validationMessage: string | null = this.findFaultInAbfragevariante(this.isSobonRelevant, this.abfragevariante, false);
      if (_.isNull(validationMessage)) {
        if (this.mode === DisplayMode.NEU) {
          this.abfragevarianten?.push(this.abfragevariante);
          this.renumberingAbfragevarianten();
        } else {
          const itemIndex: number = this.abfragevarianten.findIndex(
            (item) =>
              item.abfragevariantenNr ===
              this.abfragevariante.abfragevariantenNr
          );
          this.abfragevarianten.splice(itemIndex, 1, this.abfragevariante);
        }
        this.reset();
      } else {
        Toaster.toast(validationMessage, Levels.WARNING);
        //this.showWarningInInformationList(validationMessage);
      }
    }
  }
  
  private cancelFormularDialog(): void {
    this.reset();
  }

  private renumberingAbfragevarianten(): void {
    this.abfragevarianten.forEach((value, index) => {
      value.abfragevariantenNr = index + 1;
    });

  }

  private editAbfragevariante(abfragevariante: AbfragevarianteModel): void {
    this.showFormularDialog = true;
    this.abfragevariante = _.cloneDeep(abfragevariante);
  }

  private deleteAbfragevariante(abfragevariante: AbfragevarianteModel): void {
    if (this.abfragevarianten !== undefined) {
      this.abfragevarianten.forEach((item, index) => {
        if (item.abfragevariantenNr === abfragevariante.abfragevariantenNr) {
          this.abfragevarianten.splice(index, 1);
          this.renumberingAbfragevarianten();
          this.formChanged();
        }
      });
    }
    this.reset();
  }

  private reset(): void {
    this.showFormularDialog = false;
    if (!_.isNil(this.$refs.abfragevariantenListe)) {
      (this.$refs.abfragevariantenListe as AbfragevariantenListe).reset();
    }
    this.abfragevariante = new AbfragevarianteModel(createAbfragevarianteDto());
    (this.$refs.form as HTMLFormElement).resetValidation(); // dies verhindert, dass NACH anlegen/ändern, die Validatoren sofort wieder anschlagen
  }

  private validate(): boolean {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }
}
</script>
