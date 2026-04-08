import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import DataTransferDialog from "@/components/common/DataTransferDialog.vue";
import { AbfrageDtoArtAbfrageEnum, StatusAbfrage } from "@/api/api-client/isi-backend";
import { useSearchStore } from "@/stores/SearchStore";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import { createBauleitplanverfahrenDto } from "@/utils/Factories";

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

// Context is a const enum - use the string values directly
const CONTEXT_BAUVORHABEN = "BAUVORHABEN";
const CONTEXT_ABFRAGE = "ABFRAGE";

function mountDialog(context: string, extraProps?: Record<string, unknown>): VueWrapper {
  return mount(DataTransferDialog, {
    shallow: true,
    props: {
      modelValue: true,
      context,
      ...extraProps,
    },
  });
}

let wrapper: VueWrapper;

describe("DataTransferDialogTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockSearchForEntities.mockReset();
    mockGetById.mockReset();
    wrapper = mountDialog(CONTEXT_BAUVORHABEN);
  });

  describe("getArtAbfrage", () => {
    test("returns 'Bauleitplanverfahren' for Bauleitplanverfahren enum", () => {
      const vm = wrapper.vm as any;
      expect(vm.getArtAbfrage(AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren)).toBe("Bauleitplanverfahren");
    });

    test("returns 'Baugenehmigungsverfahren' for Baugenehmigungsverfahren enum", () => {
      const vm = wrapper.vm as any;
      expect(vm.getArtAbfrage(AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren)).toBe("Baugenehmigungsverfahren");
    });

    test("returns 'Weiteres Verfahren' for WeiteresVerfahren enum", () => {
      const vm = wrapper.vm as any;
      expect(vm.getArtAbfrage(AbfrageDtoArtAbfrageEnum.WeiteresVerfahren)).toBe("Weiteres Verfahren");
    });

    test("returns empty string for undefined", () => {
      const vm = wrapper.vm as any;
      expect(vm.getArtAbfrage(undefined)).toBe("");
    });

    test("returns empty string for unknown enum value", () => {
      const vm = wrapper.vm as any;
      expect(vm.getArtAbfrage("UNKNOWN_TYPE" as AbfrageDtoArtAbfrageEnum)).toBe("");
    });
  });

  describe("getStadtbezirke", () => {
    test("returns empty string when undefined", () => {
      const vm = wrapper.vm as any;
      expect(vm.getStadtbezirke(undefined)).toBe("");
    });

    test("returns empty string for empty set", () => {
      const vm = wrapper.vm as any;
      expect(vm.getStadtbezirke(new Set())).toBe("");
    });

    test("formats a single stadtbezirk as nummer/name", () => {
      const vm = wrapper.vm as any;
      const result = vm.getStadtbezirke(new Set([{ nummer: 1, name: "Altstadt" }]));
      expect(result).toBe("1/Altstadt");
    });

    test("sorts multiple stadtbezirke by nummer", () => {
      const vm = wrapper.vm as any;
      const result = vm.getStadtbezirke(
        new Set([
          { nummer: 9, name: "Neuhausen" },
          { nummer: 2, name: "Maxvorstadt" },
          { nummer: 5, name: "Au" },
        ]),
      );
      expect(result).toBe("2/Maxvorstadt, 5/Au, 9/Neuhausen");
    });
  });

  describe("getLookupValue", () => {
    test("returns matching value for a given key", () => {
      const vm = wrapper.vm as any;
      const list = [
        { key: "KEY1", value: "Value 1" },
        { key: "KEY2", value: "Value 2" },
      ];
      expect(vm.getLookupValue("KEY1", list)).toBe("Value 1");
    });

    test("returns undefined when key is not found in list", () => {
      const vm = wrapper.vm as any;
      const list = [{ key: "KEY1", value: "Value 1" }];
      expect(vm.getLookupValue("MISSING", list)).toBeUndefined();
    });

    test("returns key itself when list is undefined", () => {
      const vm = wrapper.vm as any;
      expect(vm.getLookupValue("mykey", undefined as any)).toBe("mykey");
    });

    test("returns undefined when key is undefined", () => {
      const vm = wrapper.vm as any;
      const list = [{ key: "KEY1", value: "Value 1" }];
      expect(vm.getLookupValue(undefined, list)).toBeUndefined();
    });

    test("returns undefined when key is null", () => {
      const vm = wrapper.vm as any;
      const list = [{ key: "KEY1", value: "Value 1" }];
      expect(vm.getLookupValue(null as any, list)).toBeUndefined();
    });
  });

  describe("getItemSubtitle", () => {
    test("formats subtitle with art and stadtbezirke", () => {
      const vm = wrapper.vm as any;
      const searchResult = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        stadtbezirke: new Set([{ nummer: 1, name: "Altstadt" }]),
      };
      const subtitle = vm.getItemSubtitle(searchResult);
      expect(subtitle).toContain("Bauleitplanverfahren");
      expect(subtitle).toContain("1/Altstadt");
    });

    test("shows 'Keine Stadtbezirke vorhanden' when stadtbezirke is undefined", () => {
      const vm = wrapper.vm as any;
      const searchResult = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.WeiteresVerfahren,
        stadtbezirke: undefined,
      };
      const subtitle = vm.getItemSubtitle(searchResult);
      expect(subtitle).toContain("Weiteres Verfahren");
      expect(subtitle).toContain("Keine Stadtbezirke vorhanden");
    });
  });

  describe("getItemText", () => {
    test("includes name in item text", () => {
      const vm = wrapper.vm as any;
      const searchResult = {
        name: "Projekt Süd",
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        stadtbezirke: undefined,
        statusAbfrage: undefined,
        standVerfahren: undefined,
      };
      const text = vm.getItemText(searchResult);
      expect(text).toContain("Projekt Süd");
    });

    test("shows 'Kein Name vorhanden' when name is undefined", () => {
      const vm = wrapper.vm as any;
      const searchResult = {
        name: undefined,
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        stadtbezirke: undefined,
        statusAbfrage: undefined,
        standVerfahren: undefined,
      };
      const text = vm.getItemText(searchResult);
      expect(text).toContain("Kein Name vorhanden");
    });

    test("includes Abfrageart in item text", () => {
      const vm = wrapper.vm as any;
      const searchResult = {
        name: "Test",
        artAbfrage: AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren,
        stadtbezirke: undefined,
        statusAbfrage: undefined,
        standVerfahren: undefined,
      };
      const text = vm.getItemText(searchResult);
      expect(text).toContain("Baugenehmigungsverfahren");
    });
  });

  describe("searchResultFilter - BAUVORHABEN context", () => {
    test("accepts entries without bauvorhaben (empty string)", () => {
      const vm = wrapper.vm as any;
      const result = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.StartBearbeitung,
        bauvorhaben: "",
      };
      expect(vm.searchResultFilter(result)).toBe(true);
    });

    test("accepts entries without bauvorhaben (undefined)", () => {
      const vm = wrapper.vm as any;
      const result = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.StartBearbeitung,
        bauvorhaben: undefined,
      };
      expect(vm.searchResultFilter(result)).toBe(true);
    });

    test("rejects entries that already have a bauvorhaben linked", () => {
      const vm = wrapper.vm as any;
      const result = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.StartBearbeitung,
        bauvorhaben: "bv-id-123",
      };
      expect(vm.searchResultFilter(result)).toBe(false);
    });
  });

  describe("searchResultFilter - ABFRAGE context", () => {
    beforeEach(() => {
      wrapper = mountDialog(CONTEXT_ABFRAGE);
    });

    test("returns false when selectedAbfrage is not set in store", () => {
      const vm = wrapper.vm as any;
      // searchStore.selectedAbfrage is undefined by default
      const result = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.StartBearbeitung,
      };
      expect(vm.searchResultFilter(result)).toBe(false);
    });

    test("accepts matching artAbfrage with valid status", () => {
      const searchStore = useSearchStore();
      const abfrageModel = new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
      searchStore.setSelectedAbfrage(abfrageModel);

      const vm = wrapper.vm as any;
      const result = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.StartBearbeitung,
      };
      expect(vm.searchResultFilter(result)).toBe(true);
    });

    test("rejects entries with status Angelegt", () => {
      const searchStore = useSearchStore();
      const abfrageModel = new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
      searchStore.setSelectedAbfrage(abfrageModel);

      const vm = wrapper.vm as any;
      const result = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.Angelegt,
      };
      expect(vm.searchResultFilter(result)).toBe(false);
    });

    test("rejects entries with status Abbruch", () => {
      const searchStore = useSearchStore();
      const abfrageModel = new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
      searchStore.setSelectedAbfrage(abfrageModel);

      const vm = wrapper.vm as any;
      const result = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: StatusAbfrage.Abbruch,
      };
      expect(vm.searchResultFilter(result)).toBe(false);
    });

    test("rejects entries with undefined statusAbfrage", () => {
      const searchStore = useSearchStore();
      const abfrageModel = new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
      searchStore.setSelectedAbfrage(abfrageModel);

      const vm = wrapper.vm as any;
      const result = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
        statusAbfrage: undefined,
      };
      expect(vm.searchResultFilter(result)).toBe(false);
    });

    test("rejects entries whose artAbfrage differs from selectedAbfrage", () => {
      const searchStore = useSearchStore();
      const abfrageModel = new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
      searchStore.setSelectedAbfrage(abfrageModel);

      const vm = wrapper.vm as any;
      const result = {
        artAbfrage: AbfrageDtoArtAbfrageEnum.WeiteresVerfahren,
        statusAbfrage: StatusAbfrage.StartBearbeitung,
      };
      expect(vm.searchResultFilter(result)).toBe(false);
    });
  });

  describe("dialogTitle computed - BAUVORHABEN context", () => {
    test("returns generic title in BAUVORHABEN context", () => {
      const vm = wrapper.vm as any;
      expect(vm.dialogTitle).toBe("Datenübernahme aus Abfrage");
    });
  });

  describe("dialogTitle computed - ABFRAGE context", () => {
    beforeEach(() => {
      wrapper = mountDialog(CONTEXT_ABFRAGE);
    });

    test("returns generic title when selectedAbfrage is undefined", () => {
      const vm = wrapper.vm as any;
      expect(vm.dialogTitle).toBe("Datenübernahme aus Abfrage");
    });

    test("returns specific title for Bauleitplanverfahren", () => {
      const searchStore = useSearchStore();
      const abfrageModel = new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
      searchStore.setSelectedAbfrage(abfrageModel);

      const vm = wrapper.vm as any;
      expect(vm.dialogTitle).toBe("Datenübernahme aus Bauleitplanverfahren");
    });
  });

  describe("selectResult", () => {
    test("sets pendingSelectedAbfrageId, pendingSelectedLabel, and searchQuery", () => {
      const vm = wrapper.vm as any;
      vm.selectResult({ value: "abfrage-1", label: "Abfrage A Label", title: "Abfrage A", subtitle: "" });
      expect(vm.pendingSelectedAbfrageId).toBe("abfrage-1");
      expect(vm.pendingSelectedLabel).toBe("Abfrage A Label");
      expect(vm.searchQuery).toBe("Abfrage A Label");
    });
  });

  describe("clearSearch", () => {
    test("resets all search state to initial values", () => {
      const vm = wrapper.vm as any;
      vm.selectResult({ value: "x", label: "X", title: "X", subtitle: "" });
      vm.loading = true;

      vm.clearSearch();

      expect(vm.searchQuery).toBe("");
      expect(vm.abfragen).toEqual([]);
      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
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

  describe("uebernahmeAbbrechen", () => {
    test("clears search state and emits uebernahmeAbbrechen event", () => {
      const vm = wrapper.vm as any;
      vm.selectResult({ value: "id-1", label: "Label", title: "Title", subtitle: "" });

      vm.uebernahmeAbbrechen();

      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
      expect(vm.searchQuery).toBe("");

      const emitted = wrapper.emitted("uebernahmeAbbrechen");
      expect(emitted).toBeTruthy();
    });
  });

  describe("handleEnter", () => {
    test("triggers abfrageUebernehmen when a result is already pending", async () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "abfrage-1";
      mockGetById.mockResolvedValueOnce(createBauleitplanverfahrenDto());

      vm.handleEnter();

      // abfrageUebernehmen is called (void), wait for microtask queue
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockGetById).toHaveBeenCalledWith("abfrage-1");
    });

    test("selects first result from list when nothing is pending", () => {
      const vm = wrapper.vm as any;
      vm.abfragen = [
        {
          id: "first-id",
          name: "First Abfrage",
          artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
          statusAbfrage: StatusAbfrage.StartBearbeitung,
          stadtbezirke: undefined,
          standVerfahren: undefined,
        },
      ];

      vm.handleEnter();

      expect(vm.pendingSelectedAbfrageId).toBe("first-id");
    });

    test("does nothing when no result is pending and list is empty", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = undefined;
      vm.abfragen = [];

      vm.handleEnter();

      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
    });
  });

  describe("handleSearchInput", () => {
    test("clears state when query is empty string", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-1";
      vm.pendingSelectedLabel = "Label";

      vm.handleSearchInput("");

      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
      expect(vm.abfragen).toEqual([]);
    });

    test("clears pending selection when new input differs from selected label", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-1";
      vm.pendingSelectedLabel = "Original Label";

      vm.handleSearchInput("New Query");

      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("preserves pending selection when query exactly matches the selected label", () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "id-1";
      vm.pendingSelectedLabel = "Same Label";

      vm.handleSearchInput("Same Label");

      expect(vm.pendingSelectedAbfrageId).toBe("id-1");
    });
  });

  describe("resultItems computed", () => {
    test("returns empty list when abfragen is empty", () => {
      const vm = wrapper.vm as any;
      vm.abfragen = [];
      expect(vm.resultItems).toEqual([]);
    });

    test("filters out entries without id", () => {
      const vm = wrapper.vm as any;
      vm.abfragen = [
        { id: "", name: "No ID", artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren },
        {
          id: "valid-id",
          name: "Has ID",
          artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
          stadtbezirke: undefined,
        },
      ];
      expect(vm.resultItems).toHaveLength(1);
      expect(vm.resultItems[0].value).toBe("valid-id");
    });

    test("maps entries to ResultItem shape with title, subtitle, label, value", () => {
      const vm = wrapper.vm as any;
      vm.abfragen = [
        {
          id: "abfrage-99",
          name: "Meine Abfrage",
          artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
          stadtbezirke: undefined,
          statusAbfrage: undefined,
          standVerfahren: undefined,
        },
      ];
      const items = vm.resultItems;
      expect(items).toHaveLength(1);
      expect(items[0].value).toBe("abfrage-99");
      expect(items[0].title).toBe("Meine Abfrage");
      expect(typeof items[0].subtitle).toBe("string");
      expect(typeof items[0].label).toBe("string");
    });
  });

  describe("hasListContent computed", () => {
    test("returns false when abfragen is empty", () => {
      const vm = wrapper.vm as any;
      vm.abfragen = [];
      expect(vm.hasListContent).toBe(false);
    });

    test("returns true when abfragen has valid entries", () => {
      const vm = wrapper.vm as any;
      vm.abfragen = [
        {
          id: "x",
          name: "Test",
          artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
          stadtbezirke: undefined,
        },
      ];
      expect(vm.hasListContent).toBe(true);
    });
  });

  describe("createQuery - BAUVORHABEN context", () => {
    test("enables all Abfrage types when context is BAUVORHABEN", () => {
      const vm = wrapper.vm as any;
      const query = vm.createQuery("test");
      expect(query).not.toBeNull();
      expect(query.selectBauleitplanverfahren).toBe(true);
      expect(query.selectBaugenehmigungsverfahren).toBe(true);
      expect(query.selectWeiteresVerfahren).toBe(true);
      expect(query.selectBauvorhaben).toBe(false);
    });
  });

  describe("createQuery - ABFRAGE context", () => {
    beforeEach(() => {
      wrapper = mountDialog(CONTEXT_ABFRAGE);
    });

    test("returns null when selectedAbfrage is not set", () => {
      const vm = wrapper.vm as any;
      expect(vm.createQuery("test")).toBeNull();
    });

    test("enables only Bauleitplanverfahren for Bauleitplanverfahren abfrage", () => {
      const searchStore = useSearchStore();
      const abfrageModel = new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
      searchStore.setSelectedAbfrage(abfrageModel);

      const vm = wrapper.vm as any;
      const query = vm.createQuery("test");
      expect(query).not.toBeNull();
      expect(query.selectBauleitplanverfahren).toBe(true);
      expect(query.selectBaugenehmigungsverfahren).toBe(false);
      expect(query.selectWeiteresVerfahren).toBe(false);
    });
  });

  describe("abfrageUebernehmen", () => {
    test("does nothing when no result is pending", async () => {
      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = undefined;

      await vm.abfrageUebernehmen();

      expect(mockGetById).not.toHaveBeenCalled();
    });

    test("loads abfrage by id and emits abfrageUebernehmen", async () => {
      const mockAbfrage = createBauleitplanverfahrenDto();
      mockGetById.mockResolvedValueOnce(mockAbfrage);

      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "abfrage-42";

      await vm.abfrageUebernehmen();

      expect(mockGetById).toHaveBeenCalledWith("abfrage-42");
      const emitted = wrapper.emitted("abfrageUebernehmen");
      expect(emitted).toBeTruthy();
      expect(emitted![0][0]).toEqual(mockAbfrage);
    });

    test("clears pending state after successful uebernehmen", async () => {
      mockGetById.mockResolvedValueOnce(createBauleitplanverfahrenDto());

      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "abfrage-7";
      vm.pendingSelectedLabel = "Test Label";

      await vm.abfrageUebernehmen();

      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
    });

    test("clears pendingSelectedAbfrageId on error but does not emit", async () => {
      mockGetById.mockRejectedValueOnce(new Error("Not found"));

      const vm = wrapper.vm as any;
      vm.pendingSelectedAbfrageId = "bad-id";
      vm.pendingSelectedLabel = "Some Label";

      await vm.abfrageUebernehmen();

      expect(vm.pendingSelectedAbfrageId).toBeUndefined();
      expect(vm.pendingSelectedLabel).toBe("");
      expect(wrapper.emitted("abfrageUebernehmen")).toBeFalsy();
    });
  });
});