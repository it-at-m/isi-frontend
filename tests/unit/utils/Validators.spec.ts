import { describe, expect, test } from "vitest";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import { findFaultInBaurate, findFaultInBauleitplanverfahrenForSave } from "@/utils/Validators";
import { UncertainBoolean } from "@/api/api-client/isi-backend";
import type BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";

const ENTWEDER_ODER_FEHLERMELDUNG =
  "Bitte 'Start 4.2-Verfahren' angeben oder 'Datum unbekannt / nicht zutreffend' ankreuzen";

describe("Validators Test", () => {
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
