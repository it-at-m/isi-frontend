<template>
  <v-list class="text-center">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">Planungsursächliche Reports</v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlWohneinheiten()"
        >
          Wohneinheiten<span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlBedarfeKinderkrippe()"
        >
          Bedarfe Kinderkrippe<span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlBedarfeKindergarten()"
        >
          Bedarfe Kindergarten<span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlAlleEinwohner()"
        >
          Alle Einwohner <span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlPlanungsursaechlicheSpitzenbedarfeKinderkrippe()"
        >
          Spitzenbedarfe Kinderkrippe<span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlPlanungsursaechlicheSpitzenbedarfeKindergarten()"
        >
          Spitzenbedarfe Kindergarten<span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlErgebnissePlanungsursaechlicheBedarfe()"
        >
          Ergebnisse Bedarfsberechnung<span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { AbfrageDtoArtAbfrageEnum } from "@/api/api-client/isi-backend";
import { useMetabaseReportingStore } from "@/stores/MetabaseReportingStore";
import { useSearchStore } from "@/stores/SearchStore";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import { defineModel } from "@/utils/Vue";
import _ from "lodash";

interface Props {
  value: AbfragevarianteBauleitplanverfahrenModel;
}

interface Emits {
  (event: "input", value: AbfragevarianteBauleitplanverfahrenModel): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const abfragevariante = defineModel(props, emit);

const searchStore = useSearchStore();
const metabaseReportingStore = useMetabaseReportingStore();

function getUrlWohneinheiten(): string {
  const url = new URL(getUrlReportWohneinheiten());
  const abfrageId = getParameterValueAbfrageId();
  url.searchParams.set(getParameterAbfrageId(), abfrageId);
  const artAbfrage = getParameterValueArtAbfrage();
  url.searchParams.set(getParameterArtAbfrage(), artAbfrage);
  const abfragevarianteId = getParameterValueAbfragevarianteId();
  url.searchParams.set(getParameterAbfragevarianteId(), abfragevarianteId);
  const ursaechlichkeit = getParameterValuePlanungsursaechlich();
  url.searchParams.set(getParameterUrsaechlichkeit(), ursaechlichkeit);
  return url.toString();
}

function getUrlBedarfe(artBedarf: string): string {
  const url = new URL(getUrlReportBedarfe());
  const abfrageId = getParameterValueAbfrageId();
  url.searchParams.set(getParameterAbfrageId(), abfrageId);
  const artAbfrage = getParameterValueArtAbfrage();
  url.searchParams.set(getParameterArtAbfrage(), artAbfrage);
  const abfragevarianteId = getParameterValueAbfragevarianteId();
  url.searchParams.set(getParameterAbfragevarianteId(), abfragevarianteId);
  const ursaechlichkeit = getParameterValuePlanungsursaechlich();
  url.searchParams.set(getParameterUrsaechlichkeit(), ursaechlichkeit);
  url.searchParams.set(getParameterArtBedarf(), artBedarf);
  return url.toString();
}

function getUrlPlanungsursaechlicheSpitzenbedarfe(artBedarf: string, url: URL): string {
  const abfrageId = getParameterValueAbfrageId();
  url.searchParams.set(getParameterAbfrageId(), abfrageId);
  const artAbfrage = getParameterValueArtAbfrage();
  url.searchParams.set(getParameterArtAbfrage(), artAbfrage);
  const abfragevarianteId = getParameterValueAbfragevarianteId();
  url.searchParams.set(getParameterAbfragevarianteId(), abfragevarianteId);
  const ursaechlichkeit = getParameterValuePlanungsursaechlich();
  url.searchParams.set(getParameterUrsaechlichkeit(), ursaechlichkeit);
  url.searchParams.set(getParameterArtBedarf(), artBedarf);
  return url.toString();
}

function getUrlErgebnissePlanungsursaechlicheBedarfsrechnung(url: URL): string {
  const abfrageId = getParameterValueAbfrageId();
  url.searchParams.set(getParameterAbfrageId(), abfrageId);
  const artAbfrage = getParameterValueArtAbfrage();
  url.searchParams.set(getParameterArtAbfrage(), artAbfrage);
  const abfragevarianteId = getParameterValueAbfragevarianteId();
  url.searchParams.set(getParameterAbfragevarianteId(), abfragevarianteId);
  const ursaechlichkeit = getParameterValuePlanungsursaechlich();
  url.searchParams.set(getParameterUrsaechlichkeit(), ursaechlichkeit);
  return url.toString();
}

function getUrlPlanungsursaechlicheSpitzenbedarfeKinderkrippe() {
  const url = new URL(getUrlReportSpitzenbedarfe());
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERKRIPPE as string;
  return getUrlPlanungsursaechlicheSpitzenbedarfe(artBedarf, url);
}

function getUrlPlanungsursaechlicheSpitzenbedarfeKindergarten() {
  const url = new URL(getUrlReportSpitzenbedarfe());
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERGARTEN as string;
  return getUrlPlanungsursaechlicheSpitzenbedarfe(artBedarf, url);
}

function getUrlBedarfeKinderkrippe(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERKRIPPE as string;
  return getUrlBedarfe(artBedarf);
}

function getUrlBedarfeKindergarten(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERGARTEN as string;
  return getUrlBedarfe(artBedarf);
}

function getUrlErgebnissePlanungsursaechlicheBedarfe(): string {
  const url = new URL(getUrlReportErgebnissePlanungsursaechlicheBedarfe());
  return getUrlErgebnissePlanungsursaechlicheBedarfsrechnung(url);
}

function getUrlAlleEinwohner(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_ALLE_EINWOHNER as string;
  return getUrlBedarfe(artBedarf);
}

function getUrlReportWohneinheiten(): string {
  return !_.isNil(metabaseReportingStore.metabaseReportingInformation)
    ? `${metabaseReportingStore.metabaseReportingInformation.url}/${metabaseReportingStore.metabaseReportingInformation.reportWohneinheiten}`
    : "";
}

function getUrlReportBedarfe(): string {
  return !_.isNil(metabaseReportingStore.metabaseReportingInformation)
    ? `${metabaseReportingStore.metabaseReportingInformation.url}/${metabaseReportingStore.metabaseReportingInformation.reportBedarfe}`
    : "";
}

function getUrlReportErgebnissePlanungsursaechlicheBedarfe(): string {
  return !_.isNil(metabaseReportingStore.metabaseReportingInformation)
    ? `${metabaseReportingStore.metabaseReportingInformation.url}/${metabaseReportingStore.metabaseReportingInformation.reportErgebnissePlanungsursaechlich}`
    : "";
}

function getUrlReportSpitzenbedarfe(): string {
  return !_.isNil(metabaseReportingStore.metabaseReportingInformation)
    ? `${metabaseReportingStore.metabaseReportingInformation.url}/${metabaseReportingStore.metabaseReportingInformation.reportSpitzenbedarfePlanungsursaechlich}`
    : "";
}

function getParameterAbfrageId(): string {
  return import.meta.env.VITE_REPORT_PARAMETER_ABFRAGE_ID_URL as string;
}

function getParameterArtAbfrage(): string {
  return import.meta.env.VITE_REPORT_PARAMETER_ART_ABFRAGE_URL as string;
}

function getParameterAbfragevarianteId(): string {
  return import.meta.env.VITE_REPORT_PARAMETER_ABFRAGEVARIANTE_ID_URL as string;
}

function getParameterUrsaechlichkeit(): string {
  return import.meta.env.VITE_REPORT_PARAMETER_URSAECHLICHKEIT_URL as string;
}

function getParameterArtBedarf(): string {
  return import.meta.env.VITE_REPORT_PARAMETER_ART_BEDARF_URL as string;
}

function getParameterValueAbfrageId(): string {
  const abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel | undefined =
    searchStore.selectedAbfrage;
  return !_.isNil(abfrage) && !_.isNil(abfrage.id) ? abfrage.id : "";
}

function getParameterValueArtAbfrage(): string {
  const abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel | undefined =
    searchStore.selectedAbfrage;
  if (!_.isNil(abfrage) && abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    return import.meta.env.VITE_REPORT_ART_ABFRAGE_BAULEITPLANVERFAHREN as string;
  } else if (!_.isNil(abfrage) && abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    return import.meta.env.VITE_REPORT_ART_ABFRAGE_BAUGENEHMIGUNGSVERFAHREN as string;
  } else if (!_.isNil(abfrage) && abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
    return import.meta.env.VITE_REPORT_ART_ABFRAGE_WEITERES_VERFAHREN as string;
  } else {
    return "";
  }
}

function getParameterValueAbfragevarianteId(): string {
  return !_.isNil(abfragevariante.value.id) ? abfragevariante.value.id : "";
}

function getParameterValuePlanungsursaechlich(): string {
  return import.meta.env.VITE_REPORT_URSAECHLICHKEIT_PLANUNGSURSAECHLICH as string;
}
</script>
