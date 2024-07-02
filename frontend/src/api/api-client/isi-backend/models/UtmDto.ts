/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UtmDto
 */
export interface UtmDto {
    /**
     * 
     * @type {string}
     * @memberof UtmDto
     */
    zone?: string;
    /**
     * 
     * @type {number}
     * @memberof UtmDto
     */
    north?: number;
    /**
     * 
     * @type {number}
     * @memberof UtmDto
     */
    east?: number;
}

/**
 * Check if a given object implements the UtmDto interface.
 */
export function instanceOfUtmDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UtmDtoFromJSON(json: any): UtmDto {
    return UtmDtoFromJSONTyped(json, false);
}

export function UtmDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UtmDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'zone': !exists(json, 'zone') ? undefined : json['zone'],
        'north': !exists(json, 'north') ? undefined : json['north'],
        'east': !exists(json, 'east') ? undefined : json['east'],
    };
}

export function UtmDtoToJSON(value?: UtmDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'zone': value.zone,
        'north': value.north,
        'east': value.east,
    };
}

