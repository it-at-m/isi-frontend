import {
  AbfrageAngelegtDto,
  AbfragevarianteAngelegtDto,
  AbfragevarianteAngelegtDtoPlanungsrechtEnum,
  InfrastrukturabfrageAngelegtDto,
  AbfragevarianteDtoPlanungsrechtEnum,
  InfrastrukturabfrageDto,
} from "@/api/api-client/isi-backend";

export function mapToAbfrageerstellungInfrastrukturabfrageAngelegt(
  infrastrukturabfrageDto: InfrastrukturabfrageDto
): InfrastrukturabfrageAngelegtDto {
  const abfragevarianten = infrastrukturabfrageDto.abfragevarianten?.map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      abfragevariantenName: abfragevariante.abfragevariantenName as string,
      abfragevariantenNr: abfragevariante.abfragevariantenNr as number,
      planungsrecht: mapPlanungsRecht(abfragevariante.planungsrecht as AbfragevarianteDtoPlanungsrechtEnum),
      realisierungBis: abfragevariante.realisierungBis as number,
      realisierungVon: abfragevariante.realisierungVon as number,
      sonderwohnformen: abfragevariante.sonderwohnformen as boolean,
      anzahlWeBaurechtlichFestgesetzt: abfragevariante.anzahlWeBaurechtlichFestgesetzt,
      anzahlWeBaurechtlichGenehmigt: abfragevariante.anzahlWeBaurechtlichGenehmigt,
      bauabschnitte: abfragevariante.bauabschnitte,
      gesamtanzahlWe: abfragevariante.gesamtanzahlWe,
      geschossflaecheGenossenschaftlicheWohnungen: abfragevariante.geschossflaecheGenossenschaftlicheWohnungen,
      geschossflaecheSeniorenwohnungen: abfragevariante.geschossflaecheSeniorenwohnungen,
      geschossflaecheSonstiges: abfragevariante.geschossflaecheSonstiges,
      geschossflaecheStudentenwohnungen: abfragevariante.geschossflaecheStudentenwohnungen,
      geschossflaecheWohnen: abfragevariante.geschossflaecheWohnen,
      geschossflaecheWohnenBestandswohnbaurecht: abfragevariante.geschossflaecheWohnenBestandswohnbaurecht,
      geschossflaecheWohnenFestgesetzt: abfragevariante.geschossflaecheWohnenFestgesetzt,
      geschossflaecheWohnenGenehmigt: abfragevariante.geschossflaecheWohnenGenehmigt,
      geschossflaecheWohnenSoBoNursaechlich: abfragevariante.geschossflaecheWohnenSoBoNursaechlich,
    } as AbfragevarianteAngelegtDto;
  });

  return {
    abfrage: {
      fristStellungnahme: infrastrukturabfrageDto.abfrage?.fristStellungnahme,
      nameAbfrage: infrastrukturabfrageDto.abfrage?.nameAbfrage,
      standVorhaben: infrastrukturabfrageDto.abfrage?.standVorhaben,
      adresse: infrastrukturabfrageDto.abfrage?.adresse,
      verortung: infrastrukturabfrageDto.abfrage?.verortung,
      allgemeineOrtsangabe: infrastrukturabfrageDto.abfrage?.allgemeineOrtsangabe,
      anmerkung: infrastrukturabfrageDto.abfrage?.anmerkung,
      bauvorhaben: infrastrukturabfrageDto.abfrage?.bauvorhaben,
      bebauungsplannummer: infrastrukturabfrageDto.abfrage?.bebauungsplannummer,
      dokumente: infrastrukturabfrageDto.abfrage?.dokumente,
    } as AbfrageAngelegtDto,
    abfragevarianten: abfragevarianten,
    offiziellerVerfahrensschritt: infrastrukturabfrageDto.offiziellerVerfahrensschritt,
    sobonRelevant: infrastrukturabfrageDto.sobonRelevant,
    sobonJahr: infrastrukturabfrageDto.sobonJahr,
    aktenzeichenProLbk: infrastrukturabfrageDto.aktenzeichenProLbk,
    displayName: infrastrukturabfrageDto.displayName,
    id: infrastrukturabfrageDto.id,
    version: infrastrukturabfrageDto.version,
  } as InfrastrukturabfrageAngelegtDto;
}

function mapPlanungsRecht(
  abfragevariantePlanungsRecht: AbfragevarianteDtoPlanungsrechtEnum
): AbfragevarianteAngelegtDtoPlanungsrechtEnum {
  let enumValue: AbfragevarianteAngelegtDtoPlanungsrechtEnum = AbfragevarianteAngelegtDtoPlanungsrechtEnum.Unspecified;
  Object.values(AbfragevarianteAngelegtDtoPlanungsrechtEnum).forEach((value, index) => {
    if (value === abfragevariantePlanungsRecht) {
      enumValue = Object.values(AbfragevarianteAngelegtDtoPlanungsrechtEnum)[index];
    }
  });
  return enumValue;
}
