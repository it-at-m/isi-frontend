import { beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { SearchResultDtoTypeEnum, type FilterSettingsDto } from "@/api/api-client/isi-backend";
import { useSearchStore } from "@/stores/SearchStore";
import {
  HINWEIS_KEINE_ENTITAET_MARKIERT,
  HINWEIS_KEINE_SUCHTREFFER,
  useEntitySearch,
} from "@/composables/requests/search/useEntitySearch";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";

const mockSearchForEntities = vi.fn();
const mockToastInfo = vi.fn();
const mockToastWarning = vi.fn();

vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({ searchForEntities: mockSearchForEntities }),
}));

vi.mock("vue-toastification", () => ({
  useToast: () => ({ info: mockToastInfo, warning: mockToastWarning }),
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

describe("UseEntitySearch.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockSearchForEntities.mockReset();
    mockToastInfo.mockReset();
    mockToastWarning.mockReset();
  });

  describe("searchEntities", () => {
    test("sucht ab der ersten Seite mit dem Suchbegriff und legt die Treffer im Store ab", async () => {
      const treffer = {
        searchResults: [{ id: "1", type: SearchResultDtoTypeEnum.Abfrage }],
        page: 1,
        numberOfPages: 1,
      };
      mockSearchForEntities.mockResolvedValue(treffer);

      await useEntitySearch().searchEntities("Schule");

      const anfrage = mockSearchForEntities.mock.calls[0][0];
      expect(anfrage.searchQuery).toBe("Schule");
      expect(anfrage.page).toBe(1);
      expect(anfrage.pageSize).toBe(20);
      expect(useSearchStore().searchResults).toEqual(treffer);
      expect(mockToastInfo).not.toHaveBeenCalled();
    });

    test("meldet per Toast, wenn keine Suchtreffer gefunden wurden", async () => {
      mockSearchForEntities.mockResolvedValue({ searchResults: [], page: 1, numberOfPages: 0 });

      await useEntitySearch().searchEntities("");

      expect(mockToastInfo).toHaveBeenCalledWith(HINWEIS_KEINE_SUCHTREFFER);
      expect(HINWEIS_KEINE_SUCHTREFFER).toBe("Es wurden keine Suchtreffer gefunden");
    });

    test("sucht ohne markierte Entität nicht im Backend und gibt eine Handlungsanweisung", async () => {
      setzeKeineEntitaetMarkiert();

      await useEntitySearch().searchEntities("");

      expect(mockSearchForEntities).not.toHaveBeenCalled();
      expect(mockToastWarning).toHaveBeenCalledWith(HINWEIS_KEINE_ENTITAET_MARKIERT);
      expect(mockToastInfo).not.toHaveBeenCalled();
      expect(useSearchStore().searchResults.searchResults).toEqual([]);
    });

    test("behält die bisherigen Treffer, wenn die Suche fehlschlägt", async () => {
      mockSearchForEntities.mockRejectedValue(new Error("nicht erreichbar"));

      await expect(useEntitySearch().searchEntities("")).resolves.toBeUndefined();

      expect(useSearchStore().searchResults.searchResults).toBeUndefined();
      expect(mockToastInfo).not.toHaveBeenCalled();
    });
  });

  describe("applyFilter", () => {
    test("übernimmt einen persönlichen Filter ohne zu suchen", () => {
      useEntitySearch().applyFilter({
        id: "filter-1",
        name: "Meine Kitas",
        filterSettings: {
          selectBauleitplanverfahren: false,
          selectKindergarten: true,
          stadtbezirkNummer: ["09"],
        } as unknown as FilterSettingsDto,
      });

      const searchStore = useSearchStore();
      expect(searchStore.requestSearchQueryAndSorting.selectBauleitplanverfahren).toBe(false);
      expect(searchStore.requestSearchQueryAndSorting.selectKindergarten).toBe(true);
      expect(searchStore.requestSearchQueryAndSorting.filterStadtbezirkNummer).toEqual(["09"]);
      // Nicht im Filter enthaltene Werte entsprechen der Standardeinstellung.
      expect(searchStore.requestSearchQueryAndSorting.selectMittelschule).toBe(true);
      expect(searchStore.isFilterActive).toBe(true);
      expect(searchStore.activeFilterId).toBe("filter-1");
      expect(mockSearchForEntities).not.toHaveBeenCalled();
    });

    test("übernimmt ohne Filter die Standardeinstellung", () => {
      const { applyFilter } = useEntitySearch();
      setzeKeineEntitaetMarkiert();
      useSearchStore().setFilterActive(true);
      useSearchStore().setActiveFilterId("filter-1");

      applyFilter(null);

      const searchStore = useSearchStore();
      expect(searchStore.requestSearchQueryAndSorting).toEqual(createSearchQueryAndSortingModel());
      expect(searchStore.isFilterActive).toBe(false);
      expect(searchStore.activeFilterId).toBeNull();
    });
  });
});
