<template>
  <div v-if="showResult">
    <field-group-card :card-title="header">
      <v-row justify="center">
        <v-col cols="12">
          <v-container class="table">
            <v-data-table
              :headers="bauratenJahreHeaders"
              :items="bauratenAggregiert"
              hide-default-footer
            >
              <template #header="{ text }">
                <span>{{ text }}</span>
              </template>
              <template #body="{ items }">
                <tbody>
                  <tr
                    v-for="(item, index) in items"
                    :key="index"
                  >
                    <td>{{ item.jahr }}</td>
                    <td>{{ item.anzahlWeGeplant }}</td>
                    <td>{{ item.geschossflaecheWohnenGeplant }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-container>
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { AbfragevarianteDto, BauabschnittDto, BaugebietDto, BaurateDto } from "@/api/api-client/isi-backend";
import _ from "lodash";

@Component({ components: { FieldGroupCard } })
export default class BauratenAggregiertComponent extends Vue {
  @Prop()
  private abfragevariante!: AbfragevarianteDto;

  @Prop()
  private bauabschnitt!: BauabschnittDto;

  @Prop()
  private baugebiet!: BaugebietDto;

  get showResult(): boolean {
    return true;
    //return this.isInitialized && this.getBauratenAggregiert().length > 0;
  }

  private baurateMap: Map<number, BaurateDto> = new Map<number, BaurateDto>();

  /**
   * Erstellt eine Map mit Bauraten zu dem angegeben Property (Abfragevariante, Bauabschnitt, Baugebiet)
   * Der Key der Map ist das Jahr und der Value die aggregierten Werte der Bauraten
   */
  get bauratenAggregiert(): Array<BaurateDto> {
    console.log("label 1");
    if (!_.isNil(this.abfragevariante) && !_.isNil(this.abfragevariante.bauabschnitte)) {
      console.log("label 2");
      this.abfragevariante.bauabschnitte.forEach((bauabschnitt: BauabschnittDto) => {
        this.addBauratenBauabschnitt(bauabschnitt);
      });
    } else if (!_.isNil(this.bauabschnitt)) {
      this.addBauratenBauabschnitt(this.bauabschnitt);
    } else if (!_.isNil(this.baugebiet)) {
      this.addBauratenBaugebiet(this.baugebiet);
    }
    console.log("#Map: " + this.baurateMap.size);
    const test = _.sortBy(Array.from(this.baurateMap.values()), ["jahr"]);
    console.log("#[]: " + test.length);
    test.forEach((item: BaurateDto) => console.log("jahr: " + item.jahr));
    return test;
  }

  private addBauratenBauabschnitt(bauabschnitt: BauabschnittDto): void {
    console.log("label 3");
    bauabschnitt.baugebiete.forEach((baugebiet: BaugebietDto) => {
      this.addBauratenBaugebiet(baugebiet);
    });
  }

  private addBauratenBaugebiet(baugebiet: BaugebietDto): void {
    console.log("label 4");
    this.addBauraten(baugebiet.bauraten);
  }
  private addBauraten(bauraten: BaurateDto[]): void {
    console.log("label 5");
    bauraten.forEach((baurate: BaurateDto) => {
      const aggregated = this.baurateMap.get(baurate.jahr);
      if (!_.isNil(aggregated)) {
        this.aggregateValues(aggregated, baurate);
      } else {
        this.baurateMap.set(baurate.jahr, baurate);
      }
    });
  }

  private aggregateValues(aggregated: BaurateDto, baurate: BaurateDto) {
    console.log("label 6");
    if (!_.isNil(baurate.anzahlWeGeplant)) {
      if (_.isNil(aggregated.anzahlWeGeplant)) {
        aggregated.anzahlWeGeplant = 0;
      }
      aggregated.anzahlWeGeplant += baurate.anzahlWeGeplant;
    }
    if (!_.isNil(baurate.geschossflaecheWohnenGeplant)) {
      if (_.isNil(aggregated.geschossflaecheWohnenGeplant)) {
        aggregated.geschossflaecheWohnenGeplant = 0;
      }
      aggregated.geschossflaecheWohnenGeplant += baurate.geschossflaecheWohnenGeplant;
    }
  }

  private bauratenJahreHeaders = [
    { text: "Jahr", value: "jahr", sortable: false },
    { text: "Wohneinheiten", value: "anzahlWeGeplant", sortable: false },
    { text: "Geschossfläche", value: "geschossflaecheWohnenGeplant", sortable: false },
  ];

  get header(): string {
    if (!_.isNil(this.abfragevariante)) {
      return "Bauraten der Abfragevariante";
    } else if (!_.isNil(this.bauabschnitt)) {
      return "Bauraten des Bauabschnitts";
    } else if (!_.isNil(this.baugebiet)) {
      return "Bauraten des Baugebiets";
    }
    return "";
  }
}
</script>
