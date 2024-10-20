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
import type { CollectionModelDokumentEmbedded } from './CollectionModelDokumentEmbedded';
import {
    CollectionModelDokumentEmbeddedFromJSON,
    CollectionModelDokumentEmbeddedFromJSONTyped,
    CollectionModelDokumentEmbeddedToJSON,
} from './CollectionModelDokumentEmbedded';
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';

/**
 * 
 * @export
 * @interface CollectionModelDokument
 */
export interface CollectionModelDokument {
    /**
     * 
     * @type {CollectionModelDokumentEmbedded}
     * @memberof CollectionModelDokument
     */
    embedded?: CollectionModelDokumentEmbedded;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof CollectionModelDokument
     */
    links?: { [key: string]: Link; };
}

/**
 * Check if a given object implements the CollectionModelDokument interface.
 */
export function instanceOfCollectionModelDokument(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CollectionModelDokumentFromJSON(json: any): CollectionModelDokument {
    return CollectionModelDokumentFromJSONTyped(json, false);
}

export function CollectionModelDokumentFromJSONTyped(json: any, ignoreDiscriminator: boolean): CollectionModelDokument {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'embedded': !exists(json, '_embedded') ? undefined : CollectionModelDokumentEmbeddedFromJSON(json['_embedded']),
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
    };
}

export function CollectionModelDokumentToJSON(value?: CollectionModelDokument | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_embedded': CollectionModelDokumentEmbeddedToJSON(value.embedded),
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
    };
}

