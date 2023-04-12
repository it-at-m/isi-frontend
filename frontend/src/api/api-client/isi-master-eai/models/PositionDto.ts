/* tslint:disable */
/* eslint-disable */
/**
 * ISI MAstER EAI
 * ISI MAstER EAI - Service zum Abfragen von Adressen von MAstER
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
    UtmDto,
    UtmDtoFromJSON,
    UtmDtoFromJSONTyped,
    UtmDtoToJSON,
} from './UtmDto';
import {
    WgsDto,
    WgsDtoFromJSON,
    WgsDtoFromJSONTyped,
    WgsDtoToJSON,
} from './WgsDto';

/**
 * 
 * @export
 * @interface PositionDto
 */
export interface PositionDto {
    /**
     * 
     * @type {UtmDto}
     * @memberof PositionDto
     */
    utm?: UtmDto;
    /**
     * 
     * @type {WgsDto}
     * @memberof PositionDto
     */
    wgs?: WgsDto;
}

export function PositionDtoFromJSON(json: any): PositionDto {
    return PositionDtoFromJSONTyped(json, false);
}

export function PositionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PositionDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'utm': !exists(json, 'utm') ? undefined : UtmDtoFromJSON(json['utm']),
        'wgs': !exists(json, 'wgs') ? undefined : WgsDtoFromJSON(json['wgs']),
    };
}

export function PositionDtoToJSON(value?: PositionDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'utm': UtmDtoToJSON(value.utm),
        'wgs': WgsDtoToJSON(value.wgs),
    };
}

