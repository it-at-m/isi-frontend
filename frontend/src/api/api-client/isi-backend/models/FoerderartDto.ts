/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface FoerderartDto
 */
export interface FoerderartDto {
    /**
     * 
     * @type {string}
     * @memberof FoerderartDto
     */
    bezeichnung?: string;
    /**
     * 
     * @type {number}
     * @memberof FoerderartDto
     */
    anteilProzent?: number;
}

/**
 * Check if a given object implements the FoerderartDto interface.
 */
export function instanceOfFoerderartDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FoerderartDtoFromJSON(json: any): FoerderartDto {
    return FoerderartDtoFromJSONTyped(json, false);
}

export function FoerderartDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FoerderartDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'bezeichnung': !exists(json, 'bezeichnung') ? undefined : json['bezeichnung'],
        'anteilProzent': !exists(json, 'anteilProzent') ? undefined : json['anteilProzent'],
    };
}

export function FoerderartDtoToJSON(value?: FoerderartDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'bezeichnung': value.bezeichnung,
        'anteilProzent': value.anteilProzent,
    };
}

