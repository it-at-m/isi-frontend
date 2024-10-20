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
/**
 * 
 * @export
 * @interface BezirksteilDto
 */
export interface BezirksteilDto {
    /**
     * 
     * @type {number}
     * @memberof BezirksteilDto
     */
    objectId?: number;
    /**
     * 
     * @type {string}
     * @memberof BezirksteilDto
     */
    bezirksteilNummer?: string;
    /**
     * 
     * @type {number}
     * @memberof BezirksteilDto
     */
    flaecheQm?: number;
    /**
     * 
     * @type {number}
     * @memberof BezirksteilDto
     */
    xcoordinate?: number;
    /**
     * 
     * @type {number}
     * @memberof BezirksteilDto
     */
    ycoordinate?: number;
}

/**
 * Check if a given object implements the BezirksteilDto interface.
 */
export function instanceOfBezirksteilDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BezirksteilDtoFromJSON(json: any): BezirksteilDto {
    return BezirksteilDtoFromJSONTyped(json, false);
}

export function BezirksteilDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BezirksteilDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'objectId': !exists(json, 'objectId') ? undefined : json['objectId'],
        'bezirksteilNummer': !exists(json, 'bezirksteilNummer') ? undefined : json['bezirksteilNummer'],
        'flaecheQm': !exists(json, 'flaecheQm') ? undefined : json['flaecheQm'],
        'xcoordinate': !exists(json, 'xcoordinate') ? undefined : json['xcoordinate'],
        'ycoordinate': !exists(json, 'ycoordinate') ? undefined : json['ycoordinate'],
    };
}

export function BezirksteilDtoToJSON(value?: BezirksteilDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'objectId': value.objectId,
        'bezirksteilNummer': value.bezirksteilNummer,
        'flaecheQm': value.flaecheQm,
        'xcoordinate': value.xcoordinate,
        'ycoordinate': value.ycoordinate,
    };
}

