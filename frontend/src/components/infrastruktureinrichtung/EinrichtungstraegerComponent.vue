<template>
  <v-select
    id="infrastruktureinrichtung_einrichtungstraeger_dropdown"
    v-model="infrastruktureinrichtung.einrichtungstraeger"
    :items="einrichtungstraegerList"
    item-value="key"
    item-text="value"
    :rules="
      isEinrichtungstraegerRequired() ? [fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified] : []
    "
    :disabled="!isEditable"
    @change="formChanged"
  >
    <template #label
      >Einrichtungsträger
      <span
        v-if="isEinrichtungstraegerRequired()"
        class="secondary--text"
        >*</span
      ></template
    >
  </v-select>
</template>

<script lang="ts">
import {
  GsNachmittagBetreuungDtoEinrichtungstraegerEnum,
  HausFuerKinderDtoEinrichtungstraegerEnum,
  KindergartenDtoEinrichtungstraegerEnum,
  KinderkrippeDtoEinrichtungstraegerEnum,
  SchuleDtoEinrichtungstraegerEnum,
} from "@/api/api-client/isi-backend";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class EinrichtungstraegerComponent extends Vue {
  @Prop()
  private einrichtungstraeger:
    | SchuleDtoEinrichtungstraegerEnum
    | KinderkrippeDtoEinrichtungstraegerEnum
    | KindergartenDtoEinrichtungstraegerEnum
    | HausFuerKinderDtoEinrichtungstraegerEnum
    | GsNachmittagBetreuungDtoEinrichtungstraegerEnum
    | undefined;
}
</script>

<style></style>
