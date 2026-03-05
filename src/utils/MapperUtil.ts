import {
  BauleitplanverfahrenDto,
  BaugenehmigungsverfahrenDto,
  WeiteresVerfahrenDto,
  BauleitplanverfahrenAngelegtDto,
  BaugenehmigungsverfahrenAngelegtDto,
  WeiteresVerfahrenAngelegtDto,
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
  AbfragevarianteBauleitplanverfahrenAngelegtDto,
  AbfragevarianteBaugenehmigungsverfahrenAngelegtDto,
  AbfragevarianteWeiteresVerfahrenAngelegtDto,
  BauleitplanverfahrenStartBearbeitungDto,
  BaugenehmigungsverfahrenStartBearbeitungDto,
  WeiteresVerfahrenStartBearbeitungDto,
  AbfragevarianteBauleitplanverfahrenStartBearbeitungDto,
  AbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto,
  AbfragevarianteWeiteresVerfahrenStartBearbeitungDto,
  BauleitplanverfahrenEinpflegenBedarfsmeldungDto,
  BaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto,
  WeiteresVerfahrenEinpflegenBedarfsmeldungDto,
  BauleitplanverfahrenEinplanungBedarfeDto,
  BaugenehmigungsverfahrenEinplanungBedarfeDto,
  WeiteresVerfahrenEinplanungBedarfeDto,
  AbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto,
  AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto,
  AbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto,
  AbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto,
  AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto,
  AbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto,
  AbfrageDtoArtAbfrageEnum,
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
import { createSobonBerechnungBauleitplanverfahren } from "./Factories";
import { AnyAbfrageDto, AnyAbfragevarianteDto } from "@/types/common/Abfrage";
import { useSecurity } from "@/composables/security/Security";

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
      gfAnmerkung: abfragevariante.gfAnmerkung,
      weGesamt: abfragevariante.weGesamt,
      weSonderwohnformen: abfragevariante.weSonderwohnformen,
      weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
      weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
      weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
      weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
      weAnmerkung: abfragevariante.weAnmerkung,
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
    mitzeichnungBeschlussentwurf: bauleitplanverfahrenDto.mitzeichnungBeschlussentwurf,
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
        gfAnmerkung: abfragevariante.gfAnmerkung,
        weGesamt: abfragevariante.weGesamt,
        weBaurechtlichGenehmigt: abfragevariante.weBaurechtlichGenehmigt,
        weBaurechtlichFestgesetzt: abfragevariante.weBaurechtlichFestgesetzt,
        weSonderwohnformen: abfragevariante.weSonderwohnformen,
        weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
        weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
        weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
        weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
        weAnmerkung: abfragevariante.weAnmerkung,
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
      gfAnmerkung: abfragevariante.gfAnmerkung,
      weGesamt: abfragevariante.weGesamt,
      weBaurechtlichGenehmigt: abfragevariante.weBaurechtlichGenehmigt,
      weBaurechtlichFestgesetzt: abfragevariante.weBaurechtlichFestgesetzt,
      weSonderwohnformen: abfragevariante.weSonderwohnformen,
      weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
      weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
      weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
      weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
      weAnmerkung: abfragevariante.weAnmerkung,
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
    mitzeichnungBeschlussentwurf: weiteresVerfahrenDto.mitzeichnungBeschlussentwurf,
    abfragevariantenWeiteresVerfahren: abfragevarianten,
  } as WeiteresVerfahrenAngelegtDto;
}

export function mapToBauleitplanverfahrenStartBearbeitungDto(
  bauleitplanverfahrenDto: BauleitplanverfahrenDto,
): BauleitplanverfahrenStartBearbeitungDto {
  return {
    // extends: AbfrageStartBearbeitungDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BauleitplanverfahrenStartBearbeitungDto
    abfragevariantenBauleitplanverfahren: mapToAbfragevarianteBauleitplanverfahrenStartBearbeitungDto(
      bauleitplanverfahrenDto.abfragevariantenBauleitplanverfahren,
    ),
    abfragevariantenSachbearbeitungBauleitplanverfahren: mapToAbfragevarianteBauleitplanverfahrenStartBearbeitungDto(
      bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBauleitplanverfahren,
    ),
    verortung: bauleitplanverfahrenDto.verortung,
    bauvorhaben: bauleitplanverfahrenDto.bauvorhaben,
    linkEakte: bauleitplanverfahrenDto.linkEakte,
  } as BauleitplanverfahrenStartBearbeitungDto;
}

export function mapToBaugenehmigungsverfahrenStartBearbeitungDto(
  bauleitplanverfahrenDto: BaugenehmigungsverfahrenDto,
): BaugenehmigungsverfahrenStartBearbeitungDto {
  return {
    // extends: AbfrageStartBearbeitungDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BaugenehmigungsverfahrenStartBearbeitungDto
    verortung: bauleitplanverfahrenDto.verortung,
    abfragevariantenBaugenehmigungsverfahren: mapToAbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto(
      bauleitplanverfahrenDto.abfragevariantenBaugenehmigungsverfahren,
    ),
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren:
      mapToAbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBaugenehmigungsverfahren,
      ),
    bauvorhaben: bauleitplanverfahrenDto.bauvorhaben,
    linkEakte: bauleitplanverfahrenDto.linkEakte,
  } as BaugenehmigungsverfahrenStartBearbeitungDto;
}

export function mapToWeiteresVerfahrenStartBearbeitungDto(
  weiteresVerfahrenDto: WeiteresVerfahrenDto,
): WeiteresVerfahrenStartBearbeitungDto {
  return {
    // extends: AbfrageStartBearbeitungDto
    version: weiteresVerfahrenDto.version,
    artAbfrage: weiteresVerfahrenDto.artAbfrage,
    // WeiteresVerfahrenStartBearbeitungDto
    verortung: weiteresVerfahrenDto.verortung,
    abfragevariantenWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenStartBearbeitungDto(
      weiteresVerfahrenDto.abfragevariantenWeiteresVerfahren,
    ),
    abfragevariantenSachbearbeitungWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenStartBearbeitungDto(
      weiteresVerfahrenDto.abfragevariantenSachbearbeitungWeiteresVerfahren,
    ),
    bauvorhaben: weiteresVerfahrenDto.bauvorhaben,
    linkEakte: weiteresVerfahrenDto.linkEakte,
  } as WeiteresVerfahrenStartBearbeitungDto;
}

export function mapToAbfragevarianteBauleitplanverfahrenStartBearbeitungDto(
  abfragevarianten: Array<AbfragevarianteBauleitplanverfahrenDto> | undefined,
): Array<AbfragevarianteBauleitplanverfahrenStartBearbeitungDto> {
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
      gfAnmerkung: abfragevariante.gfAnmerkung,
      weGesamt: abfragevariante.weGesamt,
      weSonderwohnformen: abfragevariante.weSonderwohnformen,
      weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
      weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
      weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
      weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
      weAnmerkung: abfragevariante.weAnmerkung,
      bauabschnitte: abfragevariante.bauabschnitte,
      sobonOrientierungswertJahrPlanungsursaechlich: abfragevariante.sobonOrientierungswertJahrPlanungsursaechlich,
      sobonBerechnung: abfragevariante.sobonBerechnung,
      stammdatenGueltigAb: abfragevariante.stammdatenGueltigAb,
      anmerkung: abfragevariante.anmerkung,
      hasBauratendateiInput: abfragevariante.hasBauratendateiInput,
      anmerkungBauratendateiInput: abfragevariante.anmerkungBauratendateiInput,
      bauratendateiInputBasis: abfragevariante.bauratendateiInputBasis,
      bauratendateiInput: abfragevariante.bauratendateiInput,
      dokumente: abfragevariante.dokumente,
    } as AbfragevarianteBauleitplanverfahrenStartBearbeitungDto;
  });
}

export function mapToAbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto(
  abfragevarianten: Array<AbfragevarianteBaugenehmigungsverfahrenDto> | undefined,
): Array<AbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto> {
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
      gfAnmerkung: abfragevariante.gfAnmerkung,
      weGesamt: abfragevariante.weGesamt,
      weBaurechtlichGenehmigt: abfragevariante.weBaurechtlichGenehmigt,
      weBaurechtlichFestgesetzt: abfragevariante.weBaurechtlichFestgesetzt,
      weSonderwohnformen: abfragevariante.weSonderwohnformen,
      weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
      weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
      weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
      weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
      weAnmerkung: abfragevariante.weAnmerkung,
      bauabschnitte: abfragevariante.bauabschnitte,
      sobonOrientierungswertJahrPlanungsursaechlich: abfragevariante.sobonOrientierungswertJahrPlanungsursaechlich,
      stammdatenGueltigAb: abfragevariante.stammdatenGueltigAb,
      anmerkung: abfragevariante.anmerkung,
      hasBauratendateiInput: abfragevariante.hasBauratendateiInput,
      anmerkungBauratendateiInput: abfragevariante.anmerkungBauratendateiInput,
      bauratendateiInputBasis: abfragevariante.bauratendateiInputBasis,
      bauratendateiInput: abfragevariante.bauratendateiInput,
      dokumente: abfragevariante.dokumente,
    } as AbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto;
  });
}

export function mapToAbfragevarianteWeiteresVerfahrenStartBearbeitungDto(
  abfragevarianten: Array<AbfragevarianteWeiteresVerfahrenDto> | undefined,
): Array<AbfragevarianteWeiteresVerfahrenStartBearbeitungDto> {
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
      gfAnmerkung: abfragevariante.gfAnmerkung,
      weGesamt: abfragevariante.weGesamt,
      weBaurechtlichGenehmigt: abfragevariante.weBaurechtlichGenehmigt,
      weBaurechtlichFestgesetzt: abfragevariante.weBaurechtlichFestgesetzt,
      weSonderwohnformen: abfragevariante.weSonderwohnformen,
      weStudentischesWohnen: abfragevariante.weStudentischesWohnen,
      weSeniorinnenWohnen: abfragevariante.weSeniorinnenWohnen,
      weGenossenschaftlichesWohnen: abfragevariante.weGenossenschaftlichesWohnen,
      weWeiteresNichtInfrastrukturrelevantesWohnen: abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen,
      weAnmerkung: abfragevariante.weAnmerkung,
      bauabschnitte: abfragevariante.bauabschnitte,
      sobonOrientierungswertJahrPlanungsursaechlich: abfragevariante.sobonOrientierungswertJahrPlanungsursaechlich,
      sobonBerechnung: abfragevariante.sobonBerechnung,
      stammdatenGueltigAb: abfragevariante.stammdatenGueltigAb,
      anmerkung: abfragevariante.anmerkung,
      hasBauratendateiInput: abfragevariante.hasBauratendateiInput,
      anmerkungBauratendateiInput: abfragevariante.anmerkungBauratendateiInput,
      bauratendateiInputBasis: abfragevariante.bauratendateiInputBasis,
      bauratendateiInput: abfragevariante.bauratendateiInput,
      dokumente: abfragevariante.dokumente,
    } as AbfragevarianteBaugenehmigungsverfahrenStartBearbeitungDto;
  });
}

export function mapToBauleitplanverfahrenEinpflegenBedarfsmeldungDto(
  bauleitplanverfahrenDto: BauleitplanverfahrenDto,
): BauleitplanverfahrenEinpflegenBedarfsmeldungDto {
  return {
    // extends: AbfrageEinpflegenBedarfsmeldungDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BauleitplanverfahrenEinpflegenBedarfsmeldungDto
    abfragevariantenBauleitplanverfahren: mapToAbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto(
      bauleitplanverfahrenDto.abfragevariantenBauleitplanverfahren,
    ),
    abfragevariantenSachbearbeitungBauleitplanverfahren:
      mapToAbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBauleitplanverfahren,
      ),
  } as BauleitplanverfahrenEinpflegenBedarfsmeldungDto;
}

export function mapToBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto(
  bauleitplanverfahrenDto: BaugenehmigungsverfahrenDto,
): BaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto {
  return {
    // extends: AbfrageEinpflegenBedarfsmeldungDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto
    abfragevariantenBaugenehmigungsverfahren: mapToAbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto(
      bauleitplanverfahrenDto.abfragevariantenBaugenehmigungsverfahren,
    ),
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren:
      mapToAbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBaugenehmigungsverfahren,
      ),
  } as BaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto;
}

export function mapToWeiteresVerfahrenEinpflegenBedarfsmeldungDto(
  weiteresVerfahrenDto: WeiteresVerfahrenDto,
): WeiteresVerfahrenEinpflegenBedarfsmeldungDto {
  return {
    // extends: AbfrageEinpflegenBedarfsmeldungDto
    version: weiteresVerfahrenDto.version,
    artAbfrage: weiteresVerfahrenDto.artAbfrage,
    // WeiteresVerfahrenEinpflegenBedarfsmeldungDto
    abfragevariantenWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto(
      weiteresVerfahrenDto.abfragevariantenWeiteresVerfahren,
    ),
    abfragevariantenSachbearbeitungWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto(
      weiteresVerfahrenDto.abfragevariantenSachbearbeitungWeiteresVerfahren,
    ),
  } as WeiteresVerfahrenEinpflegenBedarfsmeldungDto;
}

export function mapToBauleitplanverfahrenEinplanungBedarfeDto(
  bauleitplanverfahrenDto: BauleitplanverfahrenDto,
): BauleitplanverfahrenEinplanungBedarfeDto {
  return {
    // extends: AbfrageEinplanungBedarfeDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BauleitplanverfahrenEinplanungBedarfeDto
    abfragevariantenBauleitplanverfahren: mapToAbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto(
      bauleitplanverfahrenDto.abfragevariantenBauleitplanverfahren,
    ),
    abfragevariantenSachbearbeitungBauleitplanverfahren: mapToAbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto(
      bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBauleitplanverfahren,
    ),
  } as BauleitplanverfahrenEinplanungBedarfeDto;
}

export function mapToBaugenehmigungsverfahrenEinplanungBedarfeDto(
  bauleitplanverfahrenDto: BaugenehmigungsverfahrenDto,
): BaugenehmigungsverfahrenEinplanungBedarfeDto {
  return {
    // extends: AbfrageEinplanungBedarfeDto
    version: bauleitplanverfahrenDto.version,
    artAbfrage: bauleitplanverfahrenDto.artAbfrage,
    // BaugenehmigungsverfahrenEinplanungBedarfeDto
    abfragevariantenBaugenehmigungsverfahren: mapToAbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto(
      bauleitplanverfahrenDto.abfragevariantenBaugenehmigungsverfahren,
    ),
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren:
      mapToAbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto(
        bauleitplanverfahrenDto.abfragevariantenSachbearbeitungBaugenehmigungsverfahren,
      ),
  } as BaugenehmigungsverfahrenEinplanungBedarfeDto;
}

export function mapToWeiteresVerfahrenEinplanungBedarfeDto(
  weiteresVerfahrenDto: WeiteresVerfahrenDto,
): WeiteresVerfahrenEinplanungBedarfeDto {
  return {
    // extends: AbfrageEinplanungBedarfeDto
    version: weiteresVerfahrenDto.version,
    artAbfrage: weiteresVerfahrenDto.artAbfrage,
    // WeiteresVerfahrenEinplanungBedarfeDto
    abfragevariantenWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto(
      weiteresVerfahrenDto.abfragevariantenWeiteresVerfahren,
    ),
    abfragevariantenSachbearbeitungWeiteresVerfahren: mapToAbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto(
      weiteresVerfahrenDto.abfragevariantenSachbearbeitungWeiteresVerfahren,
    ),
  } as WeiteresVerfahrenEinplanungBedarfeDto;
}

export function mapToAbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto(
  abfragevarianten: Array<AbfragevarianteBauleitplanverfahrenDto> | undefined,
): Array<AbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto> {
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
    } as AbfragevarianteBauleitplanverfahrenEinpflegenBedarfsmeldungDto;
  });
}

export function mapToAbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto(
  abfragevarianten: Array<AbfragevarianteBaugenehmigungsverfahrenDto> | undefined,
): Array<AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto> {
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
    } as AbfragevarianteBaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto;
  });
}

export function mapToAbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto(
  abfragevarianten: Array<AbfragevarianteWeiteresVerfahrenDto> | undefined,
): Array<AbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto> {
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
    } as AbfragevarianteWeiteresVerfahrenEinpflegenBedarfsmeldungDto;
  });
}

export function mapToAbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto(
  abfragevarianten: Array<AbfragevarianteBauleitplanverfahrenDto> | undefined,
): Array<AbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      bedarfsmeldungAbfrageersteller: abfragevariante.bedarfsmeldungAbfrageersteller,
      anmerkungAbfrageersteller: abfragevariante.anmerkungAbfrageersteller,
    } as AbfragevarianteBauleitplanverfahrenEinplanungBedarfeDto;
  });
}

export function mapToAbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto(
  abfragevarianten: Array<AbfragevarianteBaugenehmigungsverfahrenDto> | undefined,
): Array<AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      bedarfsmeldungAbfrageersteller: abfragevariante.bedarfsmeldungAbfrageersteller,
      anmerkungAbfrageersteller: abfragevariante.anmerkungAbfrageersteller,
    } as AbfragevarianteBaugenehmigungsverfahrenEinplanungBedarfeDto;
  });
}

export function mapToAbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto(
  abfragevarianten: Array<AbfragevarianteWeiteresVerfahrenDto> | undefined,
): Array<AbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto> {
  return _.toArray(abfragevarianten).map((abfragevariante) => {
    return {
      id: abfragevariante.id,
      version: abfragevariante.version,
      artAbfragevariante: abfragevariante.artAbfragevariante,
      bedarfsmeldungAbfrageersteller: abfragevariante.bedarfsmeldungAbfrageersteller,
      anmerkungAbfrageersteller: abfragevariante.anmerkungAbfrageersteller,
    } as AbfragevarianteWeiteresVerfahrenEinplanungBedarfeDto;
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
 * Erstellt von einer Abfrage oder Abfragevariante eine Kopie.
 * Dabei werden einige Felder bereinigt, da es fachlich oder technisch keinen Sinn macht, ihre Werte zu kopieren.
 * Außerdem wird an den Namen der Abfrage "- Kopie" oder "- Kopie <Nummer der Kopie>" angehängt.
 *
 * @param value Die zu kopierende Abfrage oder Abfragevariante.
 * @returns Die bereinigte Kopie.
 */
export function copyAbfrageOrAbfragevariante<T extends AnyAbfrageDto | AnyAbfragevarianteDto>(value: T): T {
  const copy = _.cloneDeep(value);
  if ("statusAbfrage" in value && "artAbfrage" in value) {
    sanitzeAbfragevariantenSachbearbeitung(copy);
  }
  sanitizeCopy(copy);
  copy.name = (copy.name ?? "") + " - Kopie";
  return copy;
}
/*
 * Wenn die Sachbearbeitung eine Abfrage durch "Datenübernahme" kopiert, sollen nur die Abfragevarianten der Abfrageerstellung (Abfragevariante Nr. 1.x) übernommen werden,
 * nicht aber die der Sachbearbeitung (Abfragevariante Nr. 2.x)
 */
function sanitzeAbfragevariantenSachbearbeitung<T extends AnyAbfrageDto>(value: T): T {
  if (value.statusAbfrage === StatusAbfrage.StartBearbeitung) {
    if (value.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      (value as BauleitplanverfahrenDto).abfragevariantenSachbearbeitungBauleitplanverfahren = [];
    } else if (value.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      (value as BaugenehmigungsverfahrenDto).abfragevariantenSachbearbeitungBaugenehmigungsverfahren = [];
    } else if (value.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren) {
      (value as WeiteresVerfahrenDto).abfragevariantenSachbearbeitungWeiteresVerfahren = [];
    }
  }
  return value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeCopy(value: any): void {
  if (typeof value === "object" && value !== null) {
    for (const key of Object.keys(value)) {
      if (sanitizationMap.has(key)) {
        value[key] = sanitizationMap.get(key);
      } else {
        sanitizeCopy(value[key]);
      }
    }
  }
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
  ["sobonBerechnung", createSobonBerechnungBauleitplanverfahren()],
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
