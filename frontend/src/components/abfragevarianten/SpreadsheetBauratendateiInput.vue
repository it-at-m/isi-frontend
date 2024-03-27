<template>
  <v-card
    class="mx-auto mt-10"
    max-width="600"
    outlined
  >
    <v-card-title>Vuetify Inline Editor Table </v-card-title>
    <v-data-table
      :headers="headers"
      :items="tableData"
      class="elevation-1"
      fixed-header
      height="350px"
    >
      <v-divider inset></v-divider>
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <div class="d-flex">
            <v-btn
              color="primary"
              class="ml-2"
              @click="addNew"
            >
              <v-icon dark>mdi-plus</v-icon>Add
            </v-btn>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:item.name="{ item }">
        <v-text-field
          v-model="editedItem.name"
          :hide-details="true"
          dense
          single-line
          :autofocus="true"
          v-if="item.id === editedItem.id"
        ></v-text-field>
        <span v-else>{{ item.name }}</span>
      </template>
      <template v-slot:item.calories="{ item }">
        <v-text-field
          v-model="editedItem.calories"
          :hide-details="true"
          dense
          single-line
          v-if="item.id === editedItem.id"
        ></v-text-field>
        <span v-else>{{ item.calories }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <div v-if="item.id === editedItem.id">
          <v-icon
            color="red"
            class="mr-3"
            @click="close"
          >
            mdi-window-close
          </v-icon>
          <v-icon
            color="green"
            @click="save"
          >
            mdi-content-save
          </v-icon>
        </div>
        <div v-else>
          <v-icon
            color="green"
            class="mr-3"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            color="red"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
          >Reset</v-btn
        >
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

@Component({ components: { FieldGroupCard, NumField } })
export default class SpreadsheetBauratendateiInput extends Mixins(SaveLeaveMixin) {
  @VModel({ type: Array })
  private bauratendateiInput!: Array<WohneinheitenProFoerderartProJahrDto>;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get headers(): Array<DataTableHeader> {
    const headers = this.headersForFoerderarten;
    const headerForJahr = {
      text: "Jahr",
      value: "jahr",
      align: "start",
    } as DataTableHeader;
    headers.unshift(headerForJahr);
    return headers;
  }

  get headersForFoerderarten(): Array<DataTableHeader> {
    return _.uniq(
      _.toArray(this.bauratendateiInput).map(
        (wohneinheitenProFoerderartProJahr) => wohneinheitenProFoerderartProJahr.foerderart,
      ),
    ).map((headerFoerderart) => {
      return {
        text: headerFoerderart,
        value: headerFoerderart,
        align: "start",
      } as DataTableHeader;
    });
  }

  get tableData(): Array<any> {
    const foerderartenWithWohneinheitenForJahr: Map<
      string | undefined,
      Map<string | undefined, number | undefined>
    > = new Map();
    for (const input of _.toArray(this.bauratendateiInput)) {
      if (foerderartenWithWohneinheitenForJahr.has(input.jahr)) {
        const foerderartWithWohneinheit = foerderartenWithWohneinheitenForJahr.get(input.jahr);
        if (!_.isNil(foerderartWithWohneinheit)) {
          foerderartWithWohneinheit.set(input.foerderart, input.wohneinheiten);
        }
      } else {
        const foerderartWithWohneinheit: Map<string | undefined, number | undefined> = new Map();
        foerderartWithWohneinheit.set(input.foerderart, input.wohneinheiten);
        foerderartenWithWohneinheitenForJahr.set(input.jahr, foerderartWithWohneinheit);
      }
    }
    const tableDataObjects: Array<any> = [];
    foerderartenWithWohneinheitenForJahr.forEach((foerderartenWithWohneinheiten, jahr) => {
      const tableEntry = new Map<string | undefined, string | number | undefined>();
      tableEntry.set("jahr", jahr);
      foerderartenWithWohneinheiten.forEach((wohneinheiten, forderart) => {
        tableEntry.set(forderart, wohneinheiten);
      });
      tableDataObjects.push(Object.fromEntries(tableEntry.entries()));
    });
    return tableDataObjects;
  }
}
</script>
