import { FoerdermixStammDto } from "@/api/api-client/isi-backend";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  foerdermixStammdaten: [] as FoerdermixStammDto[],
};

export type FoerdermixState = typeof state;

export default {
  namespaced: true,

  state,

  getters: {
    foerdermixStammdaten: (state: FoerdermixState): Array<FoerdermixStammDto> => {
      return state.foerdermixStammdaten;
    },
  },

  mutations: {
    foerdermixStammdaten(state: FoerdermixState, value: FoerdermixStammDto[]): void {
      state.foerdermixStammdaten = value;
    },
  },

  actions: {
    foerdermixStammdaten(context: ActionContext<FoerdermixState, RootState>, value: FoerdermixStammDto[]): void {
      context.commit("foerdermixStammdaten", value);
    },
  },
};
