/* tslint:disable */
/* eslint-disable */
/**
 * ISI GEODATA EAI
 * ISI GEODATA EAI - Service zum Abfragen von Geoinformationen
 *
 * The version of the OpenAPI document: 1.1.0
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    MultiPolygonGeometryDto,
    instanceOfMultiPolygonGeometryDto,
    MultiPolygonGeometryDtoFromJSON,
    MultiPolygonGeometryDtoFromJSONTyped,
    MultiPolygonGeometryDtoToJSON,
} from './MultiPolygonGeometryDto';
import {
    PointGeometryDto,
    instanceOfPointGeometryDto,
    PointGeometryDtoFromJSON,
    PointGeometryDtoFromJSONTyped,
    PointGeometryDtoToJSON,
} from './PointGeometryDto';

/**
 * @type FeatureDtoViertelDtoGeometry
 * 
 * @export
 */
export type FeatureDtoViertelDtoGeometry = { type: 'MultiPolygon' } & MultiPolygonGeometryDto | { type: 'MultiPolygonGeometryDto' } & MultiPolygonGeometryDto | { type: 'Point' } & PointGeometryDto | { type: 'PointGeometryDto' } & PointGeometryDto;

export function FeatureDtoViertelDtoGeometryFromJSON(json: any): FeatureDtoViertelDtoGeometry {
    return FeatureDtoViertelDtoGeometryFromJSONTyped(json, false);
}

export function FeatureDtoViertelDtoGeometryFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureDtoViertelDtoGeometry {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    switch (json['type']) {
        case 'MultiPolygon':
            return {...MultiPolygonGeometryDtoFromJSONTyped(json, true), type: 'MultiPolygon'};
        case 'MultiPolygonGeometryDto':
            return {...MultiPolygonGeometryDtoFromJSONTyped(json, true), type: 'MultiPolygonGeometryDto'};
        case 'Point':
            return {...PointGeometryDtoFromJSONTyped(json, true), type: 'Point'};
        case 'PointGeometryDto':
            return {...PointGeometryDtoFromJSONTyped(json, true), type: 'PointGeometryDto'};
        default:
            throw new Error(`No variant of FeatureDtoViertelDtoGeometry exists with 'type=${json['type']}'`);
    }
}

export function FeatureDtoViertelDtoGeometryToJSON(value?: FeatureDtoViertelDtoGeometry | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    switch (value['type']) {
        case 'MultiPolygon':
            return MultiPolygonGeometryDtoToJSON(value);
        case 'MultiPolygonGeometryDto':
            return MultiPolygonGeometryDtoToJSON(value);
        case 'Point':
            return PointGeometryDtoToJSON(value);
        case 'PointGeometryDto':
            return PointGeometryDtoToJSON(value);
        default:
            throw new Error(`No variant of FeatureDtoViertelDtoGeometry exists with 'type=${value['type']}'`);
    }

}

