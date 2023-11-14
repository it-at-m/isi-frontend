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
    FoerdermixDto,
    FoerdermixDtoFromJSON,
    FoerdermixDtoFromJSONTyped,
    FoerdermixDtoToJSON,
} from './FoerdermixDto';

/**
 * 
 * @export
 * @interface BaurateDto
 */
export interface BaurateDto {
    /**
     * 
     * @type {string}
     * @memberof BaurateDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof BaurateDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof BaurateDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BaurateDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof BaurateDto
     */
    jahr: number;
    /**
     * 
     * @type {number}
     * @memberof BaurateDto
     */
    weGeplant?: number;
    /**
     * 
     * @type {number}
     * @memberof BaurateDto
     */
    gfWohnenGeplant?: number;
    /**
     * 
     * @type {FoerdermixDto}
     * @memberof BaurateDto
     */
    foerdermix: FoerdermixDto;
}

export function BaurateDtoFromJSON(json: any): BaurateDto {
    return BaurateDtoFromJSONTyped(json, false);
}

export function BaurateDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaurateDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'jahr': json['jahr'],
        'weGeplant': !exists(json, 'weGeplant') ? undefined : json['weGeplant'],
        'gfWohnenGeplant': !exists(json, 'gfWohnenGeplant') ? undefined : json['gfWohnenGeplant'],
        'foerdermix': FoerdermixDtoFromJSON(json['foerdermix']),
    };
}

export function BaurateDtoToJSON(value?: BaurateDto | null): any {
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
        'jahr': value.jahr,
        'weGeplant': value.weGeplant,
        'gfWohnenGeplant': value.gfWohnenGeplant,
        'foerdermix': FoerdermixDtoToJSON(value.foerdermix),
    };
}

