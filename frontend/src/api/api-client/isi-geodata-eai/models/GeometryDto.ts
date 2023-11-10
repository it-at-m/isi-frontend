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
import type { MultiPolygonGeometryDto } from './MultiPolygonGeometryDto';
import {
    MultiPolygonGeometryDtoFromJSON,
    MultiPolygonGeometryDtoFromJSONTyped,
    MultiPolygonGeometryDtoToJSON,
} from './MultiPolygonGeometryDto';
import type { PointGeometryDto } from './PointGeometryDto';
import {
    PointGeometryDtoFromJSON,
    PointGeometryDtoFromJSONTyped,
    PointGeometryDtoToJSON,
} from './PointGeometryDto';

import {
     MultiPolygonGeometryDtoFromJSONTyped,
     PointGeometryDtoFromJSONTyped
} from './';

/**
 * GeometryDto
 * @export
 * @interface GeometryDto
 */
export interface GeometryDto {
    /**
     * Definiert den Geometrietyp in der Ausprägung als Multipolygon oder als Point.
     * @type {string}
     * @memberof GeometryDto
     */
    type: string;
}

/**
 * Check if a given object implements the GeometryDto interface.
 */
export function instanceOfGeometryDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function GeometryDtoFromJSON(json: any): GeometryDto {
    return GeometryDtoFromJSONTyped(json, false);
}

export function GeometryDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): GeometryDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['type'] === 'MultiPolygon') {
            return MultiPolygonGeometryDtoFromJSONTyped(json, true);
        }
        if (json['type'] === 'Point') {
            return PointGeometryDtoFromJSONTyped(json, true);
        }
    }
    return {
        
        'type': json['type'],
    };
}

export function GeometryDtoToJSON(value?: GeometryDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
    };
}

