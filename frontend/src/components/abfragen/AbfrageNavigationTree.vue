<script lang="ts">
/**
 * Treeview zur Darstellung von und Interaktion mit der Abfrage-Hierarchie.
 *
 * Props:
 * - `abfrage: InfrastrukturabfrageModel`: Die darzustellende Abfrage.
 * - `selectedItemId: string`: Id des aktuell ausgewählten Items.
 *   Kann von einem vorhanden Item stammen oder mit `generateTreeItemId` für ein neues Item ermittelt worden sein.
 *
 * Emits:
 * - `select-abfrage: TreeItem<InfrastrukturabfrageModel>`
 * - `select-abfragevariante: TreeItem<AbfragevarianteModel>`
 * - `select-bauabschnitt: TreeItem<BauabschnittModel>`
 * - `select-baugebiet: TreeItem<BaugebietModel>`
 * - `select-baurate: TreeItem<BaurateModel>`
 * - `create-abfragevariante: TreeItem<InfrastrukturabfrageModel>`
 * - `create-abfragevariante-sachbearbeitung: TreeItem<InfrastrukturabfrageModel>`
 * - `create-bauabschnitt: TreeItem<AbfragevarianteModel>`
 * - `create-baugebiet: TreeItem<AbfragevarianteModel | BauabschnittModel>`
 * - `create-baurate: TreeItem<AbfragevarianteModel | BaugebietModel>`
 * - `delete-abfragevariante: TreeItem<AbfragevarianteModel>`
 * - `delete-bauabschnitt: TreeItem<BauabschnittModel>`
 * - `delete-baugebiet: TreeItem<BaugebietModel>`
 * - `delete-baurate: TreeItem<BaurateModel>`
 * - `set-abfragevariante-relevant: TreeItem<AbfragevarianteModel>`
 * - `determine-bauraten-for-abfragevariante: TreeItem<AbfragevarianteModel>`
 * - `determine-bauraten-for-baugebiet: TreeItem<BaugebietModel>`
 */
export default {
  name: "AbfrageNavigationTree",
};

/**
 * Erzeugt eine einzigartige Id für ein TreeItem, die auf der Id des Parents und seinem Index (unter seinen Silblings) basiert.
 * Die Id vom Root ist immer ein leerer String und braucht deshalb diese Funktion nicht.
 */
export function generateTreeItemId(parentId: string, index: number): string {
  if (parentId === "") {
    return index.toString();
  }

  return `${parentId}.${index}`;
}
</script>

<script setup lang="ts">
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import BaugebietModel from "@/types/model/baugebiete/BaugebietModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import {
  isEditableWithAnzeigeContextAbfragevariante,
  isEditableByAbfrageerstellung,
  isEditableBySachbearbeitung,
} from "@/mixins/security/AbfrageSecurity";
import { ref, computed, watch } from "vue";
import _ from "lodash";

export interface TreeItem<T extends ModelWithForm> {
  id: string;
  name: string;
  parent: TreeItem<ModelWithForm> | null;
  children: TreeItem<ModelWithForm>[];
  actions: Action[];
  onSelection: () => void;
  context: AnzeigeContextAbfragevariante;
  value: T;
}

// Ein Union aller im Rahmen der Abfrage relevanten Models, welche ein eigenes Formular haben.
export type ModelWithForm =
  | InfrastrukturabfrageModel
  | AbfragevarianteModel
  | BauabschnittModel
  | BaugebietModel
  | BaurateModel;

/*
 * Hinweis zu disabled: Wenn true, ist die Aktion sichtbar, aber ausgegraut und nicht aktivierbar.
 * Es ist für Aktionen gedacht, welche abhängig von den Daten der Abfrage-Hierarchie verfügbar sind.
 * Aktionen, welche in der aktuellen Rolle nicht oder nur ein Mal relevant sind, sollten ausgelassen werden.
 */
interface Action {
  name: string;
  disabled: boolean;
  effect: () => void;
}

interface Props {
  abfrage: InfrastrukturabfrageModel;
  selectedItemId: string;
}

interface Emits {
  (event: "select-abfrage", value: TreeItem<InfrastrukturabfrageModel>): void;
  (event: "select-abfragevariante", value: TreeItem<AbfragevarianteModel>): void;
  (event: "select-bauabschnitt", value: TreeItem<BauabschnittModel>): void;
  (event: "select-baugebiet", value: TreeItem<BaugebietModel>): void;
  (event: "select-baurate", value: TreeItem<BaurateModel>): void;
  (event: "create-abfragevariante", value: TreeItem<InfrastrukturabfrageModel>): void;
  (event: "create-abfragevariante-sachbearbeitung", value: TreeItem<InfrastrukturabfrageModel>): void;
  (event: "create-bauabschnitt", value: TreeItem<AbfragevarianteModel>): void;
  (event: "create-baugebiet", value: TreeItem<AbfragevarianteModel | BauabschnittModel>): void;
  (event: "create-baurate", value: TreeItem<AbfragevarianteModel | BaugebietModel>): void;
  (event: "delete-abfragevariante", value: TreeItem<AbfragevarianteModel>): void;
  (event: "delete-bauabschnitt", value: TreeItem<BauabschnittModel>): void;
  (event: "delete-baugebiet", value: TreeItem<BaugebietModel>): void;
  (event: "delete-baurate", value: TreeItem<BaurateModel>): void;
  (event: "set-abfragevariante-relevant", value: TreeItem<AbfragevarianteModel>): void;
  (event: "determine-bauraten-for-abfragevariante", value: TreeItem<AbfragevarianteModel>): void;
  (event: "determine-bauraten-for-baugebiet", value: TreeItem<BaugebietModel>): void;
}

const DEFAULT_NAME = "Nicht gepflegt";
const ABFRAGE_NAME = "Daten zur Abfrage";
const ABRAGEVARIANTE_PREFIX = "Nr.: ";

const CREATE_ABFRAGEVARIANTE = "Abfragevariante erstellen";
const CREATE_BAUABSCHNITT = "Bauabschnitt erstellen";
const CREATE_BAUGEBIET = "Baugebiet erstellen";
const CREATE_BAURATE = "Baurate erstellen";
const DELETE = "Löschen";
const MARK_AS_RELEVANT = "Als relevant markieren";
const DETERMINE_BAURATEN = "Idealtypische Bauraten ermitteln";

const ABFRAGEVARIANTEN_LIMIT = 5;

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const items = ref<TreeItem<InfrastrukturabfrageModel>[]>([]);
const selectedItemIds = computed(() => [props.selectedItemId]);
const openItemIds = ref<string[]>([]);

watch(
  () => props.abfrage,
  () => (items.value = [buildTree(props.abfrage)]),
  { deep: true }
);

function buildTree(abfrage: InfrastrukturabfrageModel): TreeItem<InfrastrukturabfrageModel> {
  const item: TreeItem<InfrastrukturabfrageModel> = {
    id: "",
    name: ABFRAGE_NAME,
    parent: null,
    children: [],
    actions: [],
    onSelection: () => emit("select-abfrage", item),
    context: AnzeigeContextAbfragevariante.UNDEFINED,
    value: abfrage,
  };

  if (abfrage.abfragevarianten) {
    const abfragevarianten = abfrage.abfragevarianten.map((value, index) =>
      parseAbfragevariante(value, item, index, AnzeigeContextAbfragevariante.ABFRAGEVARIANTE)
    );
    item.children.push(...abfragevarianten);
  }

  if (abfrage.abfragevariantenSachbearbeitung) {
    const abfragevarianten = abfrage.abfragevariantenSachbearbeitung.map((value, index) =>
      parseAbfragevariante(value, item, index, AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG)
    );
    item.children.push(...abfragevarianten);
  }

  if (isEditableByAbfrageerstellung()) {
    item.actions.push({
      name: CREATE_ABFRAGEVARIANTE,
      disabled: _.defaultTo(abfrage.abfragevarianten?.length, 0) >= ABFRAGEVARIANTEN_LIMIT,
      effect: () => {
        emit("create-abfragevariante", item);
        openItem(item);
      },
    });
  } else {
    item.actions.push({
      name: CREATE_ABFRAGEVARIANTE,
      disabled: _.defaultTo(abfrage.abfragevariantenSachbearbeitung?.length, 0) >= ABFRAGEVARIANTEN_LIMIT,
      effect: () => {
        emit("create-abfragevariante-sachbearbeitung", item);
        openItem(item);
      },
    });
  }

  return item;
}

function parseAbfragevariante(
  abfragevariante: AbfragevarianteModel,
  parent: TreeItem<InfrastrukturabfrageModel>,
  index: number,
  context: AnzeigeContextAbfragevariante
): TreeItem<AbfragevarianteModel> {
  const prefix = ABRAGEVARIANTE_PREFIX + _.defaultTo(abfragevariante.abfragevariantenNr, "");
  const name = _.defaultTo(abfragevariante.abfragevariantenName, DEFAULT_NAME);
  const editable = isEditableWithAnzeigeContextAbfragevariante(context);

  const item: TreeItem<AbfragevarianteModel> = {
    id: generateTreeItemId(parent.id, index),
    name: `${prefix} - ${name}`,
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("select-abfragevariante", item),
    context,
    value: abfragevariante,
  };

  if (isEditableBySachbearbeitung()) {
    item.actions.push({
      name: MARK_AS_RELEVANT,
      disabled: false,
      effect: () => emit("set-abfragevariante-relevant", item),
    });
  }

  if (editable) {
    item.actions.push({
      name: DETERMINE_BAURATEN,
      disabled: !bauratenDeterminableForAbfragevariante(abfragevariante),
      effect: () => {
        emit("determine-bauraten-for-abfragevariante", item);
        openItem(item);
      },
    });
  }

  if (abfragevariante.bauabschnitte && !_.isEmpty(abfragevariante.bauabschnitte)) {
    const firstBauabschnitt = abfragevariante.bauabschnitte[0];
    if (firstBauabschnitt && firstBauabschnitt.technical) {
      const firstBaugebiet = firstBauabschnitt.baugebiete[0];
      if (firstBaugebiet && firstBaugebiet.technical) {
        // Fall 1: Platzhalter-Bauabschnitt und -Baugebiet -> Bauraten werden angezeigt und können angelegt werden
        item.children = firstBaugebiet.bauraten.map((value, index) => parseBaurate(value, item, index, context));
        if (editable) {
          item.actions.push({
            name: CREATE_BAURATE,
            disabled: false,
            effect: () => {
              emit("create-baurate", item);
              openItem(item);
            },
          });
        }
      } else {
        // Fall 2: Platzhalter-Bauabschnitt -> Baugebiete werden angezeigt und können angelegt werden
        item.children = firstBauabschnitt.baugebiete.map((value, index) => parseBaugebiet(value, item, index, context));
        if (editable) {
          item.actions.push({
            name: CREATE_BAUGEBIET,
            disabled: false,
            effect: () => {
              emit("create-baugebiet", item);
              openItem(item);
            },
          });
        }
      }
    } else {
      // Fall 3: Bauabschnitt(e) -> Bauabschnitte werden angezeigt und können angelegt werden
      item.children = abfragevariante.bauabschnitte.map((value, index) =>
        parseBauabschnitt(value, item, index, context)
      );
      if (editable) {
        item.actions.push({
          name: CREATE_BAUABSCHNITT,
          disabled: false,
          effect: () => {
            emit("create-bauabschnitt", item);
            openItem(item);
          },
        });
      }
    }
  } else {
    // Fall 4: Keine Bauabschnitte -> Bauabschnitt, Baugebiet oder Baurate kann angelegt werden
    if (editable) {
      item.actions.push({
        name: CREATE_BAUABSCHNITT,
        disabled: false,
        effect: () => {
          emit("create-bauabschnitt", item);
          openItem(item);
        },
      });
      item.actions.push({
        name: CREATE_BAUGEBIET,
        disabled: false,
        effect: () => {
          emit("create-baugebiet", item);
          openItem(item);
        },
      });
      item.actions.push({
        name: CREATE_BAURATE,
        disabled: false,
        effect: () => {
          emit("create-baurate", item);
          openItem(item);
        },
      });
    }
  }

  if (editable) {
    item.actions.push({ name: DELETE, disabled: false, effect: () => emit("delete-abfragevariante", item) });
  }

  return item;
}

function parseBauabschnitt(
  bauabschnitt: BauabschnittModel,
  parent: TreeItem<AbfragevarianteModel>,
  index: number,
  context: AnzeigeContextAbfragevariante
): TreeItem<BauabschnittModel> {
  const item: TreeItem<BauabschnittModel> = {
    id: generateTreeItemId(parent.id, index),
    name: bauabschnitt.bezeichnung === "" ? DEFAULT_NAME : bauabschnitt.bezeichnung,
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("select-bauabschnitt", item),
    context,
    value: bauabschnitt,
  };

  item.children = bauabschnitt.baugebiete.map((value, index) => parseBaugebiet(value, item, index, context));

  if (isEditableWithAnzeigeContextAbfragevariante(context)) {
    item.actions.push({
      name: CREATE_BAUGEBIET,
      disabled: false,
      effect: () => {
        emit("create-baugebiet", item);
        openItem(item);
      },
    });
    item.actions.push({ name: DELETE, disabled: false, effect: () => emit("delete-bauabschnitt", item) });
  }

  return item;
}

function parseBaugebiet(
  baugebiet: BaugebietModel,
  parent: TreeItem<AbfragevarianteModel | BauabschnittModel>,
  index: number,
  context: AnzeigeContextAbfragevariante
): TreeItem<BaugebietModel> {
  const item: TreeItem<BaugebietModel> = {
    id: generateTreeItemId(parent.id, index),
    name: baugebiet.bezeichnung === "" ? DEFAULT_NAME : baugebiet.bezeichnung,
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("select-baugebiet", item),
    context,
    value: baugebiet,
  };

  item.children = baugebiet.bauraten.map((value, index) => parseBaurate(value, item, index, context));

  if (isEditableWithAnzeigeContextAbfragevariante(context)) {
    item.actions.push({
      name: DETERMINE_BAURATEN,
      disabled: !bauratenDeterminableForBaugebiet(baugebiet),
      effect: () => {
        emit("determine-bauraten-for-baugebiet", item);
        openItem(item);
      },
    });

    item.actions.push({
      name: CREATE_BAURATE,
      disabled: false,
      effect: () => {
        emit("create-baurate", item);
        openItem(item);
      },
    });
    item.actions.push({ name: DELETE, disabled: false, effect: () => emit("delete-baugebiet", item) });
  }

  return item;
}

function parseBaurate(
  baurate: BaurateModel,
  parent: TreeItem<AbfragevarianteModel | BaugebietModel>,
  index: number,
  context: AnzeigeContextAbfragevariante
): TreeItem<BaurateModel> {
  const item: TreeItem<BaurateModel> = {
    id: generateTreeItemId(parent.id, index),
    name: baurate.jahr ? baurate.jahr.toString() : DEFAULT_NAME,
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("select-baurate", item),
    context,
    value: baurate,
  };

  if (isEditableWithAnzeigeContextAbfragevariante(context)) {
    item.actions.push({ name: DELETE, disabled: false, effect: () => emit("delete-baurate", item) });
  }

  return item;
}

function bauratenDeterminableForAbfragevariante(abfragevariante: AbfragevarianteModel): boolean {
  return (
    // Entweder müssen die Geschoßläche Wohnen oder die Wohneinheiten gesetzt sein.
    (!_.isNil(abfragevariante.gesamtanzahlWe) || !_.isNil(abfragevariante.geschossflaecheWohnen)) &&
    // Die Abfragevariante darf keine Bauabschnitte referenzieren.
    _.isEmpty(abfragevariante.bauabschnitte) &&
    // Das Datum für Realisierung von muss gesetzt sein.
    !_.isNil(abfragevariante.realisierungVon)
  );
}

function bauratenDeterminableForBaugebiet(baugebiet: BaugebietModel): boolean {
  return (
    // Entweder müssen die Geschoßläche Wohnen oder die Wohneinheiten gesetzt sein.
    (!_.isNil(baugebiet.gesamtanzahlWe) || !_.isNil(baugebiet.geschossflaecheWohnen)) &&
    // Die Abfragevariante darf keine Bauabschnitte referenzieren.
    _.isEmpty(baugebiet.bauraten) &&
    // Das Datum für Realisierung von muss gesetzt sein.
    !_.isNil(baugebiet.realisierungVon)
  );
}

function openItem(item: TreeItem<ModelWithForm>): void {
  openItemIds.value = [...openItemIds.value, item.id];
}
</script>

<template>
  <v-treeview
    :items="items"
    :active="selectedItemIds"
    :open.sync="openItemIds"
    open-all
    dense
    hoverable
  >
    <template #label="{ item }">
      <v-menu
        v-if="item.actions.length > 0"
        open-on-hover
        offset-x
      >
        <template #activator="{ on }">
          <a
            :id="`abfrage_navigation_tree_${item.id}`"
            v-on="on"
            @click="item.onSelection"
          >
            {{ item.name }}
          </a>
        </template>
        <v-list>
          <v-list-item
            v-for="action in item.actions"
            :id="`abfrage_navigation_tree_${item.id}_${action.name}`"
            :key="action.name"
            :disabled="action.disabled"
            @click="action.effect"
          >
            <v-list-item-title>{{ action.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-treeview>
</template>
