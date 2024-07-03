import { defineStore } from "pinia";
import {
  MetabaseReportingInformationApi,
  type MetabaseReportingDto,
  FoerdermixDto,
  AbfragevarianteBauleitplanverfahrenDto,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";

interface State {
  zuUebernehmenderFoerdermix: FoerdermixDto | undefined;
  abfragevarianteFuerUebernahme: AbfragevarianteBauleitplanverfahrenDto | undefined;
}

export const useFoerdermixStore = defineStore("foerdermix", {
  state: () =>
    ({
      zuUebernehmenderFoerdermix: undefined,
      abfragevarianteFuerUebernahme: undefined,
    }) as State,
  getters: {},
  actions: {
    uebernehmeWerte(
      zuUebernehmenderFoerdermix: FoerdermixDto | undefined,
      abfragevarianteFuerUebernahme: AbfragevarianteBauleitplanverfahrenDto | undefined,
    ) {
      this.setZuUebernehmenderFoerdermix(zuUebernehmenderFoerdermix);
      this.setaAbfragevarianteFuerUebernahme(abfragevarianteFuerUebernahme);
    },
    setZuUebernehmenderFoerdermix(payload: FoerdermixDto | undefined): void {
      this.zuUebernehmenderFoerdermix = payload;
    },
    setaAbfragevarianteFuerUebernahme(payload: AbfragevarianteBauleitplanverfahrenDto | undefined): void {
      this.abfragevarianteFuerUebernahme = payload;
    },
  },
});
