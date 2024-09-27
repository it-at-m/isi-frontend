import { describe, expect, beforeEach, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCommonStore } from "@/stores/CommonStore";

describe("Common Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("formChanged sets formDirty to true", () => {
    const commonStore = useCommonStore();
    commonStore.formChanged();
    expect(commonStore.formDirty).toBe(true);
  });

  test("resetFormDirty sets formDirty to false", () => {
    const commonStore = useCommonStore();
    commonStore.formChanged();
    commonStore.resetFormDirty();
    expect(commonStore.formDirty).toBe(false);
  });

  test("commentChanged sets commentDirty to true", () => {
    const commonStore = useCommonStore();
    commonStore.commentChanged();
    expect(commonStore.commentDirty).toBe(true);
  });

  test("resetCommentDirty sets commentDirty to false", () => {
    const commonStore = useCommonStore();
    commonStore.commentChanged();
    commonStore.resetCommentDirty();
    expect(commonStore.commentDirty).toBe(false);
  });

  test("updateFormDirty updates formDirty correctly", () => {
    const commonStore = useCommonStore();
    commonStore.updateFormDirty(true);
    expect(commonStore.formDirty).toBe(true);
    commonStore.updateFormDirty(false);
    expect(commonStore.formDirty).toBe(false);
  });

  test("updateCommentDirty updates commentDirty correctly", () => {
    const commonStore = useCommonStore();
    commonStore.updateCommentDirty(true);
    expect(commonStore.commentDirty).toBe(true);
    commonStore.updateCommentDirty(false);
    expect(commonStore.commentDirty).toBe(false);
  });
});
