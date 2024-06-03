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
        item-title="value"
        :rules="isEinrichtungstraegerRequired ? [pflichtfeld, notUnspecified] : []"
        :disabled="!isEditable"
        @update:model-value="formChanged"
      >
        <template #label>
          Einrichtungsträger
          <span
            v-if="isEinrichtungstraegerRequired"
            class="text--secondary"
          >
            *
          </span>
        </template>
      </v-select>
    </v-col>
  </field-group-card>
</template>
<script setup lang="ts">
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import type { LookupEntryDto } from "@/api/api-client/isi-backend";
import { useSaveLeave } from "@/composables/SaveLeave";
import type GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import type HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import type KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import type SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";

interface Props {
  isEditable?: boolean;
  isEinrichtungstraegerRequired?: boolean;
  einrichtungstraegerList?: LookupEntryDto[];
}

const { formChanged } = useSaveLeave();
withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: true });
const einrichtung = defineModel<SchuleModel | KindergartenModel | GsNachmittagBetreuungModel | HausFuerKinderModel>({
  required: true,
});
const einrichutngstraegerCardTitle = "Einrichtungsträger";
</script>
