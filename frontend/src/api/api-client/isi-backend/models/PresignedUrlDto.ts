/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.0.0
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
 * @interface PresignedUrlDto
 */
export interface PresignedUrlDto {
    /**
     * Die HTTP-Methode für den Request der Presigned-Url
     * @type {string}
     * @memberof PresignedUrlDto
     */
    httpMethodToUse?: string;
    /**
     * Die Presigned-Url
     * @type {string}
     * @memberof PresignedUrlDto
     */
    url?: string;
}

export function PresignedUrlDtoFromJSON(json: any): PresignedUrlDto {
    return PresignedUrlDtoFromJSONTyped(json, false);
}

export function PresignedUrlDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PresignedUrlDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'httpMethodToUse': !exists(json, 'httpMethodToUse') ? undefined : json['httpMethodToUse'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function PresignedUrlDtoToJSON(value?: PresignedUrlDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'httpMethodToUse': value.httpMethodToUse,
        'url': value.url,
    };
}

