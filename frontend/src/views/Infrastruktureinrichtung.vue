<template>
  <v-form ref="form">
    <default-layout solid-heading>
      <template #content>
        <infrastruktureinrichtung-typ-component
          id="infrastruktureinrichtung_infrastruktureinrichtungtyp_component"
          ref="infrastruktureinrichtungTypComponent"
          v-model="infrastruktureinrichtungTyp"
          :lfd-nr="lfdNr"
          :mode="mode"
        />
        <kinderkrippe-component
          v-if="isKinderkrippe"
          id="infrastruktureinrichtung_kinderkrippe_component"
          ref="kinderkrippeComponent"
          v-model="kinderkrippe"
          :mode="mode"
        />
        <kindergarten-component
          v-if="isKindergarten"
          id="infrastruktureinrichtung_kindergarten_component"
          ref="kindergartenComponent"
          v-model="kindergarten"
          :mode="mode"
        />
        <haus-fuer-kinder-component
          v-if="isHausFuerKinder"
          id="infrastruktureinrichtung_hausFuerKinder_component"
          ref="hausFuerKinderComponent"
          v-model="hausFuerKinder"
          :mode="mode"
        />
        <gs-nachmittag-betreuung-component
          v-if="isGsNachmittagBetreuung"
          id="infrastruktureinrichtung_gsNachmittagBetreuung_component"
          ref="gsNachmittagBetreuungComponent"
          v-model="gsNachmittagBetreuung"
          :mode="mode"
        />
        <grundschule-component
          v-if="isGrundschule"
          id="infrastruktureinrichtung_grundschule_component"
          ref="grundschuleComponent"
          v-model="grundschule"
          :mode="mode"
        />
        <mittelschule-component
          v-if="isMittelschule"
          id="infrastruktureinrichtung_mittelschule_component"
          ref="mittelschuleComponent"
          v-model="mittelschule"
          :mode="mode"
        />
        <yes-no-dialog
          id="infrastruktureinrichtung_yes_no_dialog_löschen"
          v-model="deleteDialogOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          dialogtext="Hiermit wird die Infrastruktureinrichtung unwiderruflich gelöscht."
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogNo"
          @yes="yesNoDialogYes"
        />
        <yes-no-dialog
          id="infrastruktureinrichtung_yes_no_dialog_save_leave"
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
                id="infrastruktureinrichtung_displayName"
                class="text-h6 font-weight-bold"
                v-text="infrastruktureinrichtungDisplayName"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template #information>
        <v-btn
          v-if="!isNewInfrastruktureinrichtung()"
          id="infrastruktureinrichtung_löschen_button"
          class="text-wrap my-4 px-1"
          color="primary"
          elevation="1"
          style="width: 200px"
          @click="deleteInfrastruktureinrichtung()"
          v-text="'Löschen'"
        />
        <information-list
          id="infrastruktureinrichtung_information_list"
          information-message-deletion-intervall-seconds="10"
        />
      </template>
      <template #action>
        <v-spacer />
        <v-btn
          id="infrastruktureinrichtung_speichern_button"
          class="text-wrap mt-2 px-1"
          color="secondary"
          elevation="1"
          :disabled="!isDirty()"
          style="width: 200px"
          @click="saveInfrastruktureinrichtung()"
          v-text="buttonText"
        />
        <v-btn
          id="infrastruktureinrichtung_abbrechen_button"
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
import Toaster from "../components/common/toaster.type";
import {
  createKinderkrippeDto,
  createKindergartenDto,
  createHausFuerKinderDto,
  createGsNachmittagBetreuungDto,
  createGrundschuleDto,
  createMittelschuleDto,
} from "@/utils/Factories";
import {
  KinderkrippeDto,
  KindergartenDto,
  HausFuerKinderDto,
  GsNachmittagBetreuungDto,
  GrundschuleDto,
  MittelschuleDto,
  InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum,
} from "@/api/api-client/isi-backend";
import KinderkrippeApiRequestMixin from "@/mixins/requests/infrastruktureinrichtung/KinderkrippeApiRequestMixin";
import KindergartenApiRequestMixin from "@/mixins/requests/infrastruktureinrichtung/KindergartenApiRequestMixin";
import HausFuerKinderApiRequestMixin from "@/mixins/requests/infrastruktureinrichtung/HausFuerKinderApiRequestMixin";
import GsNachmittagBetreuungApiRequestMixin from "@/mixins/requests/infrastruktureinrichtung/GsNachmittagBetreuungApiRequestMixin";
import GrundschuleApiRequestMixin from "@/mixins/requests/infrastruktureinrichtung/GrundschuleApiRequestMixin";
import MittelschuleApiRequestMixin from "@/mixins/requests/infrastruktureinrichtung//MittelschuleApiRequestMixin";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import GrundschuleModel from "@/types/model/infrastruktureinrichtung/GrundschuleModel";
import MittelschuleModel from "@/types/model/infrastruktureinrichtung/MittelschuleModel";
import DefaultLayout from "@/components/DefaultLayout.vue";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import InformationList from "@/components/common/InformationList.vue";
import { Levels } from "@/api/error";
import DisplayMode from "@/types/common/DisplayMode";
import InfrastruktureinrichtungTypComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungTypComponent.vue";
import KinderkrippeComponent from "@/components/infrastruktureinrichtung/KinderkrippeComponent.vue";
import KindergartenComponent from "@/components/infrastruktureinrichtung/KindergartenComponent.vue";
import HausFuerKinderComponent from "@/components/infrastruktureinrichtung/HausFuerKinderComponent.vue";
import GsNachmittagBetreuungComponent from "@/components/infrastruktureinrichtung/GsNachmittagBetreuungComponent.vue";
import GrundschuleComponent from "@/components/infrastruktureinrichtung/GrundschuleComponent.vue";
import MittelschuleComponent from "@/components/infrastruktureinrichtung/MittelschuleComponent.vue";
import _ from "lodash";

@Component({
  components: {
    InformationList,
    YesNoDialog,
    DefaultLayout,
    InfrastruktureinrichtungTypComponent,
    KinderkrippeComponent,
    KindergartenComponent,
    HausFuerKinderComponent,
    GsNachmittagBetreuungComponent,
    GrundschuleComponent,
    MittelschuleComponent,
  },
})
export default class Infrastruktureinrichtung extends Mixins(
  FieldValidationRulesMixin,
  ValidatorMixin,
  SaveLeaveMixin,
  KinderkrippeApiRequestMixin,
  KindergartenApiRequestMixin,
  HausFuerKinderApiRequestMixin,
  GsNachmittagBetreuungApiRequestMixin,
  GrundschuleApiRequestMixin,
  MittelschuleApiRequestMixin
) {
  private mode = DisplayMode.UNDEFINED;

  private buttonText = "";

  private deleteDialogOpen = false;

  private kinderkrippe: KinderkrippeModel = new KinderkrippeModel(createKinderkrippeDto());
  private kindergarten: KindergartenModel = new KindergartenModel(createKindergartenDto());
  private hausFuerKinder: HausFuerKinderModel = new HausFuerKinderModel(createHausFuerKinderDto());
  private gsNachmittagBetreuung: GsNachmittagBetreuungModel = new GsNachmittagBetreuungModel(
    createGsNachmittagBetreuungDto()
  );
  private grundschule: GrundschuleModel = new GrundschuleModel(createGrundschuleDto());
  private mittelschule: MittelschuleModel = new MittelschuleModel(createMittelschuleDto());

  private queryParameterInfrastruktureinrichtungId: string = this.$route.params.id;
  private queryParameterInfrastruktureinrichtungTyp: string = this.$route.params.typ;

  private static readonly SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG = "search/selectedInfrastruktureinrichtung";
  private static readonly SEARCH_RESET_INFRASTRUKTUREINRICHTUNG = "search/resetInfrastruktureinrichtung";

  private currentInfrastruktureinrichtungTyp: string =
    InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Unspecified.toString();

  get infrastruktureinrichtungTyp(): string {
    return this.currentInfrastruktureinrichtungTyp;
  }

  set infrastruktureinrichtungTyp(selectedInfrastruktureinrichtungTyp: string) {
    this.resetInfrastruktureinrichtungTyp(this.currentInfrastruktureinrichtungTyp);
    this.currentInfrastruktureinrichtungTyp = selectedInfrastruktureinrichtungTyp;
  }

  get lfdNr(): string {
    const model = this.getInfrastruktureinrichtungModel();
    return !_.isNil(model) && !_.isNil(model.infrastruktureinrichtung.lfdNr)
      ? model.infrastruktureinrichtung.lfdNr.toString()
      : "";
  }

  get infrastruktureinrichtungDisplayName(): string {
    if (this.isNewInfrastruktureinrichtung()) {
      return "";
    } else {
      const model = this.getInfrastruktureinrichtungModel();
      return !_.isNil(model) ? model.infrastruktureinrichtung.nameEinrichtung : "";
    }
  }

  private yesNoDialogNo(): void {
    this.deleteDialogOpen = false;
  }

  private async yesNoDialogYes(): Promise<void> {
    this.deleteInfrastruktureinrichtungTyp(
      this.infrastruktureinrichtungTyp,
      this.getInfrastruktureinrichtungModel()?.id as string
    );
    this.yesNoDialogNo();
  }

  get isKinderkrippe(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe.toString()
    );
  }

  get isKindergarten(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten.toString()
    );
  }

  get isHausFuerKinder(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder.toString()
    );
  }

  get isGsNachmittagBetreuung(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung.toString()
    );
  }

  get isGrundschule(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule.toString()
    );
  }

  get isMittelschule(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule.toString()
    );
  }

  mounted(): void {
    this.currentInfrastruktureinrichtungTyp =
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Unspecified.toString();
    this.getInfrastruktureinrichtungById(
      this.queryParameterInfrastruktureinrichtungTyp,
      this.queryParameterInfrastruktureinrichtungId
    );
    this.mode = this.isNewInfrastruktureinrichtung() ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    this.buttonText = this.isNewInfrastruktureinrichtung() ? "Speichern" : "Aktualisieren";
  }

  private isNewInfrastruktureinrichtung(): boolean {
    this.mode = _.isNil(this.queryParameterInfrastruktureinrichtungId) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    return this.mode === DisplayMode.NEU;
  }

  @Watch("$store.state.search.selectedInfrastruktureinrichtung", { immediate: true, deep: true })
  private selectedInfrastruktureinrichtungChanged() {
    const infrastruktureinrichtungFromStore =
      this.$store.getters[Infrastruktureinrichtung.SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG];
    if (!_.isNil(infrastruktureinrichtungFromStore)) {
      this.setInfrastruktureinrichtungModel(infrastruktureinrichtungFromStore);
    }
  }

  private async saveInfrastruktureinrichtung(): Promise<void> {
    if (this.validateForm()) {
      const validationMessage: string | null = this.validateInfrastruktureinrichtungTyp(
        this.infrastruktureinrichtungTyp
      );
      if (_.isNil(validationMessage)) {
        this.saveInfrastruktureinrichtungTyp(this.infrastruktureinrichtungTyp);
      } else {
        this.showWarningInInformationList(validationMessage);
      }
    } else {
      this.showWarningInInformationList("Es gibt noch Validierungsfehler");
    }
  }

  private validateForm(): boolean {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  private validateInfrastruktureinrichtungTyp(infrastruktureinrichtungTyp: string): string | null {
    switch (infrastruktureinrichtungTyp) {
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe.toString():
        return this.findFaultInKinderkrippeForSave(this.kinderkrippe);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten.toString():
        return this.findFaultInKindergartenForSave(this.kindergarten);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder.toString():
        return this.findFaultInHausFuerKinderForSave(this.hausFuerKinder);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung.toString():
        return this.findFaultInGsNachmittagBetreuungForSave(this.gsNachmittagBetreuung);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule.toString():
        return this.findFaultInGrundschuleForSave(this.grundschule);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule.toString():
        return this.findFaultInMittelschuleForSave(this.mittelschule);
      default:
        return null;
    }
  }

  private async saveInfrastruktureinrichtungTyp(infrastruktureinrichtungTyp: string): Promise<void> {
    switch (infrastruktureinrichtungTyp) {
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe.toString():
        this.callSaveInfrastruktureinrichtung(
          this.mode === DisplayMode.NEU ? this.createKinderkrippe : this.updateKinderkrippe,
          this.kinderkrippe,
          true
        );
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten.toString():
        this.callSaveInfrastruktureinrichtung(
          this.mode === DisplayMode.NEU ? this.createKindergarten : this.updateKindergarten,
          this.kindergarten,
          true
        );
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder.toString():
        this.callSaveInfrastruktureinrichtung(
          this.mode === DisplayMode.NEU ? this.createHausFuerKinder : this.updateHausFuerKinder,
          this.hausFuerKinder,
          true
        );
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung.toString():
        this.callSaveInfrastruktureinrichtung(
          this.mode === DisplayMode.NEU ? this.createGsNachmittagBetreuung : this.updateGsNachmittagBetreuung,
          this.gsNachmittagBetreuung,
          true
        );
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule.toString():
        this.callSaveInfrastruktureinrichtung(
          this.mode === DisplayMode.NEU ? this.createGrundschule : this.updateGrundschule,
          this.grundschule,
          true
        );
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule.toString():
        this.callSaveInfrastruktureinrichtung(
          this.mode === DisplayMode.NEU ? this.createMittelschule : this.updateMittelschule,
          this.mittelschule,
          true
        );
        break;
      default:
        break;
    }
  }

  private async callSaveInfrastruktureinrichtung<T>(
    callback: (
      model: T,
      showInInformationList: boolean
    ) => Promise<
      | KinderkrippeDto
      | KindergartenDto
      | HausFuerKinderDto
      | GsNachmittagBetreuungDto
      | GrundschuleDto
      | MittelschuleDto
    >,
    modelParam: T,
    showInInformationListParam: boolean
  ): Promise<void> {
    await callback(modelParam, showInInformationListParam).then((dto) => {
      this.handleSuccess(dto);
    });
  }

  private handleSuccess(
    dto:
      | KinderkrippeDto
      | KindergartenDto
      | HausFuerKinderDto
      | GsNachmittagBetreuungDto
      | GrundschuleDto
      | MittelschuleDto
  ): void {
    this.saveInfrastruktureinrichtungInStore(this.infrastruktureinrichtungTyp, dto);
    this.$store.dispatch(Infrastruktureinrichtung.SEARCH_RESET_INFRASTRUKTUREINRICHTUNG);
    if (this.isNewInfrastruktureinrichtung()) {
      this.$router.push({ path: "/infrastruktureinrichtungenuebersicht" });
      Toaster.toast(`Die Infrastruktureinrichtung wurde erfolgreich gespeichert`, Levels.SUCCESS);
    } else {
      Toaster.toast(`Die Infrastruktureinrichtung wurde erfolgreich aktualisiert`, Levels.SUCCESS);
    }
  }

  private saveInfrastruktureinrichtungInStore(
    infrastruktureinrichtungTyp: string,
    dto:
      | KinderkrippeDto
      | KindergartenDto
      | HausFuerKinderDto
      | GsNachmittagBetreuungDto
      | GrundschuleDto
      | MittelschuleDto
  ): void {
    const model = this.getModelOfDto(infrastruktureinrichtungTyp, dto);
    if (model !== undefined) {
      this.$store.commit(Infrastruktureinrichtung.SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG, _.cloneDeep(model));
    }
  }

  private getModelOfDto(
    infrastruktureinrichtungTyp: string,
    dto:
      | KinderkrippeDto
      | KindergartenDto
      | HausFuerKinderDto
      | GsNachmittagBetreuungDto
      | GrundschuleDto
      | MittelschuleDto
      | undefined
  ):
    | KinderkrippeModel
    | KindergartenModel
    | HausFuerKinderModel
    | GsNachmittagBetreuungModel
    | GrundschuleModel
    | MittelschuleModel
    | undefined {
    switch (infrastruktureinrichtungTyp) {
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe.toString():
        return new KinderkrippeModel(!_.isNil(dto) ? (dto as KinderkrippeDto) : createKinderkrippeDto());
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten.toString():
        return new KindergartenModel(!_.isNil(dto) ? (dto as KindergartenDto) : createKindergartenDto());
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder.toString():
        return new HausFuerKinderModel(!_.isNil(dto) ? (dto as HausFuerKinderDto) : createHausFuerKinderDto());
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung.toString():
        return new GsNachmittagBetreuungModel(
          !_.isNil(dto) ? (dto as GsNachmittagBetreuungDto) : createGsNachmittagBetreuungDto()
        );
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule.toString():
        return new GrundschuleModel(!_.isNil(dto) ? (dto as GrundschuleDto) : createGrundschuleDto());
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule.toString():
        return new MittelschuleModel(!_.isNil(dto) ? (dto as MittelschuleDto) : createMittelschuleDto());
      default:
        return undefined;
    }
  }

  private setInfrastruktureinrichtungModel(
    infrastruktureinrichtungModel:
      | KinderkrippeModel
      | KindergartenModel
      | HausFuerKinderModel
      | GsNachmittagBetreuungModel
      | GrundschuleModel
      | MittelschuleModel
  ): void {
    switch (infrastruktureinrichtungModel.infrastruktureinrichtungTyp.toString()) {
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe.toString():
        this.kinderkrippe = _.cloneDeep(infrastruktureinrichtungModel as KinderkrippeModel);
        this.currentInfrastruktureinrichtungTyp =
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe;
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten.toString():
        this.kindergarten = _.cloneDeep(infrastruktureinrichtungModel as KindergartenModel);
        this.currentInfrastruktureinrichtungTyp =
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten;
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder.toString():
        this.hausFuerKinder = _.cloneDeep(infrastruktureinrichtungModel as HausFuerKinderModel);
        this.currentInfrastruktureinrichtungTyp =
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder;
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung.toString():
        this.gsNachmittagBetreuung = _.cloneDeep(infrastruktureinrichtungModel as GsNachmittagBetreuungModel);
        this.currentInfrastruktureinrichtungTyp =
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung;
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule.toString():
        this.grundschule = _.cloneDeep(infrastruktureinrichtungModel as GrundschuleModel);
        this.currentInfrastruktureinrichtungTyp =
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule;
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule.toString():
        this.mittelschule = _.cloneDeep(infrastruktureinrichtungModel as MittelschuleModel);
        this.currentInfrastruktureinrichtungTyp =
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule;
        break;
      default:
        break;
    }
  }

  private getInfrastruktureinrichtungModel():
    | KinderkrippeModel
    | KindergartenModel
    | HausFuerKinderModel
    | GsNachmittagBetreuungModel
    | GrundschuleModel
    | MittelschuleModel
    | undefined {
    if (!_.isNil(this.infrastruktureinrichtungTyp)) {
      switch (this.infrastruktureinrichtungTyp) {
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe.toString():
          return this.kinderkrippe;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten.toString():
          return this.kindergarten;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder.toString():
          return this.hausFuerKinder;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung.toString():
          return this.gsNachmittagBetreuung;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule.toString():
          return this.grundschule;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule.toString():
          return this.mittelschule;
        default:
          break;
      }
    }
    return undefined;
  }

  private resetInfrastruktureinrichtungTyp(infrastruktureinrichtungTyp: string) {
    switch (infrastruktureinrichtungTyp) {
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe.toString():
        this.kinderkrippe = new KinderkrippeModel(createKinderkrippeDto());
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten.toString():
        this.kindergarten = new KindergartenModel(createKindergartenDto());
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder.toString():
        this.hausFuerKinder = new HausFuerKinderModel(createHausFuerKinderDto());
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung.toString():
        this.gsNachmittagBetreuung = new GsNachmittagBetreuungModel(createGsNachmittagBetreuungDto());
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule.toString():
        this.grundschule = new GrundschuleModel(createGrundschuleDto());
        break;
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule.toString():
        this.mittelschule = new MittelschuleModel(createMittelschuleDto());
        break;
      default:
        break;
    }
  }

  private async getInfrastruktureinrichtungById(infrastruktureinrichtungTyp: string, id: string): Promise<void> {
    if (!_.isNil(infrastruktureinrichtungTyp)) {
      if (!_.isNil(id)) {
        switch (infrastruktureinrichtungTyp) {
          case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe.toString():
            this.callInfrastruktureinrichtungById(this.getKinderkrippeById, id, infrastruktureinrichtungTyp);
            break;
          case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten.toString():
            this.callInfrastruktureinrichtungById(this.getKindergartenById, id, infrastruktureinrichtungTyp);
            break;
          case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder.toString():
            this.callInfrastruktureinrichtungById(this.getHausFuerKinderById, id, infrastruktureinrichtungTyp);
            break;
          case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung.toString():
            this.callInfrastruktureinrichtungById(this.getGsNachmittagBetreuungById, id, infrastruktureinrichtungTyp);
            break;
          case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule.toString():
            this.callInfrastruktureinrichtungById(this.getGrundschuleById, id, infrastruktureinrichtungTyp);
            break;
          case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule.toString():
            this.callInfrastruktureinrichtungById(this.getMittelschuleById, id, infrastruktureinrichtungTyp);
            break;
          default:
            break;
        }
      } else {
        this.$store.commit(
          Infrastruktureinrichtung.SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG,
          this.getModelOfDto(infrastruktureinrichtungTyp, undefined)
        );
      }
    }
  }

  private async callInfrastruktureinrichtungById(
    callback: (
      id: string,
      showInInformationList: boolean
    ) => Promise<
      | KinderkrippeDto
      | KindergartenDto
      | HausFuerKinderDto
      | GsNachmittagBetreuungDto
      | GrundschuleDto
      | MittelschuleDto
    >,
    idParam: string,
    infrastruktureinrichtungTyp: string
  ): Promise<void> {
    await callback(idParam, true)
      .then((dto) => {
        this.$store.commit(
          Infrastruktureinrichtung.SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG,
          this.getModelOfDto(infrastruktureinrichtungTyp, dto)
        );
      })
      .catch(() => {
        this.$store.commit(Infrastruktureinrichtung.SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG, undefined);
      });
  }

  private deleteInfrastruktureinrichtung(): void {
    this.deleteDialogOpen = true;
  }

  private async deleteInfrastruktureinrichtungTyp(infrastruktureinrichtungTyp: string, id: string): Promise<void> {
    if (!_.isNil(infrastruktureinrichtungTyp) && !_.isNil(id)) {
      switch (infrastruktureinrichtungTyp) {
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe.toString():
          this.callDeleteInfrastruktureinrichtungById(this.deleteKinderkrippeById, id);
          break;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten.toString():
          this.callDeleteInfrastruktureinrichtungById(this.deleteKindergartenById, id);
          break;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder.toString():
          this.callDeleteInfrastruktureinrichtungById(this.deleteHausFuerKinderById, id);
          break;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung.toString():
          this.callDeleteInfrastruktureinrichtungById(this.deleteGsNachmittagBetreuungById, id);
          break;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule.toString():
          this.callDeleteInfrastruktureinrichtungById(this.deleteGrundschuleById, id);
          break;
        case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule.toString():
          this.callDeleteInfrastruktureinrichtungById(this.deleteMittelschuleById, id);
          break;
        default:
          break;
      }
    }
  }

  private async callDeleteInfrastruktureinrichtungById(
    callback: (id: string, showInInformationList: boolean) => Promise<void>,
    idParam: string
  ): Promise<void> {
    await callback(idParam, true).then(() => {
      this.returnToUebersicht("Die Infrastruktureinrichtung wurde erfolgreich gelöscht", Levels.SUCCESS);
    });
  }

  private returnToUebersicht(message?: string, level?: Levels): void {
    if (message && level) {
      Toaster.toast(message, level);
    }
    this.$store.dispatch(Infrastruktureinrichtung.SEARCH_RESET_INFRASTRUKTUREINRICHTUNG);
    this.$router.push({ path: "/infrastruktureinrichtungenuebersicht" });
  }
}
</script>

<style></style>
