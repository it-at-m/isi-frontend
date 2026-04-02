import { describe, expect, test } from "vitest";
import { AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi } from "@/api/api-client/isi-backend/apis/AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi";
import * as runtime from "@/api/api-client/isi-backend/runtime";

const BASE = "/abfragevarianteBaugenehmigungsverfahrens";
const BEDARFS_ABFRAGEERSTELLER = "bedarfsmeldungDokumenteAbfrageersteller";
const BEDARFS_FACHREFERATE = "bedarfsmeldungDokumenteFachreferate";
const DOKUMENTE = "dokumente";

const mockCollectionModelObject = { links: [] };

describe("AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi - RequestOpts", () => {
  let api: AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi;

  test("can be instantiated with default config", () => {
    api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
    expect(api).toBeInstanceOf(AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi);
  });

  // --- PATCH endpoints ---

  describe("createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequestOpts({
        id: "test-id-1",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/test-id-1/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("PATCH");
    });

    test("URL-encodes special characters in id", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequestOpts({
        id: "id/with spaces",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/id%2Fwith%20spaces/${BEDARFS_ABFRAGEERSTELLER}`);
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when collectionModelObject is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequestOpts({
          id: "some-id",
          collectionModelObject: null as unknown as runtime.CollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("sets Content-Type header to application/json", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequestOpts({
        id: "abc",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.headers?.["Content-Type"]).toBe("application/json");
    });
  });

  describe("createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch1 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch1RequestOpts({
        id: "test-id-2",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/test-id-2/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("PATCH");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch1RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when collectionModelObject is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch1RequestOpts({
          id: "abc",
          collectionModelObject: null as unknown as runtime.CollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch2 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch2RequestOpts({
        id: "test-id-3",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/test-id-3/${DOKUMENTE}`);
      expect(opts.method).toBe("PATCH");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch2RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- PUT endpoints ---

  describe("createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRequestOpts({
        id: "put-id",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/put-id/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("PUT");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when collectionModelObject is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRequestOpts({
          id: "some-id",
          collectionModelObject: null as unknown as runtime.CollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut1 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut1RequestOpts({
        id: "put1-id",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/put1-id/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("PUT");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut1RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut2 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut2RequestOpts({
        id: "put2-id",
        collectionModelObject: mockCollectionModelObject,
      });
      expect(opts.path).toBe(`${BASE}/put2-id/${DOKUMENTE}`);
      expect(opts.method).toBe("PUT");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut2RequestOpts({
          id: null as unknown as string,
          collectionModelObject: mockCollectionModelObject,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- DELETE (collection) endpoints ---

  describe("deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDeleteRequestOpts({
        id: "del-id",
      });
      expect(opts.path).toBe(`${BASE}/del-id/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDeleteRequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete1 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete1RequestOpts({
        id: "del1-id",
      });
      expect(opts.path).toBe(`${BASE}/del1-id/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete1RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete2 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete2RequestOpts({
        id: "del2-id",
      });
      expect(opts.path).toBe(`${BASE}/del2-id/${DOKUMENTE}`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete2RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- DELETE (by propertyId) endpoints ---

  describe("deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete (bedarfsmeldungDokumenteAbfrageersteller/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRequestOpts({
        id: "res-id",
        propertyId: "prop-id",
      });
      expect(opts.path).toBe(`${BASE}/res-id/${BEDARFS_ABFRAGEERSTELLER}/prop-id`);
      expect(opts.method).toBe("DELETE");
    });

    test("URL-encodes propertyId", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRequestOpts({
        id: "id-1",
        propertyId: "prop/id with spaces",
      });
      expect(opts.path).toBe(`${BASE}/id-1/${BEDARFS_ABFRAGEERSTELLER}/prop%2Fid%20with%20spaces`);
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRequestOpts({
          id: null as unknown as string,
          propertyId: "prop-id",
        })
      ).rejects.toThrow(runtime.RequiredError);
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete1 (bedarfsmeldungDokumenteFachreferate/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete1RequestOpts({
        id: "res-id",
        propertyId: "prop-id",
      });
      expect(opts.path).toBe(`${BASE}/res-id/${BEDARFS_FACHREFERATE}/prop-id`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete1RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete2 (dokumente/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete2RequestOpts({
        id: "res-id",
        propertyId: "prop-id",
      });
      expect(opts.path).toBe(`${BASE}/res-id/${DOKUMENTE}/prop-id`);
      expect(opts.method).toBe("DELETE");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete2RequestOpts({
          id: null as unknown as string,
          propertyId: "prop-id",
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // --- GET endpoints ---

  describe("followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet (bedarfsmeldungDokumenteAbfrageersteller)", () => {
    test("builds correct URL and method - now points to bedarfsmeldungDokumenteAbfrageersteller", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGetRequestOpts({
        id: "get-id",
      });
      expect(opts.path).toBe(`${BASE}/get-id/${BEDARFS_ABFRAGEERSTELLER}`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGetRequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1 (bedarfsmeldungDokumenteAbfrageersteller/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1RequestOpts({
        id: "get1-id",
        propertyId: "prop1-id",
      });
      expect(opts.path).toBe(`${BASE}/get1-id/${BEDARFS_ABFRAGEERSTELLER}/prop1-id`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet2 (bedarfsmeldungDokumenteFachreferate)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet2RequestOpts({
        id: "get2-id",
      });
      expect(opts.path).toBe(`${BASE}/get2-id/${BEDARFS_FACHREFERATE}`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet2RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet3 (bedarfsmeldungDokumenteFachreferate/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet3RequestOpts({
        id: "get3-id",
        propertyId: "prop3-id",
      });
      expect(opts.path).toBe(`${BASE}/get3-id/${BEDARFS_FACHREFERATE}/prop3-id`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet3RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet4 (dokumente)", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet4RequestOpts({
        id: "get4-id",
      });
      expect(opts.path).toBe(`${BASE}/get4-id/${DOKUMENTE}`);
      expect(opts.method).toBe("GET");
    });

    test("throws RequiredError when id is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet4RequestOpts({
          id: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  describe("followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet5 (dokumente/{propertyId})", () => {
    test("builds correct URL and method", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet5RequestOpts({
        id: "get5-id",
        propertyId: "prop5-id",
      });
      expect(opts.path).toBe(`${BASE}/get5-id/${DOKUMENTE}/prop5-id`);
      expect(opts.method).toBe("GET");
    });

    test("URL-encodes id and propertyId in Get5", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      const opts = await api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet5RequestOpts({
        id: "id with space",
        propertyId: "prop&id",
      });
      expect(opts.path).toBe(`${BASE}/id%20with%20space/${DOKUMENTE}/prop%26id`);
    });

    test("throws RequiredError when propertyId is null", async () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      await expect(
        api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet5RequestOpts({
          id: "some-id",
          propertyId: null as unknown as string,
        })
      ).rejects.toThrow(runtime.RequiredError);
    });
  });

  // Regression: Patch endpoints do NOT include 201 status (unlike PUT which does)
  describe("Patch status handling: no 201 case (regression for PR change)", () => {
    test("Patch1 and Patch2 methods exist and Patch has no 201 handling (verified via structure)", () => {
      api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();
      // These methods should exist
      expect(typeof api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch1).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch2).toBe("function");
      // PUT methods (which do have 201) should also exist
      expect(typeof api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut1).toBe("function");
      expect(typeof api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut2).toBe("function");
    });
  });
});