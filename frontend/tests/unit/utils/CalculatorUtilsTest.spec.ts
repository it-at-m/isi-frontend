import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { FoerdermixDto } from "@/api/api-client/isi-backend";
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
    } as FoerdermixDto);
  });

  it("should add 100", async function () {
    const ergebnis = addiereAnteile(foerdermix);

    expect(ergebnis).toBe(100);

    // @ts-ignore
    foerdermix.foerderarten[0].anteilProzent = 40;

    const ergebnis2 = addiereAnteile(foerdermix);

    expect(ergebnis2).toBe(130);
  });

  it("should return 0 when undefined", async function () {
    const foerdermix = new FoerdermixModel({});
    const ergebnis = addiereAnteile(foerdermix);
    expect(ergebnis).toBe(0);
  });
});
