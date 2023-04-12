<template>
  <v-form ref="form">
    <default-layout solid-heading>
      <template #content>
        <div v-if="isAbfrageFormularOpen">
          <infrastrukturabfrage-component
            id="abfrage_infrastrukturabfrage_component"
            v-model="abfrageWrapped.infrastrukturabfrage"
            :mode="modeAbfrage"
          />
        </div>
        <abfragevariante-formular
          v-if="isAbfragevarianteFormularOpen"
          id="abfrage_abfragevariante_formular_component"
          v-model="selectedAbfragevariante"
          :mode="modeAbfragevariante"
          :sobon-relevant="abfrageWrapped.infrastrukturabfrage.sobonRelevant"
        />
        <div v-if="isBauabschnittFormularOpen">
          <bauabschnitt-component
            id="bauabschnitt_component"
            v-model="selectedBauabschnitt"
            :mode="modeBauabschnitt"
          />
        </div>
        <div v-if="isBaugebietFormularOpen">
          <baugebiet-component
            id="baugebiet_component"
            v-model="selectedBaugebiet"
            :mode="modeBaugebiet"
          />
        </div>
        <div v-if="isBaurateFormularOpen">
          <baurate-component
            id="baurate_component"
            v-model="selectedBaurate"
            :mode="modeBaurate"
          />
        </div>
        <yes-no-dialog
          id="abfrage_yes_no_dialog_loeschen"
          v-model="deleteDialogAbfrageOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          dialogtext="Hiermit werden die Abfrage und alle dazugehörigen Abfragevarianten unwiderruflich gelöscht."
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogAbfrageNo"
          @yes="yesNoDialogAbfrageYes"
        />
        <yes-no-dialog
          id="abfrage_yes_no_dialog_freigeben"
          v-model="freigabeDialogOpen"
          icon="mdi-account-arrow-right"
          dialogtitle="Hinweis"
          dialogtext="Die Abfrage wird zur Bearbeitung weitergeleitet und kann nicht mehr geändert werden."
          no-text="Abbrechen"
          :yes-text="'Freigabe'"
          @no="yesNoDialogFreigabeNo"
          @yes="yesNoDialogFreigabeYes"
        />
        <yes-no-dialog
          id="abfrage_yes_no_dialog_save_leave"
          ref="saveLeaveDialog"
          v-model="saveLeaveDialog"
          :dialogtitle="saveLeaveDialogTitle"
          :dialogtext="saveLeaveDialogText"
          :no-text="saveLeaveNoText"
          :yes-text="saveLeaveYesText"
          @yes="leave"
          @no="cancel"
        />
        <yes-no-dialog
          id="abfrage_abfragevariante_yes_no_dialog_loeschen"
          v-model="deleteDialogAbfragevarianteOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          :dialogtext="
            'Hiermit wird die Abfragevariante Nr.' +
            selectedAbfragevariante.abfragevariantenNr +
            ' unwiderruflich gelöscht.'
          "
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogAbfragevarianteNo"
          @yes="yesNoDialogAbfragevarianteYes"
        />
      </template>
      <template #heading>
        <v-container>
          <v-row>
            <v-col cols="12">
              <span
                id="abfrage_displayName"
                class="text-h6 font-weight-bold"
                v-text="abfrageWrapped.infrastrukturabfrage.displayName"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template #navigation>
        <abfrage-navigation-tree
          id="abfrage_navigation_tree"
          ref="abfrageNavigationTree"
          v-model="abfrageWrapped"
          @select-abfrage="handleSelectAbfrage"
          @select-abfragevariante="handleSelectAbfragevariante"
          @delete-abfragevariante="handleDeleteAbfragevariante"
          @create-new-abfragevariante="handleCreateNewAbfragevariante"
          @select-bauabschnitt="handleSelectBauabschnitt"
          @delete-bauabschnitt="handleDeleteBauabschnitt"
          @create-new-bauabschnitt="handleCreateNewBauabschnitt"
          @select-baugebiet="handleSelectBaugebiet"
          @delete-baugebiet="handleDeleteBaugebiet"
          @create-new-baugebiet="handleCreateNewBaugebiet"
          @select-baurate="handleSelectBaurate"
          @delete-baurate="handleDeleteBaurate"
          @create-new-baurate="handleCreateNewBaurate"
        />
        <v-spacer />
      </template>
      <template #information>
        <v-btn
          v-if="!isNewAbfrage()"
          id="abfrage_loeschen_button"
          class="text-wrap my-4 px-1"
          color="primary"
          elevation="1"
          style="width: 200px"
          @click="deleteAbfrage()"
          v-text="'Löschen'"
        />
        <information-list
          id="abfrage_information_list"
          information-message-deletion-intervall-seconds="10"
        />
      </template>
      <template #action>
        <v-spacer />
        <v-btn
          id="abfrage_speichern_button"
          class="text-wrap mt-2 px-1"
          color="secondary"
          elevation="1"
          :disabled="
            (!isNewAbfrage() && !isDirty()) ||
            containsNotAllowedDokument(abfrageWrapped.infrastrukturabfrage.abfrage.dokumente)
          "
          style="width: 200px"
          @click="saveAbfrage()"
          v-text="buttonText"
        />
        <v-btn
          v-if="!isNewAbfrage()"
          id="abfrage_freigeben_button"
          class="text-wrap mt-2 px-1"
          color="secondary"
          elevation="1"
          style="width: 200px"
          :disabled="!isAngelegt()"
          @click="freigabeAbfrage()"
          v-text="'Freigabe'"
        />
        <v-btn
          id="abfrage_abbrechen_button"
          color="primary"
          elevation="1"
          class="text-wrap mt-2 px-1"
          style="width: 200px"
          @click="returnToUebersicht()"
          v-text="'Abbrechen'"
        />
      </template>
    </default-layout>
  </v-form>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Watch } from "vue-property-decorator";
import InfrastrukturabfrageComponent from "@/components/abfragen/InfrastrukturabfrageComponent.vue";
import BauabschnittComponent from "@/components/bauabschnitte/BauabschnittComponent.vue";
import BaugebietComponent from "@/components/baugebiete/BaugebietComponent.vue";
import BaurateComponent from "@/components/bauraten/BaurateComponent.vue";
import Toaster from "../components/common/toaster.type";
import {
  createAbfragevarianteDto,
  createInfrastrukturabfrageDto,
  createBauabschnittDto,
  createBaugebietDto,
  createBaurateDto,
} from "@/utils/Factories";
import AbfrageApiRequestMixin from "@/mixins/requests/AbfrageApiRequestMixin";
import FreigabeApiRequestMixin from "@/mixins/requests/FreigabeApiRequestMixin";
import BaurateReqestMixin from "@/mixins/requests/BauratenApiRequestMixin";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import {
  AbfrageListElementDtoStatusAbfrageEnum,
  InfrastrukturabfrageDto,
  AbfragevarianteDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
} from "@/api/api-client/isi-backend";
import DefaultLayout from "@/components/DefaultLayout.vue";
import _ from "lodash";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import InformationList from "@/components/common/InformationList.vue";
import { Levels } from "@/api/error";
import DisplayMode from "@/types/common/DisplayMode";
import { containsNotAllowedDokument } from "@/utils/DokumenteUtil";
import AbfrageNavigationTree, { AbfrageTreeItem } from "@/components/abfragen/AbfrageNavigationTree.vue";
import AbfragevarianteFormular from "@/components/abfragevarianten/AbfragevarianteFormular.vue";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import InfrastrukturabfrageWrapperModel from "@/types/model/abfrage/InfrastrukturabfrageWrapperModel";

@Component({
  methods: { containsNotAllowedDokument },
  components: {
    AbfragevarianteFormular,
    AbfrageNavigationTree,
    InformationList,
    InfrastrukturabfrageComponent,
    YesNoDialog,
    DefaultLayout,
    BaurateComponent,
    BauabschnittComponent,
    BaugebietComponent,
  },
})
export default class Abfrage extends Mixins(
  FieldValidationRulesMixin,
  AbfrageApiRequestMixin,
  FreigabeApiRequestMixin,
  BaurateReqestMixin,
  ValidatorMixin,
  SaveLeaveMixin
) {
  private modeAbfrage = DisplayMode.UNDEFINED;

  private buttonText = "";

  private abfrageWrapped: InfrastrukturabfrageWrapperModel = new InfrastrukturabfrageWrapperModel(
    new InfrastrukturabfrageModel(createInfrastrukturabfrageDto()),
    true
  );

  private selectedAbfragevariante: AbfragevarianteModel = new AbfragevarianteModel(createAbfragevarianteDto());

  private selectedBauabschnitt: BauabschnittModel = new BauabschnittModel(createBauabschnittDto());

  private selectedBaugebiet: BaugebietModel = new BaugebietModel(createBaugebietDto());

  private selectedBaurate: BaurateModel = new BaurateModel(createBaurateDto());

  private abfrageId: string = this.$route.params.id;

  private deleteDialogAbfrageOpen = false;

  private freigabeDialogOpen = false;

  private deleteDialogAbfragevarianteOpen = false;

  private deleteDialogBauabschnittOpen = false;

  private deleteDialogBaugebietOpen = false;

  private deleteDialogBaurateOpen = false;

  private abfrageFormularOpen = true;

  private abfragevarianteFormularOpen = false;

  private bauabschnittFormularOpen = false;

  private baugebietFormularOpen = false;

  private baurateFormularOpen = false;

  mounted(): void {
    this.modeAbfrage = this.isNewAbfrage() ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    this.buttonText = this.isNewAbfrage() ? "Entwurf Speichern" : "Aktualisieren";
    this.initializeFormulare();
    this.getAbfrageById();
  }

  @Watch("$store.state.search.selectedAbfrage", { immediate: true, deep: true })
  private selectedAbfrageChanged() {
    const abfrageFromStore = this.$store.getters["search/selectedAbfrage"];
    if (!_.isNil(abfrageFromStore)) {
      this.abfrageWrapped = new InfrastrukturabfrageWrapperModel(_.cloneDeep(abfrageFromStore), true);
      this.initializeFormulare();
    }
  }

  async getAbfrageById(): Promise<void> {
    if (this.abfrageId !== undefined) {
      this.getInfrastrukturabfrageById(this.abfrageId, true)
        .then((dto) => {
          this.$store.commit("search/selectedAbfrage", new InfrastrukturabfrageModel(dto));
        })
        .catch(() => {
          this.$store.commit("search/selectedAbfrage", undefined);
        });
    } else {
      this.$store.commit("search/selectedAbfrage", new InfrastrukturabfrageModel(createInfrastrukturabfrageDto()));
    }
  }

  get isAbfrageFormularOpen(): boolean {
    return this.abfrageFormularOpen;
  }

  get isAbfragevarianteFormularOpen(): boolean {
    return this.abfragevarianteFormularOpen;
  }

  get isBauabschnittFormularOpen(): boolean {
    return this.bauabschnittFormularOpen;
  }

  get isBaugebietFormularOpen(): boolean {
    return this.baugebietFormularOpen;
  }

  get isBaurateFormularOpen(): boolean {
    return this.baurateFormularOpen;
  }

  private deleteAbfrage(): void {
    this.deleteDialogAbfrageOpen = true;
  }

  private freigabeAbfrage(): void {
    this.freigabeDialogOpen = true;
  }

  private yesNoDialogAbfrageYes(): void {
    this.deleteInfrastrukturabfrage();
    this.yesNoDialogAbfrageNo();
  }

  private yesNoDialogAbfrageNo(): void {
    this.deleteDialogAbfrageOpen = false;
  }

  private yesNoDialogFreigabeYes(): void {
    this.abfrageFreigeben();
    this.yesNoDialogFreigabeNo();
  }

  private yesNoDialogFreigabeNo(): void {
    this.freigabeDialogOpen = false;
  }

  private yesNoDialogAbfragevarianteYes(): void {
    this.removeSelectedAbfragevarianteFromAbfrage();
    this.yesNoDialogAbfragevarianteNo();
  }

  private yesNoDialogAbfragevarianteNo(): void {
    this.deleteDialogAbfragevarianteOpen = false;
  }

  private async deleteInfrastrukturabfrage(): Promise<void> {
    await this.deleteInfrastrukturabfrageById(this.abfrageId, true).then(() => {
      this.returnToUebersicht("Die Abfrage wurde erfolgreich gelöscht", Levels.SUCCESS);
    });
  }

  private async saveAbfrage(): Promise<void> {
    if (this.validate()) {
      this.saveInfrastrukturabfrage();
    } else {
      this.showWarningInInformationList("Es gibt noch Validierungsfehler");
    }
  }

  private async saveInfrastrukturabfrage(): Promise<void> {
    const validationMessage: string | null = this.findFaultInInfrastrukturabfrageForSave(
      this.abfrageWrapped.infrastrukturabfrage
    );
    if (_.isNil(validationMessage)) {
      if (this.modeAbfrage === DisplayMode.NEU) {
        await this.createInfrastrukturabfrage(this.abfrageWrapped.infrastrukturabfrage, true).then((dto) => {
          this.handleSuccess(dto);
        });
      } else {
        await this.updateInfrastrukturabfrage(this.abfrageWrapped.infrastrukturabfrage, true).then((dto) => {
          this.handleSuccess(dto);
        });
      }
    } else {
      this.showWarningInInformationList(validationMessage);
    }
  }

  private handleSuccess(dto: InfrastrukturabfrageDto): void {
    this.saveAbfrageInStore(new InfrastrukturabfrageModel(dto));
    this.$store.dispatch("search/resetAbfrage");
    if (this.isNewAbfrage()) {
      this.$router.push({ path: "/abfragenuebersicht" });
      Toaster.toast(`Die Abfrage wurde erfolgreich gespeichert`, Levels.SUCCESS);
    } else {
      Toaster.toast(`Die Abfrage wurde erfolgreich aktualisiert`, Levels.SUCCESS);
    }
    this.initializeFormulare();
    this.initializTreeItemsToOpen();
  }

  private saveAbfrageInStore(abfrage: InfrastrukturabfrageModel) {
    this.$store.commit("search/selectedAbfrage", _.cloneDeep(abfrage));
  }

  private async abfrageFreigeben(): Promise<void> {
    if (this.validate()) {
      if (
        this.abfrageWrapped.infrastrukturabfrage.abfrage.statusAbfrage ===
        AbfrageListElementDtoStatusAbfrageEnum.Angelegt
      ) {
        this.infrastrukturabfrageFreigeben();
      } else {
        this.showWarningInInformationList('Die Abfrage muss den Status "angelegt" besitzen');
      }
    } else {
      this.showWarningInInformationList("Es gibt noch Validierungsfehler");
    }
  }

  private async infrastrukturabfrageFreigeben(): Promise<void> {
    const validationMessage: string | null = this.findFaultInInfrastrukturabfrageForSave(
      this.abfrageWrapped.infrastrukturabfrage
    );
    if (_.isNil(validationMessage)) {
      await this.updateInfrastrukturabfrage(this.abfrageWrapped.infrastrukturabfrage, true);
      this.freigabInfrastrukturabfrage(this.abfrageWrapped.infrastrukturabfrage.id as string, true).then(() => {
        this.returnToUebersicht("Die Abfrage wurde erfolgreich freigegeben", Levels.SUCCESS);
      });
      this.initializeFormulare();
    } else {
      this.showWarningInInformationList(validationMessage);
    }
  }

  private initializTreeItemsToOpen(): void {
    if (!_.isNil(this.$refs.abfrageNavigationTree)) {
      const abfrageNavitionTree = this.$refs.abfrageNavigationTree as AbfrageNavigationTree;
      abfrageNavitionTree.initializTreeItemsToOpen();
    }
  }

  private initializeFormulare(): void {
    this.abfrageFormularOpen = true;
    this.abfragevarianteFormularOpen = false;
    this.bauabschnittFormularOpen = false;
    this.baugebietFormularOpen = false;
    this.baurateFormularOpen = false;
  }

  private openAbfrageFormular(): void {
    this.abfrageFormularOpen = true;
    this.abfragevarianteFormularOpen = false;
    this.bauabschnittFormularOpen = false;
    this.baugebietFormularOpen = false;
    this.baurateFormularOpen = false;
  }

  private openAbfragevarianteFormular(): void {
    this.abfrageFormularOpen = false;
    this.abfragevarianteFormularOpen = true;
    this.bauabschnittFormularOpen = false;
    this.baugebietFormularOpen = false;
    this.baurateFormularOpen = false;
  }

  private openBauabschnittFormular(): void {
    this.abfrageFormularOpen = false;
    this.abfragevarianteFormularOpen = false;
    this.bauabschnittFormularOpen = true;
    this.baugebietFormularOpen = false;
    this.baurateFormularOpen = false;
  }

  private openBaugebietFormular(): void {
    this.abfrageFormularOpen = false;
    this.abfragevarianteFormularOpen = false;
    this.bauabschnittFormularOpen = false;
    this.baugebietFormularOpen = true;
    this.baurateFormularOpen = false;
  }

  private openBaurateFormular(): void {
    this.abfrageFormularOpen = false;
    this.abfragevarianteFormularOpen = false;
    this.bauabschnittFormularOpen = false;
    this.baugebietFormularOpen = false;
    this.baurateFormularOpen = true;
  }

  private isNewAbfrage(): boolean {
    return this.$route.params.id === undefined;
  }

  private isAngelegt(): boolean {
    return (
      this.abfrageWrapped.infrastrukturabfrage.abfrage.statusAbfrage == AbfrageListElementDtoStatusAbfrageEnum.Angelegt
    );
  }

  private returnToUebersicht(message?: string, level?: Levels): void {
    if (message && level) {
      Toaster.toast(message, level);
    }

    this.$store.dispatch("search/resetAbfrage");
    this.$router.push({ path: "/abfragenuebersicht" });
  }

  private validate(): boolean {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  private handleSelectAbfrage(): void {
    this.initializeFormulare();
  }

  private handleSelectAbfragevariante(abfrageTreeItem: AbfrageTreeItem): void {
    this.initializeFormulare();
    this.selectedAbfragevariante = this.getSelectedAbfragevariante(abfrageTreeItem);
    this.$nextTick(() => {
      this.openAbfragevarianteFormular();
    });
  }

  private handleDeleteAbfragevariante(abfrageTreeItem: AbfrageTreeItem): void {
    this.selectedAbfragevariante = this.getSelectedAbfragevariante(abfrageTreeItem);
    this.openAbfragevarianteFormular();
    this.deleteDialogAbfragevarianteOpen = true;
  }

  private handleCreateNewAbfragevariante(): void {
    this.selectedAbfragevariante = new AbfragevarianteModel(createAbfragevarianteDto());
    this.abfrageWrapped.infrastrukturabfrage.abfragevarianten.push(this.selectedAbfragevariante);
    this.renumberingAbfragevarianten();
    this.formChanged();
    this.openAbfragevarianteFormular();
  }

  private removeSelectedAbfragevarianteFromAbfrage(): void {
    const copyAbfragevarianten = _.cloneDeep(this.abfrageWrapped.infrastrukturabfrage.abfragevarianten);
    _.remove(copyAbfragevarianten, (abfragevariante) => _.isEqual(abfragevariante, this.selectedAbfragevariante));
    this.abfrageWrapped.infrastrukturabfrage.abfragevarianten = copyAbfragevarianten;
    this.renumberingAbfragevarianten();
    this.formChanged();
    this.openAbfrageFormular();
  }

  private getSelectedAbfragevariante(abfrageTreeItem: AbfrageTreeItem): AbfragevarianteDto {
    let selectedAbfragevariante = this.abfrageWrapped.infrastrukturabfrage.abfragevarianten.find((abfragevariante) =>
      _.isEqual(abfragevariante, abfrageTreeItem.abfragevariante)
    );
    if (_.isNil(selectedAbfragevariante)) {
      selectedAbfragevariante = new AbfragevarianteModel(createAbfragevarianteDto());
    }
    return selectedAbfragevariante;
  }

  private getSelectedBauabschnitt(abfrageTreeItem: AbfrageTreeItem): BauabschnittDto {
    let selectedBauabschnitt = undefined;
    let selectedAbfragevariante = this.getSelectedAbfragevariante(abfrageTreeItem);
    if (!_.isNil(selectedAbfragevariante.bauabschnitte)) {
      selectedBauabschnitt = selectedAbfragevariante.bauabschnitte.find((bauabschnitt) =>
        _.isEqual(bauabschnitt.bezeichnung, abfrageTreeItem.bauabschnitt?.bezeichnung)
      );
    }
    if (_.isNil(selectedBauabschnitt)) {
      selectedBauabschnitt = new BauabschnittModel(createBauabschnittDto());
    }
    return selectedBauabschnitt;
  }

  private getSelectedBaugebiet(abfrageTreeItem: AbfrageTreeItem): BaugebietDto {
    let selectedBaugebiet = undefined;
    let selectedBauabschnitt = this.getSelectedBauabschnitt(abfrageTreeItem);
    if (!_.isNil(selectedBauabschnitt.baugebiete)) {
      selectedBaugebiet = selectedBauabschnitt.baugebiete.find((baugebiet) =>
        _.isEqual(baugebiet.bezeichnung, abfrageTreeItem.baugebiet?.bezeichnung)
      );
    }
    if (_.isNil(selectedBaugebiet)) {
      selectedBaugebiet = new BaugebietModel(createBaugebietDto());
    }
    return selectedBaugebiet;
  }

  private getSelectedBaurate(abfrageTreeItem: AbfrageTreeItem): BaurateDto {
    let selectedBaurate = undefined;
    let selectedBaugebiet = this.getSelectedBaugebiet(abfrageTreeItem);
    selectedBaurate = selectedBaugebiet.bauraten.find((baurate) =>
      _.isEqual(baurate.jahr, abfrageTreeItem.baurate?.jahr)
    );
    if (_.isNil(selectedBaurate)) {
      selectedBaurate = new BaurateModel(createBaurateDto());
    }
    return selectedBaurate;
  }

  private handleSelectBauabschnitt(abfrageTreeItem: AbfrageTreeItem): void {
    this.initializeFormulare();
    this.selectedBauabschnitt = this.getSelectedBauabschnitt(abfrageTreeItem);
    this.$nextTick(() => {
      this.openBauabschnittFormular();
    });
  }

  private handleDeleteBauabschnitt(abfrageTreeItem: AbfrageTreeItem): void {
    this.selectedBauabschnitt = this.getSelectedBauabschnitt(abfrageTreeItem);
    this.openBauabschnittFormular();
    this.deleteDialogBauabschnittOpen = true;
  }

  private handleCreateNewBauabschnitt(abfrageTreeItem: AbfrageTreeItem): void {
    let selectedAbfragevariante = this.getSelectedAbfragevariante(abfrageTreeItem);
    this.selectedBauabschnitt = new BauabschnittModel(createBauabschnittDto());
    if (_.isNil(selectedAbfragevariante.bauabschnitte)) {
      selectedAbfragevariante.bauabschnitte = [];
    }
    selectedAbfragevariante.bauabschnitte.push(this.selectedBauabschnitt);
    this.formChanged();
    this.openBauabschnittFormular();
  }

  private handleSelectBaugebiet(abfrageTreeItem: AbfrageTreeItem): void {
    this.initializeFormulare();
    this.selectedBaugebiet = this.getSelectedBaugebiet(abfrageTreeItem);
    this.$nextTick(() => {
      this.openBaugebietFormular();
    });
  }

  private handleDeleteBaugebiet(abfrageTreeItem: AbfrageTreeItem): void {
    this.selectedBaugebiet = this.getSelectedBaugebiet(abfrageTreeItem);
    this.openBaugebietFormular();
    this.deleteDialogBaugebietOpen = true;
  }

  private handleCreateNewBaugebiet(abfrageTreeItem: AbfrageTreeItem): void {
    let selectedBauabschnitt = this.getSelectedBauabschnitt(abfrageTreeItem);
    this.selectedBaugebiet = new BaugebietModel(createBaugebietDto());
    selectedBauabschnitt.baugebiete.push(this.selectedBaugebiet);
    this.formChanged();
    this.openBaugebietFormular();
  }

  private handleSelectBaurate(abfrageTreeItem: AbfrageTreeItem): void {
    this.initializeFormulare();
    this.selectedBaurate = this.getSelectedBaurate(abfrageTreeItem);
    this.$nextTick(() => {
      this.openBaurateFormular();
    });
  }

  private handleDeleteBaurate(abfrageTreeItem: AbfrageTreeItem): void {
    this.selectedBaurate = this.getSelectedBaurate(abfrageTreeItem);
    this.openBaurateFormular();
    this.deleteDialogBaurateOpen = true;
  }

  private handleCreateNewBaurate(abfrageTreeItem: AbfrageTreeItem): void {
    let selectedBaugebiet = this.getSelectedBaugebiet(abfrageTreeItem);
    this.selectedBaurate = new BaurateModel(createBaurateDto());
    selectedBaugebiet.bauraten.push(this.selectedBaurate);
    this.formChanged();
    this.openBaurateFormular();
  }

  private get modeAbfragevariante(): DisplayMode {
    return _.isNil(this.selectedAbfragevariante.id) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
  }

  private get modeBauabschnitt(): DisplayMode {
    return _.isNil(this.selectedBauabschnitt.id) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
  }

  private get modeBaugebiet(): DisplayMode {
    return _.isNil(this.selectedBaugebiet.id) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
  }

  private get modeBaurate(): DisplayMode {
    return _.isNil(this.selectedBaurate.id) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
  }

  private renumberingAbfragevarianten(): void {
    this.abfrageWrapped.infrastrukturabfrage.abfragevarianten.forEach((value, index) => {
      value.abfragevariantenNr = index + 1;
    });
  }
}
</script>

<style></style>
