import { LookupApi, LookupEntryDto } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  uncertainBoolean: [] as LookupEntryDto[],
  artDokument: [] as LookupEntryDto[],
  artAbfrage: [] as LookupEntryDto[],
  sobonVerfahrensgrundsaetzeJahr: [] as LookupEntryDto[],
  standVerfahrenBauleitplanverfahren: [] as LookupEntryDto[],
  standVerfahrenBaugenehmigungsverfahren: [] as LookupEntryDto[],
  standVerfahrenWeiteresVerfahren: [] as LookupEntryDto[],
  standVerfahren: [] as LookupEntryDto[],
  statusAbfrage: [] as LookupEntryDto[],
  wesentlicheRechtsgrundlageBauleitplanverfahren: [] as LookupEntryDto[],
  wesentlicheRechtsgrundlageBaugenehmigungsverfahren: [] as LookupEntryDto[],
  wesentlicheRechtsgrundlage: [] as LookupEntryDto[],
  artBaulicheNutzung: [] as LookupEntryDto[],
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
    artDokument: (state: LookupState): Array<LookupEntryDto> => {
      return state.artDokument;
    },
    artAbfrage: (state: LookupState): Array<LookupEntryDto> => {
      return state.artAbfrage;
    },
    sobonVerfahrensgrundsaetzeJahr: (state: LookupState): Array<LookupEntryDto> => {
      return state.sobonVerfahrensgrundsaetzeJahr;
    },
    standVerfahrenBauleitplanverfahren: (state: LookupState): Array<LookupEntryDto> => {
      return state.standVerfahrenBauleitplanverfahren;
    },
    standVerfahrenBaugenehmigungsverfahren: (state: LookupState): Array<LookupEntryDto> => {
      return state.standVerfahrenBaugenehmigungsverfahren;
    },
    standVerfahrenWeiteresVerfahren: (state: LookupState): Array<LookupEntryDto> => {
      return state.standVerfahrenWeiteresVerfahren;
    },
    standVerfahren: (state: LookupState): Array<LookupEntryDto> => {
      return state.standVerfahren;
    },
    statusAbfrage: (state: LookupState): Array<LookupEntryDto> => {
      return state.statusAbfrage;
    },
    wesentlicheRechtsgrundlageBauleitplanverfahren: (state: LookupState): Array<LookupEntryDto> => {
      return state.wesentlicheRechtsgrundlageBauleitplanverfahren;
    },
    wesentlicheRechtsgrundlageBaugenehmigungsverfahren: (state: LookupState): Array<LookupEntryDto> => {
      return state.wesentlicheRechtsgrundlageBaugenehmigungsverfahren;
    },
    wesentlicheRechtsgrundlage: (state: LookupState): Array<LookupEntryDto> => {
      return state.wesentlicheRechtsgrundlage;
    },
    artBaulicheNutzung: (state: LookupState): Array<LookupEntryDto> => {
      return state.artBaulicheNutzung;
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
    artDokument(state: LookupState, list: LookupEntryDto[]): void {
      state.artDokument = list;
    },
    artAbfrage(state: LookupState, list: LookupEntryDto[]): void {
      state.artAbfrage = list;
    },
    sobonVerfahrensgrundsaetzeJahr(state: LookupState, list: LookupEntryDto[]): void {
      state.sobonVerfahrensgrundsaetzeJahr = list;
    },
    standVerfahrenBauleitplanverfahren(state: LookupState, list: LookupEntryDto[]): void {
      state.standVerfahrenBauleitplanverfahren = list;
    },
    standVerfahrenBaugenehmigungsverfahren(state: LookupState, list: LookupEntryDto[]): void {
      state.standVerfahrenBaugenehmigungsverfahren = list;
    },
    standVerfahrenWeiteresVerfahren(state: LookupState, list: LookupEntryDto[]): void {
      state.standVerfahrenWeiteresVerfahren = list;
    },
    standVerfahren(state: LookupState, list: LookupEntryDto[]): void {
      state.standVerfahren = list;
    },
    statusAbfrage(state: LookupState, list: LookupEntryDto[]): void {
      state.statusAbfrage = list;
    },
    wesentlicheRechtsgrundlageBauleitplanverfahren(state: LookupState, list: LookupEntryDto[]): void {
      state.wesentlicheRechtsgrundlageBauleitplanverfahren = list;
    },
    wesentlicheRechtsgrundlageBaugenehmigungsverfahren(state: LookupState, list: LookupEntryDto[]): void {
      state.wesentlicheRechtsgrundlageBaugenehmigungsverfahren = list;
    },
    wesentlicheRechtsgrundlage(state: LookupState, list: LookupEntryDto[]): void {
      state.wesentlicheRechtsgrundlage = list;
    },
    artBaulicheNutzung(state: LookupState, list: LookupEntryDto[]): void {
      state.artBaulicheNutzung = list;
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
        context.commit("artDokument", lookupLists.artDokument?.list);
        context.commit("artAbfrage", lookupLists.artAbfrage?.list);
        context.commit("sobonVerfahrensgrundsaetzeJahr", lookupLists.sobonVerfahrensgrundsaetzeJahr?.list);
        context.commit("standVerfahrenBauleitplanverfahren", lookupLists.standVerfahrenBauleitplanverfahren?.list);
        context.commit(
          "standVerfahrenBaugenehmigungsverfahren",
          lookupLists.standVerfahrenBaugenehmigungsverfahren?.list,
        );
        context.commit(
          "standVerfahrenWeiteresVerfahren",
          lookupLists.standVerfahrenWeiteresVerfahren?.list,
        );
        context.commit("standVerfahren", lookupLists.standVerfahren?.list);
        context.commit("statusAbfrage", lookupLists.statusAbfrage?.list);
        context.commit(
          "wesentlicheRechtsgrundlageBauleitplanverfahren",
          lookupLists.wesentlicheRechtsgrundlageBauleitplanverfahren?.list,
        );
        context.commit(
          "wesentlicheRechtsgrundlageBaugenehmigungsverfahren",
          lookupLists.wesentlicheRechtsgrundlageBaugenehmigungsverfahren?.list,
        );
        context.commit("wesentlicheRechtsgrundlage", lookupLists.wesentlicheRechtsgrundlage?.list);
        context.commit("artBaulicheNutzung", lookupLists.artBaulicheNutzung?.list);
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
    artDokument(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("artDokument", list);
    },
    artAbfrage(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("artAbfrage", list);
    },
    sobonVerfahrensgrundsaetzeJahr(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("sobonVerfahrensgrundsaetzeJahr", list);
    },
    standVerfahrenBauleitplanverfahren(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("standVerfahrenBauleitplanverfahren", list);
    },
    standVerfahrenBaugenehmigungsverfahren(
      context: ActionContext<LookupState, RootState>,
      list: LookupEntryDto[],
    ): void {
      context.commit("standVerfahrenBaugenehmigungsverfahren", list);
    },
    standVerfahrenWeiteresVerfahren(
      context: ActionContext<LookupState, RootState>,
      list: LookupEntryDto[],
    ): void {
      context.commit("standVerfahrenWeiteresVerfahren", list);
    },
    standVerfahren(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("standVerfahren", list);
    },
    statusAbfrage(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("statusAbfrage", list);
    },
    wesentlicheRechtsgrundlageBauleitplanverfahren(
      context: ActionContext<LookupState, RootState>,
      list: LookupEntryDto[],
    ): void {
      context.commit("wesentlicheRechtsgrundlageBauleitplanverfahren", list);
    },
    wesentlicheRechtsgrundlageBaugenehmigungsverfahren(
      context: ActionContext<LookupState, RootState>,
      list: LookupEntryDto[],
    ): void {
      context.commit("wesentlicheRechtsgrundlageBaugenehmigungsverfahren", list);
    },
    wesentlicheRechtsgrundlage(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("wesentlicheRechtsgrundlage", list);
    },
    artBaulicheNutzung(context: ActionContext<LookupState, RootState>, list: LookupEntryDto[]): void {
      context.commit("artBaulicheNutzung", list);
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
