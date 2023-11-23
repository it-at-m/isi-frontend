/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AbfrageAngelegtDto } from './AbfrageAngelegtDto';
import {
    AbfrageAngelegtDtoFromJSON,
    AbfrageAngelegtDtoFromJSONTyped,
    AbfrageAngelegtDtoToJSON,
} from './AbfrageAngelegtDto';
import type { AbfragevarianteWeiteresVerfahrenAngelegtDto } from './AbfragevarianteWeiteresVerfahrenAngelegtDto';
import {
    AbfragevarianteWeiteresVerfahrenAngelegtDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenAngelegtDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenAngelegtDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenAngelegtDto';
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

import {
} from './';

/**
 * 
 * @export
 * @interface WeiteresVerfahrenAngelegtDto
 */
export interface WeiteresVerfahrenAngelegtDto extends AbfrageAngelegtDto {
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    aktenzeichenProLbk?: string;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    sobonRelevant: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    sobonJahr?: WeiteresVerfahrenAngelegtDtoSobonJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    standVerfahren: WeiteresVerfahrenAngelegtDtoStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungDto}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    verortung?: VerortungDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    fristBearbeitung: Date;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    offizielleMitzeichnung: UncertainBoolean;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenAngelegtDto>}
     * @memberof WeiteresVerfahrenAngelegtDto
     */
    abfragevariantenWeiteresVerfahren: Array<AbfragevarianteWeiteresVerfahrenAngelegtDto>;
}


/**
 * @export
 */
export const WeiteresVerfahrenAngelegtDtoSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type WeiteresVerfahrenAngelegtDtoSobonJahrEnum = typeof WeiteresVerfahrenAngelegtDtoSobonJahrEnum[keyof typeof WeiteresVerfahrenAngelegtDtoSobonJahrEnum];

/**
 * @export
 */
export const WeiteresVerfahrenAngelegtDtoStandVerfahrenEnum = {
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
export type WeiteresVerfahrenAngelegtDtoStandVerfahrenEnum = typeof WeiteresVerfahrenAngelegtDtoStandVerfahrenEnum[keyof typeof WeiteresVerfahrenAngelegtDtoStandVerfahrenEnum];


/**
 * Check if a given object implements the WeiteresVerfahrenAngelegtDto interface.
 */
export function instanceOfWeiteresVerfahrenAngelegtDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "sobonRelevant" in value;
    isInstance = isInstance && "standVerfahren" in value;
    isInstance = isInstance && "fristBearbeitung" in value;
    isInstance = isInstance && "offizielleMitzeichnung" in value;
    isInstance = isInstance && "abfragevariantenWeiteresVerfahren" in value;

    return isInstance;
}

export function WeiteresVerfahrenAngelegtDtoFromJSON(json: any): WeiteresVerfahrenAngelegtDto {
    return WeiteresVerfahrenAngelegtDtoFromJSONTyped(json, false);
}

export function WeiteresVerfahrenAngelegtDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenAngelegtDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...AbfrageAngelegtDtoFromJSONTyped(json, ignoreDiscriminator),
        'aktenzeichenProLbk': !exists(json, 'aktenzeichenProLbk') ? undefined : json['aktenzeichenProLbk'],
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'sobonRelevant': UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'standVerfahren': json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungDtoFromJSON(json['verortung']),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'fristBearbeitung': (new Date(json['fristBearbeitung'])),
        'offizielleMitzeichnung': UncertainBooleanFromJSON(json['offizielleMitzeichnung']),
        'abfragevariantenWeiteresVerfahren': ((json['abfragevariantenWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenAngelegtDtoFromJSON)),
    };
}

export function WeiteresVerfahrenAngelegtDtoToJSON(value?: WeiteresVerfahrenAngelegtDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageAngelegtDtoToJSON(value),
        'aktenzeichenProLbk': value.aktenzeichenProLbk,
        'bebauungsplannummer': value.bebauungsplannummer,
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'sobonJahr': value.sobonJahr,
        'standVerfahren': value.standVerfahren,
        'standVerfahrenFreieEingabe': value.standVerfahrenFreieEingabe,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungDtoToJSON(value.verortung),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'fristBearbeitung': (value.fristBearbeitung.toISOString().substr(0,10)),
        'offizielleMitzeichnung': UncertainBooleanToJSON(value.offizielleMitzeichnung),
        'abfragevariantenWeiteresVerfahren': ((value.abfragevariantenWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenAngelegtDtoToJSON)),
    };
}
