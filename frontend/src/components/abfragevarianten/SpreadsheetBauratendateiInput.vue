<template>
  <v-data-table
    class="mt-3"
    :headers="headers"
    :items="tableDataFromBauratendateiInput"
    hide-default-footer
  >
    <template #[`item.jahr`]="{ item }">
      <v-text-field
        v-if="isSameItem(item, itemToEdit)"
        v-model="itemToEdit['jahr']"
        :hide-details="true"
        :rules="[digits, min4, pflichtfeld]"
        dense
        maxlength="4"
        single-line
      ></v-text-field>
      <span v-else>{{ item["jahr"] }}</span>
    </template>
    <template
      v-for="(column, index) in forderartenForHeader"
      #[`item.${column}`]="item"
    >
      <num-field
        v-if="isSameItem(item.item, itemToEdit)"
        :key="`${column}_${item.item.jahr}_${index}`"
        v-model="itemToEdit[column]"
        :hide-details="true"
        required
        dense
        :min="0"
        :precision="2"
        single-line
      ></num-field>
      <span
        v-else
        :key="`${column}_${item.item.jahr}_${index}`"
      >
        {{ toLocalizedTwoDecimals(item.item[column]) }}
      </span>
    </template>
    <template #[`item.gesamt`]="{ item }">
      <span>{{ roundToLocalizedTwoDecimals(item["gesamt"]) }}</span>
    </template>
    <template #item.actions="{ item }">
      <div v-if="isSameItem(item, itemToEdit)">
        <v-btn
          icon
          :disabled="!isEditable"
          @click="closeTableItem"
        >
          <v-icon> mdi-window-close </v-icon>
        </v-btn>
        <v-btn
          icon
          :disabled="!isEditable"
          @click="saveTableItem"
        >
          <v-icon> mdi-content-save </v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          icon
          :disabled="!isEditable"
          @click="editTableItem(item)"
        >
          <v-icon> mdi-pencil-outline </v-icon>
        </v-btn>
        <v-btn
          icon
          :disabled="!isEditable"
          @click="deleteTableItem(item)"
        >
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </div>
    </template>
    <template #no-data>
      <span>Es sind keine Baurateninformationen vorhanden</span>
    </template>
    <template #footer>
      <v-toolbar flat>
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="!isEditable"
          @click="addNewTableItem"
        >
          <v-icon>mdi-plus</v-icon>Neue Zeile
        </v-btn>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
import NumField from "@/components/common/NumField.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import {
  ATTRIBUTE_KEY_INDEX,
  ATTRIBUTE_KEY_JAHR,
  createBauratendateiInput,
  createHeaders,
  createTableData,
  ROUNDING_PRECISION,
} from "@/utils/BauratendateiUtils";
import { digits, min4, pflichtfeld } from "@/utils/FieldValidationRules";
import { defineModel } from "@/utils/Vue";
import _ from "lodash";
import { watch } from "vue";
import { DataTableHeader } from "vuetify";

interface Props {
  value: Array<WohneinheitenProFoerderartProJahrDto>;
  foerderartenBauratendateiInputBasis: Array<string>;
  isEditable: boolean;
}

interface Emits {
  (event: "input", value: Array<WohneinheitenProFoerderartProJahrDto>): void;
}
const props = withDefaults(defineProps<Props>(), { foerderartenBauratendateiInputBasis: () => [], isEditable: false });
const emit = defineEmits<Emits>();
const bauratendateiInput = defineModel(props, emit);
const { formChanged } = useSaveLeave();

let forderartenForHeader = ref<Array<string> | null>([]);

let headers = ref<Array<DataTableHeader> | null>([]);

let tableDataFromBauratendateiInput = ref<Array<any> | null>([]);

let itemToEdit = ref<any | null>({ index: -1 });

watch(() => bauratendateiInput, watchBauratendateiInput, { immediate: true, deep: true });

function watchBauratendateiInput(): void {
  headers.value = createHeaders(props.foerderartenBauratendateiInputBasis);
  forderartenForHeader.value = _.cloneDeep(_.uniq(_.toArray(props.foerderartenBauratendateiInputBasis)));
  tableDataFromBauratendateiInput.value = createTableData(bauratendateiInput.value);
}

function isSameItem(item1: any | undefined, item2: any | undefined): boolean {
  return item1.index === item2.index;
}

function addNewTableItem(): void {
  let maxIndex = 0;
  if (!_.isNil(tableDataFromBauratendateiInput.value) && !_.isNil(forderartenForHeader.value)) {
    tableDataFromBauratendateiInput.value.forEach((tableEntry) => (maxIndex = _.max([tableEntry.index, maxIndex])));
    const newTableEntry = new Map<string | undefined, string | number | undefined>();
    newTableEntry.set(ATTRIBUTE_KEY_JAHR, undefined);
    newTableEntry.set(ATTRIBUTE_KEY_INDEX, ++maxIndex);
    forderartenForHeader.value.forEach((forderart) => newTableEntry.set(forderart, undefined));
    const newTableEntryObject = Object.fromEntries(newTableEntry.entries());
    tableDataFromBauratendateiInput.value.push(newTableEntryObject);
    itemToEdit = _.cloneDeep(newTableEntryObject);
    formChanged();
  }
}

function closeTableItem(): void {
  itemToEdit = { index: -1 };
}

function saveTableItem(): void {
  if (!_.isNil(tableDataFromBauratendateiInput.value)) {
    const index = _.findIndex(tableDataFromBauratendateiInput.value, (tableItem) => {
      return isSameItem(tableItem, itemToEdit);
    });
    tableDataFromBauratendateiInput.value[index] = itemToEdit;
    bauratendateiInput.value = createBauratendateiInput(tableDataFromBauratendateiInput.value);
    closeTableItem();
  }
}

function editTableItem(item: any): void {
  itemToEdit = _.cloneDeep(item);
  formChanged();
}

function deleteTableItem(item: any): void {
  if (!_.isNil(tableDataFromBauratendateiInput.value)) {
    const index = _.findIndex(tableDataFromBauratendateiInput.value, (tableItem) => {
      return isSameItem(tableItem, item);
    });
    tableDataFromBauratendateiInput.value.splice(index, 1);
    bauratendateiInput.value = createBauratendateiInput(tableDataFromBauratendateiInput.value);
    formChanged();
  }
}

function roundToLocalizedTwoDecimals(wohneinheiten: number | undefined): string | undefined {
  const roundedWohneinheiten = _.round(_.isNil(wohneinheiten) ? 0 : wohneinheiten, ROUNDING_PRECISION);
  return toLocalizedTwoDecimals(roundedWohneinheiten);
}

function toLocalizedTwoDecimals(wohneinheiten: number | undefined): string | undefined {
  return _.isNil(wohneinheiten)
    ? wohneinheiten
    : new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: ROUNDING_PRECISION,
        maximumFractionDigits: ROUNDING_PRECISION,
      }).format(wohneinheiten);
}
</script>
