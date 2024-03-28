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
  </v-list>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import { AbfrageDtoArtAbfrageEnum } from "@/api/api-client/isi-backend";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import _ from "lodash";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";

@Component({ components: { FieldGroupCard } })
export default class ReportsPlanungsursaechlichkeitComponent extends Mixins(AbfrageSecurityMixin) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevariante!: AbfragevarianteBauleitplanverfahrenModel;

  private getUrlWohneinheiten(): string {
    const url = new URL(this.getUrlReportWohneinheiten());
    console.log(url);
    const abfrageId = this.getParameterValueAbfrageId();
    console.log(url);
    url.searchParams.set(this.getParameterAbfrageId(), abfrageId);
    console.log(url);
    const artAbfrage = this.getParameterValueArtAbfrage();
    console.log(url);
    url.searchParams.set(this.getParameterArtAbfrage(), artAbfrage);
    console.log(url);
    const abfragevarianteId = this.getParameterValueAbfragevarianteId();
    console.log(url);
    url.searchParams.set(this.getParameterAbfragevarianteId(), abfragevarianteId);
    console.log(url);
    const ursaechlichkeit = this.getParameterValuePlanungsursaechlich();
    console.log(url);
    url.searchParams.set(this.getParameterUrsaechlichkeit(), ursaechlichkeit);
    console.log(url);
    return url.toString();
  }

  private getUrlBedarfe(artBedarf: string): string {
    const url = new URL(this.getUrlReportBedarfe());
    const abfrageId = this.getParameterValueAbfrageId();
    url.searchParams.set(this.getParameterAbfrageId(), abfrageId);
    const artAbfrage = this.getParameterValueArtAbfrage();
    url.searchParams.set(this.getParameterArtAbfrage(), artAbfrage);
    const abfragevarianteId = this.getParameterValueAbfragevarianteId();
    url.searchParams.set(this.getParameterAbfragevarianteId(), abfragevarianteId);
    const ursaechlichkeit = this.getParameterValuePlanungsursaechlich();
    url.searchParams.set(this.getParameterUrsaechlichkeit(), ursaechlichkeit);
    url.searchParams.set(this.getParameterArtBedarf(), artBedarf);
    return url.toString();
  }

  private getUrlPlanungsursaechlicheSpitzenbedarfe(artBedarf: string, url: URL): string {
    const abfrageId = this.getParameterValueAbfrageId();
    url.searchParams.set(this.getParameterAbfrageId(), abfrageId);
    const artAbfrage = this.getParameterValueArtAbfrage();
    url.searchParams.set(this.getParameterArtAbfrage(), artAbfrage);
    const abfragevarianteId = this.getParameterValueAbfragevarianteId();
    url.searchParams.set(this.getParameterAbfragevarianteId(), abfragevarianteId);
    const ursaechlichkeit = this.getParameterValuePlanungsursaechlich();
    url.searchParams.set(this.getParameterUrsaechlichkeit(), ursaechlichkeit);
    url.searchParams.set(this.getParameterArtBedarf(), artBedarf);
    return url.toString();
  }

  private getUrlPlanungsursaechlicheSpitzenbedarfeKinderkrippe() {
    const url = new URL(this.getUrlReportSpitzenbedarfe());
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERKRIPPE as string;
    return this.getUrlPlanungsursaechlicheSpitzenbedarfe(artBedarf, url);
  }

  private getUrlPlanungsursaechlicheSpitzenbedarfeKindergarten() {
    const url = new URL(this.getUrlReportSpitzenbedarfe());
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERGARTEN as string;
    return this.getUrlPlanungsursaechlicheSpitzenbedarfe(artBedarf, url);
  }

  private getUrlBedarfeKinderkrippe(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERKRIPPE as string;
    return this.getUrlBedarfe(artBedarf);
  }

  private getUrlBedarfeKindergarten(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERGARTEN as string;
    return this.getUrlBedarfe(artBedarf);
  }

  private getUrlAlleEinwohner(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_ALLE_EINWOHNER as string;
    return this.getUrlBedarfe(artBedarf);
  }

  private getUrlReportWohneinheiten(): string {
    let url = `${this.$store.getters["metabaseReporting/metabaseReportingInformation"].url}/${this.$store.getters["metabaseReporting/metabaseReportingInformation"].reportWohneinheiten}`;
    console.log("getUrlReportWohneinheiten: " + url);
    return url;
  }

  private getUrlReportBedarfe(): string {
    let url = `${this.$store.getters["metabaseReporting/metabaseReportingInformation"].url}/${this.$store.getters["metabaseReporting/metabaseReportingInformation"].reportBedarfe}`;
    console.log("getUrlReportBedarfe: " + url);
    return url;
  }

  private getUrlReportSpitzenbedarfe(): string {
    let url = `${this.$store.getters["metabaseReporting/metabaseReportingInformation"].url}/${this.$store.getters["metabaseReporting/metabaseReportingInformation"].reportSpitzenbedarfePlanungsursaechlich}`;
    console.log("getUrlReportSpitzenbedarfe: " + url);
    return url;
  }

  private getParameterAbfrageId(): string {
    return import.meta.env.VITE_REPORT_PARAMETER_ABFRAGE_ID_URL as string;
  }

  private getParameterArtAbfrage(): string {
    return import.meta.env.VITE_REPORT_PARAMETER_ART_ABFRAGE_URL as string;
  }

  private getParameterAbfragevarianteId(): string {
    return import.meta.env.VITE_REPORT_PARAMETER_ABFRAGEVARIANTE_ID_URL as string;
  }

  private getParameterUrsaechlichkeit(): string {
    return import.meta.env.VITE_REPORT_PARAMETER_URSAECHLICHKEIT_URL as string;
  }

  private getParameterArtBedarf(): string {
    return import.meta.env.VITE_REPORT_PARAMETER_ART_BEDARF_URL as string;
  }

  private getParameterValueAbfrageId(): string {
    const abfrage: AbfrageModel = this.$store.getters["search/selectedAbfrage"];
    return !_.isNil(abfrage.id) ? abfrage.id : "";
  }

  private getParameterValueArtAbfrage(): string {
    const abfrage: AbfrageModel = this.$store.getters["search/selectedAbfrage"];
    if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      return import.meta.env.VITE_REPORT_ART_ABFRAGE_BAULEITPLANVERFAHREN as string;
    } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      return import.meta.env.VITE_REPORT_ART_ABFRAGE_BAUGENEHMIGUNGSVERFAHREN as string;
    } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
      return import.meta.env.VITE_REPORT_ART_ABFRAGE_WEITERES_VERFAHREN as string;
    } else {
      return "";
    }
  }

  private getParameterValueAbfragevarianteId(): string {
    return !_.isNil(this.abfragevariante.id) ? this.abfragevariante.id : "";
  }

  private getParameterValuePlanungsursaechlich(): string {
    return import.meta.env.VITE_REPORT_URSAECHLICHKEIT_PLANUNGSURSAECHLICH as string;
  }
}
</script>
