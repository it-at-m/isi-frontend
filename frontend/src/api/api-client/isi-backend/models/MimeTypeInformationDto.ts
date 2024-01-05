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
 * @interface MimeTypeInformationDto
 */
export interface MimeTypeInformationDto {
    /**
     * 
     * @type {string}
     * @memberof MimeTypeInformationDto
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof MimeTypeInformationDto
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof MimeTypeInformationDto
     */
    acronym?: string;
}

/**
 * Check if a given object implements the MimeTypeInformationDto interface.
 */
export function instanceOfMimeTypeInformationDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MimeTypeInformationDtoFromJSON(json: any): MimeTypeInformationDto {
    return MimeTypeInformationDtoFromJSONTyped(json, false);
}

export function MimeTypeInformationDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MimeTypeInformationDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'acronym': !exists(json, 'acronym') ? undefined : json['acronym'],
    };
}

export function MimeTypeInformationDtoToJSON(value?: MimeTypeInformationDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'description': value.description,
        'acronym': value.acronym,
    };
}

