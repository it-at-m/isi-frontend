import { beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import { useSearchStore } from "@/stores/SearchStore";
import { useStandardFilter } from "@/composables/requests/filter/useStandardFilter";

const mockGetStartseitenEinstellung = vi.fn();
const mockLoadFilters = vi.fn();
const mockSavedFilters = ref<Array<{ id: string; name: string; filterSettings: Record<string, unknown> }>>([]);

vi.mock("@/composables/requests/startseite/StartseitenEinstellungApi", () => ({
  useStartseitenEinstellungApi: () => ({ getStartseitenEinstellung: mockGetStartseitenEinstellung }),
}));

vi.mock("@/composables/requests/filter/useFilterPersistence", () => ({
  useFilterPersistence: () => ({ savedFilters: mockSavedFilters, loadFilters: mockLoadFilters }),
}));

const STANDARD_FILTER = {
  id: "filter-1",
  name: "Meine Kitas",
  filterSettings: {
    selectBauleitplanverfahren: false,
    selectKindergarten: true,
    stadtbezirkNummer: ["09"],
  },
};

describe("UseStandardFilter.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockGetStartseitenEinstellung.mockReset();
    mockLoadFilters.mockReset();
    mockLoadFilters.mockResolvedValue(undefined);
    mockSavedFilters.value = [STANDARD_FILTER];
  });

  test("übernimmt den Standard-Filter aus den Profileinstellungen ohne zu suchen", async () => {
    mockGetStartseitenEinstellung.mockResolvedValue({ standardFilterId: "filter-1" });

    await useStandardFilter().applyStandardFilter();

    const searchStore = useSearchStore();
    expect(searchStore.requestSearchQueryAndSorting.selectBauleitplanverfahren).toBe(false);
    expect(searchStore.requestSearchQueryAndSorting.selectKindergarten).toBe(true);
    expect(searchStore.requestSearchQueryAndSorting.filterStadtbezirkNummer).toEqual(["09"]);
    // Nicht im Filter enthaltene Werte entsprechen der Standardeinstellung.
    expect(searchStore.requestSearchQueryAndSorting.searchQuery).toBe("");
    expect(searchStore.isFilterActive).toBe(true);
    expect(searchStore.activeFilterId).toBe("filter-1");
    expect(searchStore.searchResults.searchResults).toBeUndefined();
  });

  test("behält die Standardeinstellung ohne gewählten Standard-Filter", async () => {
    mockGetStartseitenEinstellung.mockResolvedValue({ standardFilterId: undefined });

    await useStandardFilter().applyStandardFilter();

    const searchStore = useSearchStore();
    expect(mockLoadFilters).not.toHaveBeenCalled();
    expect(searchStore.isFilterActive).toBe(false);
    expect(searchStore.activeFilterId).toBeNull();
  });

  test("behält die Standardeinstellung, wenn der Standard-Filter nicht mehr existiert", async () => {
    mockGetStartseitenEinstellung.mockResolvedValue({ standardFilterId: "geloescht" });

    await useStandardFilter().applyStandardFilter();

    const searchStore = useSearchStore();
    expect(searchStore.isFilterActive).toBe(false);
    expect(searchStore.activeFilterId).toBeNull();
    expect(searchStore.requestSearchQueryAndSorting.selectBauleitplanverfahren).toBe(true);
  });

  test("behält die Standardeinstellung, wenn die Profileinstellungen nicht geladen werden können", async () => {
    mockGetStartseitenEinstellung.mockRejectedValue(new Error("nicht erreichbar"));

    await expect(useStandardFilter().applyStandardFilter()).resolves.toBeUndefined();

    expect(useSearchStore().isFilterActive).toBe(false);
  });
});
