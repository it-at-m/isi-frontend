<template>
  <v-form ref="form">
    <default-layout solid-heading>
      <template #content>
        <infrastruktureinrichtung-typ-component
          id="infrastruktureinrichtung_infrastruktureinrichtungtyp_component"
          ref="infrastruktureinrichtungTypComponent"
          v-model="infrastruktureinrichtung.infrastruktureinrichtungTyp"
          :lfd-nr="lfdNr"
          :mode="mode"
          :is-editable="isEditable"
        />
        <infrastruktureinrichtung-component
          v-if="isInfrastruktureinrichtungTypNotUnspecified"
          id="infrastruktureinrichtung_kinderkrippe_component"
          ref="infrastruktureinrichtungComponent"
          v-model="infrastruktureinrichtung"
          :mode="mode"
          :is-editable="isEditable"
        />
        <kinderkrippe-component
          v-if="isKinderkrippe"
          id="infrastruktureinrichtung_kinderkrippe_component"
          ref="kinderkrippeComponent"
          v-model="kinderkrippe"
          :mode="mode"
          :is-editable="isEditable"
        />
        <kindergarten-component
          v-if="isKindergarten"
          id="infrastruktureinrichtung_kindergarten_component"
          ref="kindergartenComponent"
          v-model="kindergarten"
          :mode="mode"
          :is-editable="isEditable"
        />
        <haus-fuer-kinder-component
          v-if="isHausFuerKinder"
          id="infrastruktureinrichtung_hausFuerKinder_component"
          ref="hausFuerKinderComponent"
          v-model="hausFuerKinder"
          :mode="mode"
          :is-editable="isEditable"
        />
        <gs-nachmittag-betreuung-component
          v-if="isGsNachmittagBetreuung"
          id="infrastruktureinrichtung_gsNachmittagBetreuung_component"
          ref="gsNachmittagBetreuungComponent"
          v-model="gsNachmittagBetreuung"
          :mode="mode"
          :is-editable="isEditable"
        />
        <grundschule-component
          v-if="isGrundschule"
          id="infrastruktureinrichtung_grundschule_component"
          ref="grundschuleComponent"
          v-model="grundschule"
          :mode="mode"
          :is-editable="isEditable"
        />
        <mittelschule-component
          v-if="isMittelschule"
          id="infrastruktureinrichtung_mittelschule_component"
          ref="mittelschuleComponent"
          v-model="mittelschule"
          :mode="mode"
          :is-editable="isEditable"
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
          :disabled="!isEditable"
          @click="openDeleteDialog"
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
          :disabled="!isDirty() || !isEditable"
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
  createGrundschuleDto,
  createGsNachmittagBetreuungDto,
  createHausFuerKinderDto,
  createInfrastruktureinrichtungDto,
  createKindergartenDto,
  createKinderkrippeDto,
  createMittelschuleDto,
} from "@/utils/Factories";
import {
  GrundschuleDto,
  GsNachmittagBetreuungDto,
  HausFuerKinderDto,
  InfrastruktureinrichtungDto,
  InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum,
  KindergartenDto,
  KinderkrippeDto,
  MittelschuleDto,
} from "@/api/api-client/isi-backend";
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
import InfrastruktureinrichtungApiRequestMixin from "@/mixins/requests/InfrastruktureinrichtungApiRequestMixin";
import SecurityMixin from "@/mixins/security/SecurityMixin";
import InfrastruktureinrichtungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungComponent.vue";

@Component({
  components: {
    InfrastruktureinrichtungComponent,
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
  InfrastruktureinrichtungApiRequestMixin,
  SecurityMixin
) {
  private mode = DisplayMode.UNDEFINED;

  private buttonText = "";

  private deleteDialogOpen = false;

  private infrastruktureinrichtung: InfrastruktureinrichtungDto = createInfrastruktureinrichtungDto();

  private infrastruktureinrichtungId: string | undefined = this.$route.params.id;

  get isEditable(): boolean {
    return this.isRoleAdminOrSachbearbeitung();
  }

  get lfdNr(): string {
    return !_.isNil(this.infrastruktureinrichtung) && !_.isNil(this.infrastruktureinrichtung.lfdNr)
      ? this.infrastruktureinrichtung.lfdNr.toString()
      : "";
  }

  get infrastruktureinrichtungDisplayName(): string {
    return !_.isNil(this.infrastruktureinrichtung) && this.isAnderungForInfrastruktureinrichtung()
      ? this.infrastruktureinrichtung.nameEinrichtung
      : "";
  }

  get isInfrastruktureinrichtungTypNotUnspecified(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp !==
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Unspecified
    );
  }

  get isKinderkrippe(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe
    );
  }

  get kinderkrippe(): KinderkrippeModel {
    return this.isKinderkrippe
      ? (this.getModelOfDto(
          this.infrastruktureinrichtung.infrastruktureinrichtungTyp,
          this.infrastruktureinrichtung
        ) as KinderkrippeModel)
      : (this.getModelOfDto(
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe,
          this.infrastruktureinrichtung
        ) as KinderkrippeModel);
  }

  get isKindergarten(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten
    );
  }

  get kindergarten(): KindergartenModel {
    return this.isKindergarten
      ? (this.getModelOfDto(
          this.infrastruktureinrichtung.infrastruktureinrichtungTyp,
          this.infrastruktureinrichtung
        ) as KindergartenModel)
      : (this.getModelOfDto(
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten,
          this.infrastruktureinrichtung
        ) as KindergartenModel);
  }

  get isHausFuerKinder(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder
    );
  }

  get hausFuerKinder(): HausFuerKinderModel {
    return this.isHausFuerKinder
      ? (this.getModelOfDto(
          this.infrastruktureinrichtung.infrastruktureinrichtungTyp,
          this.infrastruktureinrichtung
        ) as HausFuerKinderModel)
      : (this.getModelOfDto(
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder,
          this.infrastruktureinrichtung
        ) as HausFuerKinderModel);
  }

  get isGsNachmittagBetreuung(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung
    );
  }

  get gsNachmittagBetreuung(): GsNachmittagBetreuungModel {
    return this.isGsNachmittagBetreuung
      ? (this.getModelOfDto(
          this.infrastruktureinrichtung.infrastruktureinrichtungTyp,
          this.infrastruktureinrichtung
        ) as GsNachmittagBetreuungModel)
      : (this.getModelOfDto(
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung,
          this.infrastruktureinrichtung
        ) as GsNachmittagBetreuungModel);
  }

  get isGrundschule(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule
    );
  }

  get grundschule(): GrundschuleModel {
    return this.isGrundschule
      ? (this.getModelOfDto(
          this.infrastruktureinrichtung.infrastruktureinrichtungTyp,
          this.infrastruktureinrichtung
        ) as GrundschuleModel)
      : (this.getModelOfDto(
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule,
          this.infrastruktureinrichtung
        ) as GrundschuleModel);
  }

  get isMittelschule(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule
    );
  }

  get mittelschule(): MittelschuleModel {
    return this.isMittelschule
      ? (this.getModelOfDto(
          this.infrastruktureinrichtung.infrastruktureinrichtungTyp,
          this.infrastruktureinrichtung
        ) as MittelschuleModel)
      : (this.getModelOfDto(
          InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule,
          this.infrastruktureinrichtung
        ) as MittelschuleModel);
  }

  mounted(): void {
    if (!_.isNil(this.infrastruktureinrichtungId) && !_.isEmpty(this.infrastruktureinrichtungId)) {
      this.getInfrastruktureinrichtungAndSetToStore(this.infrastruktureinrichtungId);
    } else {
      this.infrastruktureinrichtung = createInfrastruktureinrichtungDto();
      this.setInfrastruktureinrichtungToStore(this.infrastruktureinrichtung);
    }
    this.mode = this.determineDisplayModeNeuOrAenderung();
    this.buttonText = this.isNewInfrastruktureinrichtung() ? "Speichern" : "Aktualisieren";
  }

  @Watch("$store.state.search.selectedInfrastruktureinrichtung", { immediate: true, deep: true })
  private selectedInfrastruktureinrichtungChanged() {
    const infrastruktureinrichtungFromStore = this.getInfrastruktureinrichtungFromStore();
    if (!_.isNil(infrastruktureinrichtungFromStore)) {
      this.infrastruktureinrichtung = infrastruktureinrichtungFromStore;
    } else {
      this.infrastruktureinrichtung = createInfrastruktureinrichtungDto();
    }
  }

  private openDeleteDialog(): void {
    this.deleteDialogOpen = true;
  }

  private yesNoDialogNo(): void {
    this.deleteDialogOpen = false;
  }

  private async yesNoDialogYes(): Promise<void> {
    this.deleteInfrastruktureinrichtung();
    this.yesNoDialogNo();
    this.returnToUebersicht("Die Infrastruktureinrichtung wurde erfolgreich gelöscht", Levels.SUCCESS);
  }

  private determineDisplayModeNeuOrAenderung(): DisplayMode {
    return _.isNil(this.infrastruktureinrichtungId) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
  }

  private isNewInfrastruktureinrichtung(): boolean {
    return this.mode === DisplayMode.NEU;
  }

  private isAnderungForInfrastruktureinrichtung(): boolean {
    return this.mode === DisplayMode.AENDERUNG;
  }

  private validateForm(): boolean {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  private validateInfrastruktureinrichtung(
    infrastruktureinrichtung: InfrastruktureinrichtungDto | undefined
  ): string | null {
    switch (infrastruktureinrichtung?.infrastruktureinrichtungTyp) {
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe:
        return this.findFaultInKinderkrippeForSave(infrastruktureinrichtung as KinderkrippeDto);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten:
        return this.findFaultInKindergartenForSave(infrastruktureinrichtung as KindergartenDto);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder:
        return this.findFaultInHausFuerKinderForSave(infrastruktureinrichtung as HausFuerKinderDto);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung:
        return this.findFaultInGsNachmittagBetreuungForSave(infrastruktureinrichtung as GsNachmittagBetreuungDto);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule:
        return this.findFaultInGrundschuleForSave(infrastruktureinrichtung as GrundschuleDto);
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule:
        return this.findFaultInMittelschuleForSave(infrastruktureinrichtung as MittelschuleDto);
      default:
        return null;
    }
  }

  private getModelOfDto(
    infrastruktureinrichtungTyp: InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum | undefined,
    dto: InfrastruktureinrichtungDto | undefined
  ):
    | KinderkrippeModel
    | KindergartenModel
    | HausFuerKinderModel
    | GsNachmittagBetreuungModel
    | GrundschuleModel
    | MittelschuleModel
    | undefined {
    switch (infrastruktureinrichtungTyp) {
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe:
        return new KinderkrippeModel(!_.isNil(dto) ? (dto as KinderkrippeDto) : createKinderkrippeDto());
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten:
        return new KindergartenModel(!_.isNil(dto) ? (dto as KindergartenDto) : createKindergartenDto());
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder:
        return new HausFuerKinderModel(!_.isNil(dto) ? (dto as HausFuerKinderDto) : createHausFuerKinderDto());
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung:
        return new GsNachmittagBetreuungModel(
          !_.isNil(dto) ? (dto as GsNachmittagBetreuungDto) : createGsNachmittagBetreuungDto()
        );
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule:
        return new GrundschuleModel(!_.isNil(dto) ? (dto as GrundschuleDto) : createGrundschuleDto());
      case InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule:
        return new MittelschuleModel(!_.isNil(dto) ? (dto as MittelschuleDto) : createMittelschuleDto());
      default:
        return undefined;
    }
  }

  private async getInfrastruktureinrichtungAndSetToStore(id: string): Promise<void> {
    await this.getInfrastruktureinrichtungById(id, false)
      .then((dto) => {
        this.setInfrastruktureinrichtungToStore(dto);
      })
      .catch(() => {
        this.setInfrastruktureinrichtungToStore(undefined);
      });
  }

  private async saveInfrastruktureinrichtung(): Promise<void> {
    if (this.validateForm()) {
      const validationMessage: string | null = this.validateInfrastruktureinrichtung(this.infrastruktureinrichtung);
      if (_.isNil(validationMessage)) {
        if (!_.isNil(this.infrastruktureinrichtung)) {
          this.mode === DisplayMode.NEU
            ? await this.createInfrastruktureinrichtung(this.infrastruktureinrichtung, true).then(
                (savedInfrastruktureinrichtung) => this.handleSuccess(savedInfrastruktureinrichtung)
              )
            : await this.updateInfrastruktureinrichtung(this.infrastruktureinrichtung, true).then(
                (savedInfrastruktureinrichtung) => this.handleSuccess(savedInfrastruktureinrichtung)
              );
        }
      } else {
        this.showWarningInInformationList(validationMessage);
      }
    } else {
      this.showWarningInInformationList("Es gibt noch Validierungsfehler");
    }
  }

  private async deleteInfrastruktureinrichtung(): Promise<void> {
    const id: string | undefined = this.infrastruktureinrichtung?.id;
    if (!_.isNil(id)) {
      await this.deleteInfrastruktureinrichtungById(id, false);
    }
  }

  private returnToUebersicht(message?: string, level?: Levels): void {
    if (message && level) {
      Toaster.toast(message, level);
    }
    this.resetInfrastruktureinrichtungInStore();
    this.$router.push({ path: "/infrastruktureinrichtungenuebersicht" });
  }

  private setInfrastruktureinrichtungToStore(dto: InfrastruktureinrichtungDto | undefined): void {
    if (dto !== undefined) {
      this.$store.commit("search/selectedInfrastruktureinrichtung", _.cloneDeep(dto));
    }
  }

  private getInfrastruktureinrichtungFromStore(): InfrastruktureinrichtungDto {
    return this.$store.getters["search/selectedInfrastruktureinrichtung"];
  }

  private resetInfrastruktureinrichtungInStore(): void {
    this.$store.dispatch("search/resetInfrastruktureinrichtung");
  }

  private handleSuccess(dto: InfrastruktureinrichtungDto): void {
    this.resetInfrastruktureinrichtungInStore();
    this.setInfrastruktureinrichtungToStore(dto);
    if (this.isNewInfrastruktureinrichtung()) {
      this.$router.push({ path: "/infrastruktureinrichtungenuebersicht" });
      Toaster.toast(`Die Infrastruktureinrichtung wurde erfolgreich gespeichert`, Levels.SUCCESS);
    } else {
      Toaster.toast(`Die Infrastruktureinrichtung wurde erfolgreich aktualisiert`, Levels.SUCCESS);
    }
  }
}
</script>

<style></style>
