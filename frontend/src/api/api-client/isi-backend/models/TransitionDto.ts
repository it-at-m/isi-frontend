/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TransitionDto
 */
export interface TransitionDto {
    /**
     * 
     * @type {string}
     * @memberof TransitionDto
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof TransitionDto
     */
    buttonName?: string;
    /**
     * 
     * @type {number}
     * @memberof TransitionDto
     */
    index?: number;
    /**
     * 
     * @type {string}
     * @memberof TransitionDto
     */
    dialogText?: string;
}

/**
 * Check if a given object implements the TransitionDto interface.
 */
export function instanceOfTransitionDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TransitionDtoFromJSON(json: any): TransitionDto {
    return TransitionDtoFromJSONTyped(json, false);
}

export function TransitionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransitionDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': !exists(json, 'url') ? undefined : json['url'],
        'buttonName': !exists(json, 'buttonName') ? undefined : json['buttonName'],
        'index': !exists(json, 'index') ? undefined : json['index'],
        'dialogText': !exists(json, 'dialogText') ? undefined : json['dialogText'],
    };
}

export function TransitionDtoToJSON(value?: TransitionDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'url': value.url,
        'buttonName': value.buttonName,
        'index': value.index,
        'dialogText': value.dialogText,
    };
}

