<template>
  <field-group-card :card-title="einrichutngstraegerCardTitle">
    <v-col
      cols="12"
      md="6"
    >
      <v-select
        id="infrastruktureinrichtung_einrichtungstraeger_dropdown"
        v-model="einrichtung.einrichtungstraeger"
        :items="einrichtungstraegerList"
        item-value="key"
        item-text="value"
        :rules="
          isEinrichtungstraegerRequired ? [fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified] : []
        "
        :disabled="!isEditable"
        @change="formChanged"
      >
        <template #label
          >Einrichtungsträger
          <span
            v-if="isEinrichtungstraegerRequired"
            class="secondary--text"
            >*</span
          ></template
        >
      </v-select>
    </v-col>
  </field-group-card>
</template>
<script lang="ts">
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import GrundschuleModel from "@/types/model/infrastruktureinrichtung/GrundschuleModel";
import GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import { LookupEntryDto } from "@/api/api-client/isi-backend";

@Component
export default class EinrichtungstraegerComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({
    type: [SchuleModel, KindergartenModel, GrundschuleModel, GsNachmittagBetreuungModel, HausFuerKinderModel],
  })
  einrichtung!: SchuleModel | KindergartenModel | GrundschuleModel | GsNachmittagBetreuungModel | HausFuerKinderModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop({ type: Boolean, default: true })
  private readonly isEinrichtungstraegerRequired!: boolean;

  @Prop({ type: Array, default: [] })
  private readonly einrichtungstraegerList!: LookupEntryDto[];

  private readonly einrichutngstraegerCardTitle = "Einrichtungsträger";
}
</script>

<style></style>
