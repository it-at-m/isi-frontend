<script setup lang="ts">
import {
  AbfragevarianteDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
  InfrastrukturabfrageDto,
} from "@/api/api-client/isi-backend";
import DtoWithForm from "@/types/common/DtoWithForm";
import { ref, watch } from "vue";
import _ from "lodash";

interface Item {
  id: number;
  name: string;
  // parent?: Item;
  children: Item[];
  actions: Action[];
  onSelection: () => void;
  // value: ItemValue;
}

interface Action {
  name: string;
  disabled: boolean;
  effect: () => void;
}

interface Props {
  abfrage: InfrastrukturabfrageDto;
  selected: DtoWithForm;
}

const DEFAULT_NAME = "Nicht gepflegt";
const ABFRAGE_NAME = "Abfrage";
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
const emit = defineEmits([
  "selectAbfrage",
  "selectAbfragevariante",
  "selectBauabschnitt",
  "selectBaugebiet",
  "selectBaurate",
  "createAbfragevariante",
  "createBauabschnitt",
  "createBaugebiet",
  "createBaurate",
  "deleteAbfrage",
  "deleteAbfragevariante",
  "deleteBauabschnitt",
  "deleteBaugebiet",
  "deleteBaurate",
  "setAbfragevarianteRelevant",
  "determineBauratenForAbfragevariante",
  "determineBauratenForBaugebiet",
]);

const items = ref<Item[]>([]);
const selectedItemIds = ref<number[]>([]);
const openItemIds = ref<number[]>([]);

watch(props.abfrage, () => (items.value = [buildTree(props.abfrage)]));

function buildTree(abfrage: InfrastrukturabfrageDto): Item {
  let children: Item[] = [];
  if (abfrage.abfragevarianten) {
    children = abfrage.abfragevarianten.map((value) => parseAbfragevariante(value));
  }

  const actions: Action[] = [];
  actions.push({ name: CREATE_ABFRAGEVARIANTE, disabled: false, effect: () => emit("createAbfragevariante") });
  actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteAbfrage") });

  const root = { id: 0, name: ABFRAGE_NAME, children, actions, onSelection: () => emit("selectAbfrage") };
  assignIds(root);

  return root;
}

function parseAbfragevariante(abfragevariante: AbfragevarianteDto): Item {
  let children: Item[] = [];
  const actions: Action[] = [];

  if (abfragevariante.bauabschnitte) {
    const firstBauabschnitt = abfragevariante.bauabschnitte[0];
    if (firstBauabschnitt.technical) {
      const firstBaugebiet = firstBauabschnitt.baugebiete[0];
      if (firstBaugebiet && firstBaugebiet.technical) {
        // Fall 1: Platzhalter-Bauabschnitt und -Baugebiet -> Bauraten werden angezeigt und können angelegt werden
        children = firstBaugebiet.bauraten.map((value) => parseBaurate(value));
        actions.push({ name: CREATE_BAURATE, disabled: false, effect: () => emit("createBaurate", abfragevariante) });
      } else {
        // Fall 2: Platzhalter-Bauabschnitt -> Baugebiete werden angezeigt und können angelegt werden
        children = firstBauabschnitt.baugebiete.map((value) => parseBaugebiet(value));
        actions.push({
          name: CREATE_BAUGEBIET,
          disabled: false,
          effect: () => emit("createBaugebiet", abfragevariante),
        });
      }
    } else {
      // Fall 3: Bauabschnitt(e) -> Bauabschnitte werden angezeigt und können angelegt werden
      children = abfragevariante.bauabschnitte.map((value) => parseBauabschnitt(value));
      actions.push({
        name: CREATE_BAUABSCHNITT,
        disabled: false,
        effect: () => emit("createBauabschnitt", abfragevariante),
      });
    }
  } else {
    // Fall 4: Keine Bauabschnitte -> Bauabschnitt, Baugebiet oder Baurate kann angelegt werden
    actions.push({
      name: CREATE_BAUABSCHNITT,
      disabled: false,
      effect: () => emit("createBauabschnitt", abfragevariante),
    });
    actions.push({ name: CREATE_BAUGEBIET, disabled: false, effect: () => emit("createBaugebiet", abfragevariante) });
    actions.push({ name: CREATE_BAURATE, disabled: false, effect: () => emit("createBaurate", abfragevariante) });
  }

  actions.push({
    name: DETERMINE_BAURATEN,
    disabled: false,
    effect: () => emit("determineBauratenForAbfragevariante", abfragevariante),
  });
  actions.push({
    name: MARK_AS_RELEVANT,
    disabled: false,
    effect: () => emit("setAbfragevarianteRelevant", abfragevariante),
  });
  actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteAbfragevariante", abfragevariante) });

  const prefix = ABRAGEVARIANTE_PREFIX + _.defaultTo(abfragevariante.abfragevariantenNr, "");
  const name = _.defaultTo(abfragevariante.abfragevariantenName, DEFAULT_NAME);

  return {
    id: 0,
    name: `${prefix} - ${name}`,
    children,
    actions,
    onSelection: () => emit("selectAbfragevariante", abfragevariante),
  };
}

function parseBauabschnitt(bauabschnitt: BauabschnittDto): Item {
  let children: Item[] = bauabschnitt.baugebiete.map((value) => parseBaugebiet(value));

  const actions: Action[] = [];
  actions.push({ name: CREATE_BAUGEBIET, disabled: false, effect: () => console.log("Test") });
  actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteBauabschnitt", bauabschnitt) });

  return {
    id: 0,
    name: _.defaultTo(bauabschnitt.bezeichnung, DEFAULT_NAME),
    children,
    actions,
    onSelection: () => emit("selectBauabschnitt", bauabschnitt),
  };
}

function parseBaugebiet(baugebiet: BaugebietDto): Item {
  const children = baugebiet.bauraten.map((value) => parseBaurate(value));

  const actions: Action[] = [];
  actions.push({ name: CREATE_BAURATE, disabled: false, effect: () => console.log("Test") });
  actions.push({
    name: DETERMINE_BAURATEN,
    disabled: false,
    effect: () => emit("determineBauratenForBaugebiet", baugebiet),
  });
  actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteBaugebiet", baugebiet) });

  return {
    id: 0,
    name: _.defaultTo(baugebiet.bezeichnung, DEFAULT_NAME),
    children,
    actions,
    onSelection: () => emit("selectBaugebiet", baugebiet),
  };
}

function parseBaurate(baurate: BaurateDto): Item {
  const actions: Action[] = [];
  actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteBaurate", baurate) });

  return {
    id: 0,
    name: _.defaultTo(baurate.jahr.toString(), DEFAULT_NAME),
    children: [],
    actions,
    onSelection: () => emit("selectBaurate", baurate),
  };
}

function assignIds(root: Item): void {
  const queue: Item[] = [root];
  let currentId = 0;

  while (queue.length > 0) {
    const item = queue.shift();
    if (item) {
      item.id = currentId++;
      queue.push(...item.children);
    }
  }
}
</script>

<template>
  <v-treeview
    :items="items"
    :active.sync="selectedItemIds"
    :open.sync="openItemIds"
    open-all
    dense
    hoverable
  >
    <template #label="{ item }">
      <v-menu
        open-on-hover
        offset-x
      >
        <template #activator="{ on }">
          <a
            v-on="on"
            @click="item.onSelection"
          >
            {{ item.name }}
          </a>
        </template>
        <v-list>
          <v-list-item
            v-for="action in item.actions"
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
