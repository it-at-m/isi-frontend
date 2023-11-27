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

  mounted(): void {
    this.infrastrukturBedarfeProJahr = [
      {
        jahr: "2000",
        anzahlPersonenGesamt: 100,
        anzahlPersonenZuVersorgen: 50,
        anzahlGruppen: 1.4,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2001",
        anzahlPersonenGesamt: 101,
        anzahlPersonenZuVersorgen: 51,
        anzahlGruppen: 1.41,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2002",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2003",
        anzahlPersonenGesamt: 103,
        anzahlPersonenZuVersorgen: 53,
        anzahlGruppen: 1.43,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2004",
        anzahlPersonenGesamt: 104,
        anzahlPersonenZuVersorgen: 54,
        anzahlGruppen: 1.44,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2005",
        anzahlPersonenGesamt: 105,
        anzahlPersonenZuVersorgen: 55,
        anzahlGruppen: 1.45,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2006",
        anzahlPersonenGesamt: 106,
        anzahlPersonenZuVersorgen: 56,
        anzahlGruppen: 1.46,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2007",
        anzahlPersonenGesamt: 107,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2008",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2009",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2010",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2011",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2012",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2013",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2014",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2015",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2016",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2017",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2018",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2019",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "Mittelwert 10 J.",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "Mittelwert 15 J.",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "Mittelwert 20 J.",
        anzahlPersonenGesamt: 102,
        anzahlPersonenZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
    ];
  }
}
</script>
