import { defineStore } from "pinia";
import { LookupApi, LookupEntryDto } from "@/api/api-client/isi-backend";
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
        !_.isNil(lookupLists.uncertainBoolean?.list)
          ? this.setUncertainBoolean(lookupLists.uncertainBoolean?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artDokument?.list)
          ? this.setArtDokument(lookupLists.artDokument?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setArtAbfrage(lookupLists.artAbfrage?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setSobonVerfahrensgrundsaetzeJahr(lookupLists.sobonVerfahrensgrundsaetzeJahr?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setStandVerfahrenBauleitplanverfahren(
              lookupLists.standVerfahrenBauleitplanverfahren?.list as LookupEntryDto[],
            )
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setStandVerfahrenBaugenehmigungsverfahren(
              lookupLists.standVerfahrenBaugenehmigungsverfahren?.list as LookupEntryDto[],
            )
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setStandVerfahrenWeiteresVerfahren(
              lookupLists.standVerfahrenWeiteresVerfahren?.list as LookupEntryDto[],
            )
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setStandVerfahren(lookupLists.standVerfahren?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setStatusAbfrage(lookupLists.statusAbfrage?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setWesentlicheRechtsgrundlageBauleitplanverfahren(
              lookupLists.wesentlicheRechtsgrundlageBauleitplanverfahren?.list as LookupEntryDto[],
            )
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(
              lookupLists.wesentlicheRechtsgrundlageBaugenehmigungsverfahren?.list as LookupEntryDto[],
            )
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setWesentlicheRechtsgrundlage(lookupLists.wesentlicheRechtsgrundlage?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setArtBaulicheNutzung(lookupLists.artBaulicheNutzung?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setArtBaulicheNutzungBauvorhaben(lookupLists.artBaulicheNutzungBauvorhaben?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setStatusInfrastruktureinrichtung(lookupLists.statusInfrastruktureinrichtung?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setEinrichtungstraeger(lookupLists.einrichtungstraeger?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setEinrichtungstraegerSchulen(lookupLists.einrichtungstraegerSchulen?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setInfrastruktureinrichtungTyp(lookupLists.infrastruktureinrichtungTyp?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setArtGsNachmittagBetreuung(lookupLists.artGsNachmittagBetreuung?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setSobonOrientierungswertJahr(lookupLists.sobonOrientierungswertJahr?.list as LookupEntryDto[])
          : [];
        !_.isNil(lookupLists.artAbfrage?.list)
          ? this.setSobonOrientierungswertJahrWithoutStandortabfrage(
              lookupLists.sobonOrientierungswertJahrWithoutStandortabfrage?.list as LookupEntryDto[],
            )
          : [];
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
