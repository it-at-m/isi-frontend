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
import type { EntityModelBauvorhaben } from './EntityModelBauvorhaben';
import {
    EntityModelBauvorhabenFromJSON,
    EntityModelBauvorhabenFromJSONTyped,
    EntityModelBauvorhabenToJSON,
} from './EntityModelBauvorhaben';

/**
 * 
 * @export
 * @interface PagedModelEntityModelBauvorhabenEmbedded
 */
export interface PagedModelEntityModelBauvorhabenEmbedded {
    /**
     * 
     * @type {Array<EntityModelBauvorhaben>}
     * @memberof PagedModelEntityModelBauvorhabenEmbedded
     */
    bauvorhabens?: Array<EntityModelBauvorhaben>;
}

/**
 * Check if a given object implements the PagedModelEntityModelBauvorhabenEmbedded interface.
 */
export function instanceOfPagedModelEntityModelBauvorhabenEmbedded(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelBauvorhabenEmbeddedFromJSON(json: any): PagedModelEntityModelBauvorhabenEmbedded {
    return PagedModelEntityModelBauvorhabenEmbeddedFromJSONTyped(json, false);
}

export function PagedModelEntityModelBauvorhabenEmbeddedFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelBauvorhabenEmbedded {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'bauvorhabens': !exists(json, 'bauvorhabens') ? undefined : ((json['bauvorhabens'] as Array<any>).map(EntityModelBauvorhabenFromJSON)),
    };
}

export function PagedModelEntityModelBauvorhabenEmbeddedToJSON(value?: PagedModelEntityModelBauvorhabenEmbedded | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'bauvorhabens': value.bauvorhabens === undefined ? undefined : ((value.bauvorhabens as Array<any>).map(EntityModelBauvorhabenToJSON)),
    };
}
