import { AbfrageListElementDto, BauvorhabenDto, InfrastruktureinrichtungListElementDto } from "@/api/api-client";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import GrundschuleModel from "@/types/model/infrastruktureinrichtung/GrundschuleModel";
import MittelschuleModel from "@/types/model/infrastruktureinrichtung/MittelschuleModel";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  resultAbfrage: undefined as Array<AbfrageListElementDto> | undefined,
  searchQueryAbfrage: "",
  selectedAbfrage: undefined as InfrastrukturabfrageModel | undefined,
  resultBauvorhaben: [] as BauvorhabenDto[],
  selectedBauvorhaben: undefined as BauvorhabenDto | undefined,
  resultInfrastruktureinrichtung: [] as InfrastruktureinrichtungListElementDto[] | undefined,
  searchQueryInfrastruktureinrichtung: "",
  selectedInfrastruktureinrichtung: undefined as
   KinderkrippeModel |
   KindergartenModel |
   HausFuerKinderModel |
   GsNachmittagBetreuungModel |
   GrundschuleModel |
   MittelschuleModel |
   undefined,
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
    selectedAbfrage: (
      state: SearchState
    ): InfrastrukturabfrageModel | undefined => {
      return state.selectedAbfrage;
    },
    resultBauvorhaben: (state: SearchState): Array<BauvorhabenDto> => {
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
    selectedInfrastruktureinrichtung: (
      state: SearchState
    ): KinderkrippeModel |
      KindergartenModel |
      HausFuerKinderModel |
      GsNachmittagBetreuungModel |
      GrundschuleModel |
      MittelschuleModel |
      undefined => {
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
    selectedAbfrage(
      state: SearchState,
      selectedAbfrage: InfrastrukturabfrageModel
    ): void {
      state.selectedAbfrage = selectedAbfrage;
    },
    resultBauvorhaben: (state: SearchState, items: BauvorhabenDto[]): void => {
      state.resultBauvorhaben = items;
    },
    resetAbfrage(state: SearchState): void {
      state.resultAbfrage = undefined;
    },
    selectedBauvorhaben: (state: SearchState, item: BauvorhabenDto): void => {
      state.selectedBauvorhaben = item;
    },
    resultInfrastruktureinrichtung(state: SearchState, items: InfrastruktureinrichtungListElementDto[]): void {
      state.resultInfrastruktureinrichtung = items;
    },
    searchQueryInfrastruktureinrichtung(state: SearchState, searchQuery: string): void {
      state.searchQueryInfrastruktureinrichtung = searchQuery;
    },
    selectedInfrastruktureinrichtung(
      state: SearchState,
      selectedInfrastruktureinrichtung:
        KinderkrippeModel |
        KindergartenModel |
        HausFuerKinderModel |
        GsNachmittagBetreuungModel |
        GrundschuleModel |
        MittelschuleModel
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
    selectedAbfrage(
      context: ActionContext<SearchState, RootState>,
      abfrage: InfrastrukturabfrageModel
    ): void {
      context.commit("selectedAbfrage", abfrage);
    },
    resultBauvorhaben(context: ActionContext<SearchState, RootState>, items: BauvorhabenDto[]): void {
      context.commit("resultBauvorhaben", items);
    },
    resetAbfrage(context: ActionContext<SearchState, RootState>): void {
      context.commit("resetAbfrage");
    },
    isInitializedAbfrage(): boolean {
      return this.resultAbfrage !== undefined;
    },
    selectedBauvorhaben(context: ActionContext<SearchState, RootState>, item: BauvorhabenDto): void {
      context.commit('selectedBauvorhaben', item);
    },
    resultInfrastruktureinrichtung(context: ActionContext<SearchState, RootState>, items: InfrastruktureinrichtungListElementDto[]): void {
      context.commit("resultInfrastruktureinrichtung", items);
    },
    searchQueryInfrastruktureinrichtung(context: ActionContext<SearchState, RootState>, searchQuery: string): void {
      context.commit("searchQueryInfrastruktureinrichtung", searchQuery);
    },    
    selectedInfrastruktureinrichtung(
      context: ActionContext<SearchState, RootState>,
      infrastruktureinrichtung: 
        KinderkrippeModel |
        KindergartenModel |
        HausFuerKinderModel |
        GsNachmittagBetreuungModel |
        GrundschuleModel |
        MittelschuleModel
    ): void {
      context.commit("selectedInfrastruktureinrichtung", infrastruktureinrichtung);
    },
    isInitializedInfrastruktureinrichtung(): boolean {
      return this.resultInfrastruktureinrichtung !== undefined;
    },
    resetInfrastruktureinrichtung(context: ActionContext<SearchState, RootState>): void {
      context.commit("resetInfrastruktureinrichtung");
    },
  }
};
