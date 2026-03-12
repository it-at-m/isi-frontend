import { beforeEach, describe, expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useStammdatenStore } from "@/stores/StammdatenStore";

describe("Stammdaten Store Setter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test("setFoerdermixStammdaten updates foerdermixStammdaten correctly", () => {
    const foerdermixStamm = [{ id: "1234", foerdermix: { bezeichnungJahr: "Sobon", bezeichnung: "Test" }, version: 1 }];
    const store = useStammdatenStore();
    store.setFoerdermixStammdaten(foerdermixStamm);
    expect(store.foerdermixStammdaten).toEqual(foerdermixStamm);
  });

  test("setFileInformation updates fileInformation correctly", () => {
    const fileStamm = {
      maxNumberOfFiles: 100,
      maxFileSizeBytes: 500,
      allowedMimeTypes: [".pdf", ".docx"],
    };
    const store = useStammdatenStore();
    store.setFileInformation(fileStamm);
    expect(store.fileInformation).toEqual(fileStamm);
  });
});
