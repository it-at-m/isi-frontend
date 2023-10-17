import {
  BauleitplanverfahrenAngelegtDto,
  BauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBauleitplanverfahrenAngelegtDto,
  AbfragevarianteBauleitplanverfahrenAngelegtDtoArtAbfragevarianteEnum,
  AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  BauleitplanverfahrenDto,
} from "@/api/api-client/isi-backend";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import _ from "lodash";

export function mapFoerdermixStammModelToFoerderMix(foerdermixStammModel: FoerdermixStammModel): FoerdermixModel {
  const foerdermix = new FoerdermixModel({});
  foerdermix.foerderarten = foerdermixStammModel.foerdermix.foerderarten;
  return foerdermix;
}

export function mapToBauleitplanverfahrenAngelegt(
  bauleitplanverfahrenDto: BauleitplanverfahrenDto,
): BauleitplanverfahrenAngelegtDto {
  const abfragevarianten = bauleitplanverfahrenDto.abfragevarianten?.map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: AbfragevarianteBauleitplanverfahrenAngelegtDtoArtAbfragevarianteEnum.Bauleitplanverfahren,
      abfragevariantenNr: abfragevariante.abfragevariantenNr,
      name: abfragevariante.name,
      satzungsbeschluss: abfragevariante.satzungsbeschluss,
      wesentlicheRechtsgrundlage: abfragevariante.wesentlicheRechtsgrundlage,
      wesentlicheRechtsgrundlageFreieEingabe: abfragevariante.wesentlicheRechtsgrundlageFreieEingabe,
      realisierungVon: abfragevariante.realisierungVon,
      gfWohnenGesamt: abfragevariante.gfWohnenGesamt,
      gfWohnenSobonUrsaechlich: abfragevariante.gfWohnenSobonUrsaechlich,
      gfWohnenBestandswohnbaurecht: abfragevariante.gfWohnenBestandswohnbaurecht,
      gfWohnenSonderwohnformen: abfragevariante.gfWohnenSonderwohnformen,
      gfWohnenStudentischesWohnen: abfragevariante.gfWohnenStudentischesWohnen,
      gfWohnenSeniorinnenWohnen: abfragevariante.gfWohnenSeniorinnenWohnen,
      gfWohnenGenossenschaftlichesWohnen: abfragevariante.gfWohnenGenossenschaftlichesWohnen,
      gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen:
        abfragevariante.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen,
      weGesamt: abfragevariante.weGesamt,
      weSonderwohnformen: abfragevariante.weSonderwohnformen,
      weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
      weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
      weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
      weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
      bauabschnitte: abfragevariante.bauabschnitte,
    } as AbfragevarianteBauleitplanverfahrenAngelegtDto;
  });

  return {
    // extends: AbfrageAngelegtDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    name: bauleitplanverfahrenDto.name,
    anmerkung: bauleitplanverfahrenDto.anmerkung,
    bauvorhaben: bauleitplanverfahrenDto.bauvorhaben,
    // BauleitplanverfahrenAngelegtDto
    bebauungsplannummer: bauleitplanverfahrenDto.bebauungsplannummer,
    sobonRelevant: bauleitplanverfahrenDto.sobonRelevant,
    sobonJahr: bauleitplanverfahrenDto.sobonJahr,
    standVerfahren: bauleitplanverfahrenDto.standVerfahren,
    standVerfahrenFreieEingabe: bauleitplanverfahrenDto.standVerfahrenFreieEingabe,
    adresse: bauleitplanverfahrenDto.adresse,
    verortung: bauleitplanverfahrenDto.verortung,
    dokumente: bauleitplanverfahrenDto.dokumente,
    fristBearbeitung: bauleitplanverfahrenDto.fristBearbeitung,
    offizielleMitzeichnung: bauleitplanverfahrenDto.offizielleMitzeichnung,
    abfragevarianten: abfragevarianten,
  } as BauleitplanverfahrenAngelegtDto;
}

export function mapToBauleitplanverfahrenInBearbeitungSachbearbeitungDto(
  bauleitplanverfahrenDto: BauleitplanverfahrenDto,
): BauleitplanverfahrenInBearbeitungSachbearbeitungDto {
  return {
    // extends: AbfrageInBearbeitungSachbearbeitungDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BauleitplanverfahrenInBearbeitungSachbearbeitungDto
    abfragevarianten: mapToAbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto(
      bauleitplanverfahrenDto.abfragevarianten,
    ),
    abfragevariantenSachbearbeitung: mapToAbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto(
      bauleitplanverfahrenDto.abfragevariantenSachbearbeitung,
    ),
  } as BauleitplanverfahrenInBearbeitungSachbearbeitungDto;
}

export function mapToAbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto(
  abfragevarianten: Array<AbfragevarianteBauleitplanverfahrenDto> | undefined,
): Array<AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      abfragevariantenNr: abfragevariante.abfragevariantenNr,
      name: abfragevariante.name,
      satzungsbeschluss: abfragevariante.satzungsbeschluss,
      wesentlicheRechtsgrundlage: abfragevariante.wesentlicheRechtsgrundlage,
      wesentlicheRechtsgrundlageFreieEingabe: abfragevariante.wesentlicheRechtsgrundlageFreieEingabe,
      realisierungVon: abfragevariante.realisierungVon,
      gfWohnenGesamt: abfragevariante.gfWohnenGesamt,
      gfWohnenSobonUrsaechlich: abfragevariante.gfWohnenSobonUrsaechlich,
      gfWohnenBestandswohnbaurecht: abfragevariante.gfWohnenBestandswohnbaurecht,
      gfWohnenSonderwohnformen: abfragevariante.gfWohnenSonderwohnformen,
      gfWohnenStudentischesWohnen: abfragevariante.gfWohnenStudentischesWohnen,
      gfWohnenSeniorinnenWohnen: abfragevariante.gfWohnenSeniorinnenWohnen,
      gfWohnenGenossenschaftlichesWohnen: abfragevariante.gfWohnenGenossenschaftlichesWohnen,
      gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen:
        abfragevariante.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen,
      weGesamt: abfragevariante.weGesamt,
      weSonderwohnformen: abfragevariante.weSonderwohnformen,
      weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
      weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
      weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
      weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
      bauabschnitte: abfragevariante.bauabschnitte,
      gfWohnenPlanungsursaechlich: abfragevariante.gfWohnenPlanungsursaechlich,
      sobonOrientierungswertJahr: abfragevariante.sobonOrientierungswertJahr,
      anmerkung: abfragevariante.anmerkung,
    } as AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto;
  });
}

/*
export function mapToInfrastrukturabfrageInBearbeitungFachreferateDto(
  infrastrukturabfrageDto: InfrastrukturabfrageDto,
): InfrastrukturabfrageInBearbeitungFachreferateDto {
  const abfragevarianten = _.toArray(infrastrukturabfrageDto.abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      bedarfsmeldungFachreferate: mapToBedarfsmeldungFachabteilungen(
        abfragevariante.abfragevarianteSachbearbeitung?.bedarfsmeldungFachreferate,
      ),
    } as AbfragevarianteInBearbeitungFachreferateDto;
  });

  const abfragevariantenSachbearbeitung = _.toArray(infrastrukturabfrageDto.abfragevariantenSachbearbeitung).map(
    (abfragevariante) => {
      return {
        id: abfragevariante.id,
        version: abfragevariante.version,
        bedarfsmeldungFachreferate: mapToBedarfsmeldungFachabteilungen(
          abfragevariante.abfragevarianteSachbearbeitung?.bedarfsmeldungFachreferate,
        ),
      } as AbfragevarianteInBearbeitungFachreferateDto;
    },
  );

  return {
    version: infrastrukturabfrageDto.version,
    abfragevarianten: abfragevarianten,
    abfragevariantenSachbearbeitung: abfragevariantenSachbearbeitung,
  } as InfrastrukturabfrageInBearbeitungFachreferateDto;
}

export function mapToBedarfsmeldungFachabteilungen(
  bedarfsmeldungFachabteilungen: Array<BedarfsmeldungFachabteilungenDto> | undefined,
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
  abfragevarianteSachbearbeitung: AbfragevarianteSachbearbeitungDto | undefined,
): AbfragevarianteSachbearbeitungDto {
  return {
    geschossflaecheWohnenPlanungsursaechlich: abfragevarianteSachbearbeitung?.geschossflaecheWohnenPlanungsursaechlich,
    soBoNOrientierungswertJahr: abfragevarianteSachbearbeitung?.soBoNOrientierungswertJahr,
    anmerkung: abfragevarianteSachbearbeitung?.anmerkung,
    bedarfsmeldungFachreferate: mapToBedarfsmeldungFachabteilungen(
      abfragevarianteSachbearbeitung?.bedarfsmeldungFachreferate,
    ),
  } as AbfragevarianteSachbearbeitungDto;
}
*/
