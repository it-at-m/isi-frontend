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
import type { PagedModelEntityModelBauvorhabenEmbedded } from './PagedModelEntityModelBauvorhabenEmbedded';
import {
    PagedModelEntityModelBauvorhabenEmbeddedFromJSON,
    PagedModelEntityModelBauvorhabenEmbeddedFromJSONTyped,
    PagedModelEntityModelBauvorhabenEmbeddedToJSON,
} from './PagedModelEntityModelBauvorhabenEmbedded';

/**
 * 
 * @export
 * @interface PagedModelEntityModelBauvorhaben
 */
export interface PagedModelEntityModelBauvorhaben {
    /**
     * 
     * @type {PagedModelEntityModelBauvorhabenEmbedded}
     * @memberof PagedModelEntityModelBauvorhaben
     */
    embedded?: PagedModelEntityModelBauvorhabenEmbedded;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof PagedModelEntityModelBauvorhaben
     */
    links?: { [key: string]: Link; };
    /**
     * 
     * @type {PageMetadata}
     * @memberof PagedModelEntityModelBauvorhaben
     */
    page?: PageMetadata;
}

/**
 * Check if a given object implements the PagedModelEntityModelBauvorhaben interface.
 */
export function instanceOfPagedModelEntityModelBauvorhaben(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelBauvorhabenFromJSON(json: any): PagedModelEntityModelBauvorhaben {
    return PagedModelEntityModelBauvorhabenFromJSONTyped(json, false);
}

export function PagedModelEntityModelBauvorhabenFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelBauvorhaben {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'embedded': !exists(json, '_embedded') ? undefined : PagedModelEntityModelBauvorhabenEmbeddedFromJSON(json['_embedded']),
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
        'page': !exists(json, 'page') ? undefined : PageMetadataFromJSON(json['page']),
    };
}

export function PagedModelEntityModelBauvorhabenToJSON(value?: PagedModelEntityModelBauvorhaben | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_embedded': PagedModelEntityModelBauvorhabenEmbeddedToJSON(value.embedded),
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
        'page': PageMetadataToJSON(value.page),
    };
}

