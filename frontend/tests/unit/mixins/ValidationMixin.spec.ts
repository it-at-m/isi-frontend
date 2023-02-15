import { BaurateDto, FoerdermixDto } from "@/api/api-client/isi-backend";
import ValidatorMixin from "@/mixins/validation/ValidatorMixin";
import BaurateModel from "@/types/model/bauraten/BaurateModel";

describe("ValidatorMixin Test", () => {
  const validationMixin = new ValidatorMixin();

  it("should findFaultInBaurate", () => {
    const baurate = new BaurateModel({
      jahr: 2002,
      anzahlWeGeplant: 50,
      geschossflaecheWohnenGeplant: 50,
      foerdermix: {
        anteilBaugemeinschaften: 10,
        anteilEinUndZweifamilienhaeuser: 10,
        anteilFreifinanzierterGeschosswohnungsbau: 10,
        anteilGefoerderterMietwohnungsbau: 10,
        anteilKonzeptionellerMietwohnungsbau: 10,
        anteilMuenchenModell: 10,
        anteilPreisgedaempfterMietwohnungsbau: 50
      } as FoerdermixDto
    } as BaurateDto);

    baurate.anzahlWeGeplant = undefined;

    const anzahlWeFehler = validationMixin.findFaultInBaurate(baurate);

    expect(anzahlWeFehler).toBe("Anzahl Wohnen geplant muss angegeben werden");

    baurate.anzahlWeGeplant = 50;
    baurate.geschossflaecheWohnenGeplant = undefined;

    const geschossflaecheWohnen = validationMixin.findFaultInBaurate(baurate);

    expect(geschossflaecheWohnen).toBe("Geschossfläche Wohnen geplant muss angegeben werden");

    baurate.geschossflaecheWohnenGeplant = 50;

    const foerdermixErrorAbove = validationMixin.findFaultInBaurate(baurate);
    
    expect(foerdermixErrorAbove).toBe("Fördermix Gesamtanteil ist über 100");

    baurate.foerdermix.anteilPreisgedaempfterMietwohnungsbau = 30;

    const foerdermixErrorBelow = validationMixin.findFaultInBaurate(baurate);

    expect(foerdermixErrorBelow).toBe("Fördermix Gesamtanteil ist unter 100");
  });
});
