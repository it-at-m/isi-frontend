import { defineStore } from "pinia";
import { MetabaseReportingInformationApi, MetabaseReportingDto } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";

interface State {
  metabaseReportingInformation: MetabaseReportingDto | undefined;
}

export const useMetabaseReportingStore = defineStore("metabaseReportingInformation", {
  state: () =>
    ({
      metabaseReportingInformation: undefined,
    }) as State,
  getters: {},
  actions: {
    async initialize(): Promise<void> {
      const metabaseReportingInformationApi = new MetabaseReportingInformationApi(
        RequestUtils.getBasicFetchConfigurationForBackend(),
      );
      await metabaseReportingInformationApi.getMetabaseReporting(RequestUtils.getGETConfig()).then((dto) => {
        this.setMetabaseReportingInformation(dto);
      });
    },
    setMetabaseReportingInformation(payload: MetabaseReportingDto): void {
      this.metabaseReportingInformation = payload;
    },
  },
});
