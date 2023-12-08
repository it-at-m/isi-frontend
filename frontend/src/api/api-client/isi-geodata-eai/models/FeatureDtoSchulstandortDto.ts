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

import { exists, mapValues } from '../runtime';
import type { FeatureDtoStadtbezirkDtoGeometry } from './FeatureDtoStadtbezirkDtoGeometry';
import {
    FeatureDtoStadtbezirkDtoGeometryFromJSON,
    FeatureDtoStadtbezirkDtoGeometryFromJSONTyped,
    FeatureDtoStadtbezirkDtoGeometryToJSON,
} from './FeatureDtoStadtbezirkDtoGeometry';
import type { SchulstandortDto } from './SchulstandortDto';
import {
    SchulstandortDtoFromJSON,
    SchulstandortDtoFromJSONTyped,
    SchulstandortDtoToJSON,
} from './SchulstandortDto';

/**
 * 
 * @export
 * @interface FeatureDtoSchulstandortDto
 */
export interface FeatureDtoSchulstandortDto {
    /**
     * 
     * @type {string}
     * @memberof FeatureDtoSchulstandortDto
     */
    type?: string;
    /**
     * 
     * @type {FeatureDtoStadtbezirkDtoGeometry}
     * @memberof FeatureDtoSchulstandortDto
     */
    geometry?: FeatureDtoStadtbezirkDtoGeometry;
    /**
     * 
     * @type {SchulstandortDto}
     * @memberof FeatureDtoSchulstandortDto
     */
    properties?: SchulstandortDto;
}

/**
 * Check if a given object implements the FeatureDtoSchulstandortDto interface.
 */
export function instanceOfFeatureDtoSchulstandortDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeatureDtoSchulstandortDtoFromJSON(json: any): FeatureDtoSchulstandortDto {
    return FeatureDtoSchulstandortDtoFromJSONTyped(json, false);
}

export function FeatureDtoSchulstandortDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureDtoSchulstandortDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'geometry': !exists(json, 'geometry') ? undefined : FeatureDtoStadtbezirkDtoGeometryFromJSON(json['geometry']),
        'properties': !exists(json, 'properties') ? undefined : SchulstandortDtoFromJSON(json['properties']),
    };
}

export function FeatureDtoSchulstandortDtoToJSON(value?: FeatureDtoSchulstandortDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'geometry': FeatureDtoStadtbezirkDtoGeometryToJSON(value.geometry),
        'properties': SchulstandortDtoToJSON(value.properties),
    };
}

