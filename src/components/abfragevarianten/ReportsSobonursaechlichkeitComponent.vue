<template>
  <v-list class="text-center">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">SoBoN-ursächliche Reports</v-list-item-title>
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
          :href="getUrlErgebnisseSobonursaechlicheBedarfe()"
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
import _ from "lodash";

const abfragevariante = defineModel<AbfragevarianteBauleitplanverfahrenModel>({ required: true });

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
  const ursaechlichkeit = getParameterValueSobonursaechlich();
  url.searchParams.set(decodeURIComponent(getParameterUrsaechlichkeit()), ursaechlichkeit);
  return url.toString();
}

function getUrlErgebnissePlanungsursaechlicheBedarfsrechnung(url: URL): string {
  const abfrageId = getParameterValueAbfrageId();
  url.searchParams.set(getParameterAbfrageId(), abfrageId);
  const artAbfrage = getParameterValueArtAbfrage();
  url.searchParams.set(getParameterArtAbfrage(), artAbfrage);
  const abfragevarianteId = getParameterValueAbfragevarianteId();
  url.searchParams.set(getParameterAbfragevarianteId(), abfragevarianteId);
  const ursaechlichkeit = getParameterValueSobonursaechlich();
  url.searchParams.set(decodeURIComponent(getParameterUrsaechlichkeit()), ursaechlichkeit);
  return url.toString();
}

function getUrlReportWohneinheiten(): string {
  return !_.isNil(metabaseReportingStore.metabaseReportingInformation)
    ? `${metabaseReportingStore.metabaseReportingInformation.url}/${metabaseReportingStore.metabaseReportingInformation.reportWohneinheiten}`
    : "";
}

function getUrlErgebnisseSobonursaechlicheBedarfe(): string {
  return getUrlErgebnissePlanungsursaechlicheBedarfsrechnung(new URL(getUrlReportErgebnisseSobonursaechlicheBedarfe()));
}

function getUrlReportErgebnisseSobonursaechlicheBedarfe(): string {
  return !_.isNil(metabaseReportingStore.metabaseReportingInformation)
    ? `${metabaseReportingStore.metabaseReportingInformation.url}/${metabaseReportingStore.metabaseReportingInformation.reportErgebnisseSobonUrsaechlich}`
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

function getParameterValueSobonursaechlich(): string {
  return import.meta.env.VITE_REPORT_URSAECHLICHKEIT_SOBONURSAECHLICH as string;
}
</script>
