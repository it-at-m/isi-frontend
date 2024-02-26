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
 * @interface GrundschulsprengelDto
 */
export interface GrundschulsprengelDto {
    /**
     * 
     * @type {number}
     * @memberof GrundschulsprengelDto
     */
    nummer?: number;
    /**
     * 
     * @type {MultiPolygonGeometryDto}
     * @memberof GrundschulsprengelDto
     */
    multiPolygon: MultiPolygonGeometryDto;
}

/**
 * Check if a given object implements the GrundschulsprengelDto interface.
 */
export function instanceOfGrundschulsprengelDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "multiPolygon" in value;

    return isInstance;
}

export function GrundschulsprengelDtoFromJSON(json: any): GrundschulsprengelDto {
    return GrundschulsprengelDtoFromJSONTyped(json, false);
}

export function GrundschulsprengelDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): GrundschulsprengelDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nummer': !exists(json, 'nummer') ? undefined : json['nummer'],
        'multiPolygon': MultiPolygonGeometryDtoFromJSON(json['multiPolygon']),
    };
}

export function GrundschulsprengelDtoToJSON(value?: GrundschulsprengelDto | null): any {
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
