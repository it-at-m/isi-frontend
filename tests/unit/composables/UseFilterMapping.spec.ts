import { describe, test, expect } from "vitest";
import { mapBackendFilterToFrontend } from "@/composables/requests/filter/useFilterMapping";

// Beispiel-Frontend-Objekt (Template)
const frontendTemplate = {
  searchQuery: "",
  selectBauleitplanverfahren: false,
  selectBaugenehmigungsverfahren: false,
  selectWeiteresVerfahren: false,
  selectBauvorhaben: false,
  selectGrundschule: false,
  selectGsNachmittagBetreuung: false,
  selectHausFuerKinder: false,
  selectKindergarten: false,
  selectKinderkrippe: false,
  selectMittelschule: false,
  sortBy: "NAME",
  sortOrder: "ASC",
  page: 1,
  pageSize: 20,
  filterStadtbezirkNummer: [],
  filterKitaplanungsbereichKitaPlbT: [],
  filterGrundschulsprengelNummer: [],
  filterMittelschulsprengelNummer: [],
  filterRealisierungsbeginnVon: undefined,
  filterRealisierungsbeginnBis: undefined,
  filterNurEigeneAbfragen: undefined,
  filterStatusAbfrage: [],
  filterSobonRelevant: undefined,
  filterWeGesamtVon: undefined,
  filterWeGesamtBis: undefined,
  filterGfWohnenGeplantVon: undefined,
  filterGfWohnenGeplantBis: undefined,
  filterVerfahrensstand: [],
  filterInfrastruktureinrichtungStatus: [],
};

describe("mapBackendFilterToFrontend", () => {
  test("should map all direct fields", () => {
    const backend = {
      searchQuery: "Test",
      selectBauleitplanverfahren: true,
      selectBaugenehmigungsverfahren: true,
      selectWeiteresVerfahren: true,
      selectBauvorhaben: true,
      selectGrundschule: true,
      selectGsNachmittagBetreuung: true,
      selectHausFuerKinder: true,
      selectKindergarten: true,
      selectKinderkrippe: true,
      selectMittelschule: true,
      sortBy: "CREATED_DATE_TIME",
      sortOrder: "DESC",
      page: 2,
      pageSize: 50,
    };

    const mapped = mapBackendFilterToFrontend(backend, frontendTemplate);

    expect(mapped.searchQuery).toBe("Test");
    expect(mapped.selectBauleitplanverfahren).toBe(true);
    expect(mapped.selectBaugenehmigungsverfahren).toBe(true);
    expect(mapped.selectWeiteresVerfahren).toBe(true);
    expect(mapped.selectBauvorhaben).toBe(true);
    expect(mapped.selectGrundschule).toBe(true);
    expect(mapped.selectGsNachmittagBetreuung).toBe(true);
    expect(mapped.selectHausFuerKinder).toBe(true);
    expect(mapped.selectKindergarten).toBe(true);
    expect(mapped.selectKinderkrippe).toBe(true);
    expect(mapped.selectMittelschule).toBe(true);
    expect(mapped.sortBy).toBe("CREATED_DATE_TIME");
    expect(mapped.sortOrder).toBe("DESC");
    expect(mapped.page).toBe(2);
    expect(mapped.pageSize).toBe(50);
  });

  test("should map all filter fields", () => {
    const backend = {
      stadtbezirkNummer: ["1", "2"],
      kitaplanungsbereichKitaPlbT: ["A", "B"],
      grundschulsprengelNummer: [4, 5],
      mittelschulsprengelNummer: [7, 8],
      realisierungsbeginnVon: 2023,
      realisierungsbeginnBis: 2040,
      nurEigeneAbfragen: true,
      statusAbfrage: ["ANGELEGT", "UEBERMITTELT_ZUR_BEARBEITUNG"],
      sobonRelevant: "TRUE",
      weGesamtVon: 200,
      weGesamtBis: 400,
      gfWohnenGeplantVon: 2007,
      gfWohnenGeplantBis: 2009,
      verfahrensstand: ["INKRAFTGETRETEN_FOERDERMIXPLAN", "VORBEREITUNG_BAUGENEHMIGUNG"],
      infrastruktureinrichtungStatus: ["UNGESICHERTE_PLANUNG", "BESTAND"],
    };

    const mapped = mapBackendFilterToFrontend(backend, frontendTemplate);

    expect(mapped.filterStadtbezirkNummer).toEqual(["1", "2"]);
    expect(mapped.filterKitaplanungsbereichKitaPlbT).toEqual(["A", "B"]);
    expect(mapped.filterGrundschulsprengelNummer).toEqual([4, 5]);
    expect(mapped.filterMittelschulsprengelNummer).toEqual([7, 8]);
    expect(mapped.filterRealisierungsbeginnVon).toBe(2023);
    expect(mapped.filterRealisierungsbeginnBis).toBe(2040);
    expect(mapped.filterNurEigeneAbfragen).toBe(true);
    expect(mapped.filterStatusAbfrage).toEqual(["ANGELEGT", "UEBERMITTELT_ZUR_BEARBEITUNG"]);
    expect(mapped.filterSobonRelevant).toBe("TRUE");
    expect(mapped.filterWeGesamtVon).toBe(200);
    expect(mapped.filterWeGesamtBis).toBe(400);
    expect(mapped.filterGfWohnenGeplantVon).toBe(2007);
    expect(mapped.filterGfWohnenGeplantBis).toBe(2009);
    expect(mapped.filterVerfahrensstand).toEqual(["INKRAFTGETRETEN_FOERDERMIXPLAN", "VORBEREITUNG_BAUGENEHMIGUNG"]);
    expect(mapped.filterInfrastruktureinrichtungStatus).toEqual(["UNGESICHERTE_PLANUNG", "BESTAND"]);
  });

  test("should set undefined for missing fields", () => {
    const backend = {};
    const mapped = mapBackendFilterToFrontend(backend, frontendTemplate);

    Object.keys(frontendTemplate).forEach((key) => {
      expect(mapped[key]).toBeUndefined();
    });
  });
});
