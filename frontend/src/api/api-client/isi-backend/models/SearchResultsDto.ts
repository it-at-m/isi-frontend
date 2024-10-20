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
import type { SearchResultsDtoSearchResultsInner } from './SearchResultsDtoSearchResultsInner';
import {
    SearchResultsDtoSearchResultsInnerFromJSON,
    SearchResultsDtoSearchResultsInnerFromJSONTyped,
    SearchResultsDtoSearchResultsInnerToJSON,
} from './SearchResultsDtoSearchResultsInner';

/**
 * 
 * @export
 * @interface SearchResultsDto
 */
export interface SearchResultsDto {
    /**
     * 
     * @type {Array<SearchResultsDtoSearchResultsInner>}
     * @memberof SearchResultsDto
     */
    searchResults?: Array<SearchResultsDtoSearchResultsInner>;
    /**
     * 
     * @type {number}
     * @memberof SearchResultsDto
     */
    numberOfPages?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchResultsDto
     */
    page?: number;
}

/**
 * Check if a given object implements the SearchResultsDto interface.
 */
export function instanceOfSearchResultsDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SearchResultsDtoFromJSON(json: any): SearchResultsDto {
    return SearchResultsDtoFromJSONTyped(json, false);
}

export function SearchResultsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchResultsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'searchResults': !exists(json, 'searchResults') ? undefined : ((json['searchResults'] as Array<any>).map(SearchResultsDtoSearchResultsInnerFromJSON)),
        'numberOfPages': !exists(json, 'numberOfPages') ? undefined : json['numberOfPages'],
        'page': !exists(json, 'page') ? undefined : json['page'],
    };
}

export function SearchResultsDtoToJSON(value?: SearchResultsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'searchResults': value.searchResults === undefined ? undefined : ((value.searchResults as Array<any>).map(SearchResultsDtoSearchResultsInnerToJSON)),
        'numberOfPages': value.numberOfPages,
        'page': value.page,
    };
}

