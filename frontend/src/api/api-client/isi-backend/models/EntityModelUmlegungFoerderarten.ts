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
import type { Umlegungsschluessel } from './Umlegungsschluessel';
import {
    UmlegungsschluesselFromJSON,
    UmlegungsschluesselFromJSONTyped,
    UmlegungsschluesselToJSON,
} from './Umlegungsschluessel';

/**
 * 
 * @export
 * @interface EntityModelUmlegungFoerderarten
 */
export interface EntityModelUmlegungFoerderarten {
    /**
     * 
     * @type {number}
     * @memberof EntityModelUmlegungFoerderarten
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelUmlegungFoerderarten
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelUmlegungFoerderarten
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof EntityModelUmlegungFoerderarten
     */
    bezeichnung?: string;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelUmlegungFoerderarten
     */
    gueltigAb?: Date;
    /**
     * 
     * @type {Umlegungsschluessel}
     * @memberof EntityModelUmlegungFoerderarten
     */
    umlegungsschluessel?: Umlegungsschluessel;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof EntityModelUmlegungFoerderarten
     */
    links?: { [key: string]: Link; };
}

/**
 * Check if a given object implements the EntityModelUmlegungFoerderarten interface.
 */
export function instanceOfEntityModelUmlegungFoerderarten(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EntityModelUmlegungFoerderartenFromJSON(json: any): EntityModelUmlegungFoerderarten {
    return EntityModelUmlegungFoerderartenFromJSONTyped(json, false);
}

export function EntityModelUmlegungFoerderartenFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityModelUmlegungFoerderarten {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'bezeichnung': !exists(json, 'bezeichnung') ? undefined : json['bezeichnung'],
        'gueltigAb': !exists(json, 'gueltigAb') ? undefined : (new Date(json['gueltigAb'])),
        'umlegungsschluessel': !exists(json, 'umlegungsschluessel') ? undefined : UmlegungsschluesselFromJSON(json['umlegungsschluessel']),
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
    };
}

export function EntityModelUmlegungFoerderartenToJSON(value?: EntityModelUmlegungFoerderarten | null): any {
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
        'bezeichnung': value.bezeichnung,
        'gueltigAb': value.gueltigAb === undefined ? undefined : (value.gueltigAb.toISOString().substr(0,10)),
        'umlegungsschluessel': UmlegungsschluesselToJSON(value.umlegungsschluessel),
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
    };
}
