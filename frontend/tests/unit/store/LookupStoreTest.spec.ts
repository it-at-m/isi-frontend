import { describe, expect, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useLookupStore } from "../../../src/stores/LookupStore";
import { LookupEntryDto, LookupListDto } from "@/api/api-client/isi-backend";

function mockedLookupInititalize(): Promise<Response> {
  const examplePayload = { list: [{ key: "exampleKey", value: "exampleValue" }] } as LookupListDto;
  const lookupListResponse = {
    uncertainBoolean: examplePayload,
    artAbfrage: examplePayload,
    artDokument: examplePayload,
    artBaulicheNutzung: examplePayload,
    artBaulicheNutzungBauvorhaben: examplePayload,
    artGsNachmittagBetreuung: examplePayload,
    einrichtungstraeger: examplePayload,
    einrichtungstraegerSchulen: examplePayload,
    infrastruktureinrichtungTyp: examplePayload,
    sobonOrientierungswertJahr: examplePayload,
    sobonOrientierungswertJahrWithoutStandortabfrage: examplePayload,
    sobonVerfahrensgrundsaetzeJahr: examplePayload,
    standVerfahren: examplePayload,
    standVerfahrenBaugenehmigungsverfahren: examplePayload,
    standVerfahrenBauleitplanverfahren: examplePayload,
    standVerfahrenWeiteresVerfahren: examplePayload,
    statusAbfrage: examplePayload,
    statusInfrastruktureinrichtung: examplePayload,
    wesentlicheRechtsgrundlage: examplePayload,
    wesentlicheRechtsgrundlageBaugenehmigungsverfahren: examplePayload,
    wesentlicheRechtsgrundlageBauleitplanverfahren: examplePayload,
  };

  const json = JSON.stringify(lookupListResponse);
  const response = new Response(json);

  return Promise.resolve(response);
}

function mockedLookupInititalizeNullValue(): Promise<Response> {
  const lookupListResponse = {
    uncertainBoolean: null,
    artAbfrage: null,
    artDokument: null,
    artBaulicheNutzung: null,
    artBaulicheNutzungBauvorhaben: null,
    artGsNachmittagBetreuung: null,
    einrichtungstraeger: null,
    einrichtungstraegerSchulen: null,
    infrastruktureinrichtungTyp: null,
    sobonOrientierungswertJahr: null,
    sobonOrientierungswertJahrWithoutStandortabfrage: null,
    sobonVerfahrensgrundsaetzeJahr: null,
    standVerfahren: null,
    standVerfahrenBaugenehmigungsverfahren: null,
    standVerfahrenBauleitplanverfahren: null,
    standVerfahrenWeiteresVerfahren: null,
    statusAbfrage: null,
    statusInfrastruktureinrichtung: null,
    wesentlicheRechtsgrundlage: null,
    wesentlicheRechtsgrundlageBaugenehmigungsverfahren: null,
    wesentlicheRechtsgrundlageBauleitplanverfahren: null,
  };

  const json = JSON.stringify(lookupListResponse);
  const response = new Response(json);

  return Promise.resolve(response);
}

describe("Lookup Store Initialize", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.fn().mockReset();
  });

  it("initialize populates lookup lists correctly", async () => {
    const store = useLookupStore();
    global.fetch = vi.fn().mockResolvedValue(mockedLookupInititalize());

    await store.inititalize();

    expect(store.uncertainBoolean[0].key).toEqual("exampleKey");
    expect(store.uncertainBoolean[0].value).toEqual("exampleValue");

    expect(store.artAbfrage[0].key).toEqual("exampleKey");
    expect(store.artAbfrage[0].value).toEqual("exampleValue");

    expect(store.artDokument[0].key).toEqual("exampleKey");
    expect(store.artDokument[0].value).toEqual("exampleValue");

    expect(store.artBaulicheNutzung[0].key).toEqual("exampleKey");
    expect(store.artBaulicheNutzung[0].value).toEqual("exampleValue");

    expect(store.artBaulicheNutzungBauvorhaben[0].key).toEqual("exampleKey");
    expect(store.artBaulicheNutzungBauvorhaben[0].value).toEqual("exampleValue");

    expect(store.artGsNachmittagBetreuung[0].key).toEqual("exampleKey");
    expect(store.artGsNachmittagBetreuung[0].value).toEqual("exampleValue");

    expect(store.einrichtungstraeger[0].key).toEqual("exampleKey");
    expect(store.einrichtungstraeger[0].value).toEqual("exampleValue");

    expect(store.einrichtungstraegerSchulen[0].key).toEqual("exampleKey");
    expect(store.einrichtungstraegerSchulen[0].value).toEqual("exampleValue");

    expect(store.infrastruktureinrichtungTyp[0].key).toEqual("exampleKey");
    expect(store.infrastruktureinrichtungTyp[0].value).toEqual("exampleValue");

    expect(store.sobonOrientierungswertJahr[0].key).toEqual("exampleKey");
    expect(store.sobonOrientierungswertJahr[0].value).toEqual("exampleValue");

    expect(store.sobonOrientierungswertJahrWithoutStandortabfrage[0].key).toEqual("exampleKey");
    expect(store.sobonOrientierungswertJahrWithoutStandortabfrage[0].value).toEqual("exampleValue");

    expect(store.sobonVerfahrensgrundsaetzeJahr[0].key).toEqual("exampleKey");
    expect(store.sobonVerfahrensgrundsaetzeJahr[0].value).toEqual("exampleValue");

    expect(store.standVerfahren[0].key).toEqual("exampleKey");
    expect(store.standVerfahren[0].value).toEqual("exampleValue");

    expect(store.standVerfahrenBaugenehmigungsverfahren[0].key).toEqual("exampleKey");
    expect(store.standVerfahrenBaugenehmigungsverfahren[0].value).toEqual("exampleValue");

    expect(store.standVerfahrenBauleitplanverfahren[0].key).toEqual("exampleKey");
    expect(store.standVerfahrenBauleitplanverfahren[0].value).toEqual("exampleValue");

    expect(store.standVerfahrenWeiteresVerfahren[0].key).toEqual("exampleKey");
    expect(store.standVerfahrenWeiteresVerfahren[0].value).toEqual("exampleValue");

    expect(store.statusAbfrage[0].key).toEqual("exampleKey");
    expect(store.statusAbfrage[0].value).toEqual("exampleValue");

    expect(store.statusInfrastruktureinrichtung[0].key).toEqual("exampleKey");
    expect(store.statusInfrastruktureinrichtung[0].value).toEqual("exampleValue");

    expect(store.wesentlicheRechtsgrundlage[0].key).toEqual("exampleKey");
    expect(store.wesentlicheRechtsgrundlage[0].value).toEqual("exampleValue");

    expect(store.wesentlicheRechtsgrundlageBaugenehmigungsverfahren[0].key).toEqual("exampleKey");
    expect(store.wesentlicheRechtsgrundlageBaugenehmigungsverfahren[0].value).toEqual("exampleValue");

    expect(store.wesentlicheRechtsgrundlageBauleitplanverfahren[0].key).toEqual("exampleKey");
    expect(store.wesentlicheRechtsgrundlageBauleitplanverfahren[0].value).toEqual("exampleValue");
  });

  it("initialize populates lookup lists with null Value", async () => {
    const store = useLookupStore();
    global.fetch = vi.fn().mockResolvedValue(mockedLookupInititalizeNullValue());

    await store.inititalize();

    expect(store.uncertainBoolean).toEqual([]);
    expect(store.uncertainBoolean).toEqual([]);

    expect(store.artAbfrage).toEqual([]);
    expect(store.artAbfrage).toEqual([]);

    expect(store.artDokument).toEqual([]);
    expect(store.artDokument).toEqual([]);

    expect(store.artBaulicheNutzung).toEqual([]);
    expect(store.artBaulicheNutzung).toEqual([]);

    expect(store.artBaulicheNutzungBauvorhaben).toEqual([]);
    expect(store.artBaulicheNutzungBauvorhaben).toEqual([]);

    expect(store.artGsNachmittagBetreuung).toEqual([]);
    expect(store.artGsNachmittagBetreuung).toEqual([]);

    expect(store.einrichtungstraeger).toEqual([]);
    expect(store.einrichtungstraeger).toEqual([]);

    expect(store.einrichtungstraegerSchulen).toEqual([]);
    expect(store.einrichtungstraegerSchulen).toEqual([]);

    expect(store.infrastruktureinrichtungTyp).toEqual([]);
    expect(store.infrastruktureinrichtungTyp).toEqual([]);

    expect(store.sobonOrientierungswertJahr).toEqual([]);
    expect(store.sobonOrientierungswertJahr).toEqual([]);

    expect(store.sobonOrientierungswertJahrWithoutStandortabfrage).toEqual([]);
    expect(store.sobonOrientierungswertJahrWithoutStandortabfrage).toEqual([]);

    expect(store.sobonVerfahrensgrundsaetzeJahr).toEqual([]);
    expect(store.sobonVerfahrensgrundsaetzeJahr).toEqual([]);

    expect(store.standVerfahren).toEqual([]);
    expect(store.standVerfahren).toEqual([]);

    expect(store.standVerfahrenBaugenehmigungsverfahren).toEqual([]);
    expect(store.standVerfahrenBaugenehmigungsverfahren).toEqual([]);

    expect(store.standVerfahrenBauleitplanverfahren).toEqual([]);
    expect(store.standVerfahrenBauleitplanverfahren).toEqual([]);

    expect(store.standVerfahrenWeiteresVerfahren).toEqual([]);
    expect(store.standVerfahrenWeiteresVerfahren).toEqual([]);

    expect(store.statusAbfrage).toEqual([]);
    expect(store.statusAbfrage).toEqual([]);

    expect(store.statusInfrastruktureinrichtung).toEqual([]);
    expect(store.statusInfrastruktureinrichtung).toEqual([]);

    expect(store.wesentlicheRechtsgrundlage).toEqual([]);
    expect(store.wesentlicheRechtsgrundlage).toEqual([]);

    expect(store.wesentlicheRechtsgrundlageBaugenehmigungsverfahren).toEqual([]);
    expect(store.wesentlicheRechtsgrundlageBaugenehmigungsverfahren).toEqual([]);

    expect(store.wesentlicheRechtsgrundlageBauleitplanverfahren).toEqual([]);
    expect(store.wesentlicheRechtsgrundlageBauleitplanverfahren).toEqual([]);
  });
});

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
