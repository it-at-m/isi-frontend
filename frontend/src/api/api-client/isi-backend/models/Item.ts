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
import type { AbstractJsonSchemaPropertyObject } from './AbstractJsonSchemaPropertyObject';
import {
    AbstractJsonSchemaPropertyObjectFromJSON,
    AbstractJsonSchemaPropertyObjectFromJSONTyped,
    AbstractJsonSchemaPropertyObjectToJSON,
} from './AbstractJsonSchemaPropertyObject';

/**
 * 
 * @export
 * @interface Item
 */
export interface Item {
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    type?: string;
    /**
     * 
     * @type {{ [key: string]: AbstractJsonSchemaPropertyObject; }}
     * @memberof Item
     */
    properties?: { [key: string]: AbstractJsonSchemaPropertyObject; };
    /**
     * 
     * @type {Array<string>}
     * @memberof Item
     */
    requiredProperties?: Array<string>;
}

/**
 * Check if a given object implements the Item interface.
 */
export function instanceOfItem(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ItemFromJSON(json: any): Item {
    return ItemFromJSONTyped(json, false);
}

export function ItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): Item {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'properties': !exists(json, 'properties') ? undefined : (mapValues(json['properties'], AbstractJsonSchemaPropertyObjectFromJSON)),
        'requiredProperties': !exists(json, 'requiredProperties') ? undefined : json['requiredProperties'],
    };
}

export function ItemToJSON(value?: Item | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'properties': value.properties === undefined ? undefined : (mapValues(value.properties, AbstractJsonSchemaPropertyObjectToJSON)),
        'requiredProperties': value.requiredProperties,
    };
}

