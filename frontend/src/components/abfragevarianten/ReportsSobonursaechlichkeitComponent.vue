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
          :href="getUrlBedarfeGsNachmittagBetreuung()"
        >
          Bedarfe Nachmittagsbetreuung<span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlBedarfeGrundschule()"
        >
          Bedarfe Grundschule<span class="mdi mdi-launch" />
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
          :href="getUrlSobonSpitzenbedarfeKinderkrippe()"
        >
          Spitzenbedarfe Kinderkrippe<span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlSobonSpitzenbedarfeKindergarten()"
        >
          Spitzenbedarfe Kindergarten<span class="mdi mdi-launch" />
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
  const ursaechlichkeit = getParameterValueSobonursaechlich();
  url.searchParams.set(getParameterUrsaechlichkeit(), ursaechlichkeit);
  url.searchParams.set(getParameterArtBedarf(), artBedarf);
  return url.toString();
}

function getUrlSoBonSpitzenbedarfe(artBedarf: string): string {
  const url = new URL(getUrlReportSoBonSpitzenbedarfe());
  const abfrageId = getParameterValueAbfrageId();
  url.searchParams.set(getParameterAbfrageId(), abfrageId);
  const artAbfrage = getParameterValueArtAbfrage();
  url.searchParams.set(getParameterArtAbfrage(), artAbfrage);
  const abfragevarianteId = getParameterValueAbfragevarianteId();
  url.searchParams.set(getParameterAbfragevarianteId(), abfragevarianteId);
  const ursaechlichkeit = getParameterValueSobonursaechlich();
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
  const ursaechlichkeit = getParameterValueSobonursaechlich();
  url.searchParams.set(getParameterUrsaechlichkeit(), ursaechlichkeit);
  return url.toString();
}

function getUrlBedarfeKinderkrippe(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERKRIPPE as string;
  return getUrlBedarfe(artBedarf);
}

function getUrlBedarfeKindergarten(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERGARTEN as string;
  return getUrlBedarfe(artBedarf);
}

function getUrlBedarfeGsNachmittagBetreuung(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_GS_NACHMITTAG_BETREUUNG as string;
  return getUrlBedarfe(artBedarf);
}

function getUrlBedarfeGrundschule(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_GRUNDSCHULE as string;
  return getUrlBedarfe(artBedarf);
}

function getUrlAlleEinwohner(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_ALLE_EINWOHNER as string;
  return getUrlBedarfe(artBedarf);
}

function getUrlSobonSpitzenbedarfeKinderkrippe(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERKRIPPE as string;
  return getUrlSoBonSpitzenbedarfe(artBedarf);
}

function getUrlSobonSpitzenbedarfeKindergarten(): string {
  const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERGARTEN as string;
  return getUrlSoBonSpitzenbedarfe(artBedarf);
}

function getUrlReportWohneinheiten(): string {
  return !_.isNil(metabaseReportingStore.metabaseReportingInformation)
    ? `${metabaseReportingStore.metabaseReportingInformation.url}/${metabaseReportingStore.metabaseReportingInformation.reportWohneinheiten}`
    : "";
}

function getUrlErgebnisseSobonursaechlicheBedarfe(): string {
  return getUrlErgebnissePlanungsursaechlicheBedarfsrechnung(new URL(getUrlReportErgebnisseSobonursaechlicheBedarfe()));
}

function getUrlReportBedarfe(): string {
  return !_.isNil(metabaseReportingStore.metabaseReportingInformation)
    ? `${metabaseReportingStore.metabaseReportingInformation.url}/${metabaseReportingStore.metabaseReportingInformation.reportBedarfe}`
    : "";
}

function getUrlReportSoBonSpitzenbedarfe(): string {
  return !_.isNil(metabaseReportingStore.metabaseReportingInformation)
    ? `${metabaseReportingStore.metabaseReportingInformation.url}/${metabaseReportingStore.metabaseReportingInformation.reportSpitzenbedarfeSobonUrsaechlich}`
    : "";
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

function getParameterValueSobonursaechlich(): string {
  return import.meta.env.VITE_REPORT_URSAECHLICHKEIT_SOBONURSAECHLICH as string;
}
</script>
