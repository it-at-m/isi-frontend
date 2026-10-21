import { beforeEach, describe, expect, test, vi } from "vitest";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import { useSearchStore } from "@/stores/SearchStore";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchInputField from "@/components/search/SearchInputField.vue";

const mockSearchEntities = vi.fn();
const mockApplyFilter = vi.fn();
const mockSearchForSearchwordSuggestion = vi.fn();
const mockLoadFilters = vi.fn();
const mockPush = vi.fn();
const mockSavedFilters = ref([{ id: "filter-1", name: "Abfragen", filterSettings: {} }]);

vi.mock("@/composables/requests/search/useEntitySearch", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/composables/requests/search/useEntitySearch")>()),
  useEntitySearch: () => ({ searchEntities: mockSearchEntities, applyFilter: mockApplyFilter }),
}));

vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({ searchForSearchwordSuggestion: mockSearchForSearchwordSuggestion }),
}));

vi.mock("@/composables/requests/filter/useFilterPersistence", () => ({
  useFilterPersistence: () => ({ savedFilters: mockSavedFilters, loadFilters: mockLoadFilters }),
}));

vi.mock("vue-router", () => ({
  useRoute: () => ({ path: "/abfrage/1" }),
  useRouter: () => ({ push: mockPush }),
}));

function setzeKeineEntitaetMarkiert(): void {
  const model = createSearchQueryAndSortingModel();
  model.selectBauleitplanverfahren = false;
  model.selectBaugenehmigungsverfahren = false;
  model.selectWeiteresVerfahren = false;
  model.selectBauvorhaben = false;
  model.selectGrundschule = false;
  model.selectGsNachmittagBetreuung = false;
  model.selectHausFuerKinder = false;
  model.selectKindergarten = false;
  model.selectKinderkrippe = false;
  model.selectMittelschule = false;
  model.selectNachbarschaftstreff = false;
  useSearchStore().setRequestSearchQueryAndSorting(model);
}

function mountComponent(): VueWrapper {
  return mount(SearchInputField, { shallow: true });
}

describe("SearchInputFieldTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockSearchEntities.mockReset();
    mockApplyFilter.mockReset();
    mockSearchForSearchwordSuggestion.mockReset();
    mockLoadFilters.mockReset();
    mockPush.mockReset();
    mockLoadFilters.mockResolvedValue(undefined);
    mockSearchForSearchwordSuggestion.mockResolvedValue({ suchwortSuggestions: [] });
  });

  describe("Suche", () => {
    test("löst beim Laden keine Suche aus", async () => {
      mountComponent();
      await flushPromises();
      expect(mockSearchEntities).not.toHaveBeenCalled();
    });

    test("hat einen Rahmen um die Suchzeile", () => {
      const wrapper = mountComponent();
      expect(wrapper.findComponent({ name: "VAutocomplete" }).props("variant")).toBe("outlined");
    });

    test("sucht nach Bestätigung der Suchzeile und wechselt zur Startseite", () => {
      const wrapper = mountComponent();
      (wrapper.vm as any).searchQuery = "Schule";
      (wrapper.vm as any).searchEntitiesForSelectedSuggestion();
      expect(mockSearchEntities).toHaveBeenCalledWith("Schule");
      expect(mockPush).toHaveBeenCalledWith("/");
    });

    test("ermittelt ohne markierte Entität keine Suchwortvorschläge", () => {
      setzeKeineEntitaetMarkiert();
      const wrapper = mountComponent();
      (wrapper.vm as any).suggest("Sch");
      expect(mockSearchForSearchwordSuggestion).not.toHaveBeenCalled();
    });

    test("ermittelt mit markierter Entität Suchwortvorschläge", () => {
      const wrapper = mountComponent();
      (wrapper.vm as any).suggest("Sch");
      expect(mockSearchForSearchwordSuggestion).toHaveBeenCalledTimes(1);
    });
  });

  describe("Filterauswahl", () => {
    test("ersetzt das Bookmark-Symbol durch eine Auswahl im Stil von Meine Vorgänge", () => {
      const wrapper = mountComponent();
      const auswahl = wrapper.findComponent({ name: "VSelect" });
      expect(auswahl.exists()).toBe(true);
      expect(auswahl.props("label")).toBe("Filter");
      expect(auswahl.props("variant")).toBe("outlined");
      expect(wrapper.findComponent({ name: "QuickFilterList" }).exists()).toBe(false);
    });

    test("bietet die Standardeinstellung und die gespeicherten Filter an", async () => {
      const wrapper = mountComponent();
      await flushPromises();
      expect(mockLoadFilters).toHaveBeenCalled();
      expect((wrapper.vm as any).filterOptionen).toEqual([
        { id: "__default__", name: "Standardeinstellung" },
        { id: "filter-1", name: "Abfragen" },
      ]);
    });

    test("lädt die gespeicherten Filter beim Öffnen der Auswahl neu", () => {
      const wrapper = mountComponent();
      mockLoadFilters.mockClear();
      (wrapper.vm as any).onFilterMenu(true);
      (wrapper.vm as any).onFilterMenu(false);
      expect(mockLoadFilters).toHaveBeenCalledTimes(1);
    });

    test("zeigt ohne aktiven Filter die Standardeinstellung an", () => {
      const wrapper = mountComponent();
      expect((wrapper.vm as any).filterAuswahl).toBe("__default__");
    });

    test("zeigt den aktiven persönlichen Filter an", () => {
      useSearchStore().setFilterActive(true);
      useSearchStore().setActiveFilterId("filter-1");
      const wrapper = mountComponent();
      expect((wrapper.vm as any).filterAuswahl).toBe("filter-1");
    });

    test("zeigt bei individuell angepassten Filtern keine Auswahl an", () => {
      useSearchStore().setFilterActive(true);
      const wrapper = mountComponent();
      expect((wrapper.vm as any).filterAuswahl).toBeNull();
    });

    test("übernimmt einen gespeicherten Filter und sucht", () => {
      const wrapper = mountComponent();
      (wrapper.vm as any).onFilterSelected("filter-1");
      expect(mockApplyFilter).toHaveBeenCalledWith(mockSavedFilters.value[0]);
      expect(mockSearchEntities).toHaveBeenCalledWith("");
    });

    test("übernimmt die Standardeinstellung und sucht", () => {
      const wrapper = mountComponent();
      (wrapper.vm as any).onFilterSelected("__default__");
      expect(mockApplyFilter).toHaveBeenCalledWith(null);
      expect(mockSearchEntities).toHaveBeenCalledTimes(1);
    });

    test("ignoriert einen nicht mehr vorhandenen Filter", () => {
      const wrapper = mountComponent();
      (wrapper.vm as any).onFilterSelected("geloescht");
      expect(mockApplyFilter).not.toHaveBeenCalled();
      expect(mockSearchEntities).not.toHaveBeenCalled();
    });
  });

  describe("Filtersymbol", () => {
    test("öffnet das Filtermenü", () => {
      const wrapper = mountComponent();
      (wrapper.vm as any).openSearchAndFilterDialog();
      expect((wrapper.vm as any).searchAndFilterDialogOpen).toBe(true);
    });

    test("ist bei aktivem Filter orange, z.B. nach dem Laden mit Standard-Filter", () => {
      useSearchStore().setFilterActive(true);
      useSearchStore().setActiveFilterId("filter-1");
      const wrapper = mountComponent();
      expect((wrapper.vm as any).isFilterActive).toBe(true);
    });

    test("ist ohne aktiven Filter nicht hervorgehoben", () => {
      const wrapper = mountComponent();
      expect((wrapper.vm as any).isFilterActive).toBe(false);
    });
  });
});
