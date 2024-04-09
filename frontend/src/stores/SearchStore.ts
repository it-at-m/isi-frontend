import { defineStore } from "pinia";
import {
  AbfrageSearchResultDto,
  BauvorhabenDto,
  BauvorhabenSearchResultDto,
  InfrastruktureinrichtungDto,
  InfrastruktureinrichtungSearchResultDto,
  SearchResultDto,
  SearchResultDtoTypeEnum,
  SearchResultsDto,
} from "@/api/api-client/isi-backend";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import _ from "lodash";

interface State {
  searchResults: SearchResultsDto;
  requestSearchQueryAndSorting: SearchQueryAndSortingModel;
  selectedAbfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel | undefined;
  defaultSearchQueryAndSortingFilter: SearchQueryAndSortingModel;
  selectedBauvorhaben: BauvorhabenModel | undefined;
  selectedInfrastruktureinrichtung: InfrastruktureinrichtungDto | undefined;
}

export const useSearchStore = defineStore("search", {
  state: () =>
    ({
      searchResults: {},
      requestSearchQueryAndSorting: createSearchQueryAndSortingModel(),
      selectedAbfrage: undefined,
      defaultSearchQueryAndSortingFilter: createSearchQueryAndSortingModel(),
      selectedBauvorhaben: undefined,
      selectedInfrastruktureinrichtung: undefined,
    }) as State,
  getters: {},
  actions: {
    setSearchResults(payload: SearchResultsDto): void {
      this.searchResults = payload;
    },
    removeSearchResultById(id: string): void {
      const searchResults = _.cloneDeep(this.searchResults);
      searchResults.searchResults = _.toArray(searchResults.searchResults).filter((searchResult: SearchResultDto) => {
        return !(
          (_.isEqual(searchResult.type, SearchResultDtoTypeEnum.Abfrage) &&
            _.isEqual(id, (searchResult as AbfrageSearchResultDto).id)) ||
          (_.isEqual(searchResult.type, SearchResultDtoTypeEnum.Bauvorhaben) &&
            _.isEqual(id, (searchResult as BauvorhabenSearchResultDto).id)) ||
          (_.isEqual(searchResult.type, SearchResultDtoTypeEnum.Infrastruktureinrichtung) &&
            _.isEqual(id, (searchResult as InfrastruktureinrichtungSearchResultDto).id))
        );
      });
      this.setSearchResults(searchResults);
    },
    setRequestSearchQueryAndSorting(payload: SearchQueryAndSortingModel): void {
      this.requestSearchQueryAndSorting = payload;
    },
    setSelectedAbfrage(
      payload: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel | undefined,
    ): void {
      this.selectedAbfrage = payload;
    },
    setSelectedBauvorhaben(payload: BauvorhabenDto): void {
      this.selectedBauvorhaben = payload;
    },
    setSelectedInfrastruktureinrichtung(payload: InfrastruktureinrichtungDto): void {
      this.selectedInfrastruktureinrichtung = payload;
    },
  },
});
