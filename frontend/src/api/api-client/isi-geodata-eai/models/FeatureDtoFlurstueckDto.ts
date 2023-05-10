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
    FlurstueckDto,
    FlurstueckDtoFromJSON,
    FlurstueckDtoFromJSONTyped,
    FlurstueckDtoToJSON,
} from './FlurstueckDto';

/**
 * 
 * @export
 * @interface FeatureDtoFlurstueckDto
 */
export interface FeatureDtoFlurstueckDto {
    /**
     * 
     * @type {string}
     * @memberof FeatureDtoFlurstueckDto
     */
    type?: string;
    /**
     * 
     * @type {FeatureDtoStadtbezirkDtoGeometry}
     * @memberof FeatureDtoFlurstueckDto
     */
    geometry?: FeatureDtoStadtbezirkDtoGeometry;
    /**
     * 
     * @type {FlurstueckDto}
     * @memberof FeatureDtoFlurstueckDto
     */
    properties?: FlurstueckDto;
}

export function FeatureDtoFlurstueckDtoFromJSON(json: any): FeatureDtoFlurstueckDto {
    return FeatureDtoFlurstueckDtoFromJSONTyped(json, false);
}

export function FeatureDtoFlurstueckDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureDtoFlurstueckDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'geometry': !exists(json, 'geometry') ? undefined : FeatureDtoStadtbezirkDtoGeometryFromJSON(json['geometry']),
        'properties': !exists(json, 'properties') ? undefined : FlurstueckDtoFromJSON(json['properties']),
    };
}

export function FeatureDtoFlurstueckDtoToJSON(value?: FeatureDtoFlurstueckDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'geometry': FeatureDtoStadtbezirkDtoGeometryToJSON(value.geometry),
        'properties': FlurstueckDtoToJSON(value.properties),
    };
}

