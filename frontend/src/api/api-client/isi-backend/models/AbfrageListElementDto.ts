/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
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
 * @interface AbfrageListElementDto
 */
export interface AbfrageListElementDto {
    /**
     * 
     * @type {string}
     * @memberof AbfrageListElementDto
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageListElementDto
     */
    nameAbfrage?: string;
    /**
     * 
     * @type {Set<StadtbezirkDto>}
     * @memberof AbfrageListElementDto
     */
    stadtbezirke?: Set<StadtbezirkDto>;
    /**
     * 
     * @type {StatusAbfrage}
     * @memberof AbfrageListElementDto
     */
    statusAbfrage?: StatusAbfrage;
    /**
     * 
     * @type {Date}
     * @memberof AbfrageListElementDto
     */
    fristStellungnahme?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfrageListElementDto
     */
    type?: AbfrageListElementDtoTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfrageListElementDto
     */
    sobonJahr?: AbfrageListElementDtoSobonJahrEnum;
}


/**
 * @export
 */
export const AbfrageListElementDtoTypeEnum = {
    Infrastrukturabfrage: 'INFRASTRUKTURABFRAGE',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfrageListElementDtoTypeEnum = typeof AbfrageListElementDtoTypeEnum[keyof typeof AbfrageListElementDtoTypeEnum];

/**
 * @export
 */
export const AbfrageListElementDtoSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type AbfrageListElementDtoSobonJahrEnum = typeof AbfrageListElementDtoSobonJahrEnum[keyof typeof AbfrageListElementDtoSobonJahrEnum];


export function AbfrageListElementDtoFromJSON(json: any): AbfrageListElementDto {
    return AbfrageListElementDtoFromJSONTyped(json, false);
}

export function AbfrageListElementDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageListElementDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'nameAbfrage': !exists(json, 'nameAbfrage') ? undefined : json['nameAbfrage'],
        'stadtbezirke': !exists(json, 'stadtbezirke') ? undefined : (new Set((json['stadtbezirke'] as Array<any>).map(StadtbezirkDtoFromJSON))),
        'statusAbfrage': !exists(json, 'statusAbfrage') ? undefined : StatusAbfrageFromJSON(json['statusAbfrage']),
        'fristStellungnahme': !exists(json, 'fristStellungnahme') ? undefined : (new Date(json['fristStellungnahme'])),
        'type': !exists(json, 'type') ? undefined : json['type'],
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
    };
}

export function AbfrageListElementDtoToJSON(value?: AbfrageListElementDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'nameAbfrage': value.nameAbfrage,
        'stadtbezirke': value.stadtbezirke === undefined ? undefined : (Array.from(value.stadtbezirke as Set<any>).map(StadtbezirkDtoToJSON)),
        'statusAbfrage': StatusAbfrageToJSON(value.statusAbfrage),
        'fristStellungnahme': value.fristStellungnahme === undefined ? undefined : (value.fristStellungnahme.toISOString().substr(0,10)),
        'type': value.type,
        'sobonJahr': value.sobonJahr,
    };
}

