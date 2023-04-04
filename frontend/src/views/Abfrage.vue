<template>
  <v-form ref="form">
    <default-layout solid-heading>
      <template #content>
        <div v-if="openAbfrageFormular">
          <infrastrukturabfrage-component
            id="abfrage_infrastrukturabfrage_component"
            v-model="abfrageWrapped.infrastrukturabfrage"
            :mode="modeAbfrage"
          />
        </div>
        <abfragevariante-formular
          v-if="openAbfragevariantenFormular"
          id="abfrage_abfragevariante_formular_component"
          v-model="selectedAbfragevariante"
          :mode="modeAbfragevariante"
          :sobon-relevant="abfrageWrapped.infrastrukturabfrage.sobonRelevant"
        />
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
          id="abfrage_yes_no_dialog_statusuebergang"
          v-model="statusUebergangDialog"
          icon="mdi-account-arrow-right"
          dialogtitle="Hinweis"
          dialogtext="Hiermit wird die Abfrage ihren Status ändern."
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
          id="abfrage_navidation_tree"
          v-model="abfrageWrapped"
          @select-abfrage="handleSelectAbfrage"
          @select-abfragevariante="handleSelectAbfragevariante"
          @delete-abfragevariante="handleDeleteAbfragevariante"
          @create-new-abfragevariante="handleCreateNewAbfragevariante"
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
import BauratenComponent from "@/components/bauraten/BauratenComponent.vue";
import Toaster from "../components/common/toaster.type";
import { createAbfragevarianteDto, createInfrastrukturabfrageDto } from "@/utils/Factories";
import AbfrageApiRequestMixin from "@/mixins/requests/AbfrageApiRequestMixin";
import StatusUebergangApiRequestMixin from "@/mixins/requests/StatusUebergangApiRequestMixin";
import BaurateReqestMixin from "@/mixins/requests/BauratenApiRequestMixin";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import {
  StatusAbfrage,
  AbfragevarianteDto,
  InfrastrukturabfrageDto,
  TransitionDto,
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
import InfrastrukturabfrageWrapperModel from "@/types/model/abfrage/InfrastrukturabfrageWrapperModel";
import TransitionApiRequestMixin from "@/mixins/requests/TransistionApiRequestMixin";

@Component({
  methods: { containsNotAllowedDokument },
  components: {
    AbfragevarianteFormular,
    AbfrageNavigationTree,
    InformationList,
    InfrastrukturabfrageComponent,
    YesNoDialog,
    DefaultLayout,
    BauratenComponent,
  },
})
export default class Abfrage extends Mixins(
  TransitionApiRequestMixin,
  FieldValidationRulesMixin,
  AbfrageApiRequestMixin,
  StatusUebergangApiRequestMixin,
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

  private abfrageId: string = this.$route.params.id;

  private transition: TransitionDto | undefined;

  private deleteDialogAbfrageOpen = false;

  private statusUebergangDialog = false;

  private deleteDialogAbfragevarianteOpen = false;

  private openAbfrageFormular = true;

  private openAbfragevariantenFormular = false;

  public possbileTransitions: Array<TransitionDto> = [];

  mounted(): void {
    this.modeAbfrage = this.isNewAbfrage() ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    this.buttonText = this.isNewAbfrage() ? "Entwurf Speichern" : "Aktualisieren";
    this.openAbfrageFormular = true;
    this.openAbfragevariantenFormular = false;
    this.getAbfrageById();

    if (!this.isNewAbfrage())
      this.getTransitions(this.abfrageId, true).then((response) => {
        this.possbileTransitions = response;
      });
  }

  @Watch("$store.state.search.selectedAbfrage", { immediate: true, deep: true })
  private selectedAbfrageChanged() {
    const abfrageFromStore = this.$store.getters["search/selectedAbfrage"];
    if (!_.isNil(abfrageFromStore)) {
      this.abfrageWrapped = new InfrastrukturabfrageWrapperModel(_.cloneDeep(abfrageFromStore), true);
      this.openAbfrageFormular = true;
      this.openAbfragevariantenFormular = false;
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

  private deleteAbfrage(): void {
    this.deleteDialogAbfrageOpen = true;
  }

  private statusUebergang(transition: TransitionDto): void {
    this.transition = transition;
    this.statusUebergangDialog = true;
  }

  private yesNoDialogAbfrageYes(): void {
    this.deleteInfrastrukturabfrage();
    this.yesNoDialogAbfrageNo();
  }

  private yesNoDialogAbfrageNo(): void {
    this.deleteDialogAbfrageOpen = false;
  }

  private yesNoDialogStatusUebergangYes(): void {
    if (!_.isNil(this.transition)) this.startStatusUebergang(this.transition);
    this.yesNoDialogStatusUebergangeNo();
  }

  private yesNoDialogStatusUebergangeNo(): void {
    this.statusUebergangDialog = false;
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
    this.openAbfrageFormular = true;
    this.openAbfragevariantenFormular = false;
  }

  private async startStatusUebergang(transition: TransitionDto) {
    const validationMessage: string | null = this.findFaultInInfrastrukturabfrageForSave(
      this.abfrageWrapped.infrastrukturabfrage
    );
    if (_.isNil(validationMessage)) {
      await this.updateInfrastrukturabfrage(this.abfrageWrapped.infrastrukturabfrage, true);
      const requestSuccessful = await this.statusUebergangRequest(transition, this.abfrageId);
      if (requestSuccessful) {
        if (!(transition.buttonName === "IN BEARBEITUNG SETZEN")) {
          this.returnToUebersicht("Die Abfrage hatte einen erfolgreichen Statuswechsel", Levels.SUCCESS);
        } else {
          this.getAbfrageById();
          this.getTransitions(this.abfrageId, true).then((response) => {
            this.possbileTransitions = response;
          });
        }

        this.openAbfrageFormular = true;
        this.openAbfragevariantenFormular = false;
      }
    } else {
      this.showWarningInInformationList(validationMessage);
    }
  }

  private saveAbfrageInStore(abfrage: InfrastrukturabfrageModel) {
    this.$store.commit("search/selectedAbfrage", _.cloneDeep(abfrage));
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
    this.openAbfrageFormular = true;
    this.openAbfragevariantenFormular = false;
  }

  private handleSelectAbfragevariante(abfrageTreeItem: AbfrageTreeItem): void {
    this.openAbfrageFormular = true;
    this.openAbfragevariantenFormular = false;
    this.selectedAbfragevariante = this.getSelectedAbfragevariante(abfrageTreeItem);
    this.$nextTick(() => {
      this.openAbfrageFormular = false;
      this.openAbfragevariantenFormular = true;
    });
  }

  private handleDeleteAbfragevariante(abfrageTreeItem: AbfrageTreeItem): void {
    this.selectedAbfragevariante = this.getSelectedAbfragevariante(abfrageTreeItem);
    this.openAbfrageFormular = false;
    this.openAbfragevariantenFormular = true;
    this.deleteDialogAbfragevarianteOpen = true;
  }

  private handleCreateNewAbfragevariante(): void {
    this.selectedAbfragevariante = new AbfragevarianteModel(createAbfragevarianteDto());
    this.abfrageWrapped.infrastrukturabfrage.abfragevarianten.push(this.selectedAbfragevariante);
    this.renumberingAbfragevarianten();
    this.formChanged();
    this.openAbfrageFormular = false;
    this.openAbfragevariantenFormular = true;
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

  private removeSelectedAbfragevarianteFromAbfrage(): void {
    const copyAbfragevarianten = _.cloneDeep(this.abfrageWrapped.infrastrukturabfrage.abfragevarianten);
    _.remove(copyAbfragevarianten, (abfragevariante) => _.isEqual(abfragevariante, this.selectedAbfragevariante));
    this.abfrageWrapped.infrastrukturabfrage.abfragevarianten = copyAbfragevarianten;
    this.renumberingAbfragevarianten();
    this.formChanged();
    this.openAbfragevariantenFormular = false;
    this.openAbfrageFormular = true;
  }

  private get modeAbfragevariante(): DisplayMode {
    return _.isNil(this.selectedAbfragevariante.id) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
  }

  private renumberingAbfragevarianten(): void {
    this.abfrageWrapped.infrastrukturabfrage.abfragevarianten.forEach((value, index) => {
      value.abfragevariantenNr = index + 1;
    });
  }
}
</script>

<style></style>
