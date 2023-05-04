import {
  AbfrageDto,
  AbfrageDtoStandVorhabenEnum,
  StatusAbfrage,
  AbfragevarianteDto,
  AbfragevarianteDtoPlanungsrechtEnum,
  AdresseDto,
  BaurateDto,
  BauvorhabenDto,
  BauvorhabenDtoArtFnpEnum,
  BauvorhabenDtoPlanungsrechtEnum,
  BauvorhabenDtoStandVorhabenEnum,
  DokumentDto,
  DokumentDtoArtDokumentEnum,
  FilepathDto,
  FoerderartDto,
  FoerdermixDto,
  FoerdermixStammDto,
  GrundschuleDto,
  GsNachmittagBetreuungDto,
  HausFuerKinderDto,
  InfrastrukturabfrageDto,
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
  BaugebietDtoBaugebietTypEnum,
  UncertainBoolean,
  VerortungDto,
  GemarkungDto,
  StadtbezirkDto,
} from "@/api/api-client/isi-backend";
import { v4 as uuidv4 } from "uuid";
import { AdressSucheDto, MuenchenAdresseDto } from "@/api/api-client/isi-master-eai";

export function createAbfragevarianteDto(): AbfragevarianteDto {
  return {
    abfragevariantenNr: Number.NaN,
    abfragevariantenName: "",
    planungsrecht: AbfragevarianteDtoPlanungsrechtEnum.Unspecified,
    geschossflaecheWohnen: undefined,
    geschossflaecheWohnenGenehmigt: undefined,
    geschossflaecheWohnenFestgesetzt: undefined,
    geschossflaecheWohnenSoBoNursaechlich: undefined,
    geschossflaecheWohnenBestandswohnbaurecht: undefined,
    gesamtanzahlWe: undefined,
    anzahlWeBaurechtlichGenehmigt: undefined,
    anzahlWeBaurechtlichFestgesetzt: undefined,
    realisierungVon: Number.NaN,
    realisierungBis: Number.NaN,
    geschossflaecheGenossenschaftlicheWohnungen: undefined,
    sonderwohnformen: false,
    geschossflaecheStudentenwohnungen: undefined,
    geschossflaecheSeniorenwohnungen: undefined,
    geschossflaecheSonstiges: undefined,
    bauabschnitte: [],
  } as AbfragevarianteDto;
}

/**
 * AbfrageDto
 */
export function createAbfrageDto(): AbfrageDto {
  return {
    allgemeineOrtsangabe: undefined,
    adresse: {
      strasse: "",
      hausnummer: "",
      plz: "",
      ort: "",
      coordinate: undefined,
    },
    verortung: undefined,
    fristStellungnahme: new Date(0),
    anmerkung: undefined,
    statusAbfrage: StatusAbfrage.Angelegt,
    bebauungsplannummer: undefined,
    nameAbfrage: "",
    standVorhaben: AbfrageDtoStandVorhabenEnum.Unspecified,
    bauvorhaben: undefined,
    dokumente: new Array<DokumentDto>(),
  } as AbfrageDto;
}

/**
 * InfrastrukturabfrageDto
 */
export function createInfrastrukturabfrageDto(): InfrastrukturabfrageDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    abfrage: createAbfrageDto(),
    sobonRelevant: UncertainBoolean.Unspecified,
    sobonJahr: undefined,
    abfragevarianten: new Array<AbfragevarianteDto>(),
    aktenzeichenProLbk: undefined,
    offiziellerVerfahrensschritt: UncertainBoolean.Unspecified,
  } as InfrastrukturabfrageDto;
}

/**
 * AdresseDto
 */
export function createAdresseDto(): AdresseDto {
  return {
    plz: undefined,
    ort: undefined,
    strasse: undefined,
    hausnummer: undefined,
    coordinate: undefined,
  } as AdresseDto;
}

/**
 * BauvorhabenDto
 */
export function createBauvorhabenDto(): BauvorhabenDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    nameVorhaben: "",
    eigentuemer: "",
    grundstuecksgroesse: Number.NaN,
    standVorhaben: BauvorhabenDtoStandVorhabenEnum.Unspecified,
    bauvorhabenNummer: "",
    adresse: {
      strasse: "",
      hausnummer: "",
      plz: "",
      ort: "",
      coordinate: undefined,
    },
    verortung: undefined,
    allgemeineOrtsangabe: "",
    bebauungsplannummer: "",
    fisNummer: "",
    anmerkung: "",
    sobonRelevant: UncertainBoolean.Unspecified,
    planungsrecht: BauvorhabenDtoPlanungsrechtEnum.Unspecified,
    artFnp: new Array<BauvorhabenDtoArtFnpEnum>(),
    dokumente: [],
  };
}

/**
 * FilepathDto
 */
export function createFilepathDto(): FilepathDto {
  return {
    pathToFile: "",
  } as FilepathDto;
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
  } as BauabschnittDto;
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
    baugebietTyp: BaugebietDtoBaugebietTypEnum.Unspecified,
    bauraten: [],
  } as BaugebietDto;
}

/**
 * BaurateDto
 */
export function createBaurateDto(): BaurateDto {
  return {
    id: undefined,
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    geschossflaecheWohnenGeplant: undefined,
    anzahlWeGeplant: undefined,
    jahr: Number.NaN,
    foerdermix: {
      foerderarten: new Array<FoerderartDto>(),
    } as FoerdermixDto,
  } as BaurateDto;
}

export function createFoerdermixDto(): FoerdermixDto {
  return {
    foerderarten: new Array<FoerderartDto>(),
  } as FoerdermixDto;
}

export function createFoerdermixStammDto(): FoerdermixStammDto {
  return {
    bezeichnung: "",
    bezeichnungJahr: "",
    foerdermix: {
      foerderarten: new Array<FoerderartDto>(),
    } as FoerdermixDto,
  } as FoerdermixStammDto;
}

/**
 * InfrastruktureinrichtungDto
 */
export function createInfrastruktureinrichtungDto(): InfrastruktureinrichtungDto {
  return {
    lfdNr: undefined,
    bauvorhaben: undefined,
    allgemeineOrtsangabe: undefined,
    adresse: undefined,
    nameEinrichtung: "",
    fertigstellungsjahr: Number.NaN,
    status: InfrastruktureinrichtungDtoStatusEnum.Unspecified,
    einrichtungstraeger: InfrastruktureinrichtungDtoEinrichtungstraegerEnum.Unspecified,
    flaecheGesamtgrundstueck: undefined,
    flaecheTeilgrundstueck: undefined,
    zugeordnetesBaugebiet: undefined,
  } as InfrastruktureinrichtungDto;
}

/**
 * SchuleDto
 */
export function createSchuleDto(): SchuleDto {
  return {
    anzahlKlassen: Number.NaN,
    anzahlPlaetze: Number.NaN,
  } as SchuleDto;
}

/**
 * KinderkrippeDto
 */
export function createKinderkrippeDto(): KinderkrippeDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    infrastruktureinrichtung: createInfrastruktureinrichtungDto(),
    anzahlKinderkrippePlaetze: Number.NaN,
    anzahlKinderkrippeGruppen: Number.NaN,
    wohnungsnaheKinderkrippePlaetze: undefined,
  } as KinderkrippeDto;
}

/**
 * KindergartenDto
 */
export function createKindergartenDto(): KindergartenDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    infrastruktureinrichtung: createInfrastruktureinrichtungDto(),
    anzahlKindergartenPlaetze: Number.NaN,
    anzahlKindergartenGruppen: Number.NaN,
    wohnungsnaheKindergartenPlaetze: undefined,
  } as KindergartenDto;
}

/**
 * HausFuerKinderDto
 */
export function createHausFuerKinderDto(): HausFuerKinderDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    infrastruktureinrichtung: createInfrastruktureinrichtungDto(),
    anzahlKinderkrippePlaetze: Number.NaN,
    anzahlKindergartenPlaetze: Number.NaN,
    anzahlHortPlaetze: Number.NaN,
    anzahlKinderkrippeGruppen: Number.NaN,
    anzahlKindergartenGruppen: Number.NaN,
    anzahlHortGruppen: Number.NaN,
    wohnungsnaheKinderkrippePlaetze: undefined,
    wohnungsnaheKindergartenPlaetze: undefined,
    wohnungsnaheHortPlaetze: undefined,
  } as HausFuerKinderDto;
}

/**
 * GsNachmittagBetreuungDto (Nachmittagsbetreuung für Grundschulkinder)
 */
export function createGsNachmittagBetreuungDto(): GsNachmittagBetreuungDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    infrastruktureinrichtung: createInfrastruktureinrichtungDto(),
    artGsNachmittagBetreuung: undefined,
  } as GsNachmittagBetreuungDto;
}

/**
 * GrundschuleDto
 */
export function createGrundschuleDto(): GrundschuleDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    infrastruktureinrichtung: createInfrastruktureinrichtungDto(),
    schule: createSchuleDto(),
  } as GrundschuleDto;
}

/**
 * MittelschuleDto
 */
export function createMittelschuleDto(): MittelschuleDto {
  return {
    id: "",
    createdDateTime: undefined,
    lastModifiedDateTime: undefined,
    infrastruktureinrichtung: createInfrastruktureinrichtungDto(),
    schule: createSchuleDto(),
  } as MittelschuleDto;
}

/**
 * AdressSucheDto
 */
export function createAdressSucheDto(): AdressSucheDto {
  return {
    query: "",
    page: undefined,
    pagesize: undefined,
  } as AdressSucheDto;
}

/**
 * MuenchenAdresseDto
 */
export function createMuenchenAdresseDto(): MuenchenAdresseDto {
  return {
    adresse: undefined,
    adressId: undefined,
    hausnummer: undefined,
    ortname: undefined,
    strassenname: undefined,
    position: undefined,
    geozuordnungen: undefined,
  } as MuenchenAdresseDto;
}
