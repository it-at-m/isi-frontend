import {
  AbfrageSearchResultDto,
  BauvorhabenDto,
  BauvorhabenSearchResultDto,
  InfrastruktureinrichtungSearchResultDto,
  SearchResultDto,
  SearchResultsDto,
  SearchResultDtoTypeEnum,
} from "@/api/api-client/isi-backend";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import _ from "lodash";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";

const state = {
  searchResults: {
    searchResults: [],
    page: 0,
    numberOfPages: 0,
  } as SearchResultsDto,
  requestSearchQueryAndSorting: createSearchQueryAndSortingModel(),
  selectedAbfrage: undefined as
    | BauleitplanverfahrenModel
    | BaugenehmigungsverfahrenModel
    | WeiteresVerfahrenModel
    | undefined,
  defaultSearchQueryAndSortingFilter: createSearchQueryAndSortingModel(),
  selectedBauvorhaben: undefined as BauvorhabenModel | undefined,
  selectedInfrastruktureinrichtung: undefined as InfrastruktureinrichtungDto | undefined,
};

export type SearchState = typeof state;

export default {
  namespaced: true,

  state,

  getters: {
    searchResults: (): SearchResultsDto => {
      return state.searchResults;
    },
    requestSearchQueryAndSorting: (): SearchQueryAndSortingModel => {
      return state.requestSearchQueryAndSorting;
    },
    selectedAbfrage: (
      state: SearchState,
    ): BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel | undefined => {
      return state.selectedAbfrage;
    },
    defaultSearchQueryAndSortingFilter: (): SearchQueryAndSortingModel => {
      return state.defaultSearchQueryAndSortingFilter;
    },
    selectedBauvorhaben: (state: SearchState): BauvorhabenDto | undefined => {
      return state.selectedBauvorhaben;
    },
    selectedInfrastruktureinrichtung: (state: SearchState): InfrastruktureinrichtungDto | undefined => {
      return state.selectedInfrastruktureinrichtung;
    },
  },

  mutations: {
    searchResults(state: SearchState, searchResults: SearchResultsDto): void {
      state.searchResults = searchResults;
    },
    removeSearchResultById(state: SearchState, id: string): void {
      const searchResults = _.cloneDeep(state.searchResults);
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
      state.searchResults = searchResults;
    },
    requestSearchQueryAndSorting(state: SearchState, searchQueryAndSortingDto: SearchQueryAndSortingModel): void {
      state.requestSearchQueryAndSorting = searchQueryAndSortingDto;
    },
    selectedAbfrage(
      state: SearchState,
      selectedAbfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
    ): void {
      state.selectedAbfrage = selectedAbfrage;
    },
    selectedBauvorhaben: (state: SearchState, item: BauvorhabenDto): void => {
      state.selectedBauvorhaben = item;
    },
    selectedInfrastruktureinrichtung(
      state: SearchState,
      selectedInfrastruktureinrichtung: InfrastruktureinrichtungDto,
    ): void {
      state.selectedInfrastruktureinrichtung = selectedInfrastruktureinrichtung;
    },
  },

  actions: {
    searchResults(context: ActionContext<SearchState, RootState>, searchResults: SearchResultsDto): void {
      context.commit("searchResults", searchResults);
    },
    removeSearchResultById(context: ActionContext<SearchState, RootState>, id: string): void {
      context.commit("removeSearchResultById", id);
    },
    requestSearchQueryAndSorting(
      context: ActionContext<SearchState, RootState>,
      searchQueryAndSortingDto: SearchQueryAndSortingModel,
    ): void {
      context.commit("requestSearchQueryAndSorting", searchQueryAndSortingDto);
    },
    selectedAbfrage(
      context: ActionContext<SearchState, RootState>,
      abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
    ): void {
      context.commit("selectedAbfrage", abfrage);
    },
    selectedBauvorhaben(context: ActionContext<SearchState, RootState>, item: BauvorhabenDto): void {
      context.commit("selectedBauvorhaben", item);
    },
    selectedInfrastruktureinrichtung(
      context: ActionContext<SearchState, RootState>,
      infrastruktureinrichtung: InfrastruktureinrichtungDto,
    ): void {
      context.commit("selectedInfrastruktureinrichtung", infrastruktureinrichtung);
    },
  },
};
