/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.4.0
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
 * @interface ViertelDto
 */
export interface ViertelDto {
    /**
     * 
     * @type {string}
     * @memberof ViertelDto
     */
    nummer?: string;
    /**
     * 
     * @type {number}
     * @memberof ViertelDto
     */
    flaecheQm?: number;
    /**
     * 
     * @type {MultiPolygonGeometryDto}
     * @memberof ViertelDto
     */
    multiPolygon: MultiPolygonGeometryDto;
}

/**
 * Check if a given object implements the ViertelDto interface.
 */
export function instanceOfViertelDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "multiPolygon" in value;

    return isInstance;
}

export function ViertelDtoFromJSON(json: any): ViertelDto {
    return ViertelDtoFromJSONTyped(json, false);
}

export function ViertelDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ViertelDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nummer': !exists(json, 'nummer') ? undefined : json['nummer'],
        'flaecheQm': !exists(json, 'flaecheQm') ? undefined : json['flaecheQm'],
        'multiPolygon': MultiPolygonGeometryDtoFromJSON(json['multiPolygon']),
    };
}

export function ViertelDtoToJSON(value?: ViertelDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nummer': value.nummer,
        'flaecheQm': value.flaecheQm,
        'multiPolygon': MultiPolygonGeometryDtoToJSON(value.multiPolygon),
    };
}

