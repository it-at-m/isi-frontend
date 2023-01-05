import { FoerdermixDto, UncertainBoolean } from "@/api/api-client";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";

describe("FieldValidationRulesMixin", () => {
  const rules = new FieldValidationRulesMixin().fieldValidationRules as any;

  it("should be required", () => {
    const theRule = (rules as any).pflichtfeld;
    const thisMessage = "Pflichtfeld";

    expect(theRule(null)).toBe(thisMessage);
    expect(theRule("")).toBe(thisMessage);
    expect(theRule("foo")).toBe(true);
  });

  it("should be required to not be null or undefined", () => {
    const theRule = (rules as any).pflichtfeldNotNil;
    const thisMessage = "Pflichtfeld";

    expect(theRule(undefined)).toBe(thisMessage);
    expect(theRule(null)).toBe(thisMessage);
    expect(theRule(false)).toBe(true);
    expect(theRule("")).toBe(true);
  });

  it("should be Letters", () => {
    const theRule = (rules as any).buchstaben;
    const thisMessage = "Nur Buchstaben erlaubt";

    expect(theRule(null)).toBe(true);
    expect(theRule("foo")).toBe(true);
    expect(theRule(12)).toBe(thisMessage);
    expect(theRule("1324")).toBe(thisMessage);
    expect(theRule(-1)).toBe(thisMessage);
    expect(theRule("foo!")).toBe(thisMessage);
  });

  it("should be min5 characters", () => {
    const theRule = (rules as any).min5;
    const thisMessage = "Mindestens fünf Zeichen benötigt";

    expect(theRule(null)).toBe(true);
    expect(theRule("1")).toBe(thisMessage);
    expect(theRule("12")).toBe(thisMessage);
    expect(theRule("123")).toBe(thisMessage);
    expect(theRule("1234")).toBe(thisMessage);
    expect(theRule("12345")).toBe(true);
  });

  it("should be a Hausnummer", () => {
    const theRule = (rules as any).hausnummer;
    const thisMessage = "Nur Buchstaben und Zahlen erlaubt";

    expect(theRule(null)).toBe(true);
    expect(theRule("1")).toBe(true);
    expect(theRule("a")).toBe(true);
    expect(theRule("1a")).toBe(true);
    expect(theRule(234)).toBe(true);
    expect(theRule("1!")).toBe(thisMessage);
  });

  it("should be correct Date Format", () => {
    const theRule = (rules as any).datum;
    const thisMessage = "Muss korrekt formatiert sein";

    expect(theRule(null)).toBe(true);
    expect(theRule("01.01.2000")).toBe(true);
    expect(theRule("2000-01-01")).toBe(thisMessage);
    expect(theRule("01-01-2000")).toBe(thisMessage);
    expect(theRule(12345)).toBe(thisMessage);
  });

  it("should not allow numbers smaller than min", () => {
    const theRule = (rules as any).min(0);
    const thisMessage = "Darf nicht kleiner als 0 sein";

    expect(theRule(-1)).toBe(thisMessage);
    expect(theRule(0)).toBe(true);
    expect(theRule(1)).toBe(true);
    expect(theRule(Number.NaN)).toBe(true);
  });

  it("should not allow numbers larger than max", () => {
    const theRule = (rules as any).max(0);
    const thisMessage = "Darf nicht größer als 0 sein";

    expect(theRule(1)).toBe(thisMessage);
    expect(theRule(0)).toBe(true);
    expect(theRule(-1)).toBe(true);
    expect(theRule(Number.NaN)).toBe(true);
  });

  it("should only allow digits", () => {
    const theRule = (rules as any).digits;
    const thisMessage = "Nur Ziffern erlaubt";

    expect(theRule(null)).toBe(true);
    expect(theRule(-1)).toBe(thisMessage);
    expect(theRule(1)).toBe(true);
    expect(theRule((0).toString())).toBe(true);
  });

  it("should be exactly 100", () => {
    const foerdermix = new FoerdermixModel(
      {
        anteilBaugemeinschaften: 10,
        anteilEinUndZweifamilienhaeuser: 10,
        anteilFreifinanzierterGeschosswohnungsbau: 10,
        anteilGefoerderterMietwohnungsbau: 10,
        anteilKonzeptionellerMietwohnungsbau: 10,
        anteilMuenchenModell: 10,
        anteilPreisgedaempfterMietwohnungsbau: 40
      } as FoerdermixDto
    );
    const theRule = (rules as any).nichtGleich100Prozent;

    const unter100Message = "Die Summe ist unter 100";
    const ueber100Message = "Die Summe ist über 100";

    expect(theRule(null)).toBe(false);
    expect(theRule(foerdermix)).toBe(true);

    foerdermix.anteilPreisgedaempfterMietwohnungsbau = 50;
    expect(theRule(foerdermix)).toBe(ueber100Message);

    foerdermix.anteilPreisgedaempfterMietwohnungsbau = 20;
    expect(theRule(foerdermix)).toBe(unter100Message);
  });

  it("should not be 'UNSPECIFIED'", () => {
    const theRule = (rules as any).notUnspecified;
    const thisMessage = "Pflichtfeld";

    expect(theRule(undefined)).toBe(thisMessage);
    expect(theRule(null)).toBe(thisMessage);
    expect(theRule(UncertainBoolean.Unspecified)).toBe(thisMessage);
    expect(theRule(UncertainBoolean.True)).toBe(true);
  });
});
