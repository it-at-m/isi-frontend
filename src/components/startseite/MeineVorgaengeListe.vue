<template>
  <div class="d-flex flex-column fill-height">
    <h2 class="text-h5 text-primary font-weight-bold mb-3">Meine Vorgänge</h2>

    <div class="d-flex align-center flex-nowrap ga-2 mb-3">
      <v-select
        id="meine_vorgaenge_schnellfilter"
        v-model="schnellfilter"
        :items="schnellfilterOptionen"
        label="Meine Vorgänge"
        variant="outlined"
        density="compact"
        hide-details
        append-inner-icon="mdi-filter"
        style="max-width: 220px; min-width: 0"
      />
      <v-select
        id="meine_vorgaenge_sortierung"
        v-model="sortierung"
        :items="sortierungOptionen"
        label="Sortierung"
        variant="outlined"
        density="compact"
        hide-details
        append-inner-icon="mdi-unfold-more-horizontal"
        style="max-width: 220px; min-width: 0"
      />
      <v-spacer />
      <v-menu
        id="meine_vorgaenge_neu_menu"
        location="bottom end"
        transition="slide-y-transition"
      >
        <template #activator="{ props: menuProps }">
          <v-btn
            id="meine_vorgaenge_neu_button"
            v-bind="menuProps"
            color="primary"
            variant="outlined"
            rounded
            append-icon="mdi-file-document-plus-outline"
          >
            Neu
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="art in abfrageArten"
            :key="art.value"
            :prepend-icon="art.icon"
            :title="art.title"
            @click="createAbfrage(art.value)"
          />
        </v-list>
      </v-menu>
    </div>

    <v-list
      v-if="vorgaenge.length > 0"
      id="meine_vorgaenge_liste"
      v-scroll.self="onScroll"
      class="pa-0 ma-0 flex-grow-1 overflow-y-auto"
      style="min-height: 0"
    >
      <v-hover
        v-for="(vorgang, index) in vorgaenge"
        :key="vorgang.id ?? index"
        v-slot="{ isHovering }"
      >
        <v-card
          :id="'meine_vorgaenge_item_' + index"
          :elevation="isHovering ? 6 : 1"
          class="my-2 mr-2 pt-3 scale-transition"
          @click="routeToAbfrage(vorgang)"
        >
          <v-card-subtitle
            class="text-black"
            opacity="1"
          >
            <v-icon
              start
              color="green-lighten-1"
            >
              {{ getAbfrageIcon(vorgang.artAbfrage) }}
            </v-icon>
            <span class="font-weight-bold">{{ vorgang.name }}</span>
            - {{ getAbfrageArtLabel(vorgang.artAbfrage) }}
          </v-card-subtitle>
          <v-card-text class="d-flex flex-wrap ga-4 text-caption">
            <span>
              <v-icon size="small">mdi-information-outline</v-icon>
              {{ getStatusBezeichnung(vorgang.statusAbfrage) }}
            </span>
            <span>
              <v-icon size="small">mdi-calendar-clock</v-icon>
              Bearbeitungsfrist: {{ datumFormatted(vorgang.fristBearbeitung) }}
            </span>
            <span>
              <v-icon size="small">mdi-map-marker</v-icon>
              {{ getStadtbezirke(vorgang.stadtbezirke) }}
            </span>
          </v-card-text>
        </v-card>
      </v-hover>
      <div
        v-if="hasWeitereSeiten"
        class="d-flex justify-center my-2"
      >
        <v-btn
          id="meine_vorgaenge_mehr_laden"
          variant="text"
          size="small"
          @click="loadAndAppendNextPage"
        >
          Mehr laden
        </v-btn>
      </div>
    </v-list>
    <v-container
      v-else
      id="meine_vorgaenge_leer"
      class="pa-0 ma-0 w-100 d-flex justify-center align-center flex-grow-1"
      style="min-height: 100px"
    >
      <span>Keine eigenen Vorgänge vorhanden</span>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import {
  type AbfrageSearchResultDto,
  type LookupEntryDto,
  type SearchQueryAndSortingDto,
  type StadtbezirkDto,
  AbfrageDtoArtAbfrageEnum,
} from "@/api/api-client/isi-backend";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useStartseitenEinstellungApi } from "@/composables/requests/startseite/StartseitenEinstellungApi";
import { useLookupStore } from "@/stores/LookupStore";
import { getAbfrageArtLabel, getAbfrageIcon } from "@/utils/AbfrageIconUtil";
import { convertDateForFrontend } from "@/utils/Formatter";
import {
  DEFAULT_SCHNELLFILTER,
  DEFAULT_SORTIERUNG,
  SCHNELLFILTER_OPTIONEN,
  SORTIERUNG_OPTIONEN,
  getSortOrderForSortierung,
  getStatusAbfrageForSchnellfilter,
  type SchnellfilterVorgaenge,
  type SortierungVorgaenge,
} from "@/utils/StartseiteUtil";
import { Mutex, tryAcquire } from "async-mutex";
import _ from "lodash";
import { useRouter } from "vue-router";

const PAGE_SIZE = 20;

const router = useRouter();
const lookupStore = useLookupStore();
const { searchForEntities } = useSearchApi();
const { getStartseitenEinstellung } = useStartseitenEinstellungApi();

const pageRequestMutex = new Mutex();

const schnellfilter = ref<SchnellfilterVorgaenge>(DEFAULT_SCHNELLFILTER);
const sortierung = ref<SortierungVorgaenge>(DEFAULT_SORTIERUNG);
const vorgaenge = ref<Array<AbfrageSearchResultDto>>([]);
const page = ref(1);
const numberOfPages = ref(0);

/**
 * Kennung der aktuellen Filter-/Sortiergeneration.
 *
 * Jeder Neuaufbau der Liste erhöht den Zähler. Antworten älterer Generationen werden verworfen,
 * damit ein langsamer Request einer vorherigen Filtereinstellung die Liste nicht überschreibt
 * oder fremde Ergebnisse anhängt.
 */
const generation = ref(0);

const hasWeitereSeiten = computed(() => page.value < numberOfPages.value);

const schnellfilterOptionen = SCHNELLFILTER_OPTIONEN;
const sortierungOptionen = SORTIERUNG_OPTIONEN;
const statusAbfrageList = computed(() => lookupStore.statusAbfrage);

const abfrageArten = [
  AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
  AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren,
  AbfrageDtoArtAbfrageEnum.WeiteresVerfahren,
].map((value) => ({
  value,
  title: getAbfrageArtLabel(value) + " erstellen",
  icon: getAbfrageIcon(value),
}));

/**
 * Baut die Suchanfrage für die eigenen Vorgänge auf.
 *
 * Es werden ausschließlich die drei Abfragearten durchsucht und serverseitig über
 * filterNurEigeneAbfragen auf die selbst angelegten Abfragen eingeschränkt.
 */
function createSearchQuery(requestedPage: number): SearchQueryAndSortingDto {
  return {
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
    filterNurEigeneAbfragen: true,
    filterStatusAbfrage: getStatusAbfrageForSchnellfilter(schnellfilter.value),
    page: requestedPage,
    pageSize: PAGE_SIZE,
    // Die Werte von sortBy/sortOrder entsprechen den Backend-Enums SortAttribute und SortOrder.
    sortBy: sortierung.value,
    sortOrder: getSortOrderForSortierung(sortierung.value),
  } as unknown as SearchQueryAndSortingDto;
}

/**
 * Lädt die erste Seite der eigenen Vorgänge und ersetzt die bisherige Liste.
 *
 * Trifft währenddessen eine neuere Filter- oder Sortierauswahl ein, wird das Ergebnis verworfen.
 */
async function loadVorgaenge(): Promise<void> {
  const aktuelleGeneration = ++generation.value;
  const searchResults = await searchForEntities(createSearchQuery(1));
  if (aktuelleGeneration !== generation.value) {
    return;
  }
  page.value = 1;
  numberOfPages.value = searchResults.numberOfPages ?? 0;
  vorgaenge.value = _.toArray(searchResults.searchResults) as Array<AbfrageSearchResultDto>;
}

/**
 * Lädt die nächste Seite und hängt sie an die bestehende Liste an.
 *
 * Der Mutex verhindert eine Race-Condition bei mehreren schnell aufeinanderfolgenden Seitenaufrufen.
 * Ergebnisse einer überholten Filter- oder Sortiergeneration werden nicht angehängt.
 */
function loadAndAppendNextPage(): void {
  tryAcquire(pageRequestMutex)
    .acquire()
    .then(() => {
      const aktuelleGeneration = generation.value;
      const nextPage = page.value + 1;
      if (nextPage > numberOfPages.value) {
        pageRequestMutex.release();
        return;
      }
      searchForEntities(createSearchQuery(nextPage))
        .then((searchResults) => {
          if (aktuelleGeneration !== generation.value) {
            return;
          }
          page.value = nextPage;
          numberOfPages.value = searchResults.numberOfPages ?? 0;
          vorgaenge.value = _.concat(
            vorgaenge.value,
            _.toArray(searchResults.searchResults) as Array<AbfrageSearchResultDto>,
          );
        })
        .catch(() => {
          // Der Fehler wurde bereits im ErrorHandler der SearchApi behandelt.
        })
        .finally(() => pageRequestMutex.release());
    })
    .catch(() => {
      // Es läuft bereits ein Request zum Holen der nächsten Seite.
    });
}

function onScroll(scrollEvent: any): void {
  const { scrollHeight, scrollTop, clientHeight } = scrollEvent.target;
  if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
    loadAndAppendNextPage();
  }
}

function routeToAbfrage(vorgang: AbfrageSearchResultDto): void {
  if (!_.isNil(vorgang.id)) {
    router.push("/abfrage/" + vorgang.id);
  }
}

function createAbfrage(artAbfrage: AbfrageDtoArtAbfrageEnum): void {
  router.push("/abfrage?art=" + artAbfrage);
}

function getStatusBezeichnung(statusAbfrage: string | undefined): string {
  return statusAbfrageList.value?.find((lookupEntry: LookupEntryDto) => lookupEntry.key === statusAbfrage)?.value ?? "";
}

function getStadtbezirke(stadtbezirke: Set<StadtbezirkDto> | undefined): string {
  const bezeichnungen = _.sortBy(_.isNil(stadtbezirke) ? [] : Array.from(stadtbezirke), ["nummer"]).map(
    (stadtbezirk: StadtbezirkDto) => stadtbezirk.nummer + "/" + stadtbezirk.name,
  );
  return _.join(bezeichnungen, ", ");
}

function datumFormatted(datum: Date | undefined): string {
  return convertDateForFrontend(datum);
}

watch([schnellfilter, sortierung], () => {
  // Der Fehler wurde bereits im ErrorHandler der SearchApi behandelt.
  loadVorgaenge().catch(() => undefined);
});

onMounted(async () => {
  try {
    const einstellung = await getStartseitenEinstellung();
    schnellfilter.value = (einstellung.schnellfilter as unknown as SchnellfilterVorgaenge) ?? DEFAULT_SCHNELLFILTER;
    sortierung.value = (einstellung.sortBy as unknown as SortierungVorgaenge) ?? DEFAULT_SORTIERUNG;
  } catch {
    // Ohne gespeicherte Einstellungen bleiben die Standardwerte bestehen.
  }
  // Der Fehler wurde bereits im ErrorHandler der SearchApi behandelt.
  await loadVorgaenge().catch(() => undefined);
});

defineExpose({
  schnellfilter,
  sortierung,
  vorgaenge,
  hasWeitereSeiten,
  createSearchQuery,
  loadVorgaenge,
  loadAndAppendNextPage,
});
</script>
