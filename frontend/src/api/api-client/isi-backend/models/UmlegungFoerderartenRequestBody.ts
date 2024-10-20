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
import type { Umlegungsschluessel } from './Umlegungsschluessel';
import {
    UmlegungsschluesselFromJSON,
    UmlegungsschluesselFromJSONTyped,
    UmlegungsschluesselToJSON,
} from './Umlegungsschluessel';

/**
 * 
 * @export
 * @interface UmlegungFoerderartenRequestBody
 */
export interface UmlegungFoerderartenRequestBody {
    /**
     * 
     * @type {string}
     * @memberof UmlegungFoerderartenRequestBody
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof UmlegungFoerderartenRequestBody
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof UmlegungFoerderartenRequestBody
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof UmlegungFoerderartenRequestBody
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof UmlegungFoerderartenRequestBody
     */
    bezeichnung?: string;
    /**
     * 
     * @type {Date}
     * @memberof UmlegungFoerderartenRequestBody
     */
    gueltigAb?: Date;
    /**
     * 
     * @type {Umlegungsschluessel}
     * @memberof UmlegungFoerderartenRequestBody
     */
    umlegungsschluessel?: Umlegungsschluessel;
}

/**
 * Check if a given object implements the UmlegungFoerderartenRequestBody interface.
 */
export function instanceOfUmlegungFoerderartenRequestBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UmlegungFoerderartenRequestBodyFromJSON(json: any): UmlegungFoerderartenRequestBody {
    return UmlegungFoerderartenRequestBodyFromJSONTyped(json, false);
}

export function UmlegungFoerderartenRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): UmlegungFoerderartenRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'bezeichnung': !exists(json, 'bezeichnung') ? undefined : json['bezeichnung'],
        'gueltigAb': !exists(json, 'gueltigAb') ? undefined : (new Date(json['gueltigAb'])),
        'umlegungsschluessel': !exists(json, 'umlegungsschluessel') ? undefined : UmlegungsschluesselFromJSON(json['umlegungsschluessel']),
    };
}

export function UmlegungFoerderartenRequestBodyToJSON(value?: UmlegungFoerderartenRequestBody | null): any {
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
        'bezeichnung': value.bezeichnung,
        'gueltigAb': value.gueltigAb === undefined ? undefined : (value.gueltigAb.toISOString().substr(0,10)),
        'umlegungsschluessel': UmlegungsschluesselToJSON(value.umlegungsschluessel),
    };
}

