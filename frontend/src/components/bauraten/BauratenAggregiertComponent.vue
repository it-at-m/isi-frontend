<template>
  <div v-if="aggregatedBauraten.length !== 0">
    <field-group-card :card-title="header">
      <v-container>
        <v-data-table
          :headers="bauratenJahreHeaders"
          :items="aggregatedBauraten"
          hide-default-footer
          disable-pagination
          disable-filtering
          disable-sort
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
                  {{ formatWohneinheiten(item.weGeplant) }}
                </td>
              </tr>
              <tr>
                <td><span>GF Wohnen m²</span></td>
                <td
                  v-for="(item, index) in items"
                  :key="index"
                >
                  {{ formatGeschossflaecheWohnen(item.gfWohnenGeplant) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-container>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import { DataTableHeader } from "@/types/common/DataTableHeader";
import { BauabschnittDto, BaugebietDto, BaurateDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import { numberToFormattedStringTwoDecimals, numberToFormattedStringZeroDecimals } from "@/utils/CalculationUtil";

@Component({ components: { FieldGroupCard } })
export default class BauratenAggregiertComponent extends Vue {
  @Prop()
  private aggregateBauraten!: AbfragevarianteBauleitplanverfahrenModel | BauabschnittModel | BaugebietModel;

  private baurateMap: Map<number, BaurateModel> = new Map<number, BaurateModel>();

  @Watch("aggregateBauraten", { immediate: true, deep: true })
  private aggregateBauratenChanged(): void {
    this.baurateMap = new Map<number, BaurateModel>();
  }

  get aggregatedBauraten(): Array<BaurateModel> {
    if (!_.isNil(this.aggregateBauraten)) {
      this.bauratenAggregation(this.extraktBauraten(this.aggregateBauraten));
    }
    return _.sortBy(Array.from(this.baurateMap.values()), ["jahr"]);
  }

  get bauratenJahreHeaders(): DataTableHeader[] {
    const headers = new Array<DataTableHeader>();
    headers.push(new DataTableHeader("Jahr", undefined, false));
    this.aggregatedBauraten.forEach((baurate: BaurateModel) => {
      headers.push(new DataTableHeader(baurate.jahr.toString(), undefined, false));
    });
    return headers;
  }

  private extraktBauraten(
    layer: AbfragevarianteBauleitplanverfahrenModel | BauabschnittModel | BaugebietModel,
  ): Array<BaurateModel> {
    if (layer instanceof AbfragevarianteBauleitplanverfahrenModel) {
      const abfragevariante: AbfragevarianteBauleitplanverfahrenModel = this
        .aggregateBauraten as AbfragevarianteBauleitplanverfahrenModel;
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

  /**
   * Erstellt eine Map mit Bauraten zu dem angegebenen Property aggregateBauraten
   * Der Key der Map ist das Jahr und der Value die aggregierten Werte der Bauraten
   */
  private bauratenAggregation(bauraten: BaurateModel[]) {
    bauraten.forEach((baurate: BaurateModel) => {
      const aggregated = this.baurateMap.get(baurate.jahr);
      if (!_.isNil(aggregated)) {
        if (!_.isNil(baurate.weGeplant)) {
          if (_.isNil(aggregated.weGeplant)) {
            aggregated.weGeplant = 0;
          }
          aggregated.weGeplant += baurate.weGeplant;
        }
        if (!_.isNil(baurate.gfWohnenGeplant)) {
          if (_.isNil(aggregated.gfWohnenGeplant)) {
            aggregated.gfWohnenGeplant = 0;
          }
          aggregated.gfWohnenGeplant += baurate.gfWohnenGeplant;
        }
      } else {
        const clone = _.clone(baurate);
        this.baurateMap.set(clone.jahr, clone);
      }
    });
  }

  get header(): string {
    if (!_.isNil(this.aggregateBauraten)) {
      if (this.aggregateBauraten instanceof AbfragevarianteBauleitplanverfahrenModel) {
        return "Bauraten der Abfragevariante";
      } else if (this.aggregateBauraten instanceof BauabschnittModel) {
        return "Bauraten des Bauabschnitts";
      } else if (this.aggregateBauraten instanceof BaugebietModel) {
        return "Bauraten des Baugebiets";
      }
    }
    return "";
  }

  private formatWohneinheiten(wohneinheiten: number): string {
    return _.isNil(wohneinheiten) ? "" : numberToFormattedStringZeroDecimals(wohneinheiten);
  }

  private formatGeschossflaecheWohnen(geschossflaecheWohnen: number): string {
    return _.isNil(geschossflaecheWohnen) ? "" : numberToFormattedStringTwoDecimals(geschossflaecheWohnen);
  }
}
</script>
