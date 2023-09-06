/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AbfrageSearchResultDtoAllOf,
    AbfrageSearchResultDtoAllOfFromJSON,
    AbfrageSearchResultDtoAllOfFromJSONTyped,
    AbfrageSearchResultDtoAllOfToJSON,
} from './AbfrageSearchResultDtoAllOf';
import {
    SearchResultDto,
    SearchResultDtoFromJSON,
    SearchResultDtoFromJSONTyped,
    SearchResultDtoToJSON,
} from './SearchResultDto';
import {
    StadtbezirkDto,
    StadtbezirkDtoFromJSON,
    StadtbezirkDtoFromJSONTyped,
    StadtbezirkDtoToJSON,
} from './StadtbezirkDto';
import {
    StatusAbfrage,
    StatusAbfrageFromJSON,
    StatusAbfrageFromJSONTyped,
    StatusAbfrageToJSON,
} from './StatusAbfrage';

/**
 * 
 * @export
 * @interface AbfrageSearchResultDto
 */
export interface AbfrageSearchResultDto extends SearchResultDto {
    /**
     * 
     * @type {string}
     * @memberof AbfrageSearchResultDto
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageSearchResultDto
     */
    nameAbfrage?: string;
    /**
     * 
     * @type {Set<StadtbezirkDto>}
     * @memberof AbfrageSearchResultDto
     */
    stadtbezirke?: Set<StadtbezirkDto>;
    /**
     * 
     * @type {StatusAbfrage}
     * @memberof AbfrageSearchResultDto
     */
    statusAbfrage?: StatusAbfrage;
    /**
     * 
     * @type {Date}
     * @memberof AbfrageSearchResultDto
     */
    fristStellungnahme?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfrageSearchResultDto
     */
    sobonJahr?: AbfrageSearchResultDtoSobonJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfrageSearchResultDto
     */
    standVorhaben?: AbfrageSearchResultDtoStandVorhabenEnum;
    /**
     * 
     * @type {Date}
     * @memberof AbfrageSearchResultDto
     */
    createdDateTime?: Date;
}


/**
 * @export
 */
export const AbfrageSearchResultDtoSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type AbfrageSearchResultDtoSobonJahrEnum = typeof AbfrageSearchResultDtoSobonJahrEnum[keyof typeof AbfrageSearchResultDtoSobonJahrEnum];

/**
 * @export
 */
export const AbfrageSearchResultDtoStandVorhabenEnum = {
    Unspecified: 'UNSPECIFIED',
    GrundsatzEckdatenbeschluss: 'GRUNDSATZ_ECKDATENBESCHLUSS',
    Aufstellungsbeschluss: 'AUFSTELLUNGSBESCHLUSS',
    Parag31Baugb: 'PARAG_3_1_BAUGB',
    Parag32Baugb: 'PARAG_3_2_BAUGB',
    Parag412Baugb: 'PARAG_4_1_2_BAUGB',
    Billigungsbeschluss: 'BILLIGUNGSBESCHLUSS',
    Satzungsbeschluss: 'SATZUNGSBESCHLUSS',
    BplanInKraft: 'BPLAN_IN_KRAFT',
    VorbescheidEingereicht: 'VORBESCHEID_EINGEREICHT',
    BauantragEingereicht: 'BAUANTRAG_EINGEREICHT',
    BaugenehmigungErteilt: 'BAUGENEHMIGUNG_ERTEILT',
    BaubeginnAngezeigt: 'BAUBEGINN_ANGEZEIGT',
    BaufertigstellungGeplant: 'BAUFERTIGSTELLUNG_GEPLANT',
    BaufertigstellungAngezeigt: 'BAUFERTIGSTELLUNG_ANGEZEIGT'
} as const;
export type AbfrageSearchResultDtoStandVorhabenEnum = typeof AbfrageSearchResultDtoStandVorhabenEnum[keyof typeof AbfrageSearchResultDtoStandVorhabenEnum];


export function AbfrageSearchResultDtoFromJSON(json: any): AbfrageSearchResultDto {
    return AbfrageSearchResultDtoFromJSONTyped(json, false);
}

export function AbfrageSearchResultDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageSearchResultDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...SearchResultDtoFromJSONTyped(json, ignoreDiscriminator),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'nameAbfrage': !exists(json, 'nameAbfrage') ? undefined : json['nameAbfrage'],
        'stadtbezirke': !exists(json, 'stadtbezirke') ? undefined : (new Set((json['stadtbezirke'] as Array<any>).map(StadtbezirkDtoFromJSON))),
        'statusAbfrage': !exists(json, 'statusAbfrage') ? undefined : StatusAbfrageFromJSON(json['statusAbfrage']),
        'fristStellungnahme': !exists(json, 'fristStellungnahme') ? undefined : (new Date(json['fristStellungnahme'])),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'standVorhaben': !exists(json, 'standVorhaben') ? undefined : json['standVorhaben'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
    };
}

export function AbfrageSearchResultDtoToJSON(value?: AbfrageSearchResultDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...SearchResultDtoToJSON(value),
        'id': value.id,
        'nameAbfrage': value.nameAbfrage,
        'stadtbezirke': value.stadtbezirke === undefined ? undefined : (Array.from(value.stadtbezirke as Set<any>).map(StadtbezirkDtoToJSON)),
        'statusAbfrage': StatusAbfrageToJSON(value.statusAbfrage),
        'fristStellungnahme': value.fristStellungnahme === undefined ? undefined : (value.fristStellungnahme.toISOString().substr(0,10)),
        'sobonJahr': value.sobonJahr,
        'standVorhaben': value.standVorhaben,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
    };
}
