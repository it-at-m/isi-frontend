import { defineStore } from "pinia";
import {
  MetabaseReportingInformationApi,
  type MetabaseReportingDto,
  FoerdermixDto,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";

interface State {
  zuUebernehmenderFoerdermix: FoerdermixDto | undefined;
  zuUbernehmendeAbfragevarianteNummer: number | undefined;
}

export const useFoerdermixStore = defineStore("foerdermix", {
  state: () =>
    ({
      zuUebernehmenderFoerdermix: undefined,
      zuUbernehmendeAbfragevarianteNummer: undefined,
    }) as State,
  getters: {},
  actions: {
    uebernehmeWerte(
      zuUebernehmenderFoerdermix: FoerdermixDto | undefined,
      zuUbernehmendeAbfragevarianteNummer: number | undefined,
    ) {
      this.setZuUebernehmenderFoerdermix(zuUebernehmenderFoerdermix);
      this.setZuUbernehmendeAbfragevarianteNummer(zuUbernehmendeAbfragevarianteNummer);
    },
    setZuUebernehmenderFoerdermix(payload: FoerdermixDto | undefined): void {
      this.zuUebernehmenderFoerdermix = payload;
    },
    setZuUbernehmendeAbfragevarianteNummer(payload: number | undefined): void {
      this.zuUbernehmendeAbfragevarianteNummer = payload;
    },
  },
});
