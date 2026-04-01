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
      <v-card-title class="px-6 pt-6 pb-2 text-h6"> Mit Bauvorhaben verknüpfen </v-card-title>

      <v-card-text class="px-6 pb-2">
        <v-text-field
          ref="bauvorhabenSuchField"
          v-model="searchQuery"
          clearable
          hide-details="auto"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          label="Bauvorhaben suchen"
          prepend-inner-icon="mdi-magnify"
          :loading="loading || loadingSuggestions"
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
              v-if="suggestionItems.length > 0"
              v-for="item in suggestionItems"
              :key="item.value"
            >
              <v-list-item
                :title="item.label"
                subtitle="Suchvorschlag"
                prepend-icon="mdi-magnify"
                @click="selectSuggestion(item)"
              />
            </template>

            <v-divider v-if="suggestionItems.length > 0 && resultItems.length > 0" />

            <template
              v-if="resultItems.length > 0"
              v-for="item in resultItems"
              :key="item.value"
            >
              <v-list-item
                :active="pendingSelectedBauvorhabenId === item.value"
                :title="item.label"
                subtitle="Bauvorhaben"
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
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import { useSearchApi } from "@/composables/requests/search/SearchApi";

type SuggestionItem = {
  label: string;
  value: string;
};

type ResultItem = {
  label: string;
  value: string;
};

const dialogOpen = defineModel<boolean>({ required: true });
const selectedBauvorhabenId = defineModel<string | undefined>("selectedBauvorhabenId");

const { searchForEntities, searchForSearchwordSuggestion } = useSearchApi();

const bauvorhabenSuchField = ref();
const searchQuery = ref("");

const suggestions = ref<string[]>([]);
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);

const pendingSelectedBauvorhabenId = ref<string | undefined>(undefined);
const pendingSelectedLabel = ref<string>("");

const loading = ref(false);
const loadingSuggestions = ref(false);

let currentSearchRequestId = 0;
let currentSuggestionRequestId = 0;
let isComponentActive = true;

/**
 * Bereitet die Suchvorschläge für die Anzeige in der Vorschlagsliste auf.
 */
const suggestionItems = computed<SuggestionItem[]>(() =>
  suggestions.value.map((suggestion) => ({
    label: suggestion,
    value: suggestion,
  })),
);

/**
 * Bereitet die Bauvorhaben-Ergebnisse für die Anzeige in der Ergebnisliste auf.
 */
const resultItems = computed<ResultItem[]>(() =>
  bauvorhaben.value
    .filter((entry) => !_.isEmpty(entry.id) && !_.isEmpty(entry.nameVorhaben))
    .map((entry) => ({
      label: entry.nameVorhaben ?? "",
      value: entry.id ?? "",
    })),
);

/**
 * Prüft, ob Vorschläge oder Ergebnisse angezeigt werden sollen.
 */
const hasListContent = computed<boolean>(() => suggestionItems.value.length > 0 || resultItems.value.length > 0);

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
 * Lädt Suchvorschläge für den aktuellen Suchtext.
 *
 * @param query Der aktuelle Suchtext.
 * @returns Ein Promise, das abgeschlossen ist, sobald die Vorschläge verarbeitet wurden.
 */
async function suggest(query: string): Promise<void> {
  const trimmedQuery = _.trim(query);
  const requestId = ++currentSuggestionRequestId;

  if (_.isEmpty(trimmedQuery)) {
    suggestions.value = [];
    return;
  }

  loadingSuggestions.value = true;

  try {
    const result = await searchForSearchwordSuggestion(createQuery(trimmedQuery));

    if (!isComponentActive || requestId !== currentSuggestionRequestId) {
      return;
    }

    const foundSuggestions = _.toArray(result.suchwortSuggestions ?? []);
    suggestions.value = _.uniq([trimmedQuery, ...foundSuggestions]);
  } finally {
    if (isComponentActive && requestId === currentSuggestionRequestId) {
      loadingSuggestions.value = false;
    }
  }
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

const debouncedSuggest = _.debounce((query: string) => {
  void suggest(query);
}, 200);

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
  searchQuery.value = query;

  if (_.isEmpty(_.trim(query))) {
    suggestions.value = [];
    bauvorhaben.value = [];
    pendingSelectedBauvorhabenId.value = undefined;
    pendingSelectedLabel.value = "";
    return;
  }

  if (!_.isEmpty(pendingSelectedLabel.value) && pendingSelectedLabel.value !== query) {
    pendingSelectedBauvorhabenId.value = undefined;
    pendingSelectedLabel.value = "";
  }

  debouncedSuggest(query);
  debouncedSearch(query);
}

/**
 * Übernimmt einen Suchvorschlag in das Suchfeld
 * und startet direkt eine neue Suche.
 *
 * @param item Der ausgewählte Suchvorschlag.
 */
function selectSuggestion(item: SuggestionItem): void {
  searchQuery.value = item.label;
  pendingSelectedBauvorhabenId.value = undefined;
  pendingSelectedLabel.value = "";

  debouncedSuggest(item.label);
  debouncedSearch(item.label);
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
  debouncedSuggest.cancel();
  debouncedSearch.cancel();

  searchQuery.value = "";
  suggestions.value = [];
  bauvorhaben.value = [];
  pendingSelectedBauvorhabenId.value = undefined;
  pendingSelectedLabel.value = "";
  loading.value = false;
  loadingSuggestions.value = false;

  currentSearchRequestId++;
  currentSuggestionRequestId++;
}

/**
 * Bricht die Auswahl ab.
 *
 * Dabei wird der sichtbare Zustand zurückgesetzt,
 * die Parent-Auswahl verworfen und der Dialog geschlossen.
 */
function abbrechen(): void {
  clearSearch();
  selectedBauvorhabenId.value = undefined;
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
  debouncedSuggest.cancel();
  debouncedSearch.cancel();
});
</script>
