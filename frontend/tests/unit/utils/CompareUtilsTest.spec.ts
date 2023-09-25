import { FoerdermixDto, FoerdermixStammDto } from "@/api/api-client/isi-backend";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import { matchFoerdermixStammDaten } from "@/utils/CompareUtil";

describe("CompareUtilTest.spec.ts", () => {
  let foerdermix!: FoerdermixModel;

  let foerdermixStaemme!: FoerdermixStammModel[];

  let foerdermixStamm!: FoerdermixStammModel;

  beforeEach(() => {
    foerdermix = new FoerdermixModel({
      foerderarten: [
        { bezeichnung: "Baugemeinschaften", anteilProzent: 20 },
        { bezeichnung: "EinUndZweifamilienhaeuser", anteilProzent: 20 },
        { bezeichnung: "FreifinanzierterGeschosswohnungsbau", anteilProzent: 20 },
        { bezeichnung: "GefoerderterMietwohnungsbau", anteilProzent: 20 },
        { bezeichnung: "KonzeptionellerMietwohnungsbau", anteilProzent: 10 },
        { bezeichnung: "MuenchenModell", anteilProzent: 5 },
        { bezeichnung: "PreisgedaempfterMietwohnungsbau", anteilProzent: 5 },
      ],
    } as FoerdermixDto);

    foerdermixStaemme = [];

    foerdermixStamm = new FoerdermixStammModel({
      bezeichnung: "Testwert",
      bezeichnungJahr: "Test",
      foerdermix: {
        foerderarten: [
          { bezeichnung: "Baugemeinschaften", anteilProzent: 20 },
          { bezeichnung: "EinUndZweifamilienhaeuser", anteilProzent: 20 },
          { bezeichnung: "FreifinanzierterGeschosswohnungsbau", anteilProzent: 20 },
          { bezeichnung: "GefoerderterMietwohnungsbau", anteilProzent: 20 },
          { bezeichnung: "KonzeptionellerMietwohnungsbau", anteilProzent: 10 },
          { bezeichnung: "MuenchenModell", anteilProzent: 5 },
          { bezeichnung: "PreisgedaempfterMietwohnungsbau", anteilProzent: 5 },
        ],
      },
    } as FoerdermixStammDto);
  });

  it("should match FoerdermixStammdatum", () => {
    foerdermixStaemme.push(foerdermixStamm);
    /*
    const ergebnis = matchFoerdermixStammDaten(foerdermix, foerdermixStaemme);

    expect(ergebnis.bezeichnung).toBe("Testwert");*/
  });

  it("should not match FoerdermixStammdatum", () => {
    let anteilPreisgedaempfterMietwohnungsbau = foerdermixStamm.foerdermix.foerderarten?.find(
      (item) => item.bezeichnung === "PreisgedaempfterMietwohnungsbau",
    );

    if (anteilPreisgedaempfterMietwohnungsbau !== undefined) {
      anteilPreisgedaempfterMietwohnungsbau.anteilProzent = 5;
    }

    foerdermixStaemme.push(foerdermixStamm);

    /*const ergebnis = matchFoerdermixStammDaten(foerdermix, foerdermixStaemme);

    expect(ergebnis.bezeichnung).toBe("Freie Eingabe");*/
  });
});
