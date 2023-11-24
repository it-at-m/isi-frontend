/* tslint:disable */
/* eslint-disable */
/**
 * ISI GEODATA EAI
 * ISI GEODATA EAI - Service zum Abfragen von Geoinformationen
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { GeometryDto } from './GeometryDto';
import {
    GeometryDtoFromJSON,
    GeometryDtoFromJSONTyped,
    GeometryDtoToJSON,
} from './GeometryDto';

import {
} from './';

/**
 * Die GEOJSON-Repräsentation einer Punktkoordinate.
 * @export
 * @interface PointGeometryDto
 */
export interface PointGeometryDto extends GeometryDto {
    /**
     * Die Punktkoordinate ([x,y] bzw. [longitude, latitude]) im Standard EPSG:4326 (WGS84).
     * @type {Array<number>}
     * @memberof PointGeometryDto
     */
    coordinates: Array<number>;
}

/**
 * Check if a given object implements the PointGeometryDto interface.
 */
export function instanceOfPointGeometryDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "coordinates" in value;

    return isInstance;
}

export function PointGeometryDtoFromJSON(json: any): PointGeometryDto {
    return PointGeometryDtoFromJSONTyped(json, false);
}

export function PointGeometryDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PointGeometryDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...GeometryDtoFromJSONTyped(json, ignoreDiscriminator),
        'coordinates': json['coordinates'],
    };
}

export function PointGeometryDtoToJSON(value?: PointGeometryDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...GeometryDtoToJSON(value),
        'coordinates': value.coordinates,
    };
}

