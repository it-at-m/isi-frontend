/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.1.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
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
import type { VerortungMultiPolygonDto } from './VerortungMultiPolygonDto';
import {
    VerortungMultiPolygonDtoFromJSON,
    VerortungMultiPolygonDtoFromJSONTyped,
    VerortungMultiPolygonDtoToJSON,
} from './VerortungMultiPolygonDto';

/**
 * 
 * @export
 * @interface WeiteresVerfahrenAngelegtDtoAllOf
 */
export interface WeiteresVerfahrenAngelegtDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    aktenzeichenProLbk?: string;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    sobonRelevant?: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    sobonJahr?: WeiteresVerfahrenAngelegtDtoAllOfSobonJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    standVerfahren?: WeiteresVerfahrenAngelegtDtoAllOfStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    fristBearbeitung?: Date;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    offizielleMitzeichnung?: UncertainBoolean;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenAngelegtDto>}
     * @memberof WeiteresVerfahrenAngelegtDtoAllOf
     */
    abfragevariantenWeiteresVerfahren?: Array<AbfragevarianteWeiteresVerfahrenAngelegtDto>;
}


/**
 * @export
 */
export const WeiteresVerfahrenAngelegtDtoAllOfSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type WeiteresVerfahrenAngelegtDtoAllOfSobonJahrEnum = typeof WeiteresVerfahrenAngelegtDtoAllOfSobonJahrEnum[keyof typeof WeiteresVerfahrenAngelegtDtoAllOfSobonJahrEnum];

/**
 * @export
 */
export const WeiteresVerfahrenAngelegtDtoAllOfStandVerfahrenEnum = {
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
    FreieEingabe: 'FREIE_EINGABE',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type WeiteresVerfahrenAngelegtDtoAllOfStandVerfahrenEnum = typeof WeiteresVerfahrenAngelegtDtoAllOfStandVerfahrenEnum[keyof typeof WeiteresVerfahrenAngelegtDtoAllOfStandVerfahrenEnum];


/**
 * Check if a given object implements the WeiteresVerfahrenAngelegtDtoAllOf interface.
 */
export function instanceOfWeiteresVerfahrenAngelegtDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function WeiteresVerfahrenAngelegtDtoAllOfFromJSON(json: any): WeiteresVerfahrenAngelegtDtoAllOf {
    return WeiteresVerfahrenAngelegtDtoAllOfFromJSONTyped(json, false);
}

export function WeiteresVerfahrenAngelegtDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenAngelegtDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
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
        'abfragevariantenWeiteresVerfahren': !exists(json, 'abfragevariantenWeiteresVerfahren') ? undefined : ((json['abfragevariantenWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenAngelegtDtoFromJSON)),
    };
}

export function WeiteresVerfahrenAngelegtDtoAllOfToJSON(value?: WeiteresVerfahrenAngelegtDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
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
        'abfragevariantenWeiteresVerfahren': value.abfragevariantenWeiteresVerfahren === undefined ? undefined : ((value.abfragevariantenWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenAngelegtDtoToJSON)),
    };
}

