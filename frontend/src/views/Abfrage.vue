<template>
  <v-form ref="form">
    <default-layout
      solid-heading
      resizable
    >
      <template #content>
        <bauleitplanverfahren-component
          v-if="isBauleitplanverfahrenFormularOpen()"
          id="bauleitverfahren_component"
          ref="bauleitverfahrenComponent"
          v-model="selected"
          :is-new="isNewAbfrage()"
          :mode="modeAbfrage"
        />
        <baugenehmigungsverfahren-component
          v-else-if="isBaugenehmigungsverfahrenFormularOpen()"
          id="bauleitverfahren_component"
          ref="bauleitverfahrenComponent"
          v-model="selected"
          :is-new="isNewAbfrage()"
          :mode="modeAbfrage"
        />
        <weiteres-verfahren-component
          v-else-if="isWeiteresVerfahrenFormularOpen()"
          id="weiteres_verfahren_component"
          ref="weiteresVerfahrenComponent"
          v-model="selected"
          :is-new="isNewAbfrage()"
          :mode="modeAbfrage"
        />
        <abfragevariante-bauleitplanverfahren-component
          v-else-if="isAbfragevarianteBauleitplanverfahrenFormularOpen()"
          id="abfragevariante_bauleitplanverfahren_component"
          ref="abfragevarianteBauleitplanverfahrenComponent"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :anzeige-context-abfragevariante="anzeigeContextAbfragevariante"
        />
        <abfragevariante-baugenehmigungsverfahren-component
          v-else-if="isAbfragevarianteBaugenehmigungsverfahrenFormularOpen()"
          id="abfragevariante_baugenehmigungsverfahren_component"
          ref="abfragevarianteBaugenehmigungsverfahrenComponent"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :anzeige-context-abfragevariante="anzeigeContextAbfragevariante"
        />
        <abfragevariante-weiteres-verfahren-component
          v-else-if="isAbfragevarianteWeiteresVerfahrenFormularOpen()"
          id="abfragevariante_weiteres_verfahren_component"
          ref="abfragevarianteWeiteresVerfahrenComponent"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :anzeige-context-abfragevariante="anzeigeContextAbfragevariante"
        />
        <bauabschnitt-component
          v-else-if="isBauabschnittFormularOpen()"
          id="bauabschnitt_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
        />
        <baugebiet-bauleitplanverfahren-component
          v-else-if="isBaugebietBauleitplanverfahrenFormularOpen()"
          id="baugebiet_bauleitplanverfahren_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :abfragevariante="abfragevarianteAncestor"
        />
        <baugebiet-baugenehmigungsverfahren-component
          v-else-if="isBaugebietBaugenehmigungsverfahrenFormularOpen()"
          id="baugebiet_baugenehmigungsverfahren_component"
          v-model="selected"
          :is-editable="isEditable"
          :mode="mode"
          :abfragevariante="abfragevarianteAncestor"
        />
        <baugebiet-weiteres-verfahren-component
          v-else-if="isBaugebietWeiteresVerfahrenFormularOpen()"
          id="baugebiet_weiteres_verfahren_component"
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
          dialogtext="Die Abfrage und ihre dazugehörigen Abfragevarianten werden gelöscht."
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogAbfrageNo"
          @yes="yesNoDialogAbfrageYes"
        />
        <yes-no-dialog
          id="abfrage_yes_no_dialog_statusuebergang"
          ref="yesNoDialogStatusuebergang"
          v-model="isStatusUebergangDialogOpen"
          icon="mdi-account-arrow-right"
          dialogtitle="Hinweis"
          :dialogtext="dialogTextStatus"
          no-text="Abbrechen"
          :yes-text="'Zustimmen'"
          :anmerkung-max-length="anmerkungMaxLength"
          @anmerkung="handleAnmerkung"
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
        <yes-no-dialog
          id="abfrage_abfragevariante_relevante_abfragevariante_dialog"
          v-model="isRelevanteAbfragevarianteDialogOpen"
          icon="mdi-marker"
          dialogtitle="Hinweis"
          :dialogtext="relevanteAbfragevarianteDialogText"
          no-text="Abbrechen"
          :yes-text="relevanteAbfragevarianteYesButtonText"
          @no="yesNoDialogRelevanteAbfragevarianteNo"
          @yes="yesNoDialogRelevanteAbfragevarianteYes"
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
          :relevante-abfragevariante-id="relevanteAbfragevarianteId"
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
          v-for="(transition, index) in possibleTransitions"
          v-show="!isNewAbfrage()"
          :id="'abfrage_status_aenderung' + index + '_button'"
          :key="index"
          :disabled="isFormDirty()"
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
          :disabled="(!isNewAbfrage() && !isFormDirty()) || containsNotAllowedDokument(abfrage.dokumente)"
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
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
  BauleitplanverfahrenDto,
  BauleitplanverfahrenAngelegtDto,
  BauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  BauleitplanverfahrenInBearbeitungFachreferatDto,
  BauleitplanverfahrenBedarfsmeldungErfolgtDto,
  BaugenehmigungsverfahrenDto,
  BaugenehmigungsverfahrenAngelegtDto,
  BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
  BaugenehmigungsverfahrenInBearbeitungFachreferatDto,
  BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto,
  WeiteresVerfahrenDto,
  WeiteresVerfahrenAngelegtDto,
  WeiteresVerfahrenInBearbeitungSachbearbeitungDto,
  WeiteresVerfahrenInBearbeitungFachreferatDto,
  WeiteresVerfahrenBedarfsmeldungErfolgtDto,
  StatusAbfrage,
  TransitionDto,
  AbfrageDtoArtAbfrageEnum,
  AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum,
  AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum,
} from "@/api/api-client/isi-backend";
import { Levels } from "@/api/error";
import AbfrageNavigationTree, {
  AbfrageTreeItem,
  generateTreeItemId,
} from "@/components/abfragen/AbfrageNavigationTree.vue";
import BauleitplanverfahrenComponent from "@/components/abfragen/bauleitplanverfahren/BauleitplanverfahrenComponent.vue";
import BaugenehmigungsverfahrenComponent from "@/components/abfragen/baugenehmigungsverfahren/BaugenehmigungsverfahrenComponent.vue";
import WeiteresVerfahrenComponent from "@/components/abfragen/weiteresVerfahren/WeiteresVerfahrenComponent.vue";
import AbfragevarianteBauleitplanverfahrenComponent from "@/components/abfragevarianten/bauleitplanverfahren/AbfragevarianteBauleitplanverfahrenComponent.vue";
import AbfragevarianteBaugenehmigungsverfahrenComponent from "@/components/abfragevarianten/baugenehmigungsverfahren/AbfragevarianteBaugenehmigungsverfahrenComponent.vue";
import AbfragevarianteWeiteresVerfahrenComponent from "@/components/abfragevarianten/weiteresVerfahren/AbfragevarianteWeiteresVerfahrenComponent.vue";
import BauabschnittComponent from "@/components/bauabschnitte/BauabschnittComponent.vue";
import BaugebietBauleitplanverfahrenComponent from "@/components/baugebiete/bauleitplanverfahren/BaugebietBauleitplanverfahrenComponent.vue";
import BaugebietBaugenehmigungsverfahrenComponent from "@/components/baugebiete/baugenehmigungsverfahren/BaugebietBaugenehmigungsverfahrenComponent.vue";
import BaugebietWeiteresVerfahrenComponent from "@/components/baugebiete/weiteresVerfahren/BaugebietWeiteresVerfahrenComponent.vue";
import BaurateComponent from "@/components/bauraten/BaurateComponent.vue";
import InformationList from "@/components/common/InformationList.vue";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import AbfrageApiRequestMixin from "@/mixins/requests/AbfragenApiRequestMixin";
import BauratenApiRequestMixin from "@/mixins/requests/BauratenApiRequestMixin";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";
import StatusUebergangApiRequestMixin from "@/mixins/requests/StatusUebergangApiRequestMixin";
import TransitionApiRequestMixin from "@/mixins/requests/TransistionApiRequestMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import DisplayMode from "@/types/common/DisplayMode";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import { containsNotAllowedDokument } from "@/utils/DokumenteUtil";
import {
  createAbfragevarianteBauleitplanverfahrenDto,
  createAbfragevarianteBaugenehmigungsverfahrenDto,
  createAbfragevarianteWeiteresVerfahrenDto,
  createBauabschnittDto,
  createBaugebietDto,
  createBaurateDto,
  createBauleitplanverfahrenDto,
  createBaugenehmigungsverfahrenDto,
  createWeiteresVerfahrenDto,
  createTechnicalBauabschnittDto,
  createTechnicalBaugebietDto,
} from "@/utils/Factories";
import {
  mapToBauleitplanverfahrenAngelegt,
  mapToBaugenehmigungsverfahrenAngelegt,
  mapToWeiteresVerfahrenAngelegt,
  mapToBauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  mapToBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
  mapToWeiteresVerfahrenInBearbeitungSachbearbeitungDto,
  mapToBauleitplanverfahrenInBearbeitungFachreferatDto,
  mapToBaugenehmigungsverfahrenInBearbeitungFachreferatDto,
  mapToWeiteresVerfahrenInBearbeitungFachreferatDto,
  mapToBauleitplanverfahrenBedarfsmeldungErfolgtDto,
  mapToBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto,
  mapToWeiteresVerfahrenBedarfsmeldungErfolgtDto,
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
  | BauleitplanverfahrenDto
  | BaugenehmigungsverfahrenDto
  | WeiteresVerfahrenDto
  | AbfragevarianteBauleitplanverfahrenDto
  | AbfragevarianteBaugenehmigungsverfahrenDto
  | AbfragevarianteWeiteresVerfahrenDto
  | BauabschnittDto
  | BaugebietDto
  | BaurateDto;

/**
 * Ein Enum für alle im Rahmen der Abfrage relevanten Entitäten, welche ein eigenes Formular haben.
 */
export const enum AbfrageFormType {
  BAULEITPLANVERFAHREN,
  BAUGENEHMIGUNGSVERFAHREN,
  WEITERES_VERFAHREN,
  ABFRAGEVARIANTE_BAULEITPLANVERFAHREN,
  ABFRAGEVARIANTE_BAUGENEHMIGUNGSVERFAHREN,
  ABFRAGEVARIANTE_WEITERES_VERFAHREN,
  BAUABSCHNITT,
  BAUGEBIET_BAULEITPLANVERFAHREN,
  BAUGEBIET_BAUGENEHMIGUNGSVERFAHREN,
  BAUGEBIET_WEITERES_VERFAHREN,
  BAURATE,
}

@Component({
  methods: { containsNotAllowedDokument },
  components: {
    AbfragevarianteBauleitplanverfahrenComponent,
    AbfragevarianteBaugenehmigungsverfahrenComponent,
    AbfragevarianteWeiteresVerfahrenComponent,
    AbfrageNavigationTree,
    InformationList,
    BauleitplanverfahrenComponent,
    BaugenehmigungsverfahrenComponent,
    WeiteresVerfahrenComponent,
    YesNoDialog,
    DefaultLayout,
    BaurateComponent,
    BauabschnittComponent,
    BaugebietBauleitplanverfahrenComponent,
    BaugebietBaugenehmigungsverfahrenComponent,
    BaugebietWeiteresVerfahrenComponent,
  },
})
export default class Abfrage extends Mixins(
  TransitionApiRequestMixin,
  FieldValidationRulesMixin,
  AbfrageApiRequestMixin,
  BauratenApiRequestMixin,
  BauvorhabenApiRequestMixin,
  StatusUebergangApiRequestMixin,
  ValidatorMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
) {
  private readonly RELEVANTE_ABFRAGEVARIANTE_DIALOG_TEXT_BASE = "Hiermit wird die vorhandene Markierung überschrieben.";
  private readonly TRANSITION_URL_ERLEDIGT_OHNE_FACHREFERAT = "erledigt-ohne-fachreferat";

  private modeAbfrage = DisplayMode.UNDEFINED;
  private anzeigeContextAbfragevariante: AnzeigeContextAbfragevariante = AnzeigeContextAbfragevariante.UNDEFINED;
  private buttonText = "";
  private dialogTextStatus = "";
  private anmerkung = "";
  private abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel =
    new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
  private selected: AbfrageDtoWithForm = this.abfrage;
  private openForm: AbfrageFormType = AbfrageFormType.BAULEITPLANVERFAHREN;
  private abfragevarianteAncestor:
    | AbfragevarianteBauleitplanverfahrenModel
    | AbfragevarianteBaugenehmigungsverfahrenModel
    | AbfragevarianteWeiteresVerfahrenModel = new AbfragevarianteBauleitplanverfahrenModel(
    createAbfragevarianteBauleitplanverfahrenDto(),
  );
  private baugebietAncestor: BaugebietModel = new BaugebietModel(createBaugebietDto());
  private abfrageId: string = this.$route.params.id;
  private artAbfrage: string = this.$route.params.art;
  private transition: TransitionDto | undefined;
  private isStatusUebergangDialogOpen = false;
  private isDeleteDialogAbfrageOpen = false;
  private isDeleteDialogAbfragevarianteOpen = false;
  private isDeleteDialogBauabschnittOpen = false;
  private isDeleteDialogBaugebietOpen = false;
  private isDeleteDialogBaurateOpen = false;
  private isRelevanteAbfragevarianteDialogOpen = false;
  private relevanteAbfragevarianteDialogText = "";
  private relevanteAbfragevarianteYesButtonText = "Ok";
  private hasAnmerkung = false;
  private anmerkungMaxLength = 0;
  private selectedTreeItemId = "";
  private relevanteAbfragevarianteId: string | null = null;
  private relevanteAbfragevarianteToBeSet:
    | AbfragevarianteBauleitplanverfahrenModel
    | AbfragevarianteBaugenehmigungsverfahrenModel
    | AbfragevarianteWeiteresVerfahrenModel
    | undefined;
  private treeItemToDelete: AbfrageTreeItem | undefined;
  public possibleTransitions: Array<TransitionDto> = [];

  mounted(): void {
    this.modeAbfrage = this.isNewAbfrage() ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    this.buttonText = this.isNewAbfrage() ? "Entwurf Speichern" : "Aktualisieren";
    this.setSelectedAbfrageInStore();
    if (!this.isNewAbfrage()) {
      this.getTransitions(this.abfrageId, true).then((response) => {
        this.possibleTransitions = response;
      });
    }
  }

  @Watch("$store.state.search.selectedAbfrage", { deep: true })
  private selectedAbfrageChanged() {
    const abfrageFromStore = this.$store.getters["search/selectedAbfrage"];
    if (!_.isNil(abfrageFromStore)) {
      this.abfrage = _.cloneDeep(abfrageFromStore);
      this.selectAbfrage();
      const bauvorhabenId = this.abfrage.bauvorhaben;
      if (bauvorhabenId) {
        this.getBauvorhabenById(bauvorhabenId, false).then((dto) => {
          this.relevanteAbfragevarianteId = dto.relevanteAbfragevariante ?? null;
        });
      }
    }
  }

  get isEditable(): boolean {
    return this.isEditableWithAnzeigeContextAbfragevariante(this.anzeigeContextAbfragevariante);
  }

  async setSelectedAbfrageInStore(): Promise<void> {
    if (this.abfrageId !== undefined) {
      this.getById(this.abfrageId, true)
        .then((dto) => {
          if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
            this.saveAbfrageInStore(new BauleitplanverfahrenModel(dto));
          } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
            this.saveAbfrageInStore(new BaugenehmigungsverfahrenModel(dto));
          } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
            this.saveAbfrageInStore(new WeiteresVerfahrenModel(dto));
          }
        })
        .catch(() => {
          this.$store.commit("search/selectedAbfrage", undefined);
        });
    } else {
      if (this.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
        this.saveAbfrageInStore(new BauleitplanverfahrenModel(createBauleitplanverfahrenDto()));
      } else if (this.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
        this.saveAbfrageInStore(new BaugenehmigungsverfahrenModel(createBaugenehmigungsverfahrenDto()));
      } else if (this.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
        this.saveAbfrageInStore(new WeiteresVerfahrenModel(createWeiteresVerfahrenDto()));
      }
    }
  }

  private deleteAbfrage(): void {
    this.isDeleteDialogAbfrageOpen = true;
  }

  private isDeleteable(): boolean {
    return this.isEditableByAbfrageerstellung() || this.isEditableByAdmin();
  }

  private isBauleitplanverfahren(): boolean {
    return this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren;
  }

  private isBaugenehmigungsverfahren(): boolean {
    return this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren;
  }

  private isWeiteresVerfahren(): boolean {
    return this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren;
  }

  private statusUebergang(transition: TransitionDto): void {
    this.transition = transition;
    this.anmerkungMaxLength = 0;
    this.dialogTextStatus = transition.dialogText as string;

    if (transition.url === this.TRANSITION_URL_ERLEDIGT_OHNE_FACHREFERAT) {
      // Verfügbare Zeichen = (maximale Zeichenanzahl) - (benutzte Zeichen) - (Zeilenumbruch)
      const availableLength = 1000 - (this.abfrage.anmerkung?.length ?? 0) - 1;
      if (availableLength > 0) {
        this.anmerkungMaxLength = availableLength;
        this.dialogTextStatus += " Sie können eine Anmerkung hinzufügen.";
      } else {
        this.dialogTextStatus += " Für eine Anmerkung gibt es im Anmerkungsfeld nicht mehr genug Platz.";
      }
    }

    this.isStatusUebergangDialogOpen = true;
  }

  private handleAnmerkung(val: string): void {
    this.anmerkung = val;
  }

  private yesNoDialogAbfrageYes(): void {
    this.deleteBauleitplanverfahren();
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
    if (!_.isNil(this.$refs.yesNoDialogStatusuebergang)) this.$refs.yesNoDialogStatusuebergang.resetTextarea();
    this.anmerkung = "";
  }

  private yesNoDialogAbfragevarianteYes(): void {
    this.removeAbfragevarianteFromAbfrage();
    this.yesNoDialogAbfragevarianteNo();
  }

  private yesNoDialogAbfragevarianteNo(): void {
    this.isDeleteDialogAbfragevarianteOpen = false;
  }

  private async deleteBauleitplanverfahren(): Promise<void> {
    await this.deleteById(this.abfrageId, true).then(() => {
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

  private async yesNoDialogRelevanteAbfragevarianteYes(): Promise<void> {
    if (this.relevanteAbfragevarianteToBeSet) {
      await this.setRelevanteAbfragevariante(null);
      await this.setRelevanteAbfragevariante(this.relevanteAbfragevarianteToBeSet);
    }
    this.yesNoDialogRelevanteAbfragevarianteNo();
  }

  private yesNoDialogRelevanteAbfragevarianteNo(): void {
    this.isRelevanteAbfragevarianteDialogOpen = false;
  }

  private async saveAbfrage(): Promise<void> {
    if (this.validate()) {
      const validationMessage: string | null = this.findFaultInAbfrageForSave(this.abfrage);
      if (_.isNil(validationMessage)) {
        if (this.modeAbfrage === DisplayMode.NEU) {
          this.handleSave(this.abfrage);
        } else if (this.isEditableByAbfrageerstellung()) {
          this.handlePatchAngelegt(this.abfrage);
        } else if (this.isEditableBySachbearbeitung()) {
          this.handlePatchInBearbeitungSachbearbeitung(this.abfrage);
        } else if (this.isEditableByBedarfsmeldung()) {
          this.handlePatchInBearbeitungFachreferat(this.abfrage);
        } else if (this.isBedarfsmeldungEditableByAbfrageerstellung()) {
          this.handlePatchBedarfsmeldungErfolgt(this.abfrage);
        }
      } else {
        this.showWarningInInformationList(validationMessage);
      }
    } else {
      this.showWarningInInformationList("Es gibt noch Validierungsfehler");
    }
  }

  private async handleSave(
    model: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ): Promise<void> {
    let abfrageAngelegtDto:
      | BauleitplanverfahrenAngelegtDto
      | BaugenehmigungsverfahrenAngelegtDto
      | WeiteresVerfahrenAngelegtDto
      | undefined = undefined;
    if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      abfrageAngelegtDto = mapToBauleitplanverfahrenAngelegt(model);
    } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      abfrageAngelegtDto = mapToBaugenehmigungsverfahrenAngelegt(model);
    } else {
      abfrageAngelegtDto = mapToWeiteresVerfahrenAngelegt(model);
    }
    await this.save(abfrageAngelegtDto, true).then((dto) => {
      this.handleSuccess(dto, true);
    });
  }

  private async handlePatchAngelegt(
    model: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ): Promise<void> {
    let abfrageAngelegtDto:
      | BauleitplanverfahrenAngelegtDto
      | BaugenehmigungsverfahrenAngelegtDto
      | WeiteresVerfahrenAngelegtDto
      | undefined = undefined;
    if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      abfrageAngelegtDto = mapToBauleitplanverfahrenAngelegt(model);
    } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      abfrageAngelegtDto = mapToBaugenehmigungsverfahrenAngelegt(model);
    } else {
      abfrageAngelegtDto = mapToWeiteresVerfahrenAngelegt(model);
    }
    await this.patchAngelegt(abfrageAngelegtDto, this.abfrage.id as string, true).then((dto) => {
      this.handleSuccess(dto, true);
    });
  }

  private async handlePatchInBearbeitungSachbearbeitung(
    model: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ): Promise<void> {
    let abfrageInBearbeitungSachbearbeitungDto:
      | BauleitplanverfahrenInBearbeitungSachbearbeitungDto
      | BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
      | WeiteresVerfahrenInBearbeitungSachbearbeitungDto
      | undefined = undefined;
    if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      abfrageInBearbeitungSachbearbeitungDto = mapToBauleitplanverfahrenInBearbeitungSachbearbeitungDto(model);
    } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      abfrageInBearbeitungSachbearbeitungDto = mapToBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto(model);
    } else {
      abfrageInBearbeitungSachbearbeitungDto = mapToWeiteresVerfahrenInBearbeitungSachbearbeitungDto(model);
    }
    await this.patchInBearbeitungSachbearbeitung(
      abfrageInBearbeitungSachbearbeitungDto,
      this.abfrage.id as string,
      true,
    ).then((dto) => {
      this.handleSuccess(dto, true);
    });
  }

  private async handlePatchInBearbeitungFachreferat(
    model: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ): Promise<void> {
    let abfrageInBearbeitungFachreferatDto:
      | BauleitplanverfahrenInBearbeitungFachreferatDto
      | BaugenehmigungsverfahrenInBearbeitungFachreferatDto
      | WeiteresVerfahrenInBearbeitungFachreferatDto
      | undefined = undefined;
    if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      abfrageInBearbeitungFachreferatDto = mapToBauleitplanverfahrenInBearbeitungFachreferatDto(model);
    } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      abfrageInBearbeitungFachreferatDto = mapToBaugenehmigungsverfahrenInBearbeitungFachreferatDto(model);
    } else {
      abfrageInBearbeitungFachreferatDto = mapToWeiteresVerfahrenInBearbeitungFachreferatDto(model);
    }
    await this.patchInBearbeitungFachreferat(abfrageInBearbeitungFachreferatDto, this.abfrage.id as string, true).then(
      (dto) => {
        this.handleSuccess(dto, true);
      },
    );
  }

  private async handlePatchBedarfsmeldungErfolgt(
    model: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ): Promise<void> {
    let abfrageBedarfsmeldungErfolgtDto:
      | BauleitplanverfahrenBedarfsmeldungErfolgtDto
      | BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto
      | WeiteresVerfahrenBedarfsmeldungErfolgtDto
      | undefined = undefined;
    if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      abfrageBedarfsmeldungErfolgtDto = mapToBauleitplanverfahrenBedarfsmeldungErfolgtDto(model);
    } else if (model.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      abfrageBedarfsmeldungErfolgtDto = mapToBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto(model);
    } else {
      abfrageBedarfsmeldungErfolgtDto = mapToWeiteresVerfahrenBedarfsmeldungErfolgtDto(model);
    }
    await this.patchBedarfsmeldungErfolgt(abfrageBedarfsmeldungErfolgtDto, this.abfrage.id as string, true).then(
      (dto) => {
        this.handleSuccess(dto, true);
      },
    );
  }

  private handleSuccess(dto: BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto, showToast: boolean): void {
    if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      this.saveAbfrageInStore(new BauleitplanverfahrenModel(dto));
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      this.saveAbfrageInStore(new BaugenehmigungsverfahrenModel(dto));
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
      this.saveAbfrageInStore(new WeiteresVerfahrenModel(dto));
    }
    if (this.isNewAbfrage()) {
      this.$router.push({ path: "/" });
      Toaster.toast(`Die Abfrage wurde erfolgreich gespeichert`, Levels.SUCCESS);
    } else {
      if (showToast) Toaster.toast(`Die Abfrage wurde erfolgreich aktualisiert`, Levels.SUCCESS);
    }
  }

  private async startStatusUebergang(transition: TransitionDto) {
    if (!this.isFormDirty()) {
      let toastMessage = "Die Abfrage hatte einen erfolgreichen Statuswechsel";
      if (transition.url === this.TRANSITION_URL_ERLEDIGT_OHNE_FACHREFERAT) {
        toastMessage = "Die Abfrage wird ohne Einbindung der Fachreferate abgeschlossen";
      }
      const validationMessage: string | null = this.findFaultInAbfrageForSave(this.abfrage);
      if (_.isNil(validationMessage)) {
        const response = await this.statusUebergangRequest(transition, this.abfrageId, this.anmerkung);
        if (response.ok) {
          if (!(transition.url === "in-bearbeitung-setzen")) {
            this.returnToUebersicht(toastMessage, Levels.SUCCESS);
          } else {
            this.setSelectedAbfrageInStore();
            this.getTransitions(this.abfrageId, true).then((response) => {
              this.possibleTransitions = response;
            });
          }
        }
      } else {
        this.showWarningInInformationList(validationMessage);
      }
    } else {
      this.showWarningInInformationList("Bitte speichern vor einem Statusübergang");
    }
  }

  private async setRelevanteAbfragevariante(
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenModel
      | AbfragevarianteBaugenehmigungsverfahrenModel
      | AbfragevarianteWeiteresVerfahrenModel
      | null,
  ): Promise<void> {
    if (_.isNil(abfragevariante)) {
      const bauvorhabenId = this.abfrage.bauvorhaben;
      if (bauvorhabenId) {
        const bauvorhaben = await this.getBauvorhabenById(bauvorhabenId, false);
        const relevanteAbfragevariante = bauvorhaben.relevanteAbfragevariante;
        if (relevanteAbfragevariante) {
          await this.changeRelevanteAbfragevariante(relevanteAbfragevariante, true);
        }
      }
      return;
    }

    if (abfragevariante.id) {
      await this.changeRelevanteAbfragevariante(abfragevariante.id, true).then((result) => {
        if (typeof result !== "string") {
          const relevanteId = result.relevanteAbfragevariante;
          this.relevanteAbfragevarianteId = relevanteId ?? null;
          Toaster.toast(
            `Die Abfragevariante ${abfragevariante.name} in Abfrage ${this.abfrage.displayName} ist nun ${
              relevanteId ? "relevant" : "nicht mehr relevant"
            }.`,
            Levels.SUCCESS,
          );
        } else {
          this.relevanteAbfragevarianteToBeSet = abfragevariante;
          if (
            result ===
            "Die Abfrage ist keinem Bauvorhaben zugeordnet. Somit kann keine Abfragevariante als relevant markiert werden."
          ) {
            this.relevanteAbfragevarianteDialogText = result;
            this.relevanteAbfragevarianteYesButtonText = "Ok";
          } else {
            this.relevanteAbfragevarianteDialogText = result + " " + this.RELEVANTE_ABFRAGEVARIANTE_DIALOG_TEXT_BASE;
            this.relevanteAbfragevarianteYesButtonText = "Überschreiben";
          }
          this.isRelevanteAbfragevarianteDialogOpen = true;
        }
      });
    } else {
      this.showWarningInInformationList("Vor Relevantsetzung einer Abfragevariante ist die Abfrage zu speichern.");
    }
  }

  private saveAbfrageInStore(
    abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ) {
    this.$store.commit("search/selectedAbfrage", _.cloneDeep(abfrage));
  }

  private isBauleitplanverfahrenFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAULEITPLANVERFAHREN;
  }

  private isBaugenehmigungsverfahrenFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAUGENEHMIGUNGSVERFAHREN;
  }

  private isWeiteresVerfahrenFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.WEITERES_VERFAHREN;
  }

  private isAbfragevarianteBauleitplanverfahrenFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.ABFRAGEVARIANTE_BAULEITPLANVERFAHREN;
  }

  private isAbfragevarianteBaugenehmigungsverfahrenFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.ABFRAGEVARIANTE_BAUGENEHMIGUNGSVERFAHREN;
  }

  private isAbfragevarianteWeiteresVerfahrenFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.ABFRAGEVARIANTE_WEITERES_VERFAHREN;
  }

  private isBauabschnittFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAUABSCHNITT;
  }

  private isBaugebietBauleitplanverfahrenFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAUGEBIET_BAULEITPLANVERFAHREN;
  }

  private isBaugebietBaugenehmigungsverfahrenFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAUGEBIET_BAUGENEHMIGUNGSVERFAHREN;
  }

  private isBaugebietWeiteresVerfahrenFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAUGEBIET_WEITERES_VERFAHREN;
  }

  private isBaurateFormularOpen(): boolean {
    return this.openForm === AbfrageFormType.BAURATE;
  }

  private isNewAbfrage(): boolean {
    return this.$route.params.id === undefined;
  }

  private isAngelegt(): boolean {
    return this.abfrage.statusAbfrage == StatusAbfrage.Angelegt;
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
    const abfragevariante = this.createAbfragevarianteModel();
    if (!_.isNil(abfragevariante)) {
      if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
        (this.abfrage as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren?.push(abfragevariante);
        this.renumberingAbfragevarianten(
          (this.abfrage as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren,
        );
      } else if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
        (this.abfrage as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren?.push(abfragevariante);
        this.renumberingAbfragevarianten(
          (this.abfrage as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren,
        );
      } else {
        (this.abfrage as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren?.push(abfragevariante);
        this.renumberingAbfragevarianten((this.abfrage as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren);
      }
      this.formChanged();
      this.selectCreatedEntity(
        abfragevariante,
        this.getAbfrageFormTypeAbfragevariante(abfragevariante),
        parent,
        AnzeigeContextAbfragevariante.ABFRAGEVARIANTE,
      );
    }
  }

  private handleCreateAbfragevarianteSachbearbeitung(parent: AbfrageTreeItem): void {
    const abfragevariante = this.createAbfragevarianteModel();
    if (!_.isNil(abfragevariante)) {
      if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
        (this.abfrage as BauleitplanverfahrenModel).abfragevariantenSachbearbeitungBauleitplanverfahren?.push(
          abfragevariante,
        );
        this.renumberingAbfragevarianten(
          (this.abfrage as BauleitplanverfahrenModel).abfragevariantenSachbearbeitungBauleitplanverfahren,
        );
      } else if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
        (this.abfrage as BaugenehmigungsverfahrenModel).abfragevariantenSachbearbeitungBaugenehmigungsverfahren?.push(
          abfragevariante,
        );
        this.renumberingAbfragevarianten(
          (this.abfrage as BaugenehmigungsverfahrenModel).abfragevariantenSachbearbeitungBaugenehmigungsverfahren,
        );
      } else {
        (this.abfrage as WeiteresVerfahrenModel).abfragevariantenSachbearbeitungWeiteresVerfahren?.push(
          abfragevariante,
        );
        this.renumberingAbfragevarianten(
          (this.abfrage as WeiteresVerfahrenModel).abfragevariantenSachbearbeitungWeiteresVerfahren,
        );
      }
      this.formChanged();
      this.selectCreatedEntity(
        abfragevariante,
        this.getAbfrageFormTypeAbfragevariante(abfragevariante),
        parent,
        AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG,
      );
    }
  }

  private getAbfrageFormTypeAbfragevariante(
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenModel
      | AbfragevarianteBaugenehmigungsverfahrenModel
      | AbfragevarianteWeiteresVerfahrenModel,
  ): AbfrageFormType {
    if (
      abfragevariante.artAbfragevariante ===
      AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren
    ) {
      return AbfrageFormType.ABFRAGEVARIANTE_BAULEITPLANVERFAHREN;
    } else if (
      abfragevariante.artAbfragevariante ===
      AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum.Baugenehmigungsverfahren
    ) {
      return AbfrageFormType.ABFRAGEVARIANTE_BAUGENEHMIGUNGSVERFAHREN;
    } else {
      return AbfrageFormType.ABFRAGEVARIANTE_WEITERES_VERFAHREN;
    }
  }

  private createAbfragevarianteModel():
    | AbfragevarianteBauleitplanverfahrenModel
    | AbfragevarianteBaugenehmigungsverfahrenModel
    | AbfragevarianteWeiteresVerfahrenModel
    | undefined {
    if (this.isBauleitplanverfahren()) {
      return new AbfragevarianteBauleitplanverfahrenModel(createAbfragevarianteBauleitplanverfahrenDto());
    } else if (this.isBaugenehmigungsverfahren()) {
      return new AbfragevarianteBaugenehmigungsverfahrenModel(createAbfragevarianteBaugenehmigungsverfahrenDto());
    } else if (this.isWeiteresVerfahren()) {
      return new AbfragevarianteWeiteresVerfahrenModel(createAbfragevarianteWeiteresVerfahrenDto());
    } else {
      return undefined;
    }
  }

  private handleCreateBauabschnitt(parent: AbfrageTreeItem): void {
    const abfragevariante = parent.value;
    if (
      this.isAbfragevarianteBauleitplanverfahren(parent, abfragevariante) ||
      this.isAbfragevarianteBaugenehmigungsverfahren(parent, abfragevariante) ||
      this.isAbfragevarianteWeiteresVerfahren(parent, abfragevariante)
    ) {
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
    if (
      this.isAbfragevarianteBauleitplanverfahren(parent, parent.value) ||
      this.isAbfragevarianteBaugenehmigungsverfahren(parent, parent.value) ||
      this.isAbfragevarianteWeiteresVerfahren(parent, parent.value)
    ) {
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
      this.selectCreatedEntity(baugebiet, this.getAbfrageFormTypeBaugebiet(abfragevariante), parent, parent.context);
    }
  }

  private getAbfrageFormTypeBaugebiet(
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenModel
      | AbfragevarianteBaugenehmigungsverfahrenModel
      | AbfragevarianteWeiteresVerfahrenModel,
  ): AbfrageFormType {
    if (
      abfragevariante.artAbfragevariante ===
      AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren
    ) {
      return AbfrageFormType.BAUGEBIET_BAULEITPLANVERFAHREN;
    } else if (
      abfragevariante.artAbfragevariante ===
      AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum.Baugenehmigungsverfahren
    ) {
      return AbfrageFormType.BAUGEBIET_BAUGENEHMIGUNGSVERFAHREN;
    } else {
      return AbfrageFormType.BAUGEBIET_WEITERES_VERFAHREN;
    }
  }

  private handleCreateBaurate(parent: AbfrageTreeItem): void {
    let baugebiet: BaugebietModel | undefined;
    if (
      this.isAbfragevarianteBauleitplanverfahren(parent, parent.value) ||
      this.isAbfragevarianteBaugenehmigungsverfahren(parent, parent.value) ||
      this.isAbfragevarianteWeiteresVerfahren(parent, parent.value)
    ) {
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
    if (
      this.treeItemToDelete &&
      (this.isAbfragevarianteBauleitplanverfahren(this.treeItemToDelete, this.treeItemToDelete.value) ||
        this.isAbfragevarianteBaugenehmigungsverfahren(this.treeItemToDelete, this.treeItemToDelete.value) ||
        this.isAbfragevarianteWeiteresVerfahren(this.treeItemToDelete, this.treeItemToDelete.value))
    ) {
      const context = this.treeItemToDelete.context;

      let abfragevarianten = undefined;
      if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
        abfragevarianten = (this.abfrage as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren;
      } else if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
        abfragevarianten = (this.abfrage as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren;
      } else {
        abfragevarianten = (this.abfrage as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren;
      }

      let abfragevariantenSachbearbeitung = undefined;
      if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
        abfragevariantenSachbearbeitung = (this.abfrage as BauleitplanverfahrenModel)
          .abfragevariantenSachbearbeitungBauleitplanverfahren;
      } else if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
        abfragevariantenSachbearbeitung = (this.abfrage as BaugenehmigungsverfahrenModel)
          .abfragevariantenSachbearbeitungBaugenehmigungsverfahren;
      } else {
        abfragevariantenSachbearbeitung = (this.abfrage as WeiteresVerfahrenModel)
          .abfragevariantenSachbearbeitungWeiteresVerfahren;
      }

      let abfragevariantenContext =
        context === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE
          ? abfragevarianten!
          : abfragevariantenSachbearbeitung!;
      _.remove(abfragevariantenContext, (abfragevariante) => abfragevariante === this.treeItemToDelete!.value);
      // Ersetzt das Array-Objekt, um eine Aktualisierung hervorzurufen.
      if (this.anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
        if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
          (this.abfrage as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren = [
            ...abfragevariantenContext,
          ];
        } else if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
          (this.abfrage as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren = [
            ...abfragevariantenContext,
          ];
        } else {
          (this.abfrage as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren = [...abfragevariantenContext];
        }
      } else {
        if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
          (this.abfrage as BauleitplanverfahrenModel).abfragevariantenSachbearbeitungBauleitplanverfahren = [
            ...abfragevariantenContext,
          ];
        } else if (this.abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
          (this.abfrage as BaugenehmigungsverfahrenModel).abfragevariantenSachbearbeitungBaugenehmigungsverfahren = [
            ...abfragevariantenContext,
          ];
        } else {
          (this.abfrage as WeiteresVerfahrenModel).abfragevariantenSachbearbeitungWeiteresVerfahren = [
            ...abfragevariantenContext,
          ];
        }
      }
      this.renumberingAbfragevarianten(abfragevariantenContext);
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
    if (
      this.isAbfragevarianteBauleitplanverfahren(item, abfragevariante) ||
      this.isAbfragevarianteBaugenehmigungsverfahren(item, abfragevariante) ||
      this.isAbfragevarianteWeiteresVerfahren(item, abfragevariante)
    ) {
      await this.setRelevanteAbfragevariante(abfragevariante);
    }
  }

  private handleDetermineBauratenForAbfragevariante(item: AbfrageTreeItem): void {
    const abfragevariante = item.value;

    if (
      this.isAbfragevarianteBauleitplanverfahren(item, abfragevariante) ||
      this.isAbfragevarianteBaugenehmigungsverfahren(item, abfragevariante) ||
      this.isAbfragevarianteWeiteresVerfahren(item, abfragevariante)
    ) {
      this.determineBauraten(
        abfragevariante.realisierungVon!,
        abfragevariante.weGesamt,
        abfragevariante.gfWohnenGesamt,
        true,
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
      this.determineBauraten(baugebiet.realisierungVon, baugebiet.weGeplant, baugebiet.gfWohnenGeplant, true).then(
        (bauraten: Array<BaurateDto>) => {
          baugebiet.bauraten = bauraten.map((baurate: BaurateDto) => new BaurateModel(baurate));
          this.formChanged();
        },
      );
    }
  }

  /* Diese "Ancestor"-Methoden sind prinzipiell dafür da, einen Vorfahren von einem bestimmten Typ zu finden.
   * Jedoch können sie auch das übergebene Item selbst zurückgeben, wenn es dem Typen entspricht.
   */

  private getFirstAncestorOfTypeAbfragevariante(
    item: AbfrageTreeItem,
  ): AbfragevarianteBauleitplanverfahrenModel | AbfragevarianteBaugenehmigungsverfahrenModel | undefined {
    while (item.parent) {
      if (
        this.isAbfragevarianteBauleitplanverfahren(item, item.value) ||
        this.isAbfragevarianteBaugenehmigungsverfahren(item, item.value) ||
        this.isAbfragevarianteWeiteresVerfahren(item, item.value)
      ) {
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
      if (
        this.isAbfragevarianteBauleitplanverfahren(parent, parent.value) ||
        this.isAbfragevarianteBaugenehmigungsverfahren(parent, parent.value) ||
        this.isAbfragevarianteWeiteresVerfahren(parent, parent.value)
      ) {
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
      if (
        this.isAbfragevarianteBauleitplanverfahren(parent, parent.value) ||
        this.isAbfragevarianteBaugenehmigungsverfahren(parent, parent.value) ||
        this.isAbfragevarianteWeiteresVerfahren(parent, parent.value)
      ) {
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

  private renumberingAbfragevarianten(
    abfragevarianten:
      | Array<AbfragevarianteBauleitplanverfahrenDto>
      | Array<AbfragevarianteBaugenehmigungsverfahrenDto>
      | Array<AbfragevarianteWeiteresVerfahrenDto>
      | undefined,
  ): void {
    abfragevarianten?.forEach((value, index) => {
      value.abfragevariantenNr = index + 1;
    });
  }

  private selectAbfrage(): void {
    if (this.isBauleitplanverfahren()) {
      this.selectEntity(
        this.abfrage,
        AbfrageFormType.BAULEITPLANVERFAHREN,
        "",
        AnzeigeContextAbfragevariante.UNDEFINED,
      );
    } else if (this.isBaugenehmigungsverfahren()) {
      this.selectEntity(
        this.abfrage,
        AbfrageFormType.BAUGENEHMIGUNGSVERFAHREN,
        "",
        AnzeigeContextAbfragevariante.UNDEFINED,
      );
    } else if (this.isWeiteresVerfahren()) {
      this.selectEntity(this.abfrage, AbfrageFormType.WEITERES_VERFAHREN, "", AnzeigeContextAbfragevariante.UNDEFINED);
    }
  }

  private selectItem(item: AbfrageTreeItem): void {
    this.selectEntity(item.value, item.type, item.id, item.context);
  }

  private selectCreatedEntity(
    entity: AbfrageDtoWithForm,
    type: AbfrageFormType,
    parent: AbfrageTreeItem,
    context: AnzeigeContextAbfragevariante,
  ): void {
    // Da das TreeItem zu diesem Zeitpunkt noch nicht existiert, muss die ID "vorhergesagt" werden.
    this.selectEntity(entity, type, generateTreeItemId(parent.id, parent.children.length), context);
  }

  private selectEntity(
    entity: AbfrageDtoWithForm,
    type: AbfrageFormType,
    itemId: string,
    context: AnzeigeContextAbfragevariante,
  ): void {
    this.anzeigeContextAbfragevariante = context;
    this.selected = entity;
    this.openForm = type;
    this.selectedTreeItemId = itemId;
  }

  private isAbfragevarianteBauleitplanverfahren(
    item: AbfrageTreeItem,
    value: AbfrageDtoWithForm,
  ): value is AbfragevarianteBauleitplanverfahrenModel {
    return item.type === AbfrageFormType.ABFRAGEVARIANTE_BAULEITPLANVERFAHREN;
  }

  private isAbfragevarianteBaugenehmigungsverfahren(
    item: AbfrageTreeItem,
    value: AbfrageDtoWithForm,
  ): value is AbfragevarianteBaugenehmigungsverfahrenModel {
    return item.type === AbfrageFormType.ABFRAGEVARIANTE_BAUGENEHMIGUNGSVERFAHREN;
  }

  private isAbfragevarianteWeiteresVerfahren(
    item: AbfrageTreeItem,
    value: AbfrageDtoWithForm,
  ): value is AbfragevarianteWeiteresVerfahrenModel {
    return item.type === AbfrageFormType.ABFRAGEVARIANTE_WEITERES_VERFAHREN;
  }

  private isBauabschnitt(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is BauabschnittModel {
    return item.type === AbfrageFormType.BAUABSCHNITT;
  }

  private isBaugebiet(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is BaugebietModel {
    return (
      item.type === AbfrageFormType.BAUGEBIET_BAULEITPLANVERFAHREN ||
      item.type === AbfrageFormType.BAUGEBIET_BAUGENEHMIGUNGSVERFAHREN ||
      item.type === AbfrageFormType.BAUGEBIET_WEITERES_VERFAHREN
    );
  }

  private isBaurate(item: AbfrageTreeItem, value: AbfrageDtoWithForm): value is BaurateModel {
    return item.type === AbfrageFormType.BAURATE;
  }

  /**
   * Ermittelt oder erstellt bei Bedarf einen Platzhalter-Bauabschnitt für "alleinstehende" Baugebiete und -raten.
   */
  private getTechnicalBauabschnitt(
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenModel
      | AbfragevarianteBaugenehmigungsverfahrenModel
      | AbfragevarianteWeiteresVerfahrenModel,
  ): BauabschnittModel | undefined {
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
  private getTechnicalBaugebiet(
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenModel
      | AbfragevarianteBaugenehmigungsverfahrenModel
      | AbfragevarianteWeiteresVerfahrenModel,
  ): BaugebietModel | undefined {
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
  private clearTechnicalEntities(
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenModel
      | AbfragevarianteBaugenehmigungsverfahrenModel
      | AbfragevarianteWeiteresVerfahrenModel,
  ): void {
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
