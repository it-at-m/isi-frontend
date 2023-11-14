/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InformationResponseDto,
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
    UpdateInfrastruktureinrichtungRequest,
    UpdateInfrastruktureinrichtungRequestFromJSON,
    UpdateInfrastruktureinrichtungRequestToJSON,
} from '../models';

export interface CreateInfrastruktureinrichtungRequest {
    updateInfrastruktureinrichtungRequest: UpdateInfrastruktureinrichtungRequest;
}

export interface DeleteInfrastruktureinrichtungByIdRequest {
    id: string;
}

export interface GetInfrastruktureinrichtungByIdRequest {
    id: string;
}

export interface UpdateInfrastruktureinrichtungOperationRequest {
    updateInfrastruktureinrichtungRequest: UpdateInfrastruktureinrichtungRequest;
}

/**
 * 
 */
export class InfrastruktureinrichtungApi extends runtime.BaseAPI {

    /**
     * Anlegen einer neuen Infrastruktureinrichtung
     */
    async createInfrastruktureinrichtungRaw(requestParameters: CreateInfrastruktureinrichtungRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UpdateInfrastruktureinrichtungRequest>> {
        if (requestParameters.updateInfrastruktureinrichtungRequest === null || requestParameters.updateInfrastruktureinrichtungRequest === undefined) {
            throw new runtime.RequiredError('updateInfrastruktureinrichtungRequest','Required parameter requestParameters.updateInfrastruktureinrichtungRequest was null or undefined when calling createInfrastruktureinrichtung.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/infrastruktureinrichtung`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateInfrastruktureinrichtungRequestToJSON(requestParameters.updateInfrastruktureinrichtungRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateInfrastruktureinrichtungRequestFromJSON(jsonValue));
    }

    /**
     * Anlegen einer neuen Infrastruktureinrichtung
     */
    async createInfrastruktureinrichtung(requestParameters: CreateInfrastruktureinrichtungRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UpdateInfrastruktureinrichtungRequest> {
        const response = await this.createInfrastruktureinrichtungRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Löschen einer Infrastruktureinrichtung
     */
    async deleteInfrastruktureinrichtungByIdRaw(requestParameters: DeleteInfrastruktureinrichtungByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteInfrastruktureinrichtungById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktureinrichtung/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Löschen einer Infrastruktureinrichtung
     */
    async deleteInfrastruktureinrichtungById(requestParameters: DeleteInfrastruktureinrichtungByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.deleteInfrastruktureinrichtungByIdRaw(requestParameters, initOverrides);
    }

    /**
     * Lesen einer Infrastruktureinrichtung
     */
    async getInfrastruktureinrichtungByIdRaw(requestParameters: GetInfrastruktureinrichtungByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UpdateInfrastruktureinrichtungRequest>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getInfrastruktureinrichtungById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktureinrichtung/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateInfrastruktureinrichtungRequestFromJSON(jsonValue));
    }

    /**
     * Lesen einer Infrastruktureinrichtung
     */
    async getInfrastruktureinrichtungById(requestParameters: GetInfrastruktureinrichtungByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UpdateInfrastruktureinrichtungRequest> {
        const response = await this.getInfrastruktureinrichtungByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Aktualisierung einer Infrastruktureinrichtung
     */
    async updateInfrastruktureinrichtungRaw(requestParameters: UpdateInfrastruktureinrichtungOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<UpdateInfrastruktureinrichtungRequest>> {
        if (requestParameters.updateInfrastruktureinrichtungRequest === null || requestParameters.updateInfrastruktureinrichtungRequest === undefined) {
            throw new runtime.RequiredError('updateInfrastruktureinrichtungRequest','Required parameter requestParameters.updateInfrastruktureinrichtungRequest was null or undefined when calling updateInfrastruktureinrichtung.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/infrastruktureinrichtung`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateInfrastruktureinrichtungRequestToJSON(requestParameters.updateInfrastruktureinrichtungRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateInfrastruktureinrichtungRequestFromJSON(jsonValue));
    }

    /**
     * Aktualisierung einer Infrastruktureinrichtung
     */
    async updateInfrastruktureinrichtung(requestParameters: UpdateInfrastruktureinrichtungOperationRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<UpdateInfrastruktureinrichtungRequest> {
        const response = await this.updateInfrastruktureinrichtungRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
