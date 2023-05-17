<template>
  <v-form ref="form">
    <default-layout solid-heading>
      <template #content>
        <infrastrukturabfrage-component
          v-if="isAbfrageFormularOpen"
          id="abfrage_infrastrukturabfrage_component"
          v-model="abfrageWrapped.infrastrukturabfrage"
          :mode="modeAbfrage"
        />
        <abfragevariante-formular
          v-else-if="isAbfragevarianteFormularOpen"
          id="abfrage_abfragevariante_formular_component"
          v-model="selectedAbfragevariante"
          :mode="modeAbfragevariante"
          :sobon-relevant="abfrageWrapped.infrastrukturabfrage.sobonRelevant"
        />
        <bauabschnitt-component
          v-else-if="isBauabschnittFormularOpen"
          id="bauabschnitt_component"
          v-model="selectedBauabschnitt"
          :mode="modeBauabschnitt"
        />
        <baugebiet-component
          v-else-if="isBaugebietFormularOpen"
          id="baugebiet_component"
          v-model="selectedBaugebiet"
          :mode="modeBaugebiet"
        />
        <baurate-component
          v-else-if="isBaurateFormularOpen"
          id="baurate_component"
          v-model="selectedBaurate"
          :mode="modeBaurate"
        />
        <yes-no-dialog
          id="abfrage_yes_no_dialog_loeschen"
          v-model="isDeleteDialogAbfrageOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          dialogtext="Hiermit werden die Abfrage und alle dazugehörigen Abfragevarianten unwiderruflich gelöscht."
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogAbfrageNo"
          @yes="yesNoDialogAbfrageYes"
        />
        <yes-no-dialog
          id="abfrage_yes_no_dialog_statusuebergang"
          v-model="isStatusUebergangDialogOpen"
          icon="mdi-account-arrow-right"
          dialogtitle="Hinweis"
          :dialogtext="dialogTextStatus"
          no-text="Abbrechen"
          :yes-text="'Zustimmen'"
          @no="yesNoDialogStatusUebergangeNo"
          @yes="yesNoDialogStatusUebergangYes"
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
          v-model="isDeleteDialogAbfragevarianteOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          :dialogtext="
            'Hiermit wird die Abfragevariante Nr.' +
            selectedAbfragevariante.abfragevariantenNr +
            ' und alle dazugehörigen Bauabschnitte unwiderruflich gelöscht.'
          "
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogAbfragevarianteNo"
          @yes="yesNoDialogAbfragevarianteYes"
        />
        <yes-no-dialog
          id="abfrage_abfragevariante_bauabschnitt_yes_no_dialog_loeschen"
          v-model="isDeleteDialogBauabschnittOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          :dialogtext="
            'Hiermit wird der Bauabschnitt \'' +
            selectedBauabschnitt.bezeichnung +
            '\' und alle dazugehörigen Baugebiete unwiderruflich gelöscht.'
          "
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogBauabschnittNo"
          @yes="yesNoDialogBauabschnittYes"
        />
        <yes-no-dialog
          id="abfrage_abfragevariante_bauabschnitt_baugebiet_yes_no_dialog_loeschen"
          v-model="isDeleteDialogBaugebietOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          :dialogtext="
            'Hiermit wird das Baugebiet \'' +
            selectedBaugebiet.bezeichnung +
            '\' und alle dazugehörigen Bauraten unwiderruflich gelöscht.'
          "
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogBaugebietNo"
          @yes="yesNoDialogBaugebietYes"
        />
        <yes-no-dialog
          id="abfrage_abfragevariante_bauabschnitt_baugebiet_baurate_yes_no_dialog_loeschen"
          v-model="isDeleteDialogBaurateOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          :dialogtext="'Hiermit wird die Baurate für das Jahr ' + selectedBaurate.jahr + ' unwiderruflich gelöscht.'"
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogBaurateNo"
          @yes="yesNoDialogBaurateYes"
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
          @select-abfrage="handleSelectAbfrage()"
          @select-abfragevariante="handleSelectAbfragevariante($event)"
          @delete-abfragevariante="handleDeleteAbfragevariante($event)"
          @determine-bauraten-for-abfragevariante="handleDetermineBauratenForAbfragevariante($event)"
          @create-new-abfragevariante="handleCreateNewAbfragevariante()"
          @select-bauabschnitt="handleSelectBauabschnitt($event)"
          @delete-bauabschnitt="handleDeleteBauabschnitt($event)"
          @create-new-bauabschnitt="handleCreateNewBauabschnitt($event)"
          @select-baugebiet="handleSelectBaugebiet($event)"
          @delete-baugebiet="handleDeleteBaugebiet($event)"
          @create-new-baugebiet="handleCreateNewBaugebiet($event)"
          @select-baurate="handleSelectBaurate($event)"
          @delete-baurate="handleDeleteBaurate($event)"
          @create-new-baurate="handleCreateNewBaurate($event)"
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
          v-for="(transition, index) in possbileTransitions"
          v-show="!isNewAbfrage()"
          :id="'abfrage_status_aenderung' + index + '_button'"
          :key="index"
          color="secondary"
          class="text-wrap mt-2 px-1"
          elevation="1"
          style="width: 200px"
          @click="statusUebergang(transition)"
          v-text="transition.buttonName"
        />
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
  createTechnicalBauabschnittDto,
  createTechnicalBaugebietDto,
} from "@/utils/Factories";
import AbfrageApiRequestMixin from "@/mixins/requests/AbfrageApiRequestMixin";
import StatusUebergangApiRequestMixin from "@/mixins/requests/StatusUebergangApiRequestMixin";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import {
  StatusAbfrage,
  AbfragevarianteDto,
  InfrastrukturabfrageDto,
  TransitionDto,
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
import TransitionApiRequestMixin from "@/mixins/requests/TransistionApiRequestMixin";
import BauratenApiRequestMixin from "@/mixins/requests/BauratenApiRequestMixin";

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
  TransitionApiRequestMixin,
  FieldValidationRulesMixin,
  AbfrageApiRequestMixin,
  BauratenApiRequestMixin,
  StatusUebergangApiRequestMixin,
  ValidatorMixin,
  SaveLeaveMixin
) {
  private modeAbfrage = DisplayMode.UNDEFINED;
  private buttonText = "";
  private dialogTextStatus = "";
  private abfrageWrapped: InfrastrukturabfrageWrapperModel = new InfrastrukturabfrageWrapperModel(
    new InfrastrukturabfrageModel(createInfrastrukturabfrageDto()),
    true
  );
  private selectedAbfragevariante: AbfragevarianteModel = new AbfragevarianteModel(createAbfragevarianteDto());
  private selectedBauabschnitt: BauabschnittModel = new BauabschnittModel(createBauabschnittDto());
  private selectedBaugebiet: BaugebietModel = new BaugebietModel(createBaugebietDto());
  private selectedBaurate: BaurateModel = new BaurateModel(createBaurateDto());
  private abfrageId: string = this.$route.params.id;
  private transition: TransitionDto | undefined;
  private isStatusUebergangDialogOpen = false;
  private isDeleteDialogAbfrageOpen = false;
  private isFreigabeDialogOpen = false;
  private isDeleteDialogAbfragevarianteOpen = false;
  private isDeleteDialogBauabschnittOpen = false;
  private isDeleteDialogBaugebietOpen = false;
  private isDeleteDialogBaurateOpen = false;
  private isAbfrageFormularOpen = true;
  private isAbfragevarianteFormularOpen = false;
  private isBauabschnittFormularOpen = false;
  private isBaugebietFormularOpen = false;
  private isBaurateFormularOpen = false;
  private abfragevarianteTreeItemToDelete: AbfrageTreeItem | undefined = undefined;
  private bauabschnittTreeItemToDelete: AbfrageTreeItem | undefined = undefined;
  private baugebietTreeItemToDelete: AbfrageTreeItem | undefined = undefined;
  private baurateTreeItemToDelete: AbfrageTreeItem | undefined = undefined;
  public possbileTransitions: Array<TransitionDto> = [];

  mounted(): void {
    this.modeAbfrage = this.isNewAbfrage() ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    this.buttonText = this.isNewAbfrage() ? "Entwurf Speichern" : "Aktualisieren";
    this.initializeFormulare();
    this.setSelectedAbfrageInStore();
    if (!this.isNewAbfrage())
      this.getTransitions(this.abfrageId, true).then((response) => {
        this.possbileTransitions = response;
      });
  }

  @Watch("$store.state.search.selectedAbfrage", { deep: true })
  private selectedAbfrageChanged() {
    const abfrageFromStore = this.$store.getters["search/selectedAbfrage"];
    if (!_.isNil(abfrageFromStore)) {
      this.abfrageWrapped = new InfrastrukturabfrageWrapperModel(_.cloneDeep(abfrageFromStore), true);
      this.initializeFormulare();
    }
  }

  async setSelectedAbfrageInStore(): Promise<void> {
    if (this.abfrageId !== undefined) {
      this.getInfrastrukturabfrageById(this.abfrageId, true)
        .then((dto) => {
          this.saveAbfrageInStore(new InfrastrukturabfrageModel(dto));
        })
        .catch(() => {
          this.$store.commit("search/selectedAbfrage", undefined);
        });
    } else {
      this.saveAbfrageInStore(new InfrastrukturabfrageModel(createInfrastrukturabfrageDto()));
    }
  }

  private deleteAbfrage(): void {
    this.isDeleteDialogAbfrageOpen = true;
  }

  private statusUebergang(transition: TransitionDto): void {
    this.transition = transition;
    this.dialogTextStatus = transition.dialogText as string;
    this.isStatusUebergangDialogOpen = true;
  }

  private yesNoDialogAbfrageYes(): void {
    this.deleteInfrastrukturabfrage();
    this.yesNoDialogAbfrageNo();
  }

  private yesNoDialogAbfrageNo(): void {
    this.isDeleteDialogAbfrageOpen = false;
  }

  private yesNoDialogStatusUebergangYes(): void {
    if (!_.isNil(this.transition)) this.startStatusUebergang(this.transition);
    this.yesNoDialogStatusUebergangeNo();
  }

  private yesNoDialogStatusUebergangeNo(): void {
    this.isStatusUebergangDialogOpen = false;
  }

  private yesNoDialogAbfragevarianteYes(): void {
    this.removeSelectedAbfragevarianteFromAbfrage();
    this.yesNoDialogAbfragevarianteNo();
  }

  private yesNoDialogAbfragevarianteNo(): void {
    this.isDeleteDialogAbfragevarianteOpen = false;
  }

  private async deleteInfrastrukturabfrage(): Promise<void> {
    await this.deleteInfrastrukturabfrageById(this.abfrageId, true).then(() => {
      this.returnToUebersicht("Die Abfrage wurde erfolgreich gelöscht", Levels.SUCCESS);
    });
  }

  private yesNoDialogBauabschnittYes(): void {
    this.removeSelectedBauabschnittFromAbfragevariante();
    this.yesNoDialogBauabschnittNo();
  }

  private yesNoDialogBauabschnittNo(): void {
    this.isDeleteDialogBauabschnittOpen = false;
  }

  private yesNoDialogBaugebietYes(): void {
    this.removeSelectedBaugebietFromBauabschnitt();
    this.yesNoDialogBaugebietNo();
  }

  private yesNoDialogBaugebietNo(): void {
    this.isDeleteDialogBaugebietOpen = false;
  }

  private yesNoDialogBaurateYes(): void {
    this.removeSelectedBaurateFromBaugebiet();
    this.yesNoDialogBaurateNo();
  }

  private yesNoDialogBaurateNo(): void {
    this.isDeleteDialogBaurateOpen = false;
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
        await this.patchAbfrageAngelegt(this.abfrageWrapped.infrastrukturabfrage, true).then((dto) => {
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

  private async startStatusUebergang(transition: TransitionDto) {
    const validationMessage: string | null = this.findFaultInInfrastrukturabfrageForSave(
      this.abfrageWrapped.infrastrukturabfrage
    );
    if (_.isNil(validationMessage)) {
      await this.patchAbfrageAngelegt(this.abfrageWrapped.infrastrukturabfrage, true);
      const requestSuccessful = await this.statusUebergangRequest(transition, this.abfrageId);
      if (requestSuccessful) {
        if (!(transition.buttonName === "IN BEARBEITUNG SETZEN")) {
          this.returnToUebersicht("Die Abfrage hatte einen erfolgreichen Statuswechsel", Levels.SUCCESS);
        } else {
          this.setSelectedAbfrageInStore();
          this.getTransitions(this.abfrageId, true).then((response) => {
            this.possbileTransitions = response;
          });
        }
        this.openAbfrageFormular();
      }
    } else {
      this.showWarningInInformationList(validationMessage);
    }
  }

  private saveAbfrageInStore(abfrage: InfrastrukturabfrageModel) {
    this.$store.commit("search/selectedAbfrage", _.cloneDeep(abfrage));
  }

  private initializTreeItemsToOpen(): void {
    if (!_.isNil(this.$refs.abfrageNavigationTree)) {
      const abfrageNavitionTree = this.$refs.abfrageNavigationTree as AbfrageNavigationTree;
      abfrageNavitionTree.initializTreeItemsToOpen();
    }
  }

  private setSelectedTreeItem(selectedTreeItem: AbfrageTreeItem | undefined): void {
    if (!_.isNil(selectedTreeItem) && !_.isNil(this.$refs.abfrageNavigationTree)) {
      const abfrageNavitionTree = this.$refs.abfrageNavigationTree as AbfrageNavigationTree;
      abfrageNavitionTree.setSelectedTreeItem(selectedTreeItem);
    }
  }

  private setNewEntityToMark(entity: unknown): void {
    if (!_.isNil(entity) && !_.isNil(this.$refs.abfrageNavigationTree)) {
      const abfrageNavitionTree = this.$refs.abfrageNavigationTree as AbfrageNavigationTree;
      abfrageNavitionTree.setNewEntityToMark(entity);
    }
  }

  private initializeFormulare(): void {
    this.isAbfrageFormularOpen = true;
    this.isAbfragevarianteFormularOpen = false;
    this.isBauabschnittFormularOpen = false;
    this.isBaugebietFormularOpen = false;
    this.isBaurateFormularOpen = false;
  }

  private openAbfrageFormular(): void {
    this.isAbfrageFormularOpen = true;
    this.isAbfragevarianteFormularOpen = false;
    this.isBauabschnittFormularOpen = false;
    this.isBaugebietFormularOpen = false;
    this.isBaurateFormularOpen = false;
  }

  private openAbfragevarianteFormular(): void {
    this.isAbfrageFormularOpen = false;
    this.isAbfragevarianteFormularOpen = true;
    this.isBauabschnittFormularOpen = false;
    this.isBaugebietFormularOpen = false;
    this.isBaurateFormularOpen = false;
  }

  private openBauabschnittFormular(): void {
    this.isAbfrageFormularOpen = false;
    this.isAbfragevarianteFormularOpen = false;
    this.isBauabschnittFormularOpen = true;
    this.isBaugebietFormularOpen = false;
    this.isBaurateFormularOpen = false;
  }

  private openBaugebietFormular(): void {
    this.isAbfrageFormularOpen = false;
    this.isAbfragevarianteFormularOpen = false;
    this.isBauabschnittFormularOpen = false;
    this.isBaugebietFormularOpen = true;
    this.isBaurateFormularOpen = false;
  }

  private openBaurateFormular(): void {
    this.isAbfrageFormularOpen = false;
    this.isAbfragevarianteFormularOpen = false;
    this.isBauabschnittFormularOpen = false;
    this.isBaugebietFormularOpen = false;
    this.isBaurateFormularOpen = true;
  }

  private isNewAbfrage(): boolean {
    return this.$route.params.id === undefined;
  }

  private isAngelegt(): boolean {
    return this.abfrageWrapped.infrastrukturabfrage.abfrage.statusAbfrage == StatusAbfrage.Angelegt;
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
    this.abfragevarianteTreeItemToDelete = abfrageTreeItem;
    this.selectedAbfragevariante = this.getSelectedAbfragevariante(abfrageTreeItem);
    this.openAbfragevarianteFormular();
    this.isDeleteDialogAbfragevarianteOpen = true;
  }

  private async handleDetermineBauratenForAbfragevariante(abfrageTreeItem: AbfrageTreeItem): void {
    const abfragevariante = abfrageTreeItem.abfragevariante;
    if (!_.isNil(abfragevariante)) {
      const bauraten: Array<BaurateDto> = await this.determineBauraten(
        abfragevariante.realisierungVon,
        abfragevariante.gesamtanzahlWe,
        abfragevariante.geschossflaecheWohnen,
        true
      );
      const technicalBaugebiet = createTechnicalBaugebietDto();
      const technicalBauabschnitt = createTechnicalBauabschnittDto();
      technicalBaugebiet.bauraten = bauraten;
      technicalBauabschnitt.baugebiete = [new BaugebietModel(technicalBaugebiet)];
      abfragevariante.bauabschnitte = [new BauabschnittModel(technicalBauabschnitt)];
    }
  }

  private handleCreateNewAbfragevariante(): void {
    this.selectedAbfragevariante = new AbfragevarianteModel(createAbfragevarianteDto());
    this.setNewEntityToMark(this.selectedAbfragevariante);
    this.abfrageWrapped.infrastrukturabfrage.abfragevarianten.push(this.selectedAbfragevariante);
    this.renumberingAbfragevarianten();
    this.formChanged();
    this.openAbfragevarianteFormular();
  }

  private removeSelectedAbfragevarianteFromAbfrage(): void {
    if (!_.isNil(this.abfragevarianteTreeItemToDelete)) {
      const copyAbfragevarianten = _.cloneDeep(this.abfrageWrapped.infrastrukturabfrage.abfragevarianten);
      _.remove(copyAbfragevarianten, (abfragevariante) => _.isEqual(abfragevariante, this.selectedAbfragevariante));
      this.abfrageWrapped.infrastrukturabfrage.abfragevarianten = copyAbfragevarianten;
      this.renumberingAbfragevarianten();
      this.formChanged();
      this.openAbfrageFormular();
      this.$nextTick(() => {
        this.setSelectedTreeItem(this.abfragevarianteTreeItemToDelete?.parentTreeItem);
        this.abfragevarianteTreeItemToDelete = undefined;
      });
    }
  }

  private removeSelectedBauabschnittFromAbfragevariante(): void {
    if (!_.isNil(this.bauabschnittTreeItemToDelete)) {
      const selectedAbfragevariante = this.getSelectedAbfragevariante(this.bauabschnittTreeItemToDelete);
      if (!_.isNil(selectedAbfragevariante.bauabschnitte)) {
        const copyBauabschnitte = _.cloneDeep(selectedAbfragevariante.bauabschnitte);
        _.remove(copyBauabschnitte, (bauabschnitt) => _.isEqual(bauabschnitt, this.selectedBauabschnitt));
        selectedAbfragevariante.bauabschnitte = copyBauabschnitte;
        this.formChanged();
        this.openAbfragevarianteFormular();
      }
      this.$nextTick(() => {
        this.setSelectedTreeItem(this.bauabschnittTreeItemToDelete?.parentTreeItem);
        this.bauabschnittTreeItemToDelete = undefined;
      });
    }
  }

  private removeSelectedBaugebietFromBauabschnitt(): void {
    if (!_.isNil(this.baugebietTreeItemToDelete)) {
      const selectedBauabschnitt = this.getSelectedBauabschnitt(this.baugebietTreeItemToDelete);
      const copyBaugebiete = _.cloneDeep(selectedBauabschnitt.baugebiete);
      _.remove(copyBaugebiete, (baugebiet) => _.isEqual(baugebiet, this.selectedBaugebiet));
      selectedBauabschnitt.baugebiete = copyBaugebiete;
      this.clearTechnicalEntities(this.getSelectedAbfragevariante(this.baugebietTreeItemToDelete));
      this.formChanged();
      this.openBauabschnittFormular();
      this.$nextTick(() => {
        this.setSelectedTreeItem(this.baugebietTreeItemToDelete?.parentTreeItem);
        this.baugebietTreeItemToDelete = undefined;
      });
    }
  }

  private removeSelectedBaurateFromBaugebiet(): void {
    if (!_.isNil(this.baurateTreeItemToDelete)) {
      const selectedBaugebiet = this.getSelectedBaugebiet(this.baurateTreeItemToDelete);
      const copyBauraten = _.cloneDeep(selectedBaugebiet.bauraten);
      _.remove(copyBauraten, (baurate) => _.isEqual(baurate, this.selectedBaurate));
      selectedBaugebiet.bauraten = copyBauraten;
      this.clearTechnicalEntities(this.getSelectedAbfragevariante(this.baurateTreeItemToDelete));
      this.formChanged();
      this.openBaugebietFormular();
      this.$nextTick(() => {
        this.setSelectedTreeItem(this.baurateTreeItemToDelete?.parentTreeItem);
        this.baurateTreeItemToDelete = undefined;
      });
    }
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
      const technicalBauabschnitt = this.getTechnicalBauabschnitt(selectedAbfragevariante);
      selectedBauabschnitt = technicalBauabschnitt
        ? technicalBauabschnitt
        : new BauabschnittModel(createBauabschnittDto());
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
      const selectedAbfragevariante = this.getSelectedAbfragevariante(abfrageTreeItem);
      const technicalBaugebiet = this.getTechnicalBaugebiet(selectedAbfragevariante);
      selectedBaugebiet = technicalBaugebiet ? technicalBaugebiet : new BaugebietModel(createBaugebietDto());
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
    this.bauabschnittTreeItemToDelete = abfrageTreeItem;
    this.selectedBauabschnitt = this.getSelectedBauabschnitt(abfrageTreeItem);
    this.openBauabschnittFormular();
    this.isDeleteDialogBauabschnittOpen = true;
  }

  private handleCreateNewBauabschnitt(abfrageTreeItem: AbfrageTreeItem): void {
    let selectedAbfragevariante = this.getSelectedAbfragevariante(abfrageTreeItem);
    this.selectedBauabschnitt = new BauabschnittModel(createBauabschnittDto());
    if (_.isNil(selectedAbfragevariante.bauabschnitte)) {
      selectedAbfragevariante.bauabschnitte = [];
    }
    this.setNewEntityToMark(this.selectedBauabschnitt);
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
    this.baugebietTreeItemToDelete = abfrageTreeItem;
    this.selectedBaugebiet = this.getSelectedBaugebiet(abfrageTreeItem);
    this.openBaugebietFormular();
    this.isDeleteDialogBaugebietOpen = true;
  }

  private handleCreateNewBaugebiet(abfrageTreeItem: AbfrageTreeItem): void {
    let selectedBauabschnitt = this.getSelectedBauabschnitt(abfrageTreeItem);
    this.selectedBaugebiet = new BaugebietModel(createBaugebietDto());
    this.setNewEntityToMark(this.selectedBaugebiet);
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
    this.baurateTreeItemToDelete = abfrageTreeItem;
    this.selectedBaurate = this.getSelectedBaurate(abfrageTreeItem);
    this.openBaurateFormular();
    this.isDeleteDialogBaurateOpen = true;
  }

  private handleCreateNewBaurate(abfrageTreeItem: AbfrageTreeItem): void {
    let selectedBaugebiet = this.getSelectedBaugebiet(abfrageTreeItem);
    this.selectedBaurate = new BaurateModel(createBaurateDto());
    this.setNewEntityToMark(this.selectedBaurate);
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

  /**
   * Ermittelt oder erstellt bei Bedarf einen Platzhalter-Bauabschnitt für "alleinstehende" Baugebiete und -raten.
   */
  private getTechnicalBauabschnitt(abfragevariante: AbfragevarianteModel): BauabschnittModel | undefined {
    let bauabschnittDto: BauabschnittDto | undefined;

    if (!_.isNil(abfragevariante.bauabschnitte)) {
      bauabschnittDto = abfragevariante.bauabschnitte[0];
    } else {
      abfragevariante.bauabschnitte = [];
    }

    if (_.isNil(bauabschnittDto)) {
      bauabschnittDto = createTechnicalBauabschnittDto();
      abfragevariante.bauabschnitte.push(bauabschnittDto);
    }

    if (bauabschnittDto.technical) {
      return new BauabschnittModel(bauabschnittDto);
    } else {
      return undefined;
    }
  }

  /**
   * Ermittelt oder erstellt bei Bedarf ein Platzhalter-Baugebiet für "alleinstehende" Bauraten.
   */
  private getTechnicalBaugebiet(abfragevariante: AbfragevarianteModel): BaugebietModel | undefined {
    const bauabschnitt = this.getTechnicalBauabschnitt(abfragevariante);

    if (!_.isNil(bauabschnitt)) {
      let baugebietDto = bauabschnitt.baugebiete[0];

      if (_.isNil(baugebietDto)) {
        baugebietDto = createTechnicalBaugebietDto();
        bauabschnitt.baugebiete.push(baugebietDto);
      }

      if (baugebietDto.technical) {
        return new BaugebietModel(baugebietDto);
      }
    }

    return undefined;
  }

  /**
   * Soll nach dem Löschen von Baugebieten und -raten aufgerufen werden, um Platzhalter ohne Kinder zu beseitigen.
   */
  private clearTechnicalEntities(abfragevariante: AbfragevarianteModel): void {
    if (!_.isNil(abfragevariante.bauabschnitte)) {
      const bauabschnittIndex = abfragevariante.bauabschnitte.findIndex((dto) => dto.technical);

      if (bauabschnittIndex !== -1) {
        const bauabschnitt = abfragevariante.bauabschnitte[bauabschnittIndex];
        const baugebietIndex = bauabschnitt?.baugebiete.findIndex((dto) => dto.technical);

        if (baugebietIndex !== -1) {
          const baugebiet = bauabschnitt.baugebiete[baugebietIndex];
          if (baugebiet.bauraten.length === 0) {
            bauabschnitt.baugebiete.splice(baugebietIndex, 1);
          }
        }

        if (bauabschnitt.baugebiete.length === 0) {
          abfragevariante.bauabschnitte.splice(bauabschnittIndex, 1);
        }
      }
    }
  }
}
</script>

<style></style>
