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
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import { DataTableHeader } from "@/types/common/DataTableHeader";
import _ from "lodash";

@Component({ components: { FieldGroupCard } })
export default class BauratenAggregiertComponent extends Vue {
  @Prop()
  private aggregateBauraten!: AbfragevarianteModel | BauabschnittModel | BaugebietModel;

  get showResult(): boolean {
    return this.bauratenAggregiert.length > 0;
  }

  private baurateMap: Map<number, BaurateModel> = new Map<number, BaurateModel>();

  /**
   * Erstellt eine Map mit Bauraten zu dem angegeben Property aggregateBauraten
   * Der Key der Map ist das Jahr und der Value die aggregierten Werte der Bauraten
   */
  get bauratenAggregiert(): Array<BaurateModel> {
    if (!_.isNil(this.aggregateBauraten)) {
      if (this.aggregateBauraten instanceof AbfragevarianteModel) {
        const abfragevariante: AbfragevarianteModel = this.aggregateBauraten as AbfragevarianteModel;
        if (!_.isNil(abfragevariante.bauabschnitte)) {
          abfragevariante.bauabschnitte.forEach((bauabschnitt: BauabschnittModel) => {
            this.addBauratenBauabschnitt(bauabschnitt);
          });
        }
      } else if (this.aggregateBauraten instanceof BauabschnittModel) {
        this.addBauratenBauabschnitt(this.aggregateBauraten as BauabschnittModel);
      } else if (this.aggregateBauraten instanceof BaugebietModel) {
        this.addBauratenBaugebiet(this.aggregateBauraten as BaugebietModel);
      }
    }
    return _.sortBy(Array.from(this.baurateMap.values()), ["jahr"]);
  }

  private addBauratenBauabschnitt(bauabschnitt: BauabschnittModel): void {
    bauabschnitt.baugebiete.forEach((baugebiet: BaugebietModel) => {
      this.addBauratenBaugebiet(baugebiet);
    });
  }

  private addBauratenBaugebiet(baugebiet: BaugebietModel): void {
    baugebiet.bauraten.forEach((baurate: BaurateModel) => {
      const aggregated = this.baurateMap.get(baurate.jahr);
      if (!_.isNil(aggregated)) {
        this.aggregateValues(aggregated, baurate);
      } else {
        const clone = _.clone(baurate);
        this.baurateMap.set(clone.jahr, clone);
      }
    });
  }

  private aggregateValues(aggregated: BaurateModel, baurate: BaurateModel) {
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
    this.bauratenAggregiert.forEach((baurate: BaurateModel) => {
      headers.push(new DataTableHeader(baurate.jahr.toString(), undefined, false));
    });
    return headers;
  }

  get header(): string {
    if (!_.isNil(this.aggregateBauraten)) {
      if (this.aggregateBauraten instanceof AbfragevarianteModel) {
        return "Bauraten der Abfragevariante";
      } else if (this.aggregateBauraten instanceof BauabschnittModel) {
        return "Bauraten des Bauabschnitts";
      } else if (this.aggregateBauraten instanceof BaugebietModel) {
        return "Bauraten des Baugebiets";
      }
    }
    return "";
  }
}
</script>
