import {
  BauleitplanverfahrenDto,
  BaugenehmigungsverfahrenDto,
  BauleitplanverfahrenAngelegtDto,
  BaugenehmigungsverfahrenAngelegtDto,
  BauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
  BauleitplanverfahrenInBearbeitungFachreferatDto,
  BaugenehmigungsverfahrenInBearbeitungFachreferatDto,
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteBauleitplanverfahrenAngelegtDto,
  AbfragevarianteBaugenehmigungsverfahrenAngelegtDto,
  AbfragevarianteBauleitplanverfahrenAngelegtDtoArtAbfragevarianteEnum,
  AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoArtAbfragevarianteEnum,
  AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
  AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto,
  AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto,
} from "@/api/api-client/isi-backend";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import _ from "lodash";

export function mapFoerdermixStammModelToFoerderMix(foerdermixStammModel: FoerdermixStammModel): FoerdermixModel {
  const foerdermix = new FoerdermixModel({});
  foerdermix.foerderarten = _.cloneDeep(foerdermixStammModel.foerdermix.foerderarten);
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

export function mapToBaugenehmigungsverfahrenAngelegt(
  baugenehmigungsverfahrenDto: BaugenehmigungsverfahrenDto,
): BaugenehmigungsverfahrenAngelegtDto {
  const abfragevarianten = baugenehmigungsverfahrenDto.abfragevarianten?.map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante:
        AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoArtAbfragevarianteEnum.Baugenehmigungsverfahren,
      abfragevariantenNr: abfragevariante.abfragevariantenNr,
      name: abfragevariante.name,
      wesentlicheRechtsgrundlage: abfragevariante.wesentlicheRechtsgrundlage,
      wesentlicheRechtsgrundlageFreieEingabe: abfragevariante.wesentlicheRechtsgrundlageFreieEingabe,
      realisierungVon: abfragevariante.realisierungVon,
      gfWohnenGesamt: abfragevariante.gfWohnenGesamt,
      gfWohnenBaurechtlichGenehmigt: abfragevariante.gfWohnenBaurechtlichGenehmigt,
      gfWohnenBaurechtlichFestgesetzt: abfragevariante.gfWohnenBaurechtlichFestgesetzt,
      gfWohnenBestandswohnbaurecht: abfragevariante.gfWohnenBestandswohnbaurecht,
      gfWohnenSonderwohnformen: abfragevariante.gfWohnenSonderwohnformen,
      gfWohnenStudentischesWohnen: abfragevariante.gfWohnenStudentischesWohnen,
      gfWohnenSeniorinnenWohnen: abfragevariante.gfWohnenSeniorinnenWohnen,
      gfWohnenGenossenschaftlichesWohnen: abfragevariante.gfWohnenGenossenschaftlichesWohnen,
      gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen:
        abfragevariante.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen,
      weGesamt: abfragevariante.weGesamt,
      weBaurechtlichGenehmigt: abfragevariante.weBaurechtlichGenehmigt,
      weBaurechtlichFestgesetzt: abfragevariante.weBaurechtlichFestgesetzt,
      weSonderwohnformen: abfragevariante.weSonderwohnformen,
      weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
      weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
      weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
      weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
      bauabschnitte: abfragevariante.bauabschnitte,
    } as AbfragevarianteBaugenehmigungsverfahrenAngelegtDto;
  });

  return {
    // extends: AbfrageAngelegtDto
    version: baugenehmigungsverfahrenDto.version,
    artAbfrage: baugenehmigungsverfahrenDto.artAbfrage,
    name: baugenehmigungsverfahrenDto.name,
    anmerkung: baugenehmigungsverfahrenDto.anmerkung,
    bauvorhaben: baugenehmigungsverfahrenDto.bauvorhaben,
    // BaugenehmigungsverfahrenAngelegtDto
    aktenzeichenProLbk: baugenehmigungsverfahrenDto.aktenzeichenProLbk,
    bebauungsplannummer: baugenehmigungsverfahrenDto.bebauungsplannummer,
    standVerfahren: baugenehmigungsverfahrenDto.standVerfahren,
    standVerfahrenFreieEingabe: baugenehmigungsverfahrenDto.standVerfahrenFreieEingabe,
    adresse: baugenehmigungsverfahrenDto.adresse,
    verortung: baugenehmigungsverfahrenDto.verortung,
    dokumente: baugenehmigungsverfahrenDto.dokumente,
    fristBearbeitung: baugenehmigungsverfahrenDto.fristBearbeitung,
    abfragevarianten: abfragevarianten,
  } as BaugenehmigungsverfahrenAngelegtDto;
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
    verortung: bauleitplanverfahrenDto.verortung,
  } as BauleitplanverfahrenInBearbeitungSachbearbeitungDto;
}

export function mapToBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto(
  bauleitplanverfahrenDto: BaugenehmigungsverfahrenDto,
): BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto {
  return {
    // extends: AbfrageInBearbeitungSachbearbeitungDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
    verortung: bauleitplanverfahrenDto.verortung,
    abfragevarianten: mapToAbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto(
      bauleitplanverfahrenDto.abfragevarianten,
    ),
    abfragevariantenSachbearbeitung: mapToAbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto(
      bauleitplanverfahrenDto.abfragevariantenSachbearbeitung,
    ),
  } as BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto;
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

export function mapToAbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto(
  abfragevarianten: Array<AbfragevarianteBaugenehmigungsverfahrenDto> | undefined,
): Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      abfragevariantenNr: abfragevariante.abfragevariantenNr,
      name: abfragevariante.name,
      wesentlicheRechtsgrundlage: abfragevariante.wesentlicheRechtsgrundlage,
      wesentlicheRechtsgrundlageFreieEingabe: abfragevariante.wesentlicheRechtsgrundlageFreieEingabe,
      realisierungVon: abfragevariante.realisierungVon,
      gfWohnenGesamt: abfragevariante.gfWohnenGesamt,
      gfWohnenBaurechtlichGenehmigt: abfragevariante.gfWohnenBaurechtlichGenehmigt,
      gfWohnenBaurechtlichFestgesetzt: abfragevariante.gfWohnenBaurechtlichFestgesetzt,
      gfWohnenBestandswohnbaurecht: abfragevariante.gfWohnenBestandswohnbaurecht,
      gfWohnenSonderwohnformen: abfragevariante.gfWohnenSonderwohnformen,
      gfWohnenStudentischesWohnen: abfragevariante.gfWohnenStudentischesWohnen,
      gfWohnenSeniorinnenWohnen: abfragevariante.gfWohnenSeniorinnenWohnen,
      gfWohnenGenossenschaftlichesWohnen: abfragevariante.gfWohnenGenossenschaftlichesWohnen,
      gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen:
        abfragevariante.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen,
      weGesamt: abfragevariante.weGesamt,
      weBaurechtlichGenehmigt: abfragevariante.weBaurechtlichGenehmigt,
      weBaurechtlichFestgesetzt: abfragevariante.weBaurechtlichFestgesetzt,
      weSonderwohnformen: abfragevariante.weSonderwohnformen,
      weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
      weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
      weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
      weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
      bauabschnitte: abfragevariante.bauabschnitte,
      gfWohnenPlanungsursaechlich: abfragevariante.gfWohnenPlanungsursaechlich,
      sobonOrientierungswertJahr: abfragevariante.sobonOrientierungswertJahr,
      anmerkung: abfragevariante.anmerkung,
    } as AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto;
  });
}

export function mapToBauleitplanverfahrenInBearbeitungFachreferatDto(
  bauleitplanverfahrenDto: BauleitplanverfahrenDto,
): BauleitplanverfahrenInBearbeitungFachreferatDto {
  return {
    // extends: AbfrageInBearbeitungFachreferatDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BauleitplanverfahrenInBearbeitungFachreferatDto
    abfragevarianten: mapToAbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto(
      bauleitplanverfahrenDto.abfragevarianten,
    ),
    abfragevariantenSachbearbeitung: mapToAbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto(
      bauleitplanverfahrenDto.abfragevariantenSachbearbeitung,
    ),
  } as BauleitplanverfahrenInBearbeitungFachreferatDto;
}

export function mapToBaugenehmigungsverfahrenInBearbeitungFachreferatDto(
  bauleitplanverfahrenDto: BaugenehmigungsverfahrenDto,
): BaugenehmigungsverfahrenInBearbeitungFachreferatDto {
  return {
    // extends: AbfrageInBearbeitungFachreferatDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BaugenehmigungsverfahrenInBearbeitungFachreferatDto
    abfragevarianten: mapToAbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto(
      bauleitplanverfahrenDto.abfragevarianten,
    ),
    abfragevariantenSachbearbeitung: mapToAbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto(
      bauleitplanverfahrenDto.abfragevariantenSachbearbeitung,
    ),
  } as BaugenehmigungsverfahrenInBearbeitungFachreferatDto;
}

export function mapToAbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto(
  abfragevarianten: Array<AbfragevarianteBauleitplanverfahrenDto> | undefined,
): Array<AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      bedarfsmeldungFachreferate: abfragevariante.bedarfsmeldungFachreferate,
    } as AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto;
  });
}

export function mapToAbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto(
  abfragevarianten: Array<AbfragevarianteBaugenehmigungsverfahrenDto> | undefined,
): Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      bedarfsmeldungFachreferate: abfragevariante.bedarfsmeldungFachreferate,
    } as AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto;
  });
}
