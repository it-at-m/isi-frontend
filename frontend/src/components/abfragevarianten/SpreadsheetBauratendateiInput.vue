<template>
  <v-card
    class="mx-auto mt-10"
    outlined
  >
    <v-data-table
      :headers="headers"
      :items="tableData"
      class="elevation-1"
      fixed-header
    >
      <v-divider inset></v-divider>
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
      <!-- Dynamic Slot Name https://stackoverflow.com/a/67060576 -->
      <template #[`item.jahr`]="{ item }">
        <v-text-field
          v-if="isSameItem(item, itemToEdit)"
          v-model="itemToEdit['jahr']"
          :hide-details="true"
          dense
          maxlength="4"
          single-line
          :autofocus="true"
        ></v-text-field>
        <span v-else>{{ item["jahr"] }}</span>
      </template>
      <template
        v-for="(column, index) in forderartenForHeader"
        #[`item.${column}`]="item"
      >
        <num-field
          v-if="isSameItem(item, itemToEdit)"
          :key="`${column}_${item.jahr}_${index}`"
          v-model="itemToEdit['wohneinheiten']"
          :hide-details="true"
          dense
          single-line
        ></num-field>
        <span
          v-else
          :key="`${column}_${item.jahr}_${index}`"
        >
          {{ item["wohneinheiten"] }}
        </span>
      </template>
      <template #item.actions="{ item }">
        <div v-if="isSameItem(item, itemToEdit)">
          <v-icon
            color="red"
            class="mr-3"
            @click="closeTableItem"
          >
            mdi-window-close
          </v-icon>
          <v-icon
            color="green"
            @click="saveTableItem(item)"
          >
            mdi-content-save
          </v-icon>
        </div>
        <div v-else>
          <v-icon
            color="green"
            class="mr-3"
            @click="editTableItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            color="red"
            @click="deleteTableItem(item)"
          >
            mdi-delete
          </v-icon>
        </div>
      </template>
      <template #no-data>
        <span>Es sind keine Baurateninformationen vorhanden</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { DataTableHeader } from "vuetify";
import _ from "lodash";
import { WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";

export function createHeaders(foerderartenBauratendateiInputBasis: Array<string> | undefined): Array<DataTableHeader> {
  const headers = createHeadersForFoerderarten(foerderartenBauratendateiInputBasis);
  const headerForJahr = {
    text: "Jahr",
    value: "jahr",
    align: "start",
  } as DataTableHeader;
  headers.unshift(headerForJahr);
  return headers;
}

export function createHeadersForFoerderarten(
  foerderartenBauratendateiInputBasis: Array<string> | undefined,
): Array<DataTableHeader> {
  return _.uniq(_.toArray(foerderartenBauratendateiInputBasis)).map((headerFoerderart) => {
    return {
      text: headerFoerderart,
      value: headerFoerderart,
      align: "start",
    } as DataTableHeader;
  });
}

export function createTableData(
  bauratendateiInput: Array<WohneinheitenProFoerderartProJahrDto> | undefined,
): Array<any> {
  /**
   * Ermittlung der Wohneinheiten je Förderart je Jahr.
   */
  const jahrWithWohneinheitenForEachFoerderart = new Map<
    string | undefined,
    Map<string | undefined, number | undefined>
  >();
  for (const input of _.toArray(bauratendateiInput)) {
    if (jahrWithWohneinheitenForEachFoerderart.has(input.jahr)) {
      const foerderartWithWohneinheit = jahrWithWohneinheitenForEachFoerderart.get(input.jahr);
      if (!_.isNil(foerderartWithWohneinheit)) {
        foerderartWithWohneinheit.set(input.foerderart, input.wohneinheiten);
      }
    } else {
      const foerderartWithWohneinheit = new Map<string | undefined, number | undefined>();
      foerderartWithWohneinheit.set(input.foerderart, input.wohneinheiten);
      jahrWithWohneinheitenForEachFoerderart.set(input.jahr, foerderartWithWohneinheit);
    }
  }
  /**
   * Überführen der obig ermittelten Wohneinheiten je Förderart je Jahr in Objekte.
   *
   * {
   *   jahr: 2024,
   *   foerderart1: 1000,
   *   ...
   *   foerderartX: 2385
   * }
   */
  const tableDataObjects: Array<any> = [];
  jahrWithWohneinheitenForEachFoerderart.forEach((foerderartenWithWohneinheiten, jahr) => {
    const tableEntry = new Map<string | undefined, string | number | undefined>();
    tableEntry.set("jahr", jahr);
    foerderartenWithWohneinheiten.forEach((wohneinheiten, forderart) => {
      tableEntry.set(forderart, wohneinheiten);
    });
    tableDataObjects.push(Object.fromEntries(tableEntry.entries()));
  });
  return tableDataObjects;
}

/**
 *
 */
export function createBauratendateiInput(tableData: Array<any>): Array<WohneinheitenProFoerderartProJahrDto> {
  const newBauratendateiInput: Array<WohneinheitenProFoerderartProJahrDto> = [];
  tableData.forEach((tableEntry) => {
    const tableEntryMap = new Map(Object.entries(tableEntry));
    const jahr: string | undefined = tableEntryMap.get("jahr") as string | undefined;
    tableEntryMap.delete("jahr");
    tableEntryMap.forEach((wohneinheiten, foerderart) => {
      const wohneinheitenProFoerderartProJahr = {
        jahr: jahr,
        foerderart: foerderart,
        wohneinheiten: wohneinheiten,
      } as WohneinheitenProFoerderartProJahrDto;
      newBauratendateiInput.push(wohneinheitenProFoerderartProJahr);
    });
  });
  return newBauratendateiInput;
}

@Component({ components: { FieldGroupCard, NumField } })
export default class SpreadsheetBauratendateiInput extends Mixins(SaveLeaveMixin) {
  @VModel({ type: Array })
  private bauratendateiInput!: Array<WohneinheitenProFoerderartProJahrDto>;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop({ required: true })
  private foerderartenBauratendateiInputBasis!: Array<string>;

  private tableDataFromBauratendateiInput!: Array<any>;

  private editedItem: any | undefined = undefined;

  mounted(): void {
    this.tableDataFromBauratendateiInput = createTableData(this.bauratendateiInput);
  }

  get itemToEdit(): any {
    return _.isNil(this.editedItem) ? ({} as any) : this.editedItem;
  }

  get forderartenForHeader(): Array<string> {
    return _.cloneDeep(_.uniq(_.toArray(this.foerderartenBauratendateiInputBasis)));
  }

  get headers(): Array<DataTableHeader> {
    return createHeaders(this.foerderartenBauratendateiInputBasis);
  }

  get tableData(): Array<any> {
    return this.tableDataFromBauratendateiInput;
  }

  private isSameItem(item1: any | undefined, item2: any | undefined): boolean {
    return Object.is(item1, item2);
  }

  private addNewTableItem(): void {
    const newTableEntry = new Map<string | undefined, string | number | undefined>();
    newTableEntry.set("jahr", undefined);
    this.forderartenForHeader.forEach((forderart) => newTableEntry.set(forderart, undefined));
    this.tableDataFromBauratendateiInput.push(Object.fromEntries(newTableEntry.entries()));
  }

  private closeTableItem(): void {
    this.editedItem = undefined;
  }

  private saveTableItem(item: any): void {
    this.bauratendateiInput = createBauratendateiInput(this.tableDataFromBauratendateiInput);
    this.closeTableItem();
  }

  private editTableItem(item: any): void {
    this.editedItem = item;
  }

  private deleteTableItem(item: any): void {
    const index = _.findIndex(this.tableDataFromBauratendateiInput, (o) => {
      return this.isSameItem(o, item);
    });
    this.tableDataFromBauratendateiInput.splice(index, 1);
    this.bauratendateiInput = createBauratendateiInput(this.tableDataFromBauratendateiInput);
    this.closeTableItem();
  }
}
</script>
