/* tslint:disable */
/* eslint-disable */
/**
 * ISI GEODATA EAI
 * ISI GEODATA EAI - Service zum Abfragen von Geoinformationen
 *
 * The version of the OpenAPI document: 1.4.0
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
 * @interface KitaplanungsbereichDto
 */
export interface KitaplanungsbereichDto {
    /**
     * 
     * @type {number}
     * @memberof KitaplanungsbereichDto
     */
    objectId?: number;
    /**
     * 
     * @type {number}
     * @memberof KitaplanungsbereichDto
     */
    kitaPlb?: number;
    /**
     * 
     * @type {string}
     * @memberof KitaplanungsbereichDto
     */
    kitaPlbT?: string;
}

/**
 * Check if a given object implements the KitaplanungsbereichDto interface.
 */
export function instanceOfKitaplanungsbereichDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function KitaplanungsbereichDtoFromJSON(json: any): KitaplanungsbereichDto {
    return KitaplanungsbereichDtoFromJSONTyped(json, false);
}

export function KitaplanungsbereichDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): KitaplanungsbereichDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'objectId': !exists(json, 'objectId') ? undefined : json['objectId'],
        'kitaPlb': !exists(json, 'kitaPlb') ? undefined : json['kitaPlb'],
        'kitaPlbT': !exists(json, 'kitaPlbT') ? undefined : json['kitaPlbT'],
    };
}

export function KitaplanungsbereichDtoToJSON(value?: KitaplanungsbereichDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'objectId': value.objectId,
        'kitaPlb': value.kitaPlb,
        'kitaPlbT': value.kitaPlbT,
    };
}

