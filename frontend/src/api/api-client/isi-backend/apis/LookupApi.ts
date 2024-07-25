/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.3.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  LookupListsDto,
} from '../models';
import {
    LookupListsDtoFromJSON,
    LookupListsDtoToJSON,
} from '../models';

/**
 * 
 */
export class LookupApi extends runtime.BaseAPI {

    /**
     * Gibt die Lookuplisten zurück.
     */
    async getLookupListsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LookupListsDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/lookup-lists`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LookupListsDtoFromJSON(jsonValue));
    }

    /**
     * Gibt die Lookuplisten zurück.
     */
    async getLookupLists(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LookupListsDto> {
        const response = await this.getLookupListsRaw(initOverrides);
        return await response.value();
    }

}
