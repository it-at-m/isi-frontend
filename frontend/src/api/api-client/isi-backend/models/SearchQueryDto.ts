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
/**
 * 
 * @export
 * @interface SearchQueryDto
 */
export interface SearchQueryDto {
    /**
     * 
     * @type {string}
     * @memberof SearchQueryDto
     */
    searchQuery: string;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectBauleitplanverfahren: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectBaugenehmigungsverfahren: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectWeiteresVerfahren: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectBauvorhaben: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectGrundschule: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectGsNachmittagBetreuung: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectHausFuerKinder: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectKindergarten: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectKinderkrippe: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryDto
     */
    selectMittelschule: boolean;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryDto
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryDto
     */
    pageSize?: number;
}

/**
 * Check if a given object implements the SearchQueryDto interface.
 */
export function instanceOfSearchQueryDto(value: object): boolean {
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

    return isInstance;
}

export function SearchQueryDtoFromJSON(json: any): SearchQueryDto {
    return SearchQueryDtoFromJSONTyped(json, false);
}

export function SearchQueryDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchQueryDto {
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
    };
}

export function SearchQueryDtoToJSON(value?: SearchQueryDto | null): any {
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
    };
}

