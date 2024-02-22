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
          SoBoN-ursächlicher Spitzenbedarf Kinderkrippe<span class="mdi mdi-launch" />
        </a>
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <a
          target="_blank"
          :href="getUrlSobonSpitzenbedarfeKindergarten()"
        >
          SoBoN-ursächlicher Spitzenbedarf Kindergarten<span class="mdi mdi-launch" />
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
export default class ReportsSobonursaechlichkeitComponent extends Mixins(AbfrageSecurityMixin) {
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
    const ursaechlichkeit = this.getParameterValueSobonursaechlich();
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
    const ursaechlichkeit = this.getParameterValueSobonursaechlich();
    url.searchParams.set(this.getParameterUrsaechlichkeit(), ursaechlichkeit);
    url.searchParams.set(this.getParameterArtBedarf(), artBedarf);
    return url.toString();
  }

  getUrlSoBonSpitzenbedarfe(artBedarf: string): string {
    const url = new URL(this.getUrlReportSoBonSpitzenbedarfe());
    const abfrageId = this.getParameterValueAbfrageId();
    url.searchParams.set(this.getParameterAbfrageId(), abfrageId);
    const artAbfrage = this.getParameterValueArtAbfrage();
    url.searchParams.set(this.getParameterArtAbfrage(), artAbfrage);
    const abfragevarianteId = this.getParameterValueAbfragevarianteId();
    url.searchParams.set(this.getParameterAbfragevarianteId(), abfragevarianteId);
    const ursaechlichkeit = this.getParameterValueSobonursaechlich();
    url.searchParams.set(this.getParameterUrsaechlichkeit(), ursaechlichkeit);
    url.searchParams.set(this.getParameterArtBedarf(), artBedarf);
    return url.toString();
  }

  private getUrlBedarfeKinderkrippe(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERKRIPPE as string;
    return this.getUrlBedarfe(artBedarf);
  }

  private getUrlBedarfeKindergarten(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERGARTEN as string;
    return this.getUrlBedarfe(artBedarf);
  }

  private getUrlBedarfeGsNachmittagBetreuung(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_GS_NACHMITTAG_BETREUUNG as string;
    return this.getUrlBedarfe(artBedarf);
  }

  private getUrlBedarfeGrundschule(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_GRUNDSCHULE as string;
    return this.getUrlBedarfe(artBedarf);
  }

  private getUrlAlleEinwohner(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_ALLE_EINWOHNER as string;
    return this.getUrlBedarfe(artBedarf);
  }

  private getUrlSobonSpitzenbedarfeKinderkrippe(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERKRIPPE as string;
    return this.getUrlSoBonSpitzenbedarfe(artBedarf);
  }

  private getUrlSobonSpitzenbedarfeKindergarten(): string {
    const artBedarf = import.meta.env.VITE_REPORT_ART_BEDARF_KINDERGARTEN as string;
    return this.getUrlSoBonSpitzenbedarfe(artBedarf);
  }

  private getUrlReportWohneinheiten(): string {
    return import.meta.env.VITE_REPORT_WOHNEINHEITEN_URL as string;
  }

  private getUrlReportBedarfe(): string {
    return import.meta.env.VITE_REPORT_BEDARF_URL as string;
  }

  private getUrlReportSoBonSpitzenbedarfe(): string {
    return import.meta.env.VITE_REPORT_SOBON_SPITZENBEDARFE_URL as string;
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

  private getParameterValueSobonursaechlich(): string {
    return import.meta.env.VITE_REPORT_URSAECHLICHKEIT_SOBONURSAECHLICH as string;
  }
}
</script>
