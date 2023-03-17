import { Levels } from "@/api/error";
import { ActionContext } from "vuex";
import { RootState } from "@/store";

export interface SnackbarState {
  message: string | undefined;
  level: Levels;
  show: boolean;
}

export default {
  namespaced: true,
  state: {
    message: undefined,
    level: Levels.INFO,
    show: false,
  } as SnackbarState,
  getters: {},
  mutations: {
    SET_MESSAGE(state: SnackbarState, message: string): void {
      state.message = message;
    },
    SET_LEVEL(state: SnackbarState, level: Levels): void {
      state.level = level;
    },
    SET_SHOW(state: SnackbarState, show: boolean): void {
      state.show = show;
    },
  },
  actions: {
    showMessage(context: ActionContext<SnackbarState, RootState>, message: SnackbarState): void {
      context.commit("SET_LEVEL", message.level ? message.level : Levels.INFO);
      context.commit("SET_MESSAGE", message.message);
      context.commit("SET_SHOW", true);
    },
    updateShow(context: ActionContext<SnackbarState, RootState>, show: boolean): void {
      context.commit("SET_SHOW", show);
    },
  },
};
