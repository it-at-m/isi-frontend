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
import type { PageMetadata } from './PageMetadata';
import {
    PageMetadataFromJSON,
    PageMetadataFromJSONTyped,
    PageMetadataToJSON,
} from './PageMetadata';
import type { PagedModelEntityModelAbfrageEmbedded } from './PagedModelEntityModelAbfrageEmbedded';
import {
    PagedModelEntityModelAbfrageEmbeddedFromJSON,
    PagedModelEntityModelAbfrageEmbeddedFromJSONTyped,
    PagedModelEntityModelAbfrageEmbeddedToJSON,
} from './PagedModelEntityModelAbfrageEmbedded';

/**
 * 
 * @export
 * @interface PagedModelEntityModelAbfrage
 */
export interface PagedModelEntityModelAbfrage {
    /**
     * 
     * @type {PagedModelEntityModelAbfrageEmbedded}
     * @memberof PagedModelEntityModelAbfrage
     */
    embedded?: PagedModelEntityModelAbfrageEmbedded;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof PagedModelEntityModelAbfrage
     */
    links?: { [key: string]: Link; };
    /**
     * 
     * @type {PageMetadata}
     * @memberof PagedModelEntityModelAbfrage
     */
    page?: PageMetadata;
}

/**
 * Check if a given object implements the PagedModelEntityModelAbfrage interface.
 */
export function instanceOfPagedModelEntityModelAbfrage(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelAbfrageFromJSON(json: any): PagedModelEntityModelAbfrage {
    return PagedModelEntityModelAbfrageFromJSONTyped(json, false);
}

export function PagedModelEntityModelAbfrageFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelAbfrage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'embedded': !exists(json, '_embedded') ? undefined : PagedModelEntityModelAbfrageEmbeddedFromJSON(json['_embedded']),
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
        'page': !exists(json, 'page') ? undefined : PageMetadataFromJSON(json['page']),
    };
}

export function PagedModelEntityModelAbfrageToJSON(value?: PagedModelEntityModelAbfrage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_embedded': PagedModelEntityModelAbfrageEmbeddedToJSON(value.embedded),
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
        'page': PageMetadataToJSON(value.page),
    };
}

