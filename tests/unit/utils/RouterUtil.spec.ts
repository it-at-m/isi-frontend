import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSearchStore } from "@/stores/SearchStore";
import { setSearchResultList } from "@/utils/RouterUtil";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";

const mockSearchForEntities = vi.fn();

vi.mock("@/composables/requests/search/SearchApi", () => ({
  useSearchApi: () => ({ searchForEntities: mockSearchForEntities }),
}));

describe("RouterUtil.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
    mockSearchForEntities.mockReset();
    mockSearchForEntities.mockResolvedValue({ searchResults: [], page: 1, numberOfPages: 0 });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("löst beim Laden der Anwendung keine initiale Suche aus", async () => {
    await setSearchResultList();
    vi.runAllTimers();
    expect(mockSearchForEntities).not.toHaveBeenCalled();
    expect(useSearchStore().searchResults.searchResults).toBeUndefined();
  });

  test("aktualisiert die Ergebnisse einer bereits ausgeführten Suche", async () => {
    const searchStore = useSearchStore();
    searchStore.setSearchResults({ searchResults: [], page: 1, numberOfPages: 0 });
    await setSearchResultList();
    vi.runAllTimers();
    expect(mockSearchForEntities).toHaveBeenCalledTimes(1);
  });

  test("sucht ohne markierte Entität nicht erneut", async () => {
    const searchStore = useSearchStore();
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
    searchStore.setRequestSearchQueryAndSorting(model);
    searchStore.setSearchResults({ searchResults: [], page: 1, numberOfPages: 0 });
    await setSearchResultList();
    vi.runAllTimers();
    expect(mockSearchForEntities).not.toHaveBeenCalled();
  });
});
