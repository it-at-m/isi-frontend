import {
  AbfrageListElementDto,
  BauvorhabenDto,
  InfrastruktureinrichtungDto,
  InfrastruktureinrichtungListElementDto,
  SearchResultDto,
} from "@/api/api-client/isi-backend";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import _ from "lodash";

const state = {
  searchResults: [] as Array<SearchResultDto>,
  resultAbfrage: undefined as Array<AbfrageListElementDto> | undefined,
  searchQueryAbfrage: "",
  selectedAbfrage: undefined as InfrastrukturabfrageModel | undefined,
  resultBauvorhaben: undefined as BauvorhabenDto[] | undefined,
  selectedBauvorhaben: undefined as BauvorhabenModel | undefined,
  resultInfrastruktureinrichtung: [] as InfrastruktureinrichtungListElementDto[] | undefined,
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
    resultAbfrage: (state: SearchState): Array<AbfrageListElementDto> | undefined => {
      return state.resultAbfrage;
    },
    searchQueryAbfrage: (state: SearchState): string => {
      return state.searchQueryAbfrage;
    },
    selectedAbfrage: (state: SearchState): InfrastrukturabfrageModel | undefined => {
      return state.selectedAbfrage;
    },
    resultBauvorhaben: (state: SearchState): Array<BauvorhabenDto> | undefined => {
      return state.resultBauvorhaben;
    },
    selectedBauvorhaben: (state: SearchState): BauvorhabenDto | undefined => {
      return state.selectedBauvorhaben;
    },
    resultInfrastruktureinrichtung: (state: SearchState): Array<InfrastruktureinrichtungListElementDto> | undefined => {
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
    resultAbfrage(state: SearchState, items: AbfrageListElementDto[]): void {
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
    resultBauvorhaben: (state: SearchState, items: BauvorhabenDto[]): void => {
      state.resultBauvorhaben = items;
    },
    resetBauvorhaben(state: SearchState): void {
      state.resultBauvorhaben = undefined;
    },
    resultInfrastruktureinrichtung(state: SearchState, items: InfrastruktureinrichtungListElementDto[]): void {
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
    resultAbfrage(context: ActionContext<SearchState, RootState>, items: AbfrageListElementDto[]): void {
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
    resultBauvorhaben(context: ActionContext<SearchState, RootState>, items: BauvorhabenDto[]): void {
      context.commit("resultBauvorhaben", items);
    },
    selectedBauvorhaben(context: ActionContext<SearchState, RootState>, item: BauvorhabenDto): void {
      context.commit("selectedBauvorhaben", item);
    },
    resetBauvorhaben(context: ActionContext<SearchState, RootState>): void {
      context.commit("resetBauvorhaben");
    },
    resultInfrastruktureinrichtung(
      context: ActionContext<SearchState, RootState>,
      items: InfrastruktureinrichtungListElementDto[]
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
