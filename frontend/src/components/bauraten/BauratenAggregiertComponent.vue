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
                  <tr>
                    <td><span>Wohneinheiten</span></td>
                    <td
                      v-for="(item, index) in items"
                      :key="index"
                    >
                      {{ item.anzahlWeGeplant }}
                    </td>
                  </tr>
                  <tr>
                    <td><span>Geschossfläche</span></td>
                    <td
                      v-for="(item, index) in items"
                      :key="index"
                    >
                      {{ item.geschossflaecheWohnenGeplant }}
                    </td>
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
import { DataTableHeader } from "@/types/common/DataTableHeader";
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
    return this.bauratenAggregiert.length > 0;
  }

  private baurateMap: Map<number, BaurateDto> = new Map<number, BaurateDto>();

  /**
   * Erstellt eine Map mit Bauraten zu dem angegeben Property (Abfragevariante, Bauabschnitt, Baugebiet)
   * Der Key der Map ist das Jahr und der Value die aggregierten Werte der Bauraten
   */
  get bauratenAggregiert(): Array<BaurateDto> {
    if (!_.isNil(this.abfragevariante) && !_.isNil(this.abfragevariante.bauabschnitte)) {
      this.abfragevariante.bauabschnitte.forEach((bauabschnitt: BauabschnittDto) => {
        this.addBauratenBauabschnitt(bauabschnitt);
      });
    } else if (!_.isNil(this.bauabschnitt)) {
      this.addBauratenBauabschnitt(this.bauabschnitt);
    } else if (!_.isNil(this.baugebiet)) {
      this.addBauratenBaugebiet(this.baugebiet);
    }
    return _.sortBy(Array.from(this.baurateMap.values()), ["jahr"]);
  }

  private addBauratenBauabschnitt(bauabschnitt: BauabschnittDto): void {
    bauabschnitt.baugebiete.forEach((baugebiet: BaugebietDto) => {
      this.addBauratenBaugebiet(baugebiet);
    });
  }

  private addBauratenBaugebiet(baugebiet: BaugebietDto): void {
    baugebiet.bauraten.forEach((baurate: BaurateDto) => {
      const aggregated = this.baurateMap.get(baurate.jahr);
      if (!_.isNil(aggregated)) {
        this.aggregateValues(aggregated, baurate);
      } else {
        const clone = _.clone(baurate);
        this.baurateMap.set(clone.jahr, clone);
      }
    });
  }

  private aggregateValues(aggregated: BaurateDto, baurate: BaurateDto) {
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

  get bauratenJahreHeaders(): DataTableHeader[] {
    const headers = new Array<DataTableHeader>();
    headers.push(new DataTableHeader("Jahr", undefined, false));
    this.bauratenAggregiert.forEach((baurate: BaurateDto) => {
      headers.push(new DataTableHeader(baurate.jahr.toString(), undefined, false));
    });
    return headers;
  }

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
