<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>{{ title }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headersDataTable"
            :items="itemsDataTable"
            :items-per-page="-1"
            dense
            hide-default-footer
            fixed-header
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { WohneinheitenProFoerderartProJahrDto } from "@/api/api-client/isi-backend";
import { DataTableHeader } from "vuetify";

type Item = {
  jahr: string;
  [x: string]: string;
};

@Component({ components: { FieldGroupCard } })
export default class WohneinheitenComponent extends Vue {
  @Prop()
  private title = "";

  @Prop()
  private wohneinheiten!: Array<WohneinheitenProFoerderartProJahrDto>;

  get headersDataTable(): Array<DataTableHeader> {
    const headers: Array<DataTableHeader> = [
      {
        text: "",
        value: "jahr",
        align: "center",
        sortable: false,
        divider: true,
      },
    ];

    for (const entry of this.wohneinheiten) {
      const existingHeader = headers.find((header) => header.text === entry.foerderart);
      if (!existingHeader) {
        headers.push({
          text: entry.foerderart,
          value: entry.foerderart,
          align: "center",
          sortable: false,
          divider: true,
        });
      }
    }

    return headers;
  }

  get itemsDataTable(): Array<Item> {
    const items: Array<Item> = [];

    for (const entry of this.wohneinheiten) {
      const existingItem = items.find((item) => item.jahr === entry.jahr);
      if (existingItem) {
        existingItem[entry.foerderart] = entry.wohneinheiten.toFixed(2);
      } else {
        items.push({
          jahr: entry.jahr,
          [entry.foerderart]: entry.wohneinheiten.toFixed(2),
        });
      }
    }

    return items;
  }
}
</script>
