import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { nextTick } from "vue";
import { Context } from "@/utils/Context";

const mockSearchForEntities = vi.fn();
const mockGetById = vi.fn();

vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({
    searchForEntities: mockSearchForEntities,
  }),
}));

vi.mock("@/composables/requests/AbfragenApi", () => ({
  useAbfragenApi: () => ({
    getById: mockGetById,
  }),
}));

import DataTransferDialog from "@/components/common/DataTransferDialog.vue";
import {
  AbfrageDtoArtAbfrageEnum,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
  StatusAbfrage,
} from "@/api/api-client/isi-backend";
import { useSearchStore } from "@/stores/SearchStore";
import { useLookupStore } from "@/stores/LookupStore";
import { createBauleitplanverfahrenDto } from "@/utils/Factories";

function createAbfrageSearchResult(overrides: Record<string, unknown> = {}) {
  return {
    id: "abfrage-id-1",
    name: "Testabfrage",
    artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
    statusAbfrage: StatusAbfrage.InBearbeitungSachbearbeitung,
    standVerfahren: undefined,
    bauvorhaben: undefined,
    ...overrides,
  };
}

function mountDialog(dialogOpen = true, context: Context = Context.BAUVORHABEN) {
  return mount(DataTransferDialog, {
    shallow: true,
    props: {
      modelValue: dialogOpen,
      context,
    },
  });
}

describe("DataTransferDialog", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    mockSearchForEntities.mockResolvedValue({ searchResults: [] });
    mockGetById.mockResolvedValue(createBauleitplanverfahrenDto());
  });

  describe("createQuery - BAUVORHABEN context", () => {
    test("sets all three abfrage flags to true in BAUVORHABEN context", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectBauleitplanverfahren).toBe(true);
      expect(query.selectBaugenehmigungsverfahren).toBe(true);
      expect(query.selectWeiteresVerfahren).toBe(true);
    });

    test("keeps selectBauvorhaben false in BAUVORHABEN context", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectBauvorhaben).toBe(false);
    });

    test("sets infrastructure flags to false in BAUVORHABEN context", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectGrundschule).toBe(false);
      expect(query.selectKindergarten).toBe(false);
      expect(query.selectKinderkrippe).toBe(false);
      expect(query.selectMittelschule).toBe(false);
    });

    test("sets searchQuery from provided text", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const query = (wrapper.vm as any).createQuery("Mein Suchtext");
      expect(query.searchQuery).toBe("Mein Suchtext");
    });

    test("sets page to 1 and pageSize to 20", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.page).toBe(1);
      expect(query.pageSize).toBe(20);
    });

    test("sets sortBy to LastModifiedDateTime", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.sortBy).toBe(SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime);
    });

    test("sets sortOrder to Desc", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.sortOrder).toBe(SearchQueryAndSortingDtoSortOrderEnum.Desc);
    });
  });

  describe("createQuery - ABFRAGE context", () => {
    test("sets only Bauleitplanverfahren flag when selectedAbfrage is Bauleitplanverfahren", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
      } as any;
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectBauleitplanverfahren).toBe(true);
      expect(query.selectBaugenehmigungsverfahren).toBe(false);
      expect(query.selectWeiteresVerfahren).toBe(false);
    });

    test("sets only Baugenehmigungsverfahren flag when selectedAbfrage is Baugenehmigungsverfahren", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren,
      } as any;
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectBaugenehmigungsverfahren).toBe(true);
      expect(query.selectBauleitplanverfahren).toBe(false);
      expect(query.selectWeiteresVerfahren).toBe(false);
    });

    test("sets only WeiteresVerfahren flag when selectedAbfrage is WeiteresVerfahren", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.WeiteresVerfahren,
      } as any;
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectWeiteresVerfahren).toBe(true);
      expect(query.selectBauleitplanverfahren).toBe(false);
      expect(query.selectBaugenehmigungsverfahren).toBe(false);
    });

    test("sets no select flags when selectedAbfrage has unknown artAbfrage", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = {
        artAbfrage: "UNKNOWN_TYPE",
      } as any;
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectBauleitplanverfahren).toBe(false);
      expect(query.selectBaugenehmigungsverfahren).toBe(false);
      expect(query.selectWeiteresVerfahren).toBe(false);
    });

    test("sets no select flags when selectedAbfrage is undefined", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = undefined;
      const query = (wrapper.vm as any).createQuery("test");
      expect(query.selectBauleitplanverfahren).toBe(false);
      expect(query.selectBaugenehmigungsverfahren).toBe(false);
      expect(query.selectWeiteresVerfahren).toBe(false);
    });
  });

  describe("searchResultFilter - ABFRAGE context", () => {
    test("passes result with matching artAbfrage and valid status", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
      } as any;
      const result = createAbfrageSearchResult({
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.ErledigtMitFachreferat,
      });
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(true);
    });

    test("rejects result with wrong artAbfrage", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
      } as any;
      const result = createAbfrageSearchResult({
        artAbfrage: AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren,
        statusAbfrage: StatusAbfrage.InBearbeitungSachbearbeitung,
      });
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(false);
    });

    test("rejects result with StatusAbfrage.Angelegt", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
      } as any;
      const result = createAbfrageSearchResult({
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.Angelegt,
      });
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(false);
    });

    test("rejects result with StatusAbfrage.Abbruch", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
      } as any;
      const result = createAbfrageSearchResult({
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.Abbruch,
      });
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(false);
    });

    test("rejects result with undefined statusAbfrage", () => {
      const wrapper = mountDialog(true, Context.ABFRAGE);
      const searchStore = useSearchStore();
      searchStore.selectedAbfrage = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
      } as any;
      const result = createAbfrageSearchResult({
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: undefined,
      });
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(false);
    });
  });

  describe("searchResultFilter - BAUVORHABEN context", () => {
    test("passes result with empty/undefined bauvorhaben", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const result = createAbfrageSearchResult({ bauvorhaben: undefined });
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(true);
    });

    test("passes result with null bauvorhaben", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const result = createAbfrageSearchResult({ bauvorhaben: null });
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(true);
    });

    test("rejects result with a non-empty bauvorhaben string", () => {
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const result = createAbfrageSearchResult({ bauvorhaben: "bv-id-123" });
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(false);
    });
  });

  describe("searchResultFilter - other contexts", () => {
    test("returns true for INFRASTRUKTUREINRICHTUNG context", () => {
      const wrapper = mountDialog(true, Context.INFRASTRUKTUREINRICHTUNG);
      const result = createAbfrageSearchResult();
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(true);
    });

    test("returns true for UNDEFINED context", () => {
      const wrapper = mountDialog(true, Context.UNDEFINED);
      const result = createAbfrageSearchResult();
      expect((wrapper.vm as any).searchResultFilter(result)).toBe(true);
    });
  });

  describe("getItemText", () => {
    test("formats text with name, status, and stand", () => {
      const wrapper = mountDialog();
      const lookupStore = useLookupStore();
      lookupStore.statusAbfrage = [{ key: "IN_BEARBEITUNG_SACHBEARBEITUNG", value: "In Bearbeitung" }] as any;
      lookupStore.standVerfahren = [{ key: "BAULEITPLAN_ENTWURF", value: "Bauleitplan-Entwurf" }] as any;
      const result = createAbfrageSearchResult({
        name: "Meine Abfrage",
        statusAbfrage: "IN_BEARBEITUNG_SACHBEARBEITUNG",
        standVerfahren: "BAULEITPLAN_ENTWURF",
      });
      const text = (wrapper.vm as any).getItemText(result);
      expect(text).toContain("Meine Abfrage");
      expect(text).toContain("In Bearbeitung");
      expect(text).toContain("Bauleitplan-Entwurf");
    });

    test("uses fallback text when name is undefined", () => {
      const wrapper = mountDialog();
      const result = createAbfrageSearchResult({ name: undefined });
      const text = (wrapper.vm as any).getItemText(result);
      expect(text).toContain("Kein Name vorhanden");
    });

    test("uses fallback text when statusAbfrage lookup key not found in list", () => {
      const wrapper = mountDialog();
      const lookupStore = useLookupStore();
      lookupStore.statusAbfrage = [] as any;
      const result = createAbfrageSearchResult({ statusAbfrage: "SOME_STATUS" });
      const text = (wrapper.vm as any).getItemText(result);
      // When key not found in empty list, getLookupValue returns undefined, defaultTo falls back
      expect(text).toContain("Kein Abfragestatus vorhanden");
    });

    test("uses fallback text when status is undefined", () => {
      const wrapper = mountDialog();
      const result = createAbfrageSearchResult({ statusAbfrage: undefined });
      const text = (wrapper.vm as any).getItemText(result);
      expect(text).toContain("Kein Abfragestatus vorhanden");
    });
  });

  describe("getItemSubtitle", () => {
    test("formats subtitle with artAbfrage", () => {
      const wrapper = mountDialog();
      const result = createAbfrageSearchResult({
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
      });
      const subtitle = (wrapper.vm as any).getItemSubtitle(result);
      expect(subtitle).toContain("Abfrage •");
      expect(subtitle).toContain(AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren);
    });

    test("uses fallback 'Unbekannte Art' when artAbfrage is undefined", () => {
      const wrapper = mountDialog();
      const result = createAbfrageSearchResult({ artAbfrage: undefined });
      const subtitle = (wrapper.vm as any).getItemSubtitle(result);
      expect(subtitle).toContain("Unbekannte Art");
    });
  });

  describe("resultItems computed", () => {
    test("returns empty array when abfragen is empty", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [];
      await nextTick();
      expect(vm.resultItems).toHaveLength(0);
    });

    test("maps valid entries to ResultItems", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [createAbfrageSearchResult({ id: "id-1", name: "Abfrage A" })];
      await nextTick();
      expect(vm.resultItems).toHaveLength(1);
      expect(vm.resultItems[0].value).toBe("id-1");
    });

    test("includes title and subtitle in each ResultItem", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [
        createAbfrageSearchResult({
          id: "id-1",
          name: "Abfrage A",
          artAbfrage: AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren,
        }),
      ];
      await nextTick();
      const item = vm.resultItems[0];
      expect(item.title).toBe("Abfrage A");
      expect(item.subtitle).toContain(AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren);
    });

    test("filters out entries with empty id", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [
        createAbfrageSearchResult({ id: "" }),
        createAbfrageSearchResult({ id: "id-2", name: "Valide" }),
      ];
      await nextTick();
      expect(vm.resultItems).toHaveLength(1);
      expect(vm.resultItems[0].value).toBe("id-2");
    });

    test("filters out entries with undefined id", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [
        createAbfrageSearchResult({ id: undefined }),
        createAbfrageSearchResult({ id: "id-2", name: "Valide" }),
      ];
      await nextTick();
      expect(vm.resultItems).toHaveLength(1);
      expect(vm.resultItems[0].value).toBe("id-2");
    });

    test("uses fallback title when name is undefined", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [createAbfrageSearchResult({ id: "id-1", name: undefined })];
      await nextTick();
      expect(vm.resultItems[0].title).toBe("Kein Name vorhanden");
    });
  });

  describe("hasListContent computed", () => {
    test("returns false when resultItems is empty", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [];
      await nextTick();
      expect(vm.hasListContent).toBe(false);
    });

    test("returns true when resultItems has entries", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [createAbfrageSearchResult({ id: "id-1" })];
      await nextTick();
      expect(vm.hasListContent).toBe(true);
    });
  });

  describe("selectResult", () => {
    test("sets pendingSelectedAbfrageId to item value", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.selectResult({ title: "T", subtitle: "S", label: "Label A", value: "id-a" });
      expect(vm.pendingSelectedAbfrageId).toBe("id-a");
    });

    test("sets pendingSelectedLabel to item label", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.selectResult({ title: "T", subtitle: "S", label: "Label A", value: "id-a" });
      expect(vm.pendingSelectedLabel).toBe("Label A");
    });

    test("sets searchQuery to item label", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.selectResult({ title: "T", subtitle: "S", label: "Label A", value: "id-a" });
      expect(vm.searchQuery).toBe("Label A");
    });

    test("updating selection replaces previous pendingSelectedAbfrageId", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.selectResult({ title: "T", subtitle: "S", label: "Label A", value: "id-a" });
      vm.selectResult({ title: "T", subtitle: "S", label: "Label B", value: "id-b" });
      expect(vm.pendingSelectedAbfrageId).toBe("id-b");
      expect(vm.pendingSelectedLabel).toBe("Label B");
    });
  });

  describe("clearSearch", () => {
    test("resets searchQuery to empty string", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.searchQuery = "Some query";
      vm.clearSearch();
      expect(vm.searchQuery).toBe("");
    });

    test("clears abfragen list", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [createAbfrageSearchResult()];
      vm.clearSearch();
      expect(vm.abfragen).toHaveLength(0);
    });

    test("resets pendingSelectedAbfrageId to undefined", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-x";
      vm.clearSearch();
      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
    });

    test("resets pendingSelectedLabel to empty string", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedLabel = "Some label";
      vm.clearSearch();
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("resets loading to false", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.loading = true;
      vm.clearSearch();
      expect(vm.loading).toBe(false);
    });
  });

  describe("handleEnter", () => {
    test("calls abfrageUebernehmen when pendingSelectedAbfrageId is set", async () => {
      const mockAbfrage = { ...createBauleitplanverfahrenDto(), id: "id-x" };
      mockGetById.mockResolvedValue(mockAbfrage);

      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-x";
      vm.pendingSelectedLabel = "Some Label";
      vm.handleEnter();
      await nextTick();
      await nextTick();

      const emitted = wrapper.emitted("abfrageUebernehmen");
      expect(emitted).toBeDefined();
    });

    test("does nothing when no pending selection and no results", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = undefined;
      vm.abfragen = [];
      // Should not throw
      vm.handleEnter();
      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
    });

    test("selects first result when no pending selection and results exist", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = undefined;
      vm.abfragen = [createAbfrageSearchResult({ id: "id-first", name: "Erste Abfrage" })];
      await nextTick();
      vm.handleEnter();
      expect(vm.pendingSelectedAbfrageId).toBe("id-first");
    });

    test("sets searchQuery when selecting first result via handleEnter", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = undefined;
      vm.abfragen = [createAbfrageSearchResult({ id: "id-first", name: "Erste Abfrage" })];
      await nextTick();
      vm.handleEnter();
      // searchQuery should be set to the label (getItemText result)
      expect(vm.searchQuery).toBeTruthy();
    });
  });

  describe("abfrageUebernehmen", () => {
    test("does nothing when pendingSelectedAbfrageId is undefined", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = undefined;
      await vm.abfrageUebernehmen();
      expect(mockGetById).not.toHaveBeenCalled();
      const emitted = wrapper.emitted("abfrageUebernehmen");
      expect(emitted).toBeUndefined();
    });

    test("calls getById with the pending abfrage id", async () => {
      const mockAbfrage = { ...createBauleitplanverfahrenDto(), id: "id-y" };
      mockGetById.mockResolvedValue(mockAbfrage);

      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-y";
      await vm.abfrageUebernehmen();

      expect(mockGetById).toHaveBeenCalledWith("id-y");
    });

    test("emits abfrageUebernehmen with the fetched abfrage", async () => {
      const mockAbfrage = { ...createBauleitplanverfahrenDto(), id: "id-z", name: "Übernommene Abfrage" };
      mockGetById.mockResolvedValue(mockAbfrage);

      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-z";
      await vm.abfrageUebernehmen();

      const emitted = wrapper.emitted("abfrageUebernehmen");
      expect(emitted).toBeDefined();
      expect(emitted![0][0]).toMatchObject({ id: "id-z", name: "Übernommene Abfrage" });
    });

    test("clears search state after uebernehmen", async () => {
      const mockAbfrage = createBauleitplanverfahrenDto();
      mockGetById.mockResolvedValue(mockAbfrage);

      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-to-clear";
      vm.searchQuery = "some text";
      vm.abfragen = [createAbfrageSearchResult()];
      await vm.abfrageUebernehmen();

      expect(vm.searchQuery).toBe("");
      expect(vm.abfragen).toHaveLength(0);
      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
    });
  });

  describe("uebernahmeAbbrechen", () => {
    test("emits uebernahmeAbbrechen event", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.uebernahmeAbbrechen();
      const emitted = wrapper.emitted("uebernahmeAbbrechen");
      expect(emitted).toBeDefined();
    });

    test("clears search state on abbrechen", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.searchQuery = "some text";
      vm.pendingSelectedAbfrageId = "id-x";
      vm.abfragen = [createAbfrageSearchResult()];
      vm.uebernahmeAbbrechen();
      expect(vm.searchQuery).toBe("");
      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
      expect(vm.abfragen).toHaveLength(0);
    });
  });

  describe("handleSearchInput", () => {
    test("clears abfragen when query is empty", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [createAbfrageSearchResult()];
      vm.handleSearchInput("");
      expect(vm.abfragen).toHaveLength(0);
    });

    test("clears pendingSelectedAbfrageId when query is empty", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-x";
      vm.handleSearchInput("");
      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
    });

    test("clears pendingSelectedLabel when query is empty", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedLabel = "Label";
      vm.handleSearchInput("");
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("sets loading to false immediately on input", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.loading = true;
      vm.handleSearchInput("abc");
      expect(vm.loading).toBe(false);
    });

    test("clears abfragen immediately on new input", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [createAbfrageSearchResult()];
      vm.handleSearchInput("new search");
      expect(vm.abfragen).toHaveLength(0);
    });

    test("clears pending selection when query changes away from selected label", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-x";
      vm.pendingSelectedLabel = "Abfrage X";
      vm.handleSearchInput("Different text");
      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("keeps pending selection when query matches pending label exactly", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-x";
      vm.pendingSelectedLabel = "Abfrage X";
      vm.handleSearchInput("Abfrage X");
      expect(vm.pendingSelectedAbfrageId).toBe("id-x");
    });
  });

  describe("search function", () => {
    test("clears results and skips API call for empty query", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [createAbfrageSearchResult()];
      await vm.search("");
      expect(mockSearchForEntities).not.toHaveBeenCalled();
      expect(vm.abfragen).toHaveLength(0);
    });

    test("clears results and skips API call for whitespace-only query", async () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      vm.abfragen = [createAbfrageSearchResult()];
      await vm.search("   ");
      expect(mockSearchForEntities).not.toHaveBeenCalled();
      expect(vm.abfragen).toHaveLength(0);
    });

    test("calls searchForEntities with trimmed query", async () => {
      mockSearchForEntities.mockResolvedValue({ searchResults: [] });
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const vm = wrapper.vm as any;
      await vm.search("  Suchbegriff  ");
      expect(mockSearchForEntities).toHaveBeenCalledWith(
        expect.objectContaining({
          searchQuery: "Suchbegriff",
        }),
      );
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

    test("handles null searchResults gracefully", async () => {
      mockSearchForEntities.mockResolvedValue({ searchResults: null });
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      await vm.search("test");
      expect(vm.abfragen).toHaveLength(0);
    });

    test("filters results by getItemText matching query in BAUVORHABEN context", async () => {
      mockSearchForEntities.mockResolvedValue({
        searchResults: [
          createAbfrageSearchResult({ id: "id-1", name: "Wohnungsbau Nord", bauvorhaben: undefined }),
          createAbfrageSearchResult({ id: "id-2", name: "Schulgebäude Ost", bauvorhaben: undefined }),
          createAbfrageSearchResult({ id: "id-3", name: "Wohnungsbau Süd", bauvorhaben: undefined }),
        ],
      });
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const vm = wrapper.vm as any;
      await vm.search("Wohnungsbau");
      // Should contain only the two "Wohnungsbau" results
      expect(vm.abfragen.every((a: any) => (a.name ?? "").includes("Wohnungsbau"))).toBe(true);
    });

    test("applies searchResultFilter in BAUVORHABEN context (removes results with bauvorhaben set)", async () => {
      mockSearchForEntities.mockResolvedValue({
        searchResults: [
          createAbfrageSearchResult({
            id: "id-1",
            name: "Abfrage ohne Bauvorhaben",
            bauvorhaben: undefined,
          }),
          createAbfrageSearchResult({
            id: "id-2",
            name: "Abfrage mit Bauvorhaben",
            bauvorhaben: "bv-existing-id",
          }),
        ],
      });
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const vm = wrapper.vm as any;
      await vm.search("Abfrage");
      expect(vm.abfragen.find((a: any) => a.id === "id-1")).toBeDefined();
      expect(vm.abfragen.find((a: any) => a.id === "id-2")).toBeUndefined();
    });

    test("does case-insensitive filtering of results", async () => {
      mockSearchForEntities.mockResolvedValue({
        searchResults: [
          createAbfrageSearchResult({ id: "id-1", name: "STADTENTWICKLUNG", bauvorhaben: undefined }),
          createAbfrageSearchResult({ id: "id-2", name: "Kindergarten", bauvorhaben: undefined }),
        ],
      });
      const wrapper = mountDialog(true, Context.BAUVORHABEN);
      const vm = wrapper.vm as any;
      await vm.search("stadtentwicklung");
      expect(vm.abfragen).toHaveLength(1);
      expect(vm.abfragen[0].id).toBe("id-1");
    });
  });

  describe("getLookupValue", () => {
    test("returns lookup value when key exists in list", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      const list = [
        { key: "KEY_A", value: "Value A" },
        { key: "KEY_B", value: "Value B" },
      ];
      expect(vm.getLookupValue("KEY_A", list)).toBe("Value A");
    });

    test("returns undefined when key not found in list", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      const list = [{ key: "KEY_A", value: "Value A" }];
      expect(vm.getLookupValue("UNKNOWN_KEY", list)).toBeUndefined();
    });

    test("returns key when list is undefined", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      expect(vm.getLookupValue("SOME_KEY", undefined)).toBe("SOME_KEY");
    });

    test("returns undefined when key is undefined", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      const list = [{ key: "KEY_A", value: "Value A" }];
      expect(vm.getLookupValue(undefined, list)).toBeUndefined();
    });

    test("returns null when key is null (passthrough since _.isNil(null) is true)", () => {
      const wrapper = mountDialog();
      const vm = wrapper.vm as any;
      const list = [{ key: "KEY_A", value: "Value A" }];
      // _.isNil(null) is true, so the condition short-circuits and returns the key itself (null)
      expect(vm.getLookupValue(null, list)).toBeNull();
    });
  });

  describe("dialog open watch", () => {
    test("clears search state when dialog opens", async () => {
      const wrapper = mountDialog(false);
      const vm = wrapper.vm as any;
      vm.searchQuery = "some text";
      vm.pendingSelectedAbfrageId = "id-x";
      vm.abfragen = [createAbfrageSearchResult()];

      await wrapper.setProps({ modelValue: true });
      await nextTick();

      expect(vm.searchQuery).toBe("");
      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
      expect(vm.abfragen).toHaveLength(0);
    });

    test("does not reset state when dialog closes", async () => {
      const wrapper = mountDialog(true);
      const vm = wrapper.vm as any;
      vm.searchQuery = "some text";

      await wrapper.setProps({ modelValue: false });
      await nextTick();

      expect(vm.searchQuery).toBe("some text");
    });
  });

  describe("initial state", () => {
    test("starts with empty searchQuery", () => {
      const wrapper = mountDialog();
      expect((wrapper.vm as any).searchQuery).toBe("");
    });

    test("starts with empty abfragen list", () => {
      const wrapper = mountDialog();
      expect((wrapper.vm as any).abfragen).toHaveLength(0);
    });

    test("starts with pendingSelectedAbfrageId as undefined", () => {
      const wrapper = mountDialog();
      expect((wrapper.vm as any).pendingSelectedAbfrageId).toBeUndefined();
    });

    test("starts with loading as false", () => {
      const wrapper = mountDialog();
      expect((wrapper.vm as any).loading).toBe(false);
    });
  });
});