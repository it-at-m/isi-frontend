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
  EntityModelFoerdermixStamm,
  FoerdermixStammRequestBody,
  PagedModelEntityModelFoerdermixStamm,
} from '../models';
import {
    EntityModelFoerdermixStammFromJSON,
    EntityModelFoerdermixStammToJSON,
    FoerdermixStammRequestBodyFromJSON,
    FoerdermixStammRequestBodyToJSON,
    PagedModelEntityModelFoerdermixStammFromJSON,
    PagedModelEntityModelFoerdermixStammToJSON,
} from '../models';

export interface DeleteItemResourceFoerdermixstammDeleteRequest {
    id: string;
}

export interface GetCollectionResourceFoerdermixstammGet1Request {
    page?: number;
    size?: number;
    sort?: Array<string>;
}

export interface GetItemResourceFoerdermixstammGetRequest {
    id: string;
}

export interface PatchItemResourceFoerdermixstammPatchRequest {
    id: string;
    foerdermixStammRequestBody: FoerdermixStammRequestBody;
}

export interface PostCollectionResourceFoerdermixstammPostRequest {
    foerdermixStammRequestBody: FoerdermixStammRequestBody;
}

export interface PutItemResourceFoerdermixstammPutRequest {
    id: string;
    foerdermixStammRequestBody: FoerdermixStammRequestBody;
}

/**
 * 
 */
export class FoerdermixStammEntityControllerApi extends runtime.BaseAPI {

    /**
     * delete-foerdermixstamm
     */
    async deleteItemResourceFoerdermixstammDeleteRaw(requestParameters: DeleteItemResourceFoerdermixstammDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteItemResourceFoerdermixstammDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/foerdermixStamms/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete-foerdermixstamm
     */
    async deleteItemResourceFoerdermixstammDelete(requestParameters: DeleteItemResourceFoerdermixstammDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteItemResourceFoerdermixstammDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * get-foerdermixstamm
     */
    async getCollectionResourceFoerdermixstammGet1Raw(requestParameters: GetCollectionResourceFoerdermixstammGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PagedModelEntityModelFoerdermixStamm>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        if (requestParameters.sort) {
            queryParameters['sort'] = requestParameters.sort;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/foerdermixStamms`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PagedModelEntityModelFoerdermixStammFromJSON(jsonValue));
    }

    /**
     * get-foerdermixstamm
     */
    async getCollectionResourceFoerdermixstammGet1(requestParameters: GetCollectionResourceFoerdermixstammGet1Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PagedModelEntityModelFoerdermixStamm> {
        const response = await this.getCollectionResourceFoerdermixstammGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get-foerdermixstamm
     */
    async getItemResourceFoerdermixstammGetRaw(requestParameters: GetItemResourceFoerdermixstammGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelFoerdermixStamm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getItemResourceFoerdermixstammGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/foerdermixStamms/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelFoerdermixStammFromJSON(jsonValue));
    }

    /**
     * get-foerdermixstamm
     */
    async getItemResourceFoerdermixstammGet(requestParameters: GetItemResourceFoerdermixstammGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelFoerdermixStamm> {
        const response = await this.getItemResourceFoerdermixstammGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * patch-foerdermixstamm
     */
    async patchItemResourceFoerdermixstammPatchRaw(requestParameters: PatchItemResourceFoerdermixstammPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelFoerdermixStamm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling patchItemResourceFoerdermixstammPatch.');
        }

        if (requestParameters.foerdermixStammRequestBody === null || requestParameters.foerdermixStammRequestBody === undefined) {
            throw new runtime.RequiredError('foerdermixStammRequestBody','Required parameter requestParameters.foerdermixStammRequestBody was null or undefined when calling patchItemResourceFoerdermixstammPatch.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/foerdermixStamms/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: FoerdermixStammRequestBodyToJSON(requestParameters.foerdermixStammRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelFoerdermixStammFromJSON(jsonValue));
    }

    /**
     * patch-foerdermixstamm
     */
    async patchItemResourceFoerdermixstammPatch(requestParameters: PatchItemResourceFoerdermixstammPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelFoerdermixStamm> {
        const response = await this.patchItemResourceFoerdermixstammPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * create-foerdermixstamm
     */
    async postCollectionResourceFoerdermixstammPostRaw(requestParameters: PostCollectionResourceFoerdermixstammPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelFoerdermixStamm>> {
        if (requestParameters.foerdermixStammRequestBody === null || requestParameters.foerdermixStammRequestBody === undefined) {
            throw new runtime.RequiredError('foerdermixStammRequestBody','Required parameter requestParameters.foerdermixStammRequestBody was null or undefined when calling postCollectionResourceFoerdermixstammPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/foerdermixStamms`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FoerdermixStammRequestBodyToJSON(requestParameters.foerdermixStammRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelFoerdermixStammFromJSON(jsonValue));
    }

    /**
     * create-foerdermixstamm
     */
    async postCollectionResourceFoerdermixstammPost(requestParameters: PostCollectionResourceFoerdermixstammPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelFoerdermixStamm> {
        const response = await this.postCollectionResourceFoerdermixstammPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update-foerdermixstamm
     */
    async putItemResourceFoerdermixstammPutRaw(requestParameters: PutItemResourceFoerdermixstammPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelFoerdermixStamm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling putItemResourceFoerdermixstammPut.');
        }

        if (requestParameters.foerdermixStammRequestBody === null || requestParameters.foerdermixStammRequestBody === undefined) {
            throw new runtime.RequiredError('foerdermixStammRequestBody','Required parameter requestParameters.foerdermixStammRequestBody was null or undefined when calling putItemResourceFoerdermixstammPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/foerdermixStamms/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: FoerdermixStammRequestBodyToJSON(requestParameters.foerdermixStammRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelFoerdermixStammFromJSON(jsonValue));
    }

    /**
     * update-foerdermixstamm
     */
    async putItemResourceFoerdermixstammPut(requestParameters: PutItemResourceFoerdermixstammPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelFoerdermixStamm> {
        const response = await this.putItemResourceFoerdermixstammPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}