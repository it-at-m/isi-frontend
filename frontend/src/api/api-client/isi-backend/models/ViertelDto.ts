/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.1.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { MultiPolygonGeometry } from './MultiPolygonGeometry';
import {
    MultiPolygonGeometryFromJSON,
    MultiPolygonGeometryFromJSONTyped,
    MultiPolygonGeometryToJSON,
} from './MultiPolygonGeometry';

/**
 * 
 * @export
 * @interface ViertelDto
 */
export interface ViertelDto {
    /**
     * 
     * @type {string}
     * @memberof ViertelDto
     */
    viertelNummer?: string;
    /**
     * 
     * @type {number}
     * @memberof ViertelDto
     */
    flaecheQm?: number;
    /**
     * 
     * @type {MultiPolygonGeometry}
     * @memberof ViertelDto
     */
    multiPolygon: MultiPolygonGeometry;
    /**
     * 
     * @type {number}
     * @memberof ViertelDto
     */
    ycoordinate?: number;
    /**
     * 
     * @type {number}
     * @memberof ViertelDto
     */
    xcoordinate?: number;
}

/**
 * Check if a given object implements the ViertelDto interface.
 */
export function instanceOfViertelDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "multiPolygon" in value;

    return isInstance;
}

export function ViertelDtoFromJSON(json: any): ViertelDto {
    return ViertelDtoFromJSONTyped(json, false);
}

export function ViertelDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ViertelDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'viertelNummer': !exists(json, 'viertelNummer') ? undefined : json['viertelNummer'],
        'flaecheQm': !exists(json, 'flaecheQm') ? undefined : json['flaecheQm'],
        'multiPolygon': MultiPolygonGeometryFromJSON(json['multiPolygon']),
        'ycoordinate': !exists(json, 'ycoordinate') ? undefined : json['ycoordinate'],
        'xcoordinate': !exists(json, 'xcoordinate') ? undefined : json['xcoordinate'],
    };
}

export function ViertelDtoToJSON(value?: ViertelDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'viertelNummer': value.viertelNummer,
        'flaecheQm': value.flaecheQm,
        'multiPolygon': MultiPolygonGeometryToJSON(value.multiPolygon),
        'ycoordinate': value.ycoordinate,
        'xcoordinate': value.xcoordinate,
    };
}

