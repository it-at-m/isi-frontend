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
  InfrastruktureinrichtungDto,
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
  InfrastruktureinrichtungApiRequestMixin
) {
  private mode = DisplayMode.UNDEFINED;

  private buttonText = "";

  private deleteDialogOpen = false;

  private infrastruktureinrichtung: InfrastruktureinrichtungDto | undefined;

  private infrastruktureinrichtungId: string = this.$route.params.id;

  private static readonly SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG = "search/selectedInfrastruktureinrichtung";
  private static readonly SEARCH_RESET_INFRASTRUKTUREINRICHTUNG = "search/resetInfrastruktureinrichtung";

  private currentInfrastruktureinrichtungTyp: InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum =
    InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Unspecified;

  get infrastruktureinrichtungTyp(): InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum {
    return this.currentInfrastruktureinrichtungTyp;
  }

  set infrastruktureinrichtungTyp(
    selectedInfrastruktureinrichtungTyp: InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum
  ) {
    this.currentInfrastruktureinrichtungTyp = selectedInfrastruktureinrichtungTyp;
  }

  get lfdNr(): string {
    return !_.isNil(this.infrastruktureinrichtung) && !_.isNil(this.infrastruktureinrichtung.lfdNr)
      ? this.infrastruktureinrichtung.lfdNr.toString()
      : "";
  }

  get infrastruktureinrichtungDisplayName(): string {
    return !_.isNil(this.infrastruktureinrichtung) && !this.isNewInfrastruktureinrichtung()
      ? this.infrastruktureinrichtung.nameEinrichtung
      : "";
  }

  private yesNoDialogNo(): void {
    this.deleteDialogOpen = false;
  }

  private async yesNoDialogYes(): Promise<void> {
    this.deleteInfrastruktureinrichtungTyp(this.infrastruktureinrichtung?.id as string);
    this.yesNoDialogNo();
  }

  get isKinderkrippe(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kinderkrippe
    );
  }

  get isKindergarten(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Kindergarten
    );
  }

  get isHausFuerKinder(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.HausFuerKinder
    );
  }

  get isGsNachmittagBetreuung(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung
    );
  }

  get isGrundschule(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Grundschule
    );
  }

  get isMittelschule(): boolean {
    return (
      this.currentInfrastruktureinrichtungTyp ===
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Mittelschule
    );
  }

  mounted(): void {
    this.currentInfrastruktureinrichtungTyp =
      InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum.Unspecified;
    this.getInfrastruktureinrichtung(this.infrastruktureinrichtungId);
    this.mode = this.isNewInfrastruktureinrichtung() ? DisplayMode.NEU : DisplayMode.AENDERUNG;
    this.buttonText = this.isNewInfrastruktureinrichtung() ? "Speichern" : "Aktualisieren";
  }

  private isNewInfrastruktureinrichtung(): boolean {
    this.mode = _.isNil(this.infrastruktureinrichtungId) ? DisplayMode.NEU : DisplayMode.AENDERUNG;
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
      const validationMessage: string | null = this.validateInfrastruktureinrichtung(this.infrastruktureinrichtung);
      if (_.isNil(validationMessage)) {
        this.mode === DisplayMode.NEU && !_.isNil(this.infrastruktureinrichtung)
          ? this.createInfrastruktureinrichtung(this.infrastruktureinrichtung, true)
          : this.updateInfrastruktureinrichtung(this.infrastruktureinrichtung, true);
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
    infrastruktureinrichtungTyp: InfrastruktureinrichtungListElementDtoInfrastruktureinrichtungTypEnum | undefined,
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

  private async getInfrastruktureinrichtung(id: string): Promise<void> {
    if (!_.isNil(id)) {
      this.getInfrastruktureinrichtungById(id, false)
        .then((dto) => {
          this.$store.commit(
            Infrastruktureinrichtung.SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG,
            this.getModelOfDto(dto.infrastruktureinrichtungTyp, dto)
          );
        })
        .catch(() => {
          this.$store.commit(Infrastruktureinrichtung.SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG, undefined);
        });
    } else {
      this.$store.commit(
        Infrastruktureinrichtung.SEARCH_SELECTED_INFRASTRUKTUREINRICHTUNG,
        this.getModelOfDto(undefined, undefined)
      );
    }
  }

  private deleteInfrastruktureinrichtung(): void {
    this.deleteDialogOpen = true;
  }

  private async deleteInfrastruktureinrichtungTyp(id: string): Promise<void> {
    if (!_.isNil(id)) {
      await this.deleteInfrastruktureinrichtungById(id, false);
    }
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
