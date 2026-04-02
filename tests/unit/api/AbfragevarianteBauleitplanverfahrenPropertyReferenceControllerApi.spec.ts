import { describe, expect, test } from "vitest";
import { AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi } from "@/api/api-client/isi-backend/apis/AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi";
import * as runtime from "@/api/api-client/isi-backend/runtime";

const BASE = "/abfragevarianteBauleitplanverfahrens";
const BEDARFS_ABFRAGEERSTELLER = "bedarfsmeldungDokumenteAbfrageersteller";
const BEDARFS_FACHREFERATE = "bedarfsmeldungDokumenteFachreferate";
const DOKUMENTE = "dokumente";

const mockCollectionModelObject = { links: [] };

describe("AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi - RequestOpts", () => {
  let api: AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi;

  test("can be instantiated with default config", () => {
    api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
    expect(api).toBeInstanceOf(AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi);
  });

  // --- PATCH endpoints ---

  describe("createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatchRequestOpts({
        id: "test-id-1",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/test-id-1/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("PATCH");
    });

    test("URL-encodes special characters in id", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatchRequestOpts({
        id: "id/with spaces",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/id%2Fwith%20spaces/${BEDARFS_ABFRAGEERSTELLER}`);
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatchRequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when collectionModelObject is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatchRequestOpts({
          id: "some-id",
          collectionModelObject: null as unknown as runtime.CollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("sets Content-Type header to application/json", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatchRequestOpts({
        id: "abc",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.headers?.["Content-Type"]).toBe("application/json");
    });
  });

  describe("createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch1 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch1RequestOpts({
        id: "test-id-2",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/test-id-2/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("PATCH");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch1RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when collectionModelObject is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch1RequestOpts({
          id: "abc",
          collectionModelObject: null as unknown as runtime.CollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch2 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch2RequestOpts({
        id: "test-id-3",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/test-id-3/${DOKUMENTE}`);
      expect(opts.method).toBe("PATCH");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch2RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- PUT endpoints ---

  describe("createPropertyReferenceAbfragevariantebauleitplanverfahrenPut (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPutRequestOpts({
        id: "put-id",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/put-id/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("PUT");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPutRequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when collectionModelObject is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPutRequestOpts({
          id: "some-id",
          collectionModelObject: null as unknown as runtime.CollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("createPropertyReferenceAbfragevariantebauleitplanverfahrenPut1 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut1RequestOpts({
        id: "put1-id",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/put1-id/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("PUT");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut1RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("createPropertyReferenceAbfragevariantebauleitplanverfahrenPut2 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut2RequestOpts({
        id: "put2-id",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/put2-id/${DOKUMENTE}`);
      expect(opts.method).toBe("PUT");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut2RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- DELETE (collection) endpoints ---

  describe("deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDeleteRequestOpts({
        id: "del-id",
      });
      expect(opts.path).toBe(`${BASE}/del-id/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDeleteRequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1RequestOpts({
        id: "del1-id",
      });
      expect(opts.path).toBe(`${BASE}/del1-id/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2RequestOpts({
        id: "del2-id",
      });
      expect(opts.path).toBe(`${BASE}/del2-id/${DOKUMENTE}`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- DELETE (by propertyId) endpoints ---

  describe("deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete (bedarfsmeldungDokumenteAbfrageersteller/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDeleteRequestOpts({
        id: "res-id",
        propertyId: "prop-id",
      });
      expect(opts.path).toBe(`${BASE}/res-id/${BEDARFS_ABFRAGEERSTELLER}/prop-id`);
      expect(opts.method).toBe("DELETE");
    });

    test("URL-encodes propertyId", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDeleteRequestOpts({
        id: "id-1",
        propertyId: "prop/id with spaces",
      });
      expect(opts.path).toBe(`${BASE}/id-1/${BEDARFS_ABFRAGEERSTELLER}/prop%2Fid%20with%20spaces`);
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDeleteRequestOpts({
          id: null as unknown as string,
          propertyId: "prop-id",
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDeleteRequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1 (bedarfsmeldungDokumenteFachreferate/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1RequestOpts({
        id: "res-id",
        propertyId: "prop-id",
      });
      expect(opts.path).toBe(`${BASE}/res-id/${BEDARFS_FACHREFERATE}/prop-id`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2 (dokumente/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2RequestOpts({
        id: "res-id",
        propertyId: "prop-id",
      });
      expect(opts.path).toBe(`${BASE}/res-id/${DOKUMENTE}/prop-id`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2RequestOpts({
          id: null as unknown as string,
          propertyId: "prop-id",
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- GET endpoints ---

  describe("followPropertyReferenceAbfragevariantebauleitplanverfahrenGet (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method - now points to bedarfsmeldungDokumenteAbfrageersteller", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGetRequestOpts({
        id: "get-id",
      });
      expect(opts.path).toBe(`${BASE}/get-id/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGetRequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebauleitplanverfahrenGet1 (bedarfsmeldungDokumenteAbfrageersteller/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet1RequestOpts({
        id: "get1-id",
        propertyId: "prop1-id",
      });
      expect(opts.path).toBe(`${BASE}/get1-id/${BEDARFS_ABFRAGEERSTELLER}/prop1-id`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet1RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebauleitplanverfahrenGet2 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet2RequestOpts({
        id: "get2-id",
      });
      expect(opts.path).toBe(`${BASE}/get2-id/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet2RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebauleitplanverfahrenGet3 (bedarfsmeldungDokumenteFachreferate/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet3RequestOpts({
        id: "get3-id",
        propertyId: "prop3-id",
      });
      expect(opts.path).toBe(`${BASE}/get3-id/${BEDARFS_FACHREFERATE}/prop3-id`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet3RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebauleitplanverfahrenGet4 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet4RequestOpts({
        id: "get4-id",
      });
      expect(opts.path).toBe(`${BASE}/get4-id/${DOKUMENTE}`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet4RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebauleitplanverfahrenGet5 (dokumente/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet5RequestOpts({
        id: "get5-id",
        propertyId: "prop5-id",
      });
      expect(opts.path).toBe(`${BASE}/get5-id/${DOKUMENTE}/prop5-id`);
      expect(opts.method).toBe("GET");
    });

    test("URL-encodes id and propertyId in Get5", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet5RequestOpts({
        id: "id with space",
        propertyId: "prop&id",
      });
      expect(opts.path).toBe(`${BASE}/id%20with%20space/${DOKUMENTE}/prop%26id`);
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet5RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // Regression: verify new endpoint methods exist
  describe("New endpoint methods exist (regression for PR additions)", () => {
    test("all new Patch/Put/Delete/Get variant methods are defined", () => {
      api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();
      expect(typeof api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch1).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch2).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut1).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut2).toBe("function");
      expect(typeof api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1).toBe("function");
      expect(typeof api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2).toBe("function");
      expect(typeof api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1).toBe("function");
      expect(typeof api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2).toBe("function");
      expect(typeof api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet2).toBe("function");
      expect(typeof api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet3).toBe("function");
      expect(typeof api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet4).toBe("function");
      expect(typeof api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet5).toBe("function");
    });
  });
});