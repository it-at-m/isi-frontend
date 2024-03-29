<template>
  <v-dialog
    v-model="showBedarfsmeldungDialog"
    persistent
    width="60%"
  >
    <v-form ref="bedarfsmeldungDialogForm">
      <v-card class="overflow-x-hidden">
        <v-card-title
          class="text-wrap align-stretch"
          v-text="'Bedarfsmeldung'"
        />
        <v-row justify="center">
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_einrichtungen"
              v-model="bedarfsmeldung.anzahlEinrichtungen"
              class="mx-3"
              label="Anzahl der Einrichtungen einer Größe"
              integer
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              id="bedarfsmeldung_infrastruktureinrichtung_typ"
              v-model="bedarfsmeldung.infrastruktureinrichtungTyp"
              class="mx-3"
              :items="infrastruktureinrichtungenTypList"
              item-value="key"
              item-text="value"
              :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
              @change="formChanged"
            >
              <template #label> Infrastruktureinrichtung Typ <span class="secondary--text">*</span> </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_anzahlKinderkrippengruppen"
              v-model="bedarfsmeldung.anzahlKinderkrippengruppen"
              class="mx-3"
              label="Anzahl der Kinderkrippengruppen"
              integer
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_anzahlKindergartengruppen"
              v-model="bedarfsmeldung.anzahlKindergartengruppen"
              class="mx-3"
              label="Anzahl der Kindergartengruppen"
              integer
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_anzahlHortgruppen"
              v-model="bedarfsmeldung.anzahlHortgruppen"
              class="mx-3"
              label="Anzahl der Hortgruppen"
              integer
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_anzahlGrundschulzuege"
              v-model="bedarfsmeldung.anzahlGrundschulzuege"
              class="mx-3"
              label="Anzahl der Grundschulzüge"
              integer
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            id="bedarfsmeldung_abbrechen_button"
            class="text-wrap"
            text
            @click="abbrechenBedarfsmeldung"
            v-text="'Abbrechen'"
          />
          <v-btn
            id="bedarfsmeldung_uebernehmen_button"
            class="text-wrap"
            color="primary"
            @click="uebernehmenBedarfsmeldung"
            v-text="'Übernehmen'"
          />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Mixins, VModel, Prop, Watch } from "vue-property-decorator";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import BedarfsmeldungModel from "@/types/model/abfragevariante/BedarfsmeldungModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import Toaster from "@/components/common/toaster.type";
import { Levels } from "@/api/error";
import _ from "lodash";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";

@Component
export default class BauvorhabenDataTransferDialog extends Mixins(
  ValidatorMixin,
  SaveLeaveMixin,
  FieldValidationRulesMixin,
) {
  @VModel({ type: BedarfsmeldungModel })
  bedarfsmeldung!: BedarfsmeldungModel;

  @Prop({ type: Boolean, default: false })
  private showBedarfsmeldungDialog!: boolean;

  get infrastruktureinrichtungenTypList(): LookupEntryDto[] {
    return this.$store.getters["lookup/infrastruktureinrichtungTyp"];
  }

  /**
   * Die Methode setzt die Validierung der Dialog-Form zurück, wenn sich der Wert von showBedarfsmeldungDialog ändert.
   * Dies verhindert, dass Validator-Fehlermeldungen schon beim Öffnen des Dialogs angezeigt werden.
   * Siehe: https://v2.vuetifyjs.com/en/components/forms/#validation-with-submit-26-clear
   */
  @Watch("showBedarfsmeldungDialog")
  private resetValidation(): void {
    if (!_.isNil(this.$refs.bedarfsmeldungDialogForm)) {
      this.$refs.bedarfsmeldungDialogForm.resetValidation();
    }
  }

  private uebernehmenBedarfsmeldung(): void {
    const validationMessage: string | null = this.findFaultInBedarfsmeldung(this.bedarfsmeldung);
    if (_.isNil(validationMessage)) {
      if (this.validateDialogForm()) {
        this.$emit("uebernehmen-bedarfsmeldung", this.bedarfsmeldung);
      } else {
        Toaster.toast("Es gibt noch Validierungsfehler", Levels.ERROR);
      }
    } else {
      Toaster.toast(validationMessage, Levels.ERROR);
    }
  }

  private validateDialogForm(): boolean {
    return (this.$refs.bedarfsmeldungDialogForm as Vue & { validate: () => boolean }).validate();
  }

  @Emit()
  private abbrechenBedarfsmeldung(): void {
    return;
  }
}
</script>
