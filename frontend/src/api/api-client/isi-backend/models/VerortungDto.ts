/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
<<<<<<< HEAD
 * The version of the OpenAPI document: 2.0.0
=======
 * The version of the OpenAPI document: 1.1.0
>>>>>>> dev
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { GemarkungDto } from './GemarkungDto';
import {
    GemarkungDtoFromJSON,
    GemarkungDtoFromJSONTyped,
    GemarkungDtoToJSON,
} from './GemarkungDto';
import type { MultiPolygonGeometryDto } from './MultiPolygonGeometryDto';
import {
    MultiPolygonGeometryDtoFromJSON,
    MultiPolygonGeometryDtoFromJSONTyped,
    MultiPolygonGeometryDtoToJSON,
} from './MultiPolygonGeometryDto';
import type { StadtbezirkDto } from './StadtbezirkDto';
import {
    StadtbezirkDtoFromJSON,
    StadtbezirkDtoFromJSONTyped,
    StadtbezirkDtoToJSON,
} from './StadtbezirkDto';

/**
 * 
 * @export
 * @interface VerortungDto
 */
export interface VerortungDto {
    /**
     * 
     * @type {Set<StadtbezirkDto>}
     * @memberof VerortungDto
     */
    stadtbezirke: Set<StadtbezirkDto>;
    /**
     * 
     * @type {Set<GemarkungDto>}
     * @memberof VerortungDto
     */
    gemarkungen: Set<GemarkungDto>;
    /**
     * 
     * @type {MultiPolygonGeometryDto}
     * @memberof VerortungDto
     */
    multiPolygon: MultiPolygonGeometryDto;
}

/**
 * Check if a given object implements the VerortungDto interface.
 */
export function instanceOfVerortungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "stadtbezirke" in value;
    isInstance = isInstance && "gemarkungen" in value;
    isInstance = isInstance && "multiPolygon" in value;

    return isInstance;
}

export function VerortungDtoFromJSON(json: any): VerortungDto {
    return VerortungDtoFromJSONTyped(json, false);
}

export function VerortungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerortungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'stadtbezirke': (new Set((json['stadtbezirke'] as Array<any>).map(StadtbezirkDtoFromJSON))),
        'gemarkungen': (new Set((json['gemarkungen'] as Array<any>).map(GemarkungDtoFromJSON))),
        'multiPolygon': MultiPolygonGeometryDtoFromJSON(json['multiPolygon']),
    };
}

export function VerortungDtoToJSON(value?: VerortungDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'stadtbezirke': (Array.from(value.stadtbezirke as Set<any>).map(StadtbezirkDtoToJSON)),
        'gemarkungen': (Array.from(value.gemarkungen as Set<any>).map(GemarkungDtoToJSON)),
        'multiPolygon': MultiPolygonGeometryDtoToJSON(value.multiPolygon),
    };
}

