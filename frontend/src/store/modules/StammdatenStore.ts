import { FoerdermixStammApi, FoerdermixStammDto } from "@/api/api-client/isi-backend";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";
import RequestUtils from "@/utils/RequestUtils";

const state = {
  foerdermixStammdaten: [] as FoerdermixStammDto[],
};

export type StammdatenState = typeof state;

export default {
  namespaced: true,

  state,

  getters: {
    foerdermixStammdaten: (state: StammdatenState): Array<FoerdermixStammDto> => {
      return state.foerdermixStammdaten;
    },
  },

  mutations: {
    foerdermixStammdaten(state: StammdatenState, value: FoerdermixStammDto[]): void {
      state.foerdermixStammdaten = value;
    },
  },

  actions: {
    initialize(context: ActionContext<StammdatenState, RootState>): void {
      const foerdermixStammApi = new FoerdermixStammApi(RequestUtils.getBasicFetchConfigurationForBackend());
      foerdermixStammApi.getFoerdermixStaemme(RequestUtils.getGETConfig()).then((foerdermixDto) => {
        context.commit("foerdermixStammdaten", foerdermixDto);
      });
    },

    foerdermixStammdaten(context: ActionContext<StammdatenState, RootState>, value: FoerdermixStammDto[]): void {
      context.commit("foerdermixStammdaten", value);
    },
  },
};
