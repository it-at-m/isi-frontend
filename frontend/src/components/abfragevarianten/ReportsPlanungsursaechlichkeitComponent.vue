<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    />
    <v-col
      cols="12"
      md="4"
    >
      <v-list class="text-center">
        <v-list-item>
          <v-list-item-title>
            <a
              target="_blank"
              :href="getUrlWohneinheiten()"
            >
              Report Wohneinheiten<span class="mdi mdi-launch" />
            </a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <a
              target="_blank"
              :href="getUrlBedarfeKinderkrippe()"
            >
              Report Bedarfe Kinderkrippe<span class="mdi mdi-launch" />
            </a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <a
              target="_blank"
              :href="getUrlBedarfeKindergarten()"
            >
              Report Bedarfe Kindergarten<span class="mdi mdi-launch" />
            </a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <a
              target="_blank"
              :href="getUrlAlleEinwohner()"
            >
              Report Alle Einwohner <span class="mdi mdi-launch" />
            </a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <a
              target="_blank"
              :href="getUrlPlanungsursaechlicheSpitzenbedarfeKinderkrippe()"
            >
              Report planungsursächliche Spitzenbedarfe Kinderkrippe<span class="mdi mdi-launch" />
            </a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <a
              target="_blank"
              :href="getUrlPlanungsursaechlicheSpitzenbedarfeKindergarten()"
            >
              Report planungsursächliche Spitzenbedarfe Kindergarten<span class="mdi mdi-launch" />
            </a>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col
      cols="12"
      md="4"
    />
  </v-row>
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
    const abfrageId = this.getParameterValueAbfrageId();
    url.searchParams.set(this.getParameterAbfrageId(), abfrageId);
    const artAbfrage = this.getParameterValueArtAbfrage();
    url.searchParams.set(this.getParameterArtAbfrage(), artAbfrage);
    const abfragevarianteId = this.getParameterValueAbfragevarianteId();
    url.searchParams.set(this.getParameterAbfragevarianteId(), abfragevarianteId);
    const ursaechlichkeit = this.getParameterValuePlanungsursaechlich();
    url.searchParams.set(this.getParameterUrsaechlichkeit(), ursaechlichkeit);
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
    return import.meta.env.VITE_REPORT_WOHNEINHEITEN_URL as string;
  }

  private getUrlReportBedarfe(): string {
    return import.meta.env.VITE_REPORT_BEDARF_URL as string;
  }

  private getUrlReportSpitzenbedarfe(): string {
    return import.meta.env.VITE_REPORT_SPITZENBEDARF_URL as string;
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
