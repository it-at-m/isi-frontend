import {
  AbfrageAngelegtDto,
  AbfragevarianteAngelegtDto,
  AbfragevarianteAngelegtDtoPlanungsrechtEnum,
  InfrastrukturabfrageAngelegtDto,
  AbfragevarianteDtoPlanungsrechtEnum,
  InfrastrukturabfrageDto,
  InfrastrukturabfrageInBearbeitungSachbearbeitungDto,
  AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto,
  AbfragevarianteSachbearbeitungDto,
  BedarfsmeldungFachabteilungenDto,
  AbfragevarianteInBearbeitungSachbearbeitungDto,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";

export function mapFoerdermixStammModelToFoerderMix(foerdermixStammModel: FoerdermixStammModel): FoerdermixModel {
  const foerdermix = new FoerdermixModel({});
  foerdermix.foerderarten = foerdermixStammModel.foerdermix.foerderarten;
  return foerdermix;
}

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

export function mapToInfrastrukturabfrageInBearbeitungSachbearbeitungDto(
  infrastrukturabfrageDto: InfrastrukturabfrageDto
): InfrastrukturabfrageInBearbeitungSachbearbeitungDto {
  const abfragevarianten = _.toArray(infrastrukturabfrageDto.abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      abfragevarianteSachbearbeitung: mapToAbfragevarianteSachbearbeitungDto(
        abfragevariante.abfragevarianteSachbearbeitung
      ),
    } as AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto;
  });

  const abfragevariantenSachbearbeitung = _.toArray(infrastrukturabfrageDto.abfragevariantenSachbearbeitung).map(
    (abfragevariante) => {
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
        abfragevarianteSachbearbeitung: mapToAbfragevarianteSachbearbeitungDto(
          abfragevariante.abfragevarianteSachbearbeitung
        ),
      } as AbfragevarianteInBearbeitungSachbearbeitungDto;
    }
  );

  return {
    version: infrastrukturabfrageDto.version,
    abfragevarianten: abfragevarianten,
    abfragevariantenSachbearbeitung: abfragevariantenSachbearbeitung,
  } as InfrastrukturabfrageInBearbeitungSachbearbeitungDto;
}

export function mapToBedarfsmeldungFachabteilungen(
  bedarfsmeldungFachabteilungen: Array<BedarfsmeldungFachabteilungenDto> | undefined
): Array<BedarfsmeldungFachabteilungenDto> {
  return _.toArray(bedarfsmeldungFachabteilungen).map((bedarfmeldung) => {
    return {
      id: bedarfmeldung.id,
      version: bedarfmeldung.version,
      anzahlEinrichtungen: bedarfmeldung.anzahlEinrichtungen,
      infrastruktureinrichtungTyp: bedarfmeldung.infrastruktureinrichtungTyp,
      anzahlKinderkrippengruppen: bedarfmeldung.anzahlKinderkrippengruppen,
      anzahlKindergartengruppen: bedarfmeldung.anzahlKindergartengruppen,
      anzahlHortgruppen: bedarfmeldung.anzahlHortgruppen,
      anzahlGrundschulzuege: bedarfmeldung.anzahlGrundschulzuege,
    } as BedarfsmeldungFachabteilungenDto;
  });
}

export function mapToAbfragevarianteSachbearbeitungDto(
  abfragevarianteSachbearbeitung: AbfragevarianteSachbearbeitungDto | undefined
): AbfragevarianteSachbearbeitungDto {
  return {
    geschossflaecheWohnenPlanungsursaechlich: abfragevarianteSachbearbeitung?.geschossflaecheWohnenPlanungsursaechlich,
    soBoNOrientierungswertJahr: abfragevarianteSachbearbeitung?.soBoNOrientierungswertJahr,
    anmerkung: abfragevarianteSachbearbeitung?.anmerkung,
    bedarfsmeldungFachreferate: mapToBedarfsmeldungFachabteilungen(
      abfragevarianteSachbearbeitung?.bedarfsmeldungFachreferate
    ),
  } as AbfragevarianteSachbearbeitungDto;
}
