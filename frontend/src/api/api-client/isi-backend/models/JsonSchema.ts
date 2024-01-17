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
import type { AbstractJsonSchemaPropertyObject } from './AbstractJsonSchemaPropertyObject';
import {
    AbstractJsonSchemaPropertyObjectFromJSON,
    AbstractJsonSchemaPropertyObjectFromJSONTyped,
    AbstractJsonSchemaPropertyObjectToJSON,
} from './AbstractJsonSchemaPropertyObject';
import type { Item } from './Item';
import {
    ItemFromJSON,
    ItemFromJSONTyped,
    ItemToJSON,
} from './Item';

/**
 * 
 * @export
 * @interface JsonSchema
 */
export interface JsonSchema {
    /**
     * 
     * @type {string}
     * @memberof JsonSchema
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof JsonSchema
     */
    description?: string;
    /**
     * 
     * @type {{ [key: string]: AbstractJsonSchemaPropertyObject; }}
     * @memberof JsonSchema
     */
    properties?: { [key: string]: AbstractJsonSchemaPropertyObject; };
    /**
     * 
     * @type {Array<string>}
     * @memberof JsonSchema
     */
    requiredProperties?: Array<string>;
    /**
     * 
     * @type {{ [key: string]: Item; }}
     * @memberof JsonSchema
     */
    definitions?: { [key: string]: Item; };
    /**
     * 
     * @type {string}
     * @memberof JsonSchema
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof JsonSchema
     */
    $schema?: string;
}

/**
 * Check if a given object implements the JsonSchema interface.
 */
export function instanceOfJsonSchema(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function JsonSchemaFromJSON(json: any): JsonSchema {
    return JsonSchemaFromJSONTyped(json, false);
}

export function JsonSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): JsonSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'properties': !exists(json, 'properties') ? undefined : (mapValues(json['properties'], AbstractJsonSchemaPropertyObjectFromJSON)),
        'requiredProperties': !exists(json, 'requiredProperties') ? undefined : json['requiredProperties'],
        'definitions': !exists(json, 'definitions') ? undefined : (mapValues(json['definitions'], ItemFromJSON)),
        'type': !exists(json, 'type') ? undefined : json['type'],
        '$schema': !exists(json, '$schema') ? undefined : json['$schema'],
    };
}

export function JsonSchemaToJSON(value?: JsonSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'description': value.description,
        'properties': value.properties === undefined ? undefined : (mapValues(value.properties, AbstractJsonSchemaPropertyObjectToJSON)),
        'requiredProperties': value.requiredProperties,
        'definitions': value.definitions === undefined ? undefined : (mapValues(value.definitions, ItemToJSON)),
        'type': value.type,
        '$schema': value.$schema,
    };
}

