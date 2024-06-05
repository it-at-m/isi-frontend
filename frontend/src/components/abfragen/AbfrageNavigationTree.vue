<!--
Treeview zur Darstellung von und Interaktion mit der Abfrage-Hierarchie.

Props:
- `abfrage: BauleitplanverfahrenDto`: Die darzustellende Abfrage.
- `selectedItemId: string`: Id des aktuell ausgewählten Items.
  Kann von einem vorhanden Item stammen oder mit `generateTreeItemId` für ein neues Item ermittelt worden sein.
- `relevanteAbfragevarianteId?: string`: Id der relevanten Abfragevariante.

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
  <v-list density="compact">
    <abfrage-list-item
      :item="root"
      :depth="0"
      :selected-item-id="selectedItemId"
      :relevante-abfragevariante-id="relevanteAbfragevarianteId"
    />
  </v-list>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  type BauleitplanverfahrenDto,
  type BaugenehmigungsverfahrenDto,
  type WeiteresVerfahrenDto,
  type BauabschnittDto,
  type BaugebietDto,
  type BaurateDto,
  AbfrageDtoArtAbfrageEnum,
  AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum,
  AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum,
} from "@/api/api-client/isi-backend";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import _ from "lodash";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import {
  type AbfrageTreeItem,
  type AnyAbfrageDto,
  type AnyAbfragevarianteDto,
  type AnyAbfragevarianteModel,
  AnzeigeContextAbfragevariante,
  AbfrageFormType,
} from "@/types/common/Abfrage";
import AbfrageListItem from "./AbfrageListItem.vue";

interface Props {
  abfrage: BauleitplanverfahrenDto;
  selectedItemId: string;
  relevanteAbfragevarianteId?: string;
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
const MARK_AS_NOT_RELEVANT = "Als nicht-relevant markieren";
const DETERMINE_BAURATEN = "Idealtypische Bauraten ermitteln";

const ABFRAGEVARIANTEN_LIMIT = 5;

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const root = ref<AbfrageTreeItem>(buildAbfrageRoot(props.abfrage));

const { isEditableByAbfrageerstellung, isEditableBySachbearbeitung, isEditableWithAnzeigeContextAbfragevariante } =
  useAbfrageSecurity();

watch(
  () => props.abfrage,
  () => (root.value = buildTree(props.abfrage)),
  { immediate: true, deep: true },
);

watch(
  () => props.relevanteAbfragevarianteId,
  () => (root.value = buildTree(props.abfrage)),
);

function buildTree(abfrage: AnyAbfrageDto): AbfrageTreeItem {
  const item = buildAbfrageRoot(abfrage);

  let abfragevarianten: AnyAbfrageDto[] | undefined = undefined;
  if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfragevarianten = (abfrage as BauleitplanverfahrenDto).abfragevariantenBauleitplanverfahren;
  } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfragevarianten = (abfrage as BaugenehmigungsverfahrenDto).abfragevariantenBaugenehmigungsverfahren;
  } else {
    abfragevarianten = (abfrage as WeiteresVerfahrenDto).abfragevariantenWeiteresVerfahren;
  }

  let abfragevariantenSachbearbeitung: AnyAbfrageDto[] | undefined = undefined;
  if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfragevariantenSachbearbeitung = (abfrage as BauleitplanverfahrenDto)
      .abfragevariantenSachbearbeitungBauleitplanverfahren;
  } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfragevariantenSachbearbeitung = (abfrage as BaugenehmigungsverfahrenDto)
      .abfragevariantenSachbearbeitungBaugenehmigungsverfahren;
  } else {
    abfragevariantenSachbearbeitung = (abfrage as WeiteresVerfahrenDto)
      .abfragevariantenSachbearbeitungWeiteresVerfahren;
  }

  if (abfragevarianten) {
    const abfragevariantenTree = abfragevarianten.map((value, index) =>
      buildSubTreeAbfragevariante(value, item, index, AnzeigeContextAbfragevariante.ABFRAGEVARIANTE),
    );
    item.children.push(...abfragevariantenTree);
  }

  if (abfragevariantenSachbearbeitung) {
    const abfragevariantenTree = abfragevariantenSachbearbeitung.map((value, index) =>
      buildSubTreeAbfragevariante(
        value,
        item,
        index + (abfragevarianten?.length ?? 0),
        AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG,
      ),
    );
    item.children.push(...abfragevariantenTree);
  }

  if (isEditableByAbfrageerstellung.value) {
    item.actions.push({
      name: CREATE_ABFRAGEVARIANTE,
      disabled: _.defaultTo(abfragevarianten?.length, 0) >= ABFRAGEVARIANTEN_LIMIT,
      effect: () => {
        emit("create-abfragevariante", item);
        openItem(item);
      },
    });
  }

  if (isEditableBySachbearbeitung.value) {
    item.actions.push({
      name: CREATE_ABFRAGEVARIANTE,
      disabled: _.defaultTo(abfragevariantenSachbearbeitung?.length, 0) >= ABFRAGEVARIANTEN_LIMIT,
      effect: () => {
        emit("create-abfragevariante-sachbearbeitung", item);
        openItem(item);
      },
    });
  }

  openItem(item);

  return item;
}

function buildAbfrageRoot(abfrage: AnyAbfrageDto): AbfrageTreeItem {
  const item = {
    id: "",
    type: getAbfrageFormTypeAbfrage(abfrage),
    name: ABFRAGE_NAME,
    parent: null,
    children: [],
    actions: [],
    onSelection: () => emit("select-abfrage", item),
    context: AnzeigeContextAbfragevariante.UNDEFINED,
    value: abfrage,
  };
  return item;
}

function buildSubTreeAbfragevariante(
  abfragevariante: AnyAbfragevarianteDto,
  parent: AbfrageTreeItem,
  index: number,
  context: AnzeigeContextAbfragevariante,
): AbfrageTreeItem {
  const editable = isEditableWithAnzeigeContextAbfragevariante(context);

  const item: AbfrageTreeItem = {
    id: generateTreeItemId(parent.id, index),
    type: getAbfrageFormTypeAbfragevariante(abfragevariante),
    name: getAbfragevarianteName(abfragevariante, context),
    parent,
    children: [],
    actions: [],
    onSelection: () => emit("select-abfragevariante", item),
    context,
    value: abfragevariante,
  };

  if (isEditableBySachbearbeitung.value) {
    item.actions.push({
      name: abfragevariante.id === props.relevanteAbfragevarianteId ? MARK_AS_NOT_RELEVANT : MARK_AS_RELEVANT,
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
          buildSubTreeBaugebiet(value, item, index, context, abfragevariante),
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
        buildSubTreeBauabschnitt(value, item, index, context, abfragevariante),
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
  context: AnzeigeContextAbfragevariante,
  abfragevariante: AnyAbfragevarianteDto,
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

  item.children = bauabschnitt.baugebiete.map((value, index) =>
    buildSubTreeBaugebiet(value, item, index, context, abfragevariante),
  );

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
  context: AnzeigeContextAbfragevariante,
  abfragevariante: AnyAbfragevarianteDto,
): AbfrageTreeItem {
  let abfrageFormTypeBaugebiet = undefined;
  if (abfragevariante.artAbfragevariante === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfrageFormTypeBaugebiet = AbfrageFormType.BAUGEBIET_BAULEITPLANVERFAHREN;
  } else if (abfragevariante.artAbfragevariante === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfrageFormTypeBaugebiet = AbfrageFormType.BAUGEBIET_BAUGENEHMIGUNGSVERFAHREN;
  } else {
    abfrageFormTypeBaugebiet = AbfrageFormType.BAUGEBIET_WEITERES_VERFAHREN;
  }

  const item: AbfrageTreeItem = {
    id: generateTreeItemId(parent.id, index),
    type: abfrageFormTypeBaugebiet,
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
  context: AnzeigeContextAbfragevariante,
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

function getAbfrageFormTypeAbfrage(abfrage: BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto): AbfrageFormType {
  if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    return AbfrageFormType.BAULEITPLANVERFAHREN;
  } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    return AbfrageFormType.BAUGENEHMIGUNGSVERFAHREN;
  } else {
    return AbfrageFormType.WEITERES_VERFAHREN;
  }
}

function getAbfrageFormTypeAbfragevariante(abfragevariante: AnyAbfragevarianteDto) {
  if (
    abfragevariante.artAbfragevariante ===
    AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren
  ) {
    return AbfrageFormType.ABFRAGEVARIANTE_BAULEITPLANVERFAHREN;
  } else if (
    abfragevariante.artAbfragevariante ===
    AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum.Baugenehmigungsverfahren
  ) {
    return AbfrageFormType.ABFRAGEVARIANTE_BAUGENEHMIGUNGSVERFAHREN;
  } else {
    return AbfrageFormType.ABFRAGEVARIANTE_WEITERES_VERFAHREN;
  }
}

function getAbfragevarianteName(
  abfragevariante: AnyAbfragevarianteDto,
  conextAnzeigeAbfragevariante: AnzeigeContextAbfragevariante,
): string {
  const abfragevarianteModel = createAbfragevarianteModel(abfragevariante);
  return `${abfragevarianteModel.getAbfragevariantenNrForContextAnzeigeAbfragevariante(
    conextAnzeigeAbfragevariante,
  )}\xa0-\xa0${_.isNil(abfragevariante.name) ? DEFAULT_NAME : abfragevariante.name}`;
}

function createAbfragevarianteModel(abfragevariante: AnyAbfragevarianteDto): AnyAbfragevarianteModel {
  if (
    abfragevariante.artAbfragevariante ===
    AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren
  ) {
    return new AbfragevarianteBauleitplanverfahrenModel(abfragevariante);
  } else if (
    abfragevariante.artAbfragevariante ===
    AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum.Baugenehmigungsverfahren
  ) {
    return new AbfragevarianteBaugenehmigungsverfahrenModel(abfragevariante);
  } else {
    return new AbfragevarianteWeiteresVerfahrenModel(abfragevariante);
  }
}

function bauratenDeterminableForAbfragevariante(abfragevariante: AnyAbfragevarianteDto): boolean {
  return (
    // Entweder müssen die Geschoßläche Wohnen oder die Wohneinheiten gesetzt sein.
    (!_.isNil(abfragevariante.weGesamt) || !_.isNil(abfragevariante.gfWohnenGesamt)) &&
    // Die Abfragevariante darf keine Bauabschnitte referenzieren.
    _.isEmpty(abfragevariante.bauabschnitte) &&
    // Das Datum für Realisierung von muss gesetzt sein.
    !_.isNil(abfragevariante.realisierungVon)
  );
}

function bauratenDeterminableForBaugebiet(baugebiet: BaugebietDto): boolean {
  return (
    // Entweder müssen die Geschoßläche Wohnen oder die Wohneinheiten gesetzt sein.
    (!_.isNil(baugebiet.weGeplant) || !_.isNil(baugebiet.gfWohnenGeplant)) &&
    // Die Abfragevariante darf keine Bauabschnitte referenzieren.
    _.isEmpty(baugebiet.bauraten) &&
    // Das Datum für Realisierung von muss gesetzt sein.
    !_.isNil(baugebiet.realisierungVon)
  );
}

function openItem(item: AbfrageTreeItem): void {
  // openItemIds.value = [...openItemIds.value, item.id];
}

/**
 * Erzeugt eine einzigartige Id für ein TreeItem, die auf der Id des Parents und seinem Index (unter seinen Silblings) basiert.
 * Die Id vom Root ist immer ein leerer String und braucht deshalb diese Funktion nicht.
 */
function generateTreeItemId(parentId: string, index: number): string {
  if (parentId === "") {
    return index.toString();
  }

  return `${parentId}.${index}`;
}

defineExpose({ generateTreeItemId });
</script>
