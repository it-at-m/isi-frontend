import { beforeEach, describe, expect, test, vi } from "vitest";
import { type VueWrapper, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { ref, nextTick } from "vue";

const mockGetBauvorhabenById = vi.fn();
const mockFormChanged = vi.fn();

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

import AllgemeineInformationenWeiteresVerfahren from "@/components/abfragen/weiteresVerfahren/AllgemeineInformationenWeiteresVerfahrenComponent.vue";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import { createWeiteresVerfahrenDto, createBauvorhabenDto } from "@/utils/Factories";

function createModel(overrides: Partial<ReturnType<typeof createWeiteresVerfahrenDto>> = {}) {
  return new WeiteresVerfahrenModel({ ...createWeiteresVerfahrenDto(), ...overrides });
}

function mountComponent(model: WeiteresVerfahrenModel) {
  return mount(AllgemeineInformationenWeiteresVerfahren, {
    shallow: true,
    props: {
      modelValue: model,
    },
  });
}

describe("AllgemeineInformationenWeiteresVerfahrenComponent", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe("getBauvorhaben - when bauvorhaben ID is set", () => {
    test("calls getBauvorhabenById with the correct ID", async () => {
      const mockBauvorhaben = { ...createBauvorhabenDto(), id: "bv-id-1", nameVorhaben: "Weiteres Vorhaben" };
      mockGetBauvorhabenById.mockResolvedValue(mockBauvorhaben);

      const model = createModel({ bauvorhaben: "bv-id-1" });
      mountComponent(model);
      await nextTick();
      await nextTick();

      expect(mockGetBauvorhabenById).toHaveBeenCalledWith("bv-id-1");
    });

    test("sets bauvorhaben data from API response", async () => {
      const mockBauvorhaben = { ...createBauvorhabenDto(), id: "bv-id-1", nameVorhaben: "Weiteres Vorhaben" };
      mockGetBauvorhabenById.mockResolvedValue(mockBauvorhaben);

      const model = createModel({ bauvorhaben: "bv-id-1" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      expect((wrapper.vm as any).bauvorhaben.nameVorhaben).toBe("Weiteres Vorhaben");
    });

    test("falls back to empty bauvorhaben when getBauvorhabenById throws an error", async () => {
      mockGetBauvorhabenById.mockRejectedValue(new Error("Not Found"));

      const model = createModel({ bauvorhaben: "bv-nonexistent" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      const bv = (wrapper.vm as any).bauvorhaben;
      expect(bv).toBeDefined();
      expect(bv.nameVorhaben).toBeFalsy();
    });

    test("recovers from API error with a new valid ID", async () => {
      mockGetBauvorhabenById
        .mockRejectedValueOnce(new Error("Not Found"))
        .mockResolvedValue({ ...createBauvorhabenDto(), nameVorhaben: "Gefundenes Vorhaben" });

      const model = createModel({ bauvorhaben: "bv-invalid" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      // First call fails - should show fallback
      expect((wrapper.vm as any).bauvorhaben.nameVorhaben).toBeFalsy();

      // Update to a valid ID
      await wrapper.setProps({ modelValue: { ...model, bauvorhaben: "bv-valid" } });
      await nextTick();
      await nextTick();

      expect((wrapper.vm as any).bauvorhaben.nameVorhaben).toBe("Gefundenes Vorhaben");
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

    test("sets bauvorhaben to empty dto when ID is null", async () => {
      // Testing with null (edge case even though type says string|undefined)
      const model = createModel({ bauvorhaben: null as any });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      expect(mockGetBauvorhabenById).not.toHaveBeenCalled();
      const bv = (wrapper.vm as any).bauvorhaben;
      expect(bv).toBeDefined();
    });
  });

  describe("isInitialBauvorhabenWatchRun - formChanged behavior", () => {
    test("does NOT call formChanged on the initial watch run with a bauvorhaben ID", async () => {
      mockGetBauvorhabenById.mockResolvedValue(createBauvorhabenDto());
      const model = createModel({ bauvorhaben: "bv-id-1" });
      mountComponent(model);
      await nextTick();
      await nextTick();

      expect(mockFormChanged).not.toHaveBeenCalled();
    });

    test("does NOT call formChanged on the initial watch run without a bauvorhaben ID", async () => {
      const model = createModel({ bauvorhaben: undefined });
      mountComponent(model);
      await nextTick();
      await nextTick();

      expect(mockFormChanged).not.toHaveBeenCalled();
    });

    test("calls formChanged after initial run when bauvorhaben value changes to a new value", async () => {
      mockGetBauvorhabenById.mockResolvedValue(createBauvorhabenDto());
      const model = createModel({ bauvorhaben: undefined });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();
      vi.clearAllMocks();
      mockGetBauvorhabenById.mockResolvedValue({ ...createBauvorhabenDto(), id: "new-id", nameVorhaben: "Neu" });

      await wrapper.setProps({ modelValue: { ...model, bauvorhaben: "new-id" } });
      await nextTick();
      await nextTick();

      expect(mockFormChanged).toHaveBeenCalled();
    });

    test("does NOT call formChanged if bauvorhaben value stays the same", async () => {
      mockGetBauvorhabenById.mockResolvedValue(createBauvorhabenDto());
      const model = createModel({ bauvorhaben: "same-id" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();
      vi.clearAllMocks();

      // Set same value again
      await wrapper.setProps({ modelValue: { ...model, bauvorhaben: "same-id" } });
      await nextTick();
      await nextTick();

      expect(mockFormChanged).not.toHaveBeenCalled();
    });
  });

  describe("deleteBauvorhaben", () => {
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

    test("sets bauvorhaben to undefined when deleted", async () => {
      mockGetBauvorhabenById.mockResolvedValue(createBauvorhabenDto());
      const model = createModel({ bauvorhaben: "bv-id-1" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      (wrapper.vm as any).deleteBauvorhaben();

      const emitted = wrapper.emitted("update:modelValue");
      if (emitted && emitted.length > 0) {
        const lastEmit = emitted[emitted.length - 1][0] as any;
        expect(lastEmit.bauvorhaben).toBeUndefined();
      } else {
        expect((wrapper.vm as any).abfrage.bauvorhaben).toBeUndefined();
      }
    });
  });

  describe("nameBauvorhaben computed", () => {
    test("returns bauvorhaben name when set", async () => {
      const mockBauvorhaben = { ...createBauvorhabenDto(), nameVorhaben: "Weiteres Verfahren XYZ" };
      mockGetBauvorhabenById.mockResolvedValue(mockBauvorhaben);

      const model = createModel({ bauvorhaben: "bv-id-1" });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      expect((wrapper.vm as any).nameBauvorhaben).toBe("Weiteres Verfahren XYZ");
    });

    test("returns fallback text when no bauvorhaben is assigned", async () => {
      const model = createModel({ bauvorhaben: undefined });
      const wrapper = mountComponent(model);
      await nextTick();
      await nextTick();

      expect((wrapper.vm as any).nameBauvorhaben).toBe("Kein Bauvorhaben zugeordnet");
    });

    test("returns fallback text when API call fails", async () => {
      mockGetBauvorhabenById.mockRejectedValue(new Error("Not Found"));

      const model = createModel({ bauvorhaben: "bv-nonexistent" });
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
