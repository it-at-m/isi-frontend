/* tslint:disable */
/* eslint-disable */
/**
 * ISI GEODATA EAI
 * ISI GEODATA EAI - Service zum Abfragen von Geoinformationen
 *
 * The version of the OpenAPI document: 1.3.0
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ViertelDto
 */
export interface ViertelDto {
    /**
     * 
     * @type {number}
     * @memberof ViertelDto
     */
    objectId?: number;
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
        
        'objectId': !exists(json, 'objectId') ? undefined : json['objectId'],
        'viertelNummer': !exists(json, 'viertelNummer') ? undefined : json['viertelNummer'],
        'flaecheQm': !exists(json, 'flaecheQm') ? undefined : json['flaecheQm'],
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
        
        'objectId': value.objectId,
        'viertelNummer': value.viertelNummer,
        'flaecheQm': value.flaecheQm,
        'ycoordinate': value.ycoordinate,
        'xcoordinate': value.xcoordinate,
    };
}

