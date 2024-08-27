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
import type { EntityModelKommentar } from './EntityModelKommentar';
import {
    EntityModelKommentarFromJSON,
    EntityModelKommentarFromJSONTyped,
    EntityModelKommentarToJSON,
} from './EntityModelKommentar';

/**
 * 
 * @export
 * @interface PagedModelEntityModelKommentarEmbedded
 */
export interface PagedModelEntityModelKommentarEmbedded {
    /**
     * 
     * @type {Array<EntityModelKommentar>}
     * @memberof PagedModelEntityModelKommentarEmbedded
     */
    kommentars?: Array<EntityModelKommentar>;
}

/**
 * Check if a given object implements the PagedModelEntityModelKommentarEmbedded interface.
 */
export function instanceOfPagedModelEntityModelKommentarEmbedded(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelKommentarEmbeddedFromJSON(json: any): PagedModelEntityModelKommentarEmbedded {
    return PagedModelEntityModelKommentarEmbeddedFromJSONTyped(json, false);
}

export function PagedModelEntityModelKommentarEmbeddedFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelKommentarEmbedded {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'kommentars': !exists(json, 'kommentars') ? undefined : ((json['kommentars'] as Array<any>).map(EntityModelKommentarFromJSON)),
    };
}

export function PagedModelEntityModelKommentarEmbeddedToJSON(value?: PagedModelEntityModelKommentarEmbedded | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'kommentars': value.kommentars === undefined ? undefined : ((value.kommentars as Array<any>).map(EntityModelKommentarToJSON)),
    };
}

