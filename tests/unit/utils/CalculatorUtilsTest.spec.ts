import { beforeEach, describe, expect, test } from "vitest";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { addiereAnteile } from "@/utils/CalculationUtil";

describe("CalculatorUtilsTest", () => {
  let foerdermix = new FoerdermixModel({});

  beforeEach(() => {
    foerdermix = new FoerdermixModel({
      foerderarten: [
        { bezeichnung: "Baugemeinschaften", anteilProzent: 10 },
        { bezeichnung: "EinUndZweifamilienhaeuser", anteilProzent: 10 },
        { bezeichnung: "FreifinanzierterGeschosswohnungsbau", anteilProzent: 10 },
        { bezeichnung: "GefoerderterMietwohnungsbau", anteilProzent: 10 },
        { bezeichnung: "KonzeptionellerMietwohnungsbau", anteilProzent: 10 },
        { bezeichnung: "MuenchenModell", anteilProzent: 10 },
        { bezeichnung: "PreisgedaempfterMietwohnungsbau", anteilProzent: 40 },
      ],
    });
  });

  test("should add 100", async function () {
    const ergebnis = addiereAnteile(foerdermix);

    expect(ergebnis).toBe(100);

    if (foerdermix.foerderarten !== undefined) {
      foerdermix.foerderarten[0].anteilProzent = 40;
    }

    const ergebnis2 = addiereAnteile(foerdermix);

    expect(ergebnis2).toBe(130);
  });

  test("should return 0 when undefined", async function () {
    const foerdermix = new FoerdermixModel({});
    const ergebnis = addiereAnteile(foerdermix);
    expect(ergebnis).toBe(0);
  });
});
