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

    const foerdermixErrorAbove = validationMixin.findFaultInBaurate(baurate);

    expect(foerdermixErrorAbove).toBe("Fördermix Gesamtanteil in Baurate 2002 ist über 100 %");

    let anteilPreisgedaempfterMietwohnungsbau = baurate.foerdermix.foerderarten?.find(
      (item) => item.bezeichnung === "PreisgedaempfterMietwohnungsbau",
    );

    if (anteilPreisgedaempfterMietwohnungsbau !== undefined) {
      anteilPreisgedaempfterMietwohnungsbau.anteilProzent = 30;
    }

    const foerdermixErrorBelow = validationMixin.findFaultInBaurate(baurate);

    expect(foerdermixErrorBelow).toBe("Fördermix Gesamtanteil in Baurate 2002 ist unter 100 %");
  });
});
