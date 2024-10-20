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
 * @interface BezirksteilDto
 */
export interface BezirksteilDto {
    /**
     * 
     * @type {string}
     * @memberof BezirksteilDto
     */
    nummer?: string;
    /**
     * 
     * @type {MultiPolygonGeometryDto}
     * @memberof BezirksteilDto
     */
    multiPolygon: MultiPolygonGeometryDto;
}

/**
 * Check if a given object implements the BezirksteilDto interface.
 */
export function instanceOfBezirksteilDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "multiPolygon" in value;

    return isInstance;
}

export function BezirksteilDtoFromJSON(json: any): BezirksteilDto {
    return BezirksteilDtoFromJSONTyped(json, false);
}

export function BezirksteilDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BezirksteilDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nummer': !exists(json, 'nummer') ? undefined : json['nummer'],
        'multiPolygon': MultiPolygonGeometryDtoFromJSON(json['multiPolygon']),
    };
}

export function BezirksteilDtoToJSON(value?: BezirksteilDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nummer': value.nummer,
        'multiPolygon': MultiPolygonGeometryDtoToJSON(value.multiPolygon),
    };
}

