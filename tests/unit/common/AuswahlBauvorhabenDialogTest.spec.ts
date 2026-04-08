import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import AuswahlBauvorhabenDialog from "@/components/common/AuswahlBauvorhabenDialog.vue";

const mockSearchForEntities = vi.fn();

vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({
    searchForEntities: mockSearchForEntities,
  }),
}));

function mountDialog(props?: Record<string, unknown>): VueWrapper {
  return mount(AuswahlBauvorhabenDialog, {
    shallow: true,
    props: {
      modelValue: false,
      "onUpdate:modelValue": (v: boolean) => wrapper.setProps({ modelValue: v }),
      ...props,
    },
  });
}

let wrapper: VueWrapper;

describe("AuswahlBauvorhabenDialogTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockSearchForEntities.mockReset();
    wrapper = mountDialog({ modelValue: true });
  });

  describe("selectResult", () => {
    test("sets pendingSelectedBauvorhabenId and pendingSelectedLabel", () => {
      const vm = wrapper.vm as any;
      vm.selectResult({ value: "id-123", label: "Bauvorhaben A", subtitle: "Stadtbezirke: 1/Mitte" });
      expect(vm.pendingSelectedBauvorhabenId).toBe("id-123");
      expect(vm.pendingSelectedLabel).toBe("Bauvorhaben A");
      expect(vm.searchQuery).toBe("Bauvorhaben A");
    });

    test("overwrites previously selected result", () => {
      const vm = wrapper.vm as any;
      vm.selectResult({ value: "id-1", label: "Erstes", subtitle: "" });
      vm.selectResult({ value: "id-2", label: "Zweites", subtitle: "" });
      expect(vm.pendingSelectedBauvorhabenId).toBe("id-2");
      expect(vm.pendingSelectedLabel).toBe("Zweites");
    });
  });

  describe("clearSearch", () => {
    test("resets all search state to initial values", () => {
      const vm = wrapper.vm as any;
      vm.selectResult({ value: "abc", label: "Test", subtitle: "" });
      vm.loading = true;

      vm.clearSearch();

      expect(vm.searchQuery).toBe("");
      expect(vm.bauvorhaben).toEqual([]);
      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
      expect(vm.loading).toBe(false);
    });

    test("sets loading to false to cancel any in-progress indicator", () => {
      const vm = wrapper.vm as any;
      vm.loading = true;
      vm.clearSearch();
      expect(vm.loading).toBe(false);
    });
  });

  describe("abbrechen", () => {
    test("clears search state and closes dialog", async () => {
      const vm = wrapper.vm as any;
      vm.selectResult({ value: "x", label: "X", subtitle: "" });

      vm.abbrechen();

      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
      expect(vm.searchQuery).toBe("");
      expect(vm.dialogOpen).toBe(false);
    });
  });

  describe("uebernehmen", () => {
    test("sets selectedBauvorhabenId and closes dialog when a result is pending", async () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "bv-42";

      vm.uebernehmen();

      expect(vm.dialogOpen).toBe(false);
    });

    test("does nothing when no result is pending", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = undefined;
      const before = vm.dialogOpen;

      vm.uebernehmen();

      expect(vm.dialogOpen).toBe(before);
    });

    test("emits update:selectedBauvorhabenId with the correct value", async () => {
      wrapper = mount(AuswahlBauvorhabenDialog, {
        shallow: true,
        props: {
          modelValue: true,
          selectedBauvorhabenId: undefined,
          "onUpdate:selectedBauvorhabenId": vi.fn(),
        },
      });
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "bv-99";

      vm.uebernehmen();

      const emitted = wrapper.emitted("update:selectedBauvorhabenId");
      expect(emitted).toBeTruthy();
      expect(emitted![0]).toEqual(["bv-99"]);
    });
  });

  describe("handleEnter", () => {
    test("confirms and closes dialog when a result is already pending", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "bv-1";

      vm.handleEnter();

      // uebernehmen() is called, which closes the dialog
      expect(vm.dialogOpen).toBe(false);
    });

    test("selects first result if no result is pending and results exist", () => {
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [
        { id: "id-first", nameVorhaben: "Erstes Bauvorhaben", stadtbezirke: undefined },
        { id: "id-second", nameVorhaben: "Zweites Bauvorhaben", stadtbezirke: undefined },
      ];

      vm.handleEnter();

      expect(vm.pendingSelectedBauvorhabenId).toBe("id-first");
      expect(vm.pendingSelectedLabel).toBe("Erstes Bauvorhaben");
      expect(vm.searchQuery).toBe("Erstes Bauvorhaben");
    });

    test("does nothing when no result is pending and result list is empty", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = undefined;
      vm.bauvorhaben = [];

      vm.handleEnter();

      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
    });
  });

  describe("handleSearchInput", () => {
    test("clears state when query is empty", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "some-id";
      vm.pendingSelectedLabel = "Some Label";

      vm.handleSearchInput("");

      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
      expect(vm.bauvorhaben).toEqual([]);
      expect(vm.loading).toBe(false);
    });

    test("clears state when query is only whitespace", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "some-id";
      vm.pendingSelectedLabel = "Some Label";

      vm.handleSearchInput("   ");

      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("clears pending selection when new query differs from previously selected label", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "id-1";
      vm.pendingSelectedLabel = "Old Label";

      vm.handleSearchInput("Different query");

      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("preserves pending selection when query matches the previously selected label exactly", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "id-1";
      vm.pendingSelectedLabel = "Exact Label";

      vm.handleSearchInput("Exact Label");

      expect(vm.pendingSelectedBauvorhabenId).toBe("id-1");
    });
  });

  describe("resultItems computed", () => {
    test("returns empty array when bauvorhaben list is empty", () => {
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [];
      expect(vm.resultItems).toEqual([]);
    });

    test("maps bauvorhaben entries to ResultItem shape", () => {
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [{ id: "1", nameVorhaben: "Testvorhaben", stadtbezirke: undefined }];
      const items = vm.resultItems;
      expect(items).toHaveLength(1);
      expect(items[0].value).toBe("1");
      expect(items[0].label).toBe("Testvorhaben");
      expect(typeof items[0].subtitle).toBe("string");
    });

    test("filters out entries without id", () => {
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [
        { id: "", nameVorhaben: "No ID", stadtbezirke: undefined },
        { id: "2", nameVorhaben: "Has ID", stadtbezirke: undefined },
      ];
      expect(vm.resultItems).toHaveLength(1);
      expect(vm.resultItems[0].value).toBe("2");
    });

    test("filters out entries without nameVorhaben", () => {
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [
        { id: "1", nameVorhaben: "", stadtbezirke: undefined },
        { id: "2", nameVorhaben: "Valid", stadtbezirke: undefined },
      ];
      expect(vm.resultItems).toHaveLength(1);
      expect(vm.resultItems[0].value).toBe("2");
    });

    test("includes stadtbezirke information in subtitle", () => {
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [
        {
          id: "1",
          nameVorhaben: "TestVorhaben",
          stadtbezirke: new Set([
            { nummer: 1, name: "Altstadt" },
            { nummer: 2, name: "Maxvorstadt" },
          ]),
        },
      ];
      const items = vm.resultItems;
      expect(items[0].subtitle).toContain("1/Altstadt");
      expect(items[0].subtitle).toContain("2/Maxvorstadt");
    });

    test("shows 'Keine Stadtbezirke vorhanden' in subtitle when stadtbezirke is undefined", () => {
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [{ id: "5", nameVorhaben: "Vorhaben Ohne Bezirk", stadtbezirke: undefined }];
      expect(vm.resultItems[0].subtitle).toContain("Keine Stadtbezirke vorhanden");
    });
  });

  describe("hasListContent computed", () => {
    test("returns false when bauvorhaben is empty", () => {
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [];
      expect(vm.hasListContent).toBe(false);
    });

    test("returns true when bauvorhaben has valid entries", () => {
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [{ id: "1", nameVorhaben: "Test", stadtbezirke: undefined }];
      expect(vm.hasListContent).toBe(true);
    });
  });

  describe("getStadtbezirke", () => {
    test("returns empty string when stadtbezirke is undefined", () => {
      const vm = wrapper.vm as any;
      expect(vm.getStadtbezirke(undefined)).toBe("");
    });

    test("returns empty string for empty set", () => {
      const vm = wrapper.vm as any;
      expect(vm.getStadtbezirke(new Set())).toBe("");
    });

    test("formats a single stadtbezirk as nummer/name", () => {
      const vm = wrapper.vm as any;
      const result = vm.getStadtbezirke(new Set([{ nummer: 3, name: "Schwabing" }]));
      expect(result).toBe("3/Schwabing");
    });

    test("sorts multiple stadtbezirke by nummer and joins them", () => {
      const vm = wrapper.vm as any;
      const result = vm.getStadtbezirke(
        new Set([
          { nummer: 5, name: "Maxvorstadt" },
          { nummer: 1, name: "Altstadt" },
          { nummer: 3, name: "Schwabing" },
        ]),
      );
      expect(result).toBe("1/Altstadt, 3/Schwabing, 5/Maxvorstadt");
    });
  });

  describe("createQuery", () => {
    test("creates query with selectBauvorhaben=true and all others false", () => {
      const vm = wrapper.vm as any;
      const query = vm.createQuery("test");
      expect(query.selectBauvorhaben).toBe(true);
      expect(query.selectBauleitplanverfahren).toBe(false);
      expect(query.selectBaugenehmigungsverfahren).toBe(false);
      expect(query.selectWeiteresVerfahren).toBe(false);
      expect(query.selectGrundschule).toBe(false);
      expect(query.searchQuery).toBe("test");
    });
  });

  describe("createQueryFull", () => {
    test("extends createQuery with pagination and sorting", () => {
      const vm = wrapper.vm as any;
      const query = vm.createQueryFull("mein suchwort");
      expect(query.page).toBe(1);
      expect(query.pageSize).toBe(20);
      expect(query.sortBy).toBeDefined();
      expect(query.sortOrder).toBeDefined();
      expect(query.searchQuery).toBe("mein suchwort");
      expect(query.selectBauvorhaben).toBe(true);
    });
  });

  describe("dialog open/close behavior", () => {
    test("closing dialog does not call clearSearch", async () => {
      const vm = wrapper.vm as any;
      vm.selectResult({ value: "x", label: "Test", subtitle: "" });
      const spy = vi.spyOn(vm, "clearSearch");

      await wrapper.setProps({ modelValue: false });

      // watch fires on close, but our implementation returns early
      expect(spy).not.toHaveBeenCalled();
    });
  });
});