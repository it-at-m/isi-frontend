/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.4.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Jahresrate } from './Jahresrate';
import {
    JahresrateFromJSON,
    JahresrateFromJSONTyped,
    JahresrateToJSON,
} from './Jahresrate';

/**
 * 
 * @export
 * @interface IdealtypischeBaurateRequestBody
 */
export interface IdealtypischeBaurateRequestBody {
    /**
     * 
     * @type {string}
     * @memberof IdealtypischeBaurateRequestBody
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof IdealtypischeBaurateRequestBody
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof IdealtypischeBaurateRequestBody
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof IdealtypischeBaurateRequestBody
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof IdealtypischeBaurateRequestBody
     */
    von?: number;
    /**
     * 
     * @type {number}
     * @memberof IdealtypischeBaurateRequestBody
     */
    bisExklusiv?: number;
    /**
     * 
     * @type {string}
     * @memberof IdealtypischeBaurateRequestBody
     */
    typ?: IdealtypischeBaurateRequestBodyTypEnum;
    /**
     * 
     * @type {Array<Jahresrate>}
     * @memberof IdealtypischeBaurateRequestBody
     */
    jahresraten?: Array<Jahresrate>;
}


/**
 * @export
 */
export const IdealtypischeBaurateRequestBodyTypEnum = {
    AnzahlWohneinheitenGesamt: 'ANZAHL_WOHNEINHEITEN_GESAMT',
    GeschossflaecheWohnenGesamt: 'GESCHOSSFLAECHE_WOHNEN_GESAMT'
} as const;
export type IdealtypischeBaurateRequestBodyTypEnum = typeof IdealtypischeBaurateRequestBodyTypEnum[keyof typeof IdealtypischeBaurateRequestBodyTypEnum];


/**
 * Check if a given object implements the IdealtypischeBaurateRequestBody interface.
 */
export function instanceOfIdealtypischeBaurateRequestBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function IdealtypischeBaurateRequestBodyFromJSON(json: any): IdealtypischeBaurateRequestBody {
    return IdealtypischeBaurateRequestBodyFromJSONTyped(json, false);
}

export function IdealtypischeBaurateRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): IdealtypischeBaurateRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'von': !exists(json, 'von') ? undefined : json['von'],
        'bisExklusiv': !exists(json, 'bisExklusiv') ? undefined : json['bisExklusiv'],
        'typ': !exists(json, 'typ') ? undefined : json['typ'],
        'jahresraten': !exists(json, 'jahresraten') ? undefined : ((json['jahresraten'] as Array<any>).map(JahresrateFromJSON)),
    };
}

export function IdealtypischeBaurateRequestBodyToJSON(value?: IdealtypischeBaurateRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'von': value.von,
        'bisExklusiv': value.bisExklusiv,
        'typ': value.typ,
        'jahresraten': value.jahresraten === undefined ? undefined : ((value.jahresraten as Array<any>).map(JahresrateToJSON)),
    };
}

