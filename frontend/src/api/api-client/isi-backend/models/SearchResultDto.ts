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
     AbfrageSearchResultDtoFromJSONTyped,
     BauvorhabenSearchResultDtoFromJSONTyped,
     InfrastruktureinrichtungSearchResultDtoFromJSONTyped
} from './';

/**
 * SearchResultDto
 * @export
 * @interface SearchResultDto
 */
export interface SearchResultDto {
    /**
     * 
     * @type {string}
     * @memberof SearchResultDto
     */
    type?: SearchResultDtoTypeEnum;
}


/**
 * @export
 */
export const SearchResultDtoTypeEnum = {
    Abfrage: 'ABFRAGE',
    Bauvorhaben: 'BAUVORHABEN',
    Infrastruktureinrichtung: 'INFRASTRUKTUREINRICHTUNG'
} as const;
export type SearchResultDtoTypeEnum = typeof SearchResultDtoTypeEnum[keyof typeof SearchResultDtoTypeEnum];


export function SearchResultDtoFromJSON(json: any): SearchResultDto {
    return SearchResultDtoFromJSONTyped(json, false);
}

export function SearchResultDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchResultDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['type'] === 'ABFRAGE') {
            return AbfrageSearchResultDtoFromJSONTyped(json, true);
        }
        if (json['type'] === 'BAUVORHABEN') {
            return BauvorhabenSearchResultDtoFromJSONTyped(json, true);
        }
        if (json['type'] === 'INFRASTRUKTUREINRICHTUNG') {
            return InfrastruktureinrichtungSearchResultDtoFromJSONTyped(json, true);
        }
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function SearchResultDtoToJSON(value?: SearchResultDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
    };
}

