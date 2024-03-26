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
        this.setUncertainBoolean(lookupLists.uncertainBoolean?.list!);
        this.setArtDokument(lookupLists.artDokument?.list!);
        this.setArtAbfrage(lookupLists.artAbfrage?.list!);
        !_.isNil(lookupLists.sobonVerfahrensgrundsaetzeJahr) &&
        !_.isNil(lookupLists.sobonVerfahrensgrundsaetzeJahr?.list)
          ? this.setSobonVerfahrensgrundsaetzeJahr(lookupLists.sobonVerfahrensgrundsaetzeJahr?.list)
          : [];
        !_.isNil(lookupLists.standVerfahrenBauleitplanverfahren) &&
        !_.isNil(lookupLists.standVerfahrenBauleitplanverfahren?.list)
          ? this.setStandVerfahrenBauleitplanverfahren(lookupLists.standVerfahrenBauleitplanverfahren?.list)
          : [];
        !_.isNil(lookupLists.standVerfahrenBaugenehmigungsverfahren) &&
        !_.isNil(lookupLists.standVerfahrenBaugenehmigungsverfahren?.list)
          ? this.setStandVerfahrenBaugenehmigungsverfahren(lookupLists.standVerfahrenBaugenehmigungsverfahren?.list)
          : [];
        !_.isNil(lookupLists.standVerfahrenWeiteresVerfahren) &&
        !_.isNil(lookupLists.standVerfahrenWeiteresVerfahren?.list)
          ? this.setStandVerfahrenWeiteresVerfahren(lookupLists.standVerfahrenWeiteresVerfahren?.list)
          : [];
        !_.isNil(lookupLists.standVerfahren) && !_.isNil(lookupLists.standVerfahren?.list)
          ? this.setStandVerfahren(lookupLists.standVerfahren?.list)
          : [];
        !_.isNil(lookupLists.statusAbfrage) && !_.isNil(lookupLists.statusAbfrage?.list)
          ? this.setStatusAbfrage(lookupLists.statusAbfrage?.list)
          : [];
        !_.isNil(lookupLists.wesentlicheRechtsgrundlageBauleitplanverfahren) &&
        !_.isNil(lookupLists.wesentlicheRechtsgrundlageBauleitplanverfahren?.list)
          ? this.setWesentlicheRechtsgrundlageBauleitplanverfahren(
              lookupLists.wesentlicheRechtsgrundlageBauleitplanverfahren?.list,
            )
          : [];
        !_.isNil(lookupLists.wesentlicheRechtsgrundlageBaugenehmigungsverfahren) &&
        !_.isNil(lookupLists.wesentlicheRechtsgrundlageBaugenehmigungsverfahren?.list)
          ? this.setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(
              lookupLists.wesentlicheRechtsgrundlageBaugenehmigungsverfahren?.list,
            )
          : [];
        !_.isNil(lookupLists.wesentlicheRechtsgrundlage) && !_.isNil(lookupLists.wesentlicheRechtsgrundlage?.list)
          ? this.setWesentlicheRechtsgrundlage(lookupLists.wesentlicheRechtsgrundlage?.list)
          : [];
        !_.isNil(lookupLists.artBaulicheNutzung) && !_.isNil(lookupLists.artBaulicheNutzung?.list)
          ? this.setArtBaulicheNutzung(lookupLists.artBaulicheNutzung?.list)
          : [];
        !_.isNil(lookupLists.artBaulicheNutzungBauvorhaben) && !_.isNil(lookupLists.artBaulicheNutzungBauvorhaben?.list)
          ? this.setArtBaulicheNutzungBauvorhaben(lookupLists.artBaulicheNutzungBauvorhaben?.list)
          : [];
        !_.isNil(lookupLists.statusInfrastruktureinrichtung) &&
        !_.isNil(lookupLists.statusInfrastruktureinrichtung?.list)
          ? this.setStatusInfrastruktureinrichtung(lookupLists.statusInfrastruktureinrichtung?.list)
          : [];
        !_.isNil(lookupLists.einrichtungstraeger) && !_.isNil(lookupLists.einrichtungstraeger?.list)
          ? this.setEinrichtungstraeger(lookupLists.einrichtungstraeger?.list)
          : [];
        !_.isNil(lookupLists.einrichtungstraegerSchulen) && !_.isNil(lookupLists.einrichtungstraegerSchulen?.list)
          ? this.setEinrichtungstraegerSchulen(lookupLists.einrichtungstraegerSchulen?.list)
          : [];
        !_.isNil(lookupLists.infrastruktureinrichtungTyp) && !_.isNil(lookupLists.infrastruktureinrichtungTyp?.list)
          ? this.setInfrastruktureinrichtungTyp(lookupLists.infrastruktureinrichtungTyp?.list)
          : [];
        !_.isNil(lookupLists.artGsNachmittagBetreuung) && !_.isNil(lookupLists.artGsNachmittagBetreuung?.list)
          ? this.setArtGsNachmittagBetreuung(lookupLists.artGsNachmittagBetreuung?.list)
          : [];
        !_.isNil(lookupLists.sobonOrientierungswertJahr) && !_.isNil(lookupLists.sobonOrientierungswertJahr?.list)
          ? this.setSobonOrientierungswertJahr(lookupLists.sobonOrientierungswertJahr?.list)
          : [];
        !_.isNil(lookupLists.sobonOrientierungswertJahrWithoutStandortabfrage) &&
        !_.isNil(lookupLists.sobonOrientierungswertJahrWithoutStandortabfrage?.list)
          ? this.setSobonOrientierungswertJahrWithoutStandortabfrage(
              lookupLists.sobonOrientierungswertJahrWithoutStandortabfrage?.list,
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
