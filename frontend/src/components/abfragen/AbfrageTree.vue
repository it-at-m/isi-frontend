<script setup lang="ts">
import {
  AbfragevarianteDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
  InfrastrukturabfrageDto,
} from "@/api/api-client/isi-backend";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import {
  isEditableWithAnzeigeContextAbfragevariante,
  isEditableByAbfrageerstellung,
  isEditableBySachbearbeitung,
} from "@/mixins/security/AbfrageSecurity";
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
  "createAbfragevarianteSachbarbeitung",
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
    const editable = isEditableWithAnzeigeContextAbfragevariante(AnzeigeContextAbfragevariante.ABFRAGEVARIANTE);
    const abfragevarianten = abfrage.abfragevarianten.map((value) => parseAbfragevariante(value, item, editable));
    item.children.push(...abfragevarianten);
  }

  if (abfrage.abfragevariantenSachbearbeitung) {
    const editable = isEditableWithAnzeigeContextAbfragevariante(
      AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG
    );
    const abfragevarianten = abfrage.abfragevariantenSachbearbeitung.map((value) =>
      parseAbfragevariante(value, item, editable)
    );
    item.children.push(...abfragevarianten);
  }

  if (isEditableByAbfrageerstellung()) {
    item.actions.push({
      name: CREATE_ABFRAGEVARIANTE,
      disabled: _.defaultTo(abfrage.abfragevarianten?.length, 0) >= ABFRAGEVARIANTEN_LIMIT,
      effect: () => emit("createAbfragevariante", item),
    });
  } else {
    item.actions.push({
      name: CREATE_ABFRAGEVARIANTE,
      disabled: _.defaultTo(abfrage.abfragevariantenSachbearbeitung?.length, 0) >= ABFRAGEVARIANTEN_LIMIT,
      effect: () => emit("createAbfragevarianteSachbarbeitung", item),
    });
  }

  assignIds(item);

  return item;
}

function parseAbfragevariante(
  abfragevariante: AbfragevarianteDto,
  parent: TreeItem<InfrastrukturabfrageDto>,
  editable: boolean
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

  if (isEditableBySachbearbeitung()) {
    item.actions.push({
      name: MARK_AS_RELEVANT,
      disabled: false,
      effect: () => emit("setAbfragevarianteRelevant", item),
    });
  }

  if (editable) {
    item.actions.push({
      name: DETERMINE_BAURATEN,
      disabled: !bauratenDeterminableForAbfragevariante(abfragevariante),
      effect: () => emit("determineBauratenForAbfragevariante", item),
    });
  }

  if (abfragevariante.bauabschnitte) {
    const firstBauabschnitt = abfragevariante.bauabschnitte[0];
    if (firstBauabschnitt.technical) {
      const firstBaugebiet = firstBauabschnitt.baugebiete[0];
      if (firstBaugebiet && firstBaugebiet.technical) {
        // Fall 1: Platzhalter-Bauabschnitt und -Baugebiet -> Bauraten werden angezeigt und können angelegt werden
        item.children = firstBaugebiet.bauraten.map((value) => parseBaurate(value, item, editable));
        if (editable) {
          item.actions.push({
            name: CREATE_BAURATE,
            disabled: false,
            effect: () => emit("createBaurate", item),
          });
        }
      } else {
        // Fall 2: Platzhalter-Bauabschnitt -> Baugebiete werden angezeigt und können angelegt werden
        item.children = firstBauabschnitt.baugebiete.map((value) => parseBaugebiet(value, item, editable));
        if (editable) {
          item.actions.push({
            name: CREATE_BAUGEBIET,
            disabled: false,
            effect: () => emit("createBaugebiet", item),
          });
        }
      }
    } else {
      // Fall 3: Bauabschnitt(e) -> Bauabschnitte werden angezeigt und können angelegt werden
      item.children = abfragevariante.bauabschnitte.map((value) => parseBauabschnitt(value, item, editable));
      if (editable) {
        item.actions.push({
          name: CREATE_BAUABSCHNITT,
          disabled: false,
          effect: () => emit("createBauabschnitt", item),
        });
      }
    }
  } else {
    // Fall 4: Keine Bauabschnitte -> Bauabschnitt, Baugebiet oder Baurate kann angelegt werden
    if (editable) {
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
  }

  item.actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteAbfragevariante", item) });

  return item;
}

function parseBauabschnitt(
  bauabschnitt: BauabschnittDto,
  parent: TreeItem<AbfragevarianteDto>,
  editable: boolean
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

  item.children = bauabschnitt.baugebiete.map((value) => parseBaugebiet(value, item, editable));

  if (editable) {
    item.actions.push({ name: CREATE_BAUGEBIET, disabled: false, effect: () => emit("createBaugebiet", item) });
    item.actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteBauabschnitt", item) });
  }

  return item;
}

function parseBaugebiet(
  baugebiet: BaugebietDto,
  parent: TreeItem<AbfragevarianteDto | BauabschnittDto>,
  editable: boolean
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

  item.children = baugebiet.bauraten.map((value) => parseBaurate(value, item, editable));

  if (editable) {
    item.actions.push({
      name: DETERMINE_BAURATEN,
      disabled: !bauratenDeterminableForBaugebiet(baugebiet),
      effect: () => emit("determineBauratenForBaugebiet", item),
    });

    item.actions.push({ name: CREATE_BAURATE, disabled: false, effect: () => emit("createBaurate", item) });
    item.actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteBaugebiet", item) });
  }

  return item;
}

function parseBaurate(
  baurate: BaurateDto,
  parent: TreeItem<AbfragevarianteDto | BaugebietDto>,
  editable: boolean
): TreeItem<BaurateDto> {
  const item: TreeItem<BaurateDto> = {
    id: 0,
    name: _.defaultTo(baurate.jahr.toString(), DEFAULT_NAME),
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("selectBaurate", item),
    value: baurate,
  };

  if (editable) {
    item.actions.push({ name: DELETE, disabled: false, effect: () => emit("deleteBaurate", item) });
  }

  return item;
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
