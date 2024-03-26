import { defineStore } from "pinia";
import { Levels } from "@/api/error";
import _ from "lodash";

interface State {
  message: string | undefined;
  level: Levels;
  show: boolean;
}

export const useSnackbarStore = defineStore("snackbar", {
  state: () =>
    ({
      message: undefined,
      level: Levels.INFO,
      show: false,
    }) as State,
  getters: {
    getMessage: (state: State): string | undefined => {
      return state.message;
    },
    getLevel: (state: State): Levels => {
      return state.level;
    },
    getShow: (state: State): boolean => {
      return state.show;
    },
  },
  actions: {
    setMessage(payload: string): void {
      this.message = payload;
    },
    setLevel(payload: Levels): void {
      this.level = payload;
    },
    setShow(payload: boolean): void {
      this.show = payload;
    },
    showMessage(payload: string): void {
      this.setLevel(this.level ? this.level : Levels.INFO);
      this.setMessage(payload);
      this.setShow(true);
    },
  },
});
