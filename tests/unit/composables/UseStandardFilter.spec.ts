import { beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { ref } from "vue";
import { useStandardFilter } from "@/composables/requests/filter/useStandardFilter";

const mockGetStartseitenEinstellung = vi.fn();
const mockLoadFilters = vi.fn();
const mockSearchEntities = vi.fn();
const mockApplyFilter = vi.fn();
const mockSavedFilters = ref<Array<{ id: string; name: string; filterSettings: Record<string, unknown> }>>([]);

vi.mock("@/composables/requests/startseite/StartseitenEinstellungApi", () => ({
  useStartseitenEinstellungApi: () => ({ getStartseitenEinstellung: mockGetStartseitenEinstellung }),
}));

vi.mock("@/composables/requests/filter/useFilterPersistence", () => ({
  useFilterPersistence: () => ({ savedFilters: mockSavedFilters, loadFilters: mockLoadFilters }),
}));

vi.mock("@/composables/requests/search/useEntitySearch", () => ({
  useEntitySearch: () => ({ searchEntities: mockSearchEntities, applyFilter: mockApplyFilter }),
}));

const STANDARD_FILTER = { id: "filter-1", name: "Abfragen", filterSettings: { selectBauvorhaben: false } };

describe("UseStandardFilter.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockGetStartseitenEinstellung.mockReset();
    mockLoadFilters.mockReset();
    mockSearchEntities.mockReset();
    mockApplyFilter.mockReset();
    mockLoadFilters.mockResolvedValue(undefined);
    mockSearchEntities.mockResolvedValue(undefined);
    mockSavedFilters.value = [STANDARD_FILTER];
  });

  describe("applyStandardFilter", () => {
    test("übernimmt beim Laden den Standard-Filter und sucht mit ihm", async () => {
      mockGetStartseitenEinstellung.mockResolvedValue({ standardFilterId: "filter-1" });

      await useStandardFilter().applyStandardFilter();

      expect(mockApplyFilter).toHaveBeenCalledWith(STANDARD_FILTER);
      expect(mockSearchEntities).toHaveBeenCalledWith("");
    });

    test("sucht bei der Standardeinstellung nicht", async () => {
      mockGetStartseitenEinstellung.mockResolvedValue({ standardFilterId: undefined });

      await useStandardFilter().applyStandardFilter();

      expect(mockApplyFilter).not.toHaveBeenCalled();
      expect(mockSearchEntities).not.toHaveBeenCalled();
    });

    test("sucht nicht, wenn der Standard-Filter nicht mehr existiert", async () => {
      mockGetStartseitenEinstellung.mockResolvedValue({ standardFilterId: "geloescht" });

      await useStandardFilter().applyStandardFilter();

      expect(mockApplyFilter).not.toHaveBeenCalled();
      expect(mockSearchEntities).not.toHaveBeenCalled();
    });

    test("sucht nicht, wenn die Profileinstellungen nicht geladen werden können", async () => {
      mockGetStartseitenEinstellung.mockRejectedValue(new Error("nicht erreichbar"));

      await expect(useStandardFilter().applyStandardFilter()).resolves.toBeUndefined();

      expect(mockSearchEntities).not.toHaveBeenCalled();
    });
  });

  describe("uebernehmeStandardFilter", () => {
    test("übernimmt einen persönlichen Filter und sucht mit ihm", async () => {
      await useStandardFilter().uebernehmeStandardFilter("filter-1");

      expect(mockLoadFilters).toHaveBeenCalled();
      expect(mockApplyFilter).toHaveBeenCalledWith(STANDARD_FILTER);
      expect(mockSearchEntities).toHaveBeenCalledWith("");
    });

    test("setzt bei der Standardeinstellung die Filter ohne Suche zurück", async () => {
      await useStandardFilter().uebernehmeStandardFilter(null);

      expect(mockApplyFilter).toHaveBeenCalledWith(null);
      expect(mockSearchEntities).not.toHaveBeenCalled();
    });

    test("sucht nicht, wenn die persönlichen Filter nicht geladen werden können", async () => {
      mockLoadFilters.mockRejectedValue(new Error("nicht erreichbar"));

      await useStandardFilter().uebernehmeStandardFilter("filter-1");

      expect(mockApplyFilter).not.toHaveBeenCalled();
      expect(mockSearchEntities).not.toHaveBeenCalled();
    });
  });
});
