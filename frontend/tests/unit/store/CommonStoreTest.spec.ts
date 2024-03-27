import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCommonStore } from "../../../src/stores/CommonStore";

describe("Common Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("formChanged sets formDirty to true", () => {
    const commonStore = useCommonStore();
    commonStore.formChanged();
    expect(commonStore.formDirty).toBe(true);
  });

  it("resetFormDirty sets formDirty to false", () => {
    const commonStore = useCommonStore();
    commonStore.formChanged();
    commonStore.resetFormDirty();
    expect(commonStore.formDirty).toBe(false);
  });

  it("commentChanged sets commentDirty to true", () => {
    const commonStore = useCommonStore();
    commonStore.commentChanged();
    expect(commonStore.commentDirty).toBe(true);
  });

  it("resetCommentDirty sets commentDirty to false", () => {
    const commonStore = useCommonStore();
    commonStore.commentChanged();
    commonStore.resetCommentDirty();
    expect(commonStore.commentDirty).toBe(false);
  });

  it("updateFormDirty updates formDirty correctly", () => {
    const commonStore = useCommonStore();
    commonStore.updateFormDirty(true);
    expect(commonStore.formDirty).toBe(true);
    commonStore.updateFormDirty(false);
    expect(commonStore.formDirty).toBe(false);
  });

  it("updateCommentDirty updates commentDirty correctly", () => {
    const commonStore = useCommonStore();
    commonStore.updateCommentDirty(true);
    expect(commonStore.commentDirty).toBe(true);
    commonStore.updateCommentDirty(false);
    expect(commonStore.commentDirty).toBe(false);
  });
});
