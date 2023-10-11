import { FoerdermixStammDto } from "@/api/api-client/isi-backend";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

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
    foerdermixStammdaten(context: ActionContext<StammdatenState, RootState>, value: FoerdermixStammDto[]): void {
      context.commit("foerdermixStammdaten", value);
    },
  },
};
