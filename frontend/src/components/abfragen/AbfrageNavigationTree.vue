<!--
Treeview zur Darstellung von und Interaktion mit der Abfrage-Hierarchie.

Props:
- `abfrage: InfrastrukturabfrageDto`: Die darzustellende Abfrage.
- `selectedItemId: string`: Id des aktuell ausgewählten Items.
  Kann von einem vorhanden Item stammen oder mit `generateTreeItemId` für ein neues Item ermittelt worden sein.

Emits:
- `select-abfrage: AbfrageTreeItem`
- `select-abfragevariante: AbfrageTreeItem`
- `select-bauabschnitt: AbfrageTreeItem`
- `select-baugebiet: AbfrageTreeItem`
- `select-baurate: AbfrageTreeItem`
- `create-abfragevariante: AbfrageTreeItem`
- `create-abfragevariante-sachbearbeitung: AbfrageTreeItem`
- `create-bauabschnitt: AbfrageTreeItem`
- `create-baugebiet: AbfrageTreeItem`
- `create-baurate: AbfrageTreeItem`
- `delete-abfragevariante: AbfrageTreeItem`
- `delete-bauabschnitt: AbfrageTreeItem`
- `delete-baugebiet: AbfrageTreeItem`
- `delete-baurate: AbfrageTreeItem`
- `set-abfragevariante-relevant: AbfrageTreeItem`
- `determine-bauraten-for-abfragevariante: AbfrageTreeItem`
- `determine-bauraten-for-baugebiet: AbfrageTreeItem`
-->

<template>
  <v-treeview
    :items="items"
    :active="selectedItemIds"
    :open.sync="openItemIds"
    dense
    hoverable
  >
    <template #label="{ item }">
      <v-menu
        open-on-hover
        offset-y
        :disabled="item.actions.length === 0"
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

<script lang="ts">
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
import {
  InfrastrukturabfrageDto,
  AbfragevarianteDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
} from "@/api/api-client/isi-backend";
import { AnzeigeContextAbfragevariante, AbfrageDtoWithForm, AbfrageFormType } from "@/views/Abfrage.vue";
import {
  isEditableWithAnzeigeContextAbfragevariante,
  isEditableBySachbearbeitung,
} from "@/mixins/security/AbfrageSecurity";
import { ref, computed, watch } from "vue";
import _ from "lodash";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";

export interface AbfrageTreeItem {
  id: string;
  type: AbfrageFormType;
  name: string;
  parent: AbfrageTreeItem | null;
  children: AbfrageTreeItem[];
  actions: Action[];
  onSelection: () => void;
  context: AnzeigeContextAbfragevariante;
  value: AbfrageDtoWithForm;
}

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
  abfrage: InfrastrukturabfrageDto;
  selectedItemId: string;
}

interface Emits {
  (event: "select-abfrage", value: AbfrageTreeItem): void;
  (event: "select-abfragevariante", value: AbfrageTreeItem): void;
  (event: "select-bauabschnitt", value: AbfrageTreeItem): void;
  (event: "select-baugebiet", value: AbfrageTreeItem): void;
  (event: "select-baurate", value: AbfrageTreeItem): void;
  (event: "create-abfragevariante", value: AbfrageTreeItem): void;
  (event: "create-abfragevariante-sachbearbeitung", value: AbfrageTreeItem): void;
  (event: "create-bauabschnitt", value: AbfrageTreeItem): void;
  (event: "create-baugebiet", value: AbfrageTreeItem): void;
  (event: "create-baurate", value: AbfrageTreeItem): void;
  (event: "delete-abfragevariante", value: AbfrageTreeItem): void;
  (event: "delete-bauabschnitt", value: AbfrageTreeItem): void;
  (event: "delete-baugebiet", value: AbfrageTreeItem): void;
  (event: "delete-baurate", value: AbfrageTreeItem): void;
  (event: "set-abfragevariante-relevant", value: AbfrageTreeItem): void;
  (event: "determine-bauraten-for-abfragevariante", value: AbfrageTreeItem): void;
  (event: "determine-bauraten-for-baugebiet", value: AbfrageTreeItem): void;
}

const DEFAULT_NAME = "Nicht gepflegt";
const ABFRAGE_NAME = "Daten zur Abfrage";

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

const items = ref<AbfrageTreeItem[]>([]);
const selectedItemIds = computed(() => [props.selectedItemId]);
const openItemIds = ref<string[]>([]);

watch(
  () => props.abfrage,
  () => (items.value = [buildTree(props.abfrage)]),
  { deep: true }
);

function buildTree(abfrage: InfrastrukturabfrageDto): AbfrageTreeItem {
  const item: AbfrageTreeItem = {
    id: "",
    type: AbfrageFormType.INFRASTRUKTURABFRAGE,
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
      buildSubTreeAbfragevariante(value, item, index, AnzeigeContextAbfragevariante.ABFRAGEVARIANTE)
    );
    item.children.push(...abfragevarianten);
  }

  if (abfrage.abfragevariantenSachbearbeitung) {
    const abfragevarianten = abfrage.abfragevariantenSachbearbeitung.map((value, index) =>
      buildSubTreeAbfragevariante(value, item, index, AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG)
    );
    item.children.push(...abfragevarianten);
  }

  if (isEditableBySachbearbeitung()) {
    item.actions.push({
      name: CREATE_ABFRAGEVARIANTE,
      disabled: _.defaultTo(abfrage.abfragevariantenSachbearbeitung?.length, 0) >= ABFRAGEVARIANTEN_LIMIT,
      effect: () => {
        emit("create-abfragevariante-sachbearbeitung", item);
        openItem(item);
      },
    });
  } else {
    item.actions.push({
      name: CREATE_ABFRAGEVARIANTE,
      disabled: _.defaultTo(abfrage.abfragevarianten?.length, 0) >= ABFRAGEVARIANTEN_LIMIT,
      effect: () => {
        emit("create-abfragevariante", item);
        openItem(item);
      },
    });
  }

  openItem(item);

  return item;
}

function buildSubTreeAbfragevariante(
  abfragevariante: AbfragevarianteDto,
  parent: AbfrageTreeItem,
  index: number,
  context: AnzeigeContextAbfragevariante
): AbfrageTreeItem {
  const editable = isEditableWithAnzeigeContextAbfragevariante(context);

  const item: AbfrageTreeItem = {
    id: generateTreeItemId(parent.id, index),
    type: AbfrageFormType.ABFRAGEVARIANTE,
    name: getAbfragevarianteName(abfragevariante, context),
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
        item.children = firstBaugebiet.bauraten.map((value, index) => buildSubTreeBaurate(value, item, index, context));
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
        item.children = firstBauabschnitt.baugebiete.map((value, index) =>
          buildSubTreeBaugebiet(value, item, index, context)
        );
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
        buildSubTreeBauabschnitt(value, item, index, context)
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

function buildSubTreeBauabschnitt(
  bauabschnitt: BauabschnittDto,
  parent: AbfrageTreeItem,
  index: number,
  context: AnzeigeContextAbfragevariante
): AbfrageTreeItem {
  const item: AbfrageTreeItem = {
    id: generateTreeItemId(parent.id, index),
    type: AbfrageFormType.BAUABSCHNITT,
    name: bauabschnitt.bezeichnung === "" ? DEFAULT_NAME : bauabschnitt.bezeichnung,
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("select-bauabschnitt", item),
    context,
    value: bauabschnitt,
  };

  item.children = bauabschnitt.baugebiete.map((value, index) => buildSubTreeBaugebiet(value, item, index, context));

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

function buildSubTreeBaugebiet(
  baugebiet: BaugebietDto,
  parent: AbfrageTreeItem,
  index: number,
  context: AnzeigeContextAbfragevariante
): AbfrageTreeItem {
  const item: AbfrageTreeItem = {
    id: generateTreeItemId(parent.id, index),
    type: AbfrageFormType.BAUGEBIET,
    name: baugebiet.bezeichnung === "" ? DEFAULT_NAME : baugebiet.bezeichnung,
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("select-baugebiet", item),
    context,
    value: baugebiet,
  };

  item.children = baugebiet.bauraten.map((value, index) => buildSubTreeBaurate(value, item, index, context));

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

function buildSubTreeBaurate(
  baurate: BaurateDto,
  parent: AbfrageTreeItem,
  index: number,
  context: AnzeigeContextAbfragevariante
): AbfrageTreeItem {
  const item: AbfrageTreeItem = {
    id: generateTreeItemId(parent.id, index),
    type: AbfrageFormType.BAURATE,
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

function getAbfragevarianteName(
  abfragevariante: AbfragevarianteDto,
  conextAnzeigeAbfragevariante: AnzeigeContextAbfragevariante
): string {
  const abfragevarianteModel = new AbfragevarianteModel(abfragevariante);
  return `${abfragevarianteModel.getAbfragevariantenNrForContextAnzeigeAbfragevariante(
    conextAnzeigeAbfragevariante
  )}\xa0-\xa0${_.isNil(abfragevariante.abfragevariantenName) ? DEFAULT_NAME : abfragevariante.abfragevariantenName}`;
}

function bauratenDeterminableForAbfragevariante(abfragevariante: AbfragevarianteDto): boolean {
  return (
    // Entweder müssen die Geschoßläche Wohnen oder die Wohneinheiten gesetzt sein.
    (!_.isNil(abfragevariante.gesamtanzahlWe) || !_.isNil(abfragevariante.geschossflaecheWohnen)) &&
    // Die Abfragevariante darf keine Bauabschnitte referenzieren.
    _.isEmpty(abfragevariante.bauabschnitte) &&
    // Das Datum für Realisierung von muss gesetzt sein.
    !_.isNil(abfragevariante.realisierungVon)
  );
}

function bauratenDeterminableForBaugebiet(baugebiet: BaugebietDto): boolean {
  return (
    // Entweder müssen die Geschoßläche Wohnen oder die Wohneinheiten gesetzt sein.
    (!_.isNil(baugebiet.gesamtanzahlWe) || !_.isNil(baugebiet.geschossflaecheWohnen)) &&
    // Die Abfragevariante darf keine Bauabschnitte referenzieren.
    _.isEmpty(baugebiet.bauraten) &&
    // Das Datum für Realisierung von muss gesetzt sein.
    !_.isNil(baugebiet.realisierungVon)
  );
}

function openItem(item: AbfrageTreeItem): void {
  openItemIds.value = [...openItemIds.value, item.id];
}
</script>
