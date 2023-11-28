/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
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
 * @interface StadtbezirkDto
 */
export interface StadtbezirkDto {
    /**
     * 
     * @type {string}
     * @memberof StadtbezirkDto
     */
    nummer?: string;
    /**
     * 
     * @type {string}
     * @memberof StadtbezirkDto
     */
    name?: string;
    /**
     * 
     * @type {MultiPolygonGeometryDto}
     * @memberof StadtbezirkDto
     */
    multiPolygon: MultiPolygonGeometryDto;
}

/**
 * Check if a given object implements the StadtbezirkDto interface.
 */
export function instanceOfStadtbezirkDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "multiPolygon" in value;

    return isInstance;
}

export function StadtbezirkDtoFromJSON(json: any): StadtbezirkDto {
    return StadtbezirkDtoFromJSONTyped(json, false);
}

export function StadtbezirkDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): StadtbezirkDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nummer': !exists(json, 'nummer') ? undefined : json['nummer'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'multiPolygon': MultiPolygonGeometryDtoFromJSON(json['multiPolygon']),
    };
}

export function StadtbezirkDtoToJSON(value?: StadtbezirkDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nummer': value.nummer,
        'name': value.name,
        'multiPolygon': MultiPolygonGeometryDtoToJSON(value.multiPolygon),
    };
}

