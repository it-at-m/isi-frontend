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
  EntityModelInfrastruktureinrichtung,
} from '../models';
import {
    EntityModelInfrastruktureinrichtungFromJSON,
    EntityModelInfrastruktureinrichtungToJSON,
} from '../models';

export interface ExecuteSearchInfrastruktureinrichtungGetRequest {
    id?: string;
}

/**
 * 
 */
export class InfrastruktureinrichtungSearchControllerApi extends runtime.BaseAPI {

    /**
     */
    async executeSearchInfrastruktureinrichtungGetRaw(requestParameters: ExecuteSearchInfrastruktureinrichtungGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelInfrastruktureinrichtung>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktureinrichtungs/search/findAllByBauvorhabenId`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelInfrastruktureinrichtungFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchInfrastruktureinrichtungGet(requestParameters: ExecuteSearchInfrastruktureinrichtungGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelInfrastruktureinrichtung> {
        const response = await this.executeSearchInfrastruktureinrichtungGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
