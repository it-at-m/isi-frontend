<template>
  <v-dialog
    :value="dialogOpen"
    persistent
    width="60%"
  >
    <v-card class="overflow-x-hidden">
      <v-card-title
        class="text-wrap align-stretch"
        v-text="'Datenübernahme aus Abfrage'"
      />
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
        >
          <v-select
            id="bauvorhaben_abfrage_datenuebernahme_dropdown"
            v-model="selectedAbfrageSearchResult"
            :items="abfragen"
            :item-text="(item) => getItemText(item)"
            item-value="id"
            label="Abfragen"
            return-object
            hint="Abfrage für Datenübernahme auswählen"
            persistent-hint
            @focus="fetchAbfragen"
          />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          id="bauvorhaben_abfrage_datenuebernahme_abbrechen_button"
          class="text-wrap"
          text
          @click="uebernahmeAbbrechen"
          v-text="'Abbrechen'"
        />
        <v-btn
          id="bauvorhaben_abfrage_datenuebernahme_uebernehmen_button"
          class="text-wrap"
          color="primary"
          @click="abfrageUebernehmen"
          v-text="'Übernehmen'"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  AbfrageDto,
  AbfrageSearchResultDto,
  LookupEntryDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import { createBauleitplanverfahrenDto } from "@/utils/Factories";
import { useLookupStore } from "@/stores/LookupStore";
import { defineModel } from "@/utils/Vue";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useAbfragenApi } from "@/composables/requests/AbfragenApi";

interface Props {
  value: boolean;
}

interface Emits {
  (event: "abfrageUebernehmen", value: AbfrageDto): void;
  (event: "uebernahmeAbbrechen", value: void): void;
  (event: "input", value: boolean): void;
}

const { getById } = useAbfragenApi();
const { searchForEntities } = useSearchApi();
const { standVerfahren, statusAbfrage } = useLookupStore();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const dialogOpen = defineModel(props, emit);
const abfragen = ref<AbfrageSearchResultDto[]>([]);
const selectedAbfrageSearchResult = ref<AbfrageSearchResultDto>({});
let selectedAbfrage: AbfrageDto = createBauleitplanverfahrenDto();

onMounted(() => fetchAbfragen());

watch(
  selectedAbfrageSearchResult,
  async () => {
    if (!_.isNil(selectedAbfrageSearchResult.value) && !_.isNil(selectedAbfrageSearchResult.value.id)) {
      const idAbfrage = selectedAbfrageSearchResult.value.id;
      selectedAbfrage = await getById(idAbfrage, false);
    }
  },
  { immediate: true },
);

function getItemText(searchResult: AbfrageSearchResultDto): string {
  return (
    "Name: " +
    _.defaultTo(searchResult.name, "Kein Name vorhanden") +
    " - Status: " +
    _.defaultTo(getLookupValue(searchResult.statusAbfrage, statusAbfrage), "Kein Abfragestatus vorhanden") +
    " - Stand: " +
    _.defaultTo(getLookupValue(searchResult.standVerfahren, standVerfahren), "Kein Verfahrensstand vorhanden")
  );
}

async function fetchAbfragen(): Promise<void> {
  const searchQueryAndSortingDto = {
    searchQuery: "",
    selectBauleitplanverfahren: true,
    selectBaugenehmigungsverfahren: true,
    selectWeiteresVerfahren: true,
    selectBauvorhaben: false,
    selectGrundschule: false,
    selectGsNachmittagBetreuung: false,
    selectHausFuerKinder: false,
    selectKindergarten: false,
    selectKinderkrippe: false,
    selectMittelschule: false,
    page: undefined,
    pageSize: undefined,
    sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
  };
  const searchResults = await searchForEntities(searchQueryAndSortingDto);
  abfragen.value = searchResults.searchResults
    ?.map((searchResult) => searchResult as AbfrageSearchResultDto)
    .filter((abfrageSearchResult) => _.isNil(abfrageSearchResult.bauvorhaben)) as Array<AbfrageSearchResultDto>;
}

/**
 * Holt aus der im Parameter gegebenen Lookup-Liste den darin hinterlegten Wert des im Parameter gegebenen Schlüssel.
 *
 * @param key für welchen der Wert aus der Liste geholt werden soll.
 * @param list mit den Schlüssel-Wert-Paaren.
 * @return den Wert für den Schlüssel. Ist der Parameter key oder die Liste undefined, so wird auch undefined zurückgegeben.
 */
function getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
  return !_.isUndefined(list) && !_.isNil(key)
    ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
    : key;
}

function abfrageUebernehmen(): void {
  selectedAbfrageSearchResult.value = {};
  emit("abfrageUebernehmen", selectedAbfrage);
}

function uebernahmeAbbrechen(): void {
  selectedAbfrageSearchResult.value = {};
  emit("uebernahmeAbbrechen");
}
</script>
