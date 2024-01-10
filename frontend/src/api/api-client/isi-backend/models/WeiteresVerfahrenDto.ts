/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AbfrageDto } from './AbfrageDto';
import {
    AbfrageDtoFromJSON,
    AbfrageDtoFromJSONTyped,
    AbfrageDtoToJSON,
} from './AbfrageDto';
import type { AbfragevarianteWeiteresVerfahrenDto } from './AbfragevarianteWeiteresVerfahrenDto';
import {
    AbfragevarianteWeiteresVerfahrenDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenDto';
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
import type { StatusAbfrage } from './StatusAbfrage';
import {
    StatusAbfrageFromJSON,
    StatusAbfrageFromJSONTyped,
    StatusAbfrageToJSON,
} from './StatusAbfrage';
import type { UncertainBoolean } from './UncertainBoolean';
import {
    UncertainBooleanFromJSON,
    UncertainBooleanFromJSONTyped,
    UncertainBooleanToJSON,
} from './UncertainBoolean';
import type { VerortungMultiPolygonDto } from './VerortungMultiPolygonDto';
import {
    VerortungMultiPolygonDtoFromJSON,
    VerortungMultiPolygonDtoFromJSONTyped,
    VerortungMultiPolygonDtoToJSON,
} from './VerortungMultiPolygonDto';

import {
} from './';

/**
 * 
 * @export
 * @interface WeiteresVerfahrenDto
 */
export interface WeiteresVerfahrenDto extends AbfrageDto {
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenDto
     */
    aktenzeichenProLbk?: string;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenDto
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof WeiteresVerfahrenDto
     */
    sobonRelevant?: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenDto
     */
    sobonJahr?: WeiteresVerfahrenDtoSobonJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenDto
     */
    standVerfahren?: WeiteresVerfahrenDtoStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenDto
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof WeiteresVerfahrenDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof WeiteresVerfahrenDto
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof WeiteresVerfahrenDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof WeiteresVerfahrenDto
     */
    fristBearbeitung?: Date;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof WeiteresVerfahrenDto
     */
    offizielleMitzeichnung?: UncertainBoolean;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenDto>}
     * @memberof WeiteresVerfahrenDto
     */
    abfragevariantenWeiteresVerfahren?: Array<AbfragevarianteWeiteresVerfahrenDto>;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenDto>}
     * @memberof WeiteresVerfahrenDto
     */
    abfragevariantenSachbearbeitungWeiteresVerfahren?: Array<AbfragevarianteWeiteresVerfahrenDto>;
}


/**
 * @export
 */
export const WeiteresVerfahrenDtoSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type WeiteresVerfahrenDtoSobonJahrEnum = typeof WeiteresVerfahrenDtoSobonJahrEnum[keyof typeof WeiteresVerfahrenDtoSobonJahrEnum];

/**
 * @export
 */
export const WeiteresVerfahrenDtoStandVerfahrenEnum = {
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
export type WeiteresVerfahrenDtoStandVerfahrenEnum = typeof WeiteresVerfahrenDtoStandVerfahrenEnum[keyof typeof WeiteresVerfahrenDtoStandVerfahrenEnum];


/**
 * Check if a given object implements the WeiteresVerfahrenDto interface.
 */
export function instanceOfWeiteresVerfahrenDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function WeiteresVerfahrenDtoFromJSON(json: any): WeiteresVerfahrenDto {
    return WeiteresVerfahrenDtoFromJSONTyped(json, false);
}

export function WeiteresVerfahrenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...AbfrageDtoFromJSONTyped(json, ignoreDiscriminator),
        'aktenzeichenProLbk': !exists(json, 'aktenzeichenProLbk') ? undefined : json['aktenzeichenProLbk'],
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'sobonRelevant': !exists(json, 'sobonRelevant') ? undefined : UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'standVerfahren': !exists(json, 'standVerfahren') ? undefined : json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonDtoFromJSON(json['verortung']),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'fristBearbeitung': !exists(json, 'fristBearbeitung') ? undefined : (new Date(json['fristBearbeitung'])),
        'offizielleMitzeichnung': !exists(json, 'offizielleMitzeichnung') ? undefined : UncertainBooleanFromJSON(json['offizielleMitzeichnung']),
        'abfragevariantenWeiteresVerfahren': !exists(json, 'abfragevariantenWeiteresVerfahren') ? undefined : ((json['abfragevariantenWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenDtoFromJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': !exists(json, 'abfragevariantenSachbearbeitungWeiteresVerfahren') ? undefined : ((json['abfragevariantenSachbearbeitungWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenDtoFromJSON)),
    };
}

export function WeiteresVerfahrenDtoToJSON(value?: WeiteresVerfahrenDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageDtoToJSON(value),
        'aktenzeichenProLbk': value.aktenzeichenProLbk,
        'bebauungsplannummer': value.bebauungsplannummer,
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'sobonJahr': value.sobonJahr,
        'standVerfahren': value.standVerfahren,
        'standVerfahrenFreieEingabe': value.standVerfahrenFreieEingabe,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungMultiPolygonDtoToJSON(value.verortung),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'fristBearbeitung': value.fristBearbeitung === undefined ? undefined : (value.fristBearbeitung.toISOString().substr(0,10)),
        'offizielleMitzeichnung': UncertainBooleanToJSON(value.offizielleMitzeichnung),
        'abfragevariantenWeiteresVerfahren': value.abfragevariantenWeiteresVerfahren === undefined ? undefined : ((value.abfragevariantenWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenDtoToJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': value.abfragevariantenSachbearbeitungWeiteresVerfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenDtoToJSON)),
    };
}

