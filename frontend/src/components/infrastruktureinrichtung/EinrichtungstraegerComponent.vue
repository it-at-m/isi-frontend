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
        :rules="isEinrichtungstraegerRequired ? [pflichtfeld, notUnspecified] : []"
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
<script setup lang="ts">
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import { defineModel } from "@/utils/Vue";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  value: InfrastruktureinrichtungModel;
  isEditable?: boolean;
  isEinrichtungstraegerRequired?: boolean;
  einrichtungstraegerList?: LookupEntryDto[];
}

interface Emits {
  (event: "input", value: InfrastruktureinrichtungModel): void;
}

const { formChanged } = useSaveLeave();
const props = withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: true });
const emit = defineEmits<Emits>();
const einrichtung = defineModel(props, emit);
const einrichutngstraegerCardTitle = "Einrichtungsträger";
</script>
