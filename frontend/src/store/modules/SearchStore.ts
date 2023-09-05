import {
  AbfrageSearchResultDto,
  BauvorhabenDto,
  BauvorhabenSearchResultDto,
  InfrastruktureinrichtungDto,
  InfrastruktureinrichtungSearchResultDto,
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
  resultAbfrage: undefined as Array<AbfrageSearchResultDto> | undefined,
  searchQueryAbfrage: "",
  selectedAbfrage: undefined as InfrastrukturabfrageModel | undefined,
  selectedBauvorhaben: undefined as BauvorhabenModel | undefined,
  resultInfrastruktureinrichtung: [] as InfrastruktureinrichtungSearchResultDto[] | undefined,
  searchQueryInfrastruktureinrichtung: "",
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
    resultAbfrage: (state: SearchState): Array<AbfrageSearchResultDto> | undefined => {
      return state.resultAbfrage;
    },
    searchQueryAbfrage: (state: SearchState): string => {
      return state.searchQueryAbfrage;
    },
    selectedAbfrage: (state: SearchState): InfrastrukturabfrageModel | undefined => {
      return state.selectedAbfrage;
    },
    selectedBauvorhaben: (state: SearchState): BauvorhabenDto | undefined => {
      return state.selectedBauvorhaben;
    },
    resultInfrastruktureinrichtung: (
      state: SearchState
    ): Array<InfrastruktureinrichtungSearchResultDto> | undefined => {
      return state.resultInfrastruktureinrichtung;
    },
    searchQueryInfrastruktureinrichtung: (state: SearchState): string => {
      return state.searchQueryInfrastruktureinrichtung;
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
    resultAbfrage(state: SearchState, items: AbfrageSearchResultDto[]): void {
      state.resultAbfrage = items;
    },
    searchQueryAbfrage(state: SearchState, searchQuery: string): void {
      state.searchQueryAbfrage = searchQuery;
    },
    selectedAbfrage(state: SearchState, selectedAbfrage: InfrastrukturabfrageModel): void {
      state.selectedAbfrage = selectedAbfrage;
    },
    resetAbfrage(state: SearchState): void {
      state.resultAbfrage = undefined;
    },
    selectedBauvorhaben: (state: SearchState, item: BauvorhabenDto): void => {
      state.selectedBauvorhaben = item;
    },
    resultInfrastruktureinrichtung(state: SearchState, items: InfrastruktureinrichtungSearchResultDto[]): void {
      state.resultInfrastruktureinrichtung = items;
    },
    searchQueryInfrastruktureinrichtung(state: SearchState, searchQuery: string): void {
      state.searchQueryInfrastruktureinrichtung = searchQuery;
    },
    selectedInfrastruktureinrichtung(
      state: SearchState,
      selectedInfrastruktureinrichtung: InfrastruktureinrichtungDto
    ): void {
      state.selectedInfrastruktureinrichtung = selectedInfrastruktureinrichtung;
    },
    resetInfrastruktureinrichtung(state: SearchState): void {
      state.resultInfrastruktureinrichtung = undefined;
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
    resultAbfrage(context: ActionContext<SearchState, RootState>, items: AbfrageSearchResultDto[]): void {
      context.commit("resultAbfrage", items);
    },
    searchQueryAbfrage(context: ActionContext<SearchState, RootState>, searchQuery: string): void {
      context.commit("searchQueryAbfrage", searchQuery);
    },
    selectedAbfrage(context: ActionContext<SearchState, RootState>, abfrage: InfrastrukturabfrageModel): void {
      context.commit("selectedAbfrage", abfrage);
    },
    resetAbfrage(context: ActionContext<SearchState, RootState>): void {
      context.commit("resetAbfrage");
    },
    isInitializedAbfrage(): boolean {
      return this.resultAbfrage !== undefined;
    },
    selectedBauvorhaben(context: ActionContext<SearchState, RootState>, item: BauvorhabenDto): void {
      context.commit("selectedBauvorhaben", item);
    },
    resultInfrastruktureinrichtung(
      context: ActionContext<SearchState, RootState>,
      items: InfrastruktureinrichtungSearchResultDto[]
    ): void {
      context.commit("resultInfrastruktureinrichtung", items);
    },
    searchQueryInfrastruktureinrichtung(context: ActionContext<SearchState, RootState>, searchQuery: string): void {
      context.commit("searchQueryInfrastruktureinrichtung", searchQuery);
    },
    selectedInfrastruktureinrichtung(
      context: ActionContext<SearchState, RootState>,
      infrastruktureinrichtung: InfrastruktureinrichtungDto
    ): void {
      context.commit("selectedInfrastruktureinrichtung", infrastruktureinrichtung);
    },
    isInitializedInfrastruktureinrichtung(): boolean {
      return this.resultInfrastruktureinrichtung !== undefined;
    },
    resetInfrastruktureinrichtung(context: ActionContext<SearchState, RootState>): void {
      context.commit("resetInfrastruktureinrichtung");
    },
  },
};
