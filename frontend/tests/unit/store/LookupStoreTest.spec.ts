import { beforeEach, describe, expect, test } from "vitest";
import type { LookupListDto } from "@/api/api-client/isi-backend";
import { createPinia, setActivePinia } from "pinia";
import { useLookupStore } from "@/stores/LookupStore";

describe("Lookup Store Setters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const examplePayload: LookupListDto | undefined = { list: [{ key: "key", value: "value" }] } as LookupListDto;
  const examplePayloadListUndefined: LookupListDto | undefined = { list: undefined };
  const examplePayloadUndefined: LookupListDto | undefined = undefined;

  test("setUncertainBoolean updates uncertainBoolean correctly", () => {
    const store = useLookupStore();
    store.setUncertainBoolean(examplePayload);
    expect(store.uncertainBoolean).toEqual(examplePayload.list);
    store.setUncertainBoolean(examplePayloadListUndefined);
    expect(store.uncertainBoolean).toEqual([]);
    store.setUncertainBoolean(examplePayloadUndefined);
    expect(store.uncertainBoolean).toEqual([]);
  });

  test("setArtDokument updates artDokument correctly", () => {
    const store = useLookupStore();
    store.setArtDokument(examplePayload);
    expect(store.artDokument).toEqual(examplePayload.list);
    store.setArtDokument(examplePayloadListUndefined);
    expect(store.artDokument).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setArtAbfrage updates artAbfrage correctly", () => {
    const store = useLookupStore();
    store.setArtAbfrage(examplePayload);
    expect(store.artAbfrage).toEqual(examplePayload.list);
    store.setArtAbfrage(examplePayloadListUndefined);
    expect(store.artAbfrage).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setSobonVerfahrensgrundsaetzeJahr updates sobonVerfahrensgrundsaetzeJahr correctly", () => {
    const store = useLookupStore();
    store.setSobonVerfahrensgrundsaetzeJahr(examplePayload);
    expect(store.sobonVerfahrensgrundsaetzeJahr).toEqual(examplePayload.list);
    store.setSobonVerfahrensgrundsaetzeJahr(examplePayloadListUndefined);
    expect(store.sobonVerfahrensgrundsaetzeJahr).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setStandVerfahrenBauleitplanverfahren updates standVerfahrenBauleitplanverfahren correctly", () => {
    const store = useLookupStore();
    store.setStandVerfahrenBauleitplanverfahren(examplePayload);
    expect(store.standVerfahrenBauleitplanverfahren).toEqual(examplePayload.list);
    store.setStandVerfahrenBauleitplanverfahren(examplePayloadListUndefined);
    expect(store.standVerfahrenBauleitplanverfahren).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setStandVerfahrenBaugenehmigungsverfahren updates standVerfahrenBaugenehmigungsverfahren correctly", () => {
    const store = useLookupStore();
    store.setStandVerfahrenBaugenehmigungsverfahren(examplePayload);
    expect(store.standVerfahrenBaugenehmigungsverfahren).toEqual(examplePayload.list);
    store.setStandVerfahrenBaugenehmigungsverfahren(examplePayloadListUndefined);
    expect(store.standVerfahrenBaugenehmigungsverfahren).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setStandVerfahrenWeiteresVerfahren updates standVerfahrenWeiteresVerfahren correctly", () => {
    const store = useLookupStore();
    store.setStandVerfahrenWeiteresVerfahren(examplePayload);
    expect(store.standVerfahrenWeiteresVerfahren).toEqual(examplePayload.list);
    store.setStandVerfahrenWeiteresVerfahren(examplePayloadListUndefined);
    expect(store.standVerfahrenWeiteresVerfahren).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setStandVerfahren updates standVerfahren correctly", () => {
    const store = useLookupStore();
    store.setStandVerfahren(examplePayload);
    expect(store.standVerfahren).toEqual(examplePayload.list);
    store.setStandVerfahren(examplePayloadListUndefined);
    expect(store.standVerfahren).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setStatusAbfrage updates statusAbfrage correctly", () => {
    const store = useLookupStore();
    store.setStatusAbfrage(examplePayload);
    expect(store.statusAbfrage).toEqual(examplePayload.list);
    store.setStatusAbfrage(examplePayloadListUndefined);
    expect(store.statusAbfrage).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setWesentlicheRechtsgrundlageBauleitplanverfahren updates wesentlicheRechtsgrundlageBauleitplanverfahren correctly", () => {
    const store = useLookupStore();
    store.setWesentlicheRechtsgrundlageBauleitplanverfahren(examplePayload);
    expect(store.wesentlicheRechtsgrundlageBauleitplanverfahren).toEqual(examplePayload.list);
    store.setWesentlicheRechtsgrundlageBauleitplanverfahren(examplePayloadListUndefined);
    expect(store.wesentlicheRechtsgrundlageBauleitplanverfahren).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setWesentlicheRechtsgrundlageBaugenehmigungsverfahren updates wesentlicheRechtsgrundlageBaugenehmigungsverfahren correctly", () => {
    const store = useLookupStore();
    store.setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(examplePayload);
    expect(store.wesentlicheRechtsgrundlageBaugenehmigungsverfahren).toEqual(examplePayload.list);
    store.setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(examplePayloadListUndefined);
    expect(store.wesentlicheRechtsgrundlageBaugenehmigungsverfahren).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setWesentlicheRechtsgrundlage updates wesentlicheRechtsgrundlage correctly", () => {
    const store = useLookupStore();
    store.setWesentlicheRechtsgrundlage(examplePayload);
    expect(store.wesentlicheRechtsgrundlage).toEqual(examplePayload.list);
    store.setWesentlicheRechtsgrundlage(examplePayloadListUndefined);
    expect(store.wesentlicheRechtsgrundlage).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setArtBaulicheNutzung updates artBaulicheNutzung correctly", () => {
    const store = useLookupStore();
    store.setArtBaulicheNutzung(examplePayload);
    expect(store.artBaulicheNutzung).toEqual(examplePayload.list);
    store.setArtBaulicheNutzung(examplePayloadListUndefined);
    expect(store.artBaulicheNutzung).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setArtBaulicheNutzungBauvorhaben updates artBaulicheNutzungBauvorhaben correctly", () => {
    const store = useLookupStore();
    store.setArtBaulicheNutzungBauvorhaben(examplePayload);
    expect(store.artBaulicheNutzungBauvorhaben).toEqual(examplePayload.list);
    store.setArtBaulicheNutzungBauvorhaben(examplePayloadListUndefined);
    expect(store.artBaulicheNutzungBauvorhaben).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setStatusInfrastruktureinrichtung updates statusInfrastruktureinrichtung correctly", () => {
    const store = useLookupStore();
    store.setStatusInfrastruktureinrichtung(examplePayload);
    expect(store.statusInfrastruktureinrichtung).toEqual(examplePayload.list);
    store.setStatusInfrastruktureinrichtung(examplePayloadListUndefined);
    expect(store.statusInfrastruktureinrichtung).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setEinrichtungstraeger updates einrichtungstraeger correctly", () => {
    const store = useLookupStore();
    store.setEinrichtungstraeger(examplePayload);
    expect(store.einrichtungstraeger).toEqual(examplePayload.list);
    store.setEinrichtungstraeger(examplePayloadListUndefined);
    expect(store.einrichtungstraeger).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setEinrichtungstraegerSchulen updates einrichtungstraegerSchulen correctly", () => {
    const store = useLookupStore();
    store.setEinrichtungstraegerSchulen(examplePayload);
    expect(store.einrichtungstraegerSchulen).toEqual(examplePayload.list);
    store.setEinrichtungstraegerSchulen(examplePayloadListUndefined);
    expect(store.einrichtungstraegerSchulen).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setInfrastruktureinrichtungTyp updates infrastruktureinrichtungTyp correctly", () => {
    const store = useLookupStore();
    store.setInfrastruktureinrichtungTyp(examplePayload);
    expect(store.infrastruktureinrichtungTyp).toEqual(examplePayload.list);
    store.setInfrastruktureinrichtungTyp(examplePayloadListUndefined);
    expect(store.infrastruktureinrichtungTyp).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setArtGsNachmittagBetreuung updates artGsNachmittagBetreuung correctly", () => {
    const store = useLookupStore();
    store.setArtGsNachmittagBetreuung(examplePayload);
    expect(store.artGsNachmittagBetreuung).toEqual(examplePayload.list);
    store.setArtGsNachmittagBetreuung(examplePayloadListUndefined);
    expect(store.artGsNachmittagBetreuung).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setSobonOrientierungswertJahr updates sobonOrientierungswertJahr correctly", () => {
    const store = useLookupStore();
    store.setSobonOrientierungswertJahr(examplePayload);
    expect(store.sobonOrientierungswertJahr).toEqual(examplePayload.list);
    store.setSobonOrientierungswertJahr(examplePayloadListUndefined);
    expect(store.sobonOrientierungswertJahr).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });

  test("setSobonOrientierungswertJahrWithoutStandortabfrage updates sobonOrientierungswertJahrWithoutStandortabfrage correctly", () => {
    const store = useLookupStore();
    store.setSobonOrientierungswertJahrWithoutStandortabfrage(examplePayload);
    expect(store.sobonOrientierungswertJahrWithoutStandortabfrage).toEqual(examplePayload.list);
    store.setSobonOrientierungswertJahrWithoutStandortabfrage(examplePayloadListUndefined);
    expect(store.sobonOrientierungswertJahrWithoutStandortabfrage).toEqual([]);
    store.setArtDokument(examplePayloadUndefined);
    expect(store.artDokument).toEqual([]);
  });
});
