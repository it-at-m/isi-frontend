import { LookupApi, LookupEntryDto } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  uncertainBoolean: [] as LookupEntryDto[],
  artAbfrage: [] as LookupEntryDto[],
  planungsrecht: [] as LookupEntryDto[],
  sobonVerfahrensgrundsaetzeJahr: [] as LookupEntryDto[],
  standVorhaben: [] as LookupEntryDto[],
  statusAbfrage: [] as LookupEntryDto[],
  zustaendigeDienststelle: [] as LookupEntryDto[],
  baugebietTyp: [] as LookupEntryDto[],
  artDokument: [] as LookupEntryDto[],
  statusInfrastruktureinrichtung: [] as LookupEntryDto[],
  einrichtungstraeger: [] as LookupEntryDto[],
  infrastruktureinrichtungTyp: [] as LookupEntryDto[],
  artGsNachmittagBetreuung: [] as LookupEntryDto[],
};

export type LookupState = typeof state;

export default {
  namespaced: true,
  
  state,

  getters: {
    uncertainBoolean: (state: LookupState): Array<LookupEntryDto> => {
      return state.uncertainBoolean;
    },
    artAbfrage: (state: LookupState): Array<LookupEntryDto> => {
      return state.artAbfrage;
    },
    planungsrecht: (state: LookupState): Array<LookupEntryDto> => {
      return state.planungsrecht;
    },
    sobonVerfahrensgrundsaetzeJahr: (state: LookupState): Array<LookupEntryDto> => {
      return state.sobonVerfahrensgrundsaetzeJahr;
    },
    standVorhaben: (state: LookupState): Array<LookupEntryDto> => {
      return state.standVorhaben;
    },
    statusAbfrage: (state: LookupState): Array<LookupEntryDto> => {
      return state.statusAbfrage;
    },
    zustaendigeDienststelle: (state: LookupState): Array<LookupEntryDto> => {
      return state.zustaendigeDienststelle;
    },
    baugebietTyp: (state: LookupState): Array<LookupEntryDto> => {
      return state.baugebietTyp;
    },
    artDokument: (state: LookupState): Array<LookupEntryDto> => {
      return state.artDokument;
    },
    statusInfrastruktureinrichtung: (state: LookupState): Array<LookupEntryDto> => {
      return state.statusInfrastruktureinrichtung;
    },
    einrichtungstraeger: (state: LookupState): Array<LookupEntryDto> => {
      return state.einrichtungstraeger;
    },
    infrastruktureinrichtungTyp: (state: LookupState): Array<LookupEntryDto> => {
      return state.infrastruktureinrichtungTyp;
    },
    artGsNachmittagBetreuung: (state: LookupState): Array<LookupEntryDto> => {
      return state.artGsNachmittagBetreuung;
    },
  },

  mutations: {
    uncertainBoolean(state: LookupState, list: LookupEntryDto[]): void {
      state.uncertainBoolean = list;
    },
    artAbfrage(state: LookupState, list: LookupEntryDto[]): void {
      state.artAbfrage = list;
    },
    planungsrecht(state: LookupState, list: LookupEntryDto[]): void {
      state.planungsrecht = list;
    },
    sobonVerfahrensgrundsaetzeJahr(state: LookupState, list: LookupEntryDto[]): void {
      state.sobonVerfahrensgrundsaetzeJahr = list;
    },
    standVorhaben(state: LookupState, list: LookupEntryDto[]): void {
      state.standVorhaben = list;
    },
    statusAbfrage(state: LookupState, list: LookupEntryDto[]): void {
      state.statusAbfrage = list;
    },
    zustaendigeDienststelle(state: LookupState, list: LookupEntryDto[]): void {
      state.zustaendigeDienststelle = list;
    },
    baugebietTyp(state: LookupState, list: LookupEntryDto[]): void {
      state.baugebietTyp = list;
    },
    artDokument(state: LookupState, list: LookupEntryDto[]): void {
      state.artDokument = list;
    },
    statusInfrastruktureinrichtung(state: LookupState, list: LookupEntryDto[]): void {
      state.statusInfrastruktureinrichtung = list;
    },
    einrichtungstraeger(state: LookupState, list: LookupEntryDto[]): void {
      state.einrichtungstraeger = list;
    },
    infrastruktureinrichtungTyp(state: LookupState, list: LookupEntryDto[]): void {
      state.infrastruktureinrichtungTyp = list;
    },
    artGsNachmittagBetreuung(state: LookupState, list: LookupEntryDto[]): void {
      state.artGsNachmittagBetreuung = list;
    },

  },

  actions: {
    initialize(context: ActionContext<LookupState, RootState>): void {
      const lookupApi = new LookupApi(RequestUtils.getBasicFetchConfiguration());
      lookupApi.getLookupLists(RequestUtils.getGETConfig()).then(lookupLists => {
        context.commit('uncertainBoolean', lookupLists.uncertainBoolean?.list);
        context.commit('artAbfrage', lookupLists.artAbfrage?.list);
        context.commit('planungsrecht', lookupLists.planungsrecht?.list);
        context.commit('sobonVerfahrensgrundsaetzeJahr', lookupLists.sobonVerfahrensgrundsaetzeJahr?.list);
        context.commit('standVorhaben', lookupLists.standVorhaben?.list);
        context.commit('statusAbfrage', lookupLists.statusAbfrage?.list);
        context.commit('zustaendigeDienststelle', lookupLists.zustaendigeDienststelle?.list);
        context.commit('baugebietTyp', lookupLists.baugebietTyp?.list);
        context.commit('artDokument', lookupLists.artDokument?.list);
        context.commit('statusInfrastruktureinrichtung', lookupLists.statusInfrastruktureinrichtung?.list);
        context.commit('einrichtungstraeger', lookupLists.einrichtungstraeger?.list);
        context.commit('infrastruktureinrichtungTyp', lookupLists.infrastruktureinrichtungTyp?.list);
        context.commit('artGsNachmittagBetreuung', lookupLists.artGsNachmittagBetreuung?.list);
      });
    },
    uncertainBoolean(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("uncertainBoolean", list);
    },
    artAbfrage(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("artAbfrage", list);
    },
    planungsrecht(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("planungsrecht", list);
    },
    sobonVerfahrensgrundsaetzeJahr(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("sobonVerfahrensgrundsaetzeJahr", list);
    },
    standVorhaben(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("standVorhaben", list);
    },
    statusAbfrage(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("statusAbfrage", list);
    },
    zustaendigeDienststelle(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit('zustaendigeDienststelle', list);
    },
    baugebietTyp(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit('baugebietTyp', list);
    },
    artDokument(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("artDokument", list);
    },
    statusInfrastruktureinrichtung(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("statusInfrastruktureinrichtung", list);
    },
    einrichtungstraeger(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("einrichtungstraeger", list);
    },
    infrastruktureinrichtungTyp(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("infrastruktureinrichtungTyp", list);
    },
    artGssBetreuung(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("artGsNachmittagBetreuung", list);
    },
  }
};
