<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> {{ title }} </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headersDataTable"
            :items="infrastrukturBedarfeProJahr"
            :items-per-page="-1"
            :item-class="rowClasses"
            dense
            hide-default-footer
            fixed-header
          >
            <template #item.anzahlGruppen="{ item }">
              {{ roundToFixedTwoDecimals(item.anzahlGruppen) }}
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import { InfrastrukturbedarfProJahrDto } from "@/api/api-client/isi-backend";
import { DataTableHeader } from "vuetify";
import _ from "lodash";

@Component({ components: { FieldGroupCard, NumField } })
export default class InfrastrukturbedarfComponent extends Vue {
  private readonly JAHR_MITTELWERT: string = "Mittelwert";

  @Prop()
  private title = "";

  @Prop()
  private infrastrukturBedarfeProJahr!: Array<InfrastrukturbedarfProJahrDto>;

  get headersDataTable(): Array<DataTableHeader> {
    return [
      {
        text: "Jahr",
        value: "jahr",
        align: "center",
        sortable: false,
        width: "25%",
        divider: true,
      },
      {
        text: "Kinder gesamt",
        value: "anzahlPersonenGesamt",
        align: "center",
        sortable: false,
        width: "25%",
        divider: true,
      },
      {
        text: "Kinder zu versorgen",
        value: "anzahlPersonenZuVersorgen",
        align: "center",
        sortable: false,
        width: "25%",
        divider: true,
      },
      { text: "Gruppen", value: "anzahlGruppen", align: "center", sortable: false, width: "25%", divider: false },
    ];
  }

  private rowClasses(infrastrukturBedarfeProJahr: InfrastrukturbedarfProJahrDto) {
    if (_.includes(infrastrukturBedarfeProJahr.jahr, this.JAHR_MITTELWERT)) {
      return "blue-grey lighten-5";
    }
  }

  private roundToFixedTwoDecimals(value: number): string {
    return value.toFixed(2);
  }
}
</script>
