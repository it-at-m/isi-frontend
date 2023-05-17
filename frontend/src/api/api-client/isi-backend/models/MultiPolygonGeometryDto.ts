/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
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
 * @interface MultiPolygonGeometryDto
 */
export interface MultiPolygonGeometryDto {
    /**
     * 
     * @type {string}
     * @memberof MultiPolygonGeometryDto
     */
    type: string;
    /**
     * 
     * @type {Array<Array<Array<Array<number>>>>}
     * @memberof MultiPolygonGeometryDto
     */
    coordinates: Array<Array<Array<Array<number>>>>;
}

export function MultiPolygonGeometryDtoFromJSON(json: any): MultiPolygonGeometryDto {
    return MultiPolygonGeometryDtoFromJSONTyped(json, false);
}

export function MultiPolygonGeometryDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultiPolygonGeometryDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'coordinates': json['coordinates'],
    };
}

export function MultiPolygonGeometryDtoToJSON(value?: MultiPolygonGeometryDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'coordinates': value.coordinates,
    };
}
