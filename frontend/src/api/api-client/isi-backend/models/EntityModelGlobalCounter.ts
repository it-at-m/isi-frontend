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

/**
 * 
 * @export
 * @interface EntityModelGlobalCounter
 */
export interface EntityModelGlobalCounter {
    /**
     * 
     * @type {number}
     * @memberof EntityModelGlobalCounter
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelGlobalCounter
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelGlobalCounter
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof EntityModelGlobalCounter
     */
    counterType?: EntityModelGlobalCounterCounterTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EntityModelGlobalCounter
     */
    counter?: number;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof EntityModelGlobalCounter
     */
    links?: { [key: string]: Link; };
}


/**
 * @export
 */
export const EntityModelGlobalCounterCounterTypeEnum = {
    NummerBauvorhaben: 'NUMMER_BAUVORHABEN'
} as const;
export type EntityModelGlobalCounterCounterTypeEnum = typeof EntityModelGlobalCounterCounterTypeEnum[keyof typeof EntityModelGlobalCounterCounterTypeEnum];


/**
 * Check if a given object implements the EntityModelGlobalCounter interface.
 */
export function instanceOfEntityModelGlobalCounter(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EntityModelGlobalCounterFromJSON(json: any): EntityModelGlobalCounter {
    return EntityModelGlobalCounterFromJSONTyped(json, false);
}

export function EntityModelGlobalCounterFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityModelGlobalCounter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'counterType': !exists(json, 'counterType') ? undefined : json['counterType'],
        'counter': !exists(json, 'counter') ? undefined : json['counter'],
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
    };
}

export function EntityModelGlobalCounterToJSON(value?: EntityModelGlobalCounter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'counterType': value.counterType,
        'counter': value.counter,
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
    };
}

