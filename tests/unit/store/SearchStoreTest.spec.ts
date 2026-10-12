import { describe, expect, beforeEach, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import {
  HINWEIS_KEINE_ENTITAET_MARKIERT,
  HINWEIS_KEINE_SUCHTREFFER,
  HINWEIS_SUCHE_STARTEN,
  useSearchStore,
} from "@/stores/SearchStore";
import { SearchResultDtoTypeEnum, type SearchResultsDto } from "@/api/api-client/isi-backend";
import {
  createBauleitplanverfahrenDto,
  createBauvorhabenDto,
  createInfrastruktureinrichtungDto,
  createSearchQueryAndSortingModel,
} from "@/utils/Factories";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";

describe("Search Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("setSearchResults updates search results correctly", () => {
    const searchStore = useSearchStore();
    const newResults = { searchResults: [], page: 5, numberOfPages: 20 } as SearchResultsDto;
    searchStore.setSearchResults(newResults);
    expect(searchStore.searchResults).toEqual(newResults);
  });

  test("removeSearchResultById removes the correct search result by id", () => {
    const searchStore = useSearchStore();
    const initialResults = {
      searchResults: [
        { name: "Test", id: "1234", type: SearchResultDtoTypeEnum.Abfrage },
        { name: "Test2", id: "5678", type: SearchResultDtoTypeEnum.Infrastruktureinrichtung },
      ],
      numberOfPages: 5,
      page: 20,
    } as SearchResultsDto;
    searchStore.setSearchResults(initialResults);
    searchStore.removeSearchResultById("1234");
    expect(searchStore.searchResults.searchResults).toHaveLength(1);
    expect(searchStore.searchResults.searchResults![0].id).toBe("5678");
    expect(searchStore.searchResults.searchResults![0].type).toBe(SearchResultDtoTypeEnum.Infrastruktureinrichtung);
  });

  test("setRequestSearchQueryAndSorting updates the request search query and sorting correctly", () => {
    const searchStore = useSearchStore();
    const newQuery = createSearchQueryAndSortingModel();
    searchStore.setRequestSearchQueryAndSorting(newQuery);
    expect(searchStore.requestSearchQueryAndSorting).toEqual(newQuery);
  });

  test("setSelectedAbfrage updates the selected Abfrage correctly", () => {
    const searchStore = useSearchStore();
    const newAbfrage = new BauleitplanverfahrenModel(createBauleitplanverfahrenDto());
    searchStore.setSelectedAbfrage(newAbfrage);
    expect(searchStore.selectedAbfrage).toEqual(newAbfrage);
  });

  test("setSelectedBauvorhaben updates the selected Bauvorhaben correctly", () => {
    const searchStore = useSearchStore();
    const newBauvorhaben = createBauvorhabenDto();
    searchStore.setSelectedBauvorhaben(newBauvorhaben);
    expect(searchStore.selectedBauvorhaben).toEqual(newBauvorhaben);
  });

  test("setSelectedInfrastruktureinrichtung updates the selected Infrastruktureinrichtung correctly", () => {
    const searchStore = useSearchStore();
    const newInfra = createInfrastruktureinrichtungDto();
    searchStore.setSelectedInfrastruktureinrichtung(newInfra);
    expect(searchStore.selectedInfrastruktureinrichtung).toEqual(newInfra);
  });

  test("setActiveFilterId setzt und entfernt den aktiven persönlichen Filter", () => {
    const searchStore = useSearchStore();
    expect(searchStore.activeFilterId).toBeNull();
    searchStore.setActiveFilterId("filter-1");
    expect(searchStore.activeFilterId).toBe("filter-1");
    searchStore.setActiveFilterId(null);
    expect(searchStore.activeFilterId).toBeNull();
  });

  describe("suchhinweis", () => {
    function createModelOhneEntitaet() {
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
      return model;
    }

    test("fordert vor der ersten Suche zum Starten der Suche auf", () => {
      const searchStore = useSearchStore();
      expect(searchStore.suchhinweis).toBe(HINWEIS_SUCHE_STARTEN);
    });

    test("weist auf fehlende Suchtreffer hin", () => {
      const searchStore = useSearchStore();
      searchStore.setSearchResults({ searchResults: [], page: 1, numberOfPages: 0 });
      expect(searchStore.suchhinweis).toBe(HINWEIS_KEINE_SUCHTREFFER);
    });

    test("weist auf eine fehlende Objekttyp-Auswahl hin", () => {
      const searchStore = useSearchStore();
      searchStore.setRequestSearchQueryAndSorting(createModelOhneEntitaet());
      searchStore.setSearchResults({ searchResults: [], page: 1, numberOfPages: 0 });
      expect(searchStore.suchhinweis).toBe(HINWEIS_KEINE_ENTITAET_MARKIERT);
    });

    test("entfällt, sobald Suchtreffer vorhanden sind", () => {
      const searchStore = useSearchStore();
      searchStore.setSearchResults({
        searchResults: [{ id: "1", type: SearchResultDtoTypeEnum.Abfrage }],
        page: 1,
        numberOfPages: 1,
      } as SearchResultsDto);
      expect(searchStore.suchhinweis).toBeUndefined();
    });
  });
});
