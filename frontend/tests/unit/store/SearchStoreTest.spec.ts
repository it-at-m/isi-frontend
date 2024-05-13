import { describe, expect, beforeEach, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSearchStore } from "@/stores/SearchStore";
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
});
