import { UncertainBoolean } from "@/api/api-client/isi-backend";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import {
  buchstaben,
  datum,
  digits,
  hausnummer,
  max,
  min,
  min5,
  nichtGleich100Prozent,
  notUnspecified,
  pflichtfeld,
  pflichtfeldMehrfachauswahl,
} from "@/utils/FieldValidationRules";

describe("FieldValidationRules", () => {
  it("should be required", () => {
    const theRule = pflichtfeld;
    const thisMessage = "Pflichtfeld";

    expect(theRule(undefined)).toBe(thisMessage);
    expect(theRule(null)).toBe(thisMessage);
    expect(theRule("")).toBe(thisMessage);
    expect(theRule("foo")).toBe(true);
  });

  it("should be required and not empty", () => {
    const theRule = pflichtfeldMehrfachauswahl;
    const thisMessage = "Pflichtfeld";

    expect(theRule(undefined)).toBe(thisMessage);
    expect(theRule(null)).toBe(thisMessage);
    expect(theRule([])).toBe(thisMessage);
    expect(theRule(["foo"])).toBe(true);
  });

  it("should be Letters", () => {
    const theRule = buchstaben;
    const thisMessage = "Nur Buchstaben erlaubt";

    expect(theRule(undefined)).toBe(true);
    expect(theRule(null)).toBe(true);
    expect(theRule("foo")).toBe(true);
    expect(theRule("1324")).toBe(thisMessage);
    expect(theRule("foo!")).toBe(thisMessage);
  });

  it("should be min5 characters", () => {
    const theRule = min5;
    const thisMessage = "Mindestens fünf Zeichen benötigt";

    expect(theRule(undefined)).toBe(true);
    expect(theRule(null)).toBe(true);
    expect(theRule("1")).toBe(thisMessage);
    expect(theRule("12")).toBe(thisMessage);
    expect(theRule("123")).toBe(thisMessage);
    expect(theRule("1234")).toBe(thisMessage);
    expect(theRule("12345")).toBe(true);
  });

  it("should be a Hausnummer", () => {
    const theRule = hausnummer;
    const thisMessage = "Nur Buchstaben und Zahlen erlaubt";

    expect(theRule(undefined)).toBe(true);
    expect(theRule(null)).toBe(true);
    expect(theRule("1")).toBe(true);
    expect(theRule("a")).toBe(true);
    expect(theRule("1a")).toBe(true);
    expect(theRule("1!")).toBe(thisMessage);
  });

  it("should be a correct date format", () => {
    const theRule = datum("DD.MM.YYYY");
    const thisMessage = "Muss korrekt formatiert sein";

    expect(theRule(undefined)).toBe(true);
    expect(theRule(null)).toBe(true);
    expect(theRule("01.01.2000")).toBe(true);
    expect(theRule("2000-01-01")).toBe(thisMessage);
    expect(theRule("01-01-2000")).toBe(thisMessage);
  });

  it("should not allow numbers smaller than min", () => {
    const theRule = min(0);
    const thisMessage = "Darf nicht kleiner als 0 sein";

    expect(theRule(undefined)).toBe(true);
    expect(theRule(null)).toBe(true);
    expect(theRule("-1")).toBe(thisMessage);
    expect(theRule("0")).toBe(true);
    expect(theRule("1")).toBe(true);
    expect(theRule("")).toBe(true);
  });

  it("should not allow numbers larger than max", () => {
    const theRule = max(0);
    const thisMessage = "Darf nicht größer als 0 sein";

    expect(theRule(undefined)).toBe(true);
    expect(theRule(null)).toBe(true);
    expect(theRule("1")).toBe(thisMessage);
    expect(theRule("0")).toBe(true);
    expect(theRule("-1")).toBe(true);
    expect(theRule("")).toBe(true);
  });

  it("should only allow digits", () => {
    const theRule = digits;
    const thisMessage = "Nur Ziffern erlaubt";

    expect(theRule(undefined)).toBe(true);
    expect(theRule(null)).toBe(true);
    expect(theRule("-1")).toBe(thisMessage);
    expect(theRule("1")).toBe(true);
    expect(theRule("0")).toBe(true);
  });

  it("should be exactly 100", () => {
    const foerdermix = new FoerdermixModel({
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
    const theRule = nichtGleich100Prozent;

    const unter100Message = "Die Summe ist unter 100";
    const ueber100Message = "Die Summe ist über 100";
    const otherMessage = "Es kann nicht summiert werden";

    expect(theRule(undefined)).toBe(otherMessage);
    expect(theRule(null)).toBe(otherMessage);
    expect(theRule(foerdermix)).toBe(true);

    if (foerdermix.foerderarten !== undefined) {
      const len = foerdermix.foerderarten.length;
      const f = foerdermix.foerderarten[len - 1];
      f.anteilProzent = 50;

      expect(theRule(foerdermix)).toBe(ueber100Message);

      f.anteilProzent = 20;
      expect(theRule(foerdermix)).toBe(unter100Message);
    }
  });

  it("should not be 'UNSPECIFIED'", () => {
    const theRule = notUnspecified;
    const thisMessage = "Pflichtfeld";

    expect(theRule(undefined)).toBe(thisMessage);
    expect(theRule(null)).toBe(thisMessage);
    expect(theRule(UncertainBoolean.Unspecified)).toBe(thisMessage);
    expect(theRule(UncertainBoolean.True)).toBe(true);
  });
});
