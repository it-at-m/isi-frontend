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
import type { EntityModelAbfragevariante } from './EntityModelAbfragevariante';
import {
    EntityModelAbfragevarianteFromJSON,
    EntityModelAbfragevarianteFromJSONTyped,
    EntityModelAbfragevarianteToJSON,
} from './EntityModelAbfragevariante';

/**
 * 
 * @export
 * @interface PagedModelEntityModelAbfragevarianteEmbedded
 */
export interface PagedModelEntityModelAbfragevarianteEmbedded {
    /**
     * 
     * @type {Array<EntityModelAbfragevariante>}
     * @memberof PagedModelEntityModelAbfragevarianteEmbedded
     */
    abfragevariantes?: Array<EntityModelAbfragevariante>;
}

/**
 * Check if a given object implements the PagedModelEntityModelAbfragevarianteEmbedded interface.
 */
export function instanceOfPagedModelEntityModelAbfragevarianteEmbedded(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelAbfragevarianteEmbeddedFromJSON(json: any): PagedModelEntityModelAbfragevarianteEmbedded {
    return PagedModelEntityModelAbfragevarianteEmbeddedFromJSONTyped(json, false);
}

export function PagedModelEntityModelAbfragevarianteEmbeddedFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelAbfragevarianteEmbedded {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'abfragevariantes': !exists(json, 'abfragevariantes') ? undefined : ((json['abfragevariantes'] as Array<any>).map(EntityModelAbfragevarianteFromJSON)),
    };
}

export function PagedModelEntityModelAbfragevarianteEmbeddedToJSON(value?: PagedModelEntityModelAbfragevarianteEmbedded | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'abfragevariantes': value.abfragevariantes === undefined ? undefined : ((value.abfragevariantes as Array<any>).map(EntityModelAbfragevarianteToJSON)),
    };
}
