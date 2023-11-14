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
import {
    StatusAbfrage,
    StatusAbfrageFromJSON,
    StatusAbfrageFromJSONTyped,
    StatusAbfrageToJSON,
} from './StatusAbfrage';

import {
     BauleitplanverfahrenDtoFromJSONTyped
} from './';

/**
 * 
 * @export
 * @interface AbfrageDto
 */
export interface AbfrageDto {
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfrageDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof AbfrageDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbfrageDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    artAbfrage?: AbfrageDtoArtAbfrageEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    name: string;
    /**
     * 
     * @type {StatusAbfrage}
     * @memberof AbfrageDto
     */
    statusAbfrage?: StatusAbfrage;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    bauvorhaben?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    sub?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    displayName?: string;
}


/**
 * @export
 */
export const AbfrageDtoArtAbfrageEnum = {
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeitereAbfragen: 'WEITERE_ABFRAGEN'
} as const;
export type AbfrageDtoArtAbfrageEnum = typeof AbfrageDtoArtAbfrageEnum[keyof typeof AbfrageDtoArtAbfrageEnum];


export function AbfrageDtoFromJSON(json: any): AbfrageDto {
    return AbfrageDtoFromJSONTyped(json, false);
}

export function AbfrageDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['artAbfrage'] === 'BauleitplanverfahrenDto') {
            return BauleitplanverfahrenDtoFromJSONTyped(json, true);
        }
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'artAbfrage': !exists(json, 'artAbfrage') ? undefined : json['artAbfrage'],
        'name': json['name'],
        'statusAbfrage': !exists(json, 'statusAbfrage') ? undefined : StatusAbfrageFromJSON(json['statusAbfrage']),
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'bauvorhaben': !exists(json, 'bauvorhaben') ? undefined : json['bauvorhaben'],
        'sub': !exists(json, 'sub') ? undefined : json['sub'],
        'displayName': !exists(json, 'displayName') ? undefined : json['displayName'],
    };
}

export function AbfrageDtoToJSON(value?: AbfrageDto | null): any {
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
        'artAbfrage': value.artAbfrage,
        'name': value.name,
        'statusAbfrage': StatusAbfrageToJSON(value.statusAbfrage),
        'anmerkung': value.anmerkung,
        'bauvorhaben': value.bauvorhaben,
        'sub': value.sub,
        'displayName': value.displayName,
    };
}

