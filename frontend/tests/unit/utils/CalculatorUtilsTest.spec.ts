import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { FoerdermixDto } from "@/api/api-client/isi-backend";
import { addiereAnteile } from "@/utils/CalculationUtil";

describe("CalculatorUtilsTest", () => {
  let value = new FoerdermixModel({});

  beforeEach(() => {
    value = new FoerdermixModel({
      anteilBaugemeinschaften: 10,
      anteilEinUndZweifamilienhaeuser: 10,
      anteilFreifinanzierterGeschosswohnungsbau: 10,
      anteilGefoerderterMietwohnungsbau: 10,
      anteilKonzeptionellerMietwohnungsbau: 10,
      anteilMuenchenModell: 10,
      anteilPreisgedaempfterMietwohnungsbau: 40,
    } as FoerdermixDto);
  });

  it("should add 100", async function () {
    const ergebnis = addiereAnteile(value);

    expect(ergebnis).toBe(100);

    value.anteilBaugemeinschaften = 40;

    const ergebnis2 = addiereAnteile(value);

    expect(ergebnis2).toBe(130);
  });

  it("should return 0 when undefined", async function () {
    const value = new FoerdermixModel({});
    const ergebnis = addiereAnteile(value);
    expect(ergebnis).toBe(0);
  });
});
