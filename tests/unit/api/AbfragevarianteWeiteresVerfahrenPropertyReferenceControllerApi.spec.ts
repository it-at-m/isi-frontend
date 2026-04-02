import { describe, expect, test } from "vitest";
import { AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi } from "@/api/api-client/isi-backend/apis/AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi";
import * as runtime from "@/api/api-client/isi-backend/runtime";

const BASE = "/abfragevarianteWeiteresVerfahrens";
const BEDARFS_ABFRAGEERSTELLER = "bedarfsmeldungDokumenteAbfrageersteller";
const BEDARFS_FACHREFERATE = "bedarfsmeldungDokumenteFachreferate";
const DOKUMENTE = "dokumente";

const mockCollectionModelObject = { links: [] };

describe("AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi - RequestOpts", () => {
  let api: AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi;

  test("can be instantiated with default config", () => {
    api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
    expect(api).toBeInstanceOf(AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi);
  });

  // --- PATCH endpoints ---

  describe("createPropertyReferenceAbfragevarianteweiteresverfahrenPatch (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatchRequestOpts({
        id: "test-id-1",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/test-id-1/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("PATCH");
    });

    test("URL-encodes special characters in id", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatchRequestOpts({
        id: "id/with spaces",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/id%2Fwith%20spaces/${BEDARFS_ABFRAGEERSTELLER}`);
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatchRequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when collectionModelObject is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatchRequestOpts({
          id: "some-id",
          collectionModelObject: null as unknown as runtime.CollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("sets Content-Type header to application/json", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatchRequestOpts({
        id: "abc",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.headers?.["Content-Type"]).toBe("application/json");
    });
  });

  describe("createPropertyReferenceAbfragevarianteweiteresverfahrenPatch1 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch1RequestOpts({
        id: "test-id-2",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/test-id-2/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("PATCH");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch1RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when collectionModelObject is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch1RequestOpts({
          id: "abc",
          collectionModelObject: null as unknown as runtime.CollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("createPropertyReferenceAbfragevarianteweiteresverfahrenPatch2 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch2RequestOpts({
        id: "test-id-3",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/test-id-3/${DOKUMENTE}`);
      expect(opts.method).toBe("PATCH");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch2RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- PUT endpoints ---

  describe("createPropertyReferenceAbfragevarianteweiteresverfahrenPut (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPutRequestOpts({
        id: "put-id",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/put-id/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("PUT");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevarianteweiteresverfahrenPutRequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when collectionModelObject is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevarianteweiteresverfahrenPutRequestOpts({
          id: "some-id",
          collectionModelObject: null as unknown as runtime.CollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("createPropertyReferenceAbfragevarianteweiteresverfahrenPut1 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut1RequestOpts({
        id: "put1-id",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/put1-id/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("PUT");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut1RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("createPropertyReferenceAbfragevarianteweiteresverfahrenPut2 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut2RequestOpts({
        id: "put2-id",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/put2-id/${DOKUMENTE}`);
      expect(opts.method).toBe("PUT");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut2RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- DELETE (collection) endpoints ---

  describe("deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDeleteRequestOpts({
        id: "del-id",
      });
      expect(opts.path).toBe(`${BASE}/del-id/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDeleteRequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1RequestOpts({
        id: "del1-id",
      });
      expect(opts.path).toBe(`${BASE}/del1-id/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2RequestOpts({
        id: "del2-id",
      });
      expect(opts.path).toBe(`${BASE}/del2-id/${DOKUMENTE}`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- DELETE (by propertyId) endpoints ---

  describe("deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete (bedarfsmeldungDokumenteAbfrageersteller/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDeleteRequestOpts({
        id: "res-id",
        propertyId: "prop-id",
      });
      expect(opts.path).toBe(`${BASE}/res-id/${BEDARFS_ABFRAGEERSTELLER}/prop-id`);
      expect(opts.method).toBe("DELETE");
    });

    test("URL-encodes propertyId", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDeleteRequestOpts({
        id: "id-1",
        propertyId: "prop/id with spaces",
      });
      expect(opts.path).toBe(`${BASE}/id-1/${BEDARFS_ABFRAGEERSTELLER}/prop%2Fid%20with%20spaces`);
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDeleteRequestOpts({
          id: null as unknown as string,
          propertyId: "prop-id",
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDeleteRequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1 (bedarfsmeldungDokumenteFachreferate/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1RequestOpts({
        id: "res-id",
        propertyId: "prop-id",
      });
      expect(opts.path).toBe(`${BASE}/res-id/${BEDARFS_FACHREFERATE}/prop-id`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2 (dokumente/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2RequestOpts({
        id: "res-id",
        propertyId: "prop-id",
      });
      expect(opts.path).toBe(`${BASE}/res-id/${DOKUMENTE}/prop-id`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2RequestOpts({
          id: null as unknown as string,
          propertyId: "prop-id",
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- GET endpoints ---

  describe("followPropertyReferenceAbfragevarianteweiteresverfahrenGet (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method - now points to bedarfsmeldungDokumenteAbfrageersteller", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGetRequestOpts({
        id: "get-id",
      });
      expect(opts.path).toBe(`${BASE}/get-id/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevarianteweiteresverfahrenGetRequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevarianteweiteresverfahrenGet1 (bedarfsmeldungDokumenteAbfrageersteller/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet1RequestOpts({
        id: "get1-id",
        propertyId: "prop1-id",
      });
      expect(opts.path).toBe(`${BASE}/get1-id/${BEDARFS_ABFRAGEERSTELLER}/prop1-id`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet1RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevarianteweiteresverfahrenGet2 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet2RequestOpts({
        id: "get2-id",
      });
      expect(opts.path).toBe(`${BASE}/get2-id/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet2RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevarianteweiteresverfahrenGet3 (bedarfsmeldungDokumenteFachreferate/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet3RequestOpts({
        id: "get3-id",
        propertyId: "prop3-id",
      });
      expect(opts.path).toBe(`${BASE}/get3-id/${BEDARFS_FACHREFERATE}/prop3-id`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet3RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevarianteweiteresverfahrenGet4 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet4RequestOpts({
        id: "get4-id",
      });
      expect(opts.path).toBe(`${BASE}/get4-id/${DOKUMENTE}`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet4RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevarianteweiteresverfahrenGet5 (dokumente/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet5RequestOpts({
        id: "get5-id",
        propertyId: "prop5-id",
      });
      expect(opts.path).toBe(`${BASE}/get5-id/${DOKUMENTE}/prop5-id`);
      expect(opts.method).toBe("GET");
    });

    test("URL-encodes id and propertyId in Get5", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet5RequestOpts({
        id: "id with space",
        propertyId: "prop&id",
      });
      expect(opts.path).toBe(`${BASE}/id%20with%20space/${DOKUMENTE}/prop%26id`);
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet5RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // Regression: verify new endpoint methods exist
  describe("New endpoint methods exist (regression for PR additions)", () => {
    test("all new Patch/Put/Delete/Get variant methods are defined", () => {
      api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();
      expect(typeof api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch1).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch2).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut1).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut2).toBe("function");
      expect(typeof api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1).toBe("function");
      expect(typeof api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2).toBe("function");
      expect(typeof api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1).toBe("function");
      expect(typeof api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2).toBe("function");
      expect(typeof api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet2).toBe("function");
      expect(typeof api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet3).toBe("function");
      expect(typeof api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet4).toBe("function");
      expect(typeof api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet5).toBe("function");
    });
  });
});