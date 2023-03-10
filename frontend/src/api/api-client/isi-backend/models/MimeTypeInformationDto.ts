/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: noreply@mail.de
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
