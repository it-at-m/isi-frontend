import { describe, expect, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useLookupStore } from "../../../src/stores/LookupStore";
import { LookupEntryDto, LookupListDto } from "@/api/api-client/isi-backend";

describe("Lookup Store Setters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const examplePayload = [{ key: "exampleKey", value: "exampleValue" }] as LookupEntryDto[];

  it("setUncertainBoolean updates uncertainBoolean correctly", () => {
    const store = useLookupStore();
    store.setUncertainBoolean(examplePayload);
    expect(store.uncertainBoolean).toEqual(examplePayload);
  });

  it("setArtDokument updates artDokument correctly", () => {
    const store = useLookupStore();
    store.setArtDokument(examplePayload);
    expect(store.artDokument).toEqual(examplePayload);
  });

  it("setArtAbfrage updates artAbfrage correctly", () => {
    const store = useLookupStore();
    store.setArtAbfrage(examplePayload);
    expect(store.artAbfrage).toEqual(examplePayload);
  });

  it("setSobonVerfahrensgrundsaetzeJahr updates sobonVerfahrensgrundsaetzeJahr correctly", () => {
    const store = useLookupStore();
    store.setSobonVerfahrensgrundsaetzeJahr(examplePayload);
    expect(store.sobonVerfahrensgrundsaetzeJahr).toEqual(examplePayload);
  });

  it("setStandVerfahrenBauleitplanverfahren updates standVerfahrenBauleitplanverfahren correctly", () => {
    const store = useLookupStore();
    store.setStandVerfahrenBauleitplanverfahren(examplePayload);
    expect(store.standVerfahrenBauleitplanverfahren).toEqual(examplePayload);
  });

  it("setStandVerfahrenBaugenehmigungsverfahren updates standVerfahrenBaugenehmigungsverfahren correctly", () => {
    const store = useLookupStore();
    store.setStandVerfahrenBaugenehmigungsverfahren(examplePayload);
    expect(store.standVerfahrenBaugenehmigungsverfahren).toEqual(examplePayload);
  });

  it("setStandVerfahrenWeiteresVerfahren updates standVerfahrenWeiteresVerfahren correctly", () => {
    const store = useLookupStore();
    store.setStandVerfahrenWeiteresVerfahren(examplePayload);
    expect(store.standVerfahrenWeiteresVerfahren).toEqual(examplePayload);
  });

  it("setStandVerfahren updates standVerfahren correctly", () => {
    const store = useLookupStore();
    store.setStandVerfahren(examplePayload);
    expect(store.standVerfahren).toEqual(examplePayload);
  });

  it("setStatusAbfrage updates statusAbfrage correctly", () => {
    const store = useLookupStore();
    store.setStatusAbfrage(examplePayload);
    expect(store.statusAbfrage).toEqual(examplePayload);
  });

  it("setWesentlicheRechtsgrundlageBauleitplanverfahren updates wesentlicheRechtsgrundlageBauleitplanverfahren correctly", () => {
    const store = useLookupStore();
    store.setWesentlicheRechtsgrundlageBauleitplanverfahren(examplePayload);
    expect(store.wesentlicheRechtsgrundlageBauleitplanverfahren).toEqual(examplePayload);
  });

  it("setWesentlicheRechtsgrundlageBaugenehmigungsverfahren updates wesentlicheRechtsgrundlageBaugenehmigungsverfahren correctly", () => {
    const store = useLookupStore();
    store.setWesentlicheRechtsgrundlageBaugenehmigungsverfahren(examplePayload);
    expect(store.wesentlicheRechtsgrundlageBaugenehmigungsverfahren).toEqual(examplePayload);
  });

  it("setWesentlicheRechtsgrundlage updates wesentlicheRechtsgrundlage correctly", () => {
    const store = useLookupStore();
    store.setWesentlicheRechtsgrundlage(examplePayload);
    expect(store.wesentlicheRechtsgrundlage).toEqual(examplePayload);
  });

  it("setArtBaulicheNutzung updates artBaulicheNutzung correctly", () => {
    const store = useLookupStore();
    store.setArtBaulicheNutzung(examplePayload);
    expect(store.artBaulicheNutzung).toEqual(examplePayload);
  });

  it("setArtBaulicheNutzungBauvorhaben updates artBaulicheNutzungBauvorhaben correctly", () => {
    const store = useLookupStore();
    store.setArtBaulicheNutzungBauvorhaben(examplePayload);
    expect(store.artBaulicheNutzungBauvorhaben).toEqual(examplePayload);
  });

  it("setStatusInfrastruktureinrichtung updates statusInfrastruktureinrichtung correctly", () => {
    const store = useLookupStore();
    store.setStatusInfrastruktureinrichtung(examplePayload);
    expect(store.statusInfrastruktureinrichtung).toEqual(examplePayload);
  });

  it("setEinrichtungstraeger updates einrichtungstraeger correctly", () => {
    const store = useLookupStore();
    store.setEinrichtungstraeger(examplePayload);
    expect(store.einrichtungstraeger).toEqual(examplePayload);
  });

  it("setEinrichtungstraegerSchulen updates einrichtungstraegerSchulen correctly", () => {
    const store = useLookupStore();
    store.setEinrichtungstraegerSchulen(examplePayload);
    expect(store.einrichtungstraegerSchulen).toEqual(examplePayload);
  });

  it("setInfrastruktureinrichtungTyp updates infrastruktureinrichtungTyp correctly", () => {
    const store = useLookupStore();
    store.setInfrastruktureinrichtungTyp(examplePayload);
    expect(store.infrastruktureinrichtungTyp).toEqual(examplePayload);
  });

  it("setArtGsNachmittagBetreuung updates artGsNachmittagBetreuung correctly", () => {
    const store = useLookupStore();
    store.setArtGsNachmittagBetreuung(examplePayload);
    expect(store.artGsNachmittagBetreuung).toEqual(examplePayload);
  });

  it("setSobonOrientierungswertJahr updates sobonOrientierungswertJahr correctly", () => {
    const store = useLookupStore();
    store.setSobonOrientierungswertJahr(examplePayload);
    expect(store.sobonOrientierungswertJahr).toEqual(examplePayload);
  });

  it("setSobonOrientierungswertJahrWithoutStandortabfrage updates sobonOrientierungswertJahrWithoutStandortabfrage correctly", () => {
    const store = useLookupStore();
    store.setSobonOrientierungswertJahrWithoutStandortabfrage(examplePayload);
    expect(store.sobonOrientierungswertJahrWithoutStandortabfrage).toEqual(examplePayload);
  });
});
