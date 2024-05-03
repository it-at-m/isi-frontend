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
import type { PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded } from './PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded';
import {
    PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbeddedFromJSON,
    PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbeddedFromJSONTyped,
    PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbeddedToJSON,
} from './PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded';

/**
 * 
 * @export
 * @interface PagedModelEntityModelAbfragevarianteBauleitplanverfahren
 */
export interface PagedModelEntityModelAbfragevarianteBauleitplanverfahren {
    /**
     * 
     * @type {PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded}
     * @memberof PagedModelEntityModelAbfragevarianteBauleitplanverfahren
     */
    embedded?: PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof PagedModelEntityModelAbfragevarianteBauleitplanverfahren
     */
    links?: { [key: string]: Link; };
    /**
     * 
     * @type {PageMetadata}
     * @memberof PagedModelEntityModelAbfragevarianteBauleitplanverfahren
     */
    page?: PageMetadata;
}

/**
 * Check if a given object implements the PagedModelEntityModelAbfragevarianteBauleitplanverfahren interface.
 */
export function instanceOfPagedModelEntityModelAbfragevarianteBauleitplanverfahren(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelAbfragevarianteBauleitplanverfahrenFromJSON(json: any): PagedModelEntityModelAbfragevarianteBauleitplanverfahren {
    return PagedModelEntityModelAbfragevarianteBauleitplanverfahrenFromJSONTyped(json, false);
}

export function PagedModelEntityModelAbfragevarianteBauleitplanverfahrenFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelAbfragevarianteBauleitplanverfahren {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'embedded': !exists(json, '_embedded') ? undefined : PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbeddedFromJSON(json['_embedded']),
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
        'page': !exists(json, 'page') ? undefined : PageMetadataFromJSON(json['page']),
    };
}

export function PagedModelEntityModelAbfragevarianteBauleitplanverfahrenToJSON(value?: PagedModelEntityModelAbfragevarianteBauleitplanverfahren | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_embedded': PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbeddedToJSON(value.embedded),
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
        'page': PageMetadataToJSON(value.page),
    };
}

