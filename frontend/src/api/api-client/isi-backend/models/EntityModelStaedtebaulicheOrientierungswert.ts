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
 * @interface EntityModelStaedtebaulicheOrientierungswert
 */
export interface EntityModelStaedtebaulicheOrientierungswert {
    /**
     * 
     * @type {number}
     * @memberof EntityModelStaedtebaulicheOrientierungswert
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelStaedtebaulicheOrientierungswert
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelStaedtebaulicheOrientierungswert
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelStaedtebaulicheOrientierungswert
     */
    gueltigAb?: Date;
    /**
     * 
     * @type {string}
     * @memberof EntityModelStaedtebaulicheOrientierungswert
     */
    foerderartBezeichnung?: string;
    /**
     * 
     * @type {number}
     * @memberof EntityModelStaedtebaulicheOrientierungswert
     */
    durchschnittlicheGrundflaeche?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelStaedtebaulicheOrientierungswert
     */
    belegungsdichte?: number;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof EntityModelStaedtebaulicheOrientierungswert
     */
    links?: { [key: string]: Link; };
}

/**
 * Check if a given object implements the EntityModelStaedtebaulicheOrientierungswert interface.
 */
export function instanceOfEntityModelStaedtebaulicheOrientierungswert(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EntityModelStaedtebaulicheOrientierungswertFromJSON(json: any): EntityModelStaedtebaulicheOrientierungswert {
    return EntityModelStaedtebaulicheOrientierungswertFromJSONTyped(json, false);
}

export function EntityModelStaedtebaulicheOrientierungswertFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityModelStaedtebaulicheOrientierungswert {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'gueltigAb': !exists(json, 'gueltigAb') ? undefined : (new Date(json['gueltigAb'])),
        'foerderartBezeichnung': !exists(json, 'foerderartBezeichnung') ? undefined : json['foerderartBezeichnung'],
        'durchschnittlicheGrundflaeche': !exists(json, 'durchschnittlicheGrundflaeche') ? undefined : json['durchschnittlicheGrundflaeche'],
        'belegungsdichte': !exists(json, 'belegungsdichte') ? undefined : json['belegungsdichte'],
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
    };
}

export function EntityModelStaedtebaulicheOrientierungswertToJSON(value?: EntityModelStaedtebaulicheOrientierungswert | null): any {
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
        'gueltigAb': value.gueltigAb === undefined ? undefined : (value.gueltigAb.toISOString().substr(0,10)),
        'foerderartBezeichnung': value.foerderartBezeichnung,
        'durchschnittlicheGrundflaeche': value.durchschnittlicheGrundflaeche,
        'belegungsdichte': value.belegungsdichte,
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
    };
}

