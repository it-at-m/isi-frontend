<template>
  <v-form ref="form">
    <default-layout solid-heading>
      <template #content>
        <infrastrukturabfrage-component
          v-if="isAbfrageFormularOpen"
          id="abfrage_infrastrukturabfrage_component"
          v-model="abfrage"
          :mode="modeAbfrage"
        />
        <abfragevariante-formular
          v-else-if="isAbfragevarianteFormularOpen"
          id="abfrage_abfragevariante_formular_component"
          v-model="selectedAbfragevariante"
          :is-editable="isEditable"
          :mode="modeAbfragevariante"
          :sobon-relevant="abfrage.sobonRelevant"
        />
        <bauabschnitt-component
          v-else-if="isBauabschnittFormularOpen"
          id="bauabschnitt_component"
          v-model="selectedBauabschnitt"
          :is-editable="isEditable"
          :mode="modeBauabschnitt"
        />
        <baugebiet-component
          v-else-if="isBaugebietFormularOpen"
          id="baugebiet_component"
          v-model="selectedBaugebiet"
          :is-editable="isEditable"
          :mode="modeBaugebiet"
          :abfragevariante="abfragevarianteForSelectedBaugebietOrBaurate"
        />
        <baurate-component
          v-else-if="isBaurateFormularOpen"
          id="baurate_component"
          v-model="selectedBaurate"
          :is-editable="isEditable"
          :mode="modeBaurate"
          :baugebiet="baugebietForSelectedBaurate"
          :abfragevariante="abfragevarianteForSelectedBaugebietOrBaurate"
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
                v-text="abfrage.displayName"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template #navigation>
        <abfrage-tree
          id="abfrage_navigation_tree"
          :abfrage="abfrage"
          :selected-item-id="selectedItemId"
          @select-abfrage="handleSelectAbfrage"
          @select-abfragevariante="handleSelectAbfragevariante"
          @select-bauabschnitt="handleSelectBauabschnitt"
          @select-baugebiet="handleSelectBaugebiet"
          @select-baurate="handleSelectBaurate"
          @create-abfragevariante="handleCreateAbfragevariante"
          @create-bauabschnitt="handleCreateBauabschnitt"
          @create-baugebiet="handleCreateBaugebiet"
          @create-baurate="handleCreateBaurate"
          @delete-abfragevariante="handleDeleteAbfragevariante"
          @delete-bauabschnitt="handleDeleteBauabschnitt"
          @delete-baugebiet="handleDeleteBaugebiet"
          @delete-baurate="handleDeleteBaurate"
          @set-abfragevariante-relevant="handleSetAbfragevarianteRelevant"
          @determine-bauraten-for-abfragevariante="handleDetermineBauratenForAbfragevariante"
          @determine-bauraten-for-baugebiet="handleDetermineBauratenForBaugebiet"
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
          :disabled="isDirty()"
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
          :disabled="(!isNewAbfrage() && !isDirty()) || containsNotAllowedDokument(abfrage.abfrage.dokumente)"
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
import {
  AbfragevarianteDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
  InfrastrukturabfrageDto,
  StatusAbfrage,
  TransitionDto,
} from "@/api/api-client/isi-backend";
import { Levels } from "@/api/error";
import AbfrageNavigationTree, { AbfrageTreeItem } from "@/components/abfragen/AbfrageNavigationTree.vue";
import AbfrageTree, { TreeItem } from "@/components/abfragen/AbfrageTree.vue";
import InfrastrukturabfrageComponent from "@/components/abfragen/InfrastrukturabfrageComponent.vue";
import AbfragevarianteFormular from "@/components/abfragevarianten/AbfragevarianteFormular.vue";
import BauabschnittComponent from "@/components/bauabschnitte/BauabschnittComponent.vue";
import BaugebietComponent from "@/components/baugebiete/BaugebietComponent.vue";
import BaurateComponent from "@/components/bauraten/BaurateComponent.vue";
import InformationList from "@/components/common/InformationList.vue";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import AbfrageApiRequestMixin from "@/mixins/requests/AbfrageApiRequestMixin";
import BauratenApiRequestMixin from "@/mixins/requests/BauratenApiRequestMixin";
import StatusUebergangApiRequestMixin from "@/mixins/requests/StatusUebergangApiRequestMixin";
import TransitionApiRequestMixin from "@/mixins/requests/TransistionApiRequestMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import DisplayMode from "@/types/common/DisplayMode";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import { containsNotAllowedDokument } from "@/utils/DokumenteUtil";
import {
  createAbfragevarianteDto,
  createBauabschnittDto,
  createBaugebietDto,
  createBaurateDto,
  createInfrastrukturabfrageDto,
  createTechnicalBauabschnittDto,
  createTechnicalBaugebietDto,
} from "@/utils/Factories";
import {
  mapToInfrastrukturabfrageAngelegt,
  mapToInfrastrukturabfrageInBearbeitungSachbearbeitungDto,
} from "@/utils/MapperUtil";
import _ from "lodash";
import Vue from "vue";
import { Component, Mixins, Watch } from "vue-property-decorator";
import Toaster from "../components/common/toaster.type";

export const enum AnzeigeContextAbfragevariante {
  UNDEFINED = 1,
  ABFRAGEVARIANTE = 2,
  ABFRAGEVARIANTE_SACHBEARBEITUNG = 3,
}

@Component({
  methods: { containsNotAllowedDokument },
  components: {
    AbfragevarianteFormular,
    AbfrageNavigationTree,
    AbfrageTree,
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
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  private modeAbfrage = DisplayMode.UNDEFINED;
  private buttonText = "";
  private dialogTextStatus = "";
  private abfrage = new InfrastrukturabfrageModel(createInfrastrukturabfrageDto());
  private selectedItemId = 0;
  /**
   * Wird für die objektübergreifende Validierung im Formular des Baugebiets bzw. Baurate benötigt.
   */
  private abfragevarianteForSelectedBaugebietOrBaurate: AbfragevarianteDto | undefined;
  /**
   * Wird für die objektübergreifende Validierung im Formular der Baurate benötigt.
   */
  private baugebietForSelectedBaurate: BaugebietDto | undefined;
  private selectedAbfragevariante: AbfragevarianteModel = new AbfragevarianteModel(createAbfragevarianteDto());
  private selectedBauabschnitt: BauabschnittModel = new BauabschnittModel(createBauabschnittDto());
  private selectedBaugebiet: BaugebietModel = new BaugebietModel(createBaugebietDto());
  private selectedBaurate: BaurateModel = new BaurateModel(createBaurateDto());
  private abfrageId: string = this.$route.params.id;
  private transition: TransitionDto | undefined;
  private isStatusUebergangDialogOpen = false;
  private isDeleteDialogAbfrageOpen = false;
  private isDeleteDialogAbfragevarianteOpen = false;
  private isDeleteDialogBauabschnittOpen = false;
  private isDeleteDialogBaugebietOpen = false;
  private isDeleteDialogBaurateOpen = false;
  private isAbfrageFormularOpen = true;
  private isAbfragevarianteFormularOpen = false;
  private isBauabschnittFormularOpen = false;
  private isBaugebietFormularOpen = false;
  private isBaurateFormularOpen = false;
  private abfragevarianteTreeItemToDelete: TreeItem<InfrastrukturabfrageDto> | undefined = undefined;
  private bauabschnittTreeItemToDelete: TreeItem<BauabschnittDto> | undefined = undefined;
  private baugebietTreeItemToDelete: TreeItem<BaugebietDto> | undefined = undefined;
  private baurateTreeItemToDelete: TreeItem<BaurateDto> | undefined = undefined;
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
      this.abfrage = _.cloneDeep(abfrageFromStore);
      this.initializeFormulare();
    }
  }

  get isEditable(): boolean {
    return this.isEditableWithAnzeigeContextAbfragevariante(this.getAnzeigeContextAbfragevariante());
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
    this.removeAbfragevarianteFromAbfrage();
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
    this.removeBauabschnittFromAbfragevariante();
    this.yesNoDialogBauabschnittNo();
  }

  private yesNoDialogBauabschnittNo(): void {
    this.isDeleteDialogBauabschnittOpen = false;
  }

  private yesNoDialogBaugebietYes(): void {
    this.removeBaugebietFromBauabschnitt();
    this.yesNoDialogBaugebietNo();
  }

  private yesNoDialogBaugebietNo(): void {
    this.isDeleteDialogBaugebietOpen = false;
  }

  private yesNoDialogBaurateYes(): void {
    this.removeBaurateFromBaugebiet();
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
    const validationMessage: string | null = this.findFaultInInfrastrukturabfrageForSave(this.abfrage);
    if (_.isNil(validationMessage)) {
      if (this.modeAbfrage === DisplayMode.NEU) {
        await this.createInfrastrukturabfrage(mapToInfrastrukturabfrageAngelegt(this.abfrage), true).then((dto) => {
          this.handleSuccess(dto);
        });
      } else if (this.isEditableByAbfrageerstellung()) {
        await this.patchAbfrageAngelegt(
          mapToInfrastrukturabfrageAngelegt(this.abfrage),
          this.abfrage.id as string,
          true
        ).then((dto) => {
          this.handleSuccess(dto);
        });
      } else if (this.isEditableBySachbearbeitung()) {
        await this.patchAbfrageInBearbeitungSachbearbeitung(
          mapToInfrastrukturabfrageInBearbeitungSachbearbeitungDto(this.abfrage),
          this.abfrage.id as string,
          true
        ).then((dto) => {
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
  }

  private async startStatusUebergang(transition: TransitionDto) {
    if (!this.isDirty()) {
      const validationMessage: string | null = this.findFaultInInfrastrukturabfrageForSave(this.abfrage);
      if (_.isNil(validationMessage)) {
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
    } else {
      this.showWarningInInformationList("Bitte speichern vor einem Statusübergang");
    }
  }

  private saveAbfrageInStore(abfrage: InfrastrukturabfrageModel) {
    this.$store.commit("search/selectedAbfrage", _.cloneDeep(abfrage));
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
    return this.abfrage.abfrage?.statusAbfrage == StatusAbfrage.Angelegt;
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
    this.selectedItemId = 0;
  }

  private handleSelectAbfragevariante(item: TreeItem<AbfragevarianteDto>): void {
    this.selectedAbfragevariante = item.value;
    this.$nextTick(() => {
      this.openAbfragevarianteFormular();
      this.selectedItemId = item.id;
    });
  }

  private handleDeleteAbfragevariante(item: TreeItem<AbfragevarianteDto>): void {
    this.abfragevarianteTreeItemToDelete = item;
    this.isDeleteDialogAbfragevarianteOpen = true;
  }

  private async handleSetAbfragevarianteRelevant(item: TreeItem<AbfragevarianteDto>): Promise<void> {
    const abfragevariante = item.value;
    if (!_.isNil(abfragevariante.id)) {
      await this.changeAbfragevarianteRelevant(this.abfrage.id as string, abfragevariante.id as string, true).then(
        (dto) => {
          this.saveAbfrageInStore(new InfrastrukturabfrageModel(dto));
          this.$store.dispatch("search/resetAbfrage");
          Toaster.toast(
            `Die Abfragevariante ${abfragevariante.abfragevariantenName} in Abfrage ${
              this.abfrage.displayName
            } hat nun den Status ${abfragevariante.relevant ? `nicht relevant` : `relevant`}.`,
            Levels.SUCCESS
          );
        }
      );
    } else {
      this.showWarningInInformationList("Vor Relevantsetzung einer Abfragevariante ist die Abfrage zu speichern.");
    }
  }

  private handleDetermineBauratenForAbfragevariante(item: TreeItem<AbfragevarianteDto>): void {
    const abfragevariante = item.value;
    this.determineBauraten(
      abfragevariante.realisierungVon!,
      abfragevariante.gesamtanzahlWe,
      abfragevariante.geschossflaecheWohnen,
      true
    ).then((bauraten: Array<BaurateDto>) => {
      const technicalBaugebiet = this.getTechnicalBaugebiet(abfragevariante);
      if (abfragevariante.bauabschnitte && !_.isNil(technicalBaugebiet)) {
        technicalBaugebiet.bauraten = bauraten.map((baurate: BaurateDto) => new BaurateModel(baurate));
        abfragevariante.bauabschnitte[0].baugebiete = [technicalBaugebiet];
        this.formChanged();
      }
    });
  }

  private handleDetermineBauratenForBaugebiet(item: TreeItem<BaugebietDto>): void {
    const baugebiet = item.value;
    this.determineBauraten(
      baugebiet.realisierungVon,
      baugebiet.gesamtanzahlWe,
      baugebiet.geschossflaecheWohnen,
      true
    ).then((bauraten: Array<BaurateDto>) => {
      baugebiet.bauraten = bauraten.map((baurate: BaurateDto) => new BaurateModel(baurate));
      this.formChanged();
    });
  }

  private handleCreateAbfragevariante(): void {
    this.selectedAbfragevariante = new AbfragevarianteModel(createAbfragevarianteDto());
    if (this.getAnzeigeContextAbfragevariante() === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
      this.abfrage.abfragevarianten?.push(this.selectedAbfragevariante);
      this.renumberingAbfragevarianten(this.abfrage.abfragevarianten);
    } else {
      this.abfrage.abfragevariantenSachbearbeitung?.push(this.selectedAbfragevariante);
      this.renumberingAbfragevarianten(this.abfrage.abfragevariantenSachbearbeitung);
    }
    this.formChanged();
    this.openAbfragevarianteFormular();
    this.selectedItemId = 0;
  }

  private removeAbfragevarianteFromAbfrage(): void {
    if (!_.isNil(this.abfragevarianteTreeItemToDelete)) {
      let abfragevarianten =
        this.getAnzeigeContextAbfragevariante() === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE
          ? this.abfrage.abfragevarianten!
          : this.abfrage.abfragevariantenSachbearbeitung!;
      _.remove(abfragevarianten, (abfragevariante) => abfragevariante === this.abfragevarianteTreeItemToDelete?.value);
      this.renumberingAbfragevarianten(abfragevarianten);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      if (this.getAnzeigeContextAbfragevariante() === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
        this.abfrage.abfragevarianten = [...abfragevarianten];
      } else {
        this.abfrage.abfragevariantenSachbearbeitung = [...abfragevarianten];
      }
      this.formChanged();
      this.openAbfrageFormular();
      this.$nextTick(() => {
        this.selectedItemId = _.defaultTo(this.abfragevarianteTreeItemToDelete?.parent?.id, 0);
        this.abfragevarianteTreeItemToDelete = undefined;
      });
    }
  }

  private removeBauabschnittFromAbfragevariante(): void {
    if (!_.isNil(this.bauabschnittTreeItemToDelete)) {
      const abfragevariante = this.getSelectedAbfragevariante(this.bauabschnittTreeItemToDelete);
      if (!_.isNil(abfragevariante.bauabschnitte)) {
        _.remove(abfragevariante.bauabschnitte, (bauabschnitt) => bauabschnitt === this.selectedBauabschnitt);
        // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
        abfragevariante.bauabschnitte = [...abfragevariante.bauabschnitte];
        this.formChanged();
        this.openAbfragevarianteFormular();
      }
      this.$nextTick(() => {
        this.selectedItemId = _.defaultTo(this.bauabschnittTreeItemToDelete?.parent?.id, 0);
        this.bauabschnittTreeItemToDelete = undefined;
      });
    }
  }

  private removeBaugebietFromBauabschnitt(): void {
    if (!_.isNil(this.baugebietTreeItemToDelete)) {
      const selectedBauabschnitt = this.getSelectedBauabschnitt(this.baugebietTreeItemToDelete);
      _.remove(selectedBauabschnitt.baugebiete, (baugebiet) => baugebiet === this.selectedBaugebiet);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      selectedBauabschnitt.baugebiete = [...selectedBauabschnitt.baugebiete];
      this.clearTechnicalEntities(this.getSelectedAbfragevariante(this.baugebietTreeItemToDelete));
      this.formChanged();
      this.openBauabschnittFormular();
      this.$nextTick(() => {
        this.selectedItemId = _.defaultTo(this.baugebietTreeItemToDelete?.parent?.id, 0);
        this.baugebietTreeItemToDelete = undefined;
      });
    }
  }

  private removeBaurateFromBaugebiet(): void {
    if (!_.isNil(this.baurateTreeItemToDelete)) {
      const baugebiet = this.getSelectedBaugebiet(this.baurateTreeItemToDelete);
      _.remove(baugebiet.bauraten, (baurate) => baurate === this.selectedBaurate);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      baugebiet.bauraten = [...baugebiet.bauraten];
      this.clearTechnicalEntities(this.getSelectedAbfragevariante(this.baurateTreeItemToDelete));
      this.formChanged();
      this.openBaugebietFormular();
      this.$nextTick(() => {
        this.selectedItemId = _.defaultTo(this.baurateTreeItemToDelete?.parent?.id, 0);
        this.baurateTreeItemToDelete = undefined;
      });
    }
  }

  /*
  private getSelectedAbfragevariante(item: TreeItem<AbfragevarianteDto>): AbfragevarianteDto {
    const abfragevarianten =
      item.contextAnzeigeAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE
        ? this.abfrage.abfragevarianten
        : this.abfrage.abfragevariantenSachbearbeitung;
    let selectedAbfragevariante = abfragevarianten.find((abfragevariante) => abfragevariante === item.abfragevariante);
    if (_.isNil(selectedAbfragevariante)) {
      selectedAbfragevariante = new AbfragevarianteModel(createAbfragevarianteDto());
    }
    return selectedAbfragevariante;
  }

  private getSelectedBauabschnitt(item: TreeItem<BauabschnittDto>): BauabschnittDto {
    let selectedBauabschnitt = undefined;
    let selectedAbfragevariante = this.getSelectedAbfragevariante(item);
    if (!_.isNil(selectedAbfragevariante.bauabschnitte)) {
      selectedBauabschnitt = selectedAbfragevariante.bauabschnitte.find(
        (bauabschnitt) => bauabschnitt === item.bauabschnitt
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

  private getSelectedBaugebiet(item: TreeItem<BaugebietDto>): BaugebietDto {
    let selectedBaugebiet = undefined;
    let selectedBauabschnitt = this.getSelectedBauabschnitt(item);
    if (!_.isNil(selectedBauabschnitt.baugebiete)) {
      selectedBaugebiet = selectedBauabschnitt.baugebiete.find((baugebiet) => baugebiet === item.baugebiet);
    }
    if (_.isNil(selectedBaugebiet)) {
      const selectedAbfragevariante = this.getSelectedAbfragevariante(item);
      const technicalBaugebiet = this.getTechnicalBaugebiet(selectedAbfragevariante);
      selectedBaugebiet = technicalBaugebiet ? technicalBaugebiet : new BaugebietModel(createBaugebietDto());
    }
    return selectedBaugebiet;
  }

  private getSelectedBaurate(item: TreeItem<BaurateDto>): BaurateDto {
    let selectedBaurate = undefined;
    let selectedBaugebiet = this.getSelectedBaugebiet(item);
    selectedBaurate = selectedBaugebiet.bauraten.find((baurate) => baurate === item.baurate);
    if (_.isNil(selectedBaurate)) {
      selectedBaurate = new BaurateModel(createBaurateDto());
    }
    return selectedBaurate;
  }
  */

  private handleSelectBauabschnitt(item: TreeItem<BauabschnittDto>): void {
    this.selectedBauabschnitt = item.value;
    this.$nextTick(() => {
      this.openBauabschnittFormular();
      this.selectedItemId = item.id;
    });
  }

  private handleDeleteBauabschnitt(item: TreeItem<BauabschnittDto>): void {
    this.bauabschnittTreeItemToDelete = item;
    this.isDeleteDialogBauabschnittOpen = true;
  }

  private handleCreateBauabschnitt(item: TreeItem<BauabschnittDto>): void {
    let selectedAbfragevariante = this.getSelectedAbfragevariante(item);
    this.selectedBauabschnitt = new BauabschnittModel(createBauabschnittDto());
    if (_.isNil(selectedAbfragevariante.bauabschnitte)) {
      selectedAbfragevariante.bauabschnitte = [];
    }
    selectedAbfragevariante.bauabschnitte.push(this.selectedBauabschnitt);
    this.formChanged();
    this.openBauabschnittFormular();
    this.selectedItemId = 0;
  }

  private handleSelectBaugebiet(item: TreeItem<BaugebietDto>): void {
    this.abfragevarianteForSelectedBaugebietOrBaurate = item.abfragevariante;
    this.selectedBaugebiet = item.value;
    this.$nextTick(() => {
      this.openBaugebietFormular();
      this.selectedItemId = item.id;
    });
  }

  private handleDeleteBaugebiet(item: TreeItem<BaugebietDto>): void {
    this.baugebietTreeItemToDelete = item;
    this.isDeleteDialogBaugebietOpen = true;
  }

  private handleCreateBaugebiet(item: TreeItem<BaugebietDto>): void {
    this.abfragevarianteForSelectedBaugebietOrBaurate = item.abfragevariante;
    let selectedBauabschnitt = this.getSelectedBauabschnitt(item);
    this.selectedBaugebiet = new BaugebietModel(createBaugebietDto());
    const abfragevariante = item.abfragevariante;
    if (!_.isNil(abfragevariante)) {
      this.selectedBaugebiet.realisierungVon = abfragevariante.realisierungVon;
    }
    selectedBauabschnitt.baugebiete.push(this.selectedBaugebiet);
    this.formChanged();
    this.openBaugebietFormular();
    this.selectedItemId = 0;
  }

  private handleSelectBaurate(item: TreeItem<BaurateDto>): void {
    this.baugebietForSelectedBaurate = item.baugebiet;
    this.abfragevarianteForSelectedBaugebietOrBaurate = item.abfragevariante;
    this.selectedBaurate = item.value;
    this.$nextTick(() => {
      this.openBaurateFormular();
      this.selectedItemId = item.id;
    });
  }

  private handleDeleteBaurate(item: TreeItem<BaurateDto>): void {
    this.baurateTreeItemToDelete = item;
    this.isDeleteDialogBaurateOpen = true;
  }

  private handleCreateBaurate(item: TreeItem<BaurateDto>): void {
    let selectedBaugebiet = this.getSelectedBaugebiet(item);
    this.baugebietForSelectedBaurate = selectedBaugebiet;
    this.abfragevarianteForSelectedBaugebietOrBaurate = item.abfragevariante;
    this.selectedBaurate = new BaurateModel(createBaurateDto());
    selectedBaugebiet.bauraten.push(this.selectedBaurate);
    this.formChanged();
    this.openBaurateFormular();
    this.selectedItemId = 0;
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

  private renumberingAbfragevarianten(abfragevarianten: Array<AbfragevarianteDto> | undefined): void {
    abfragevarianten?.forEach((value, index) => {
      value.abfragevariantenNr = index + 1;
    });
  }

  private getAnzeigeContextAbfragevariante(): AnzeigeContextAbfragevariante {
    if (this.selectedAbfragevariante) {
      return this.selectedAbfragevariante.abfragevarianteSachbearbeitung
        ? AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG
        : AnzeigeContextAbfragevariante.ABFRAGEVARIANTE;
    }

    return AnzeigeContextAbfragevariante.UNDEFINED;
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
        baugebietDto.realisierungVon = abfragevariante.realisierungVon!;
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
