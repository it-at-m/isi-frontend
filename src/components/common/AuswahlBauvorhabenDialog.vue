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
        <v-autocomplete
          ref="bauvorhabenSuchField"
          v-model="selectedValue"
          v-model:search="searchQuery"
          :items="combinedItems"
          :loading="loading || loadingSuggestions"
          item-title="label"
          item-value="value"
          clearable
          no-filter
          hide-details="auto"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          label="Bauvorhaben suchen"
          prepend-inner-icon="mdi-magnify"
          @update:search="handleSearchInput"
          @update:model-value="handleSelection"
          @keydown.enter.prevent="handleEnter"
          @click:clear="clearSearch"
        >
          <template #no-data>
            <v-list-item>
              <v-list-item-title>Keine Ergebnisse</v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>

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

type AutocompleteItem = {
  label: string;
  value: string;
  type: "suggestion" | "result";
};

const dialogOpen = defineModel<boolean>({ required: true });
const selectedBauvorhabenId = defineModel<string | undefined>("selectedBauvorhabenId");

const { searchForEntities, searchForSearchwordSuggestion } = useSearchApi();

const bauvorhabenSuchField = ref();
const searchQuery = ref("");
const selectedValue = ref<string | null>(null);

const pendingSelectedBauvorhabenId = ref<string | undefined>(undefined);
const pendingSelectedLabel = ref<string>("");

const suggestions = ref<string[]>([]);
const bauvorhaben = ref<BauvorhabenSearchResultDto[]>([]);

const loading = ref(false);
const loadingSuggestions = ref(false);

let currentSearchRequestId = 0;
let currentSuggestionRequestId = 0;
let isComponentActive = true;

/**
 * Führt Suchvorschläge und echte Bauvorhaben-Ergebnisse
 * in einer gemeinsamen Liste für das Autocomplete-Feld zusammen.
 *
 * Suchvorschläge erhalten einen technischen Präfix,
 * damit sie nicht mit echten Bauvorhaben-IDs verwechselt werden.
 */
const combinedItems = computed<AutocompleteItem[]>(() => {
  const suggestionItems: AutocompleteItem[] = suggestions.value.map((suggestion) => ({
    label: `Suchvorschlag: ${suggestion}`,
    value: `suggestion::${suggestion}`,
    type: "suggestion",
  }));

  const resultItems: AutocompleteItem[] = bauvorhaben.value
    .filter((entry) => !_.isEmpty(entry.id) && !_.isEmpty(entry.nameVorhaben))
    .map((entry) => ({
      label: entry.nameVorhaben ?? "",
      value: entry.id ?? "",
      type: "result",
    }));

  return _.uniqBy([...suggestionItems, ...resultItems], (item) => item.value);
});

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
 * inklusive Seitengröße und Sortierung.
 *
 * @param searchText Der Text, nach dem gesucht werden soll.
 * @returns Eine vollständige Suchanfrage mit Paging und Sortierung.
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
 * Lädt Suchvorschläge für den aktuell eingegebenen Suchtext.
 *
 * @param query Der aktuelle Suchtext aus dem Eingabefeld.
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
 * Zusätzlich zur Backend-Suche werden die Ergebnisse im Frontend
 * auf den Namen des Bauvorhabens eingegrenzt.
 *
 * @param query Der aktuelle Suchtext aus dem Eingabefeld.
 * @returns Ein Promise, das abgeschlossen ist, sobald die Suchergebnisse verarbeitet wurden.
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
 * Die Funktion wird erst kurz nach der letzten Eingabe ausgeführt.
 * Wenn schnell weitergetippt wird, wird ein zuvor geplanter Aufruf verworfen.
 *
 * Wenn nach einer bestehenden Auswahl wieder frei getippt wird,
 * wird die gemerkte Auswahl zurückgesetzt.
 *
 * @param query Der aktuelle Inhalt des Suchfelds.
 */
function handleSearchInput(query: string): void {
  searchQuery.value = query;

  if (_.isEmpty(_.trim(query))) {
    suggestions.value = [];
    bauvorhaben.value = [];
    selectedValue.value = null;
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
 * Verarbeitet die Auswahl eines Eintrags aus dem Autocomplete-Feld.
 *
 * Bei einem Suchvorschlag wird nur der Suchtext übernommen
 * und sofort eine neue Suche gestartet.
 *
 * Bei einem echten Ergebnis wird die Bauvorhaben-ID stabil
 * in einer separaten Variable gespeichert, damit sie nicht verloren geht,
 * wenn das Autocomplete intern seine sichtbare Auswahl wieder ändert.
 *
 * @param value Der technische Wert des ausgewählten Eintrags.
 */
function handleSelection(value: string | null): void {
  selectedValue.value = value;

  if (_.isEmpty(value)) {
    return;
  }

  if (value.startsWith("suggestion::")) {
    const suggestionText = value.replace("suggestion::", "");
    searchQuery.value = suggestionText;
    selectedValue.value = null;
    pendingSelectedBauvorhabenId.value = undefined;
    pendingSelectedLabel.value = "";
    debouncedSuggest(suggestionText);
    debouncedSearch(suggestionText);
    return;
  }

  const selectedResult = combinedItems.value.find((item) => item.value === value && item.type === "result");
  if (!selectedResult) {
    return;
  }

  pendingSelectedBauvorhabenId.value = selectedResult.value;
  pendingSelectedLabel.value = selectedResult.label;
  searchQuery.value = selectedResult.label;
}

/**
 * Reagiert auf das Drücken der Enter-Taste.
 *
 * Wenn bereits ein Bauvorhaben gemerkt ist, wird dieses übernommen.
 * Andernfalls wird das erste Suchergebnis ausgewählt.
 */
function handleEnter(): void {
  if (pendingSelectedBauvorhabenId.value) {
    uebernehmen();
    return;
  }

  const firstResult = combinedItems.value.find((item) => item.type === "result");
  if (!firstResult) {
    return;
  }

  pendingSelectedBauvorhabenId.value = firstResult.value;
  pendingSelectedLabel.value = firstResult.label;
  selectedValue.value = firstResult.value;
  searchQuery.value = firstResult.label;
}

/**
 * Setzt den vollständigen sichtbaren Zustand der Komponente zurück.
 *
 * Zusätzlich zum Suchzustand wird auch die aktuell gemerkte
 * Bauvorhaben-Auswahl verworfen.
 */
function clearSearch(): void {
  debouncedSuggest.cancel();
  debouncedSearch.cancel();

  searchQuery.value = "";
  selectedValue.value = null;
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
 * und schließt anschließend den Dialog.
 */
function uebernehmen(): void {
  if (!pendingSelectedBauvorhabenId.value) {
    return;
  }

  selectedBauvorhabenId.value = pendingSelectedBauvorhabenId.value;
  dialogOpen.value = false;
}

/**
 * Beobachtet, ob der Dialog geöffnet ist.
 *
 * Beim Öffnen wird das Suchfeld fokussiert und der sichtbare Zustand
 * für eine neue Auswahl zurückgesetzt.
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
 * Hier werden nur laufende zeitverzögerte Suchaufrufe beendet,
 * damit keine verspäteten Antworten mehr verarbeitet werden.
 */
onBeforeUnmount(() => {
  isComponentActive = false;
  debouncedSuggest.cancel();
  debouncedSearch.cancel();
});
</script>
