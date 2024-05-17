/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.2.0
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
import type { PageMetadata } from './PageMetadata';
import {
    PageMetadataFromJSON,
    PageMetadataFromJSONTyped,
    PageMetadataToJSON,
} from './PageMetadata';
import type { PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbedded } from './PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbedded';
import {
    PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbeddedFromJSON,
    PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbeddedFromJSONTyped,
    PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbeddedToJSON,
} from './PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbedded';

/**
 * 
 * @export
 * @interface PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur
 */
export interface PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur {
    /**
     * 
     * @type {PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbedded}
     * @memberof PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur
     */
    embedded?: PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbedded;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur
     */
    links?: { [key: string]: Link; };
    /**
     * 
     * @type {PageMetadata}
     * @memberof PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur
     */
    page?: PageMetadata;
}

/**
 * Check if a given object implements the PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur interface.
 */
export function instanceOfPagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturFromJSON(json: any): PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur {
    return PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturFromJSONTyped(json, false);
}

export function PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'embedded': !exists(json, '_embedded') ? undefined : PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbeddedFromJSON(json['_embedded']),
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
        'page': !exists(json, 'page') ? undefined : PageMetadataFromJSON(json['page']),
    };
}

export function PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturToJSON(value?: PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_embedded': PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturEmbeddedToJSON(value.embedded),
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
        'page': PageMetadataToJSON(value.page),
    };
}

