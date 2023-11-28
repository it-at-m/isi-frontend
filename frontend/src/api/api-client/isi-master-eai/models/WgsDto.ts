/* tslint:disable */
/* eslint-disable */
/**
 * ISI MAstER EAI
 * ISI MAstER EAI - Service zum Abfragen von Adressen von MAstER
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface WgsDto
 */
export interface WgsDto {
    /**
     * 
     * @type {number}
     * @memberof WgsDto
     */
    lat?: number;
    /**
     * 
     * @type {number}
     * @memberof WgsDto
     */
    lon?: number;
}

/**
 * Check if a given object implements the WgsDto interface.
 */
export function instanceOfWgsDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function WgsDtoFromJSON(json: any): WgsDto {
    return WgsDtoFromJSONTyped(json, false);
}

export function WgsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): WgsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lat': !exists(json, 'lat') ? undefined : json['lat'],
        'lon': !exists(json, 'lon') ? undefined : json['lon'],
    };
}

export function WgsDtoToJSON(value?: WgsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lat': value.lat,
        'lon': value.lon,
    };
}

