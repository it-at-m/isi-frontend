/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AdresseDto } from './AdresseDto';
import {
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import type { DokumentDto } from './DokumentDto';
import {
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';
import type { UncertainBoolean } from './UncertainBoolean';
import {
    UncertainBooleanFromJSON,
    UncertainBooleanFromJSONTyped,
    UncertainBooleanToJSON,
} from './UncertainBoolean';
import type { VerortungDto } from './VerortungDto';
import {
    VerortungDtoFromJSON,
    VerortungDtoFromJSONTyped,
    VerortungDtoToJSON,
} from './VerortungDto';

/**
 * 
 * @export
 * @interface BauvorhabenDto
 */
export interface BauvorhabenDto {
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof BauvorhabenDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof BauvorhabenDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BauvorhabenDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    nameVorhaben: string;
    /**
     * 
     * @type {number}
     * @memberof BauvorhabenDto
     */
    grundstuecksgroesse?: number;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    standVerfahren: BauvorhabenDtoStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    bauvorhabenNummer?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof BauvorhabenDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungDto}
     * @memberof BauvorhabenDto
     */
    verortung?: VerortungDto;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    fisNummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof BauvorhabenDto
     */
    sobonRelevant: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    sobonJahr?: BauvorhabenDtoSobonJahrEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof BauvorhabenDto
     */
    wesentlicheRechtsgrundlage: Array<BauvorhabenDtoWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof BauvorhabenDto
     */
    artFnp: Array<BauvorhabenDtoArtFnpEnum>;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof BauvorhabenDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    relevanteAbfragevariante?: string;
}


/**
 * @export
 */
export const BauvorhabenDtoStandVerfahrenEnum = {
    Unspecified: 'UNSPECIFIED',
    VorbereitungEckdatenbeschluss: 'VORBEREITUNG_ECKDATENBESCHLUSS',
    VorbereitungWettbewerbauslobung: 'VORBEREITUNG_WETTBEWERBAUSLOBUNG',
    VorbereitungAufstellungsbeschluss: 'VORBEREITUNG_AUFSTELLUNGSBESCHLUSS',
    VorbereitungBilligungsbeschlussStaedtebaulicherVertrag: 'VORBEREITUNG_BILLIGUNGSBESCHLUSS_STAEDTEBAULICHER_VERTRAG',
    VorliegenderSatzungsbeschluss: 'VORLIEGENDER_SATZUNGSBESCHLUSS',
    RechtsverbindlichkeitAmtsblatt: 'RECHTSVERBINDLICHKEIT_AMTSBLATT',
    Aufteilungsplan: 'AUFTEILUNGSPLAN',
    VorbereitungVorbescheid: 'VORBEREITUNG_VORBESCHEID',
    VorbereitungBaugenehmigung: 'VORBEREITUNG_BAUGENEHMIGUNG',
    VorabfrageOhneKonkretenStand: 'VORABFRAGE_OHNE_KONKRETEN_STAND',
    Strukturkonzept: 'STRUKTURKONZEPT',
    Rahmenplanung: 'RAHMENPLANUNG',
    Potentialuntersuchung: 'POTENTIALUNTERSUCHUNG',
    StaedtebaulicheSanierungsmassnahme: 'STAEDTEBAULICHE_SANIERUNGSMASSNAHME',
    StaedtebaulicheEntwicklungsmassnahme: 'STAEDTEBAULICHE_ENTWICKLUNGSMASSNAHME',
    InfoFehlt: 'INFO_FEHLT',
    FreieEingabe: 'FREIE_EINGABE'
} as const;
export type BauvorhabenDtoStandVerfahrenEnum = typeof BauvorhabenDtoStandVerfahrenEnum[keyof typeof BauvorhabenDtoStandVerfahrenEnum];

/**
 * @export
 */
export const BauvorhabenDtoSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type BauvorhabenDtoSobonJahrEnum = typeof BauvorhabenDtoSobonJahrEnum[keyof typeof BauvorhabenDtoSobonJahrEnum];

/**
 * @export
 */
export const BauvorhabenDtoWesentlicheRechtsgrundlageEnum = {
    QualifizierterBebauungsplan: 'QUALIFIZIERTER_BEBAUUNGSPLAN',
    VorhabensbezogenerBebauungsplan: 'VORHABENSBEZOGENER_BEBAUUNGSPLAN',
    EinfacherBebauungsplanParagraph30: 'EINFACHER_BEBAUUNGSPLAN_PARAGRAPH_30',
    EinfacherBebauungsplanParagraph30Ivm3435: 'EINFACHER_BEBAUUNGSPLAN_PARAGRAPH_30_IVM_34_35',
    SektoralerBebauungsplanParagraph9: 'SEKTORALER_BEBAUUNGSPLAN_PARAGRAPH_9',
    SektoralerBebauungsplanParagraph30Ivm3435: 'SEKTORALER_BEBAUUNGSPLAN_PARAGRAPH_30_IVM_34_35',
    Innenbereich: 'INNENBEREICH',
    Aussenbereich: 'AUSSENBEREICH',
    Befreiung: 'BEFREIUNG',
    InfoFehlt: 'INFO_FEHLT',
    FreieEingabe: 'FREIE_EINGABE'
} as const;
export type BauvorhabenDtoWesentlicheRechtsgrundlageEnum = typeof BauvorhabenDtoWesentlicheRechtsgrundlageEnum[keyof typeof BauvorhabenDtoWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const BauvorhabenDtoArtFnpEnum = {
    Wr: 'WR',
    Wa: 'WA',
    Mu: 'MU',
    Mk: 'MK',
    Mi: 'MI',
    Ge: 'GE'
} as const;
export type BauvorhabenDtoArtFnpEnum = typeof BauvorhabenDtoArtFnpEnum[keyof typeof BauvorhabenDtoArtFnpEnum];


/**
 * Check if a given object implements the BauvorhabenDto interface.
 */
export function instanceOfBauvorhabenDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "nameVorhaben" in value;
    isInstance = isInstance && "standVerfahren" in value;
    isInstance = isInstance && "sobonRelevant" in value;
    isInstance = isInstance && "wesentlicheRechtsgrundlage" in value;
    isInstance = isInstance && "artFnp" in value;

    return isInstance;
}

export function BauvorhabenDtoFromJSON(json: any): BauvorhabenDto {
    return BauvorhabenDtoFromJSONTyped(json, false);
}

export function BauvorhabenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauvorhabenDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'nameVorhaben': json['nameVorhaben'],
        'grundstuecksgroesse': !exists(json, 'grundstuecksgroesse') ? undefined : json['grundstuecksgroesse'],
        'standVerfahren': json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'bauvorhabenNummer': !exists(json, 'bauvorhabenNummer') ? undefined : json['bauvorhabenNummer'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungDtoFromJSON(json['verortung']),
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'fisNummer': !exists(json, 'fisNummer') ? undefined : json['fisNummer'],
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'sobonRelevant': UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'wesentlicheRechtsgrundlage': json['wesentlicheRechtsgrundlage'],
        'wesentlicheRechtsgrundlageFreieEingabe': !exists(json, 'wesentlicheRechtsgrundlageFreieEingabe') ? undefined : json['wesentlicheRechtsgrundlageFreieEingabe'],
        'artFnp': json['artFnp'],
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'relevanteAbfragevariante': !exists(json, 'relevanteAbfragevariante') ? undefined : json['relevanteAbfragevariante'],
    };
}

export function BauvorhabenDtoToJSON(value?: BauvorhabenDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'nameVorhaben': value.nameVorhaben,
        'grundstuecksgroesse': value.grundstuecksgroesse,
        'standVerfahren': value.standVerfahren,
        'standVerfahrenFreieEingabe': value.standVerfahrenFreieEingabe,
        'bauvorhabenNummer': value.bauvorhabenNummer,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungDtoToJSON(value.verortung),
        'bebauungsplannummer': value.bebauungsplannummer,
        'fisNummer': value.fisNummer,
        'anmerkung': value.anmerkung,
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'sobonJahr': value.sobonJahr,
        'wesentlicheRechtsgrundlage': value.wesentlicheRechtsgrundlage,
        'wesentlicheRechtsgrundlageFreieEingabe': value.wesentlicheRechtsgrundlageFreieEingabe,
        'artFnp': value.artFnp,
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'relevanteAbfragevariante': value.relevanteAbfragevariante,
    };
}

