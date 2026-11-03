import { describe, expect, test } from "vitest";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import {
  findFaultInAbfrageForEntwurf,
  findFaultInAbfrageForSave,
  findFaultInBaurate,
  findFaultInBauleitplanverfahrenForSave,
} from "@/utils/Validators";
import { UncertainBoolean } from "@/api/api-client/isi-backend";
import type BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import {
  createAbfragevarianteBauleitplanverfahrenDto,
  createBauabschnittDto,
  createBauleitplanverfahrenDto,
} from "@/utils/Factories";

function createEntwurf(): BauleitplanverfahrenModel {
  return { ...createBauleitplanverfahrenDto(), name: "Entwurf" } as BauleitplanverfahrenModel;
}

const ENTWEDER_ODER_FEHLERMELDUNG =
  "Bitte 'Start 4.2-Verfahren' angeben oder 'Datum unbekannt / nicht zutreffend' ankreuzen";

describe("Validators Test", () => {
  test("should findFaultInAbfrageForEntwurf allow Entwurf without Pflichtangaben", () => {
    const entwurf = createEntwurf();
    expect(findFaultInAbfrageForEntwurf(entwurf)).toBeNull();

    // Abfragevariante ohne Pflichtangaben
    entwurf.abfragevariantenBauleitplanverfahren?.push(createAbfragevarianteBauleitplanverfahrenDto());
    expect(findFaultInAbfrageForEntwurf(entwurf)).toBeNull();

    // Die Pflichtangaben werden weiterhin vor dem Statusübergang geprüft
    expect(findFaultInAbfrageForSave(entwurf)).not.toBeNull();
  });

  test("should findFaultInAbfrageForEntwurf require Name der Abfrage", () => {
    const entwurf = createEntwurf();
    entwurf.name = "  ";
    expect(findFaultInAbfrageForEntwurf(entwurf)).toBe("Der Name der Abfrage ist anzugeben.");

    entwurf.name = "a".repeat(71);
    expect(findFaultInAbfrageForEntwurf(entwurf)).toBe("Der Name der Abfrage ist zu lang.");
  });

  test("should findFaultInAbfrageForEntwurf allow at most five Abfragevarianten", () => {
    const entwurf = createEntwurf();
    entwurf.abfragevariantenBauleitplanverfahren = Array.from({ length: 6 }, () =>
      createAbfragevarianteBauleitplanverfahrenDto(),
    );
    expect(findFaultInAbfrageForEntwurf(entwurf)).toBe(
      "Die Abfrageerstellung kann maximal fünf Abfragevarianten erstellen.",
    );
  });

  test("should findFaultInAbfrageForEntwurf check Bauabschnitte", () => {
    const entwurf = createEntwurf();
    const abfragevariante = createAbfragevarianteBauleitplanverfahrenDto();
    abfragevariante.bauabschnitte = [{ ...createBauabschnittDto(), bezeichnung: "Bauabschnitt 1" }];
    entwurf.abfragevariantenBauleitplanverfahren = [abfragevariante];
    expect(findFaultInAbfrageForEntwurf(entwurf)).toBe("Die Baugebiete sind anzugeben.");
  });

  test("should findFaultInBauleitplanverfahrenForSave enforce Start42Verfahren entweder-oder Regel", () => {
    const abfrage = {
      sobonRelevant: UncertainBoolean.False,
      mitzeichnungBeschlussentwurf: UncertainBoolean.False,
      sobonJahr: undefined,
      start42Verfahren: undefined,
      start42VerfahrenDatumUnbekannt: false,
    } as BauleitplanverfahrenModel;

    // Weder Datum noch Tickbox gesetzt -> Fehler
    expect(findFaultInBauleitplanverfahrenForSave(abfrage)).toBe(ENTWEDER_ODER_FEHLERMELDUNG);

    // Nur Tickbox gesetzt -> kein Fehler bzgl. der entweder-oder Regel
    abfrage.start42VerfahrenDatumUnbekannt = true;
    expect(findFaultInBauleitplanverfahrenForSave(abfrage)).not.toBe(ENTWEDER_ODER_FEHLERMELDUNG);

    // Nur Datum gesetzt -> kein Fehler bzgl. der entweder-oder Regel
    abfrage.start42VerfahrenDatumUnbekannt = false;
    abfrage.start42Verfahren = new Date(2026, 2, 1);
    expect(findFaultInBauleitplanverfahrenForSave(abfrage)).not.toBe(ENTWEDER_ODER_FEHLERMELDUNG);

    // Beides gesetzt -> Fehler
    abfrage.start42VerfahrenDatumUnbekannt = true;
    expect(findFaultInBauleitplanverfahrenForSave(abfrage)).toBe(ENTWEDER_ODER_FEHLERMELDUNG);
  });

  test("should findFaultInBaurate", () => {
    const baurate = new BaurateModel({
      jahr: 2002,
      weGeplant: 50,
      gfWohnenGeplant: 50,
      foerdermix: {
        foerderarten: [
          { bezeichnung: "Baugemeinschaften", anteilProzent: 10 },
          { bezeichnung: "EinUndZweifamilienhaeuser", anteilProzent: 10 },
          { bezeichnung: "FreifinanzierterGeschosswohnungsbau", anteilProzent: 10 },
          { bezeichnung: "GefoerderterMietwohnungsbau", anteilProzent: 10 },
          { bezeichnung: "KonzeptionellerMietwohnungsbau", anteilProzent: 10 },
          { bezeichnung: "MuenchenModell", anteilProzent: 10 },
          { bezeichnung: "PreisgedaempfterMietwohnungsbau", anteilProzent: 50 },
        ],
      },
    });

    const foerdermixErrorAbove = findFaultInBaurate(baurate);

    expect(foerdermixErrorAbove).toBe("Fördermix Gesamtanteil in Baurate 2002 ist über 100 %");

    const anteilPreisgedaempfterMietwohnungsbau = baurate.foerdermix.foerderarten?.find(
      (item) => item.bezeichnung === "PreisgedaempfterMietwohnungsbau",
    );

    if (anteilPreisgedaempfterMietwohnungsbau !== undefined) {
      anteilPreisgedaempfterMietwohnungsbau.anteilProzent = 30;
    }

    const foerdermixErrorBelow = findFaultInBaurate(baurate);

    expect(foerdermixErrorBelow).toBe("Fördermix Gesamtanteil in Baurate 2002 ist unter 100 %");
  });
});
