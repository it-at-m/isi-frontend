<template>
  <v-dialog
    v-model="dialogOpen"
    persistent
    width="60%"
  >
    <v-card class="overflow-x-hidden">
      <v-card-title class="align-stretch">Datenübernahme aus Abfrage</v-card-title>
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
        >
          <v-autocomplete
            id="abfrage_datenuebernahme_dropdown"
            v-model="selectedAbfrageSearchResult"
            :items="abfragen"
            :item-title="(item) => getItemText(item)"
            item-value="id"
            label="Abfragen"
            variant="underlined"
            return-object
            hint="Abfrage für Datenübernahme auswählen"
            persistent-hint
            @update:focused="!$event || fetchAbfragen()"
          />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          id="abfrage_datenuebernahme_abbrechen_button"
          @click="uebernahmeAbbrechen"
        >
          Abbrechen
        </v-btn>
        <v-btn
          id="abfrage_datenuebernahme_uebernehmen_button"
          variant="elevated"
          color="primary"
          @click="abfrageUebernehmen"
        >
          Übernehmen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  type AbfrageDto,
  type AbfrageSearchResultDto,
  type LookupEntryDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
  StatusAbfrage,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
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

const { getById } = useAbfragenApi();
const { searchForEntities } = useSearchApi();
const lookupStore = useLookupStore();
const searchStore = useSearchStore();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const dialogOpen = defineModel<boolean>({ required: true });
const abfragen = ref<AbfrageSearchResultDto[]>([]);
const selectedAbfrageSearchResult = ref<AbfrageSearchResultDto>();
let selectedAbfrage: AbfrageDto = createBauleitplanverfahrenDto();

onMounted(() => fetchAbfragen());

watch(
  selectedAbfrageSearchResult,
  async () => {
    if (!_.isNil(selectedAbfrageSearchResult.value) && !_.isNil(selectedAbfrageSearchResult.value.id)) {
      const idAbfrage = selectedAbfrageSearchResult.value.id;
      selectedAbfrage = await getById(idAbfrage);
    }
  },
  { immediate: true },
);

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
    .filter(searchResultFilter) as Array<AbfrageSearchResultDto>;
}

function searchResultFilter(result: AbfrageSearchResultDto): boolean {
  if (props.context === Context.ABFRAGE) {
    return (
      result.artAbfrage === searchStore.selectedAbfrage?.artAbfrage &&
      result.statusAbfrage !== undefined &&
      result.statusAbfrage !== StatusAbfrage.Angelegt &&
      result.statusAbfrage !== StatusAbfrage.Abbruch
    );
  } else if (props.context === Context.BAUVORHABEN) {
    return _.isNil(result.bauvorhaben);
  }
  return true;
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
  selectedAbfrageSearchResult.value = undefined;
  emit("abfrageUebernehmen", selectedAbfrage);
}

function uebernahmeAbbrechen(): void {
  selectedAbfrageSearchResult.value = undefined;
  emit("uebernahmeAbbrechen");
}
</script>
