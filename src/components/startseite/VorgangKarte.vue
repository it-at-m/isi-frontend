<template>
  <v-hover v-slot="{ isHovering }">
    <v-card
      v-bind="$attrs"
      :elevation="isHovering ? 6 : 1"
      class="my-2 mr-2 pt-3 scale-transition"
      @click="routeToVorgang"
    >
      <v-card-subtitle
        class="text-black"
        opacity="1"
      >
        <v-icon
          start
          :color="darstellung.farbe"
        >
          {{ darstellung.icon }}
        </v-icon>
        <span class="font-weight-bold">{{ darstellung.name }}</span>
        - {{ darstellung.art }}
      </v-card-subtitle>
      <v-card-text class="d-flex flex-wrap ga-4 text-caption">
        <span v-if="darstellung.status">
          <v-icon size="small">mdi-information-outline</v-icon>
          {{ darstellung.status }}
        </span>
        <span v-if="abfrage">
          <v-icon size="small">mdi-calendar-clock</v-icon>
          Bearbeitungsfrist: {{ convertDateForFrontend(abfrage.fristBearbeitung) }}
        </span>
        <span v-if="darstellung.stadtbezirke !== undefined">
          <v-icon size="small">mdi-map-marker</v-icon>
          {{ darstellung.stadtbezirke }}
        </span>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  type AbfrageSearchResultDto,
  type BauvorhabenSearchResultDto,
  type InfrastruktureinrichtungSearchResultDto,
  type LookupEntryDto,
  type StadtbezirkDto,
  SearchResultDtoTypeEnum,
} from "@/api/api-client/isi-backend";
import { useLookupStore } from "@/stores/LookupStore";
import { getAbfrageArtLabel, getAbfrageIcon } from "@/utils/AbfrageIconUtil";
import { convertDateForFrontend } from "@/utils/Formatter";
import type { Vorgang } from "@/utils/StartseiteUtil";
import _ from "lodash";
import { useRouter } from "vue-router";

interface Props {
  vorgang: Vorgang;
}

/**
 * Die typunabhängigen Anzeigeinformationen eines Vorgangs.
 */
interface Darstellung {
  icon: string;
  farbe: string;
  name: string | undefined;
  art: string;
  status: string;
  stadtbezirke: string | undefined;
  route: string;
}

// v-hover rendert kein eigenes Element. Attribute wie die id werden deshalb an die Karte durchgereicht.
defineOptions({ inheritAttrs: false });

const props = defineProps<Props>();

const router = useRouter();
const lookupStore = useLookupStore();

const abfrage = computed(() =>
  props.vorgang.type === SearchResultDtoTypeEnum.Abfrage ? (props.vorgang as AbfrageSearchResultDto) : undefined,
);

const darstellung = computed<Darstellung>(() => {
  switch (props.vorgang.type) {
    case SearchResultDtoTypeEnum.Bauvorhaben: {
      const bauvorhaben = props.vorgang as BauvorhabenSearchResultDto;
      return {
        icon: "mdi-account-hard-hat",
        farbe: "indigo-lighten-1",
        name: bauvorhaben.nameVorhaben,
        art: "Vorhaben",
        status: getLookupValue(bauvorhaben.verfahrensstand, lookupStore.verfahrensstand),
        stadtbezirke: getStadtbezirke(bauvorhaben.stadtbezirke),
        route: "/bauvorhaben/" + bauvorhaben.id,
      };
    }
    case SearchResultDtoTypeEnum.Infrastruktureinrichtung: {
      const einrichtung = props.vorgang as InfrastruktureinrichtungSearchResultDto;
      return {
        icon: "mdi-home",
        farbe: "red-lighten-1",
        name: einrichtung.nameEinrichtung,
        art: getLookupValue(einrichtung.infrastruktureinrichtungTyp, lookupStore.infrastruktureinrichtungTyp),
        status: getLookupValue(einrichtung.status, lookupStore.statusInfrastruktureinrichtung),
        // Das Suchergebnis einer Infrastruktureinrichtung enthält keine Stadtbezirke.
        stadtbezirke: undefined,
        route: "/infrastruktureinrichtung/" + einrichtung.id,
      };
    }
    default: {
      const abfrageSearchResult = props.vorgang as AbfrageSearchResultDto;
      return {
        icon: getAbfrageIcon(abfrageSearchResult.artAbfrage),
        farbe: "green-lighten-1",
        name: abfrageSearchResult.name,
        art: getAbfrageArtLabel(abfrageSearchResult.artAbfrage),
        status: getLookupValue(abfrageSearchResult.statusAbfrage, lookupStore.statusAbfrage),
        stadtbezirke: getStadtbezirke(abfrageSearchResult.stadtbezirke),
        route: "/abfrage/" + abfrageSearchResult.id,
      };
    }
  }
});

function getLookupValue(key: string | undefined, lookupList: Array<LookupEntryDto> | undefined): string {
  return lookupList?.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value ?? "";
}

function getStadtbezirke(stadtbezirke: Set<StadtbezirkDto> | undefined): string {
  const bezeichnungen = _.sortBy(_.isNil(stadtbezirke) ? [] : Array.from(stadtbezirke), ["nummer"]).map(
    (stadtbezirk: StadtbezirkDto) => stadtbezirk.nummer + "/" + stadtbezirk.name,
  );
  return _.join(bezeichnungen, ", ");
}

function routeToVorgang(): void {
  if (!_.isNil(props.vorgang.id)) {
    router.push(darstellung.value.route);
  }
}

defineExpose({ darstellung, routeToVorgang });
</script>
