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


import * as runtime from '../runtime';
import type {
  EntityModelGlobalCounter,
} from '../models';
import {
    EntityModelGlobalCounterFromJSON,
    EntityModelGlobalCounterToJSON,
} from '../models';

export interface ExecuteSearchGlobalcounterGetRequest {
    counterType?: ExecuteSearchGlobalcounterGetCounterTypeEnum;
}

/**
 * 
 */
export class GlobalCounterSearchControllerApi extends runtime.BaseAPI {

    /**
     */
    async executeSearchGlobalcounterGetRaw(requestParameters: ExecuteSearchGlobalcounterGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelGlobalCounter>> {
        const queryParameters: any = {};

        if (requestParameters.counterType !== undefined) {
            queryParameters['counterType'] = requestParameters.counterType;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/globalCounters/search/findByCounterType`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelGlobalCounterFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchGlobalcounterGet(requestParameters: ExecuteSearchGlobalcounterGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelGlobalCounter> {
        const response = await this.executeSearchGlobalcounterGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const ExecuteSearchGlobalcounterGetCounterTypeEnum = {
    NummerBauvorhaben: 'NUMMER_BAUVORHABEN'
} as const;
export type ExecuteSearchGlobalcounterGetCounterTypeEnum = typeof ExecuteSearchGlobalcounterGetCounterTypeEnum[keyof typeof ExecuteSearchGlobalcounterGetCounterTypeEnum];