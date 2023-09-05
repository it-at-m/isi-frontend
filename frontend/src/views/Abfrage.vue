<template>
  <v-form ref="form">
    <default-layout
      solid-heading
      resizable
    >
      <template #content>
        <infrastrukturabfrage-component
          v-if="isAbfrageFormularOpen()"
          id="abfrage_infrastrukturabfrage_component"
          v-model="selected"
          :mode="modeAbfrage"
        />
        <abfragevariante-formular
          v-else-if="isAbfragevarianteFormularOpen()"
          id="abfrage_abfragevariante_formular_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :anzeige-context-abfragevariante="anzeigeContextAbfragevariante"
          :sobon-relevant="abfrage.sobonRelevant"
        />
        <bauabschnitt-component
          v-else-if="isBauabschnittFormularOpen()"
          id="bauabschnitt_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
        />
        <baugebiet-component
          v-else-if="isBaugebietFormularOpen()"
          id="baugebiet_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :abfragevariante="abfragevarianteAncestor"
        />
        <baurate-component
          v-else-if="isBaurateFormularOpen()"
          id="baurate_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :baugebiet="baugebietAncestor"
          :abfragevariante="abfragevarianteAncestor"
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
          :disabled="!isDeleteable()"
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
import AbfrageNavigationTree, {
  AbfrageTreeItem,
  generateTreeItemId,
} from "@/components/abfragen/AbfrageNavigationTree.vue";
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

/**
 * Ein Union aller im Rahmen der Abfrage relevanten DTOs, welche ein eigenes Formular haben.
 */
export type AbfrageDtoWithForm =
  | InfrastrukturabfrageDto
  | AbfragevarianteDto
  | BauabschnittDto
  | BaugebietDto
  | BaurateDto;

/**
 * Ein Enum für alle im Rahmen der Abfrage relevanten Entitäten, welche ein eigenes Formular haben.
 */
export const enum AbfrageFormType {
  INFRASTRUKTURABFRAGE,
  ABFRAGEVARIANTE,
  BAUABSCHNITT,
  BAUGEBIET,
  BAURATE,
}

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
  private selected: AbfrageDtoWithForm = this.abfrage;
  private openForm: AbfrageFormType = AbfrageFormType.INFRASTRUKTURABFRAGE;
  private abfragevarianteAncestor: AbfragevarianteModel = new AbfragevarianteModel(createAbfragevarianteDto());
  private baugebietAncestor: BaugebietModel = new BaugebietModel(createBaugebietDto());
  private abfrageId: string = this.$route.params.id;
  private transition: TransitionDto | undefined;
  private isStatusUebergangDialogOpen = false;
  private isDeleteDialogAbfrageOpen = false;
  private isDeleteDialogAbfragevarianteOpen = false;
  private isDeleteDialogBauabschnittOpen = false;
  private isDeleteDialogBaugebietOpen = false;
  private isDeleteDialogBaurateOpen = false;
  private selectedTreeItemId = "";
  private treeItemToDelete: AbfrageTreeItem | undefined;
  public possbileTransitions: Array<TransitionDto> = [];

  mounted(): void {
    this.modeAbfrage = this.isNewAbfrage() ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    this.buttonText = this.isNewAbfrage() ? "Entwurf Speichern" : "Aktualisieren";
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
      this.selectAbfrage();
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

  private isDeleteable(): boolean {
    return this.isEditableByAbfrageerstellung() || this.isEditableByAdmin();
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
      this.$store.commit("search/removeSearchResultById", this.abfrageId);
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
    if (this.isNewAbfrage()) {
      this.$router.push({ path: "/" });
      Toaster.toast(`Die Abfrage wurde erfolgreich gespeichert`, Levels.SUCCESS);
    } else {
      Toaster.toast(`Die Abfrage wurde erfolgreich aktualisiert`, Levels.SUCCESS);
    }
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
          this.selectAbfrage();
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

  private isAbfrageFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.INFRASTRUKTURABFRAGE;
  }

  private isAbfragevarianteFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.ABFRAGEVARIANTE;
  }

  private isBauabschnittFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAUABSCHNITT;
  }

  private isBaugebietFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAUGEBIET;
  }

  private isBaurateFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAURATE;
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
    this.$router.push({ path: "/" });
  }

  private validate(): boolean {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  private handleSelectAbfrage(): void {
    this.selectAbfrage();
  }

  private handleSelectAbfragevariante(item: AbfrageTreeItem): void {
    this.selectItem(item);
  }

  private handleSelectBauabschnitt(item: AbfrageTreeItem): void {
    this.selectItem(item);
  }

  private handleSelectBaugebiet(item: AbfrageTreeItem): void {
    const abfragevariante = this.getFirstAncestorOfTypeAbfragevariante(item);

    if (abfragevariante) {
      this.abfragevarianteAncestor = abfragevariante;
      this.selectItem(item);
    }
  }

  private handleSelectBaurate(item: AbfrageTreeItem): void {
    const abfragevariante = this.getFirstAncestorOfTypeAbfragevariante(item);
    const baugebiet = this.getFirstAncestorOfTypeBaugebiet(item);

    if (abfragevariante && baugebiet) {
      this.abfragevarianteAncestor = abfragevariante;
      this.baugebietAncestor = baugebiet;
      this.selectItem(item);
    }
  }

  private handleCreateAbfragevariante(parent: AbfrageTreeItem): void {
    const abfragevariante = new AbfragevarianteModel(createAbfragevarianteDto());
    this.abfrage.abfragevarianten?.push(abfragevariante);
    this.renumberingAbfragevarianten(this.abfrage.abfragevarianten);
    this.formChanged();
    this.selectCreatedEntity(
      abfragevariante,
      AbfrageFormType.ABFRAGEVARIANTE,
      parent,
      AnzeigeContextAbfragevariante.ABFRAGEVARIANTE
    );
  }

  private handleCreateAbfragevarianteSachbearbeitung(parent: AbfrageTreeItem): void {
    const abfragevariante = new AbfragevarianteModel(createAbfragevarianteDto());
    this.abfrage.abfragevariantenSachbearbeitung?.push(abfragevariante);
    this.renumberingAbfragevarianten(this.abfrage.abfragevariantenSachbearbeitung);
    this.formChanged();
    this.selectCreatedEntity(
      abfragevariante,
      AbfrageFormType.ABFRAGEVARIANTE,
      parent,
      AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG
    );
  }

  private handleCreateBauabschnitt(parent: AbfrageTreeItem): void {
    const abfragevariante = parent.value;
    if (this.isAbfragevariante(parent, abfragevariante)) {
      if (_.isNil(abfragevariante.bauabschnitte)) {
        abfragevariante.bauabschnitte = [];
      }

      const bauabschnitt = new BauabschnittModel(createBauabschnittDto());
      abfragevariante.bauabschnitte.push(bauabschnitt);
      this.formChanged();
      this.selectCreatedEntity(bauabschnitt, AbfrageFormType.BAUABSCHNITT, parent, parent.context);
    }
  }

  private handleCreateBaugebiet(parent: AbfrageTreeItem): void {
    let bauabschnitt: BauabschnittModel | undefined;
    if (this.isAbfragevariante(parent, parent.value)) {
      bauabschnitt = this.getTechnicalBauabschnitt(parent.value);
    } else if (this.isBauabschnitt(parent, parent.value)) {
      bauabschnitt = parent.value;
    }

    if (bauabschnitt) {
      const baugebiet = new BaugebietModel(createBaugebietDto());
      const abfragevariante = this.getFirstAncestorOfTypeAbfragevariante(parent)!;
      baugebiet.realisierungVon = abfragevariante.realisierungVon!;
      bauabschnitt.baugebiete.push(baugebiet);
      this.abfragevarianteAncestor = abfragevariante;
      this.formChanged();
      this.selectCreatedEntity(baugebiet, AbfrageFormType.BAUGEBIET, parent, parent.context);
    }
  }

  private handleCreateBaurate(parent: AbfrageTreeItem): void {
    let baugebiet: BaugebietModel | undefined;
    if (this.isAbfragevariante(parent, parent.value)) {
      baugebiet = this.getTechnicalBaugebiet(parent.value);
    } else if (this.isBaugebiet(parent, parent.value)) {
      baugebiet = parent.value;
    }

    if (baugebiet) {
      const baurate = new BaurateModel(createBaurateDto());
      const abfragevariante = this.getFirstAncestorOfTypeAbfragevariante(parent)!;
      baugebiet.bauraten.push(baurate);
      this.abfragevarianteAncestor = abfragevariante;
      this.baugebietAncestor = baugebiet;
      this.formChanged();
      this.selectCreatedEntity(baurate, AbfrageFormType.BAURATE, parent, parent.context);
    }
  }

  private handleDeleteAbfragevariante(item: AbfrageTreeItem): void {
    this.treeItemToDelete = item;
    this.isDeleteDialogAbfragevarianteOpen = true;
  }

  private handleDeleteBauabschnitt(item: AbfrageTreeItem): void {
    this.treeItemToDelete = item;
    this.isDeleteDialogBauabschnittOpen = true;
  }

  private handleDeleteBaugebiet(item: AbfrageTreeItem): void {
    this.treeItemToDelete = item;
    this.isDeleteDialogBaugebietOpen = true;
  }

  private handleDeleteBaurate(item: AbfrageTreeItem): void {
    this.treeItemToDelete = item;
    this.isDeleteDialogBaurateOpen = true;
  }

  private removeAbfragevarianteFromAbfrage(): void {
    if (this.treeItemToDelete && this.isAbfragevariante(this.treeItemToDelete, this.treeItemToDelete.value)) {
      const context = this.treeItemToDelete.context;
      let abfragevarianten =
        context === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE
          ? this.abfrage.abfragevarianten!
          : this.abfrage.abfragevariantenSachbearbeitung!;
      _.remove(abfragevarianten, (abfragevariante) => abfragevariante === this.treeItemToDelete!.value);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      if (this.anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
        this.abfrage.abfragevarianten = [...abfragevarianten];
      } else {
        this.abfrage.abfragevariantenSachbearbeitung = [...abfragevarianten];
      }
      this.renumberingAbfragevarianten(abfragevarianten);
      this.formChanged();
      this.selectItem(this.treeItemToDelete.parent!);
      this.treeItemToDelete = undefined;
    }
  }

  private removeBauabschnittFromAbfragevariante(): void {
    if (this.treeItemToDelete && this.isBauabschnitt(this.treeItemToDelete, this.treeItemToDelete.value)) {
      const abfragevariante = this.getFirstAncestorOfTypeAbfragevariante(this.treeItemToDelete);
      if (abfragevariante && abfragevariante.bauabschnitte) {
        _.remove(abfragevariante.bauabschnitte, (bauabschnitt) => bauabschnitt === this.treeItemToDelete!.value);
        // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
        abfragevariante.bauabschnitte = [...abfragevariante.bauabschnitte];
        this.formChanged();
        this.selectItem(this.treeItemToDelete.parent!);
        this.treeItemToDelete = undefined;
      }
    }
  }

  private removeBaugebietFromBauabschnitt(): void {
    if (this.treeItemToDelete && this.isBaugebiet(this.treeItemToDelete, this.treeItemToDelete.value)) {
      const bauabschnitt = this.getFirstAncestorOfTypeBauabschnitt(this.treeItemToDelete);
      if (bauabschnitt) {
        _.remove(bauabschnitt.baugebiete, (baugebiet) => baugebiet === this.treeItemToDelete!.value);
        this.clearTechnicalEntities(this.getFirstAncestorOfTypeAbfragevariante(this.treeItemToDelete)!);
        // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
        bauabschnitt.baugebiete = [...bauabschnitt.baugebiete];
        this.formChanged();
        this.selectItem(this.treeItemToDelete.parent!);
        this.treeItemToDelete = undefined;
      }
    }
  }

  private removeBaurateFromBaugebiet(): void {
    if (this.treeItemToDelete && this.isBaurate(this.treeItemToDelete, this.treeItemToDelete.value)) {
      const baugebiet = this.getFirstAncestorOfTypeBaugebiet(this.treeItemToDelete);
      if (baugebiet) {
        _.remove(baugebiet.bauraten, (baurate) => baurate === this.treeItemToDelete!.value);
        this.clearTechnicalEntities(this.getFirstAncestorOfTypeAbfragevariante(this.treeItemToDelete)!);
        // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
        baugebiet.bauraten = [...baugebiet.bauraten];
        this.formChanged();
        this.selectItem(this.treeItemToDelete.parent!);
        this.treeItemToDelete = undefined;
      }
    }
  }

  private async handleSetAbfragevarianteRelevant(item: AbfrageTreeItem): Promise<void> {
    const abfragevariante = item.value;

    if (!_.isNil(abfragevariante.id) && this.isAbfragevariante(item, abfragevariante)) {
      await this.changeAbfragevarianteRelevant(this.abfrage.id as string, abfragevariante.id as string, true).then(
        (dto) => {
          this.saveAbfrageInStore(new InfrastrukturabfrageModel(dto));
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

  private handleDetermineBauratenForAbfragevariante(item: AbfrageTreeItem): void {
    const abfragevariante = item.value;

    if (this.isAbfragevariante(item, abfragevariante)) {
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
  }

  private handleDetermineBauratenForBaugebiet(item: AbfrageTreeItem): void {
    const baugebiet = item.value;

    if (this.isBaugebiet(item, baugebiet)) {
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
  }

  /* Diese "Ancestor"-Methoden sind prinzipiell dafür da, einen Vorfahren von einem bestimmten Typ zu finden.
   * Jedoch können sie auch das übergebene Item selbst zurückgeben, wenn es dem Typen entspricht.
   */

  private getFirstAncestorOfTypeAbfragevariante(item: AbfrageTreeItem): AbfragevarianteModel | undefined {
    while (item.parent) {
      if (this.isAbfragevariante(item, item.value)) {
        return item.value;
      }
      item = item.parent;
    }

    return undefined;
  }

  private getFirstAncestorOfTypeBauabschnitt(item: AbfrageTreeItem): BauabschnittModel | undefined {
    if (this.isBauabschnitt(item, item.value)) {
      return item.value;
    }

    const parent = item.parent;
    if (parent) {
      if (this.isAbfragevariante(parent, parent.value)) {
        return this.getTechnicalBauabschnitt(parent.value);
      } else if (this.isBauabschnitt(parent, parent.value)) {
        return parent.value;
      } else if (this.isBaugebiet(parent, parent.value)) {
        if (parent.parent && this.isBauabschnitt(parent.parent, parent.parent.value)) {
          return parent.parent.value;
        }
      }
    }

    return undefined;
  }

  private getFirstAncestorOfTypeBaugebiet(item: AbfrageTreeItem): BaugebietModel | undefined {
    if (this.isBaugebiet(item, item.value)) {
      return item.value;
    }

    const parent = item.parent;
    if (parent) {
      if (this.isAbfragevariante(parent, parent.value)) {
        return this.getTechnicalBaugebiet(parent.value);
      } else if (this.isBaugebiet(parent, parent.value)) {
        return parent.value;
      }
    }

    return undefined;
  }

  private get mode(): DisplayMode {
    return _.isNil(this.selected.id) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
  }

  private renumberingAbfragevarianten(abfragevarianten: Array<AbfragevarianteDto> | undefined): void {
    abfragevarianten?.forEach((value, index) => {
      value.abfragevariantenNr = index + 1;
    });
  }

  private selectAbfrage(): void {
    this.selectEntity(this.abfrage, AbfrageFormType.INFRASTRUKTURABFRAGE, "", AnzeigeContextAbfragevariante.UNDEFINED);
  }

  private selectItem(item: AbfrageTreeItem): void {
    this.selectEntity(item.value, item.type, item.id, item.context);
  }

  private selectCreatedEntity(
    entity: AbfrageDtoWithForm,
    type: AbfrageFormType,
    parent: AbfrageTreeItem,
    context: AnzeigeContextAbfragevariante
  ): void {
    // Da das TreeItem zu diesem Zeitpunkt noch nicht existiert, muss die ID "vorhergesagt" werden.
    this.selectEntity(entity, type, generateTreeItemId(parent.id, parent.children.length), context);
  }

  private selectEntity(
    entity: AbfrageDtoWithForm,
    type: AbfrageFormType,
    itemId: string,
    context: AnzeigeContextAbfragevariante
  ): void {
    this.anzeigeContextAbfragevariante = context;
    this.selected = entity;
    this.openForm = type;
    this.selectedTreeItemId = itemId;
  }

  private isAbfragevariante(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is AbfragevarianteModel {
    return item.type === AbfrageFormType.ABFRAGEVARIANTE;
  }

  private isBauabschnitt(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is BauabschnittModel {
    return item.type === AbfrageFormType.BAUABSCHNITT;
  }

  private isBaugebiet(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is BaugebietModel {
    return item.type === AbfrageFormType.BAUGEBIET;
  }

  private isBaurate(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is BaurateModel {
    return item.type === AbfrageFormType.BAURATE;
  }

  /**
   * Ermittelt oder erstellt bei Bedarf einen Platzhalter-Bauabschnitt für "alleinstehende" Baugebiete und -raten.
   */
  private getTechnicalBauabschnitt(abfragevariante: AbfragevarianteModel): BauabschnittModel | undefined {
    let bauabschnitt: BauabschnittModel | undefined;

    if (!_.isNil(abfragevariante.bauabschnitte)) {
      bauabschnitt = abfragevariante.bauabschnitte[0];
    } else {
      abfragevariante.bauabschnitte = [];
    }

    if (_.isNil(bauabschnitt)) {
      bauabschnitt = new BauabschnittModel(createTechnicalBauabschnittDto());
      abfragevariante.bauabschnitte.push(bauabschnitt);
    }

    if (bauabschnitt.technical) {
      return bauabschnitt;
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
        baugebietDto = new BaugebietModel(createTechnicalBaugebietDto());
        bauabschnitt.baugebiete.push(baugebietDto);
      }

      if (baugebietDto.technical) {
        baugebietDto.realisierungVon = abfragevariante.realisierungVon!;
        return baugebietDto;
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
