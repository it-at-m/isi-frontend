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
  EntityModelAbfragevarianteWeiteresVerfahren,
} from '../models';
import {
    EntityModelAbfragevarianteWeiteresVerfahrenFromJSON,
    EntityModelAbfragevarianteWeiteresVerfahrenToJSON,
} from '../models';

export interface ExecuteSearchAbfragevarianteweiteresverfahrenGetRequest {
    id?: string;
}

export interface ExecuteSearchAbfragevarianteweiteresverfahrenGet1Request {
    id?: string;
}

/**
 * 
 */
export class AbfragevarianteWeiteresVerfahrenSearchControllerApi extends runtime.BaseAPI {

    /**
     */
    async executeSearchAbfragevarianteweiteresverfahrenGetRaw(requestParameters: ExecuteSearchAbfragevarianteweiteresverfahrenGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfragevarianteWeiteresVerfahren>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteWeiteresVerfahrens/search/findAbfrageIdForAbfragevarianteById`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfragevarianteWeiteresVerfahrenFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchAbfragevarianteweiteresverfahrenGet(requestParameters: ExecuteSearchAbfragevarianteweiteresverfahrenGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfragevarianteWeiteresVerfahren> {
        const response = await this.executeSearchAbfragevarianteweiteresverfahrenGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async executeSearchAbfragevarianteweiteresverfahrenGet1Raw(requestParameters: ExecuteSearchAbfragevarianteweiteresverfahrenGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfragevarianteWeiteresVerfahren>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteWeiteresVerfahrens/search/findAbfrageIdForAbfragevarianteSachbearbeitungById`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfragevarianteWeiteresVerfahrenFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchAbfragevarianteweiteresverfahrenGet1(requestParameters: ExecuteSearchAbfragevarianteweiteresverfahrenGet1Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfragevarianteWeiteresVerfahren> {
        const response = await this.executeSearchAbfragevarianteweiteresverfahrenGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

}
