import { beforeEach, describe, expect, test, vi } from "vitest";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { HINWEIS_KEINE_ENTITAET_MARKIERT, useSearchStore } from "@/stores/SearchStore";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchInputField from "@/components/search/SearchInputField.vue";

const mockSearchForEntities = vi.fn();
const mockSearchForSearchwordSuggestion = vi.fn();
const mockToastWarning = vi.fn();

vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({
    searchForEntities: mockSearchForEntities,
    searchForSearchwordSuggestion: mockSearchForSearchwordSuggestion,
  }),
}));

vi.mock("vue-router", () => ({
  useRoute: () => ({ path: "/" }),
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("vue-toastification", () => ({
  useToast: () => ({ warning: mockToastWarning, error: vi.fn(), success: vi.fn() }),
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
  useSearchStore().setRequestSearchQueryAndSorting(model);
}

describe("SearchInputFieldTest.spec.ts", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    mockSearchForEntities.mockReset();
    mockSearchForSearchwordSuggestion.mockReset();
    mockToastWarning.mockReset();
    mockSearchForEntities.mockResolvedValue({ searchResults: [], page: 1, numberOfPages: 0 });
    mockSearchForSearchwordSuggestion.mockResolvedValue({ suchwortSuggestions: [] });
  });

  test("löst beim Laden keine Suche aus", async () => {
    wrapper = mount(SearchInputField, { shallow: true });
    await flushPromises();
    expect(mockSearchForEntities).not.toHaveBeenCalled();
    expect(useSearchStore().searchResults.searchResults).toBeUndefined();
  });

  test("hat einen Rahmen um die Suchzeile", () => {
    wrapper = mount(SearchInputField, { shallow: true });
    expect(wrapper.findComponent({ name: "VAutocomplete" }).props("variant")).toBe("outlined");
  });

  test("sucht nach Bestätigung der Suchzeile", async () => {
    wrapper = mount(SearchInputField, { shallow: true });
    (wrapper.vm as any).searchQuery = "Schule";
    (wrapper.vm as any).searchEntitiesForSelectedSuggestion();
    await flushPromises();
    expect(mockSearchForEntities).toHaveBeenCalledTimes(1);
    expect(mockSearchForEntities.mock.calls[0][0].searchQuery).toBe("Schule");
    expect(useSearchStore().searchResults.searchResults).toEqual([]);
  });

  test("sucht ohne markierte Entität nicht im Backend und gibt eine Handlungsanweisung", async () => {
    setzeKeineEntitaetMarkiert();
    wrapper = mount(SearchInputField, { shallow: true });
    (wrapper.vm as any).searchEntitiesForSelectedSuggestion();
    await flushPromises();
    expect(mockSearchForEntities).not.toHaveBeenCalled();
    expect(mockToastWarning).toHaveBeenCalledWith(HINWEIS_KEINE_ENTITAET_MARKIERT);
    expect(useSearchStore().searchResults.searchResults).toEqual([]);
    expect(useSearchStore().suchhinweis).toBe(HINWEIS_KEINE_ENTITAET_MARKIERT);
  });

  test("ermittelt ohne markierte Entität keine Suchwortvorschläge", async () => {
    setzeKeineEntitaetMarkiert();
    wrapper = mount(SearchInputField, { shallow: true });
    (wrapper.vm as any).suggest("Sch");
    await flushPromises();
    expect(mockSearchForSearchwordSuggestion).not.toHaveBeenCalled();
  });

  test("ermittelt mit markierter Entität Suchwortvorschläge", async () => {
    wrapper = mount(SearchInputField, { shallow: true });
    (wrapper.vm as any).suggest("Sch");
    await flushPromises();
    expect(mockSearchForSearchwordSuggestion).toHaveBeenCalledTimes(1);
  });

  test("zeigt einen beim Laden übernommenen Standard-Filter als aktiven Schnellfilter", () => {
    useSearchStore().setActiveFilterId("filter-1");
    wrapper = mount(SearchInputField, { shallow: true });
    expect((wrapper.vm as any).activeQuickFilterId).toBe("filter-1");
    expect((wrapper.vm as any).lastFilterSource).toBe("quick");
  });
});
