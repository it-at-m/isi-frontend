/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.3.0
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
 * @interface Foerderart
 */
export interface Foerderart {
    /**
     * 
     * @type {string}
     * @memberof Foerderart
     */
    bezeichnung?: string;
    /**
     * 
     * @type {number}
     * @memberof Foerderart
     */
    anteilProzent?: number;
}

/**
 * Check if a given object implements the Foerderart interface.
 */
export function instanceOfFoerderart(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FoerderartFromJSON(json: any): Foerderart {
    return FoerderartFromJSONTyped(json, false);
}

export function FoerderartFromJSONTyped(json: any, ignoreDiscriminator: boolean): Foerderart {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'bezeichnung': !exists(json, 'bezeichnung') ? undefined : json['bezeichnung'],
        'anteilProzent': !exists(json, 'anteilProzent') ? undefined : json['anteilProzent'],
    };
}

export function FoerderartToJSON(value?: Foerderart | null): any {
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

