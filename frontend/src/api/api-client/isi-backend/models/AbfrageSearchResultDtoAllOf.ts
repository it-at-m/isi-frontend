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
import type { StadtbezirkDto } from './StadtbezirkDto';
import {
    StadtbezirkDtoFromJSON,
    StadtbezirkDtoFromJSONTyped,
    StadtbezirkDtoToJSON,
} from './StadtbezirkDto';
import type { StatusAbfrage } from './StatusAbfrage';
import {
    StatusAbfrageFromJSON,
    StatusAbfrageFromJSONTyped,
    StatusAbfrageToJSON,
} from './StatusAbfrage';

/**
 * 
 * @export
 * @interface AbfrageSearchResultDtoAllOf
 */
export interface AbfrageSearchResultDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof AbfrageSearchResultDtoAllOf
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageSearchResultDtoAllOf
     */
    artAbfrage?: AbfrageSearchResultDtoAllOfArtAbfrageEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfrageSearchResultDtoAllOf
     */
    name?: string;
    /**
     * 
     * @type {Set<StadtbezirkDto>}
     * @memberof AbfrageSearchResultDtoAllOf
     */
    stadtbezirke?: Set<StadtbezirkDto>;
    /**
     * 
     * @type {StatusAbfrage}
     * @memberof AbfrageSearchResultDtoAllOf
     */
    statusAbfrage?: StatusAbfrage;
    /**
     * 
     * @type {Date}
     * @memberof AbfrageSearchResultDtoAllOf
     */
    fristBearbeitung?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfrageSearchResultDtoAllOf
     */
    standVerfahren?: AbfrageSearchResultDtoAllOfStandVerfahrenEnum;
    /**
     * 
     * @type {Date}
     * @memberof AbfrageSearchResultDtoAllOf
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfrageSearchResultDtoAllOf
     */
    bauvorhaben?: string;
}


/**
 * @export
 */
export const AbfrageSearchResultDtoAllOfArtAbfrageEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfrageSearchResultDtoAllOfArtAbfrageEnum = typeof AbfrageSearchResultDtoAllOfArtAbfrageEnum[keyof typeof AbfrageSearchResultDtoAllOfArtAbfrageEnum];

/**
 * @export
 */
export const AbfrageSearchResultDtoAllOfStandVerfahrenEnum = {
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
export type AbfrageSearchResultDtoAllOfStandVerfahrenEnum = typeof AbfrageSearchResultDtoAllOfStandVerfahrenEnum[keyof typeof AbfrageSearchResultDtoAllOfStandVerfahrenEnum];


/**
 * Check if a given object implements the AbfrageSearchResultDtoAllOf interface.
 */
export function instanceOfAbfrageSearchResultDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfrageSearchResultDtoAllOfFromJSON(json: any): AbfrageSearchResultDtoAllOf {
    return AbfrageSearchResultDtoAllOfFromJSONTyped(json, false);
}

export function AbfrageSearchResultDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageSearchResultDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'artAbfrage': !exists(json, 'artAbfrage') ? undefined : json['artAbfrage'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'stadtbezirke': !exists(json, 'stadtbezirke') ? undefined : (new Set((json['stadtbezirke'] as Array<any>).map(StadtbezirkDtoFromJSON))),
        'statusAbfrage': !exists(json, 'statusAbfrage') ? undefined : StatusAbfrageFromJSON(json['statusAbfrage']),
        'fristBearbeitung': !exists(json, 'fristBearbeitung') ? undefined : (new Date(json['fristBearbeitung'])),
        'standVerfahren': !exists(json, 'standVerfahren') ? undefined : json['standVerfahren'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'bauvorhaben': !exists(json, 'bauvorhaben') ? undefined : json['bauvorhaben'],
    };
}

export function AbfrageSearchResultDtoAllOfToJSON(value?: AbfrageSearchResultDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'artAbfrage': value.artAbfrage,
        'name': value.name,
        'stadtbezirke': value.stadtbezirke === undefined ? undefined : (Array.from(value.stadtbezirke as Set<any>).map(StadtbezirkDtoToJSON)),
        'statusAbfrage': StatusAbfrageToJSON(value.statusAbfrage),
        'fristBearbeitung': value.fristBearbeitung === undefined ? undefined : (value.fristBearbeitung.toISOString().substr(0,10)),
        'standVerfahren': value.standVerfahren,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'bauvorhaben': value.bauvorhaben,
    };
}

