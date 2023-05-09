import {} from "module";
import { AbfragevarianteDtoPlanungsrechtEnum } from "@/api/api-client/isi-backend";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import { createInfrastrukturabfrageDto, createAbfragevarianteDto } from "@/utils/Factories";

describe("ModelTest.spec.ts", () => {
  test("Test InfrastrukturabfrageModel", () => {
    const dto = createInfrastrukturabfrageDto();
    expect(dto.abfrage.adresse).not.toBeNull();
    expect(dto.abfragevarianten).toHaveLength(0);
    const model = new InfrastrukturabfrageModel(dto);
    expect(model.abfrage.adresse).not.toBeNull();
    expect(dto.abfrage.verortung).toBeUndefined();
  });

  test("Test AbfragevarianteModel", () => {
    const abfrageDto = createInfrastrukturabfrageDto();
    const abfragevarianteDto = createAbfragevarianteDto();
    abfragevarianteDto.abfragevariantenNr = 1;
    abfragevarianteDto.planungsrecht = AbfragevarianteDtoPlanungsrechtEnum.NachverdBaurechtsausschoepfung;
    abfragevarianteDto.realisierungVon = 2022;
    abfragevarianteDto.realisierungBis = 2023;
    abfragevarianteDto.geschossflaecheWohnen = 123.45;
    abfragevarianteDto.geschossflaecheWohnenFestgesetzt = 0.9;
    abfragevarianteDto.anzahlWeBaurechtlichGenehmigt = 120;
    abfragevarianteDto.anzahlWeBaurechtlichFestgesetzt = 2;
    abfragevarianteDto.anzahlWeBaurechtlichGenehmigt = 2;
    abfrageDto.abfragevarianten?.push(abfragevarianteDto);
    const abfrageModel = new InfrastrukturabfrageModel(abfrageDto);
    expect(abfrageModel.abfragevarianten).toHaveLength(1);
    const abfragevarianteModel = abfrageModel.abfragevarianten?.[0] as AbfragevarianteModel;
    expect(abfragevarianteModel).not.toBeUndefined();
    expect(abfragevarianteModel.planungsrecht).toEqual(
      AbfragevarianteDtoPlanungsrechtEnum.NachverdBaurechtsausschoepfung
    );
  });
});
