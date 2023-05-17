/* tslint:disable */
/* eslint-disable */
/**
 * ISI GEODATA EAI
 * ISI GEODATA EAI - Service zum Abfragen von Geoinformationen
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    FeatureDtoStadtbezirkDtoGeometry,
    FeatureDtoStadtbezirkDtoGeometryFromJSON,
    FeatureDtoStadtbezirkDtoGeometryFromJSONTyped,
    FeatureDtoStadtbezirkDtoGeometryToJSON,
} from './FeatureDtoStadtbezirkDtoGeometry';
import {
    GemarkungDto,
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
     * @type {FeatureDtoStadtbezirkDtoGeometry}
     * @memberof FeatureDtoGemarkungDto
     */
    geometry?: FeatureDtoStadtbezirkDtoGeometry;
    /**
     * 
     * @type {GemarkungDto}
     * @memberof FeatureDtoGemarkungDto
     */
    properties?: GemarkungDto;
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
        'geometry': !exists(json, 'geometry') ? undefined : FeatureDtoStadtbezirkDtoGeometryFromJSON(json['geometry']),
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
        'geometry': FeatureDtoStadtbezirkDtoGeometryToJSON(value.geometry),
        'properties': GemarkungDtoToJSON(value.properties),
    };
}
