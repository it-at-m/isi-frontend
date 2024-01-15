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
/**
 * 
 * @export
 * @interface GlobalCounterRequestBody
 */
export interface GlobalCounterRequestBody {
    /**
     * 
     * @type {string}
     * @memberof GlobalCounterRequestBody
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof GlobalCounterRequestBody
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof GlobalCounterRequestBody
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof GlobalCounterRequestBody
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof GlobalCounterRequestBody
     */
    counterType?: GlobalCounterRequestBodyCounterTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof GlobalCounterRequestBody
     */
    counter?: number;
}


/**
 * @export
 */
export const GlobalCounterRequestBodyCounterTypeEnum = {
    NummerBauvorhaben: 'NUMMER_BAUVORHABEN'
} as const;
export type GlobalCounterRequestBodyCounterTypeEnum = typeof GlobalCounterRequestBodyCounterTypeEnum[keyof typeof GlobalCounterRequestBodyCounterTypeEnum];


/**
 * Check if a given object implements the GlobalCounterRequestBody interface.
 */
export function instanceOfGlobalCounterRequestBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GlobalCounterRequestBodyFromJSON(json: any): GlobalCounterRequestBody {
    return GlobalCounterRequestBodyFromJSONTyped(json, false);
}

export function GlobalCounterRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): GlobalCounterRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'counterType': !exists(json, 'counterType') ? undefined : json['counterType'],
        'counter': !exists(json, 'counter') ? undefined : json['counter'],
    };
}

export function GlobalCounterRequestBodyToJSON(value?: GlobalCounterRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'counterType': value.counterType,
        'counter': value.counter,
    };
}

