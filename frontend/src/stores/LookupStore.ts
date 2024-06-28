import { defineStore } from "pinia";
import { LookupApi, type LookupEntryDto, type LookupListDto } from "@/api/api-client/isi-backend";
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
  getters: {},
  actions: {
    async inititalize(): Promise<void> {
      const lookupApi = new LookupApi(RequestUtils.getBasicFetchConfigurationForBackend());
      await lookupApi.getLookupLists(RequestUtils.getGETConfig()).then((lookupLists) => {
        this.setUncertainBoolean(lookupLists.uncertainBoolean);
        this.setArtDokument(lookupLists.artDokument);
        this.setArtAbfrage(lookupLists.artAbfrage);
        this.setSobonVerfahrensgrundsaetzeJahr(lookupLists.sobonVerfahrensgrundsaetzeJahr);
        this.setStandVerfahrenBauleitplanverfahren(lookupLists.standVerfahrenBauleitplanverfahren);
        this.setStandVerfahrenBaugenehmigungsverfahren(lookupLists.standVerfahrenBaugenehmigungsverfahren);
        this.setStandVerfahrenWeiteresVerfahren(lookupLists.standVerfahrenWeiteresVerfahren);
        this.setStandVerfahren(lookupLists.standVerfahren);
        this.setStatusAbfrage(lookupLists.statusAbfrage);
        this.setWesentlicheRechtsgrundlageBauleitplanverfahren(
          lookupLists.wesentlicheRechtsgrundlageBauleitplanverfahren,
        );
        this.setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(
          lookupLists.wesentlicheRechtsgrundlageBaugenehmigungsverfahren,
        );
        this.setWesentlicheRechtsgrundlage(lookupLists.wesentlicheRechtsgrundlage);
        this.setArtBaulicheNutzung(lookupLists.artBaulicheNutzung);
        this.setArtBaulicheNutzungBauvorhaben(lookupLists.artBaulicheNutzungBauvorhaben);
        this.setStatusInfrastruktureinrichtung(lookupLists.statusInfrastruktureinrichtung);
        this.setEinrichtungstraeger(lookupLists.einrichtungstraeger);
        this.setEinrichtungstraegerSchulen(lookupLists.einrichtungstraegerSchulen);
        this.setInfrastruktureinrichtungTyp(lookupLists.infrastruktureinrichtungTyp);
        this.setArtGsNachmittagBetreuung(lookupLists.artGsNachmittagBetreuung);
        this.setSobonOrientierungswertJahr(lookupLists.sobonOrientierungswertJahr);
        this.setSobonOrientierungswertJahrWithoutStandortabfrage(
          lookupLists.sobonOrientierungswertJahrWithoutStandortabfrage,
        );
      });
    },
    setUncertainBoolean(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.uncertainBoolean = payload?.list)
        : (this.uncertainBoolean = []);
    },
    setArtDokument(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list) ? (this.artDokument = payload?.list) : (this.artDokument = []);
    },
    setArtAbfrage(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list) ? (this.artAbfrage = payload?.list) : (this.artAbfrage = []);
    },
    setSobonVerfahrensgrundsaetzeJahr(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.sobonVerfahrensgrundsaetzeJahr = payload?.list)
        : (this.sobonVerfahrensgrundsaetzeJahr = []);
    },
    setStandVerfahrenBauleitplanverfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.standVerfahrenBauleitplanverfahren = payload?.list)
        : (this.standVerfahrenBauleitplanverfahren = []);
    },
    setStandVerfahrenBaugenehmigungsverfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.standVerfahrenBaugenehmigungsverfahren = payload?.list)
        : (this.standVerfahrenBaugenehmigungsverfahren = []);
    },
    setStandVerfahrenWeiteresVerfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.standVerfahrenWeiteresVerfahren = payload?.list)
        : (this.standVerfahrenWeiteresVerfahren = []);
    },
    setStandVerfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list) ? (this.standVerfahren = payload?.list) : (this.standVerfahren = []);
    },
    setStatusAbfrage(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list) ? (this.statusAbfrage = payload?.list) : (this.statusAbfrage = []);
    },
    setWesentlicheRechtsgrundlageBauleitplanverfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.wesentlicheRechtsgrundlageBauleitplanverfahren = payload?.list)
        : (this.wesentlicheRechtsgrundlageBauleitplanverfahren = []);
    },
    setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.wesentlicheRechtsgrundlageBaugenehmigungsverfahren = payload?.list)
        : (this.wesentlicheRechtsgrundlageBaugenehmigungsverfahren = []);
    },
    setWesentlicheRechtsgrundlage(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.wesentlicheRechtsgrundlage = payload?.list)
        : (this.wesentlicheRechtsgrundlage = []);
    },
    setArtBaulicheNutzung(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.artBaulicheNutzung = payload?.list)
        : (this.artBaulicheNutzung = []);
    },
    setArtBaulicheNutzungBauvorhaben(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.artBaulicheNutzungBauvorhaben = payload?.list)
        : (this.artBaulicheNutzungBauvorhaben = []);
    },
    setStatusInfrastruktureinrichtung(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.statusInfrastruktureinrichtung = payload?.list)
        : (this.statusInfrastruktureinrichtung = []);
    },
    setEinrichtungstraeger(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.einrichtungstraeger = payload?.list)
        : (this.einrichtungstraeger = []);
    },
    setEinrichtungstraegerSchulen(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.einrichtungstraegerSchulen = payload?.list)
        : (this.einrichtungstraegerSchulen = []);
    },
    setInfrastruktureinrichtungTyp(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.infrastruktureinrichtungTyp = payload?.list)
        : (this.infrastruktureinrichtungTyp = []);
    },
    setArtGsNachmittagBetreuung(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.artGsNachmittagBetreuung = payload?.list)
        : (this.artGsNachmittagBetreuung = []);
    },
    setSobonOrientierungswertJahr(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.sobonOrientierungswertJahr = payload?.list)
        : (this.sobonOrientierungswertJahr = []);
    },
    setSobonOrientierungswertJahrWithoutStandortabfrage(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.sobonOrientierungswertJahrWithoutStandortabfrage = payload?.list)
        : (this.sobonOrientierungswertJahrWithoutStandortabfrage = []);
    },
  },
});
