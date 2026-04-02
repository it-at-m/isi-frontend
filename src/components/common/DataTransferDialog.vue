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
      <v-card-title class="px-6 pt-6 pb-2 text-h6"> Datenübernahme aus Abfrage </v-card-title>

      <v-card-text class="px-6 pb-2">
        <v-text-field
          ref="abfrageSuchField"
          v-model="searchQuery"
          clearable
          hide-details="auto"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          label="Abfrage suchen"
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
              v-for="item in resultItems"
              :key="item.value"
            >
              <v-list-item
                :active="pendingSelectedAbfrageId === item.value"
                :title="item.title"
                :subtitle="item.subtitle"
                prepend-icon="mdi-file-document-outline"
                @click="selectResult(item)"
              />
            </template>
          </v-list>
        </v-card>

        <div
          v-if="pendingSelectedAbfrageId"
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
          @click="uebernahmeAbbrechen"
        >
          Abbrechen
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!pendingSelectedAbfrageId"
          @click="abfrageUebernehmen"
        >
          Übernehmen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import _ from "lodash";
import {
  type AbfrageDto,
  AbfrageDtoArtAbfrageEnum,
  type AbfrageSearchResultDto,
  type LookupEntryDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
  StatusAbfrage,
} from "@/api/api-client/isi-backend";
import { createBauleitplanverfahrenDto } from "@/utils/Factories";
import { useLookupStore } from "@/stores/LookupStore";
import { useSearchStore } from "@/stores/SearchStore";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useAbfragenApi } from "@/composables/requests/AbfragenApi";
import { Context } from "@/utils/Context";

interface Props {
  context: Context;
}

interface Emits {
  (event: "abfrageUebernehmen", value: AbfrageDto): void;
  (event: "uebernahmeAbbrechen", value: void): void;
}

type ResultItem = {
  title: string;
  subtitle: string;
  label: string;
  value: string;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const dialogOpen = defineModel<boolean>({ required: true });

const { getById } = useAbfragenApi();
const { searchForEntities } = useSearchApi();
const lookupStore = useLookupStore();
const searchStore = useSearchStore();

const abfrageSuchField = ref();
const searchQuery = ref("");

const abfragen = ref<AbfrageSearchResultDto[]>([]);

const pendingSelectedAbfrageId = ref<string | undefined>(undefined);
const pendingSelectedLabel = ref<string>("");

const loading = ref(false);

let currentSearchRequestId = 0;
let isComponentActive = true;

/**
 * Formatiert den sichtbaren Text eines Suchtreffers.
 */
function getItemText(searchResult: AbfrageSearchResultDto): string {
  return (
    "Name: " +
    _.defaultTo(searchResult.name, "Kein Name vorhanden") +
    " - Status: " +
    _.defaultTo(getLookupValue(searchResult.statusAbfrage, lookupStore.statusAbfrage), "Kein Abfragestatus vorhanden") +
    " - Stand: " +
    _.defaultTo(
      getLookupValue(searchResult.standVerfahren, lookupStore.standVerfahren),
      "Kein Verfahrensstand vorhanden",
    )
  );
}

/**
 * Baut den Untertitel eines Suchtreffers.
 */
function getItemSubtitle(searchResult: AbfrageSearchResultDto): string {
  const art = _.defaultTo(searchResult.artAbfrage, "Unbekannte Art");
  return `Abfrage • ${art}`;
}

/**
 * Bereitet die Suchergebnisse für die Anzeige auf.
 */
const resultItems = computed<ResultItem[]>(() =>
  abfragen.value
    .filter((entry) => !_.isEmpty(entry.id))
    .map((entry) => ({
      title: _.defaultTo(entry.name, "Kein Name vorhanden"),
      subtitle: getItemSubtitle(entry),
      label: getItemText(entry),
      value: entry.id ?? "",
    })),
);

/**
 * Prüft, ob Ergebnisse angezeigt werden sollen.
 */
const hasListContent = computed<boolean>(() => resultItems.value.length > 0);

/**
 * Erstellt die Suchanfrage passend zum aktuellen Kontext.
 */
function createQuery(searchText: string) {
  const query = {
    searchQuery: searchText,
    selectBauleitplanverfahren: false,
    selectBaugenehmigungsverfahren: false,
    selectWeiteresVerfahren: false,
    selectBauvorhaben: false,
    selectGrundschule: false,
    selectGsNachmittagBetreuung: false,
    selectHausFuerKinder: false,
    selectKindergarten: false,
    selectKinderkrippe: false,
    selectMittelschule: false,
    page: 1,
    pageSize: 100,
    sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
  };

  if (props.context === Context.ABFRAGE) {
    // Issue 2 fix: Check if selectedAbfrage exists before accessing artAbfrage
    if (!searchStore.selectedAbfrage) {
      return null;
    }

    switch (searchStore.selectedAbfrage.artAbfrage) {
      case AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren:
        query.selectBauleitplanverfahren = true;
        break;
      case AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren:
        query.selectBaugenehmigungsverfahren = true;
        break;
      case AbfrageDtoArtAbfrageEnum.WeiteresVerfahren:
        query.selectWeiteresVerfahren = true;
        break;
      default:
        break;
    }
  } else {
    query.selectBauleitplanverfahren = true;
    query.selectBaugenehmigungsverfahren = true;
    query.selectWeiteresVerfahren = true;
  }

  return query;
}

/**
 * Filtert Suchergebnisse gemäß Kontext.
 */
function searchResultFilter(result: AbfrageSearchResultDto): boolean {
  if (props.context === Context.ABFRAGE) {
    // Issue 2 fix: Check if selectedAbfrage exists before filtering
    if (!searchStore.selectedAbfrage) {
      return false;
    }

    return (
      result.artAbfrage === searchStore.selectedAbfrage.artAbfrage &&
      result.statusAbfrage !== undefined &&
      result.statusAbfrage !== StatusAbfrage.Angelegt &&
      result.statusAbfrage !== StatusAbfrage.Abbruch
    );
  }

  if (props.context === Context.BAUVORHABEN) {
    return _.isEmpty(result.bauvorhaben);
  }

  return true;
}

/**
 * Führt die Suche aus und schützt vor veralteten Requests.
 */
async function search(query: string): Promise<void> {
  const trimmedQuery = _.trim(query);
  const requestId = ++currentSearchRequestId;

  if (_.isEmpty(trimmedQuery)) {
    abfragen.value = [];
    return;
  }

  loading.value = true;

  try {
    // Issue 2 fix: Check if query creation succeeded
    const searchQuery = createQuery(trimmedQuery);
    if (!searchQuery) {
      // selectedAbfrage is missing in ABFRAGE context
      abfragen.value = [];
      console.warn("Cannot perform search: selectedAbfrage is missing in ABFRAGE context");
      return;
    }

    // Issue 3 fix: Wrap searchForEntities in try/catch
    const result = await searchForEntities(searchQuery);

    if (!isComponentActive || requestId !== currentSearchRequestId) {
      return;
    }

    const normalizedQuery = trimmedQuery.toLowerCase();

    // Issue 1 fix: Apply filters to get filtered results, then take first 20
    abfragen.value =
      result.searchResults
        ?.map((entry) => entry as AbfrageSearchResultDto)
        .filter(searchResultFilter)
        .filter((entry) => getItemText(entry).toLowerCase().includes(normalizedQuery))
        .slice(0, 20) ?? [];
  } catch (error) {
    // Issue 3 fix: Handle errors gracefully
    console.error("Search failed:", error);
    if (isComponentActive && requestId === currentSearchRequestId) {
      abfragen.value = [];
    }
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
 */
function handleSearchInput(query: string): void {
  debouncedSearch.cancel();
  currentSearchRequestId++;
  loading.value = false;
  abfragen.value = [];

  if (_.isEmpty(_.trim(query))) {
    pendingSelectedAbfrageId.value = undefined;
    pendingSelectedLabel.value = "";
    return;
  }

  if (!_.isEmpty(pendingSelectedLabel.value) && pendingSelectedLabel.value !== query) {
    pendingSelectedAbfrageId.value = undefined;
    pendingSelectedLabel.value = "";
  }

  debouncedSearch(query);
}

/**
 * Merkt eine Auswahl stabil vor.
 */
function selectResult(item: ResultItem): void {
  pendingSelectedAbfrageId.value = item.value;
  pendingSelectedLabel.value = item.label;
  searchQuery.value = item.label;
}

/**
 * Übernimmt bei Enter zuerst die Auswahl, sonst den ersten Treffer.
 */
function handleEnter(): void {
  if (pendingSelectedAbfrageId.value) {
    void abfrageUebernehmen();
    return;
  }

  const firstResult = resultItems.value[0];
  if (!firstResult) {
    return;
  }

  pendingSelectedAbfrageId.value = firstResult.value;
  pendingSelectedLabel.value = firstResult.label;
  searchQuery.value = firstResult.label;
}

/**
 * Setzt den sichtbaren Zustand zurück.
 */
function clearSearch(): void {
  debouncedSearch.cancel();

  searchQuery.value = "";
  abfragen.value = [];
  pendingSelectedAbfrageId.value = undefined;
  pendingSelectedLabel.value = "";
  loading.value = false;

  currentSearchRequestId++;
}

/**
 * Holt aus einer Lookup-Liste den Wert zum Schlüssel.
 */
function getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
  return !_.isUndefined(list) && !_.isNil(key)
    ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
    : key;
}

/**
 * Übernimmt die aktuell ausgewählte Abfrage.
 */
async function abfrageUebernehmen(): Promise<void> {
  if (!pendingSelectedAbfrageId.value) {
    return;
  }

  // Issue 4 fix: Wrap getById in try/catch to handle errors gracefully
  try {
    let selectedAbfrage: AbfrageDto = createBauleitplanverfahrenDto();
    selectedAbfrage = await getById(pendingSelectedAbfrageId.value);

    clearSearch();
    emit("abfrageUebernehmen", selectedAbfrage);
  } catch (error) {
    console.error("Failed to load selected Abfrage:", error);
    // Reset state on error
    pendingSelectedAbfrageId.value = undefined;
    pendingSelectedLabel.value = "";
    // User will see the error in console and dialog remains open for retry
  }
}

/**
 * Bricht die Übernahme ab.
 */
function uebernahmeAbbrechen(): void {
  clearSearch();
  emit("uebernahmeAbbrechen");
}

/**
 * Beim Öffnen wird der Dialog zurückgesetzt und das Suchfeld fokussiert.
 */
watch(dialogOpen, async (isOpen) => {
  if (!isOpen) {
    return;
  }

  clearSearch();
  await nextTick();
  abfrageSuchField.value?.focus?.();
});

/**
 * Vor dem Unmount laufende debounced Aufrufe beenden.
 */
onBeforeUnmount(() => {
  isComponentActive = false;
  debouncedSearch.cancel();
});
</script>
