<template>
  <v-form ref="form">
    <default-layout solid-heading>
      <template #content>
        <infrastrukturabfrage-component
          v-if="isAbfrageFormularOpen"
          id="abfrage_infrastrukturabfrage_component"
          v-model="selected"
          :mode="modeAbfrage"
        />
        <abfragevariante-formular
          v-else-if="isAbfragevarianteFormularOpen"
          id="abfrage_abfragevariante_formular_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :sobon-relevant="abfrage.sobonRelevant"
        />
        <bauabschnitt-component
          v-else-if="isBauabschnittFormularOpen"
          id="bauabschnitt_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
        />
        <baugebiet-component
          v-else-if="isBaugebietFormularOpen"
          id="baugebiet_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :abfragevariante="currentAbfragevariante"
        />
        <baurate-component
          v-else-if="isBaurateFormularOpen"
          id="baurate_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :baugebiet="currentBaugebiet"
          :abfragevariante="currentAbfragevariante"
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
            selected.abfragevariantenNr +
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
            selected.bezeichnung +
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
            selected.bezeichnung +
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
          :dialogtext="'Hiermit wird die Baurate für das Jahr ' + selected.jahr + ' unwiderruflich gelöscht.'"
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
        <abfrage-navigation-tree
          id="abfrage_navigation_tree"
          :abfrage="abfrage"
          :selected-item-id="selectedTreeItemId"
          @select-abfrage="handleSelectAbfrage"
          @select-abfragevariante="handleSelectAbfragevariante"
          @select-bauabschnitt="handleSelectBauabschnitt"
          @select-baugebiet="handleSelectBaugebiet"
          @select-baurate="handleSelectBaurate"
          @create-abfragevariante="handleCreateAbfragevariante"
          @create-abfragevariante-sachbearbeitung="handleCreateAbfragevarianteSachbearbeitung"
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
  BaurateDto,
  InfrastrukturabfrageDto,
  StatusAbfrage,
  TransitionDto,
} from "@/api/api-client/isi-backend";
import { Levels } from "@/api/error";
import AbfrageNavigationTree, { TreeItem, generateTreeItemId } from "@/components/abfragen/AbfrageNavigationTree.vue";
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

// Ein Union aller im Rahmen der Abfrage relevanten Models, welche ein eigenes Formular haben.
export type ModelWithForm =
  | InfrastrukturabfrageModel
  | AbfragevarianteModel
  | BauabschnittModel
  | BaugebietModel
  | BaurateModel;

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
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  private modeAbfrage = DisplayMode.UNDEFINED;
  private anzeigeContextAbfragevariante: AnzeigeContextAbfragevariante = AnzeigeContextAbfragevariante.UNDEFINED;
  private buttonText = "";
  private dialogTextStatus = "";
  private abfrage = new InfrastrukturabfrageModel(createInfrastrukturabfrageDto());

  /**
   * Die Entität, welche aktuell ausgewählt ist und dessen Formular angezeigt wird.
   */
  private selected: ModelWithForm = this.abfrage;
  /**
   * Die Abfragevariante, welche für einen aktuellen Prozess wichtig ist.
   *
   */
  private currentAbfragevariante: AbfragevarianteModel = new AbfragevarianteModel(createAbfragevarianteDto());
  /**
   * Das Baugebiet, welche für einen aktuellen Prozess wichtig ist.
   */
  private currentBaugebiet: BaugebietModel = new BaugebietModel(createBaugebietDto());

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
  private selectedTreeItemId = "";
  private abfragevarianteTreeItemToDelete: TreeItem<InfrastrukturabfrageModel> | undefined = undefined;
  private bauabschnittTreeItemToDelete: TreeItem<BauabschnittModel> | undefined = undefined;
  private baugebietTreeItemToDelete: TreeItem<BaugebietModel> | undefined = undefined;
  private baurateTreeItemToDelete: TreeItem<BaurateModel> | undefined = undefined;
  public possbileTransitions: Array<TransitionDto> = [];

  mounted(): void {
    this.modeAbfrage = this.isNewAbfrage() ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    this.buttonText = this.isNewAbfrage() ? "Entwurf Speichern" : "Aktualisieren";
    this.openAbfrageFormular();
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
      this.openAbfrageFormular();
    }
  }

  get isEditable(): boolean {
    return this.isEditableWithAnzeigeContextAbfragevariante(this.anzeigeContextAbfragevariante);
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
    this.openAbfrageFormular();
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
    this.anzeigeContextAbfragevariante = AnzeigeContextAbfragevariante.UNDEFINED;
    this.selected = this.abfrage;
    this.openAbfrageFormular();
    this.selectedTreeItemId = "";
  }

  private handleSelectAbfragevariante(item: TreeItem<AbfragevarianteModel>): void {
    this.anzeigeContextAbfragevariante = item.context;
    this.selected = item.value;
    this.openAbfragevarianteFormular();
    this.selectedTreeItemId = item.id;
  }

  private handleDeleteAbfragevariante(item: TreeItem<AbfragevarianteModel>): void {
    this.abfragevarianteTreeItemToDelete = item;
    this.isDeleteDialogAbfragevarianteOpen = true;
  }

  private async handleSetAbfragevarianteRelevant(item: TreeItem<AbfragevarianteModel>): Promise<void> {
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

  private handleDetermineBauratenForAbfragevariante(item: TreeItem<AbfragevarianteModel>): void {
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

  private handleDetermineBauratenForBaugebiet(item: TreeItem<BaugebietModel>): void {
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

  private handleCreateAbfragevariante(parent: TreeItem<InfrastrukturabfrageModel>): void {
    this.anzeigeContextAbfragevariante = AnzeigeContextAbfragevariante.ABFRAGEVARIANTE;
    this.selected = new AbfragevarianteModel(createAbfragevarianteDto());
    this.abfrage.abfragevarianten?.push(this.selected);
    this.renumberingAbfragevarianten(this.abfrage.abfragevarianten);
    this.formChanged();
    this.openAbfragevarianteFormular();
    // Da das TreeItem zu diesem Zeitpunkt noch nicht existiert, muss die ID "vorhergesagt" werden.
    this.selectedTreeItemId = generateTreeItemId(parent.id, parent.children.length);
  }

  private handleCreateAbfragevarianteSachbearbeitung(parent: TreeItem<InfrastrukturabfrageModel>): void {
    this.anzeigeContextAbfragevariante = AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG;
    this.selected = new AbfragevarianteModel(createAbfragevarianteDto());
    this.abfrage.abfragevariantenSachbearbeitung?.push(this.selected);
    this.renumberingAbfragevarianten(this.abfrage.abfragevariantenSachbearbeitung);
    this.formChanged();
    this.openAbfragevarianteFormular();
    // Da das TreeItem zu diesem Zeitpunkt noch nicht existiert, muss die ID "vorhergesagt" werden.
    this.selectedTreeItemId = generateTreeItemId(parent.id, parent.children.length);
  }

  private removeAbfragevarianteFromAbfrage(): void {
    if (!_.isNil(this.abfragevarianteTreeItemToDelete)) {
      const context = this.abfragevarianteTreeItemToDelete.context;
      let abfragevarianten =
        context === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE
          ? this.abfrage.abfragevarianten!
          : this.abfrage.abfragevariantenSachbearbeitung!;
      _.remove(abfragevarianten, (abfragevariante) => abfragevariante === this.abfragevarianteTreeItemToDelete!.value);
      this.renumberingAbfragevarianten(abfragevarianten);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      if (context === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
        this.abfrage.abfragevarianten = [...abfragevarianten];
      } else {
        this.abfrage.abfragevariantenSachbearbeitung = [...abfragevarianten];
      }

      if (this.abfragevarianteTreeItemToDelete.value === this.selected) {
        this.anzeigeContextAbfragevariante = AnzeigeContextAbfragevariante.UNDEFINED;
        this.selected = this.abfrage;
        this.formChanged();
        this.openAbfrageFormular();
        this.selectedTreeItemId = this.abfragevarianteTreeItemToDelete!.parent!.id;
      }

      this.abfragevarianteTreeItemToDelete = undefined;
    }
  }

  private removeBauabschnittFromAbfragevariante(): void {
    if (!_.isNil(this.bauabschnittTreeItemToDelete)) {
      const abfragevariante = this.getCurrentAbfragevariante(this.bauabschnittTreeItemToDelete);
      if (!_.isNil(abfragevariante.bauabschnitte)) {
        _.remove(
          abfragevariante.bauabschnitte,
          (bauabschnitt) => bauabschnitt === this.bauabschnittTreeItemToDelete!.value
        );
        // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
        abfragevariante.bauabschnitte = [...abfragevariante.bauabschnitte];

        if (this.bauabschnittTreeItemToDelete.value === this.selected) {
          this.anzeigeContextAbfragevariante = this.bauabschnittTreeItemToDelete.context;
          this.selected = this.bauabschnittTreeItemToDelete.parent!.value;
          this.formChanged();
          this.openAbfragevarianteFormular();
          this.selectedTreeItemId = this.bauabschnittTreeItemToDelete!.parent!.id;
        }
      }

      this.bauabschnittTreeItemToDelete = undefined;
    }
  }

  private removeBaugebietFromBauabschnitt(): void {
    if (!_.isNil(this.baugebietTreeItemToDelete)) {
      const bauabschnitt = this.getCurrentBauabschnitt(this.baugebietTreeItemToDelete);
      _.remove(bauabschnitt.baugebiete, (baugebiet) => baugebiet === this.baugebietTreeItemToDelete!.value);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      bauabschnitt.baugebiete = [...bauabschnitt.baugebiete];
      this.clearTechnicalEntities(this.getCurrentAbfragevariante(this.baugebietTreeItemToDelete));

      if (this.baugebietTreeItemToDelete.value === this.selected) {
        this.anzeigeContextAbfragevariante = this.baugebietTreeItemToDelete.context;
        this.selected = this.baugebietTreeItemToDelete.parent!.value;
        this.formChanged();
        if (bauabschnitt.technical) {
          this.openAbfragevarianteFormular();
        } else {
          this.openBauabschnittFormular();
        }
        this.selectedTreeItemId = this.baugebietTreeItemToDelete!.parent!.id;
      }

      this.baugebietTreeItemToDelete = undefined;
    }
  }

  private removeBaurateFromBaugebiet(): void {
    if (!_.isNil(this.baurateTreeItemToDelete)) {
      const baugebiet = this.getCurrentBaugebiet(this.baurateTreeItemToDelete);
      console.log(this.getCurrentAbfragevariante(this.baurateTreeItemToDelete));
      _.remove(baugebiet.bauraten, (baurate) => baurate === this.baurateTreeItemToDelete!.value);
      console.log(this.getCurrentAbfragevariante(this.baurateTreeItemToDelete));
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      baugebiet.bauraten = [...baugebiet.bauraten];
      this.clearTechnicalEntities(this.getCurrentAbfragevariante(this.baurateTreeItemToDelete));

      if (this.baurateTreeItemToDelete.value === this.selected) {
        this.anzeigeContextAbfragevariante = this.baurateTreeItemToDelete.context;
        this.selected = this.baurateTreeItemToDelete.parent!.value;
        this.formChanged();
        if (baugebiet.technical) {
          this.openAbfragevarianteFormular();
        } else {
          this.openBaugebietFormular();
        }
        this.selectedTreeItemId = this.baurateTreeItemToDelete!.parent!.id;
      }

      this.baurateTreeItemToDelete = undefined;
    }
  }

  private getCurrentAbfragevariante(
    item: TreeItem<AbfragevarianteModel | BauabschnittModel | BaugebietModel | BaurateModel>
  ): AbfragevarianteModel {
    let currentItem: TreeItem<ModelWithForm> = item;

    /**
     * Geht entlang den Parents des TreeItems solange in der Hierarchie nach oben, bis es auf das Child der Abfrage stößt.
     * Dieses TreeItem kann dann nur noch die aktuelle Abfragevariante sein.
     */
    while (currentItem.parent !== null && currentItem.parent.value !== this.abfrage) {
      currentItem = currentItem.parent;
    }

    return currentItem.value;
  }

  private getCurrentBauabschnitt(item: TreeItem<BaugebietModel>): BauabschnittModel {
    const abfragevariante = this.getCurrentAbfragevariante(item);
    if (item.parent!.value === abfragevariante) {
      return this.getTechnicalBauabschnitt(abfragevariante)!;
    } else {
      return item.parent!.value as BauabschnittModel;
    }
  }

  private getCurrentBaugebiet(item: TreeItem<BaurateModel>): BaugebietModel {
    const abfragevariante = this.getCurrentAbfragevariante(item);
    if (item.parent!.value === abfragevariante) {
      return this.getTechnicalBaugebiet(abfragevariante)!;
    } else {
      return item.parent!.value as BaugebietModel;
    }
  }

  private handleSelectBauabschnitt(item: TreeItem<BauabschnittModel>): void {
    this.anzeigeContextAbfragevariante = item.context;
    this.selected = item.value;
    this.openBauabschnittFormular();
    this.selectedTreeItemId = item.id;
  }

  private handleDeleteBauabschnitt(item: TreeItem<BauabschnittModel>): void {
    this.bauabschnittTreeItemToDelete = item;
    this.isDeleteDialogBauabschnittOpen = true;
  }

  private handleCreateBauabschnitt(parent: TreeItem<AbfragevarianteModel>): void {
    const abfragvariante = parent.value;
    if (_.isNil(abfragvariante.bauabschnitte)) {
      abfragvariante.bauabschnitte = [];
    }

    const bauabschnitt = new BauabschnittModel(createBauabschnittDto());
    abfragvariante.bauabschnitte.push(bauabschnitt);
    this.anzeigeContextAbfragevariante = parent.context;
    this.selected = bauabschnitt;
    this.formChanged();
    this.openBauabschnittFormular();
    // Da das TreeItem zu diesem Zeitpunkt noch nicht existiert, muss die ID "vorhergesagt" werden.
    this.selectedTreeItemId = generateTreeItemId(parent.id, parent.children.length);
  }

  private handleSelectBaugebiet(item: TreeItem<BaugebietModel>): void {
    this.anzeigeContextAbfragevariante = item.context;
    this.selected = item.value;
    this.currentAbfragevariante = this.getCurrentAbfragevariante(item);
    this.openBaugebietFormular();
    this.selectedTreeItemId = item.id;
  }

  private handleDeleteBaugebiet(item: TreeItem<BaugebietModel>): void {
    this.baugebietTreeItemToDelete = item;
    this.isDeleteDialogBaugebietOpen = true;
  }

  private handleCreateBaugebiet(parent: TreeItem<AbfragevarianteModel | BauabschnittModel>): void {
    const abfragevariante = this.getCurrentAbfragevariante(parent);
    let bauabschnitt: BauabschnittModel;
    if (parent.value === abfragevariante) {
      bauabschnitt = this.getTechnicalBauabschnitt(abfragevariante)!;
    } else {
      bauabschnitt = parent.value as BauabschnittModel;
    }

    const baugebiet = new BaugebietModel(createBaugebietDto());
    baugebiet.realisierungVon = abfragevariante.realisierungVon!;
    bauabschnitt.baugebiete.push(baugebiet);
    this.currentAbfragevariante = abfragevariante;
    this.anzeigeContextAbfragevariante = parent.context;
    this.selected = baugebiet;
    this.formChanged();
    this.openBaugebietFormular();
    // Da das TreeItem zu diesem Zeitpunkt noch nicht existiert, muss die ID "vorhergesagt" werden.
    this.selectedTreeItemId = generateTreeItemId(parent.id, parent.children.length);
  }

  private handleSelectBaurate(item: TreeItem<BaurateModel>): void {
    this.anzeigeContextAbfragevariante = item.context;
    this.selected = item.value;
    this.currentAbfragevariante = this.getCurrentAbfragevariante(item);
    this.currentBaugebiet = this.getCurrentBaugebiet(item);
    this.openBaurateFormular();
    this.selectedTreeItemId = item.id;
  }

  private handleDeleteBaurate(item: TreeItem<BaurateModel>): void {
    this.baurateTreeItemToDelete = item;
    this.isDeleteDialogBaurateOpen = true;
  }

  private handleCreateBaurate(parent: TreeItem<AbfragevarianteModel | BaugebietModel>): void {
    const abfragevariante = this.getCurrentAbfragevariante(parent);
    let baugebiet: BaugebietModel;
    if (parent.value === abfragevariante) {
      baugebiet = this.getTechnicalBaugebiet(abfragevariante)!;
    } else {
      baugebiet = parent.value as BaugebietModel;
    }

    const baurate = new BaurateModel(createBaurateDto());
    baugebiet.bauraten.push(baurate);
    this.currentAbfragevariante = abfragevariante;
    this.currentBaugebiet = baugebiet;
    this.anzeigeContextAbfragevariante = parent.context;
    this.selected = baurate;
    this.formChanged();
    this.openBaurateFormular();
    // Da das TreeItem zu diesem Zeitpunkt noch nicht existiert, muss die ID "vorhergesagt" werden.
    this.selectedTreeItemId = generateTreeItemId(parent.id, parent.children.length);
  }

  private get mode(): DisplayMode {
    return _.isNil(this.selected.id) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
  }

  private renumberingAbfragevarianten(abfragevarianten: Array<AbfragevarianteDto> | undefined): void {
    abfragevarianten?.forEach((value, index) => {
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
