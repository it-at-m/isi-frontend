import { beforeEach, describe, expect, test, vi } from "vitest";
import { type VueWrapper, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { ref, nextTick } from "vue";

// Mock the SearchApi composable before importing the component
const mockSearchForEntities = vi.fn();
vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({
    searchForEntities: mockSearchForEntities,
  }),
}));

import AuswahlBauvorhabenDialog from "@/components/common/AuswahlBauvorhabenDialog.vue";
import {
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";

function createBauvorhabenSearchResult(id: string, nameVorhaben: string) {
  return { id, nameVorhaben };
}

function mountDialog(dialogOpen = true, selectedBauvorhabenId: string | undefined = undefined) {
  return mount(AuswahlBauvorhabenDialog, {
    shallow: true,
    props: {
      modelValue: dialogOpen,
      selectedBauvorhabenId,
    },
  });
}

describe("AuswahlBauvorhabenDialog", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    mockSearchForEntities.mockResolvedValue({ searchResults: [] });
  });

  describe("createQuery", () => {
    test("createQuery sets selectBauvorhaben to true", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectBauvorhaben).toBe(true);
    });

    test("createQuery sets all other select flags to false", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectBauleitplanverfahren).toBe(false);
      expect(query.selectBaugenehmigungsverfahren).toBe(false);
      expect(query.selectWeiteresVerfahren).toBe(false);
      expect(query.selectGrundschule).toBe(false);
      expect(query.selectGsNachmittagBetreuung).toBe(false);
      expect(query.selectHausFuerKinder).toBe(false);
      expect(query.selectKindergarten).toBe(false);
      expect(query.selectKinderkrippe).toBe(false);
      expect(query.selectMittelschule).toBe(false);
    });

    test("createQuery sets searchQuery to provided text", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQuery("Mein Suchbegriff");
      expect(query.searchQuery).toBe("Mein Suchbegriff");
    });

    test("createQuery sets page and pageSize to undefined", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.page).toBeUndefined();
      expect(query.pageSize).toBeUndefined();
    });
  });

  describe("createQueryFull", () => {
    test("createQueryFull sets page to 1", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQueryFull("test");
      expect(query.page).toBe(1);
    });

    test("createQueryFull sets pageSize to 20", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQueryFull("test");
      expect(query.pageSize).toBe(20);
    });

    test("createQueryFull sets sortBy to LastModifiedDateTime", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQueryFull("test");
      expect(query.sortBy).toBe(SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime);
    });

    test("createQueryFull sets sortOrder to Desc", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQueryFull("test");
      expect(query.sortOrder).toBe(SearchQueryAndSortingDtoSortOrderEnum.Desc);
    });

    test("createQueryFull preserves selectBauvorhaben: true", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQueryFull("abc");
      expect(query.selectBauvorhaben).toBe(true);
    });

    test("createQueryFull preserves provided searchText", async () => {
      const wrapper = mountDialog();
      const query = (wrapper.vm as any).createQueryFull("Suchtext");
      expect(query.searchQuery).toBe("Suchtext");
    });
  });

  describe("resultItems computed", () => {
    test("returns empty array when bauvorhaben list is empty", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [];
      await nextTick();
      expect(vm.resultItems).toHaveLength(0);
    });

    test("maps valid bauvorhaben entries to ResultItems", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [createBauvorhabenSearchResult("id-1", "Vorhaben A")];
      await nextTick();
      expect(vm.resultItems).toHaveLength(1);
      expect(vm.resultItems[0]).toEqual({ label: "Vorhaben A", value: "id-1" });
    });

    test("filters out entries with empty id", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [
        createBauvorhabenSearchResult("", "Vorhaben ohne ID"),
        createBauvorhabenSearchResult("id-1", "Valides Vorhaben"),
      ];
      await nextTick();
      expect(vm.resultItems).toHaveLength(1);
      expect(vm.resultItems[0].value).toBe("id-1");
    });

    test("filters out entries with empty nameVorhaben", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [
        createBauvorhabenSearchResult("id-1", ""),
        createBauvorhabenSearchResult("id-2", "Vorhaben mit Name"),
      ];
      await nextTick();
      expect(vm.resultItems).toHaveLength(1);
      expect(vm.resultItems[0].value).toBe("id-2");
    });

    test("filters out entries with undefined id", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [{ id: undefined, nameVorhaben: "Ohne ID" }, createBauvorhabenSearchResult("id-1", "Mit ID")];
      await nextTick();
      expect(vm.resultItems).toHaveLength(1);
    });
  });

  describe("hasListContent computed", () => {
    test("returns false when resultItems is empty", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [];
      await nextTick();
      expect(vm.hasListContent).toBe(false);
    });

    test("returns true when resultItems has entries", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [createBauvorhabenSearchResult("id-1", "Vorhaben")];
      await nextTick();
      expect(vm.hasListContent).toBe(true);
    });
  });

  describe("selectResult", () => {
    test("sets pendingSelectedBauvorhabenId to item value", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.selectResult({ label: "Vorhaben X", value: "id-x" });
      expect(vm.pendingSelectedBauvorhabenId).toBe("id-x");
    });

    test("sets pendingSelectedLabel to item label", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.selectResult({ label: "Vorhaben X", value: "id-x" });
      expect(vm.pendingSelectedLabel).toBe("Vorhaben X");
    });

    test("sets searchQuery to item label", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.selectResult({ label: "Vorhaben X", value: "id-x" });
      expect(vm.searchQuery).toBe("Vorhaben X");
    });

    test("updating selection replaces previous pendingSelectedBauvorhabenId", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.selectResult({ label: "Vorhaben A", value: "id-a" });
      vm.selectResult({ label: "Vorhaben B", value: "id-b" });
      expect(vm.pendingSelectedBauvorhabenId).toBe("id-b");
      expect(vm.pendingSelectedLabel).toBe("Vorhaben B");
    });
  });

  describe("handleEnter", () => {
    test("triggers uebernehmen behavior when pendingSelectedBauvorhabenId is set (dialog closes and id is emitted)", async () => {
      const wrapper = mountDialog(true);
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "id-x";
      vm.handleEnter();
      // uebernehmen should have been called: dialog closes and id is emitted
      const modelEmitted = wrapper.emitted("update:modelValue");
      expect(modelEmitted).toBeDefined();
      expect(modelEmitted![modelEmitted!.length - 1]).toEqual([false]);
      const idEmitted = wrapper.emitted("update:selectedBauvorhabenId");
      expect(idEmitted).toBeDefined();
      expect(idEmitted![idEmitted!.length - 1]).toEqual(["id-x"]);
    });

    test("does nothing if no pending selection and no results", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = undefined;
      vm.bauvorhaben = [];
      await nextTick();
      // should not throw
      vm.handleEnter();
      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
    });

    test("selects first result when no pending selection and results exist", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = undefined;
      vm.bauvorhaben = [
        createBauvorhabenSearchResult("id-first", "Erstes Vorhaben"),
        createBauvorhabenSearchResult("id-second", "Zweites Vorhaben"),
      ];
      await nextTick();
      vm.handleEnter();
      expect(vm.pendingSelectedBauvorhabenId).toBe("id-first");
      expect(vm.pendingSelectedLabel).toBe("Erstes Vorhaben");
      expect(vm.searchQuery).toBe("Erstes Vorhaben");
    });
  });

  describe("clearSearch", () => {
    test("resets searchQuery to empty string", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.searchQuery = "some text";
      vm.clearSearch();
      expect(vm.searchQuery).toBe("");
    });

    test("clears bauvorhaben list", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [createBauvorhabenSearchResult("id-1", "Vorhaben")];
      vm.clearSearch();
      expect(vm.bauvorhaben).toHaveLength(0);
    });

    test("clears pendingSelectedBauvorhabenId", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "id-x";
      vm.clearSearch();
      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
    });

    test("clears pendingSelectedLabel", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedLabel = "Some label";
      vm.clearSearch();
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("sets loading to false", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.loading = true;
      vm.clearSearch();
      expect(vm.loading).toBe(false);
    });
  });

  describe("abbrechen", () => {
    test("clears search state", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.searchQuery = "some text";
      vm.pendingSelectedBauvorhabenId = "id-x";
      vm.abbrechen();
      expect(vm.searchQuery).toBe("");
      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
    });

    test("closes the dialog (sets dialogOpen to false)", async () => {
      const wrapper = mountDialog(true);
      const vm = wrapper.vm as any;
      vm.abbrechen();
      // dialogOpen (modelValue) should be updated
      const emitted = wrapper.emitted("update:modelValue");
      expect(emitted).toBeDefined();
      expect(emitted![emitted!.length - 1]).toEqual([false]);
    });
  });

  describe("uebernehmen", () => {
    test("does nothing when no pending selection", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = undefined;
      vm.uebernehmen();
      // dialog should remain open
      const emitted = wrapper.emitted("update:modelValue");
      // Either no emission or last emission is still true
      if (emitted) {
        const lastEmit = emitted[emitted.length - 1];
        expect(lastEmit).not.toEqual([false]);
      }
    });

    test("emits selectedBauvorhabenId update when pending selection exists", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "id-selected";
      vm.uebernehmen();
      const emitted = wrapper.emitted("update:selectedBauvorhabenId");
      expect(emitted).toBeDefined();
      expect(emitted![emitted!.length - 1]).toEqual(["id-selected"]);
    });

    test("closes the dialog after taking over selection", async () => {
      const wrapper = mountDialog(true);
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "id-selected";
      vm.uebernehmen();
      const emitted = wrapper.emitted("update:modelValue");
      expect(emitted).toBeDefined();
      expect(emitted![emitted!.length - 1]).toEqual([false]);
    });
  });

  describe("handleSearchInput", () => {
    test("clears bauvorhaben when query is empty", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [createBauvorhabenSearchResult("id-1", "Vorhaben")];
      vm.handleSearchInput("");
      await nextTick();
      expect(vm.bauvorhaben).toHaveLength(0);
    });

    test("clears pendingSelectedBauvorhabenId when query is empty", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "id-x";
      vm.handleSearchInput("");
      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
    });

    test("clears pendingSelectedLabel when query is empty", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedLabel = "Label";
      vm.handleSearchInput("");
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("clears pendingSelection when query changes away from previously selected label", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "id-x";
      vm.pendingSelectedLabel = "Vorhaben X";
      // Changed to a different string - should clear pending selection
      vm.handleSearchInput("Different text");
      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("does not clear pendingSelection when query matches pending label exactly", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedBauvorhabenId = "id-x";
      vm.pendingSelectedLabel = "Vorhaben X";
      // query exactly matches label - should keep selection
      vm.handleSearchInput("Vorhaben X");
      expect(vm.pendingSelectedBauvorhabenId).toBe("id-x");
    });

    test("sets loading to false immediately on input", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.loading = true;
      vm.handleSearchInput("abc");
      expect(vm.loading).toBe(false);
    });

    test("clears bauvorhaben immediately on new input", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [createBauvorhabenSearchResult("id-1", "Alt")];
      vm.handleSearchInput("new search");
      expect(vm.bauvorhaben).toHaveLength(0);
    });
  });

  describe("search function", () => {
    test("clears results and skips API call for empty query", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [createBauvorhabenSearchResult("id-1", "Alt")];
      await vm.search("");
      expect(mockSearchForEntities).not.toHaveBeenCalled();
      expect(vm.bauvorhaben).toHaveLength(0);
    });

    test("clears results and skips API call for whitespace-only query", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.bauvorhaben = [createBauvorhabenSearchResult("id-1", "Alt")];
      await vm.search("   ");
      expect(mockSearchForEntities).not.toHaveBeenCalled();
      expect(vm.bauvorhaben).toHaveLength(0);
    });

    test("calls searchForEntities with correct parameters for non-empty query", async () => {
      mockSearchForEntities.mockResolvedValue({ searchResults: [] });
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      await vm.search("Test");
      expect(mockSearchForEntities).toHaveBeenCalledWith(
        expect.objectContaining({
          searchQuery: "Test",
          selectBauvorhaben: true,
          page: 1,
          pageSize: 20,
        }),
      );
    });

    test("filters results by nameVorhaben matching query", async () => {
      mockSearchForEntities.mockResolvedValue({
        searchResults: [
          createBauvorhabenSearchResult("id-1", "Schulgebäude"),
          createBauvorhabenSearchResult("id-2", "Kindergarten Nord"),
          createBauvorhabenSearchResult("id-3", "Schule Süd"),
        ],
      });
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      await vm.search("schul");
      // Should match "Schulgebäude" and "Schule Süd" (case-insensitive)
      expect(vm.bauvorhaben).toHaveLength(2);
      expect(vm.bauvorhaben.map((b: any) => b.id)).toContain("id-1");
      expect(vm.bauvorhaben.map((b: any) => b.id)).toContain("id-3");
    });

    test("sets loading to false after successful search", async () => {
      mockSearchForEntities.mockResolvedValue({ searchResults: [] });
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      await vm.search("test");
      expect(vm.loading).toBe(false);
    });

    test("sets loading to false after failed search", async () => {
      mockSearchForEntities.mockRejectedValue(new Error("Network error"));
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      try {
        await vm.search("test");
      } catch {
        // ignore
      }
      expect(vm.loading).toBe(false);
    });

    test("handles empty searchResults gracefully", async () => {
      mockSearchForEntities.mockResolvedValue({ searchResults: null });
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      await vm.search("test");
      expect(vm.bauvorhaben).toHaveLength(0);
    });

    test("does case-insensitive filtering of results", async () => {
      mockSearchForEntities.mockResolvedValue({
        searchResults: [
          createBauvorhabenSearchResult("id-1", "SCHULGEBÄUDE"),
          createBauvorhabenSearchResult("id-2", "Keine Übereinstimmung"),
        ],
      });
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      await vm.search("schulgebäude");
      expect(vm.bauvorhaben).toHaveLength(1);
      expect(vm.bauvorhaben[0].id).toBe("id-1");
    });
  });

  describe("dialog open watch", () => {
    test("clears search state when dialog opens", async () => {
      const wrapper = mountDialog(false);
      const vm = wrapper.vm as any;
      vm.searchQuery = "some text";
      vm.pendingSelectedBauvorhabenId = "id-x";
      // Simulate dialog opening
      await wrapper.setProps({ modelValue: true });
      await nextTick();
      expect(vm.searchQuery).toBe("");
      expect(vm.pendingSelectedBauvorhabenId).toBeUndefined();
    });

    test("does not reset state when dialog closes", async () => {
      const wrapper = mountDialog(true);
      const vm = wrapper.vm as any;
      vm.searchQuery = "some text";
      // Simulate dialog closing
      await wrapper.setProps({ modelValue: false });
      await nextTick();
      // State should be unchanged since dialog closed (not opened)
      expect(vm.searchQuery).toBe("some text");
    });
  });
});