import { defineStore } from "pinia";

interface State {
  formDirty: boolean;
  commentDirty: boolean;
}

export const commonStore = defineStore("common", {
  state: () =>
    ({
      formDirty: false,
      commentDirty: false,
    }) as State,

  getters: {
    isFormDirty: (state: State): boolean => {
      return state.formDirty;
    },
    isCommentDirty: (state: State): boolean => {
      return state.commentDirty;
    },
  },

  actions: {
    setFormDirty() {
      this.formDirty = true;
    },
    resetFormDirty(): void {
      this.formDirty = false;
    },
    setCommentDirty(): void {
      this.commentDirty = true;
    },
    resetCommentDirty(): void {
      this.commentDirty = false;
    },
    updateFormDirty(payload: boolean): void {
      this.formDirty = payload;
    },
    updateCommentDirty(payload: boolean): void {
      this.commentDirty = payload;
    },
  },
});
