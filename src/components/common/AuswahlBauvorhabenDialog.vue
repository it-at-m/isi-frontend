<template>
  <v-dialog
    v-model="dialogOpen"
    persistent
    max-width="720"
  >
    <v-card
      class="rounded-xl"
      elevation="8"
    >
      <v-card-title class="px-6 pt-6 pb-2 text-h6"> Mit Vorhaben verknüpfen </v-card-title>

      <v-card-text class="px-6 pb-2">
        <v-text-field
          ref="bauvorhabenSuchField"
          v-model="searchQuery"
          clearable
          hide-details="auto"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          label="Vorhaben suchen"
          prepend-inner-icon="mdi-magnify"
          :loading="loading"
          @update:model-value="handleSearchInput"
          @keydown.enter.prevent="handleEnter"
          @click:clear="clearSearch"
        />

        <v-card
          v-if="hasListContent"
          class="mt-3 rounded-lg"
          variant="outlined"
        >
          <v-list density="comfortable">
            <template
              v-if="resultItems.length > 0"
              v-for="item in resultItems"
              :key="item.value"
            >
              <v-list-item
                :active="pendingSelectedBauvorhabenId === item.value"
                :title="item.label"
                :subtitle="item.subtitle"
                prepend-icon="mdi-office-building"
                @click="selectResult(item)"
              />
            </template>
          </v-list>
        </v-card>

        <div
          v-if="pendingSelectedBauvorhabenId"
          class="mt-3 text-body-2"
        >
          Ausgewählt:
          <strong>{{ pendingSelectedLabel }}</strong>
        </div>
      </v-card-text>

      <v-card-actions class="px-6 pb-6 pt-4">
        <v-spacer />
        <v-btn
          variant="text"
          @click="abbrechen"
        >
          Abbrechen
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!pendingSelectedBauvorhabenId"
          @click="uebernehmen"
        >
          Übernehmen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import _ from "lodash";
import {
  type BauvorhabenSearchResultDto,
  type SearchQueryDto,
  type StadtbezirkDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
  type AbfrageDto,
  BauvorhabenDto,
} from "@/api/api-client/isi-backend";
import { useSearchApi } from "@/composables/requests/search/SearchApi";

interface Emits {
  (event: "vorhabenUebernehmen", value: BauvorhabenDto): void;
}

type ResultItem = {
  label: string;
  subtitle: string;
  value: string;
};

const dialogOpen = defineModel<boolean>({ required: true });
const selectedBauvorhabenId = defineModel<string | undefined>("selectedBauvorhabenId");

const { searchForEntities } = useSearchApi();

const bauvorhabenSuchField = ref();
const searchQuery = ref("");

const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);

const pendingSelectedBauvorhabenId = ref<string | undefined>(undefined);
const pendingSelectedLabel = ref<string>("");

const loading = ref(false);

const emit = defineEmits<Emits>();

let currentSearchRequestId = 0;
let isComponentActive = true;

function getStadtbezirke(stadtbezirke: Set<StadtbezirkDto> | undefined): string {
  const auflistungStadtbezirksbezeichnungen = _.sortBy(_.isNil(stadtbezirke) ? [] : Array.from(stadtbezirke), [
    "nummer",
  ]).map((stadtbezirk: StadtbezirkDto) => {
    return stadtbezirk.nummer + "/" + stadtbezirk.name;
  });

  return _.join(auflistungStadtbezirksbezeichnungen, ", ");
}

/**
 * Bereitet die Bauvorhaben-Ergebnisse für die Anzeige in der Ergebnisliste auf.
 */
const resultItems = computed<ResultItem[]>(() =>
  bauvorhaben.value
    .filter((entry) => !_.isEmpty(entry.id) && !_.isEmpty(entry.nameVorhaben))
    .map((entry) => ({
      label: entry.nameVorhaben ?? "",
      subtitle: `Stadtbezirke: ${_.defaultTo(getStadtbezirke(entry.stadtbezirke), "Keine Stadtbezirke vorhanden")}`,
      value: entry.id ?? "",
    })),
);

/**
 * Prüft, ob Ergebnisse angezeigt werden sollen.
 */
const hasListContent = computed<boolean>(() => resultItems.value.length > 0);

/**
 * Erstellt die grundlegende Suchanfrage für Bauvorhaben.
 *
 * @param searchText Der Text, nach dem gesucht werden soll.
 * @returns Eine Suchanfrage, die nur auf Bauvorhaben eingeschränkt ist.
 */
function createQuery(searchText: string): SearchQueryDto {
  return {
    searchQuery: searchText,
    selectBauvorhaben: true,
    selectBauleitplanverfahren: false,
    selectBaugenehmigungsverfahren: false,
    selectWeiteresVerfahren: false,
    selectGrundschule: false,
    selectGsNachmittagBetreuung: false,
    selectHausFuerKinder: false,
    selectKindergarten: false,
    selectKinderkrippe: false,
    selectMittelschule: false,
    page: undefined,
    pageSize: undefined,
  } as SearchQueryDto;
}

/**
 * Erstellt eine vollständige Suchanfrage für Bauvorhaben
 * inklusive Paging und Sortierung.
 *
 * @param searchText Der Text, nach dem gesucht werden soll.
 * @returns Eine vollständige Suchanfrage.
 */
function createQueryFull(searchText: string) {
  return {
    ...createQuery(searchText),
    page: 1,
    pageSize: 20,
    sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
  };
}

/**
 * Lädt Bauvorhaben-Ergebnisse für den aktuellen Suchtext.
 *
 * Zusätzlich werden die Ergebnisse im Frontend
 * auf den Namen des Bauvorhabens eingegrenzt.
 *
 * @param query Der aktuelle Suchtext.
 * @returns Ein Promise, das abgeschlossen ist, sobald die Ergebnisse verarbeitet wurden.
 */
async function search(query: string): Promise<void> {
  const trimmedQuery = _.trim(query);
  const requestId = ++currentSearchRequestId;

  if (_.isEmpty(trimmedQuery)) {
    bauvorhaben.value = [];
    return;
  }

  loading.value = true;

  try {
    const result = await searchForEntities(createQueryFull(trimmedQuery));

    if (!isComponentActive || requestId !== currentSearchRequestId) {
      return;
    }

    const normalizedQuery = trimmedQuery.toLowerCase();

    bauvorhaben.value =
      result.searchResults
        ?.map((entry) => entry as BauvorhabenSearchResultDto)
        .filter((entry) => (entry.nameVorhaben ?? "").toLowerCase().includes(normalizedQuery)) ?? [];
  } finally {
    if (isComponentActive && requestId === currentSearchRequestId) {
      loading.value = false;
    }
  }
}

const debouncedSearch = _.debounce((query: string) => {
  void search(query);
}, 300);

/**
 * Reagiert auf Änderungen im Suchfeld.
 *
 * "Debounced" bedeutet hier:
 * Die Suche wird erst kurz nach der letzten Eingabe ausgeführt.
 * Wenn der Benutzer schnell weitertippt, wird ein zuvor geplanter Aufruf verworfen.
 *
 * @param query Der aktuelle Inhalt des Suchfelds.
 */
function handleSearchInput(query: string): void {
  debouncedSearch.cancel();
  currentSearchRequestId++;
  loading.value = false;
  bauvorhaben.value = [];

  if (_.isEmpty(_.trim(query))) {
    pendingSelectedBauvorhabenId.value = undefined;
    pendingSelectedLabel.value = "";
    return;
  }

  if (!_.isEmpty(pendingSelectedLabel.value) && pendingSelectedLabel.value !== query) {
    pendingSelectedBauvorhabenId.value = undefined;
    pendingSelectedLabel.value = "";
  }

  debouncedSearch(query);
}

/**
 * Merkt ein ausgewähltes Bauvorhaben stabil für die spätere Übernahme.
 *
 * @param item Das ausgewählte Bauvorhaben.
 */
function selectResult(item: ResultItem): void {
  pendingSelectedBauvorhabenId.value = item.value;
  pendingSelectedLabel.value = item.label;
  searchQuery.value = item.label;
}

/**
 * Reagiert auf das Drücken der Enter-Taste.
 *
 * Wenn bereits ein Bauvorhaben ausgewählt wurde, wird es übernommen.
 * Andernfalls wird das erste Ergebnis ausgewählt.
 */
function handleEnter(): void {
  if (pendingSelectedBauvorhabenId.value) {
    uebernehmen();
    return;
  }

  const firstResult = resultItems.value[0];
  if (!firstResult) {
    return;
  }

  pendingSelectedBauvorhabenId.value = firstResult.value;
  pendingSelectedLabel.value = firstResult.label;
  searchQuery.value = firstResult.label;
}

/**
 * Setzt den sichtbaren Such- und Auswahlzustand zurück.
 */
function clearSearch(): void {
  debouncedSearch.cancel();

  searchQuery.value = "";
  bauvorhaben.value = [];
  pendingSelectedBauvorhabenId.value = undefined;
  pendingSelectedLabel.value = "";
  loading.value = false;

  currentSearchRequestId++;
}

/**
 * Bricht die Auswahl ab.
 *
 * Dabei wird der sichtbare Zustand zurückgesetzt,
 * die Parent-Auswahl verworfen und der Dialog geschlossen.
 */
function abbrechen(): void {
  clearSearch();
  dialogOpen.value = false;
}

/**
 * Übernimmt das aktuell gemerkte Bauvorhaben
 * in das an den Parent gebundene Modell
 * und schließt den Dialog.
 */
function uebernehmen(): void {
  if (!pendingSelectedBauvorhabenId.value) {
    return;
  }

  selectedBauvorhabenId.value = pendingSelectedBauvorhabenId.value;
  dialogOpen.value = false;
  emit("vorhabenUebernehmen", selectedBauvorhabenId.value);
}

/**
 * Beobachtet das Öffnen des Dialogs.
 *
 * Beim Öffnen wird das Suchfeld fokussiert und der sichtbare Zustand zurückgesetzt.
 *
 * @param isOpen Gibt an, ob der Dialog aktuell geöffnet ist.
 */
watch(dialogOpen, async (isOpen) => {
  if (!isOpen) {
    return;
  }

  clearSearch();
  await nextTick();
  bauvorhabenSuchField.value?.focus?.();
});

/**
 * Wird aufgerufen, bevor die Komponente aus dem DOM entfernt wird.
 *
 * Hier werden nur laufende zeitverzögerte Suchaufrufe beendet.
 */
onBeforeUnmount(() => {
  isComponentActive = false;
  debouncedSearch.cancel();
});
</script>
