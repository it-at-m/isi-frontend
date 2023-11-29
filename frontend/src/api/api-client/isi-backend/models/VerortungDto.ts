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
import {
    GemarkungDto,
    GemarkungDtoFromJSON,
    GemarkungDtoFromJSONTyped,
    GemarkungDtoToJSON,
} from './GemarkungDto';
import {
    MultiPolygonGeometryDto,
    MultiPolygonGeometryDtoFromJSON,
    MultiPolygonGeometryDtoFromJSONTyped,
    MultiPolygonGeometryDtoToJSON,
} from './MultiPolygonGeometryDto';
import {
    StadtbezirkDto,
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

