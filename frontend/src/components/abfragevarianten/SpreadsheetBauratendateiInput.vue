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
        :rules="[fieldValidationRules.digits, fieldValidationRules.min4, fieldValidationRules.pflichtfeld]"
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

<script lang="ts">
import { Component, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { DataTableHeader } from "vuetify";
import _ from "lodash";
import { WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
import {
  ATTRIBUTE_KEY_INDEX,
  ATTRIBUTE_KEY_JAHR,
  createBauratendateiInput,
  createHeaders,
  createTableData,
  ROUNDING_PRECISION,
} from "@/utils/BauratendateiUtils";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";

@Component({ components: { FieldGroupCard, NumField } })
export default class SpreadsheetBauratendateiInput extends Mixins(SaveLeaveMixin, FieldValidationRulesMixin) {
  @VModel({ type: Array })
  private bauratendateiInput!: Array<WohneinheitenProFoerderartProJahrDto>;

  @Prop({ required: true, default: [] })
  private foerderartenBauratendateiInputBasis!: Array<string>;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private forderartenForHeader: Array<string> = [];

  private headers: Array<DataTableHeader> = [];

  private tableDataFromBauratendateiInput: Array<any> = [];

  private itemToEdit: any = { index: -1 };

  @Watch("bauratendateiInput", { immediate: true, deep: true })
  private watchBauratendateiInput(): void {
    this.headers = createHeaders(this.foerderartenBauratendateiInputBasis);
    this.forderartenForHeader = _.cloneDeep(_.uniq(_.toArray(this.foerderartenBauratendateiInputBasis)));
    this.tableDataFromBauratendateiInput = createTableData(this.bauratendateiInput);
  }

  private isSameItem(item1: any | undefined, item2: any | undefined): boolean {
    return item1.index === item2.index;
  }

  private addNewTableItem(): void {
    let maxIndex = 0;
    this.tableDataFromBauratendateiInput.forEach((tableEntry) => (maxIndex = _.max([tableEntry.index, maxIndex])));
    const newTableEntry = new Map<string | undefined, string | number | undefined>();
    newTableEntry.set(ATTRIBUTE_KEY_JAHR, undefined);
    newTableEntry.set(ATTRIBUTE_KEY_INDEX, ++maxIndex);
    this.forderartenForHeader.forEach((forderart) => newTableEntry.set(forderart, undefined));
    const newTableEntryObject = Object.fromEntries(newTableEntry.entries());
    this.tableDataFromBauratendateiInput.push(newTableEntryObject);
    this.itemToEdit = _.cloneDeep(newTableEntryObject);
    this.formChanged();
  }

  private closeTableItem(): void {
    this.itemToEdit = { index: -1 };
  }

  private saveTableItem(): void {
    const index = _.findIndex(this.tableDataFromBauratendateiInput, (tableItem) => {
      return this.isSameItem(tableItem, this.itemToEdit);
    });
    this.tableDataFromBauratendateiInput[index] = this.itemToEdit;
    this.bauratendateiInput = createBauratendateiInput(this.tableDataFromBauratendateiInput);
    this.closeTableItem();
  }

  private editTableItem(item: any): void {
    this.itemToEdit = _.cloneDeep(item);
    this.formChanged();
  }

  private deleteTableItem(item: any): void {
    const index = _.findIndex(this.tableDataFromBauratendateiInput, (tableItem) => {
      return this.isSameItem(tableItem, item);
    });
    this.tableDataFromBauratendateiInput.splice(index, 1);
    this.bauratendateiInput = createBauratendateiInput(this.tableDataFromBauratendateiInput);
    this.formChanged();
  }

  private roundToLocalizedTwoDecimals(wohneinheiten: number | undefined): string | undefined {
    const roundedWohneinheiten = _.round(_.isNil(wohneinheiten) ? 0 : wohneinheiten, ROUNDING_PRECISION);
    return this.toLocalizedTwoDecimals(roundedWohneinheiten);
  }

  private toLocalizedTwoDecimals(wohneinheiten: number | undefined): string | undefined {
    return _.isNil(wohneinheiten)
      ? wohneinheiten
      : new Intl.NumberFormat("de-DE", {
          minimumFractionDigits: ROUNDING_PRECISION,
          maximumFractionDigits: ROUNDING_PRECISION,
        }).format(wohneinheiten);
  }
}
</script>
