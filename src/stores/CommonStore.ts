import { defineStore } from "pinia";

interface State {
  formDirty: boolean;
  commentDirty: boolean;
  disableSaveButton: boolean;
}

export const useCommonStore = defineStore("common", {
  state: () =>
    ({
      formDirty: false,
      commentDirty: false,
      disableSaveButton: false,
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
    disableButton(): void {
      this.updateDisableSaveButton(true);
    },
    enableButton(): void {
      this.updateDisableSaveButton(false);
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
    updateDisableSaveButton(payload: boolean): void {
      this.disableSaveButton = payload;
    },
  },
});
