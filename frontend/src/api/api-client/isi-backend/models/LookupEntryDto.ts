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
/**
 * 
 * @export
 * @interface LookupEntryDto
 */
export interface LookupEntryDto {
    /**
     * 
     * @type {string}
     * @memberof LookupEntryDto
     */
    key?: string;
    /**
     * 
     * @type {string}
     * @memberof LookupEntryDto
     */
    value?: string;
}

/**
 * Check if a given object implements the LookupEntryDto interface.
 */
export function instanceOfLookupEntryDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LookupEntryDtoFromJSON(json: any): LookupEntryDto {
    return LookupEntryDtoFromJSONTyped(json, false);
}

export function LookupEntryDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LookupEntryDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'key': !exists(json, 'key') ? undefined : json['key'],
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function LookupEntryDtoToJSON(value?: LookupEntryDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
        'value': value.value,
    };
}

