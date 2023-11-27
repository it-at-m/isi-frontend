<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> {{ title }} </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headersDataTable"
            :items="personenProJahr"
            :items-per-page="-1"
            :item-class="rowClasses"
            dense
            hide-default-footer
            fixed-header
          >
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
import { InfrastrukturbedarfProJahrDto, PersonenProJahrDto } from "@/api/api-client/isi-backend";
import { DataTableHeader } from "vuetify";
import _ from "lodash";

@Component({ components: { FieldGroupCard, NumField } })
export default class InfrastrukturbedarfComponent extends Vue {
  private readonly JAHR_MITTELWERT: string = "Mittelwert";

  private title = "Alle Einwohner";

  @Prop()
  private personenProJahr!: Array<PersonenProJahrDto>;

  get headersDataTable(): Array<DataTableHeader> {
    return [
      {
        text: "Jahr",
        value: "jahr",
        align: "center",
        sortable: false,
        width: "50%",
        divider: true,
      },
      {
        text: "Einwohner gesamt",
        value: "anzahlPersonenGesamt",
        align: "center",
        sortable: false,
        width: "50%",
        divider: true,
      },
    ];
  }

  private rowClasses(infrastrukturBedarfeProJahr: InfrastrukturbedarfProJahrDto) {
    if (_.includes(infrastrukturBedarfeProJahr.jahr, this.JAHR_MITTELWERT)) {
      return "blue-grey lighten-5";
    }
  }

  mounted(): void {
    this.personenProJahr = [
      {
        jahr: "2000",
        anzahlPersonenGesamt: 100,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2001",
        anzahlPersonenGesamt: 101,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2002",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2003",
        anzahlPersonenGesamt: 103,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2004",
        anzahlPersonenGesamt: 104,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2005",
        anzahlPersonenGesamt: 105,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2006",
        anzahlPersonenGesamt: 106,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2007",
        anzahlPersonenGesamt: 107,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2008",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2009",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2010",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2011",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2012",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2013",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2014",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2015",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2016",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2017",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2018",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "2019",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "Mittelwert 10 J.",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "Mittelwert 15 J.",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
      {
        jahr: "Mittelwert 20 J.",
        anzahlPersonenGesamt: 102,
      } as InfrastrukturbedarfProJahrDto,
    ];
  }
}
</script>
