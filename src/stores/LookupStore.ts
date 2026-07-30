import { defineStore } from "pinia";
import { LookupApi, type LookupEntryDto, type LookupListDto } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import _ from "lodash";

interface State {
  uncertainBoolean: LookupEntryDto[];
  artDokument: LookupEntryDto[];
  artAbfrage: LookupEntryDto[];
  sobonVerfahrensgrundsaetzeJahr: LookupEntryDto[];
  verfahrensstandBauleitplanverfahren: LookupEntryDto[];
  verfahrensstandBaugenehmigungsverfahren: LookupEntryDto[];
  verfahrensstandWeiteresVerfahren: LookupEntryDto[];
  verfahrensstand: LookupEntryDto[];
  statusAbfrage: LookupEntryDto[];
  planart: LookupEntryDto[];
  wesentlicheRechtsgrundlageBaugenehmigungsverfahren: LookupEntryDto[];
  wesentlicheRechtsgrundlageWeiteresVerfahren: LookupEntryDto[];
  wesentlicheRechtsgrundlageBauvorhaben: LookupEntryDto[];
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
  bauratenmethodik: LookupEntryDto[];
}

export const useLookupStore = defineStore("lookup", {
  state: () =>
    ({
      uncertainBoolean: [],
      artDokument: [],
      artAbfrage: [],
      sobonVerfahrensgrundsaetzeJahr: [],
      verfahrensstandBauleitplanverfahren: [],
      verfahrensstandBaugenehmigungsverfahren: [],
      verfahrensstandWeiteresVerfahren: [],
      verfahrensstand: [],
      statusAbfrage: [],
      planart: [],
      wesentlicheRechtsgrundlageBaugenehmigungsverfahren: [],
      wesentlicheRechtsgrundlageWeiteresVerfahren: [],
      wesentlicheRechtsgrundlageBauvorhaben: [],
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
      bauratenmethodik: [],
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
        this.setVerfahrensstandBauleitplanverfahren(lookupLists.verfahrensstandBauleitplanverfahren);
        this.setVerfahrensstandBaugenehmigungsverfahren(lookupLists.verfahrensstandBaugenehmigungsverfahren);
        this.setVerfahrensstandWeiteresVerfahren(lookupLists.verfahrensstandWeiteresVerfahren);
        this.setVerfahrensstand(lookupLists.verfahrensstand);
        this.setStatusAbfrage(lookupLists.statusAbfrage);
        this.setPlanart(lookupLists.planart);
        this.setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(
          lookupLists.wesentlicheRechtsgrundlageBaugenehmigungsverfahren,
        );
        this.setWesentlicheRechtsgrundlageWeiteresVerfahren(lookupLists.wesentlicheRechtsgrundlageWeiteresVerfahren);
        this.setWesentlicheRechtsgrundlageBauvorhaben(lookupLists.wesentlicheRechtsgrundlageBauvorhaben);
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
        this.setBauratenmethodik(lookupLists.bauratenmethodik);
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
    setVerfahrensstandBauleitplanverfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.verfahrensstandBauleitplanverfahren = payload?.list)
        : (this.verfahrensstandBauleitplanverfahren = []);
    },
    setVerfahrensstandBaugenehmigungsverfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.verfahrensstandBaugenehmigungsverfahren = payload?.list)
        : (this.verfahrensstandBaugenehmigungsverfahren = []);
    },
    setVerfahrensstandWeiteresVerfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.verfahrensstandWeiteresVerfahren = payload?.list)
        : (this.verfahrensstandWeiteresVerfahren = []);
    },
    setVerfahrensstand(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.verfahrensstand = payload?.list)
        : (this.verfahrensstand = []);
    },
    setStatusAbfrage(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list) ? (this.statusAbfrage = payload?.list) : (this.statusAbfrage = []);
    },
    setPlanart(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list) ? (this.planart = payload?.list) : (this.planart = []);
    },
    setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.wesentlicheRechtsgrundlageBaugenehmigungsverfahren = payload?.list)
        : (this.wesentlicheRechtsgrundlageBaugenehmigungsverfahren = []);
    },
    setWesentlicheRechtsgrundlageWeiteresVerfahren(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.wesentlicheRechtsgrundlageWeiteresVerfahren = payload?.list)
        : (this.wesentlicheRechtsgrundlageWeiteresVerfahren = []);
    },
    setWesentlicheRechtsgrundlageBauvorhaben(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.wesentlicheRechtsgrundlageBauvorhaben = payload?.list)
        : (this.wesentlicheRechtsgrundlageBauvorhaben = []);
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
    setBauratenmethodik(payload: LookupListDto | undefined): void {
      !_.isNil(payload) && !_.isNil(payload.list)
        ? (this.bauratenmethodik = payload?.list)
        : (this.bauratenmethodik = []);
    },
  },
});
