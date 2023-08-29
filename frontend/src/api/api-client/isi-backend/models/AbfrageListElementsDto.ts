/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AbfrageListElementDto,
    AbfrageListElementDtoFromJSON,
    AbfrageListElementDtoFromJSONTyped,
    AbfrageListElementDtoToJSON,
} from './AbfrageListElementDto';

/**
 * 
 * @export
 * @interface AbfrageListElementsDto
 */
export interface AbfrageListElementsDto {
    /**
     * 
     * @type {Array<AbfrageListElementDto>}
     * @memberof AbfrageListElementsDto
     */
    listElements?: Array<AbfrageListElementDto>;
}

export function AbfrageListElementsDtoFromJSON(json: any): AbfrageListElementsDto {
    return AbfrageListElementsDtoFromJSONTyped(json, false);
}

export function AbfrageListElementsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageListElementsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'listElements': !exists(json, 'listElements') ? undefined : ((json['listElements'] as Array<any>).map(AbfrageListElementDtoFromJSON)),
    };
}

export function AbfrageListElementsDtoToJSON(value?: AbfrageListElementsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'listElements': value.listElements === undefined ? undefined : ((value.listElements as Array<any>).map(AbfrageListElementDtoToJSON)),
    };
}

