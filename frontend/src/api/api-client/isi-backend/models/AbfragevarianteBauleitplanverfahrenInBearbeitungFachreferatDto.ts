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
import {
    BedarfsmeldungFachreferateDto,
    BedarfsmeldungFachreferateDtoFromJSON,
    BedarfsmeldungFachreferateDtoFromJSONTyped,
    BedarfsmeldungFachreferateDtoToJSON,
} from './BedarfsmeldungFachreferateDto';

/**
 * 
 * @export
 * @interface AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto
 */
export interface AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto
     */
    artAbfragevariante?: AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {Array<BedarfsmeldungFachreferateDto>}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto
     */
    bedarfsmeldungFachreferate?: Array<BedarfsmeldungFachreferateDto>;
}


/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum = {
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeitereAbfragen: 'WEITERE_ABFRAGEN'
} as const;
export type AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum = typeof AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum];


export function AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSON(json: any): AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto {
    return AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
        'bedarfsmeldungFachreferate': !exists(json, 'bedarfsmeldungFachreferate') ? undefined : ((json['bedarfsmeldungFachreferate'] as Array<any>).map(BedarfsmeldungFachreferateDtoFromJSON)),
    };
}

export function AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoToJSON(value?: AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'artAbfragevariante': value.artAbfragevariante,
        'bedarfsmeldungFachreferate': value.bedarfsmeldungFachreferate === undefined ? undefined : ((value.bedarfsmeldungFachreferate as Array<any>).map(BedarfsmeldungFachreferateDtoToJSON)),
    };
}

