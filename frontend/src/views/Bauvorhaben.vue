<template>
  <v-form ref="form">
    <default-layout solid-heading>
      <template #heading>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="bauvorhaben_nameVorhaben"
                v-model.trim="bauvorhaben.nameVorhaben"
                :rules="[fieldValidationRules.pflichtfeld]"
                maxlength="255"
                validate-on-blur
                @input="formChanged"
              >
                <template #label> Name des Bauvorhabens <span class="secondary--text">*</span> </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template #content>
        <bauvorhaben-form
          id="bauvorhaben_bauvorhabenForm_component"
          v-model="bauvorhaben"
        />
      </template>
      <template #information>
        <v-btn
          v-if="!isNew"
          id="bauvorhaben_loeschen_button"
          class="text-wrap my-4"
          color="primary"
          elevation="1"
          width="200px"
          @click="deleteDialogOpen = true"
          v-text="'Löschen'"
        />
        <v-btn
          v-else
          id="bauvorhaben_datenuebernahme_button"
          class="text-wrap my-4"
          color="primary"
          elevation="1"
          width="200px"
          @click="dataTransferDialogOpen = true"
          v-text="'Datenübernahme'"
        />
        <information-list
          id="bauvorhaben_information_list"
          information-message-deletion-intervall-seconds="10"
        />
      </template>
      <template #action>
        <v-spacer />
        <v-btn
          id="bauvorhaben_speichern_button"
          color="secondary"
          elevation="1"
          class="text-wrap mt-2 px-1"
          style="width: 200px"
          :disabled="(!isNew && !isDirty()) || containsNotAllowedDokument(bauvorhaben.dokumente)"
          @click="validateAndProceed()"
          v-text="isNew ? 'Speichern' : 'Aktualisieren'"
        />
        <v-btn
          id="bauvorhaben_abbrechen_button"
          color="primary"
          elevation="1"
          class="text-wrap mt-2 px-1"
          style="width: 200px"
          @click="returnToUebersicht()"
          v-text="'Abbrechen'"
        />
      </template>
    </default-layout>
    <yes-no-dialog
      id="bauvorhaben_yes_no_dialog_loeschen"
      v-model="deleteDialogOpen"
      icon="mdi-delete-forever"
      dialogtitle="Hinweis"
      dialogtext="Hiermit wird das Bauvorhaben unwiderruflich gelöscht."
      no-text="Abbrechen"
      yes-text="Löschen"
      @no="deleteDialogOpen = false"
      @yes="removeBauvorhaben()"
    />
    <yes-no-dialog
      id="bauvorhaben_yes_no_dialog_save_leave"
      ref="saveLeaveDialog"
      v-model="saveLeaveDialog"
      :dialogtitle="saveLeaveDialogTitle"
      :dialogtext="saveLeaveDialogText"
      :no-text="saveLeaveNoText"
      :yes-text="saveLeaveYesText"
      @yes="leave"
      @no="cancel"
    />
    <bauvorhaben-data-transfer-dialog
      id="bauvorhaben_datenuebernahme"
      v-model="dataTransferDialogOpen"
      @abfrage-uebernehmen="abfrageUebernehmen($event)"
      @uebernahme-abbrechen="dataTransferDialogOpen = false"
    />
  </v-form>
</template>

<script lang="ts">
import { Component, Mixins, Vue, Watch } from "vue-property-decorator";
import Toaster from "../components/common/toaster.type";
import { createAdresseDto, createBauvorhabenDto } from "@/utils/Factories";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import _ from "lodash";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import { Levels } from "@/api/error";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import InformationList from "@/components/common/InformationList.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import InformationListMixin from "@/mixins/requests/InformationListMixin";
import BauvorhabenForm from "@/components/bauvorhaben/BauvorhabenForm.vue";
import BauvorhabenDataTransferDialog from "@/components/bauvorhaben/BauvorhabenDataTransferDialog.vue";
import { InfrastrukturabfrageDto } from "@/api/api-client/isi-backend";
import { containsNotAllowedDokument } from "@/utils/DokumenteUtil";

@Component({
  methods: { containsNotAllowedDokument },
  components: {
    BauvorhabenDataTransferDialog,
    BauvorhabenForm,
    YesNoDialog,
    DefaultLayout,
    Dokumente,
    InformationList,
  },
})
export default class Bauvorhaben extends Mixins(
  FieldValidationRulesMixin,
  ValidatorMixin,
  BauvorhabenApiRequestMixin,
  SaveLeaveMixin,
  InformationListMixin
) {
  private bauvorhaben = new BauvorhabenModel(createBauvorhabenDto());

  private deleteDialogOpen = false;

  private dataTransferDialogOpen = false;

  private isNew = true;

  mounted(): void {
    this.isNew = this.$route.params.id === undefined;

    if (!this.isNew) {
      this.fetchBauvorhabenById();
    }
  }

  @Watch("$store.state.search.selectedBauvorhaben", { immediate: true, deep: true })
  private selectedBauvorhabenChanged() {
    const bauvorhabenFromStore = this.$store.getters["search/selectedBauvorhaben"];
    if(!_.isNil(bauvorhabenFromStore)) {
      this.bauvorhaben = _.cloneDeep(bauvorhabenFromStore);
    }
  }

  /**
   * Löst zuerst eine Validierung des Formulars aus.
   * Ist das Formular valide, wird auf sonstige Mängel überprüft.
   * Gibt es keine sonstigen Mängel, wird entweder das neue Bauvorhaben gespeichert oder das vorhandene Bauvorhaben aktualisiert.
   */
  private validateAndProceed(): void {
    if (this.validate()) {
      const fault = this.findFaultInBauvorhaben(this.bauvorhaben);

      if (fault === null) {
        if (this.isNew) {
          this.saveBauvorhaben();
        } else {
          this.updateBauvorhaben();
        }
      } else {
        this.showWarningInInformationList(fault);
      }
    } else {
      this.showWarningInInformationList("Es gibt noch Validierungsfehler");
    }
  }

  /**
   * Schickt eine GET-Anfrage für das ausgewählte Bauvorhaben ans Backend.
   */
  async fetchBauvorhabenById(): Promise<void> {
    await this.getBauvorhabenById(this.$route.params.id, false).then((dto) => {
      this.$store.commit("search/selectedBauvorhaben", dto);
      const dtoFromStore = _.cloneDeep(this.$store.getters["search/selectedBauvorhaben"]);
      this.bauvorhaben = new BauvorhabenModel(dtoFromStore);
    });
  }

  /**
   * Schickt eine POST-Anfrage für das neue Bauvorhaben ans Backend.
   * Bei Erfolg kehrt man zur Bauvorhabenübersicht zurück.
   */
  private async saveBauvorhaben(): Promise<void> {
    await this.postBauvorhaben(this.bauvorhaben, true).then(() => {
      this.returnToUebersicht("Das Bauvorhaben wurde erfolgreich gespeichert", Levels.SUCCESS);
    });
  }

  /**
   * Schickt eine PUT-Anfrage für das derzeitige Bauvorhaben ans Backend.
   * Bei Erfolg kehrt man zur Bauvorhabenübersicht zurück.
   */
  private async updateBauvorhaben(): Promise<void> {
    await this.putBauvorhaben(this.bauvorhaben, true)
      .then((dto) => {
          this.$store.commit("search/selectedBauvorhaben", new BauvorhabenModel(dto));
          this.$store.dispatch("search/resetBauvorhaben");
          Toaster.toast("Das Bauvorhaben wurde erfolgreich aktualisiert", Levels.SUCCESS);
        });
  }

  /**
   * Schickt eine DELETE-Anfrage für das derzeitige Bauvorhaben ans Backend.
   * Bei Erfolg kehrt man zur Bauvorhabenübersicht zurück.
   */
  private async removeBauvorhaben(): Promise<void> {
    this.deleteDialogOpen = false;

    await this.deleteBauvorhaben(this.$route.params.id, true).then(() => {
      this.returnToUebersicht("Das Bauvorhaben wurde erfolgreich gelöscht", Levels.SUCCESS);
    });
  }

  /**
   * Kehrt zur Bauvorhabenübersicht und setzt das im Store zurzeit ausgewählte Bauvorhaben auf undefined.
   * Zeigt dabei optionalerweise auch eine Nachricht per Toaster an.
   *
   * @param message Die anzuzeigende Nachricht. Optional.
   * @param level Das Level der anzuzeigenden Nachricht. Optional, doch obligatorisch in Kombination mit message.
   */
  private returnToUebersicht(message?: string, level?: Levels): void {
    if (message && level) {
      Toaster.toast(message, level);
    }

    this.$router.push({ name: "viewAllBauvorhaben" });
    this.$store.commit("search/selectedBauvorhaben", undefined);
  }

  /**
   * Shorthand zum Ausführen der validate-Methode vom v-form.
   *
   * @return Ob das Formular valide ist.
   */
  private validate(): boolean {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  private abfrageUebernehmen(abfrage: InfrastrukturabfrageDto): void {
    this.bauvorhaben.adresse = _.isNil(abfrage.abfrage.adresse) ? createAdresseDto() : abfrage.abfrage.adresse;
    this.bauvorhaben.allgemeineOrtsangabe = abfrage.abfrage.allgemeineOrtsangabe;
    this.bauvorhaben.standVorhaben = abfrage.abfrage.standVorhaben;
    this.bauvorhaben.bebauungsplannummer = abfrage.abfrage.bebauungsplannummer;
    this.bauvorhaben.sobonRelevant = abfrage.sobonRelevant;
    this.dataTransferDialogOpen = false;
  }
}
</script>

<style></style>
