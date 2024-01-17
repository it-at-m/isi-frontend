/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.1.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';

/**
 * 
 * @export
 * @interface EntityModelKommentar
 */
export interface EntityModelKommentar {
    /**
     * 
     * @type {number}
     * @memberof EntityModelKommentar
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelKommentar
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelKommentar
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof EntityModelKommentar
     */
    datum?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelKommentar
     */
    text?: string;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof EntityModelKommentar
     */
    links?: { [key: string]: Link; };
}

/**
 * Check if a given object implements the EntityModelKommentar interface.
 */
export function instanceOfEntityModelKommentar(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EntityModelKommentarFromJSON(json: any): EntityModelKommentar {
    return EntityModelKommentarFromJSONTyped(json, false);
}

export function EntityModelKommentarFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityModelKommentar {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'datum': !exists(json, 'datum') ? undefined : json['datum'],
        'text': !exists(json, 'text') ? undefined : json['text'],
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
    };
}

export function EntityModelKommentarToJSON(value?: EntityModelKommentar | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'datum': value.datum,
        'text': value.text,
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
    };
}

