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
import type { MultiPolygonGeometryDto } from './MultiPolygonGeometryDto';
import {
    MultiPolygonGeometryDtoFromJSON,
    MultiPolygonGeometryDtoFromJSONTyped,
    MultiPolygonGeometryDtoToJSON,
} from './MultiPolygonGeometryDto';

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
    kitaPlb?: number;
    /**
     * 
     * @type {string}
     * @memberof KitaplanungsbereichDto
     */
    kitaPlbT?: string;
    /**
     * 
     * @type {MultiPolygonGeometryDto}
     * @memberof KitaplanungsbereichDto
     */
    multiPolygon: MultiPolygonGeometryDto;
}

/**
 * Check if a given object implements the KitaplanungsbereichDto interface.
 */
export function instanceOfKitaplanungsbereichDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "multiPolygon" in value;

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
        
        'kitaPlb': !exists(json, 'kitaPlb') ? undefined : json['kitaPlb'],
        'kitaPlbT': !exists(json, 'kitaPlbT') ? undefined : json['kitaPlbT'],
        'multiPolygon': MultiPolygonGeometryDtoFromJSON(json['multiPolygon']),
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
        
        'kitaPlb': value.kitaPlb,
        'kitaPlbT': value.kitaPlbT,
        'multiPolygon': MultiPolygonGeometryDtoToJSON(value.multiPolygon),
    };
}

