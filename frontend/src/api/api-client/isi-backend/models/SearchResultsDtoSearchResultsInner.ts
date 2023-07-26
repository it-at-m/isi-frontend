/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    AbfrageListElementDto,
    AbfrageListElementDtoFromJSON,
    AbfrageListElementDtoFromJSONTyped,
    AbfrageListElementDtoToJSON,
} from './AbfrageListElementDto';
import {
    BauvorhabenListElementDto,
    BauvorhabenListElementDtoFromJSON,
    BauvorhabenListElementDtoFromJSONTyped,
    BauvorhabenListElementDtoToJSON,
} from './BauvorhabenListElementDto';
import {
    InfrastruktureinrichtungListElementDto,
    InfrastruktureinrichtungListElementDtoFromJSON,
    InfrastruktureinrichtungListElementDtoFromJSONTyped,
    InfrastruktureinrichtungListElementDtoToJSON,
} from './InfrastruktureinrichtungListElementDto';

/**
 * @type SearchResultsDtoSearchResultsInner
 * 
 * @export
 */
export type SearchResultsDtoSearchResultsInner = AbfrageListElementDto | BauvorhabenListElementDto | InfrastruktureinrichtungListElementDto;

export function SearchResultsDtoSearchResultsInnerFromJSON(json: any): SearchResultsDtoSearchResultsInner {
    return SearchResultsDtoSearchResultsInnerFromJSONTyped(json, false);
}

export function SearchResultsDtoSearchResultsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchResultsDtoSearchResultsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...AbfrageListElementDtoFromJSONTyped(json, true), ...BauvorhabenListElementDtoFromJSONTyped(json, true), ...InfrastruktureinrichtungListElementDtoFromJSONTyped(json, true) };
}

export function SearchResultsDtoSearchResultsInnerToJSON(value?: SearchResultsDtoSearchResultsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return { ...AbfrageListElementDtoToJSON(value), ...BauvorhabenListElementDtoToJSON(value), ...InfrastruktureinrichtungListElementDtoToJSON(value) };
}

