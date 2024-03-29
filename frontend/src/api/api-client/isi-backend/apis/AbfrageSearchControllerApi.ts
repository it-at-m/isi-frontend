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
  EntityModelAbfrage,
} from '../models';
import {
    EntityModelAbfrageFromJSON,
    EntityModelAbfrageToJSON,
} from '../models';

export interface ExecuteSearchAbfrageGetRequest {
    id?: string;
}

export interface ExecuteSearchAbfrageGet1Request {
    id?: string;
}

export interface ExecuteSearchAbfrageGet2Request {
    nameAbfrage?: string;
}

/**
 * 
 */
export class AbfrageSearchControllerApi extends runtime.BaseAPI {

    /**
     */
    async executeSearchAbfrageGetRaw(requestParameters: ExecuteSearchAbfrageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfrage>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrages/search/findAllByBauvorhabenId`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfrageFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchAbfrageGet(requestParameters: ExecuteSearchAbfrageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfrage> {
        const response = await this.executeSearchAbfrageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async executeSearchAbfrageGet1Raw(requestParameters: ExecuteSearchAbfrageGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfrage>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrages/search/findAllByBauvorhabenIdOrderByCreatedDateTimeDesc`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfrageFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchAbfrageGet1(requestParameters: ExecuteSearchAbfrageGet1Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfrage> {
        const response = await this.executeSearchAbfrageGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async executeSearchAbfrageGet2Raw(requestParameters: ExecuteSearchAbfrageGet2Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfrage>> {
        const queryParameters: any = {};

        if (requestParameters.nameAbfrage !== undefined) {
            queryParameters['nameAbfrage'] = requestParameters.nameAbfrage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrages/search/findByNameIgnoreCase`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfrageFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchAbfrageGet2(requestParameters: ExecuteSearchAbfrageGet2Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfrage> {
        const response = await this.executeSearchAbfrageGet2Raw(requestParameters, initOverrides);
        return await response.value();
    }

}
