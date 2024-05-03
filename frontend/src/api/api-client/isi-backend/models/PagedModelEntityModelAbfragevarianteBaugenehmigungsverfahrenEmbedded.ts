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
import type { EntityModelAbfragevarianteBaugenehmigungsverfahren } from './EntityModelAbfragevarianteBaugenehmigungsverfahren';
import {
    EntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSON,
    EntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSONTyped,
    EntityModelAbfragevarianteBaugenehmigungsverfahrenToJSON,
} from './EntityModelAbfragevarianteBaugenehmigungsverfahren';

/**
 * 
 * @export
 * @interface PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbedded
 */
export interface PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbedded {
    /**
     * 
     * @type {Array<EntityModelAbfragevarianteBaugenehmigungsverfahren>}
     * @memberof PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbedded
     */
    abfragevarianteBaugenehmigungsverfahrens?: Array<EntityModelAbfragevarianteBaugenehmigungsverfahren>;
}

/**
 * Check if a given object implements the PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbedded interface.
 */
export function instanceOfPagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbedded(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbeddedFromJSON(json: any): PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbedded {
    return PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbeddedFromJSONTyped(json, false);
}

export function PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbeddedFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbedded {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'abfragevarianteBaugenehmigungsverfahrens': !exists(json, 'abfragevarianteBaugenehmigungsverfahrens') ? undefined : ((json['abfragevarianteBaugenehmigungsverfahrens'] as Array<any>).map(EntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSON)),
    };
}

export function PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbeddedToJSON(value?: PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenEmbedded | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'abfragevarianteBaugenehmigungsverfahrens': value.abfragevarianteBaugenehmigungsverfahrens === undefined ? undefined : ((value.abfragevarianteBaugenehmigungsverfahrens as Array<any>).map(EntityModelAbfragevarianteBaugenehmigungsverfahrenToJSON)),
    };
}

