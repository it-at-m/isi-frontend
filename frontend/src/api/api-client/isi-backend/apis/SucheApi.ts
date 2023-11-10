/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  InformationResponseDto,
  SearchQueryAndSortingDto,
  SearchQueryDto,
  SearchResultsDto,
  SuchwortSuggestionsDto,
} from '../models';
import {
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
    SearchQueryAndSortingDtoFromJSON,
    SearchQueryAndSortingDtoToJSON,
    SearchQueryDtoFromJSON,
    SearchQueryDtoToJSON,
    SearchResultsDtoFromJSON,
    SearchResultsDtoToJSON,
    SuchwortSuggestionsDtoFromJSON,
    SuchwortSuggestionsDtoToJSON,
} from '../models';

export interface SearchForEntitiesRequest {
    searchQueryAndSortingDto: SearchQueryAndSortingDto;
}

export interface SearchForSearchwordSuggestionRequest {
    searchQueryDto: SearchQueryDto;
}

/**
 * 
 */
export class SucheApi extends runtime.BaseAPI {

    /**
     * Suche nach Entitäten für die im Request-Body gegebene Suchanfrage.
     */
    async searchForEntitiesRaw(requestParameters: SearchForEntitiesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SearchResultsDto>> {
        if (requestParameters.searchQueryAndSortingDto === null || requestParameters.searchQueryAndSortingDto === undefined) {
            throw new runtime.RequiredError('searchQueryAndSortingDto','Required parameter requestParameters.searchQueryAndSortingDto was null or undefined when calling searchForEntities.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/search/entities`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SearchQueryAndSortingDtoToJSON(requestParameters.searchQueryAndSortingDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SearchResultsDtoFromJSON(jsonValue));
    }

    /**
     * Suche nach Entitäten für die im Request-Body gegebene Suchanfrage.
     */
    async searchForEntities(requestParameters: SearchForEntitiesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SearchResultsDto> {
        const response = await this.searchForEntitiesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Suche nach Suchwortvorschläge für das im Request-Body gegebene Suchanfrage.
     */
    async searchForSearchwordSuggestionRaw(requestParameters: SearchForSearchwordSuggestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SuchwortSuggestionsDto>> {
        if (requestParameters.searchQueryDto === null || requestParameters.searchQueryDto === undefined) {
            throw new runtime.RequiredError('searchQueryDto','Required parameter requestParameters.searchQueryDto was null or undefined when calling searchForSearchwordSuggestion.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/search/searchword-suggestion`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SearchQueryDtoToJSON(requestParameters.searchQueryDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SuchwortSuggestionsDtoFromJSON(jsonValue));
    }

    /**
     * Suche nach Suchwortvorschläge für das im Request-Body gegebene Suchanfrage.
     */
    async searchForSearchwordSuggestion(requestParameters: SearchForSearchwordSuggestionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SuchwortSuggestionsDto> {
        const response = await this.searchForSearchwordSuggestionRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
