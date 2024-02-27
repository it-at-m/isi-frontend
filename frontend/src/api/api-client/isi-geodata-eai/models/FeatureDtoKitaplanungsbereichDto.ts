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
import type { FeatureDtoViertelDtoGeometry } from './FeatureDtoViertelDtoGeometry';
import {
    FeatureDtoViertelDtoGeometryFromJSON,
    FeatureDtoViertelDtoGeometryFromJSONTyped,
    FeatureDtoViertelDtoGeometryToJSON,
} from './FeatureDtoViertelDtoGeometry';
import type { KitaplanungsbereichDto } from './KitaplanungsbereichDto';
import {
    KitaplanungsbereichDtoFromJSON,
    KitaplanungsbereichDtoFromJSONTyped,
    KitaplanungsbereichDtoToJSON,
} from './KitaplanungsbereichDto';

/**
 * 
 * @export
 * @interface FeatureDtoKitaplanungsbereichDto
 */
export interface FeatureDtoKitaplanungsbereichDto {
    /**
     * 
     * @type {string}
     * @memberof FeatureDtoKitaplanungsbereichDto
     */
    type?: string;
    /**
     * 
     * @type {FeatureDtoViertelDtoGeometry}
     * @memberof FeatureDtoKitaplanungsbereichDto
     */
    geometry?: FeatureDtoViertelDtoGeometry;
    /**
     * 
     * @type {KitaplanungsbereichDto}
     * @memberof FeatureDtoKitaplanungsbereichDto
     */
    properties?: KitaplanungsbereichDto;
}

/**
 * Check if a given object implements the FeatureDtoKitaplanungsbereichDto interface.
 */
export function instanceOfFeatureDtoKitaplanungsbereichDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeatureDtoKitaplanungsbereichDtoFromJSON(json: any): FeatureDtoKitaplanungsbereichDto {
    return FeatureDtoKitaplanungsbereichDtoFromJSONTyped(json, false);
}

export function FeatureDtoKitaplanungsbereichDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureDtoKitaplanungsbereichDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'geometry': !exists(json, 'geometry') ? undefined : FeatureDtoViertelDtoGeometryFromJSON(json['geometry']),
        'properties': !exists(json, 'properties') ? undefined : KitaplanungsbereichDtoFromJSON(json['properties']),
    };
}

export function FeatureDtoKitaplanungsbereichDtoToJSON(value?: FeatureDtoKitaplanungsbereichDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'geometry': FeatureDtoViertelDtoGeometryToJSON(value.geometry),
        'properties': KitaplanungsbereichDtoToJSON(value.properties),
    };
}

