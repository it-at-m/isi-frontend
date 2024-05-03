/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  EntityModelAbfragevarianteBauleitplanverfahren,
} from '../models';
import {
    EntityModelAbfragevarianteBauleitplanverfahrenFromJSON,
    EntityModelAbfragevarianteBauleitplanverfahrenToJSON,
} from '../models';

export interface ExecuteSearchAbfragevariantebauleitplanverfahrenGetRequest {
    id?: string;
}

export interface ExecuteSearchAbfragevariantebauleitplanverfahrenGet1Request {
    id?: string;
}

/**
 * 
 */
export class AbfragevarianteBauleitplanverfahrenSearchControllerApi extends runtime.BaseAPI {

    /**
     */
    async executeSearchAbfragevariantebauleitplanverfahrenGetRaw(requestParameters: ExecuteSearchAbfragevariantebauleitplanverfahrenGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfragevarianteBauleitplanverfahren>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteBauleitplanverfahrens/search/findAbfrageIdForAbfragevarianteById`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfragevarianteBauleitplanverfahrenFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchAbfragevariantebauleitplanverfahrenGet(requestParameters: ExecuteSearchAbfragevariantebauleitplanverfahrenGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfragevarianteBauleitplanverfahren> {
        const response = await this.executeSearchAbfragevariantebauleitplanverfahrenGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async executeSearchAbfragevariantebauleitplanverfahrenGet1Raw(requestParameters: ExecuteSearchAbfragevariantebauleitplanverfahrenGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfragevarianteBauleitplanverfahren>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteBauleitplanverfahrens/search/findAbfrageIdForAbfragevarianteSachbearbeitungById`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfragevarianteBauleitplanverfahrenFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchAbfragevariantebauleitplanverfahrenGet1(requestParameters: ExecuteSearchAbfragevariantebauleitplanverfahrenGet1Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfragevarianteBauleitplanverfahren> {
        const response = await this.executeSearchAbfragevariantebauleitplanverfahrenGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

}
