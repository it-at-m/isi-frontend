<template>
  <v-container class="scale-transition">
    <v-expansion-panels variant="accordion">
      <v-expansion-panel @click="getReferencedAbfragen()">
        <v-expansion-panel-title> Abfragen </v-expansion-panel-title>
        <v-expansion-panel-text v-if="loadingAbfragen">
          <loading-progress-circular
            icon="mdi-account-multiple-plus"
            text="Abfragen werden geladen..."
          />
        </v-expansion-panel-text>
        <v-expansion-panel-text v-else>
          <v-list v-if="abfragenEmpty">
            <v-list-item>
              <v-list-item-subtitle>Dieses Bauvorhaben wird nicht durch Abfragen referenziert</v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item
              v-for="(abfrage, index) in abfragen"
              :key="index"
              link
            >
              <v-list-item-title
                :id="'abfragen_bauvorhaben_reference_title' + index"
                @click="routeToAbfrageInfo(abfrage)"
              >
                {{ abfrage.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                :id="'abfragen_bauvorhaben_reference_subtitle' + index"
                @click="routeToAbfrageInfo(abfrage)"
              >
                Erstellungsdatum: {{ formatDate(abfrage.createdDateTime) }}
              </v-list-item-subtitle>
              <template #append>
                <v-tooltip
                  v-if="abfrage.id && abfrage.id === abfrageWithRelevanteAbfragevarianteId"
                  location="bottom"
                >
                  <template #activator="{ props: tooltipProps }">
                    <v-icon v-bind="tooltipProps">mdi-star</v-icon>
                  </template>
                  <span>Die relevante Abfragevariante gehört zu dieser Abfrage.</span>
                </v-tooltip>
              </template>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel @click="getReferencedInfrastruktureinrichtungen()">
        <v-expansion-panel-title> Infrastruktureinrichtungen </v-expansion-panel-title>
        <v-expansion-panel-text v-if="loadingInfrastruktureinrichtung">
          <loading-progress-circular
            icon="mdi-home"
            text="Infrastruktureinrichtungen werden geladen..."
          />
        </v-expansion-panel-text>
        <v-expansion-panel-text v-else>
          <v-list v-if="infrastruktureinrichtungenEmpty">
            <v-list-item>
              <v-list-item-subtitle>
                Dieses Bauvorhaben wird nicht durch Infrastruktureinrichtungen referenziert
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item
              v-for="(infra, index) in infrastruktureinrichtungen"
              :key="index"
              link
            >
              <v-list-item-title
                :id="'infrastruktureinrichtungen_bauvorhaben_reference_title' + index"
                @click="routeToInfrastruktureinrichtungInfo(infra)"
              >
                {{ infra.nameEinrichtung }}
              </v-list-item-title>
              <v-list-item-subtitle
                :id="'infrastruktureinrichtungen_bauvorhaben_reference_subtitle' + index"
                @click="routeToInfrastruktureinrichtungInfo(infra)"
              >
                Typ: {{ getLookupValue(infra.infrastruktureinrichtungTyp, lookupStore.infrastruktureinrichtungTyp) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import {
  type AbfrageSearchResultDto,
  type InfrastruktureinrichtungSearchResultDto,
  type LookupEntryDto,
  AbfrageDtoArtAbfrageEnum,
  BauleitplanverfahrenDto,
  BaugenehmigungsverfahrenDto,
  WeiteresVerfahrenDto,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import moment from "moment";
import { useLookupStore } from "@/stores/LookupStore";
import { useRoute, useRouter } from "vue-router";
import { useBauvorhabenApi } from "@/composables/requests/BauvorhabenApi";
import { computed, ref } from "vue";
import { useSearchStore } from "@/stores/SearchStore";
import { useAbfragenApi } from "@/composables/requests/AbfragenApi";
import { AnyAbfragevarianteDto } from "@/types/common/Abfrage";
import LoadingProgressCircular from "@/components/common/LoadingProgressCircular.vue";

const lookupStore = useLookupStore();
const searchStore = useSearchStore();
const { getReferencedAbfrageList, getReferencedInfrastruktureinrichtungenList } = useBauvorhabenApi();
const { getById } = useAbfragenApi();
const router = useRouter();
const routeId = useRoute().params.id as string;
const abfragen = ref<AbfrageSearchResultDto[]>([]);
const abfrageWithRelevanteAbfragevarianteId = ref("");
const infrastruktureinrichtungen = ref<InfrastruktureinrichtungSearchResultDto[]>([]);
const abfragenEmpty = computed(() => _.isEmpty(abfragen.value));
const infrastruktureinrichtungenEmpty = computed(() => _.isEmpty(infrastruktureinrichtungen.value));
const loadingAbfragen = ref(false);
const loadingInfrastruktureinrichtung = ref(false);
let isAbfrageListOpen = false;
let isInfraListOpen = false;

async function getReferencedAbfragen(): Promise<void> {
  if (!isAbfrageListOpen && !_.isNil(routeId)) {
    loadingAbfragen.value = true;
    isAbfrageListOpen = true;
    const searchResults = await getReferencedAbfrageList(routeId).finally(() => (loadingAbfragen.value = false));
    if (!_.isNil(searchResults)) {
      abfragen.value = searchResults;
    }
  } else if (isAbfrageListOpen && !_.isNil(routeId)) {
    isAbfrageListOpen = false;
  } else {
    isAbfrageListOpen = false;
  }

  await findAbfrageWithRelevanteAbfragevariante();
}

async function findAbfrageWithRelevanteAbfragevariante(): Promise<void> {
  const relevanteAbfragevarianteId = searchStore.selectedBauvorhaben?.relevanteAbfragevariante;
  if (!relevanteAbfragevarianteId) {
    return;
  }

  for (const abfrageSearchResult of abfragen.value) {
    if (abfrageSearchResult.id) {
      const abfrage = await getById(abfrageSearchResult.id);

      let abfragevarianten: AnyAbfragevarianteDto[] = [];
      if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
        abfragevarianten = [
          ...((abfrage as BauleitplanverfahrenDto).abfragevariantenBauleitplanverfahren ?? []),
          ...((abfrage as BauleitplanverfahrenDto).abfragevariantenSachbearbeitungBauleitplanverfahren ?? []),
        ];
      } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
        abfragevarianten = [
          ...((abfrage as BaugenehmigungsverfahrenDto).abfragevariantenBaugenehmigungsverfahren ?? []),
          ...((abfrage as BaugenehmigungsverfahrenDto).abfragevariantenSachbearbeitungBaugenehmigungsverfahren ?? []),
        ];
      } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
        abfragevarianten = [
          ...((abfrage as WeiteresVerfahrenDto).abfragevariantenWeiteresVerfahren ?? []),
          ...((abfrage as WeiteresVerfahrenDto).abfragevariantenSachbearbeitungWeiteresVerfahren ?? []),
        ];
      }

      for (const abfragevariante of abfragevarianten) {
        if (abfragevariante.id === relevanteAbfragevarianteId) {
          abfrageWithRelevanteAbfragevarianteId.value = abfrageSearchResult.id;
          return;
        }
      }
    }
  }
}

async function getReferencedInfrastruktureinrichtungen(): Promise<void> {
  if (!isInfraListOpen && !_.isNil(routeId)) {
    loadingInfrastruktureinrichtung.value = true;
    isInfraListOpen = true;
    const searchResults = await getReferencedInfrastruktureinrichtungenList(routeId).finally(
      () => (loadingInfrastruktureinrichtung.value = false),
    );
    if (!_.isNil(searchResults)) {
      infrastruktureinrichtungen.value = searchResults;
    }
  } else if (isInfraListOpen && !_.isNil(routeId)) {
    isInfraListOpen = false;
  } else {
    isInfraListOpen = false;
  }
}

/**
 * Methode um Datum für die Anzeige zu formatieren
 */
function formatDate(dateTime: Date | undefined): string {
  return moment(dateTime).format("DD.MM.YYYY");
}

/**
 * Routing zur Detailansicht der Abfrage
 *
 * @param abfrageSearchResultDto zum ermitteln der Route.
 */
function routeToAbfrageInfo(abfrageSearchResultDto: AbfrageSearchResultDto): void {
  if (!_.isNil(abfrageSearchResultDto.id)) {
    router.push("/abfrage/" + abfrageSearchResultDto.id);
  }
}

/**
 * Routing zur Detailansicht der Infrastruktureinrichtung
 *
 * @param infrastruktureinrichtungSearchResultDto zum ermitteln der Route.
 */
function routeToInfrastruktureinrichtungInfo(
  infrastruktureinrichtungSearchResultDto: InfrastruktureinrichtungSearchResultDto,
): void {
  if (!_.isNil(infrastruktureinrichtungSearchResultDto.id)) {
    router.push("/infrastruktureinrichtung/" + infrastruktureinrichtungSearchResultDto.id);
  }
}

function getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
  return !_.isNil(list) ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value : "";
}
</script>
