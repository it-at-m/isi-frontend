<template>
  <v-card
    class="mx-auto mt-10"
    outlined
  >
    <v-data-table
      :headers="headers"
      :items="tableDataFromBauratendateiInput"
      hide-default-footer
    >
      <template #top>
        <v-toolbar
          flat
          color="white"
        >
          <div class="d-flex">
            <v-btn
              color="primary"
              class="ml-2"
              @click="addNewTableItem"
            >
              <v-icon dark>mdi-plus</v-icon>Add
            </v-btn>
          </div>
        </v-toolbar>
      </template>
      <template #[`item.jahr`]="{ item }">
        <v-text-field
          v-if="isSameItem(item, itemToEdit)"
          v-model="itemToEdit['jahr']"
          :hide-details="true"
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
          dense
          min="0"
          precision="2"
          single-line
        ></num-field>
        <span
          v-else
          :key="`${column}_${item.item.jahr}_${index}`"
        >
          {{ item.item[column] }}
        </span>
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
            <v-icon> mdi-pencil </v-icon>
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
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { DataTableHeader } from "vuetify";
import _ from "lodash";
import { WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
import { createBauratendateiInput, createHeaders, createTableData } from "@/utils/BauratendateiUtils";

@Component({ components: { FieldGroupCard, NumField } })
export default class SpreadsheetBauratendateiInput extends Mixins(SaveLeaveMixin) {
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
    newTableEntry.set("jahr", undefined);
    newTableEntry.set("index", ++maxIndex);
    this.forderartenForHeader.forEach((forderart) => newTableEntry.set(forderart, undefined));
    const newTableEntryObject = Object.fromEntries(newTableEntry.entries());
    this.tableDataFromBauratendateiInput.push(newTableEntryObject);
    this.itemToEdit = _.cloneDeep(newTableEntryObject);
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
  }

  private deleteTableItem(item: any): void {
    const index = _.findIndex(this.tableDataFromBauratendateiInput, (tableItem) => {
      return this.isSameItem(tableItem, item);
    });
    this.tableDataFromBauratendateiInput.splice(index, 1);
    this.bauratendateiInput = createBauratendateiInput(this.tableDataFromBauratendateiInput);
  }
}
</script>
