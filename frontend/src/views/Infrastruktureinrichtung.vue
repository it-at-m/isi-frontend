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
          v-show="isInfrastruktureinrichtungTypNotUnspecified"
          id="infrastruktureinrichtung_infrastruktureinrichtung_component"
          ref="infrastruktureinrichtungComponent"
          v-model="infrastruktureinrichtung"
          :is-editable="isEditable"
        />
        <kinderkrippe-component
          v-if="isKinderkrippe"
          id="infrastruktureinrichtung_kinderkrippe_component"
          ref="kinderkrippeComponent"
          v-model="kinderkrippe"
          :is-editable="isEditable"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired()"
        />
        <kindergarten-component
          v-if="isKindergarten"
          id="infrastruktureinrichtung_kindergarten_component"
          ref="kindergartenComponent"
          v-model="kindergarten"
          :is-editable="isEditable"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired()"
        />
        <haus-fuer-kinder-component
          v-if="isHausFuerKinder"
          id="infrastruktureinrichtung_hausFuerKinder_component"
          ref="hausFuerKinderComponent"
          v-model="hausFuerKinder"
          :is-editable="isEditable"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired()"
        />
        <gs-nachmittag-betreuung-component
          v-if="isGsNachmittagBetreuung"
          id="infrastruktureinrichtung_gsNachmittagBetreuung_component"
          ref="gsNachmittagBetreuungComponent"
          v-model="gsNachmittagBetreuung"
          :is-editable="isEditable"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired()"
        />
        <grundschule-component
          v-if="isGrundschule"
          id="infrastruktureinrichtung_grundschule_component"
          ref="grundschuleComponent"
          v-model="grundschule"
          :is-editable="isEditable"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired()"
        />
        <mittelschule-component
          v-if="isMittelschule"
          id="infrastruktureinrichtung_mittelschule_component"
          ref="mittelschuleComponent"
          v-model="mittelschule"
          :is-editable="isEditable"
          :is-einrichtungstraeger-required="isEinrichtungstraegerRequired()"
        />
        <kommentare
          v-if="isDisplayModeAenderung"
          id="infrastruktureinrichtung_kommentare"
          :context="context"
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
            <v-col
              cols="12"
              sm="11"
            >
              <span
                id="infrastruktureinrichtung_displayName"
                class="text-h6 font-weight-bold"
                v-text="infrastruktureinrichtungDisplayName"
              />
            </v-col>
            <v-col
              cols="12"
              sm="1"
            >
              <benutzerinformationen v-model="bearbeitungsinformationen" />
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
          :disabled="!isFormDirty() || !isEditable"
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
import {
  GrundschuleDto,
  GsNachmittagBetreuungDto,
  HausFuerKinderDto,
  InfrastruktureinrichtungDto,
  InfrastruktureinrichtungDtoStatusEnum,
  InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum,
  KindergartenDto,
  KinderkrippeDto,
  MittelschuleDto,
} from "@/api/api-client/isi-backend";
import { Levels } from "@/api/error";
import InformationList from "@/components/common/InformationList.vue";
import Kommentare from "@/components/common/kommentar/Kommentare.vue";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import GrundschuleComponent from "@/components/infrastruktureinrichtung/GrundschuleComponent.vue";
import GsNachmittagBetreuungComponent from "@/components/infrastruktureinrichtung/GsNachmittagBetreuungComponent.vue";
import HausFuerKinderComponent from "@/components/infrastruktureinrichtung/HausFuerKinderComponent.vue";
import InfrastruktureinrichtungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungComponent.vue";
import InfrastruktureinrichtungTypComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungTypComponent.vue";
import KindergartenComponent from "@/components/infrastruktureinrichtung/KindergartenComponent.vue";
import KinderkrippeComponent from "@/components/infrastruktureinrichtung/KinderkrippeComponent.vue";
import MittelschuleComponent from "@/components/infrastruktureinrichtung/MittelschuleComponent.vue";
import InfrastruktureinrichtungApiRequestMixin from "@/mixins/requests/InfrastruktureinrichtungApiRequestMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import SecurityMixin from "@/mixins/security/SecurityMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import DisplayMode from "@/types/common/DisplayMode";
import GrundschuleModel from "@/types/model/infrastruktureinrichtung/GrundschuleModel";
import GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import MittelschuleModel from "@/types/model/infrastruktureinrichtung/MittelschuleModel";
import { Context } from "@/utils/Context";
import {
  createGrundschuleDto,
  createGsNachmittagBetreuungDto,
  createHausFuerKinderDto,
  createInfrastruktureinrichtungDto,
  createKindergartenDto,
  createKinderkrippeDto,
  createMittelschuleDto,
} from "@/utils/Factories";
import _ from "lodash";
import Vue from "vue";
import { Component, Mixins, Watch } from "vue-property-decorator";
import Toaster from "../components/common/toaster.type";
import Benutzerinformationen, { BenutzerinformationenModel } from "@/components/common/Benutzerinformationen.vue";

@Component({
  computed: {
    context() {
      return Context.INFRASTRUKTUREINRICHTUNG;
    },
  },
  components: {
    Benutzerinformationen,
    Kommentare,
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
  SecurityMixin,
) {
  private mode = DisplayMode.UNDEFINED;

  private buttonText = "";

  private deleteDialogOpen = false;

  private infrastruktureinrichtung: InfrastruktureinrichtungDto = createInfrastruktureinrichtungDto();

  private infrastruktureinrichtungId: string | undefined = this.$route.params.id;

  get isDisplayModeAenderung(): boolean {
    return this.mode === DisplayMode.AENDERUNG;
  }

  get bearbeitungsinformationen(): BenutzerinformationenModel {
    return new BenutzerinformationenModel(
      this.infrastruktureinrichtung?.bearbeitendePerson,
      this.infrastruktureinrichtung?.lastModifiedDateTime,
    );
  }

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
      this.infrastruktureinrichtung?.infrastruktureinrichtungTyp !==
      InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Unspecified
    );
  }

  get isKinderkrippe(): boolean {
    return (
      this.infrastruktureinrichtung?.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kinderkrippe
    );
  }

  get kinderkrippe(): KinderkrippeModel | undefined {
    if (this.isKinderkrippe) {
      return this.infrastruktureinrichtung as KinderkrippeModel;
    } else {
      return undefined;
    }
  }

  get isKindergarten(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kindergarten
    );
  }

  get kindergarten(): KindergartenModel | undefined {
    if (this.isKindergarten) {
      return this.infrastruktureinrichtung as KindergartenModel;
    } else {
      return undefined;
    }
  }

  get isHausFuerKinder(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.HausFuerKinder
    );
  }

  get hausFuerKinder(): HausFuerKinderModel | undefined {
    if (this.isHausFuerKinder) {
      return this.infrastruktureinrichtung as HausFuerKinderModel;
    } else {
      return undefined;
    }
  }

  get isGsNachmittagBetreuung(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung
    );
  }

  get gsNachmittagBetreuung(): GsNachmittagBetreuungModel | undefined {
    if (this.isGsNachmittagBetreuung) {
      return this.infrastruktureinrichtung as GsNachmittagBetreuungModel;
    } else {
      return undefined;
    }
  }

  get isGrundschule(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Grundschule
    );
  }

  get grundschule(): GrundschuleModel | undefined {
    if (this.isGrundschule) {
      return this.infrastruktureinrichtung as GrundschuleModel;
    } else {
      return undefined;
    }
  }

  get isMittelschule(): boolean {
    return (
      this.infrastruktureinrichtung.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Mittelschule
    );
  }

  get mittelschule(): MittelschuleModel | undefined {
    if (this.isMittelschule) {
      return this.infrastruktureinrichtung as MittelschuleModel;
    } else {
      return undefined;
    }
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
  private handleSelectedInfrastruktureinrichtungChanged(): void {
    const infrastruktureinrichtungFromStore = this.getInfrastruktureinrichtungFromStore();
    if (!_.isNil(infrastruktureinrichtungFromStore)) {
      this.infrastruktureinrichtung = infrastruktureinrichtungFromStore;
    } else {
      this.infrastruktureinrichtung = createInfrastruktureinrichtungDto();
    }
  }

  @Watch("infrastruktureinrichtung.infrastruktureinrichtungTyp", { immediate: true })
  private handleInfrastruktureinrichtungTypChanged(): void {
    if (this.isNewInfrastruktureinrichtung()) {
      this.infrastruktureinrichtung = this.getModelOfNewDtoForInfrastruktureinrichtungTyp(
        this.infrastruktureinrichtung.infrastruktureinrichtungTyp,
      );
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
    infrastruktureinrichtung: InfrastruktureinrichtungDto | undefined,
  ): string | null {
    switch (infrastruktureinrichtung?.infrastruktureinrichtungTyp) {
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kinderkrippe:
        return this.findFaultInKinderkrippeForSave(infrastruktureinrichtung as KinderkrippeDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kindergarten:
        return this.findFaultInKindergartenForSave(infrastruktureinrichtung as KindergartenDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.HausFuerKinder:
        return this.findFaultInHausFuerKinderForSave(infrastruktureinrichtung as HausFuerKinderDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung:
        return this.findFaultInGsNachmittagBetreuungForSave(infrastruktureinrichtung as GsNachmittagBetreuungDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Grundschule:
        return this.findFaultInGrundschuleForSave(infrastruktureinrichtung as GrundschuleDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Mittelschule:
        return this.findFaultInMittelschuleForSave(infrastruktureinrichtung as MittelschuleDto);
      default:
        return null;
    }
  }

  private getModelOfNewDtoForInfrastruktureinrichtungTyp(
    infrastruktureinrichtungTyp:
      | InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum
      | undefined,
  ):
    | KinderkrippeModel
    | KindergartenModel
    | HausFuerKinderModel
    | GsNachmittagBetreuungModel
    | GrundschuleModel
    | MittelschuleModel
    | InfrastruktureinrichtungDto {
    switch (infrastruktureinrichtungTyp) {
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kinderkrippe:
        return this.getModelOfDto(createKinderkrippeDto()) as KinderkrippeModel;
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kindergarten:
        return this.getModelOfDto(createKindergartenDto()) as KindergartenModel;
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.HausFuerKinder:
        return this.getModelOfDto(createHausFuerKinderDto()) as HausFuerKinderModel;
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung:
        return this.getModelOfDto(createGsNachmittagBetreuungDto()) as GsNachmittagBetreuungModel;
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Grundschule:
        return this.getModelOfDto(createGrundschuleDto()) as GrundschuleModel;
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Mittelschule:
        return this.getModelOfDto(createMittelschuleDto()) as MittelschuleModel;
      default:
        return createInfrastruktureinrichtungDto();
    }
  }

  private getModelOfDto(
    dto: InfrastruktureinrichtungDto | undefined,
  ):
    | KinderkrippeModel
    | KindergartenModel
    | HausFuerKinderModel
    | GsNachmittagBetreuungModel
    | GrundschuleModel
    | MittelschuleModel
    | undefined {
    switch (dto?.infrastruktureinrichtungTyp) {
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kinderkrippe:
        return new KinderkrippeModel(dto as KinderkrippeDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Kindergarten:
        return new KindergartenModel(dto as KindergartenDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.HausFuerKinder:
        return new HausFuerKinderModel(dto as HausFuerKinderDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung:
        return new GsNachmittagBetreuungModel(dto as GsNachmittagBetreuungDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Grundschule:
        return new GrundschuleModel(dto as GrundschuleDto);
      case InfrastruktureinrichtungSearchResultDtoAllOfInfrastruktureinrichtungTypEnum.Mittelschule:
        return new MittelschuleModel(dto as MittelschuleDto);
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
                (savedInfrastruktureinrichtung) => this.handleSuccess(savedInfrastruktureinrichtung),
              )
            : await this.updateInfrastruktureinrichtung(this.infrastruktureinrichtung, true).then(
                (savedInfrastruktureinrichtung) => this.handleSuccess(savedInfrastruktureinrichtung),
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
      await this.deleteInfrastruktureinrichtungById(id, false).then(() => {
        this.$store.commit("search/removeSearchResultById", id);
        this.returnToUebersicht("Die Infrastruktureinrichtung wurde erfolgreich gelöscht", Levels.SUCCESS);
      });
    }
  }

  private returnToUebersicht(message?: string, level?: Levels): void {
    if (message && level) {
      Toaster.toast(message, level);
    }
    this.$router.push({ path: "/" });
  }

  private setInfrastruktureinrichtungToStore(dto: InfrastruktureinrichtungDto | undefined): void {
    if (dto !== undefined) {
      this.$store.commit("search/selectedInfrastruktureinrichtung", _.cloneDeep(dto));
    }
  }

  private getInfrastruktureinrichtungFromStore():
    | KinderkrippeModel
    | KindergartenModel
    | HausFuerKinderModel
    | GsNachmittagBetreuungModel
    | GrundschuleModel
    | MittelschuleModel
    | undefined {
    const dto: InfrastruktureinrichtungDto | undefined = this.$store.getters["search/selectedInfrastruktureinrichtung"];
    return this.getModelOfDto(dto);
  }

  private handleSuccess(dto: InfrastruktureinrichtungDto): void {
    this.setInfrastruktureinrichtungToStore(dto);
    if (this.isNewInfrastruktureinrichtung()) {
      this.$router.push({ path: "/" });
      Toaster.toast(`Die Infrastruktureinrichtung wurde erfolgreich gespeichert`, Levels.SUCCESS);
    } else {
      Toaster.toast(`Die Infrastruktureinrichtung wurde erfolgreich aktualisiert`, Levels.SUCCESS);
    }
  }

  private isEinrichtungstraegerRequired(): boolean {
    return (
      this.infrastruktureinrichtung.status === InfrastruktureinrichtungDtoStatusEnum.Bestand ||
      this.infrastruktureinrichtung.status === InfrastruktureinrichtungDtoStatusEnum.GesichertePlanungErwPlaetzeBestEinr
    );
  }
}
</script>

<style></style>
