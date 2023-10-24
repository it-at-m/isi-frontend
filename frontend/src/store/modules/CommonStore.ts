import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  formDirty: false,
  commentDirty: false,
};

export type CommonState = typeof state;

export default {
  namespaced: true,

  state,

  getters: {
    isFormDirty: (state: CommonState): boolean => {
      return state.formDirty;
    },
    isCommentDirty: (state: CommonState): boolean => {
      return state.commentDirty;
    },
  },

  mutations: {
    formDirty(state: CommonState, value: boolean): void {
      state.formDirty = value;
    },
    commentDirty(state: CommonState, value: boolean): void {
      state.commentDirty = value;
    },
  },

  actions: {
    formChanged(context: ActionContext<CommonState, RootState>): void {
      context.commit("formDirty", true);
    },
    resetFormDirty(context: ActionContext<CommonState, RootState>): void {
      context.commit("formDirty", false);
    },
    commentChanged(context: ActionContext<CommonState, RootState>): void {
      context.commit("commentDirty", true);
    },
    resetCommentDirty(context: ActionContext<CommonState, RootState>): void {
      context.commit("commentDirty", false);
    },
  },
};
