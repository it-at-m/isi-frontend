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
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable?: boolean;
  isEinrichtungstraegerRequired?: boolean;
  einrichtungstraegerList?: LookupEntryDto[];
}

const { formChanged } = useSaveLeave();
withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: true });
const einrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });
const einrichutngstraegerCardTitle = "Einrichtungsträger";
</script>
