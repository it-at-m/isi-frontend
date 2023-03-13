<template>
  <v-form ref="form">
    <DefaultLayout solid-heading>
      <template #content>
        <div v-if="step === 1">
          <infrastrukturabfrageComponent
            id="abfrage_infrastrukturabfrage_component"
            v-model="abfrage"
          />
        </div>
        <abfragevarianten
          v-if="step === 2"
          id="abfrage_abfragevarianten"
          ref="abfragevarianten"
          v-model="abfrage.abfragevarianten"
          :sobon-relevant="abfrage.sobonRelevant"
        />
        <bauraten-component
          v-if="step === 3"
          id="abfrage_bauraten"
          ref="bauratenComponent"
          v-model="baurate"
        />
        <yes-no-dialog
          id="abfrage_yes_no_dialog_loeschen"
          v-model="deleteDialogOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          dialogtext="Hiermit werden die Abfrage und alle dazugehörigen Abfragevarianten unwiderruflich gelöscht."
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogNo"
          @yes="yesNoDialogYes"
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
        <v-spacer />
        <abfrage-navigation-tree />
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
          v-if="!isNewAbfrage() || step !== 1"
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
    </DefaultLayout>
  </v-form>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Mixins, Watch} from "vue-property-decorator";
import InfrastrukturabfrageComponent from "@/components/abfragen/InfrastrukturabfrageComponent.vue";
import Abfragevarianten from "@/components/abfragevarianten/Abfragevarianten.vue";
import BauratenComponent from "@/components/bauraten/BauratenComponent.vue";
import Toaster from "../components/common/toaster.type";
import {createBaurate, createInfrastrukturabfrageDto,} from "@/utils/Factories";
import AbfrageApiRequestMixin from "@/mixins/requests/AbfrageApiRequestMixin";
import FreigabeApiRequestMixin from "@/mixins/requests/FreigabeApiRequestMixin";
import BaurateReqestMixin from "@/mixins/requests/BauratenApiRequestMixin";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import {AbfrageListElementDtoStatusAbfrageEnum, InfrastrukturabfrageDto} from "@/api/api-client/isi-backend";
import DefaultLayout from "@/components/DefaultLayout.vue";
import _ from "lodash";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import InformationList from "@/components/common/InformationList.vue";
import {Levels} from "@/api/error";
import DisplayMode from "@/types/common/DisplayMode";
import {containsNotAllowedDokument} from "@/utils/DokumenteUtil";
import AbfrageNavigationTree from "@/components/abfragen/AbfrageNavigationTree.vue";

@Component({
  methods: {containsNotAllowedDokument},
  components: {
    AbfrageNavigationTree,
    InformationList,
    InfrastrukturabfrageComponent,
    Abfragevarianten,
    YesNoDialog,
    DefaultLayout,
    BauratenComponent,
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
  private mode = DisplayMode.UNDEFINED;

  private buttonText = "";

  private abfrage: InfrastrukturabfrageModel = new InfrastrukturabfrageModel(
      createInfrastrukturabfrageDto()
  );

  private baurate: BaurateModel = new BaurateModel(createBaurate());

  private abfrageId: string = this.$route.params.id;

  private deleteDialogOpen = false;

  private freigabeDialogOpen = false;

  private step = 1;

  mounted(): void {
    this.mode = this.isNewAbfrage() ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    this.buttonText = this.isNewAbfrage()
        ? "Entwurf Speichern"
        : "Aktualisieren";
    this.getAbfrageById();
  }

  @Watch("$store.state.search.selectedAbfrage", {immediate: true, deep: true})
  private selectedAbfrageChanged() {
    const abfrageFromStore = this.$store.getters["search/selectedAbfrage"];
    if (!_.isNil(abfrageFromStore)) {
      this.abfrage = _.cloneDeep(abfrageFromStore);
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
      this.$store.commit(
          "search/selectedAbfrage",
          new InfrastrukturabfrageModel(createInfrastrukturabfrageDto())
      );
    }
  }

  private deleteAbfrage(): void {
    this.deleteDialogOpen = true;
  }

  private freigabeAbfrage(): void {
    this.freigabeDialogOpen = true;
  }

  private async yesNoDialogYes(): Promise<void> {
    this.deleteInfrastrukturabfrage();
    this.yesNoDialogNo();
  }

  private yesNoDialogNo(): void {
    this.deleteDialogOpen = false;
  }

  private async yesNoDialogFreigabeYes(): Promise<void> {
    this.abfrageFreigeben();
    this.yesNoDialogNo();
  }

  private async yesNoDialogFreigabeNo(): Promise<void> {
    this.freigabeDialogOpen = false;
  }

  private async deleteInfrastrukturabfrage(): Promise<void> {
    await this.deleteInfrastrukturabfrageById(this.abfrageId, true)
        .then(() => {
          this.returnToUebersicht(
              "Die Abfrage wurde erfolgreich gelöscht",
              Levels.SUCCESS
          );
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
    const validationMessage: string | null =
        this.findFaultInInfrastrukturabfrageForSave(this.abfrage);
    if (_.isNil(validationMessage)) {
      if (this.mode === DisplayMode.NEU) {
        await this.createInfrastrukturabfrage(this.abfrage, true)
            .then((dto) => {
              this.handleSuccess(dto);
            });
      } else {
        await this.updateInfrastrukturabfrage(this.abfrage, true)
            .then((dto) => {
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
      this.$router.push({path: "/abfragenuebersicht"});
      Toaster.toast(`Die Abfrage wurde erfolgreich gespeichert`, Levels.SUCCESS);
    } else {
      Toaster.toast(`Die Abfrage wurde erfolgreich aktualisiert`, Levels.SUCCESS);
    }
  }

  private saveAbfrageInStore(abfrage: InfrastrukturabfrageModel) {
    this.$store.commit("search/selectedAbfrage", _.cloneDeep(abfrage));
  }

  private async abfrageFreigeben(): Promise<void> {
    if (this.validate()) {
      if (
          this.abfrage.abfrage.statusAbfrage ==
          AbfrageListElementDtoStatusAbfrageEnum.Angelegt
      ) {
        this.infrastrukturabfrageFreigeben();
      } else {
        this.showWarningInInformationList(
            'Die Abfrage muss den Status "angelegt" besitzen'
        );
      }
    } else {
      this.showWarningInInformationList("Es gibt noch Validierungsfehler");
    }
  }

  private async infrastrukturabfrageFreigeben(): Promise<void> {
    const validationMessage: string | null =
        this.findFaultInInfrastrukturabfrageForSave(this.abfrage);
    if (_.isNil(validationMessage)) {
      await this.updateInfrastrukturabfrage(this.abfrage, true);
      this.freigabInfrastrukturabfrage(this.abfrage.id as string, true)
          .then(
              () => {
                this.returnToUebersicht(
                    "Die Abfrage wurde erfolgreich freigegeben",
                    Levels.SUCCESS
                );
              }
          );
    } else {
      this.showWarningInInformationList(validationMessage);
    }
  }

  private isNewAbfrage(): boolean {
    return this.$route.params.id === undefined;
  }

  private isAngelegt(): boolean {
    return (
        this.abfrage.abfrage.statusAbfrage ==
        AbfrageListElementDtoStatusAbfrageEnum.Angelegt
    );
  }

  private changeForward(): void {
    if (this.validate()) {
      let validationMessage: string | null = null;

      if (this.step === 1) {
        validationMessage = this.findFaultInInfrastrukturabfrage(this.abfrage);
      }

      if (this.step === 2) {
        validationMessage = this.findFaultInAbfragevarianten(this.abfrage);
      }

      if (_.isNil(validationMessage) && this.step < 3) {
        this.step++;
        this.$store.dispatch("information/overwriteInformationList", []);
      } else if (_.isString(validationMessage)) {
        this.showWarningInInformationList(validationMessage);
      }
    } else {
      this.showWarningInInformationList("Es gibt noch Validierungsfehler");
    }
  }

  private changeBackwards(): void {
    if (this.validate()) {
      let validationMessage: string | null = null;

      if (this.step === 1) {
        validationMessage = this.findFaultInInfrastrukturabfrage(this.abfrage);
      }

      if (_.isNil(validationMessage) && this.step > 1) {
        this.step--;
        this.$store.dispatch("information/overwriteInformationList", []);
      } else if (_.isString(validationMessage)) {
        this.showWarningInInformationList(validationMessage);
      }
    } else {
      this.showWarningInInformationList("Es gibt noch Validierungsfehler");
    }
  }

  private returnToUebersicht(message?: string, level?: Levels): void {
    if (message && level) {
      Toaster.toast(message, level);
    }

    this.$store.dispatch("search/resetAbfrage");
    this.$router.push({path: "/abfragenuebersicht"});
  }

  private validate(): boolean {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }
}
</script>

<style></style>