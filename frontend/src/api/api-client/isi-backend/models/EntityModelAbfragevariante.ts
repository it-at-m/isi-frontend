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
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';

/**
 * 
 * @export
 * @interface EntityModelAbfragevariante
 */
export interface EntityModelAbfragevariante {
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevariante
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelAbfragevariante
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelAbfragevariante
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevariante
     */
    abfragevariantenNr?: number;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfragevariante
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfragevariante
     */
    artAbfragevariante?: EntityModelAbfragevarianteArtAbfragevarianteEnum;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof EntityModelAbfragevariante
     */
    links?: { [key: string]: Link; };
}


/**
 * @export
 */
export const EntityModelAbfragevarianteArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type EntityModelAbfragevarianteArtAbfragevarianteEnum = typeof EntityModelAbfragevarianteArtAbfragevarianteEnum[keyof typeof EntityModelAbfragevarianteArtAbfragevarianteEnum];


/**
 * Check if a given object implements the EntityModelAbfragevariante interface.
 */
export function instanceOfEntityModelAbfragevariante(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EntityModelAbfragevarianteFromJSON(json: any): EntityModelAbfragevariante {
    return EntityModelAbfragevarianteFromJSONTyped(json, false);
}

export function EntityModelAbfragevarianteFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityModelAbfragevariante {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'abfragevariantenNr': !exists(json, 'abfragevariantenNr') ? undefined : json['abfragevariantenNr'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
    };
}

export function EntityModelAbfragevarianteToJSON(value?: EntityModelAbfragevariante | null): any {
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
        'abfragevariantenNr': value.abfragevariantenNr,
        'name': value.name,
        'artAbfragevariante': value.artAbfragevariante,
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
    };
}

