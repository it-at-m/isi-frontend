<template>
  <v-container class="transition-swing">
    <v-expansion-panels>
      <v-expansion-panel @click="getReferencedAbfragen()">
        <v-expansion-panel-header> Abfragen </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list v-if="abfragenEmpty">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Dieses Bauvorhaben wird nicht durch Abfragen referenziert</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item
              v-for="(abfrage, index) in abfragen"
              :key="index"
              link
            >
              <v-list-item-content
                :id="'abfragen_bauvorhaben_reference_' + index"
                @click="routeToAbfrageInfo(abfrage)"
              >
                <v-list-item-title>{{ abfrage.name }}</v-list-item-title>
                <v-list-item-subtitle
                  >Erstellungsdatum: {{ formatDate(abfrage.createdDateTime) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel @click="getReferencedInfrastruktureinrichtungen()">
        <v-expansion-panel-header> Infrastruktureinrichtungen </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list v-if="infrastruktureinrichtungenEmpty">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle
                  >Dieses Bauvorhaben wird nicht durch Infrastruktureinrichtungen referenziert</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item
              v-for="(infra, index) in infrastruktureinrichtungen"
              :key="index"
              link
            >
              <v-list-item-content
                :id="'infrastruktureinrichtungen_bauvorhaben_reference_' + index"
                @click="routeToInfrastruktureinrichtungInfo(infra)"
              >
                <v-list-item-title> {{ infra.nameEinrichtung }} </v-list-item-title>
                <v-list-item-subtitle>
                  Typ: {{ getLookupValue(infra.infrastruktureinrichtungTyp, infrastruktureinrichtungTyp) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import {
  AbfrageSearchResultDto,
  InfrastruktureinrichtungSearchResultDto,
  LookupEntryDto,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import moment from "moment";
import { useLookupStore } from "@/stores/LookupStore";
import { useRoute, useRouter } from "vue-router";
import { useBauvorhabenApi } from "@/composables/requests/BauvorhabenApi";

const { infrastruktureinrichtungTyp } = useLookupStore();
const { getReferencedAbfrageList, getReferencedInfrastruktureinrichtungenList } = useBauvorhabenApi();
const router = useRouter();
const routeId = useRoute().params.id as string;
const abfragen = ref<AbfrageSearchResultDto[]>([]);
const infrastruktureinrichtungen = ref<InfrastruktureinrichtungSearchResultDto[]>([]);
const abfragenEmpty = computed(() => _.isEmpty(abfragen));
const infrastruktureinrichtungenEmpty = computed(() => _.isEmpty(infrastruktureinrichtungen));
let isAbfrageListOpen = false;
let isInfraListOpen = false;

async function getReferencedAbfragen(): Promise<void> {
  if (!isAbfrageListOpen && !_.isNil(routeId)) {
    isAbfrageListOpen = true;
    const searchResults = await getReferencedAbfrageList(routeId, true);
    if (!_.isNil(searchResults)) {
      abfragen.value = searchResults;
    }
  } else if (isAbfrageListOpen && !_.isNil(routeId)) {
    isAbfrageListOpen = false;
  } else {
    isAbfrageListOpen = false;
  }
}

async function getReferencedInfrastruktureinrichtungen(): Promise<void> {
  if (!isInfraListOpen && !_.isNil(routeId)) {
    isInfraListOpen = true;
    const searchResults = await getReferencedInfrastruktureinrichtungenList(routeId, true);
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
