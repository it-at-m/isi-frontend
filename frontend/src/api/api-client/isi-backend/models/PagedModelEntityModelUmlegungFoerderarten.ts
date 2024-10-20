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
import type { PagedModelEntityModelUmlegungFoerderartenEmbedded } from './PagedModelEntityModelUmlegungFoerderartenEmbedded';
import {
    PagedModelEntityModelUmlegungFoerderartenEmbeddedFromJSON,
    PagedModelEntityModelUmlegungFoerderartenEmbeddedFromJSONTyped,
    PagedModelEntityModelUmlegungFoerderartenEmbeddedToJSON,
} from './PagedModelEntityModelUmlegungFoerderartenEmbedded';

/**
 * 
 * @export
 * @interface PagedModelEntityModelUmlegungFoerderarten
 */
export interface PagedModelEntityModelUmlegungFoerderarten {
    /**
     * 
     * @type {PagedModelEntityModelUmlegungFoerderartenEmbedded}
     * @memberof PagedModelEntityModelUmlegungFoerderarten
     */
    embedded?: PagedModelEntityModelUmlegungFoerderartenEmbedded;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof PagedModelEntityModelUmlegungFoerderarten
     */
    links?: { [key: string]: Link; };
    /**
     * 
     * @type {PageMetadata}
     * @memberof PagedModelEntityModelUmlegungFoerderarten
     */
    page?: PageMetadata;
}

/**
 * Check if a given object implements the PagedModelEntityModelUmlegungFoerderarten interface.
 */
export function instanceOfPagedModelEntityModelUmlegungFoerderarten(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelUmlegungFoerderartenFromJSON(json: any): PagedModelEntityModelUmlegungFoerderarten {
    return PagedModelEntityModelUmlegungFoerderartenFromJSONTyped(json, false);
}

export function PagedModelEntityModelUmlegungFoerderartenFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelUmlegungFoerderarten {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'embedded': !exists(json, '_embedded') ? undefined : PagedModelEntityModelUmlegungFoerderartenEmbeddedFromJSON(json['_embedded']),
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
        'page': !exists(json, 'page') ? undefined : PageMetadataFromJSON(json['page']),
    };
}

export function PagedModelEntityModelUmlegungFoerderartenToJSON(value?: PagedModelEntityModelUmlegungFoerderarten | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_embedded': PagedModelEntityModelUmlegungFoerderartenEmbeddedToJSON(value.embedded),
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
        'page': PageMetadataToJSON(value.page),
    };
}

