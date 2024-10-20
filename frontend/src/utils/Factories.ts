import type {
  // Adresse
  AdresseDto,
  // AbfrageDto's
  AbfrageDto,
  BauleitplanverfahrenDto,
  BaugenehmigungsverfahrenDto,
  WeiteresVerfahrenDto,
  // AbfragevariantenDto's
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
  // Bedarfsmeldung
  BedarfsmeldungDto,
  // Baurate / Fördermix
  BaurateDto,
  FoerderartDto,
  FoerdermixDto,
  FoerdermixStammDto,
  // Bauabschnitt
  BauabschnittDto,
  // Baugebiet
  BaugebietDto,
  // Bauvorhaben
  BauvorhabenDto,
  // Infrastruktureinrichtungen
  InfrastruktureinrichtungDto,
  KinderkrippeDto,
  KindergartenDto,
  HausFuerKinderDto,
  GsNachmittagBetreuungDto,
  SchuleDto,
  GrundschuleDto,
  MittelschuleDto,
  // Dokumente
  DokumentDto,
  FilepathDto,
  PresignedUrlDto,
  // Kommentar
  KommentarBauvorhabenDto,
  KommentarInfrastruktureinrichtungDto,
  // Suche
  SearchQueryAndSortingDto,
  SobonBerechnungDto,
} from "@/api/api-client/isi-backend";
import {
  // dreiwertiges Boolean
  UncertainBoolean,
  // Status der Abfrage
  StatusAbfrage,
  // AbfrageArtEnum
  AbfrageDtoArtAbfrageEnum,
  // Abfrage StandVerfahrenEnum's
  BauleitplanverfahrenDtoStandVerfahrenEnum,
  BaugenehmigungsverfahrenDtoStandVerfahrenEnum,
  WeiteresVerfahrenDtoStandVerfahrenEnum,
  // Abfragevariante ArtAbfragevarianteEnum's
  AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum,
  AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum,
  AbfragevarianteWeiteresVerfahrenDtoArtAbfragevarianteEnum,
  // Abfragevariante WesentlicheRechtsgrundlageEnum's
  AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum,
  AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum,
  AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum,
  // Abfragevariante SobonOrientierungswertJahrEnum's
  AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum,
  AbfragevarianteBaugenehmigungsverfahrenDtoSobonOrientierungswertJahrEnum,
  AbfragevarianteWeiteresVerfahrenDtoSobonOrientierungswertJahrEnum,
  // Bedarfsmeldung
  BedarfsmeldungDtoInfrastruktureinrichtungTypEnum,
  // Baugebiet
  BaugebietDtoArtBaulicheNutzungEnum,
  // Bauvorhaben
  BauvorhabenDtoArtFnpEnum,
  BauvorhabenDtoWesentlicheRechtsgrundlageEnum,
  BauvorhabenDtoStandVerfahrenEnum,
  // Infrastruktureinrichtungen
  InfrastruktureinrichtungDtoStatusEnum,
  InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum,
  SchuleDtoEinrichtungstraegerEnum,
  KindergartenDtoEinrichtungstraegerEnum,
  HausFuerKinderDtoAllOfEinrichtungstraegerEnum,
  GsNachmittagBetreuungDtoAllOfEinrichtungstraegerEnum,
  // Dokumente
  DokumentDtoArtDokumentEnum,
  // Suche
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import { v4 as uuidv4 } from "uuid";
import type { AdressSucheDto, MuenchenAdresseDto } from "@/api/api-client/isi-master-eai";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";

export function createSearchQueryAndSortingModel(): SearchQueryAndSortingModel {
  const searchQueryAndSortingDto = {
    searchQuery: "",
    selectBauleitplanverfahren: true,
    selectBaugenehmigungsverfahren: true,
    selectWeiteresVerfahren: true,
    selectBauvorhaben: true,
    selectGrundschule: true,
    selectGsNachmittagBetreuung: true,
    selectHausFuerKinder: true,
    selectKindergarten: true,
    selectKinderkrippe: true,
    selectMittelschule: true,
    filterStadtbezirkNummer: undefined,
    filterKitaplanungsbereichKitaPlbT: undefined,
    filterGrundschulsprengelNummer: undefined,
    filterMittelschulsprengelNummer: undefined,
    filterRealisierungsbeginnVon: undefined,
    filterRealisierungsbeginnBis: undefined,
    filterNurEigeneAbfragen: false,
    filterStatusAbfrage: undefined,
    filterSobonRelevant: UncertainBoolean.Unspecified,
    filterWeGesamtVon: undefined,
    filterWeGesamtBis: undefined,
    filterGfWohnenGeplantVon: undefined,
    filterGfWohnenGeplantBis: undefined,
    filterStandVerfahren: undefined,
    filterInfrastruktureinrichtungStatus: undefined,
    page: undefined,
    pageSize: undefined,
    sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
  } as SearchQueryAndSortingDto;
  return new SearchQueryAndSortingModel(searchQueryAndSortingDto);
}

/**
 * AbfrageDto
 */
export function createAbfrageDto(): AbfrageDto {
  return {
    id: "",
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    artAbfrage: AbfrageDtoArtAbfrageEnum.Unspecified,
    name: "",
    statusAbfrage: StatusAbfrage.Angelegt,
    anmerkung: undefined,
    linkEakte: undefined,
    bauvorhaben: undefined,
    sub: undefined,
    displayName: undefined,
  };
}

/**
 * BauleitplanverfahrenDto
 */

export function createBauleitplanverfahrenDto(): BauleitplanverfahrenDto {
  return {
    // Basisklasse AbfrageDto
    id: "",
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    artAbfrage: AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
    name: "",
    statusAbfrage: StatusAbfrage.Angelegt,
    bauvorhaben: undefined,
    sub: undefined,
    displayName: undefined,
    // Subklasse: BauleitplanverfahrenDto
    bebauungsplannummer: undefined,
    sobonRelevant: UncertainBoolean.Unspecified,
    sobonJahr: undefined,
    standVerfahren: BauleitplanverfahrenDtoStandVerfahrenEnum.Unspecified,
    standVerfahrenFreieEingabe: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    dokumente: new Array<DokumentDto>(),
    fristBearbeitung: new Date(0),
    mitzeichnungBeschlussentwurf: UncertainBoolean.Unspecified,
    anmerkung: undefined,
    linkEakte: undefined,
    abfragevariantenBauleitplanverfahren: new Array<AbfragevarianteBauleitplanverfahrenDto>(),
    abfragevariantenSachbearbeitungBauleitplanverfahren: new Array<AbfragevarianteBauleitplanverfahrenDto>(),
  };
}

/**
 * BaugenehmigungsverfahrenDto
 */
export function createBaugenehmigungsverfahrenDto(): BaugenehmigungsverfahrenDto {
  return {
    // Basisklasse AbfrageDto
    id: "",
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    artAbfrage: AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren,
    name: "",
    statusAbfrage: StatusAbfrage.Angelegt,
    anmerkung: undefined,
    linkEakte: undefined,
    bauvorhaben: undefined,
    sub: undefined,
    displayName: undefined,
    // Subklasse: BaugenehmigungsverfahrenDto
    aktenzeichenProLbk: undefined,
    bebauungsplannummer: undefined,
    standVerfahren: BaugenehmigungsverfahrenDtoStandVerfahrenEnum.Unspecified,
    standVerfahrenFreieEingabe: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    dokumente: new Array<DokumentDto>(),
    fristBearbeitung: new Date(0),
    abfragevariantenBaugenehmigungsverfahren: new Array<AbfragevarianteBaugenehmigungsverfahrenDto>(),
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren: new Array<AbfragevarianteBaugenehmigungsverfahrenDto>(),
  };
}

/**
 * WeiteresVerfahrenDto
 */
export function createWeiteresVerfahrenDto(): WeiteresVerfahrenDto {
  return {
    // Basisklasse AbfrageDto
    id: "",
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    artAbfrage: AbfrageDtoArtAbfrageEnum.WeiteresVerfahren,
    name: "",
    statusAbfrage: StatusAbfrage.Angelegt,
    anmerkung: undefined,
    linkEakte: undefined,
    bauvorhaben: undefined,
    sub: undefined,
    displayName: undefined,
    // Subklasse: WeiteresVerfahrenDto
    aktenzeichenProLbk: undefined,
    bebauungsplannummer: undefined,
    sobonRelevant: UncertainBoolean.Unspecified,
    sobonJahr: undefined,
    standVerfahren: WeiteresVerfahrenDtoStandVerfahrenEnum.Unspecified,
    standVerfahrenFreieEingabe: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    dokumente: new Array<DokumentDto>(),
    fristBearbeitung: new Date(0),
    mitzeichnungBeschlussentwurf: UncertainBoolean.Unspecified,
    abfragevariantenWeiteresVerfahren: new Array<AbfragevarianteWeiteresVerfahrenDto>(),
    abfragevariantenSachbearbeitungWeiteresVerfahren: new Array<AbfragevarianteWeiteresVerfahrenDto>(),
  };
}

/**
 * AdresseDto
 */
export function createAdresseDto(): AdresseDto {
  return {
    angabeLageErgaenzendeAdressinformation: undefined,
    plz: undefined,
    ort: undefined,
    strasse: undefined,
    hausnummer: undefined,
    coordinate: undefined,
  };
}

/**
 * AbfragevarianteBauleitplanverfahrenDto
 */
export function createAbfragevarianteBauleitplanverfahrenDto(): AbfragevarianteBauleitplanverfahrenDto {
  return {
    id: "",
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    abfragevariantenNr: Number.NaN,
    artAbfragevariante: AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren,
    name: "",
    satzungsbeschluss: undefined,
    wesentlicheRechtsgrundlage: Array<AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum>(),
    wesentlicheRechtsgrundlageFreieEingabe: undefined,
    realisierungVon: Number.NaN,
    gfWohnenGesamt: undefined,
    gfWohnenSobonUrsaechlich: undefined,
    gfWohnenBestandswohnbaurecht: undefined,
    gfWohnenSonderwohnformen: false,
    gfWohnenStudentischesWohnen: undefined,
    gfWohnenSeniorinnenWohnen: undefined,
    gfWohnenGenossenschaftlichesWohnen: undefined,
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen: undefined,
    gfAnmerkung: undefined,
    weGesamt: undefined,
    weSonderwohnformen: false,
    weStudentischesWohnen: undefined,
    weSeniorinnenWohnen: undefined,
    weGenossenschaftlichesWohnen: undefined,
    weWeiteresNichtInfrastrukturrelevantesWohnen: undefined,
    weAnmerkung: undefined,
    sobonOrientierungswertJahr: AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum.Unspecified,
    sobonBerechnung: createSobonBerechnung(),
    stammdatenGueltigAb: new Date(0),
    hasBauratendateiInput: false,
    anmerkungBauratendateiInput: undefined,
    bauratendateiInputBasis: undefined,
    bauratendateiInput: [],
    anmerkung: undefined,
    dokumente: [],
    bedarfsmeldungFachreferate: new Array<BedarfsmeldungDto>(),
    bedarfsmeldungAbfrageersteller: new Array<BedarfsmeldungDto>(),
    anmerkungFachreferate: undefined,
    anmerkungAbfrageersteller: undefined,
    bauabschnitte: [],
  };
}

/**
 * AbfragevarianteBaugenehmigungsverfahrenDto
 */
export function createAbfragevarianteBaugenehmigungsverfahrenDto(): AbfragevarianteBaugenehmigungsverfahrenDto {
  return {
    id: "",
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    abfragevariantenNr: Number.NaN,
    artAbfragevariante: AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum.Baugenehmigungsverfahren,
    name: "",
    wesentlicheRechtsgrundlage: Array<AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum>(),
    wesentlicheRechtsgrundlageFreieEingabe: undefined,
    realisierungVon: Number.NaN,
    gfWohnenGesamt: undefined,
    gfWohnenBaurechtlichGenehmigt: undefined,
    gfWohnenBaurechtlichFestgesetzt: undefined,
    gfWohnenBestandswohnbaurecht: undefined,
    gfWohnenSonderwohnformen: false,
    gfWohnenStudentischesWohnen: undefined,
    gfWohnenSeniorinnenWohnen: undefined,
    gfWohnenGenossenschaftlichesWohnen: undefined,
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen: undefined,
    gfAnmerkung: undefined,
    weGesamt: undefined,
    weBaurechtlichGenehmigt: undefined,
    weBaurechtlichFestgesetzt: undefined,
    weSonderwohnformen: false,
    weStudentischesWohnen: undefined,
    weSeniorinnenWohnen: undefined,
    weGenossenschaftlichesWohnen: undefined,
    weWeiteresNichtInfrastrukturrelevantesWohnen: undefined,
    weAnmerkung: undefined,
    sobonOrientierungswertJahr: AbfragevarianteBaugenehmigungsverfahrenDtoSobonOrientierungswertJahrEnum.Unspecified,
    stammdatenGueltigAb: new Date(0),
    hasBauratendateiInput: false,
    anmerkungBauratendateiInput: undefined,
    bauratendateiInputBasis: undefined,
    bauratendateiInput: [],
    anmerkung: undefined,
    dokumente: [],
    bedarfsmeldungFachreferate: new Array<BedarfsmeldungDto>(),
    bedarfsmeldungAbfrageersteller: new Array<BedarfsmeldungDto>(),
    anmerkungFachreferate: undefined,
    anmerkungAbfrageersteller: undefined,
    bauabschnitte: [],
  };
}

/**
 * AbfragevarianteWeiteresVerfahrenDto
 */
export function createAbfragevarianteWeiteresVerfahrenDto(): AbfragevarianteWeiteresVerfahrenDto {
  return {
    id: "",
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    abfragevariantenNr: Number.NaN,
    artAbfragevariante: AbfragevarianteWeiteresVerfahrenDtoArtAbfragevarianteEnum.WeiteresVerfahren,
    name: "",
    satzungsbeschluss: undefined,
    wesentlicheRechtsgrundlage: Array<AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum>(),
    wesentlicheRechtsgrundlageFreieEingabe: undefined,
    realisierungVon: Number.NaN,
    gfWohnenGesamt: undefined,
    gfWohnenBaurechtlichGenehmigt: undefined,
    gfWohnenBaurechtlichFestgesetzt: undefined,
    gfWohnenSobonUrsaechlich: undefined,
    gfWohnenBestandswohnbaurecht: undefined,
    gfWohnenSonderwohnformen: false,
    gfWohnenStudentischesWohnen: undefined,
    gfWohnenSeniorinnenWohnen: undefined,
    gfWohnenGenossenschaftlichesWohnen: undefined,
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen: undefined,
    gfAnmerkung: undefined,
    weGesamt: undefined,
    weBaurechtlichGenehmigt: undefined,
    weBaurechtlichFestgesetzt: undefined,
    weSonderwohnformen: false,
    weStudentischesWohnen: undefined,
    weSeniorinnenWohnen: undefined,
    weGenossenschaftlichesWohnen: undefined,
    weWeiteresNichtInfrastrukturrelevantesWohnen: undefined,
    weAnmerkung: undefined,
    sobonOrientierungswertJahr: AbfragevarianteWeiteresVerfahrenDtoSobonOrientierungswertJahrEnum.Unspecified,
    sobonBerechnung: createSobonBerechnung(),
    stammdatenGueltigAb: new Date(0),
    hasBauratendateiInput: false,
    anmerkungBauratendateiInput: undefined,
    bauratendateiInputBasis: undefined,
    bauratendateiInput: [],
    anmerkung: undefined,
    dokumente: [],
    bedarfsmeldungFachreferate: new Array<BedarfsmeldungDto>(),
    bedarfsmeldungAbfrageersteller: new Array<BedarfsmeldungDto>(),
    anmerkungFachreferate: undefined,
    anmerkungAbfrageersteller: undefined,
    bauabschnitte: [],
  };
}

export function createSobonBerechnung(): SobonBerechnungDto {
  return {
    sobonFoerdermix: createFoerdermixDto(),
    isASobonBerechnung: false,
  };
}

/**
 * BedarfsmeldungDto
 */
export function createBedarfsmeldungDto(): BedarfsmeldungDto {
  return {
    anzahlEinrichtungen: undefined,
    infrastruktureinrichtungTyp: BedarfsmeldungDtoInfrastruktureinrichtungTypEnum.Unspecified,
    anzahlKinderkrippengruppen: undefined,
    anzahlKindergartengruppen: undefined,
    anzahlHortgruppen: undefined,
    anzahlGrundschulzuege: undefined,
  };
}

/**
 * BauvorhabenDto
 */
export function createBauvorhabenDto(): BauvorhabenDto {
  return {
    id: "",
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bearbeitendePerson: undefined,
    nameVorhaben: "",
    grundstuecksgroesse: Number.NaN,
    standVerfahren: BauvorhabenDtoStandVerfahrenEnum.Unspecified,
    bauvorhabenNummer: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    bebauungsplannummer: undefined,
    fisNummer: undefined,
    anmerkung: undefined,
    sobonRelevant: UncertainBoolean.Unspecified,
    sobonJahr: undefined,
    wesentlicheRechtsgrundlage: new Array<BauvorhabenDtoWesentlicheRechtsgrundlageEnum>(),
    wesentlicheRechtsgrundlageFreieEingabe: undefined,
    artFnp: new Array<BauvorhabenDtoArtFnpEnum>(),
    dokumente: [],
    relevanteAbfragevariante: undefined,
  };
}

/**
 * FilepathDto
 */
export function createFilepathDto(): FilepathDto {
  return {
    pathToFile: "",
  };
}

export function createFilepathFor(nameRootFolder: string): string {
  return `${nameRootFolder}/${uuidv4()}/`;
}

/**
 * PresignedUrlDto
 */
export function createPresignedUrlDto(): PresignedUrlDto {
  return {
    httpMethodToUse: undefined,
    url: undefined,
  };
}

/**
 * DokumentDto
 */
export function createDokumentDto(): DokumentDto {
  return {
    id: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    filePath: createFilepathDto(),
    artDokument: DokumentDtoArtDokumentEnum.Unspecified,
    sizeInBytes: 0,
    typDokument: "",
  };
}

/**
 * BauabschnittDto
 */
export function createBauabschnittDto(): BauabschnittDto {
  return {
    id: undefined,
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bezeichnung: "",
    baugebiete: [],
    technical: false,
  };
}

/**
 * BauabschnittDto-Platzhalter
 */
export function createTechnicalBauabschnittDto(): BauabschnittDto {
  return {
    id: undefined,
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bezeichnung: "Platzhalter",
    baugebiete: [],
    technical: true,
  };
}

/**
 * BaugebietDto
 */
export function createBaugebietDto(): BaugebietDto {
  return {
    id: undefined,
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bezeichnung: "",
    realisierungVon: Number.NaN,
    artBaulicheNutzung: BaugebietDtoArtBaulicheNutzungEnum.Unspecified,
    bauraten: [],
    technical: false,
  };
}

/**
 * BaugebietDto-Platzhalter
 */
export function createTechnicalBaugebietDto(): BaugebietDto {
  return {
    id: undefined,
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bezeichnung: "Platzhalter",
    realisierungVon: Number.NaN,
    artBaulicheNutzung: BaugebietDtoArtBaulicheNutzungEnum.Ge,
    bauraten: [],
    technical: true,
  };
}

/**
 * BaurateDto
 */
export function createBaurateDto(): BaurateDto {
  return {
    id: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    gfWohnenGeplant: undefined,
    weGeplant: undefined,
    jahr: Number.NaN,
    foerdermix: {
      bezeichnung: "",
      bezeichnungJahr: "",
      foerderarten: new Array<FoerderartDto>(),
    },
  };
}

export function createFoerdermixDto(): FoerdermixDto {
  return {
    bezeichnung: "",
    bezeichnungJahr: "",
    foerderarten: new Array<FoerderartDto>(),
  };
}

export function createFoerdermixStammDto(): FoerdermixStammDto {
  return {
    foerdermix: {
      bezeichnung: "",
      bezeichnungJahr: "",
      foerderarten: new Array<FoerderartDto>(),
    },
  };
}

/**
 * InfrastruktureinrichtungDto
 */
export function createInfrastruktureinrichtungDto(): InfrastruktureinrichtungDto {
  return {
    id: "",
    version: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bearbeitendePerson: undefined,
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Unspecified,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    flaecheGesamtgrundstueck: undefined,
    flaecheTeilgrundstueck: undefined,
  };
}

/**
 * SchuleDto
 */
export function createSchuleDto(): SchuleDto {
  return {
    anzahlKlassen: Number.NaN,
    anzahlPlaetze: Number.NaN,
    einrichtungstraeger: SchuleDtoEinrichtungstraegerEnum.Unspecified,
  };
}

/**
 * KinderkrippeDto
 */
export function createKinderkrippeDto(): KinderkrippeDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bearbeitendePerson: undefined,
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Kinderkrippe,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: KindergartenDtoEinrichtungstraegerEnum.Unspecified,
    flaecheGesamtgrundstueck: undefined,
    flaecheTeilgrundstueck: undefined,
    anzahlKinderkrippePlaetze: Number.NaN,
    anzahlKinderkrippeGruppen: Number.NaN,
    wohnungsnaheKinderkrippePlaetze: undefined,
  };
}

/**
 * KindergartenDto
 */
export function createKindergartenDto(): KindergartenDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bearbeitendePerson: undefined,
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Kindergarten,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: KindergartenDtoEinrichtungstraegerEnum.Unspecified,
    flaecheGesamtgrundstueck: undefined,
    flaecheTeilgrundstueck: undefined,
    anzahlKindergartenPlaetze: Number.NaN,
    anzahlKindergartenGruppen: Number.NaN,
    wohnungsnaheKindergartenPlaetze: undefined,
  };
}

/**
 * HausFuerKinderDto
 */
export function createHausFuerKinderDto(): HausFuerKinderDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bearbeitendePerson: undefined,
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.HausFuerKinder,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: HausFuerKinderDtoAllOfEinrichtungstraegerEnum.Unspecified,
    flaecheGesamtgrundstueck: undefined,
    flaecheTeilgrundstueck: undefined,
    anzahlKinderkrippePlaetze: Number.NaN,
    anzahlKindergartenPlaetze: Number.NaN,
    anzahlHortPlaetze: Number.NaN,
    anzahlKinderkrippeGruppen: Number.NaN,
    anzahlKindergartenGruppen: Number.NaN,
    anzahlHortGruppen: Number.NaN,
    wohnungsnaheKinderkrippePlaetze: undefined,
    wohnungsnaheKindergartenPlaetze: undefined,
    wohnungsnaheHortPlaetze: undefined,
  };
}

/**
 * GsNachmittagBetreuungDto (Nachmittagsbetreuung für Grundschulkinder)
 */
export function createGsNachmittagBetreuungDto(): GsNachmittagBetreuungDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bearbeitendePerson: undefined,
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: GsNachmittagBetreuungDtoAllOfEinrichtungstraegerEnum.Unspecified,
    flaecheGesamtgrundstueck: undefined,
    flaecheTeilgrundstueck: undefined,
    artGsNachmittagBetreuung: undefined,
    anzahlHortGruppen: Number.NaN,
    anzahlHortPlaetze: Number.NaN,
  };
}

/**
 * GrundschuleDto
 */
export function createGrundschuleDto(): GrundschuleDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bearbeitendePerson: undefined,
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Grundschule,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    flaecheGesamtgrundstueck: undefined,
    flaecheTeilgrundstueck: undefined,
    schule: createSchuleDto(),
  };
}

/**
 * MittelschuleDto
 */
export function createMittelschuleDto(): MittelschuleDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    bearbeitendePerson: undefined,
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Mittelschule,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    flaecheGesamtgrundstueck: undefined,
    flaecheTeilgrundstueck: undefined,
    schule: createSchuleDto(),
  };
}

/**
 * AdressSucheDto
 */
export function createAdressSucheDto(): AdressSucheDto {
  return {
    query: "",
    page: undefined,
    pagesize: undefined,
  };
}

/**
 * MuenchenAdresseDto
 */
export function createMuenchenAdresseDto(): MuenchenAdresseDto {
  return {
    adresse: undefined,
    adressId: undefined,
    hausnummer: undefined,
    ortsname: undefined,
    strassenname: undefined,
    position: undefined,
    geozuordnungen: undefined,
  };
}

export function createKommentarBauvorhabenDto(): KommentarBauvorhabenDto {
  return {
    dokumente: [],
  };
}

export function createKommentarInfrastruktureinrichtungDto(): KommentarInfrastruktureinrichtungDto {
  return {
    dokumente: [],
  };
}

export const enum BedarfsmeldungTitle {
  FACHREFERATE = "Bedarfsmeldungen der Fachreferate",
  ABFRAGEERSTELLUNG = "Rückmeldung zu Bedarfsmeldungen durch Abfrageerstellung",
}
