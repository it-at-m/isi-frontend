import { MetabaseReportingInformationApi, MetabaseReportingDto } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  metabaseReportingInformation: {} as MetabaseReportingDto,
};

export type MetabaseReportingInformationState = typeof state;

export default {
  namespaced: true,

  state,

  getters: {
    metabaseReportingInformation: (state: MetabaseReportingInformationState): MetabaseReportingDto => {
      return state.metabaseReportingInformation;
    },
  },

  mutations: {
    metabaseReportingInformation(state: MetabaseReportingInformationState, dto: MetabaseReportingDto): void {
      state.metabaseReportingInformation = dto;
    },
  },

  actions: {
    initialize(context: ActionContext<MetabaseReportingInformationState, RootState>): void {
      const metabaseReportingInformationApi = new MetabaseReportingInformationApi(
        RequestUtils.getBasicFetchConfigurationForBackend(),
      );
      metabaseReportingInformationApi.getMetabaseReporting(RequestUtils.getGETConfig()).then((dto) => {
        context.commit("metabaseReportingInformation", dto);
      });
    },
    allowedFileExtensions(
      context: ActionContext<MetabaseReportingInformationState, RootState>,
      dto: MetabaseReportingDto[],
    ): void {
      context.commit("metabaseReportingInformation", dto);
    },
  },
};
