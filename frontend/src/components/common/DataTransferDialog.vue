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
          cols="11"
          md="9"
        >
          <v-text-field
            id="abfrageSuch_field"
            ref="abfrageSuchField"
            v-model="abfrageSearchModel"
            label="Suche"
            variant="underlined"
          />
        </v-col>
        <v-col
          cols="11"
          md="2"
          class="d-flex justify-end align-center"
        >
          <v-btn
            variant="outlined"
            id="abfrage_datenuebernahme_suchen_button"
            style="width: 120px"
            @click="fetchAbfragen()"
          >
            Suchen
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="11"
          md="11"
        >
          <v-select
            id="abfrage_datenuebernahme_dropdown"
            v-model="selectedAbfrageSearchResult"
            variant="underlined"
            :items="abfragen"
            item-value="id"
            :item-title="(item) => getItemText(item)"
            title="Abfrage für Datenübernahme auswählen"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-card-actions class="d-flex justify-end">
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
import { ref, watch } from "vue";
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
const abfrageSearchModel = ref("");

watch(
  selectedAbfrageSearchResult,
  async () => {
    if (!_.isNil(selectedAbfrageSearchResult.value)) {
      const idAbfrage = selectedAbfrageSearchResult.value;
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
    page: 1,
    pageSize: 20,
    sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
  };
  if (!_.isEmpty(abfrageSearchModel.value)) {
    searchQueryAndSortingDto.searchQuery = abfrageSearchModel.value;
    const searchResults = await searchForEntities(searchQueryAndSortingDto);
    abfragen.value = searchResults.searchResults
      ?.map((searchResult) => searchResult as AbfrageSearchResultDto)
      .filter(searchResultFilter) as Array<AbfrageSearchResultDto>;
  }
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
