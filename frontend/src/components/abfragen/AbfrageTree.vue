<script setup lang="ts">
import {
  AbfragevarianteDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
  InfrastrukturabfrageDto,
} from "@/api/api-client/isi-backend";
import { ref, computed, watch } from "vue";
import _ from "lodash";

export interface TreeItem<T extends DtoWithForm> {
  id: number;
  name: string;
  parent: TreeItem<DtoWithForm> | null;
  children: TreeItem<DtoWithForm>[];
  actions: Action[];
  onSelection: () => void;
  value: T;
}

export type DtoWithForm = InfrastrukturabfrageDto | AbfragevarianteDto | BauabschnittDto | BaugebietDto | BaurateDto;

interface Action {
  name: string;
  disabled: boolean;
  effect: () => void;
}

interface Props {
  abfrage: InfrastrukturabfrageDto;
  selectedItemId: number;
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
  "deleteAbfragevariante",
  "deleteBauabschnitt",
  "deleteBaugebiet",
  "deleteBaurate",
  "setAbfragevarianteRelevant",
  "determineBauratenForAbfragevariante",
  "determineBauratenForBaugebiet",
]);

const items = ref<TreeItem<InfrastrukturabfrageDto>[]>([]);
const selectedItemIds = computed(() => [props.selectedItemId]);
const openItemIds = ref<number[]>([]);

watch(props.abfrage, () => (items.value = [buildTree(props.abfrage)]));

function buildTree(abfrage: InfrastrukturabfrageDto): TreeItem<InfrastrukturabfrageDto> {
  const item: TreeItem<InfrastrukturabfrageDto> = {
    id: 0,
    name: ABFRAGE_NAME,
    parent: null,
    children: [],
    actions: [],
    onSelection: () => emit("selectAbfrage", item),
    value: abfrage,
  };

  if (abfrage.abfragevarianten) {
    item.children = abfrage.abfragevarianten.map((value) => parseAbfragevariante(value, item));
  }

  item.actions.push({
    name: CREATE_ABFRAGEVARIANTE,
    disabled: false,
    effect: () => emit("createAbfragevariante", item),
  });

  assignIds(item);

  return item;
}

function parseAbfragevariante(
  abfragevariante: AbfragevarianteDto,
  parent: TreeItem<InfrastrukturabfrageDto>
): TreeItem<AbfragevarianteDto> {
  const prefix = ABRAGEVARIANTE_PREFIX + _.defaultTo(abfragevariante.abfragevariantenNr, "");
  const name = _.defaultTo(abfragevariante.abfragevariantenName, DEFAULT_NAME);

  const item: TreeItem<AbfragevarianteDto> = {
    id: 0,
    name: `${prefix} - ${name}`,
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("selectAbfragevariante", item),
    value: abfragevariante,
  };

  if (abfragevariante.bauabschnitte) {
    const firstBauabschnitt = abfragevariante.bauabschnitte[0];
    if (firstBauabschnitt.technical) {
      const firstBaugebiet = firstBauabschnitt.baugebiete[0];
      if (firstBaugebiet && firstBaugebiet.technical) {
        // Fall 1: Platzhalter-Bauabschnitt und -Baugebiet -> Bauraten werden angezeigt und können angelegt werden
        item.children = firstBaugebiet.bauraten.map((value) => parseBaurate(value, item));
        item.actions.push({
          name: CREATE_BAURATE,
          disabled: false,
          effect: () => emit("createBaurate", item),
        });
      } else {
        // Fall 2: Platzhalter-Bauabschnitt -> Baugebiete werden angezeigt und können angelegt werden
        item.children = firstBauabschnitt.baugebiete.map((value) => parseBaugebiet(value, item));
        item.actions.push({
          name: CREATE_BAUGEBIET,
          disabled: false,
          effect: () => emit("createBaugebiet", item),
        });
      }
    } else {
      // Fall 3: Bauabschnitt(e) -> Bauabschnitte werden angezeigt und können angelegt werden
      item.children = abfragevariante.bauabschnitte.map((value) => parseBauabschnitt(value, item));
      item.actions.push({
        name: CREATE_BAUABSCHNITT,
        disabled: false,
        effect: () => emit("createBauabschnitt", item),
      });
    }
  } else {
    // Fall 4: Keine Bauabschnitte -> Bauabschnitt, Baugebiet oder Baurate kann angelegt werden
    item.actions.push({
      name: CREATE_BAUABSCHNITT,
      disabled: false,
      effect: () => emit("createBauabschnitt", item),
    });
    item.actions.push({
      name: CREATE_BAUGEBIET,
      disabled: false,
      effect: () => emit("createBaugebiet", item),
    });
    item.actions.push({ name: CREATE_BAURATE, disabled: false, effect: () => emit("createBaurate", item) });
  }

  item.actions.push({
    name: DETERMINE_BAURATEN,
    disabled: false,
    effect: () => emit("determineBauratenForAbfragevariante", item),
  });
  item.actions.push({
    name: MARK_AS_RELEVANT,
    disabled: false,
    effect: () => emit("setAbfragevarianteRelevant", item),
  });
  item.actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteAbfragevariante", item) });

  return item;
}

function parseBauabschnitt(
  bauabschnitt: BauabschnittDto,
  parent: TreeItem<AbfragevarianteDto>
): TreeItem<BauabschnittDto> {
  const item: TreeItem<BauabschnittDto> = {
    id: 0,
    name: _.defaultTo(bauabschnitt.bezeichnung, DEFAULT_NAME),
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("selectBauabschnitt", item),
    value: bauabschnitt,
  };

  item.children = bauabschnitt.baugebiete.map((value) => parseBaugebiet(value, item));

  item.actions.push({ name: CREATE_BAUGEBIET, disabled: false, effect: () => console.log("Test") });
  item.actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteBauabschnitt", item) });

  return item;
}

function parseBaugebiet(
  baugebiet: BaugebietDto,
  parent: TreeItem<AbfragevarianteDto | BauabschnittDto>
): TreeItem<BaugebietDto> {
  const item: TreeItem<BaugebietDto> = {
    id: 0,
    name: _.defaultTo(baugebiet.bezeichnung, DEFAULT_NAME),
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("selectBaugebiet", item),
    value: baugebiet,
  };

  item.children = baugebiet.bauraten.map((value) => parseBaurate(value, item));

  item.actions.push({ name: CREATE_BAURATE, disabled: false, effect: () => console.log("Test") });
  item.actions.push({
    name: DETERMINE_BAURATEN,
    disabled: false,
    effect: () => emit("determineBauratenForBaugebiet", item),
  });
  item.actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteBaugebiet", item) });

  return item;
}

function parseBaurate(baurate: BaurateDto, parent: TreeItem<AbfragevarianteDto | BaugebietDto>): TreeItem<BaurateDto> {
  const item: TreeItem<BaurateDto> = {
    id: 0,
    name: _.defaultTo(baurate.jahr.toString(), DEFAULT_NAME),
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("selectBaurate", item),
    value: baurate,
  };

  item.actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteBaurate", item) });

  return item;
}

function assignIds(root: TreeItem<InfrastrukturabfrageDto>): void {
  const queue: TreeItem<DtoWithForm>[] = [root];
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
