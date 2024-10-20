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
import type { PagedModelEntityModelDokumentEmbedded } from './PagedModelEntityModelDokumentEmbedded';
import {
    PagedModelEntityModelDokumentEmbeddedFromJSON,
    PagedModelEntityModelDokumentEmbeddedFromJSONTyped,
    PagedModelEntityModelDokumentEmbeddedToJSON,
} from './PagedModelEntityModelDokumentEmbedded';

/**
 * 
 * @export
 * @interface PagedModelEntityModelDokument
 */
export interface PagedModelEntityModelDokument {
    /**
     * 
     * @type {PagedModelEntityModelDokumentEmbedded}
     * @memberof PagedModelEntityModelDokument
     */
    embedded?: PagedModelEntityModelDokumentEmbedded;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof PagedModelEntityModelDokument
     */
    links?: { [key: string]: Link; };
    /**
     * 
     * @type {PageMetadata}
     * @memberof PagedModelEntityModelDokument
     */
    page?: PageMetadata;
}

/**
 * Check if a given object implements the PagedModelEntityModelDokument interface.
 */
export function instanceOfPagedModelEntityModelDokument(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelDokumentFromJSON(json: any): PagedModelEntityModelDokument {
    return PagedModelEntityModelDokumentFromJSONTyped(json, false);
}

export function PagedModelEntityModelDokumentFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelDokument {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'embedded': !exists(json, '_embedded') ? undefined : PagedModelEntityModelDokumentEmbeddedFromJSON(json['_embedded']),
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
        'page': !exists(json, 'page') ? undefined : PageMetadataFromJSON(json['page']),
    };
}

export function PagedModelEntityModelDokumentToJSON(value?: PagedModelEntityModelDokument | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_embedded': PagedModelEntityModelDokumentEmbeddedToJSON(value.embedded),
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
        'page': PageMetadataToJSON(value.page),
    };
}

