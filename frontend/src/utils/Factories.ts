import {
  StatusAbfrage,
  AbfragevarianteBauleitplanverfahrenDto,
  BauleitplanverfahrenDto,
  AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum,
  AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum,
  BedarfsmeldungFachreferateDto,
  BedarfsmeldungFachreferateDtoInfrastruktureinrichtungTypEnum,
  AdresseDto,
  BaurateDto,
  BauvorhabenDto,
  BauvorhabenDtoArtFnpEnum,
  BauvorhabenDtoWesentlicheRechtsgrundlageEnum,
  BauleitplanverfahrenDtoStandVerfahrenEnum,
  BauvorhabenDtoStandVerfahrenEnum,
  DokumentDto,
  DokumentDtoArtDokumentEnum,
  FilepathDto,
  FoerderartDto,
  FoerdermixDto,
  FoerdermixStammDto,
  GrundschuleDto,
  GsNachmittagBetreuungDto,
  HausFuerKinderDto,
  InfrastruktureinrichtungDto,
  InfrastruktureinrichtungDtoEinrichtungstraegerEnum,
  InfrastruktureinrichtungDtoStatusEnum,
  KindergartenDto,
  KinderkrippeDto,
  MittelschuleDto,
  PresignedUrlDto,
  SchuleDto,
  BauabschnittDto,
  BaugebietDto,
  BaugebietDtoArtBaulicheNutzungEnum,
  UncertainBoolean,
  InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum,
  SearchQueryAndSortingDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
  AbfrageDtoArtAbfrageEnum,
  AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum,
} from "@/api/api-client/isi-backend";
import { v4 as uuidv4 } from "uuid";
import { AdressSucheDto, MuenchenAdresseDto } from "@/api/api-client/isi-master-eai";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";

export function createSearchQueryAndSortingModel(): SearchQueryAndSortingModel {
  const searchQueryAndSortingDto = {
    searchQuery: "",
    selectBauleitplanverfahren: true,
    selectBauvorhaben: true,
    selectGrundschule: true,
    selectGsNachmittagBetreuung: true,
    selectHausFuerKinder: true,
    selectKindergarten: true,
    selectKinderkrippe: true,
    selectMittelschule: true,
    pageSize: undefined,
    page: undefined,
    sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
  } as SearchQueryAndSortingDto;
  return new SearchQueryAndSortingModel(searchQueryAndSortingDto);
}

/**
 * BauleitplanverfahrenDto
 */
export function createBauleitplanverfahrenDto(): BauleitplanverfahrenDto {
  return {
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
    bebauungsplannummer: undefined,
    sobonRelevant: UncertainBoolean.Unspecified,
    sobonJahr: undefined,
    standVerfahren: BauleitplanverfahrenDtoStandVerfahrenEnum.Unspecified,
    standVerfahrenFreieEingabe: undefined,
    adresse: createAdresseDto(),
    verortung: undefined,
    dokumente: new Array<DokumentDto>(),
    fristBearbeitung: new Date(0),
    offizielleMitzeichnung: UncertainBoolean.Unspecified,
    anmerkung: undefined,
    abfragevarianten: new Array<AbfragevarianteBauleitplanverfahrenDto>(),
    abfragevariantenSachbearbeitung: new Array<AbfragevarianteBauleitplanverfahrenDto>(),
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
    weGesamt: undefined,
    weSonderwohnformen: false,
    weStudentischesWohnen: undefined,
    weSeniorinnenWohnen: undefined,
    weGenossenschaftlichesWohnen: undefined,
    weWeiteresNichtInfrastrukturrelevantesWohnen: undefined,
    gfWohnenPlanungsursaechlich: undefined,
    sobonOrientierungswertJahr: AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum.Unspecified,
    anmerkung: undefined,
    bedarfsmeldungFachreferate: new Array<BedarfsmeldungFachreferateDto>(),
    bauabschnitte: [],
  };
}

/**
 * AbfragevarianteFachreferatDto
 */
export function createAbfragevarianteFachreferatDto(): AbfragevarianteFachreferatDto {
  return {
    bedarfsmeldungFachreferate: new Array<BedarfsmeldungFachreferateDto>(),
  };
}

/**
 * BedarfsmeldungFachabteilungenDto
 */
export function createBedarfsmeldungFachabteilungenDto(): BedarfsmeldungFachreferateDto {
  return {
    anzahlEinrichtungen: undefined,
    infrastruktureinrichtungTyp: BedarfsmeldungFachreferateDtoInfrastruktureinrichtungTypEnum.Unspecified,
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
    artBaulicheNutzung: BaugebietDtoArtBaulicheNutzungEnum.Ge,
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
      foerderarten: new Array<FoerderartDto>(),
    },
  };
}

export function createFoerdermixDto(): FoerdermixDto {
  return {
    foerderarten: new Array<FoerderartDto>(),
  };
}

export function createFoerdermixStammDto(): FoerdermixStammDto {
  return {
    bezeichnung: "",
    bezeichnungJahr: "",
    foerdermix: {
      foerderarten: new Array<FoerderartDto>(),
    },
  };
}

/**
 * InfrastruktureinrichtungDto
 */
export function createInfrastruktureinrichtungDto(): InfrastruktureinrichtungDto {
  return {
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Unspecified,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: InfrastruktureinrichtungDtoEinrichtungstraegerEnum.Unspecified,
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
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Kinderkrippe,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: InfrastruktureinrichtungDtoEinrichtungstraegerEnum.Unspecified,
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
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Kindergarten,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: InfrastruktureinrichtungDtoEinrichtungstraegerEnum.Unspecified,
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
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.HausFuerKinder,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: InfrastruktureinrichtungDtoEinrichtungstraegerEnum.Unspecified,
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
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.GsNachmittagBetreuung,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: InfrastruktureinrichtungDtoEinrichtungstraegerEnum.Unspecified,
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
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Grundschule,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: InfrastruktureinrichtungDtoEinrichtungstraegerEnum.Unspecified,
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
    infrastruktureinrichtungTyp: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Mittelschule,
    lfdNr: undefined,
    bauvorhaben: undefined,
    adresse: createAdresseDto(),
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: InfrastruktureinrichtungDtoEinrichtungstraegerEnum.Unspecified,
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
