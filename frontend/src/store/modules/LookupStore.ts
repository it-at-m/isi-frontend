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
  baugebietArt: [] as LookupEntryDto[],
  artDokument: [] as LookupEntryDto[],
  statusInfrastruktureinrichtung: [] as LookupEntryDto[],
  einrichtungstraeger: [] as LookupEntryDto[],
  einrichtungstraegerSchulen: [] as LookupEntryDto[],
  infrastruktureinrichtungTyp: [] as LookupEntryDto[],
  artGsNachmittagBetreuung: [] as LookupEntryDto[],
  sobonOrientierungswertJahr: [] as LookupEntryDto[],
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
    baugebietArt: (state: LookupState): Array<LookupEntryDto> => {
      return state.baugebietArt;
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
    einrichtungstraegerSchulen: (state: LookupState): Array<LookupEntryDto> => {
      return state.einrichtungstraegerSchulen;
    },
    infrastruktureinrichtungTyp: (state: LookupState): Array<LookupEntryDto> => {
      return state.infrastruktureinrichtungTyp;
    },
    artGsNachmittagBetreuung: (state: LookupState): Array<LookupEntryDto> => {
      return state.artGsNachmittagBetreuung;
    },
    sobonOrientierungswertJahr: (state: LookupState): Array<LookupEntryDto> => {
      return state.sobonOrientierungswertJahr;
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
    baugebietArt(state: LookupState, list: LookupEntryDto[]): void {
      state.baugebietArt = list;
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
    einrichtungstraegerSchulen(state: LookupState, list: LookupEntryDto[]): void {
      state.einrichtungstraegerSchulen = list;
    },
    infrastruktureinrichtungTyp(state: LookupState, list: LookupEntryDto[]): void {
      state.infrastruktureinrichtungTyp = list;
    },
    artGsNachmittagBetreuung(state: LookupState, list: LookupEntryDto[]): void {
      state.artGsNachmittagBetreuung = list;
    },
    sobonOrientierungswertJahr(state: LookupState, list: LookupEntryDto[]): void {
      state.sobonOrientierungswertJahr = list;
    },
  },

  actions: {
    initialize(context: ActionContext<LookupState, RootState>): void {
      const lookupApi = new LookupApi(RequestUtils.getBasicFetchConfigurationForBackend());
      lookupApi.getLookupLists(RequestUtils.getGETConfig()).then((lookupLists) => {
        context.commit("uncertainBoolean", lookupLists.uncertainBoolean?.list);
        context.commit("artAbfrage", lookupLists.artAbfrage?.list);
        context.commit("planungsrecht", lookupLists.planungsrecht?.list);
        context.commit("sobonVerfahrensgrundsaetzeJahr", lookupLists.sobonVerfahrensgrundsaetzeJahr?.list);
        context.commit("standVorhaben", lookupLists.standVorhaben?.list);
        context.commit("statusAbfrage", lookupLists.statusAbfrage?.list);
        context.commit("baugebietArt", lookupLists.baugebietArt?.list);
        context.commit("artDokument", lookupLists.artDokument?.list);
        context.commit("statusInfrastruktureinrichtung", lookupLists.statusInfrastruktureinrichtung?.list);
        context.commit("einrichtungstraeger", lookupLists.einrichtungstraeger?.list);
        context.commit("einrichtungstraegerSchulen", lookupLists.einrichtungstraegerSchulen?.list);
        context.commit("infrastruktureinrichtungTyp", lookupLists.infrastruktureinrichtungTyp?.list);
        context.commit("artGsNachmittagBetreuung", lookupLists.artGsNachmittagBetreuung?.list);
        context.commit("sobonOrientierungswertJahr", lookupLists.sobonOrientierungswertJahr?.list);
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
    baugebietArt(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("baugebietArt", list);
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
    einrichtungstraegerSchulen(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("einrichtungstraegerSchulen", list);
    },
    infrastruktureinrichtungTyp(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("infrastruktureinrichtungTyp", list);
    },
    artGssBetreuung(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("artGsNachmittagBetreuung", list);
    },
    sobonOrientierungswertJahr(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("sobonOrientierungswertJahr", list);
    },
  },
};
