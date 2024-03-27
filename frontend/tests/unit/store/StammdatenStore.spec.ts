import { describe, expect, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useStammdatenStore } from "@/stores/StammdatenStore";
import { FileInformationDto, FoerdermixStammDto } from "@/api/api-client/isi-backend";

function mockedInitializeFoerdermixStamm(): Promise<Response> {
  const foerdermixStamm = [
    { id: "1234", foerdermix: { bezeichnungJahr: "Sobon", bezeichnung: "Test" }, version: 1 },
  ] as FoerdermixStammDto[];

  const responseInit: ResponseInit = {
    status: 200, // OK
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const json = JSON.stringify(foerdermixStamm);
  const response = new Response(json, responseInit);

  return Promise.resolve(response);
}

function mockedInitializeFileStamm(): Promise<Response> {
  const fileStamm = {
    maxNumberOfFiles: 100,
    maxFileSizeBytes: 500,
    allowedMimeTypes: [".pdf", ".docx"],
  } as FileInformationDto;

  const responseInit: ResponseInit = {
    status: 200, // OK
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const json = JSON.stringify(fileStamm);
  const response = new Response(json, responseInit);

  return Promise.resolve(response);
}

describe("Stammdaten Store Initizalize", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initialize populates foerdermixstamm correctly", async () => {
    const store = useStammdatenStore();
    global.fetch = vi.fn(mockedInitializeFoerdermixStamm);

    await store.initializeFoerdermixStamm();

    expect(store.foerdermixStammdaten.length).toBe(1);
    expect(store.foerdermixStammdaten[0].id).toBe("1234");
    expect(store.foerdermixStammdaten[0].version).toBe(1);
    expect(store.foerdermixStammdaten[0].foerdermix.bezeichnung).toBe("Test");
    expect(store.foerdermixStammdaten[0].foerdermix.bezeichnungJahr).toBe("Sobon");
  });

  it("initialize populates filestamm correctly", async () => {
    const store = useStammdatenStore();
    global.fetch = vi.fn(mockedInitializeFileStamm);

    await store.initializeFileStamm();

    expect(store.fileInformation.maxFileSizeBytes).toBe(500);
    expect(store.fileInformation.maxNumberOfFiles).toBe(100);
    expect(store.fileInformation.allowedMimeTypes?.length).toBe(2);
  });
});

describe("Stammdaten Store Setter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("setFoerdermixStammdaten updates foerdermixStammdaten correctly", () => {
    const foerdermixStamm = [
      { id: "1234", foerdermix: { bezeichnungJahr: "Sobon", bezeichnung: "Test" }, version: 1 },
    ] as FoerdermixStammDto[];
    const store = useStammdatenStore();
    store.setFoerdermixStammdaten(foerdermixStamm);
    expect(store.foerdermixStammdaten).toEqual(foerdermixStamm);
  });

  it("setFileInformation updates fileInformation correctly", () => {
    const fileStamm = {
      maxNumberOfFiles: 100,
      maxFileSizeBytes: 500,
      allowedMimeTypes: [".pdf", ".docx"],
    } as FileInformationDto;
    const store = useStammdatenStore();
    store.setFileInformation(fileStamm);
    expect(store.fileInformation).toEqual(fileStamm);
  });
});
