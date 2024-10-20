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
import type { Bearbeitungshistorie } from './Bearbeitungshistorie';
import {
    BearbeitungshistorieFromJSON,
    BearbeitungshistorieFromJSONTyped,
    BearbeitungshistorieToJSON,
} from './Bearbeitungshistorie';
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';
import type { StatusAbfrage } from './StatusAbfrage';
import {
    StatusAbfrageFromJSON,
    StatusAbfrageFromJSONTyped,
    StatusAbfrageToJSON,
} from './StatusAbfrage';

/**
 * 
 * @export
 * @interface EntityModelAbfrage
 */
export interface EntityModelAbfrage {
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfrage
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelAbfrage
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelAbfrage
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfrage
     */
    name?: string;
    /**
     * 
     * @type {StatusAbfrage}
     * @memberof EntityModelAbfrage
     */
    statusAbfrage?: StatusAbfrage;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfrage
     */
    anmerkung?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfrage
     */
    sub?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfrage
     */
    linkEakte?: string;
    /**
     * 
     * @type {Array<Bearbeitungshistorie>}
     * @memberof EntityModelAbfrage
     */
    bearbeitungshistorie?: Array<Bearbeitungshistorie>;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfrage
     */
    artAbfrage?: EntityModelAbfrageArtAbfrageEnum;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof EntityModelAbfrage
     */
    links?: { [key: string]: Link; };
}


/**
 * @export
 */
export const EntityModelAbfrageArtAbfrageEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type EntityModelAbfrageArtAbfrageEnum = typeof EntityModelAbfrageArtAbfrageEnum[keyof typeof EntityModelAbfrageArtAbfrageEnum];


/**
 * Check if a given object implements the EntityModelAbfrage interface.
 */
export function instanceOfEntityModelAbfrage(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EntityModelAbfrageFromJSON(json: any): EntityModelAbfrage {
    return EntityModelAbfrageFromJSONTyped(json, false);
}

export function EntityModelAbfrageFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityModelAbfrage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'statusAbfrage': !exists(json, 'statusAbfrage') ? undefined : StatusAbfrageFromJSON(json['statusAbfrage']),
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'sub': !exists(json, 'sub') ? undefined : json['sub'],
        'linkEakte': !exists(json, 'linkEakte') ? undefined : json['linkEakte'],
        'bearbeitungshistorie': !exists(json, 'bearbeitungshistorie') ? undefined : ((json['bearbeitungshistorie'] as Array<any>).map(BearbeitungshistorieFromJSON)),
        'artAbfrage': !exists(json, 'artAbfrage') ? undefined : json['artAbfrage'],
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
    };
}

export function EntityModelAbfrageToJSON(value?: EntityModelAbfrage | null): any {
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
        'name': value.name,
        'statusAbfrage': StatusAbfrageToJSON(value.statusAbfrage),
        'anmerkung': value.anmerkung,
        'sub': value.sub,
        'linkEakte': value.linkEakte,
        'bearbeitungshistorie': value.bearbeitungshistorie === undefined ? undefined : ((value.bearbeitungshistorie as Array<any>).map(BearbeitungshistorieToJSON)),
        'artAbfrage': value.artAbfrage,
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
    };
}

