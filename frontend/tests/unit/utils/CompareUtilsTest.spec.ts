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
      anteilFreifinanzierterGeschosswohnungsbau: 20,
      anteilGefoerderterMietwohnungsbau: 20,
      anteilMuenchenModell: 20,
      anteilPreisgedaempfterMietwohnungsbau: 20,
      anteilKonzeptionellerMietwohnungsbau: 10,
      anteilBaugemeinschaften: 5,
      anteilEinUndZweifamilienhaeuser: 5
    } as FoerdermixDto);

    foerdermixStaemme = [];

    foerdermixStamm = new FoerdermixStammModel({
      bezeichnung: "Testwert",
      bezeichnungJahr: "Test",
      foerdermix: {
        anteilFreifinanzierterGeschosswohnungsbau: 20,
        anteilGefoerderterMietwohnungsbau: 20,
        anteilMuenchenModell: 20,
        anteilPreisgedaempfterMietwohnungsbau: 20,
        anteilKonzeptionellerMietwohnungsbau: 10,
        anteilBaugemeinschaften: 5,
        anteilEinUndZweifamilienhaeuser: 5
      }
    } as FoerdermixStammDto);
  });

  it("should match FoerdermixStammdatum", () => {
    foerdermixStaemme.push(foerdermixStamm);

    const ergebnis = matchFoerdermixStammDaten(foerdermix, foerdermixStaemme);

    expect(ergebnis.bezeichnung).toBe("Testwert");
  });

  it("should not match FoerdermixStammdatum", () => {
    foerdermixStamm.foerdermix.anteilBaugemeinschaften = 10;
    foerdermixStaemme.push(foerdermixStamm);

    const ergebnis = matchFoerdermixStammDaten(foerdermix, foerdermixStaemme);

    expect(ergebnis.bezeichnung).toBe("Freie Eingabe");
  });
});
