import {
  AbfrageListElementDto,
  BauvorhabenDto,
  InfrastruktureinrichtungDto,
  InfrastruktureinrichtungListElementDto,
} from "@/api/api-client/isi-backend";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import GrundschuleModel from "@/types/model/infrastruktureinrichtung/GrundschuleModel";
import MittelschuleModel from "@/types/model/infrastruktureinrichtung/MittelschuleModel";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";

const state = {
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
