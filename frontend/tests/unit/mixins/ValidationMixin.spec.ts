import { BaurateDto, FoerdermixDto } from "@/api/api-client/isi-backend";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import BaurateModel from "@/types/model/bauraten/BaurateModel";

describe("ValidatorMixin Test", () => {
  const validationMixin = new ValidatorMixin();

  it("should findFaultInBaurate", () => {
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
      } as FoerdermixDto,
    } as BaurateDto);

    baurate.weGeplant = undefined;

    const anzahlWeFehler = validationMixin.findFaultInBaurate(baurate);

    expect(anzahlWeFehler).toBe("Anzahl Wohnen geplant muss angegeben werden");

    baurate.weGeplant = 50;
    baurate.gfWohnenGeplant = undefined;

    const geschossflaecheWohnen = validationMixin.findFaultInBaurate(baurate);

    expect(geschossflaecheWohnen).toBe("Geschossfläche Wohnen geplant muss angegeben werden");

    baurate.gfWohnenGeplant = 50;
    console.log("Test");
    const foerdermixErrorAbove = validationMixin.findFaultInBaurate(baurate);

    expect(foerdermixErrorAbove).toBe("Fördermix Gesamtanteil ist über 100");

    let anteilPreisgedaempfterMietwohnungsbau = baurate.foerdermix.foerderarten?.find(
      (item) => item.bezeichnung === "PreisgedaempfterMietwohnungsbau",
    );

    if (anteilPreisgedaempfterMietwohnungsbau !== undefined) {
      anteilPreisgedaempfterMietwohnungsbau.anteilProzent = 30;
    }

    const foerdermixErrorBelow = validationMixin.findFaultInBaurate(baurate);

    expect(foerdermixErrorBelow).toBe("Fördermix Gesamtanteil ist unter 100");
  });
});
