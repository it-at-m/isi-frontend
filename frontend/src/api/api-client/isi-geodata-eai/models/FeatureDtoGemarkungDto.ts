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
import type { FeatureDtoViertelDtoGeometry } from './FeatureDtoViertelDtoGeometry';
import {
    FeatureDtoViertelDtoGeometryFromJSON,
    FeatureDtoViertelDtoGeometryFromJSONTyped,
    FeatureDtoViertelDtoGeometryToJSON,
} from './FeatureDtoViertelDtoGeometry';
import type { GemarkungDto } from './GemarkungDto';
import {
    GemarkungDtoFromJSON,
    GemarkungDtoFromJSONTyped,
    GemarkungDtoToJSON,
} from './GemarkungDto';

/**
 * 
 * @export
 * @interface FeatureDtoGemarkungDto
 */
export interface FeatureDtoGemarkungDto {
    /**
     * 
     * @type {string}
     * @memberof FeatureDtoGemarkungDto
     */
    type?: string;
    /**
     * 
     * @type {FeatureDtoViertelDtoGeometry}
     * @memberof FeatureDtoGemarkungDto
     */
    geometry?: FeatureDtoViertelDtoGeometry;
    /**
     * 
     * @type {GemarkungDto}
     * @memberof FeatureDtoGemarkungDto
     */
    properties?: GemarkungDto;
}

/**
 * Check if a given object implements the FeatureDtoGemarkungDto interface.
 */
export function instanceOfFeatureDtoGemarkungDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeatureDtoGemarkungDtoFromJSON(json: any): FeatureDtoGemarkungDto {
    return FeatureDtoGemarkungDtoFromJSONTyped(json, false);
}

export function FeatureDtoGemarkungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureDtoGemarkungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'geometry': !exists(json, 'geometry') ? undefined : FeatureDtoViertelDtoGeometryFromJSON(json['geometry']),
        'properties': !exists(json, 'properties') ? undefined : GemarkungDtoFromJSON(json['properties']),
    };
}

export function FeatureDtoGemarkungDtoToJSON(value?: FeatureDtoGemarkungDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'geometry': FeatureDtoViertelDtoGeometryToJSON(value.geometry),
        'properties': GemarkungDtoToJSON(value.properties),
    };
}

