import { afterEach, describe, expect, test, vi } from "vitest";
import type { InfrastruktureinrichtungDto } from "@/api/api-client/isi-backend";
import { useInfrastruktureinrichtungApi } from "@/composables/requests/InfrastruktureinrichtungApi";

vi.mock("@/composables/SaveLeave", () => ({
  useSaveLeave: () => ({ resetFormDirty: vi.fn() }),
}));

vi.mock("@/composables/requests/ErrorHandler", () => ({
  useErrorHandler: () => ({ handleError: (error: unknown) => error }),
}));

function createKindergarten(): InfrastruktureinrichtungDto {
  return {
    infrastruktureinrichtungTyp: "KINDERGARTEN",
    nameEinrichtung: "Test",
    anzahlKindergartenPlaetze: 10,
    anzahlKindergartenGruppen: 1,
    verortung: {
      stadtbezirke: new Set([{ nummer: "08", name: "Schwanthalerhöhe" }]),
      bezirksteile: new Set(),
      viertel: new Set(),
      gemarkungen: new Set(),
      kitaplanungsbereiche: new Set(),
      grundschulsprengel: new Set(),
      mittelschulsprengel: new Set(),
      point: { type: "Point", coordinates: [11.549078, 48.127491] },
    },
  } as unknown as InfrastruktureinrichtungDto;
}

function mockFetch() {
  const fetchMock = vi.fn(
    async (_url: RequestInfo | URL, init?: RequestInit) =>
      new Response(init?.body as string, { status: 200, headers: { "Content-Type": "application/json" } }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function sentVerortung(fetchMock: ReturnType<typeof mockFetch>) {
  const init = fetchMock.mock.calls[0][1] as RequestInit;
  return JSON.parse(init.body as string).verortung;
}

describe("InfrastruktureinrichtungApi", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("createInfrastruktureinrichtung sendet die Mengen der Verortung als Listen", async () => {
    const fetchMock = mockFetch();

    await useInfrastruktureinrichtungApi().createInfrastruktureinrichtung(createKindergarten());

    const verortung = sentVerortung(fetchMock);
    expect(verortung.stadtbezirke).toEqual([{ nummer: "08", name: "Schwanthalerhöhe" }]);
    expect(verortung.grundschulsprengel).toEqual([]);
    expect(verortung.mittelschulsprengel).toEqual([]);
  });

  test("updateInfrastruktureinrichtung sendet die Mengen der Verortung als Listen", async () => {
    const fetchMock = mockFetch();

    await useInfrastruktureinrichtungApi().updateInfrastruktureinrichtung(createKindergarten());

    const verortung = sentVerortung(fetchMock);
    expect(Array.isArray(verortung.stadtbezirke)).toBe(true);
    expect(Array.isArray(verortung.gemarkungen)).toBe(true);
  });
});
