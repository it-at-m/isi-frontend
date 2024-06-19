import type {
  BauleitplanverfahrenDto,
  BaugenehmigungsverfahrenDto,
  WeiteresVerfahrenDto,
  BauleitplanverfahrenAngelegtDto,
  BaugenehmigungsverfahrenAngelegtDto,
  WeiteresVerfahrenAngelegtDto,
  BauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
  WeiteresVerfahrenInBearbeitungSachbearbeitungDto,
  BauleitplanverfahrenInBearbeitungFachreferatDto,
  BaugenehmigungsverfahrenInBearbeitungFachreferatDto,
  WeiteresVerfahrenInBearbeitungFachreferatDto,
  BauleitplanverfahrenBedarfsmeldungErfolgtDto,
  BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto,
  WeiteresVerfahrenBedarfsmeldungErfolgtDto,
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
  AbfragevarianteBauleitplanverfahrenAngelegtDto,
  AbfragevarianteBaugenehmigungsverfahrenAngelegtDto,
  AbfragevarianteWeiteresVerfahrenAngelegtDto,
  AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
  AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto,
  AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto,
  AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto,
  AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto,
  AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto,
  AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto,
  AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto,
  AbfrageDto,
} from "@/api/api-client/isi-backend";
import {
  AbfragevarianteBauleitplanverfahrenAngelegtDtoArtAbfragevarianteEnum,
  AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoArtAbfragevarianteEnum,
  AbfragevarianteWeiteresVerfahrenAngelegtDtoArtAbfragevarianteEnum,
  StatusAbfrage,
} from "@/api/api-client/isi-backend";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import _ from "lodash";
import { createSobonBerechnung } from "./Factories";

type GroupedStammdaten = Array<{ header: string } | FoerdermixStammModel>;

export function mapFoerdermixStammModelToFoerderMix(foerdermixStammModel: FoerdermixStammModel): FoerdermixModel {
  const foerdermix = new FoerdermixModel({ bezeichnung: "", bezeichnungJahr: "" });
  foerdermix.foerderarten = _.cloneDeep(foerdermixStammModel.foerdermix.foerderarten);
  foerdermix.bezeichnung = _.cloneDeep(foerdermixStammModel.foerdermix.bezeichnung);
  foerdermix.bezeichnungJahr = _.cloneDeep(foerdermixStammModel.foerdermix.bezeichnungJahr);
  return foerdermix;
}

export function mapFoerdermixToFoerderMixStammModel(foerdermix: FoerdermixModel): FoerdermixStammModel {
  const foerdermixStammModel = new FoerdermixStammModel({ foerdermix });
  return foerdermixStammModel;
}

export function mapToBauleitplanverfahrenAngelegt(
  bauleitplanverfahrenDto: BauleitplanverfahrenDto,
): BauleitplanverfahrenAngelegtDto {
  const abfragevarianten = bauleitplanverfahrenDto.abfragevariantenBauleitplanverfahren?.map((abfragevariante) => {
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
    linkEakte: bauleitplanverfahrenDto.linkEakte,
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
    abfragevariantenBauleitplanverfahren: abfragevarianten,
  } as BauleitplanverfahrenAngelegtDto;
}

export function mapToBaugenehmigungsverfahrenAngelegt(
  baugenehmigungsverfahrenDto: BaugenehmigungsverfahrenDto,
): BaugenehmigungsverfahrenAngelegtDto {
  const abfragevarianten = baugenehmigungsverfahrenDto.abfragevariantenBaugenehmigungsverfahren?.map(
    (abfragevariante) => {
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
    },
  );

  return {
    // extends: AbfrageAngelegtDto
    version: baugenehmigungsverfahrenDto.version,
    artAbfrage: baugenehmigungsverfahrenDto.artAbfrage,
    name: baugenehmigungsverfahrenDto.name,
    anmerkung: baugenehmigungsverfahrenDto.anmerkung,
    linkEakte: baugenehmigungsverfahrenDto.linkEakte,
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
    abfragevariantenBaugenehmigungsverfahren: abfragevarianten,
  } as BaugenehmigungsverfahrenAngelegtDto;
}

export function mapToWeiteresVerfahrenAngelegt(
  weiteresVerfahrenDto: WeiteresVerfahrenDto,
): WeiteresVerfahrenAngelegtDto {
  const abfragevarianten = weiteresVerfahrenDto.abfragevariantenWeiteresVerfahren?.map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: AbfragevarianteWeiteresVerfahrenAngelegtDtoArtAbfragevarianteEnum.WeiteresVerfahren,
      abfragevariantenNr: abfragevariante.abfragevariantenNr,
      name: abfragevariante.name,
      satzungsbeschluss: abfragevariante.satzungsbeschluss,
      wesentlicheRechtsgrundlage: abfragevariante.wesentlicheRechtsgrundlage,
      wesentlicheRechtsgrundlageFreieEingabe: abfragevariante.wesentlicheRechtsgrundlageFreieEingabe,
      realisierungVon: abfragevariante.realisierungVon,
      gfWohnenGesamt: abfragevariante.gfWohnenGesamt,
      gfWohnenBaurechtlichGenehmigt: abfragevariante.gfWohnenBaurechtlichGenehmigt,
      gfWohnenBaurechtlichFestgesetzt: abfragevariante.gfWohnenBaurechtlichFestgesetzt,
      gfWohnenSobonUrsaechlich: abfragevariante.gfWohnenSobonUrsaechlich,
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
    } as AbfragevarianteWeiteresVerfahrenAngelegtDto;
  });

  return {
    // extends: AbfrageAngelegtDto
    version: weiteresVerfahrenDto.version,
    artAbfrage: weiteresVerfahrenDto.artAbfrage,
    name: weiteresVerfahrenDto.name,
    anmerkung: weiteresVerfahrenDto.anmerkung,
    linkEakte: weiteresVerfahrenDto.linkEakte,
    bauvorhaben: weiteresVerfahrenDto.bauvorhaben,
    // WeiteresVerfahrenAngelegtDto
    aktenzeichenProLbk: weiteresVerfahrenDto.aktenzeichenProLbk,
    bebauungsplannummer: weiteresVerfahrenDto.bebauungsplannummer,
    sobonRelevant: weiteresVerfahrenDto.sobonRelevant,
    sobonJahr: weiteresVerfahrenDto.sobonJahr,
    standVerfahren: weiteresVerfahrenDto.standVerfahren,
    standVerfahrenFreieEingabe: weiteresVerfahrenDto.standVerfahrenFreieEingabe,
    adresse: weiteresVerfahrenDto.adresse,
    verortung: weiteresVerfahrenDto.verortung,
    dokumente: weiteresVerfahrenDto.dokumente,
    fristBearbeitung: weiteresVerfahrenDto.fristBearbeitung,
    offizielleMitzeichnung: weiteresVerfahrenDto.offizielleMitzeichnung,
    abfragevariantenWeiteresVerfahren: abfragevarianten,
  } as WeiteresVerfahrenAngelegtDto;
}

export function mapToBauleitplanverfahrenInBearbeitungSachbearbeitungDto(
  bauleitplanverfahrenDto: BauleitplanverfahrenDto,
): BauleitplanverfahrenInBearbeitungSachbearbeitungDto {
  return {
    // extends: AbfrageInBearbeitungSachbearbeitungDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BauleitplanverfahrenInBearbeitungSachbearbeitungDto
    abfragevariantenBauleitplanverfahren: mapToAbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto(
      bauleitplanverfahrenDto.abfragevariantenBauleitplanverfahren,
    ),
    abfragevariantenSachbearbeitungBauleitplanverfahren:
      mapToAbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBauleitplanverfahren,
      ),
    verortung: bauleitplanverfahrenDto.verortung,
    bauvorhaben: bauleitplanverfahrenDto.bauvorhaben,
    linkEakte: bauleitplanverfahrenDto.linkEakte,
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
    abfragevariantenBaugenehmigungsverfahren:
      mapToAbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto(
        bauleitplanverfahrenDto.abfragevariantenBaugenehmigungsverfahren,
      ),
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren:
      mapToAbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBaugenehmigungsverfahren,
      ),
    bauvorhaben: bauleitplanverfahrenDto.bauvorhaben,
    linkEakte: bauleitplanverfahrenDto.linkEakte,
  } as BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto;
}

export function mapToWeiteresVerfahrenInBearbeitungSachbearbeitungDto(
  weiteresVerfahrenDto: WeiteresVerfahrenDto,
): WeiteresVerfahrenInBearbeitungSachbearbeitungDto {
  return {
    // extends: AbfrageInBearbeitungSachbearbeitungDto
    version: weiteresVerfahrenDto.version,
    artAbfrage: weiteresVerfahrenDto.artAbfrage,
    // WeiteresVerfahrenInBearbeitungSachbearbeitungDto
    verortung: weiteresVerfahrenDto.verortung,
    abfragevariantenWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto(
      weiteresVerfahrenDto.abfragevariantenWeiteresVerfahren,
    ),
    abfragevariantenSachbearbeitungWeiteresVerfahren:
      mapToAbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto(
        weiteresVerfahrenDto.abfragevariantenSachbearbeitungWeiteresVerfahren,
      ),
    bauvorhaben: weiteresVerfahrenDto.bauvorhaben,
    linkEakte: weiteresVerfahrenDto.linkEakte,
  } as WeiteresVerfahrenInBearbeitungSachbearbeitungDto;
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
      sobonOrientierungswertJahr: abfragevariante.sobonOrientierungswertJahr,
      sobonBerechnung: abfragevariante.sobonBerechnung,
      stammdatenGueltigAb: abfragevariante.stammdatenGueltigAb,
      anmerkung: abfragevariante.anmerkung,
      hasBauratendateiInput: abfragevariante.hasBauratendateiInput,
      anmerkungBauratendateiInput: abfragevariante.anmerkungBauratendateiInput,
      bauratendateiInputBasis: abfragevariante.bauratendateiInputBasis,
      bauratendateiInput: abfragevariante.bauratendateiInput,
      dokumente: abfragevariante.dokumente,
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
      sobonOrientierungswertJahr: abfragevariante.sobonOrientierungswertJahr,
      stammdatenGueltigAb: abfragevariante.stammdatenGueltigAb,
      anmerkung: abfragevariante.anmerkung,
      hasBauratendateiInput: abfragevariante.hasBauratendateiInput,
      anmerkungBauratendateiInput: abfragevariante.anmerkungBauratendateiInput,
      bauratendateiInputBasis: abfragevariante.bauratendateiInputBasis,
      bauratendateiInput: abfragevariante.bauratendateiInput,
      dokumente: abfragevariante.dokumente,
    } as AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto;
  });
}

export function mapToAbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto(
  abfragevarianten: Array<AbfragevarianteWeiteresVerfahrenDto> | undefined,
): Array<AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto> {
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
      gfWohnenBaurechtlichGenehmigt: abfragevariante.gfWohnenBaurechtlichGenehmigt,
      gfWohnenBaurechtlichFestgesetzt: abfragevariante.gfWohnenBaurechtlichFestgesetzt,
      gfWohnenSobonUrsaechlich: abfragevariante.gfWohnenSobonUrsaechlich,
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
      sobonOrientierungswertJahr: abfragevariante.sobonOrientierungswertJahr,
      sobonBerechnung: abfragevariante.sobonBerechnung,
      stammdatenGueltigAb: abfragevariante.stammdatenGueltigAb,
      anmerkung: abfragevariante.anmerkung,
      hasBauratendateiInput: abfragevariante.hasBauratendateiInput,
      anmerkungBauratendateiInput: abfragevariante.anmerkungBauratendateiInput,
      bauratendateiInputBasis: abfragevariante.bauratendateiInputBasis,
      bauratendateiInput: abfragevariante.bauratendateiInput,
      dokumente: abfragevariante.dokumente,
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
    abfragevariantenBauleitplanverfahren: mapToAbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto(
      bauleitplanverfahrenDto.abfragevariantenBauleitplanverfahren,
    ),
    abfragevariantenSachbearbeitungBauleitplanverfahren:
      mapToAbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBauleitplanverfahren,
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
    abfragevariantenBaugenehmigungsverfahren: mapToAbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto(
      bauleitplanverfahrenDto.abfragevariantenBaugenehmigungsverfahren,
    ),
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren:
      mapToAbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBaugenehmigungsverfahren,
      ),
  } as BaugenehmigungsverfahrenInBearbeitungFachreferatDto;
}

export function mapToWeiteresVerfahrenInBearbeitungFachreferatDto(
  weiteresVerfahrenDto: WeiteresVerfahrenDto,
): WeiteresVerfahrenInBearbeitungFachreferatDto {
  return {
    // extends: AbfrageInBearbeitungFachreferatDto
    version: weiteresVerfahrenDto.version,
    artAbfrage: weiteresVerfahrenDto.artAbfrage,
    // WeiteresVerfahrenInBearbeitungFachreferatDto
    abfragevariantenWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto(
      weiteresVerfahrenDto.abfragevariantenWeiteresVerfahren,
    ),
    abfragevariantenSachbearbeitungWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto(
      weiteresVerfahrenDto.abfragevariantenSachbearbeitungWeiteresVerfahren,
    ),
  } as WeiteresVerfahrenInBearbeitungFachreferatDto;
}

export function mapToBauleitplanverfahrenBedarfsmeldungErfolgtDto(
  bauleitplanverfahrenDto: BauleitplanverfahrenDto,
): BauleitplanverfahrenBedarfsmeldungErfolgtDto {
  return {
    // extends: AbfrageBedarfsmeldungErfolgtDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BauleitplanverfahrenBedarfsmeldungErfolgtDto
    abfragevariantenBauleitplanverfahren: mapToAbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto(
      bauleitplanverfahrenDto.abfragevariantenBauleitplanverfahren,
    ),
    abfragevariantenSachbearbeitungBauleitplanverfahren:
      mapToAbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBauleitplanverfahren,
      ),
  } as BauleitplanverfahrenBedarfsmeldungErfolgtDto;
}

export function mapToBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto(
  bauleitplanverfahrenDto: BaugenehmigungsverfahrenDto,
): BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto {
  return {
    // extends: AbfrageBedarfsmeldungErfolgtDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto
    abfragevariantenBaugenehmigungsverfahren: mapToAbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto(
      bauleitplanverfahrenDto.abfragevariantenBaugenehmigungsverfahren,
    ),
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren:
      mapToAbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBaugenehmigungsverfahren,
      ),
  } as BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto;
}

export function mapToWeiteresVerfahrenBedarfsmeldungErfolgtDto(
  weiteresVerfahrenDto: WeiteresVerfahrenDto,
): WeiteresVerfahrenBedarfsmeldungErfolgtDto {
  return {
    // extends: AbfrageBedarfsmeldungErfolgtDto
    version: weiteresVerfahrenDto.version,
    artAbfrage: weiteresVerfahrenDto.artAbfrage,
    // WeiteresVerfahrenBedarfsmeldungErfolgtDto
    abfragevariantenWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto(
      weiteresVerfahrenDto.abfragevariantenWeiteresVerfahren,
    ),
    abfragevariantenSachbearbeitungWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto(
      weiteresVerfahrenDto.abfragevariantenSachbearbeitungWeiteresVerfahren,
    ),
  } as WeiteresVerfahrenBedarfsmeldungErfolgtDto;
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
      anmerkungFachreferate: abfragevariante.anmerkungFachreferate,
      ausgeloesterBedarfImBaugebietBeruecksichtigenKita:
        abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenKita,
      ausgeloesterBedarfMitversorgungImBplanKita: abfragevariante.ausgeloesterBedarfMitversorgungImBplanKita,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenKita:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenKita,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita,
      ausgeloesterBedarfImBaugebietBeruecksichtigenSchule:
        abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenSchule,
      ausgeloesterBedarfMitversorgungImBplanSchule: abfragevariante.ausgeloesterBedarfMitversorgungImBplanSchule,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule,
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
      anmerkungFachreferate: abfragevariante.anmerkungFachreferate,
      ausgeloesterBedarfImBaugebietBeruecksichtigenKita:
        abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenKita,
      ausgeloesterBedarfMitversorgungImBplanKita: abfragevariante.ausgeloesterBedarfMitversorgungImBplanKita,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenKita:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenKita,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita,
      ausgeloesterBedarfImBaugebietBeruecksichtigenSchule:
        abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenSchule,
      ausgeloesterBedarfMitversorgungImBplanSchule: abfragevariante.ausgeloesterBedarfMitversorgungImBplanSchule,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule,
    } as AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto;
  });
}

export function mapToAbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto(
  abfragevarianten: Array<AbfragevarianteWeiteresVerfahrenDto> | undefined,
): Array<AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      bedarfsmeldungFachreferate: abfragevariante.bedarfsmeldungFachreferate,
      anmerkungFachreferate: abfragevariante.anmerkungFachreferate,
      ausgeloesterBedarfImBaugebietBeruecksichtigenKita:
        abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenKita,
      ausgeloesterBedarfMitversorgungImBplanKita: abfragevariante.ausgeloesterBedarfMitversorgungImBplanKita,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenKita:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenKita,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita,
      ausgeloesterBedarfImBaugebietBeruecksichtigenSchule:
        abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenSchule,
      ausgeloesterBedarfMitversorgungImBplanSchule: abfragevariante.ausgeloesterBedarfMitversorgungImBplanSchule,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule,
      ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule:
        abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule,
    } as AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto;
  });
}

export function mapToAbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto(
  abfragevarianten: Array<AbfragevarianteBauleitplanverfahrenDto> | undefined,
): Array<AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      bedarfsmeldungAbfrageersteller: abfragevariante.bedarfsmeldungAbfrageersteller,
      anmerkungAbfrageersteller: abfragevariante.anmerkungAbfrageersteller,
    } as AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto;
  });
}

export function mapToAbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto(
  abfragevarianten: Array<AbfragevarianteBaugenehmigungsverfahrenDto> | undefined,
): Array<AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      bedarfsmeldungAbfrageersteller: abfragevariante.bedarfsmeldungAbfrageersteller,
      anmerkungAbfrageersteller: abfragevariante.anmerkungAbfrageersteller,
    } as AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto;
  });
}

export function mapToAbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto(
  abfragevarianten: Array<AbfragevarianteWeiteresVerfahrenDto> | undefined,
): Array<AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      bedarfsmeldungAbfrageersteller: abfragevariante.bedarfsmeldungAbfrageersteller,
      anmerkungAbfrageersteller: abfragevariante.anmerkungAbfrageersteller,
    } as AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto;
  });
}

/**
 * Gruppiert eine Liste von Fördermixstämmen nach 'bezeichnungJahr' und fügt entsprechende header-Objekte hinzu.
 * Gedacht zum Einsatz mit v-select.
 * Wenn die Variable sobonValues true ist werden nur die Ergebnisse für die Header "SoBoN 2021" und "SoBoN 2017" zurückgegeben.
 *
 * @param foerdermixStaemme Eine zu gruppierende Liste von {@link FoerdermixStammModel}.
 * @return Eine neue Liste, welche neben den Fördermixstämmen auch { header: string }-Objekte enthält.
 */
export function groupItemsToHeader(foerdermixStaemme: FoerdermixStammModel[], sobonValues: boolean): GroupedStammdaten {
  const groups: { [bezeichnungJahr: string]: Array<FoerdermixStammModel> } = {};
  foerdermixStaemme.forEach((foerdermixStammModel) => {
    const bezeichnungJahr = foerdermixStammModel.foerdermix.bezeichnungJahr;
    if (bezeichnungJahr) {
      if (sobonValues && (bezeichnungJahr === "SoBoN 2021" || bezeichnungJahr === "SoBoN 2017")) {
        // Prüft, ob das Array für das bezeichnungJahr bereits existiert, und initialisiert es bei Bedarf
        if (!groups[bezeichnungJahr]) {
          groups[bezeichnungJahr] = [];
        }
        groups[bezeichnungJahr].push(foerdermixStammModel);
      } else if (!sobonValues) {
        groups[bezeichnungJahr] = groups[bezeichnungJahr] || [];
        // Dann wird der aktuelle Fördermix zu diesem Array hinzugefügt.
        groups[bezeichnungJahr].push(foerdermixStammModel);
      }
    }
  });
  const flattened: GroupedStammdaten = [];
  Object.keys(groups).forEach((bezeichnungJahr) => {
    const foerdermixe = groups[bezeichnungJahr];
    // Fügt zuerst ein header-Objekt für das aktuelle 'bezeichnungJahr' hinzu
    flattened.push({ header: bezeichnungJahr });
    // Fügt dann alle zugehörigen FördermixStammModel Objekte hinzu
    flattened.push(...foerdermixe);
  });
  return flattened;
}

/**
 * Erstellt von einer Abfrage eine Kopie.
 * Dabei werden einige Felder bereinigt, da es fachlich oder technisch keinen Sinn macht, ihre Werte zu kopieren.
 * Außerdem wird an den Namen der Abfrage "- Kopie" oder "- Kopie <Nummer der Kopie>" angehängt.
 *
 * @param abfrage Die zu kopierende Abfrage.
 * @returns Die bereinigte Kopie der Abfrage.
 */
export function copyAbfrage(abfrage: AbfrageDto): AbfrageDto {
  const copy = _.cloneDeep(abfrage);
  sanitizeCopy(copy);
  copy.name = (copy.name ?? "") + " - Kopie";
  return copy;
}

const sanitizationMap = new Map<string, unknown>([
  // Allgemein
  ["id", undefined],
  ["version", undefined],
  ["createdDateTime", undefined],
  ["lastModifiedDateTime", undefined],
  ["dokumente", []],
  // Abfrage
  ["displayName", undefined],
  ["statusAbfrage", StatusAbfrage.Angelegt],
  ["sub", undefined],
  ["bearbeitungshistorie", undefined],
  // Abfragevariante
  ["sobonBerechnung", createSobonBerechnung()],
  ["stammdatenGueltigAb", new Date()],
  ["hasBauratendateiInput", false],
  ["anmerkungBauratendateiInput", undefined],
  ["bauratendateiInputBasis", undefined],
  ["bauratendateiInput", []],
  ["bedarfsmeldungFachreferate", []],
  ["bedarfsmeldungAbfrageersteller", []],
  ["anmerkungFachreferate", undefined],
  ["anmerkungAbfrageersteller", undefined],
  ["ausgeloesterBedarfImBaugebietBeruecksichtigenKita", false],
  ["ausgeloesterBedarfMitversorgungImBplanKita", false],
  ["ausgeloesterBedarfMitversorgungInBestEinrichtungenKita", false],
  ["ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita", false],
  ["ausgeloesterBedarfImBaugebietBeruecksichtigenSchule", false],
  ["ausgeloesterBedarfMitversorgungImBplanSchule", false],
  ["ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule", false],
  ["ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule", false],
]);

function sanitizeCopy(value: any): void {
  if (_.isPlainObject(value)) {
    for (const key in value) {
      if (sanitizationMap.has(key)) {
        value[key] = sanitizationMap.get(key);
      } else {
        sanitizeCopy(value[key]);
      }
    }
  } else if (Array.isArray(value)) {
    for (const entry of value) {
      sanitizeCopy(entry);
    }
  }
}
