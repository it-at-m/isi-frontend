<template>
  <v-data-table
    class="mt-3"
    :headers="headers"
    :items="tableDataFromBauratendateiInput"
    hide-default-footer
  >
    <template #item.jahr="{ item }">
      <v-text-field
        v-if="isSameItem(item, itemToEdit)"
        v-model="itemToEdit['jahr']"
        :hide-details="true"
        :rules="[digits, min4, pflichtfeld]"
        density="compact"
        maxlength="4"
        single-line
      />
      <span v-else>{{ item["jahr"] }}</span>
    </template>
    <template
      v-for="(column, index) in forderartenForHeader"
      :key="`${column}_${index}`"
      #[`item.${column}`]="{ item }"
    >
      <num-field
        v-if="isSameItem(item.item, itemToEdit)"
        v-model="itemToEdit[column]"
        :hide-details="true"
        required
        dense
        :min="0"
        :precision="2"
        single-line
      />
      <span v-else>
        {{ toLocalizedTwoDecimals(item.item[column]) }}
      </span>
    </template>
    <template #item.gesamt="{ item }">
      <span>{{ roundToLocalizedTwoDecimals(item["gesamt"]) }}</span>
    </template>
    <template #item.actions="{ item }">
      <div v-if="isSameItem(item, itemToEdit)">
        <v-btn
          icon="mdi-window-close"
          variant="plain"
          :disabled="!isEditable"
          @click="closeTableItem"
        />
        <v-btn
          icon="mdi-content-save"
          variant="plain"
          :disabled="!isEditable"
          @click="saveTableItem"
        />
      </div>
      <div v-else>
        <v-btn
          icon="mdi-pencil-outline"
          variant="plain"
          :disabled="!isEditable"
          @click="editTableItem(item)"
        />
        <v-btn
          icon="mdi-delete"
          variant="plain"
          :disabled="!isEditable"
          @click="deleteTableItem(item)"
        />
      </div>
    </template>
    <template #no-data>
      <span>Es sind keine Baurateninformationen vorhanden</span>
    </template>
    <template #bottom>
      <v-toolbar
        color="transparent"
        flat
      >
        <v-spacer />
        <v-btn
          color="primary"
          style="width: 200px"
          variant="flat"
          prepend-icon="mdi-plus"
          :disabled="!isEditable"
          @click="addNewTableItem"
          v-text="'Neue Zeile'"
        />
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
import type DataTableHeader from "@/types/common/DataTableHeader";
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
import _ from "lodash";

interface Props {
  foerderartenBauratendateiInputBasis: Array<string | undefined>;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), { foerderartenBauratendateiInputBasis: () => [], isEditable: false });
const bauratendateiInput = defineModel<Array<WohneinheitenProFoerderartProJahrDto>>({ required: true });
const { formChanged } = useSaveLeave();

const forderartenForHeader = ref<Array<string>>([]);

const headers = ref<Array<DataTableHeader>>([]);

const tableDataFromBauratendateiInput = ref<Array<any>>([]);

const itemToEdit = ref<any>({ index: -1 });

watch(() => bauratendateiInput, watchBauratendateiInput, { immediate: true, deep: true });

function watchBauratendateiInput(): void {
  headers.value = createHeaders(props.foerderartenBauratendateiInputBasis);
  forderartenForHeader.value = _.cloneDeep(
    _.uniq(_.toArray(props.foerderartenBauratendateiInputBasis)).filter((v) => v !== undefined),
  ) as string[];
  tableDataFromBauratendateiInput.value = createTableData(bauratendateiInput.value);
}

function isSameItem(item1: any | undefined, item2: any | undefined): boolean {
  return item1.index === item2.index;
}

function addNewTableItem(): void {
  let maxIndex = 0;
  if (!_.isNil(tableDataFromBauratendateiInput.value) && !_.isNil(forderartenForHeader.value)) {
    tableDataFromBauratendateiInput.value.forEach(
      (tableEntry) => (maxIndex = _.max([tableEntry.index, maxIndex]) ?? 0),
    );
    const newTableEntry = new Map<string | undefined, string | number | undefined>();
    newTableEntry.set(ATTRIBUTE_KEY_JAHR, undefined);
    newTableEntry.set(ATTRIBUTE_KEY_INDEX, ++maxIndex);
    forderartenForHeader.value.forEach((forderart) => newTableEntry.set(forderart, undefined));
    const newTableEntryObject = Object.fromEntries(newTableEntry.entries());
    tableDataFromBauratendateiInput.value.push(newTableEntryObject);
    itemToEdit.value = _.cloneDeep(newTableEntryObject);
    formChanged();
  }
}

function closeTableItem(): void {
  itemToEdit.value = { index: -1 };
}

function saveTableItem(): void {
  if (!_.isNil(tableDataFromBauratendateiInput.value)) {
    const index = _.findIndex(tableDataFromBauratendateiInput.value, (tableItem) => {
      return isSameItem(tableItem, itemToEdit.value);
    });
    tableDataFromBauratendateiInput.value[index] = itemToEdit.value;
    bauratendateiInput.value = createBauratendateiInput(tableDataFromBauratendateiInput.value);
    closeTableItem();
  }
}

function editTableItem(item: any): void {
  itemToEdit.value = _.cloneDeep(item);
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
