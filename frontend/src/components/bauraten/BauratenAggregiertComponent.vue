<template>
  <div v-if="showResult">
    <field-group-card :card-title="header">
      <v-row justify="center">
        <v-col cols="12">
          <v-container class="table">
            <v-data-table
              :headers="bauratenJahreHeaders"
              :items="aggregatedBauraten"
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
import { BauabschnittDto, BaugebietDto, BaurateDto } from "@/api/api-client/isi-backend";
import _ from "lodash";

@Component({ components: { FieldGroupCard } })
export default class BauratenAggregiertComponent extends Vue {
  @Prop()
  private aggregateBauraten!: AbfragevarianteModel | BauabschnittModel | BaugebietModel;

  get showResult(): boolean {
    return this.aggregatedBauraten.length > 0;
  }

  private baurateMap: Map<number, BaurateModel> = new Map<number, BaurateModel>();

  /**
   * Erstellt eine Map mit Bauraten zu dem angegebenen Property aggregateBauraten
   * Der Key der Map ist das Jahr und der Value die aggregierten Werte der Bauraten
   */

  get aggregatedBauraten(): Array<BaurateModel> {
    if (!_.isNil(this.aggregateBauraten)) {
      this.bauratenAggregation(this.extraktBauraten(this.aggregateBauraten));
    }
    return _.sortBy(Array.from(this.baurateMap.values()), ["jahr"]);
  }

  private extraktBauraten(layer: AbfragevarianteModel | BauabschnittModel | BaugebietModel): Array<BaurateModel> {
    if (layer instanceof AbfragevarianteModel) {
      const abfragevariante: AbfragevarianteModel = this.aggregateBauraten as AbfragevarianteModel;
      if (!_.isNil(abfragevariante.bauabschnitte)) {
        return abfragevariante.bauabschnitte.flatMap((bauabschnitt: BauabschnittDto) => {
          return this.extraktBauraten(new BauabschnittModel(bauabschnitt));
        });
      } else {
        return [];
      }
    } else if (layer instanceof BauabschnittModel) {
      return (layer as BauabschnittModel).baugebiete.flatMap((baugebiet: BaugebietDto) => {
        return this.extraktBauraten(new BaugebietModel(baugebiet));
      });
    } else {
      return (layer as BaugebietModel).bauraten.map((baurate: BaurateDto) => new BaurateModel(baurate));
    }
  }

  private bauratenAggregation(bauraten: BaurateModel[]) {
    bauraten.forEach((baurate: BaurateModel) => {
      const aggregated = this.baurateMap.get(baurate.jahr);
      if (!_.isNil(aggregated)) {
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
      } else {
        const clone = _.clone(baurate);
        this.baurateMap.set(clone.jahr, clone);
      }
    });
  }

  get bauratenJahreHeaders(): DataTableHeader[] {
    const headers = new Array<DataTableHeader>();
    headers.push(new DataTableHeader("Jahr", undefined, false));
    this.aggregatedBauraten.forEach((baurate: BaurateModel) => {
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
