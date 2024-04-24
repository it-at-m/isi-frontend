<template>
  <v-list
    v-if="searchResultsAsArray.length > 0"
    v-scroll.self="onScroll"
    :height="viewportHeight"
    class="pa-0 ma-0 overflow-y-auto"
  >
    <!-- eslint-disable vue/no-unused-vars -->
    <v-hover
      v-for="(item, index) in searchResultsAsArray"
      :key="index"
      v-slot="{ hover }"
    >
      <v-card
        v-if="isTypeOfAbfrage(item)"
        :id="'search_result_item_' + index"
        outlined
        class="my-1 mx-0 transition-swing"
        :elevation="hover ? 4 : 0"
        :disabled="disableAbfrageCard(castToAbfrageSearchResultDto(item))"
        @click="routeToAbfrageForm(item)"
      >
        <v-card-subtitle class="black--text">
          <v-icon
            left
            color="green lighten-1"
          >
            {{ getIconArtAbfrage(castToAbfrageSearchResultDto(item).artAbfrage) }}
          </v-icon>
          {{ castToAbfrageSearchResultDto(item).name }}
        </v-card-subtitle>
        <v-card-text>
          <span> Abfrageart: {{ getArtAbfrage(castToAbfrageSearchResultDto(item).artAbfrage) }} </span>
          <v-spacer />
          <span> Stadtbezirke: {{ getStadtbezirke(castToAbfrageSearchResultDto(item).stadtbezirke) }} </span>
          <v-spacer />
          <span>
            Status:
            {{ getLookupValueAbfrage(castToAbfrageSearchResultDto(item).statusAbfrage, statusAbfrageList) }}
          </span>
          <v-spacer />
          <span> Frist: {{ datumFormatted(castToAbfrageSearchResultDto(item).fristBearbeitung) }} </span>
        </v-card-text>
      </v-card>
      <v-card
        v-else-if="isTypeOfBauvorhaben(item)"
        :id="'search_result_item_' + index"
        outlined
        class="my-1 mx-0 transition-swing"
        :elevation="hover ? 4 : 0"
        @click="routeToBauvorhabenForm(item)"
      >
        <v-card-subtitle class="black--text">
          <v-icon
            left
            color="indigo lighten-1"
          >
            mdi-account-hard-hat
          </v-icon>
          {{ castToBauvorhabenSearchResultDto(item).nameVorhaben }}
        </v-card-subtitle>
        <v-card-text>
          <span> Stadtbezirke: {{ getStadtbezirke(castToBauvorhabenSearchResultDto(item).stadtbezirke) }} </span>
          <v-spacer />
          <span>
            Grundstücksgröße:
            {{ getFormattedGrundstuecksgroesse(castToBauvorhabenSearchResultDto(item).grundstuecksgroesse) }} m²
          </span>
          <v-spacer />
          <span>
            Stand:
            {{ getLookupValueBauvorhaben(castToBauvorhabenSearchResultDto(item).standVerfahren, standVerfahrenList) }}
          </span>
        </v-card-text>
      </v-card>
      <v-card
        v-else
        :id="'search_result_item_' + index"
        outlined
        class="my-1 mx-0 transition-swing"
        :elevation="hover ? 4 : 0"
        @click="routeToInfrastruktureinrichtungForm(item)"
      >
        <v-card-subtitle class="black--text">
          <v-icon
            left
            color="red lighten-1"
          >
            mdi-home
          </v-icon>
          {{ castToInfrastruktureinrichtungSearchResultDto(item).nameEinrichtung }}
        </v-card-subtitle>
        <v-card-text>
          <span>
            Einrichtungstyp:
            {{
              getLookupValueInfrastruktureinrichtung(
                castToInfrastruktureinrichtungSearchResultDto(item).infrastruktureinrichtungTyp,
                infrastruktureinrichtungTypList,
              )
            }}</span
          >
        </v-card-text>
      </v-card>
    </v-hover>
  </v-list>
  <v-container
    v-else
    class="pa-0 ma-0 w-100 d-flex justify-center align-center"
    style="height: 100%; min-height: 100px"
  >
    <span>Keine Suchergebnisse vorhanden</span>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  AbfrageSearchResultDto,
  AbfrageSearchResultDtoArtAbfrageEnum,
  BauvorhabenSearchResultDto,
  InfrastruktureinrichtungSearchResultDto,
  LookupEntryDto,
  SearchResultDto,
  SearchResultDtoTypeEnum,
  StadtbezirkDto,
  StatusAbfrage,
} from "@/api/api-client/isi-backend";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useSecurity } from "@/composables/security/Security";
import { useLookupStore } from "@/stores/LookupStore";
import { useSearchStore } from "@/stores/SearchStore";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { convertDateForFrontend } from "@/utils/Formatter";
import { useVuetify } from "@/utils/Vue";
import { Mutex, tryAcquire } from "async-mutex";
import _ from "lodash";
import { useRouter } from "vue-router/composables";

const pageRequestMutex = new Mutex();
const lookupStore = useLookupStore();
const searchStore = useSearchStore();
const router = useRouter();
const { searchForEntities } = useSearchApi();
const { hasOnlyRoleAnwender } = useSecurity();
const vuetify = useVuetify();
const infrastruktureinrichtungTypList = computed(() => lookupStore.infrastruktureinrichtungTyp);
const statusAbfrageList = computed(() => lookupStore.statusAbfrage);
const standVerfahrenList = computed(() => lookupStore.standVerfahren);
const getSearchQueryAndSorting = computed(() => _.cloneDeep(searchStore.requestSearchQueryAndSorting));
const searchResults = computed(() => _.cloneDeep(searchStore.searchResults));

/**
 * Berechnet die Höhe der verfübaren Listenhöhe in "vh" (Höhe Viewport in Hundert).
 * Die Höhe des App-Headers wird mit 50px angesetzt.
 */
const viewportHeight = computed(() => {
  const heightOfWindow = vuetify.breakpoint.height;
  return (heightOfWindow - 50) / (heightOfWindow / 100) + "vh";
});

const searchResultsAsArray = computed(() => {
  return !_.isNil(searchStore.searchResults.searchResults) ? _.cloneDeep(searchStore.searchResults.searchResults) : [];
});

const numberOfPossiblePages = computed(() => {
  const numberOfPossiblePages = searchResults.value.numberOfPages;
  return _.isNil(numberOfPossiblePages) ? 0 : numberOfPossiblePages;
});

/**
 * Diese Methode prüft, ob der Scrollbalken der Suchergebnisliste am Ende der Liste angekommen ist und triggert dann
 * den Suchrequest zum Holen der nächsten Seite und Anfügen der Suchergebnisse an die bestehenden Suchergebnisse.
 *
 * Des Weiteren wird der Request zum Holen der nächsten Seite nur dann getriggert, wenn kein anderer Request
 * zum Holen der nächsten Seite ausgeführt wird.
 */
function onScroll(scrollEvent: any): void {
  const { scrollHeight, scrollTop, clientHeight } = scrollEvent.target;
  // Prüfung ob das Ende des Scrollbereichs erreicht wurde.
  if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
    getAndAppendSearchResultsNextPage();
  }
}

/**
 * Holt die Suchergebnisse auf Basis des im Store hinterlegten SearchQueryAndSortingDto für die nächste Seite
 * und fügt die bestehenden Suchergebnisse an die bereits vorhandenen Suchergebnisse an.
 *
 * Die Ausführung der Suchen und das Speichern der Suchergebnisse im Store wird mittels eines Mutex abgesichert,
 * um eine Race-Condition bei mehreren schnell hintereinander ausgeführten Seitenaufrufen zu vermeiden.
 */
function getAndAppendSearchResultsNextPage(): void {
  tryAcquire(pageRequestMutex)
    .acquire()
    .then(() => {
      const searchQueryForEntitiesDto = getSearchQueryAndSorting.value;
      let currentPage = searchQueryForEntitiesDto.page;
      if (!_.isNil(currentPage) && ++currentPage <= numberOfPossiblePages.value) {
        searchQueryForEntitiesDto.page = currentPage;
        searchStore.setRequestSearchQueryAndSorting(new SearchQueryAndSortingModel(searchQueryForEntitiesDto));
        searchForEntities(searchQueryForEntitiesDto)
          .then((searchResultsNextPage) => {
            const currentSearchResults = searchResults.value;
            searchResultsNextPage.searchResults = _.concat(
              _.toArray(currentSearchResults.searchResults),
              _.toArray(searchResultsNextPage.searchResults),
            );
            searchStore.setSearchResults(_.cloneDeep(searchResultsNextPage));
          })
          .finally(() => pageRequestMutex.release());
      } else {
        pageRequestMutex.release();
      }
    });
}

// Type: ABFRAGE

function isTypeOfAbfrage(searchResult: SearchResultDto): boolean {
  return _.isEqual(searchResult.type, SearchResultDtoTypeEnum.Abfrage);
}

function castToAbfrageSearchResultDto(searchResult: SearchResultDto): AbfrageSearchResultDto {
  return searchResult as AbfrageSearchResultDto;
}

function routeToAbfrageForm(abfrageSearchResult: AbfrageSearchResultDto): void {
  if (!_.isUndefined(abfrageSearchResult.id)) {
    router.push({
      name: "updateabfrage",
      params: { id: abfrageSearchResult.id },
    });
  }
}

function getLookupValueAbfrage(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
  return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
}

function getIconArtAbfrage(artAbfrage: AbfrageSearchResultDtoArtAbfrageEnum | undefined) {
  let icon = "";
  if (artAbfrage === AbfrageSearchResultDtoArtAbfrageEnum.Bauleitplanverfahren) {
    icon = "mdi-comment-alert";
  } else if (artAbfrage === AbfrageSearchResultDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    icon = "mdi-account-multiple-plus";
  } else if (artAbfrage === AbfrageSearchResultDtoArtAbfrageEnum.WeiteresVerfahren) {
    icon = "mdi-account-plus";
  }
  return icon;
}

function getArtAbfrage(artAbfrage: AbfrageSearchResultDtoArtAbfrageEnum | undefined): string {
  let bezeichnungArtAbfrage = "";
  if (artAbfrage === AbfrageSearchResultDtoArtAbfrageEnum.Bauleitplanverfahren) {
    bezeichnungArtAbfrage = "Bauleitplanverfahren";
  } else if (artAbfrage === AbfrageSearchResultDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    bezeichnungArtAbfrage = "Baugenehmigungsverfahren";
  } else if (artAbfrage === AbfrageSearchResultDtoArtAbfrageEnum.WeiteresVerfahren) {
    bezeichnungArtAbfrage = "Weiteres Verfahren";
  }
  return bezeichnungArtAbfrage;
}

function getStadtbezirke(stadtbezirke: Set<StadtbezirkDto> | undefined): string {
  const auflistungStadtbezirksbezeichnungen = _.sortBy(_.isNil(stadtbezirke) ? [] : Array.from(stadtbezirke), [
    "nummer",
  ]).map((stadtbezirk: StadtbezirkDto) => {
    return stadtbezirk.nummer + "/" + stadtbezirk.name;
  });
  return _.join(auflistungStadtbezirksbezeichnungen, ", ");
}

function datumFormatted(datum: Date | undefined): string {
  return convertDateForFrontend(datum);
}

// Bauvorhaben

function isTypeOfBauvorhaben(searchResult: SearchResultDto): boolean {
  return _.isEqual(searchResult.type, SearchResultDtoTypeEnum.Bauvorhaben);
}

function castToBauvorhabenSearchResultDto(searchResult: SearchResultDto): BauvorhabenSearchResultDto {
  return searchResult as BauvorhabenSearchResultDto;
}

function routeToBauvorhabenForm(bauvorhabenSearchResult: BauvorhabenSearchResultDto): void {
  if (!_.isNil(bauvorhabenSearchResult.id)) {
    router.push({
      name: "editBauvorhaben",
      params: { id: bauvorhabenSearchResult.id },
    });
  }
}
function getFormattedGrundstuecksgroesse(grundstuecksgroesse: number | undefined): string {
  return _.isNil(grundstuecksgroesse) ? "" : grundstuecksgroesse.toLocaleString("de-DE");
}

function getLookupValueBauvorhaben(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
  return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
}

// Infrastruktureinrichtungen

function castToInfrastruktureinrichtungSearchResultDto(
  searchResult: SearchResultDto,
): InfrastruktureinrichtungSearchResultDto {
  return searchResult as InfrastruktureinrichtungSearchResultDto;
}

function disableAbfrageCard(item: AbfrageSearchResultDto): boolean {
  let result: boolean = hasOnlyRoleAnwender();
  if (result) {
    result =
      item.statusAbfrage != StatusAbfrage.ErledigtMitFachreferat &&
      item.statusAbfrage != StatusAbfrage.ErledigtOhneFachreferat;
  }
  return result;
}

function routeToInfrastruktureinrichtungForm(
  infrastruktureinrichtungSearchResult: InfrastruktureinrichtungSearchResultDto,
): void {
  if (!_.isNil(infrastruktureinrichtungSearchResult.id)) {
    router.push({
      name: "editInfrastruktureinrichtung",
      params: { id: infrastruktureinrichtungSearchResult.id },
    });
  }
}

function getLookupValueInfrastruktureinrichtung(
  key: string | undefined,
  list: Array<LookupEntryDto>,
): string | undefined {
  return !_.isUndefined(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
}
</script>

<style scoped></style>
