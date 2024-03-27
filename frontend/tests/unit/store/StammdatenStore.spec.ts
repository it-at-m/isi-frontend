import { describe, expect, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useStammdatenStore } from "@/stores/StammdatenStore";
import { FileInformationDto, FoerdermixStammDto } from "@/api/api-client/isi-backend";

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
