/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    LookupEntryDto,
    LookupEntryDtoFromJSON,
    LookupEntryDtoFromJSONTyped,
    LookupEntryDtoToJSON,
} from './LookupEntryDto';

/**
 * 
 * @export
 * @interface LookupListDto
 */
export interface LookupListDto {
    /**
     * 
     * @type {Array<LookupEntryDto>}
     * @memberof LookupListDto
     */
    list?: Array<LookupEntryDto>;
}

export function LookupListDtoFromJSON(json: any): LookupListDto {
    return LookupListDtoFromJSONTyped(json, false);
}

export function LookupListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LookupListDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'list': !exists(json, 'list') ? undefined : ((json['list'] as Array<any>).map(LookupEntryDtoFromJSON)),
    };
}

export function LookupListDtoToJSON(value?: LookupListDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'list': value.list === undefined ? undefined : ((value.list as Array<any>).map(LookupEntryDtoToJSON)),
    };
}

