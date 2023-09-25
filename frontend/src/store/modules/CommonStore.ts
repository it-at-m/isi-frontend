import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  formDirty: false,
};

export type CommonState = typeof state;

export default {
  namespaced: true,

  state,

  getters: {
    isDirty: (state: CommonState): boolean => {
      return state.formDirty;
    },
  },

  mutations: {
    formDirty(state: CommonState, value: boolean): void {
      state.formDirty = value;
    },
  },

  actions: {
    formChanged(context: ActionContext<CommonState, RootState>): void {
      context.commit("formDirty", true);
    },
    resetDirty(context: ActionContext<CommonState, RootState>): void {
      context.commit("formDirty", false);
    },
  },
};
