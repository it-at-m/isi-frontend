import { defineStore } from "pinia";
import { LookupApi, LookupEntryDto } from "@/api/api-client/isi-backend";
import { LookupState } from "@/store/modules/LookupStore";
import RequestUtils from "@/utils/RequestUtils";
import _ from "lodash";

interface State {
  uncertainBoolean: LookupEntryDto[];
  artDokument: LookupEntryDto[];
  artAbfrage: LookupEntryDto[];
  sobonVerfahrensgrundsaetzeJahr: LookupEntryDto[];
  standVerfahrenBauleitplanverfahren: LookupEntryDto[];
  standVerfahrenBaugenehmigungsverfahren: LookupEntryDto[];
  standVerfahrenWeiteresVerfahren: LookupEntryDto[];
  standVerfahren: LookupEntryDto[];
  statusAbfrage: LookupEntryDto[];
  wesentlicheRechtsgrundlageBauleitplanverfahren: LookupEntryDto[];
  wesentlicheRechtsgrundlageBaugenehmigungsverfahren: LookupEntryDto[];
  wesentlicheRechtsgrundlage: LookupEntryDto[];
  artBaulicheNutzung: LookupEntryDto[];
  artBaulicheNutzungBauvorhaben: LookupEntryDto[];
  statusInfrastruktureinrichtung: LookupEntryDto[];
  einrichtungstraeger: LookupEntryDto[];
  einrichtungstraegerSchulen: LookupEntryDto[];
  infrastruktureinrichtungTyp: LookupEntryDto[];
  artGsNachmittagBetreuung: LookupEntryDto[];
  sobonOrientierungswertJahr: LookupEntryDto[];
  sobonOrientierungswertJahrWithoutStandortabfrage: LookupEntryDto[];
}

export const useLookupStore = defineStore("lookup", {
  state: () =>
    ({
      uncertainBoolean: [],
      artDokument: [],
      artAbfrage: [],
      sobonVerfahrensgrundsaetzeJahr: [],
      standVerfahrenBauleitplanverfahren: [],
      standVerfahrenBaugenehmigungsverfahren: [],
      standVerfahrenWeiteresVerfahren: [],
      standVerfahren: [],
      statusAbfrage: [],
      wesentlicheRechtsgrundlageBauleitplanverfahren: [],
      wesentlicheRechtsgrundlageBaugenehmigungsverfahren: [],
      wesentlicheRechtsgrundlage: [],
      artBaulicheNutzung: [],
      artBaulicheNutzungBauvorhaben: [],
      statusInfrastruktureinrichtung: [],
      einrichtungstraeger: [],
      einrichtungstraegerSchulen: [],
      infrastruktureinrichtungTyp: [],
      artGsNachmittagBetreuung: [],
      sobonOrientierungswertJahr: [],
      sobonOrientierungswertJahrWithoutStandortabfrage: [],
    }) as State,
  getters: {
    getUncertainBoolean: (state: State): Array<LookupEntryDto> => {
      return state.uncertainBoolean;
    },
    getArtDokument: (state: State): Array<LookupEntryDto> => {
      return state.artDokument;
    },
    getArtAbfrage: (state: State): Array<LookupEntryDto> => {
      return state.artAbfrage;
    },
    getSobonVerfahrensgrundsaetzeJahr: (state: State): Array<LookupEntryDto> => {
      return state.sobonVerfahrensgrundsaetzeJahr;
    },
    getStandVerfahrenBauleitplanverfahren: (state: State): Array<LookupEntryDto> => {
      return state.standVerfahrenBauleitplanverfahren;
    },
    getStandVerfahrenBaugenehmigungsverfahren: (state: State): Array<LookupEntryDto> => {
      return state.standVerfahrenBaugenehmigungsverfahren;
    },
    getStandVerfahrenWeiteresVerfahren: (state: State): Array<LookupEntryDto> => {
      return state.standVerfahrenWeiteresVerfahren;
    },
    getStandVerfahren: (state: State): Array<LookupEntryDto> => {
      return state.standVerfahren;
    },
    getStatusAbfrage: (state: State): Array<LookupEntryDto> => {
      return state.statusAbfrage;
    },
    getWesentlicheRechtsgrundlageBauleitplanverfahren: (state: State): Array<LookupEntryDto> => {
      return state.wesentlicheRechtsgrundlageBauleitplanverfahren;
    },
    getWesentlicheRechtsgrundlageBaugenehmigungsverfahren: (state: State): Array<LookupEntryDto> => {
      return state.wesentlicheRechtsgrundlageBaugenehmigungsverfahren;
    },
    getWesentlicheRechtsgrundlage: (state: State): Array<LookupEntryDto> => {
      return state.wesentlicheRechtsgrundlage;
    },
    getArtBaulicheNutzung: (state: State): Array<LookupEntryDto> => {
      return state.artBaulicheNutzung;
    },
    getArtBaulicheNutzungBauvorhaben: (state: State): Array<LookupEntryDto> => {
      return state.artBaulicheNutzungBauvorhaben;
    },
    getStatusInfrastruktureinrichtung: (state: State): Array<LookupEntryDto> => {
      return state.statusInfrastruktureinrichtung;
    },
    getEinrichtungstraeger: (state: State): Array<LookupEntryDto> => {
      return state.einrichtungstraeger;
    },
    getEinrichtungstraegerSchulen: (state: State): Array<LookupEntryDto> => {
      return state.einrichtungstraegerSchulen;
    },
    getInfrastruktureinrichtungTyp: (state: State): Array<LookupEntryDto> => {
      return state.infrastruktureinrichtungTyp;
    },
    getArtGsNachmittagBetreuung: (state: State): Array<LookupEntryDto> => {
      return state.artGsNachmittagBetreuung;
    },
    getSobonOrientierungswertJahr: (state: State): Array<LookupEntryDto> => {
      return state.sobonOrientierungswertJahr;
    },
    getSobonOrientierungswertJahrWithoutStandortabfrage: (state: State): Array<LookupEntryDto> => {
      return state.sobonOrientierungswertJahrWithoutStandortabfrage;
    },
  },
  actions: {
    inititalize(): void {
      const lookupApi = new LookupApi(RequestUtils.getBasicFetchConfigurationForBackend());
      lookupApi.getLookupLists(RequestUtils.getGETConfig()).then((lookupLists) => {
        if (!_.isNil(lookupLists.uncertainBoolean?.list)) this.setUncertainBoolean(lookupLists.uncertainBoolean?.list!);
        if (!_.isNil(lookupLists.artDokument?.list)) this.setArtDokument(lookupLists.artDokument?.list!);
        if (!_.isNil(lookupLists.artAbfrage?.list)) this.setArtAbfrage(lookupLists.artAbfrage?.list!);
        if (!_.isNil(lookupLists.sobonVerfahrensgrundsaetzeJahr?.list))
          this.setSobonVerfahrensgrundsaetzeJahr(lookupLists.sobonVerfahrensgrundsaetzeJahr?.list!);
        if (!_.isNil(lookupLists.standVerfahrenBauleitplanverfahren?.list))
          this.setStandVerfahrenBauleitplanverfahren(lookupLists.standVerfahrenBauleitplanverfahren?.list!);
        if (!_.isNil(lookupLists.standVerfahrenBaugenehmigungsverfahren?.list))
          this.setStandVerfahrenBaugenehmigungsverfahren(lookupLists.standVerfahrenBaugenehmigungsverfahren?.list!);
        if (!_.isNil(lookupLists.standVerfahrenWeiteresVerfahren?.list))
          this.setStandVerfahrenWeiteresVerfahren(lookupLists.standVerfahrenWeiteresVerfahren?.list!);
        if (!_.isNil(lookupLists.standVerfahren?.list)) this.setStandVerfahren(lookupLists.standVerfahren?.list!);
        if (!_.isNil(lookupLists.statusAbfrage?.list)) this.setStatusAbfrage(lookupLists.statusAbfrage?.list!);
        if (!_.isNil(lookupLists.wesentlicheRechtsgrundlageBauleitplanverfahren?.list))
          this.setWesentlicheRechtsgrundlageBauleitplanverfahren(
            lookupLists.wesentlicheRechtsgrundlageBauleitplanverfahren?.list!,
          );
        if (!_.isNil(lookupLists.wesentlicheRechtsgrundlageBaugenehmigungsverfahren?.list))
          this.setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(
            lookupLists.wesentlicheRechtsgrundlageBaugenehmigungsverfahren?.list!,
          );
        if (!_.isNil(lookupLists.wesentlicheRechtsgrundlage?.list))
          this.setWesentlicheRechtsgrundlage(lookupLists.wesentlicheRechtsgrundlage?.list!);
        if (!_.isNil(lookupLists.artBaulicheNutzung?.list))
          this.setArtBaulicheNutzung(lookupLists.artBaulicheNutzung?.list!);
        if (!_.isNil(lookupLists.artBaulicheNutzungBauvorhaben?.list))
          this.setArtBaulicheNutzungBauvorhaben(lookupLists.artBaulicheNutzungBauvorhaben?.list!);
        if (!_.isNil(lookupLists.statusInfrastruktureinrichtung?.list))
          this.setStatusInfrastruktureinrichtung(lookupLists.statusInfrastruktureinrichtung?.list!);
        if (!_.isNil(lookupLists.einrichtungstraeger?.list))
          this.setEinrichtungstraeger(lookupLists.einrichtungstraeger?.list!);
        if (!_.isNil(lookupLists.einrichtungstraegerSchulen?.list))
          this.setEinrichtungstraegerSchulen(lookupLists.einrichtungstraegerSchulen?.list!);
        if (!_.isNil(lookupLists.infrastruktureinrichtungTyp?.list))
          this.setInfrastruktureinrichtungTyp(lookupLists.infrastruktureinrichtungTyp?.list!);
        if (!_.isNil(lookupLists.artGsNachmittagBetreuung?.list))
          this.setArtGsNachmittagBetreuung(lookupLists.artGsNachmittagBetreuung?.list!);
        if (!_.isNil(lookupLists.sobonOrientierungswertJahr?.list))
          this.setSobonOrientierungswertJahr(lookupLists.sobonOrientierungswertJahr?.list!);
        if (!_.isNil(lookupLists.sobonOrientierungswertJahrWithoutStandortabfrage?.list))
          this.setSobonOrientierungswertJahrWithoutStandortabfrage(
            lookupLists.sobonOrientierungswertJahrWithoutStandortabfrage?.list!,
          );
      });
    },
    setUncertainBoolean(payload: LookupEntryDto[]): void {
      this.uncertainBoolean = payload;
    },
    setArtDokument(payload: LookupEntryDto[]): void {
      this.artDokument = payload;
    },
    setArtAbfrage(payload: LookupEntryDto[]): void {
      this.artAbfrage = payload;
    },
    setSobonVerfahrensgrundsaetzeJahr(payload: LookupEntryDto[]): void {
      this.sobonVerfahrensgrundsaetzeJahr = payload;
    },
    setStandVerfahrenBauleitplanverfahren(payload: LookupEntryDto[]): void {
      this.standVerfahrenBauleitplanverfahren = payload;
    },
    setStandVerfahrenBaugenehmigungsverfahren(payload: LookupEntryDto[]): void {
      this.standVerfahrenBaugenehmigungsverfahren = payload;
    },
    setStandVerfahrenWeiteresVerfahren(payload: LookupEntryDto[]): void {
      this.standVerfahrenWeiteresVerfahren = payload;
    },
    setStandVerfahren(payload: LookupEntryDto[]): void {
      this.standVerfahren = payload;
    },
    setStatusAbfrage(payload: LookupEntryDto[]): void {
      this.statusAbfrage = payload;
    },
    setWesentlicheRechtsgrundlageBauleitplanverfahren(payload: LookupEntryDto[]): void {
      this.wesentlicheRechtsgrundlageBauleitplanverfahren = payload;
    },
    setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(payload: LookupEntryDto[]): void {
      this.wesentlicheRechtsgrundlageBaugenehmigungsverfahren = payload;
    },
    setWesentlicheRechtsgrundlage(payload: LookupEntryDto[]): void {
      this.wesentlicheRechtsgrundlage = payload;
    },
    setArtBaulicheNutzung(payload: LookupEntryDto[]): void {
      this.artBaulicheNutzung = payload;
    },
    setArtBaulicheNutzungBauvorhaben(payload: LookupEntryDto[]): void {
      this.artBaulicheNutzungBauvorhaben = payload;
    },
    setStatusInfrastruktureinrichtung(payload: LookupEntryDto[]): void {
      this.statusInfrastruktureinrichtung = payload;
    },
    setEinrichtungstraeger(payload: LookupEntryDto[]): void {
      this.einrichtungstraeger = payload;
    },
    setEinrichtungstraegerSchulen(payload: LookupEntryDto[]): void {
      this.einrichtungstraegerSchulen = payload;
    },
    setInfrastruktureinrichtungTyp(payload: LookupEntryDto[]): void {
      this.infrastruktureinrichtungTyp = payload;
    },
    setArtGsNachmittagBetreuung(payload: LookupEntryDto[]): void {
      this.artGsNachmittagBetreuung = payload;
    },
    setSobonOrientierungswertJahr(payload: LookupEntryDto[]): void {
      this.sobonOrientierungswertJahr = payload;
    },
    setSobonOrientierungswertJahrWithoutStandortabfrage(payload: LookupEntryDto[]): void {
      this.sobonOrientierungswertJahrWithoutStandortabfrage = payload;
    },
  },
});
