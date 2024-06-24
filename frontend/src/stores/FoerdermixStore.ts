import { defineStore } from "pinia";
import {
  MetabaseReportingInformationApi,
  type MetabaseReportingDto,
  FoerdermixDto,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";

interface State {
  zuUebernehmenderFoerdermix: FoerdermixDto | undefined;
  zuUbernehmendeAbfragevarianteId: string | undefined;
}

export const useFoerdermixStore = defineStore("foerdermix", {
  state: () =>
    ({
      zuUebernehmenderFoerdermix: undefined,
      zuUbernehmendeAbfragevarianteId: undefined,
    }) as State,
  getters: {},
  actions: {
    uebernehmeWerte(
      zuUebernehmenderFoerdermix: FoerdermixDto | undefined,
      zuUbernehmendeAbfragevarianteId: string | undefined,
    ) {
      this.setZuUebernehmenderFoerdermix(zuUebernehmenderFoerdermix);
      this.setZuUbernehmendeAbfragevarianteId(zuUbernehmendeAbfragevarianteId);
    },
    setZuUebernehmenderFoerdermix(payload: FoerdermixDto | undefined): void {
      this.zuUebernehmenderFoerdermix = payload;
    },
    setZuUbernehmendeAbfragevarianteId(payload: string | undefined): void {
      this.zuUbernehmendeAbfragevarianteId = payload;
    },
  },
});
