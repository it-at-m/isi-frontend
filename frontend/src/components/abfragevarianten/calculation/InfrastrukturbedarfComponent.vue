<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> {{ title }} </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            style="border: 0.5px lightgray solid"
            :headers="headersDataTable"
            :items="infrastrukturBedarfeProJahr"
            :items-per-page="-1"
            :item-class="rowClasses"
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
      { text: "Jahr", value: "jahr", align: "center", sortable: false, width: "25%", divider: true },
      {
        text: "Kinder gesamt",
        value: "anzahlKinderGesamt",
        align: "center",
        sortable: false,
        width: "25%",
        divider: true,
      },
      {
        text: "Kinder zu versorgen",
        value: "anzahlKinderZuVersorgen",
        align: "center",
        sortable: false,
        width: "25%",
        divider: true,
      },
      { text: "Gruppen", value: "anzahlGruppen", align: "center", sortable: false, width: "25%", divider: true },
    ];
  }

  private rowClasses(infrastrukturBedarfeProJahr: InfrastrukturbedarfProJahrDto) {
    if (_.includes(infrastrukturBedarfeProJahr.jahr, this.JAHR_MITTELWERT)) {
      return "blue-grey lighten-4 font-weight-bold";
    }
  }

  mounted(): void {
    this.infrastrukturBedarfeProJahr = [
      {
        jahr: "2000",
        anzahlKinderGesamt: 100,
        anzahlKinderZuVersorgen: 50,
        anzahlGruppen: 1.4,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2001",
        anzahlKinderGesamt: 101,
        anzahlKinderZuVersorgen: 51,
        anzahlGruppen: 1.41,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2002",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2003",
        anzahlKinderGesamt: 103,
        anzahlKinderZuVersorgen: 53,
        anzahlGruppen: 1.43,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2004",
        anzahlKinderGesamt: 104,
        anzahlKinderZuVersorgen: 54,
        anzahlGruppen: 1.44,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2005",
        anzahlKinderGesamt: 105,
        anzahlKinderZuVersorgen: 55,
        anzahlGruppen: 1.45,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2006",
        anzahlKinderGesamt: 106,
        anzahlKinderZuVersorgen: 56,
        anzahlGruppen: 1.46,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2007",
        anzahlKinderGesamt: 107,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2008",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2009",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2010",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2011",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2012",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2013",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2014",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2015",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2016",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2017",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2018",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2019",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "Mittelwert 10 J.",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "Mittelwert 15 J.",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "Mittelwert 20 J.",
        anzahlKinderGesamt: 102,
        anzahlKinderZuVersorgen: 52,
        anzahlGruppen: 1.42,
      } as InfrastrukturbedarfProJahrDto,
    ];
  }
}
</script>
