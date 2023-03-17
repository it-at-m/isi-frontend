import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  stepNumber: 1,
  formDirty: false,
};

export type CommonState = typeof state;

export default {
  namespaced: true,

  state,

  getters: {
    stepNumber: (state: CommonState): number => {
      return state.stepNumber;
    },
    isDirty: (state: CommonState): boolean => {
      return state.formDirty;
    },
  },

  mutations: {
    stepNumber(state: CommonState, value: number): void {
      state.stepNumber = value;
    },
    formDirty(state: CommonState, value: boolean): void {
      state.formDirty = value;
    },
  },

  actions: {
    stepNumber(context: ActionContext<CommonState, RootState>, value: number): void {
      context.commit("stepNumber", value);
    },
    formChanged(context: ActionContext<CommonState, RootState>): void {
      context.commit("formDirty", true);
    },
    resetDirty(context: ActionContext<CommonState, RootState>): void {
      context.commit("formDirty", false);
    },
  },
};
