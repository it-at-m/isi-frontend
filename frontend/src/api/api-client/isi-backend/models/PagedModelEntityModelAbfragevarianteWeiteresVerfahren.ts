/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.3.0
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
import type { PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbedded } from './PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbedded';
import {
    PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbeddedFromJSON,
    PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbeddedFromJSONTyped,
    PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbeddedToJSON,
} from './PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbedded';

/**
 * 
 * @export
 * @interface PagedModelEntityModelAbfragevarianteWeiteresVerfahren
 */
export interface PagedModelEntityModelAbfragevarianteWeiteresVerfahren {
    /**
     * 
     * @type {PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbedded}
     * @memberof PagedModelEntityModelAbfragevarianteWeiteresVerfahren
     */
    embedded?: PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbedded;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof PagedModelEntityModelAbfragevarianteWeiteresVerfahren
     */
    links?: { [key: string]: Link; };
    /**
     * 
     * @type {PageMetadata}
     * @memberof PagedModelEntityModelAbfragevarianteWeiteresVerfahren
     */
    page?: PageMetadata;
}

/**
 * Check if a given object implements the PagedModelEntityModelAbfragevarianteWeiteresVerfahren interface.
 */
export function instanceOfPagedModelEntityModelAbfragevarianteWeiteresVerfahren(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelAbfragevarianteWeiteresVerfahrenFromJSON(json: any): PagedModelEntityModelAbfragevarianteWeiteresVerfahren {
    return PagedModelEntityModelAbfragevarianteWeiteresVerfahrenFromJSONTyped(json, false);
}

export function PagedModelEntityModelAbfragevarianteWeiteresVerfahrenFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelAbfragevarianteWeiteresVerfahren {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'embedded': !exists(json, '_embedded') ? undefined : PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbeddedFromJSON(json['_embedded']),
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
        'page': !exists(json, 'page') ? undefined : PageMetadataFromJSON(json['page']),
    };
}

export function PagedModelEntityModelAbfragevarianteWeiteresVerfahrenToJSON(value?: PagedModelEntityModelAbfragevarianteWeiteresVerfahren | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_embedded': PagedModelEntityModelAbfragevarianteWeiteresVerfahrenEmbeddedToJSON(value.embedded),
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
        'page': PageMetadataToJSON(value.page),
    };
}

