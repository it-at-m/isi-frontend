import {
  AbfrageSearchResultDto,
  BauvorhabenDto,
  BauvorhabenSearchResultDto,
  InfrastruktureinrichtungDto,
  SearchResultDto,
  SearchResultDtoTypeEnum,
} from "@/api/api-client/isi-backend";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import _ from "lodash";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";

const state = {
  searchResults: [] as Array<SearchResultDto>,
  requestSearchQueryAndSorting: createSearchQueryAndSortingModel(),
  selectedAbfrage: undefined as InfrastrukturabfrageModel | undefined,
  selectedBauvorhaben: undefined as BauvorhabenModel | undefined,
  selectedInfrastruktureinrichtung: undefined as InfrastruktureinrichtungDto | undefined,
};

export type SearchState = typeof state;

export default {
  namespaced: true,

  state,

  getters: {
    searchResults: (): Array<SearchResultDto> => {
      return state.searchResults;
    },
    requestSearchQueryAndSorting: (): SearchQueryAndSortingModel => {
      return state.requestSearchQueryAndSorting;
    },
    selectedAbfrage: (state: SearchState): InfrastrukturabfrageModel | undefined => {
      return state.selectedAbfrage;
    },
    selectedBauvorhaben: (state: SearchState): BauvorhabenDto | undefined => {
      return state.selectedBauvorhaben;
    },
    selectedInfrastruktureinrichtung: (state: SearchState): InfrastruktureinrichtungDto | undefined => {
      return state.selectedInfrastruktureinrichtung;
    },
  },

  mutations: {
    searchResults(state: SearchState, items: SearchResultDto[]): void {
      state.searchResults = _.toArray(items);
    },
    removeSearchResultById(state: SearchState, id: string): void {
      _.remove(state.searchResults, function (searchResult: SearchResultDto) {
        return (
          (_.isEqual(searchResult.type, SearchResultDtoTypeEnum.Infrastrukturabfrage) &&
            _.isEqual(id, (searchResult as AbfrageSearchResultDto).id)) ||
          (_.isEqual(searchResult.type, SearchResultDtoTypeEnum.Bauvorhaben) &&
            _.isEqual(id, (searchResult as BauvorhabenSearchResultDto).id)) ||
          (_.isEqual(searchResult.type, SearchResultDtoTypeEnum.Infrastruktureinrichtung) &&
            _.isEqual(id, (searchResult as BauvorhabenSearchResultDto).id))
        );
      });
    },
    requestSearchQueryAndSorting(state: SearchState, searchQueryAndSortingDto: SearchQueryAndSortingModel): void {
      state.requestSearchQueryAndSorting = searchQueryAndSortingDto;
    },
    selectedAbfrage(state: SearchState, selectedAbfrage: InfrastrukturabfrageModel): void {
      state.selectedAbfrage = selectedAbfrage;
    },
    selectedBauvorhaben: (state: SearchState, item: BauvorhabenDto): void => {
      state.selectedBauvorhaben = item;
    },
    selectedInfrastruktureinrichtung(
      state: SearchState,
      selectedInfrastruktureinrichtung: InfrastruktureinrichtungDto
    ): void {
      state.selectedInfrastruktureinrichtung = selectedInfrastruktureinrichtung;
    },
  },

  actions: {
    searchResults(context: ActionContext<SearchState, RootState>, items: SearchResultDto[]): void {
      context.commit("searchResults", _.toArray(items));
    },
    removeSearchResultById(context: ActionContext<SearchState, RootState>, id: string): void {
      context.commit("removeSearchResultById", id);
    },
    requestSearchQueryAndSorting(
      context: ActionContext<SearchState, RootState>,
      searchQueryAndSortingDto: SearchQueryAndSortingModel
    ): void {
      context.commit("requestSearchQueryAndSorting", searchQueryAndSortingDto);
    },
    selectedAbfrage(context: ActionContext<SearchState, RootState>, abfrage: InfrastrukturabfrageModel): void {
      context.commit("selectedAbfrage", abfrage);
    },
    selectedBauvorhaben(context: ActionContext<SearchState, RootState>, item: BauvorhabenDto): void {
      context.commit("selectedBauvorhaben", item);
    },
    selectedInfrastruktureinrichtung(
      context: ActionContext<SearchState, RootState>,
      infrastruktureinrichtung: InfrastruktureinrichtungDto
    ): void {
      context.commit("selectedInfrastruktureinrichtung", infrastruktureinrichtung);
    },
  },
};
