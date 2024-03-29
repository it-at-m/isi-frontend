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
 * @interface SearchQueryAndSortingDto
 */
export interface SearchQueryAndSortingDto {
    /**
     * 
     * @type {string}
     * @memberof SearchQueryAndSortingDto
     */
    searchQuery: string;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectBauleitplanverfahren: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectBaugenehmigungsverfahren: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectWeiteresVerfahren: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectBauvorhaben: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectGrundschule: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectGsNachmittagBetreuung: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectHausFuerKinder: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectKindergarten: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectKinderkrippe: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectMittelschule: boolean;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    pageSize?: number;
    /**
     * 
     * @type {string}
     * @memberof SearchQueryAndSortingDto
     */
    sortBy: SearchQueryAndSortingDtoSortByEnum;
    /**
     * 
     * @type {string}
     * @memberof SearchQueryAndSortingDto
     */
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum;
}


/**
 * @export
 */
export const SearchQueryAndSortingDtoSortByEnum = {
    Name: 'NAME',
    CreatedDateTime: 'CREATED_DATE_TIME',
    LastModifiedDateTime: 'LAST_MODIFIED_DATE_TIME'
} as const;
export type SearchQueryAndSortingDtoSortByEnum = typeof SearchQueryAndSortingDtoSortByEnum[keyof typeof SearchQueryAndSortingDtoSortByEnum];

/**
 * @export
 */
export const SearchQueryAndSortingDtoSortOrderEnum = {
    Asc: 'ASC',
    Desc: 'DESC'
} as const;
export type SearchQueryAndSortingDtoSortOrderEnum = typeof SearchQueryAndSortingDtoSortOrderEnum[keyof typeof SearchQueryAndSortingDtoSortOrderEnum];


/**
 * Check if a given object implements the SearchQueryAndSortingDto interface.
 */
export function instanceOfSearchQueryAndSortingDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "searchQuery" in value;
    isInstance = isInstance && "selectBauleitplanverfahren" in value;
    isInstance = isInstance && "selectBaugenehmigungsverfahren" in value;
    isInstance = isInstance && "selectWeiteresVerfahren" in value;
    isInstance = isInstance && "selectBauvorhaben" in value;
    isInstance = isInstance && "selectGrundschule" in value;
    isInstance = isInstance && "selectGsNachmittagBetreuung" in value;
    isInstance = isInstance && "selectHausFuerKinder" in value;
    isInstance = isInstance && "selectKindergarten" in value;
    isInstance = isInstance && "selectKinderkrippe" in value;
    isInstance = isInstance && "selectMittelschule" in value;
    isInstance = isInstance && "sortBy" in value;
    isInstance = isInstance && "sortOrder" in value;

    return isInstance;
}

export function SearchQueryAndSortingDtoFromJSON(json: any): SearchQueryAndSortingDto {
    return SearchQueryAndSortingDtoFromJSONTyped(json, false);
}

export function SearchQueryAndSortingDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchQueryAndSortingDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'searchQuery': json['searchQuery'],
        'selectBauleitplanverfahren': json['selectBauleitplanverfahren'],
        'selectBaugenehmigungsverfahren': json['selectBaugenehmigungsverfahren'],
        'selectWeiteresVerfahren': json['selectWeiteresVerfahren'],
        'selectBauvorhaben': json['selectBauvorhaben'],
        'selectGrundschule': json['selectGrundschule'],
        'selectGsNachmittagBetreuung': json['selectGsNachmittagBetreuung'],
        'selectHausFuerKinder': json['selectHausFuerKinder'],
        'selectKindergarten': json['selectKindergarten'],
        'selectKinderkrippe': json['selectKinderkrippe'],
        'selectMittelschule': json['selectMittelschule'],
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'sortBy': json['sortBy'],
        'sortOrder': json['sortOrder'],
    };
}

export function SearchQueryAndSortingDtoToJSON(value?: SearchQueryAndSortingDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'searchQuery': value.searchQuery,
        'selectBauleitplanverfahren': value.selectBauleitplanverfahren,
        'selectBaugenehmigungsverfahren': value.selectBaugenehmigungsverfahren,
        'selectWeiteresVerfahren': value.selectWeiteresVerfahren,
        'selectBauvorhaben': value.selectBauvorhaben,
        'selectGrundschule': value.selectGrundschule,
        'selectGsNachmittagBetreuung': value.selectGsNachmittagBetreuung,
        'selectHausFuerKinder': value.selectHausFuerKinder,
        'selectKindergarten': value.selectKindergarten,
        'selectKinderkrippe': value.selectKinderkrippe,
        'selectMittelschule': value.selectMittelschule,
        'page': value.page,
        'pageSize': value.pageSize,
        'sortBy': value.sortBy,
        'sortOrder': value.sortOrder,
    };
}

