import { beforeEach, describe, expect, test, vi } from "vitest";
import { type VueWrapper, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { ref, nextTick } from "vue";

const mockGetBauvorhabenById = vi.fn();
const mockFormChanged = vi.fn();

// Mock vue-router to avoid onBeforeRouteLeave errors
vi.mock("vue-router", () => ({
  onBeforeRouteLeave: vi.fn(),
  useRouter: vi.fn(() => ({})),
  useRoute: vi.fn(() => ({})),
}));

vi.mock("@/composables/requests/BauvorhabenApi", () => ({
  useBauvorhabenApi: () => ({
    getBauvorhabenById: mockGetBauvorhabenById,
  }),
}));

vi.mock("@/composables/SaveLeave", () => ({
  useSaveLeave: () => ({
    formChanged: mockFormChanged,
    resetFormDirty: vi.fn(),
    isFormDirty: ref(false),
    isCommentDirty: ref(false),
    saveLeaveDialog: ref(false),
    saveLeaveDialogTitle: "",
    saveLeaveNoText: "",
    saveLeaveYesText: "",
    saveLeaveDialogText: ref(""),
    cancel: vi.fn(),
    leave: vi.fn(),
    commentChanged: vi.fn(),
    resetCommentDirty: vi.fn(),
  }),
}));

vi.mock("@/composables/security/AbfrageSecurity", () => ({
  useAbfrageSecurity: () => ({
    isEditableByAbfrageerstellung: ref(false),
    isEditableBySachbearbeitung: ref(false),
    isBedarfsmeldungEditableByAbfrageerstellung: ref(false),
    isEditableByBedarfsmeldung: ref(false),
    isEditableByAdmin: ref(false),
    isEditableWithAnzeigeContextAbfragevariante: vi.fn(() => false),
  }),
}));

import AllgemeineInformationenBaugenehmigungsverfahren from "@/components/abfragen/baugenehmigungsverfahren/AllgemeineInformationenBaugenehmigungsverfahrenComponent.vue";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import { createBaugenehmigungsverfahrenDto, createBauvorhabenDto } from "@/utils/Factories";

function createModel(overrides: Partial<ReturnType<typeof createBaugenehmigungsverfahrenDto>> = {}) {
  return new BaugenehmigungsverfahrenModel({ ...createBaugenehmigungsverfahrenDto(), ...overrides });
}

function mountComponent(model: BaugenehmigungsverfahrenModel) {
  return mount(AllgemeineInformationenBaugenehmigungsverfahren, {
    shallow: true,
    props: {
      modelValue: model,
    },
  });
}

describe("AllgemeineInformationenBaugenehmigungsverfahrenComponent", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe("getBauvorhaben - when bauvorhaben ID is set", () => {
    test("calls getBauvorhabenById with the correct ID", async () => {
      const mockBauvorhaben = { ...createBauvorhabenDto(), id: "bv-id-1", nameVorhaben: "Testvorhaben" };
      mockGetBauvorhabenById.mockResolvedValue(mockBauvorhaben);

      const model = createModel({ bauvorhaben: "bv-id-1" });
      const wrapper = mountComponent(model);
      // wait for immediate watch to run
      await nextTick();
      await nextTick();

      expect(mockGetBauvorhabenById).toHaveBeenCalledWith("bv-id-1");
    });

    test("sets bauvorhaben data from API response", async () => {
      const mockBauvorhaben = { ...createBauvorhabenDto(), id: "bv-id-1", nameVorhaben: "Testvorhaben" };
      mockGetBauvorhabenById.mockResolvedValue(mockBauvorhaben);

      const model = createModel({ bauvorhaben: "bv-id-1" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      expect((wrapper.vm as any).bauvorhaben.nameVorhaben).toBe("Testvorhaben");
    });

    test("falls back to empty bauvorhaben when getBauvorhabenById throws an error", async () => {
      mockGetBauvorhabenById.mockRejectedValue(new Error("Not Found"));

      const model = createModel({ bauvorhaben: "bv-nonexistent" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      // Should reset to empty bauvorhaben, not throw
      const bv = (wrapper.vm as any).bauvorhaben;
      expect(bv).toBeDefined();
      // nameVorhaben should be empty (fallback to createBauvorhabenDto)
      expect(bv.nameVorhaben).toBeFalsy();
    });
  });

  describe("getBauvorhaben - when bauvorhaben ID is not set", () => {
    test("does not call getBauvorhabenById when bauvorhaben is undefined", async () => {
      const model = createModel({ bauvorhaben: undefined });
      mountComponent(model);
      await nextTick();
      await nextTick();

      expect(mockGetBauvorhabenById).not.toHaveBeenCalled();
    });

    test("does not call getBauvorhabenById when bauvorhaben is empty string", async () => {
      const model = createModel({ bauvorhaben: "" });
      mountComponent(model);
      await nextTick();
      await nextTick();

      expect(mockGetBauvorhabenById).not.toHaveBeenCalled();
    });

    test("sets bauvorhaben to empty dto when ID is undefined", async () => {
      const model = createModel({ bauvorhaben: undefined });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      const bv = (wrapper.vm as any).bauvorhaben;
      expect(bv).toBeDefined();
      expect(bv.nameVorhaben).toBeFalsy();
    });
  });

  describe("isInitialBauvorhabenWatchRun - formChanged behavior", () => {
    test("does NOT call formChanged on the initial watch run", async () => {
      mockGetBauvorhabenById.mockResolvedValue(createBauvorhabenDto());
      const model = createModel({ bauvorhaben: "bv-id-1" });
      mountComponent(model);
      // Allow immediate watch to execute
      await nextTick();
      await nextTick();

      expect(mockFormChanged).not.toHaveBeenCalled();
    });

    test("does NOT call formChanged when bauvorhaben is initially undefined", async () => {
      const model = createModel({ bauvorhaben: undefined });
      mountComponent(model);
      await nextTick();
      await nextTick();

      expect(mockFormChanged).not.toHaveBeenCalled();
    });

    test("calls formChanged after initial run when bauvorhaben value changes", async () => {
      mockGetBauvorhabenById.mockResolvedValue(createBauvorhabenDto());
      const model = createModel({ bauvorhaben: undefined });
      const wrapper = mountComponent(model);
      // Wait for initial watch to complete
      await nextTick();
      await nextTick();
      vi.clearAllMocks();
      mockGetBauvorhabenById.mockResolvedValue({ ...createBauvorhabenDto(), id: "new-id", nameVorhaben: "Neu" });

      // Change the bauvorhaben value via v-model update
      await wrapper.setProps({ modelValue: { ...model, bauvorhaben: "new-id" } });
      await nextTick();
      await nextTick();

      expect(mockFormChanged).toHaveBeenCalled();
    });
  });

  describe("deleteBauvorhaben", () => {
    test("sets bauvorhaben to undefined", async () => {
      mockGetBauvorhabenById.mockResolvedValue(createBauvorhabenDto());
      const model = createModel({ bauvorhaben: "bv-id-1" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      (wrapper.vm as any).deleteBauvorhaben();

      // Check that the model's bauvorhaben was set to undefined via emit
      const emitted = wrapper.emitted("update:modelValue");
      if (emitted && emitted.length > 0) {
        const lastEmit = emitted[emitted.length - 1][0] as any;
        expect(lastEmit.bauvorhaben).toBeUndefined();
      } else {
        // The model is mutated directly
        expect((wrapper.vm as any).abfrage.bauvorhaben).toBeUndefined();
      }
    });

    test("calls formChanged when bauvorhaben is deleted", async () => {
      mockGetBauvorhabenById.mockResolvedValue(createBauvorhabenDto());
      const model = createModel({ bauvorhaben: "bv-id-1" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();
      vi.clearAllMocks();

      (wrapper.vm as any).deleteBauvorhaben();

      expect(mockFormChanged).toHaveBeenCalled();
    });
  });

  describe("nameBauvorhaben computed", () => {
    test("returns bauvorhaben name when set", async () => {
      const mockBauvorhaben = { ...createBauvorhabenDto(), nameVorhaben: "Vorhaben ABC" };
      mockGetBauvorhabenById.mockResolvedValue(mockBauvorhaben);

      const model = createModel({ bauvorhaben: "bv-id-1" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      expect((wrapper.vm as any).nameBauvorhaben).toBe("Vorhaben ABC");
    });

    test("returns fallback text when no bauvorhaben is assigned", async () => {
      const model = createModel({ bauvorhaben: undefined });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      expect((wrapper.vm as any).nameBauvorhaben).toBe("Kein Bauvorhaben zugeordnet");
    });
  });

  describe("isAuswahlBauvorhabenDialogOpen", () => {
    test("starts as false", () => {
      const model = createModel();
      const wrapper = mountComponent(model);
      expect((wrapper.vm as any).isAuswahlBauvorhabenDialogOpen).toBe(false);
    });
  });
});