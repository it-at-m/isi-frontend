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
import {
     BauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped
} from './';

/**
 * 
 * @export
 * @interface AbfrageInBearbeitungFachreferatDto
 */
export interface AbfrageInBearbeitungFachreferatDto {
    /**
     * 
     * @type {number}
     * @memberof AbfrageInBearbeitungFachreferatDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfrageInBearbeitungFachreferatDto
     */
    artAbfrage?: AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum;
}


/**
 * @export
 */
export const AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum = {
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeitereAbfragen: 'WEITERE_ABFRAGEN'
} as const;
export type AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum = typeof AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum[keyof typeof AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum];


export function AbfrageInBearbeitungFachreferatDtoFromJSON(json: any): AbfrageInBearbeitungFachreferatDto {
    return AbfrageInBearbeitungFachreferatDtoFromJSONTyped(json, false);
}

export function AbfrageInBearbeitungFachreferatDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageInBearbeitungFachreferatDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['artAbfrage'] === 'BauleitplanverfahrenInBearbeitungFachreferatDto') {
            return BauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, true);
        }
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfrage': !exists(json, 'artAbfrage') ? undefined : json['artAbfrage'],
    };
}

export function AbfrageInBearbeitungFachreferatDtoToJSON(value?: AbfrageInBearbeitungFachreferatDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'artAbfrage': value.artAbfrage,
    };
}
