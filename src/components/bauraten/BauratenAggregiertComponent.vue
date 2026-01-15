<template>
  <div v-if="aggregatedBauraten.length !== 0">
    <field-group-card :card-title="header">
      <v-container>
        <v-data-table
          :headers="bauratenHeader"
          :items="aggregatedBauraten"
          density="compact"
          hide-default-footer
          disable-pagination
          disable-filtering
          disable-sort
        >
          <template #item.gfWohnenGeplant="{ item }">
            {{ formatGeschossflaecheWohnen(item.gfWohnenGeplant) }}
          </template>
          <template #item.weGeplant="{ item }">
            {{ formatWohneinheiten(item.weGeplant) }}
          </template>
        </v-data-table>
      </v-container>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, ref } from "vue";
import type { BauabschnittDto, BaugebietDto, BaurateDto } from "@/api/api-client/isi-backend";
import type { AnyAbfragevarianteModel } from "@/types/common/Abfrage";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import _ from "lodash";
import { numberToFormattedStringTwoDecimals, numberToFormattedStringZeroDecimals } from "@/utils/CalculationUtil";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";

interface Props {
  aggregateBauraten: AnyAbfragevarianteModel | BauabschnittModel | BaugebietModel;
}

const props = defineProps<Props>();

let baurateMap: Map<number, BaurateModel> = new Map<number, BaurateModel>();

const bauratenHeader = ref<any[]>([
  { title: "Jahr", key: "jahr", sortable: false, align: "start", width: "20%" },
  { title: "Geschossfläche Wohnen in m²", key: "gfWohnenGeplant", sortable: false, align: "end", width: "40%" },
  { title: "Anzahl an Wohneinheiten", key: "weGeplant", sortable: false, align: "end", width: "40%" },
]);

watch(() => props.aggregateBauraten, aggregateBauratenChanged, { immediate: true, deep: true });

function aggregateBauratenChanged(): void {
  baurateMap = new Map<number, BaurateModel>();
}

const aggregatedBauraten = computed(() => {
  if (!_.isNil(props.aggregateBauraten)) {
    bauratenAggregation(extraktBauraten(props.aggregateBauraten));
  }
  return _.sortBy(Array.from(baurateMap.values()), ["jahr"]);
});

function extraktBauraten(layer: AnyAbfragevarianteModel | BauabschnittModel | BaugebietModel): Array<BaurateModel> {
  if (
    layer instanceof AbfragevarianteBauleitplanverfahrenModel ||
    layer instanceof AbfragevarianteBaugenehmigungsverfahrenModel ||
    layer instanceof AbfragevarianteWeiteresVerfahrenModel
  ) {
    const abfragevariante = layer as AnyAbfragevarianteModel;
    return _.toArray(abfragevariante.bauabschnitte).flatMap((bauabschnitt: BauabschnittDto) => {
      return extraktBauraten(new BauabschnittModel(bauabschnitt));
    });
  } else if (layer instanceof BauabschnittModel) {
    const bauabschnitt = layer as BauabschnittModel;
    return _.toArray(bauabschnitt.baugebiete).flatMap((baugebiet: BaugebietDto) => {
      return extraktBauraten(new BaugebietModel(baugebiet));
    });
  } else {
    const baugebiet = layer as BaugebietModel;
    return _.toArray(baugebiet.bauraten).map((baurate: BaurateDto) => new BaurateModel(baurate));
  }
}

/**
 * Erstellt eine Map mit Bauraten zu dem angegebenen Property aggregateBauraten
 * Der Key der Map ist das Jahr und der Value die aggregierten Werte der Bauraten
 */
function bauratenAggregation(bauraten: BaurateModel[]) {
  bauraten.forEach((baurate: BaurateModel) => {
    const aggregated = baurateMap.get(baurate.jahr);
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
      const clone = _.cloneDeep(baurate);
      baurateMap.set(clone.jahr, clone);
    }
  });
}

const header = computed(() => {
  if (!_.isNil(props.aggregateBauraten)) {
    if (
      props.aggregateBauraten instanceof AbfragevarianteBauleitplanverfahrenModel ||
      props.aggregateBauraten instanceof AbfragevarianteBaugenehmigungsverfahrenModel ||
      props.aggregateBauraten instanceof AbfragevarianteWeiteresVerfahrenModel
    ) {
      return "Bauraten der Abfragevariante";
    } else if (props.aggregateBauraten instanceof BauabschnittModel) {
      return "Bauraten des Bauabschnitts";
    } else if (props.aggregateBauraten instanceof BaugebietModel) {
      return "Bauraten des Baugebiets";
    }
  }
  return "";
});

function formatWohneinheiten(wohneinheiten: number | undefined): string {
  return _.isNil(wohneinheiten) ? "-" : numberToFormattedStringZeroDecimals(wohneinheiten);
}

function formatGeschossflaecheWohnen(geschossflaecheWohnen: number | undefined): string {
  return _.isNil(geschossflaecheWohnen) ? "-" : numberToFormattedStringTwoDecimals(geschossflaecheWohnen);
}
</script>
