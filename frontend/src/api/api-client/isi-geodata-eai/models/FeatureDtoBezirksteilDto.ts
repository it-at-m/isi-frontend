/* tslint:disable */
/* eslint-disable */
/**
 * ISI GEODATA EAI
 * ISI GEODATA EAI - Service zum Abfragen von Geoinformationen
 *
 * The version of the OpenAPI document: 1.4.0
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { BezirksteilDto } from './BezirksteilDto';
import {
    BezirksteilDtoFromJSON,
    BezirksteilDtoFromJSONTyped,
    BezirksteilDtoToJSON,
} from './BezirksteilDto';
import type { FeatureDtoViertelDtoGeometry } from './FeatureDtoViertelDtoGeometry';
import {
    FeatureDtoViertelDtoGeometryFromJSON,
    FeatureDtoViertelDtoGeometryFromJSONTyped,
    FeatureDtoViertelDtoGeometryToJSON,
} from './FeatureDtoViertelDtoGeometry';

/**
 * 
 * @export
 * @interface FeatureDtoBezirksteilDto
 */
export interface FeatureDtoBezirksteilDto {
    /**
     * 
     * @type {string}
     * @memberof FeatureDtoBezirksteilDto
     */
    type?: string;
    /**
     * 
     * @type {FeatureDtoViertelDtoGeometry}
     * @memberof FeatureDtoBezirksteilDto
     */
    geometry?: FeatureDtoViertelDtoGeometry;
    /**
     * 
     * @type {BezirksteilDto}
     * @memberof FeatureDtoBezirksteilDto
     */
    properties?: BezirksteilDto;
}

/**
 * Check if a given object implements the FeatureDtoBezirksteilDto interface.
 */
export function instanceOfFeatureDtoBezirksteilDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeatureDtoBezirksteilDtoFromJSON(json: any): FeatureDtoBezirksteilDto {
    return FeatureDtoBezirksteilDtoFromJSONTyped(json, false);
}

export function FeatureDtoBezirksteilDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureDtoBezirksteilDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'geometry': !exists(json, 'geometry') ? undefined : FeatureDtoViertelDtoGeometryFromJSON(json['geometry']),
        'properties': !exists(json, 'properties') ? undefined : BezirksteilDtoFromJSON(json['properties']),
    };
}

export function FeatureDtoBezirksteilDtoToJSON(value?: FeatureDtoBezirksteilDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'geometry': FeatureDtoViertelDtoGeometryToJSON(value.geometry),
        'properties': BezirksteilDtoToJSON(value.properties),
    };
}

