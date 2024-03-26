import { defineStore } from "pinia";

interface State {
  formDirty: boolean;
  commentDirty: boolean;
}

export const useCommonStore = defineStore("common", {
  state: () =>
    ({
      formDirty: false,
      commentDirty: false,
    }) as State,

  getters: {},

  actions: {
    formChanged() {
      this.updateFormDirty(true);
    },
    resetFormDirty(): void {
      this.updateFormDirty(false);
    },
    commentChanged(): void {
      this.updateCommentDirty(true);
    },
    resetCommentDirty(): void {
      this.updateCommentDirty(false);
    },
    updateFormDirty(payload: boolean): void {
      this.formDirty = payload;
    },
    updateCommentDirty(payload: boolean): void {
      this.commentDirty = payload;
    },
  },
});
