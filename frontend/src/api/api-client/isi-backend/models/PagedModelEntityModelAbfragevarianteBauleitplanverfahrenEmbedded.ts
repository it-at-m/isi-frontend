/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.1.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { EntityModelAbfragevarianteBauleitplanverfahren } from './EntityModelAbfragevarianteBauleitplanverfahren';
import {
    EntityModelAbfragevarianteBauleitplanverfahrenFromJSON,
    EntityModelAbfragevarianteBauleitplanverfahrenFromJSONTyped,
    EntityModelAbfragevarianteBauleitplanverfahrenToJSON,
} from './EntityModelAbfragevarianteBauleitplanverfahren';

/**
 * 
 * @export
 * @interface PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded
 */
export interface PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded {
    /**
     * 
     * @type {Array<EntityModelAbfragevarianteBauleitplanverfahren>}
     * @memberof PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded
     */
    abfragevarianteBauleitplanverfahrens?: Array<EntityModelAbfragevarianteBauleitplanverfahren>;
}

/**
 * Check if a given object implements the PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded interface.
 */
export function instanceOfPagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbeddedFromJSON(json: any): PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded {
    return PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbeddedFromJSONTyped(json, false);
}

export function PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbeddedFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'abfragevarianteBauleitplanverfahrens': !exists(json, 'abfragevarianteBauleitplanverfahrens') ? undefined : ((json['abfragevarianteBauleitplanverfahrens'] as Array<any>).map(EntityModelAbfragevarianteBauleitplanverfahrenFromJSON)),
    };
}

export function PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbeddedToJSON(value?: PagedModelEntityModelAbfragevarianteBauleitplanverfahrenEmbedded | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'abfragevarianteBauleitplanverfahrens': value.abfragevarianteBauleitplanverfahrens === undefined ? undefined : ((value.abfragevarianteBauleitplanverfahrens as Array<any>).map(EntityModelAbfragevarianteBauleitplanverfahrenToJSON)),
    };
}
