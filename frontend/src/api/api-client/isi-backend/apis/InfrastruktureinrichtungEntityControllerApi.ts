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
  InfrastruktureinrichtungRequestBody,
  PagedModelEntityModelInfrastruktureinrichtung,
} from '../models';
import {
    EntityModelInfrastruktureinrichtungFromJSON,
    EntityModelInfrastruktureinrichtungToJSON,
    InfrastruktureinrichtungRequestBodyFromJSON,
    InfrastruktureinrichtungRequestBodyToJSON,
    PagedModelEntityModelInfrastruktureinrichtungFromJSON,
    PagedModelEntityModelInfrastruktureinrichtungToJSON,
} from '../models';

export interface DeleteItemResourceInfrastruktureinrichtungDeleteRequest {
    id: string;
}

export interface GetCollectionResourceInfrastruktureinrichtungGet1Request {
    page?: number;
    size?: number;
    sort?: Array<string>;
}

export interface GetItemResourceInfrastruktureinrichtungGetRequest {
    id: string;
}

export interface PatchItemResourceInfrastruktureinrichtungPatchRequest {
    id: string;
    infrastruktureinrichtungRequestBody: InfrastruktureinrichtungRequestBody;
}

export interface PostCollectionResourceInfrastruktureinrichtungPostRequest {
    infrastruktureinrichtungRequestBody: InfrastruktureinrichtungRequestBody;
}

export interface PutItemResourceInfrastruktureinrichtungPutRequest {
    id: string;
    infrastruktureinrichtungRequestBody: InfrastruktureinrichtungRequestBody;
}

/**
 * 
 */
export class InfrastruktureinrichtungEntityControllerApi extends runtime.BaseAPI {

    /**
     * delete-infrastruktureinrichtung
     */
    async deleteItemResourceInfrastruktureinrichtungDeleteRaw(requestParameters: DeleteItemResourceInfrastruktureinrichtungDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteItemResourceInfrastruktureinrichtungDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktureinrichtungs/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete-infrastruktureinrichtung
     */
    async deleteItemResourceInfrastruktureinrichtungDelete(requestParameters: DeleteItemResourceInfrastruktureinrichtungDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteItemResourceInfrastruktureinrichtungDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * get-infrastruktureinrichtung
     */
    async getCollectionResourceInfrastruktureinrichtungGet1Raw(requestParameters: GetCollectionResourceInfrastruktureinrichtungGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PagedModelEntityModelInfrastruktureinrichtung>> {
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
            path: `/infrastruktureinrichtungs`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PagedModelEntityModelInfrastruktureinrichtungFromJSON(jsonValue));
    }

    /**
     * get-infrastruktureinrichtung
     */
    async getCollectionResourceInfrastruktureinrichtungGet1(requestParameters: GetCollectionResourceInfrastruktureinrichtungGet1Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PagedModelEntityModelInfrastruktureinrichtung> {
        const response = await this.getCollectionResourceInfrastruktureinrichtungGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get-infrastruktureinrichtung
     */
    async getItemResourceInfrastruktureinrichtungGetRaw(requestParameters: GetItemResourceInfrastruktureinrichtungGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelInfrastruktureinrichtung>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getItemResourceInfrastruktureinrichtungGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktureinrichtungs/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelInfrastruktureinrichtungFromJSON(jsonValue));
    }

    /**
     * get-infrastruktureinrichtung
     */
    async getItemResourceInfrastruktureinrichtungGet(requestParameters: GetItemResourceInfrastruktureinrichtungGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelInfrastruktureinrichtung> {
        const response = await this.getItemResourceInfrastruktureinrichtungGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * patch-infrastruktureinrichtung
     */
    async patchItemResourceInfrastruktureinrichtungPatchRaw(requestParameters: PatchItemResourceInfrastruktureinrichtungPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelInfrastruktureinrichtung>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling patchItemResourceInfrastruktureinrichtungPatch.');
        }

        if (requestParameters.infrastruktureinrichtungRequestBody === null || requestParameters.infrastruktureinrichtungRequestBody === undefined) {
            throw new runtime.RequiredError('infrastruktureinrichtungRequestBody','Required parameter requestParameters.infrastruktureinrichtungRequestBody was null or undefined when calling patchItemResourceInfrastruktureinrichtungPatch.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/infrastruktureinrichtungs/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: InfrastruktureinrichtungRequestBodyToJSON(requestParameters.infrastruktureinrichtungRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelInfrastruktureinrichtungFromJSON(jsonValue));
    }

    /**
     * patch-infrastruktureinrichtung
     */
    async patchItemResourceInfrastruktureinrichtungPatch(requestParameters: PatchItemResourceInfrastruktureinrichtungPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelInfrastruktureinrichtung> {
        const response = await this.patchItemResourceInfrastruktureinrichtungPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * create-infrastruktureinrichtung
     */
    async postCollectionResourceInfrastruktureinrichtungPostRaw(requestParameters: PostCollectionResourceInfrastruktureinrichtungPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelInfrastruktureinrichtung>> {
        if (requestParameters.infrastruktureinrichtungRequestBody === null || requestParameters.infrastruktureinrichtungRequestBody === undefined) {
            throw new runtime.RequiredError('infrastruktureinrichtungRequestBody','Required parameter requestParameters.infrastruktureinrichtungRequestBody was null or undefined when calling postCollectionResourceInfrastruktureinrichtungPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/infrastruktureinrichtungs`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InfrastruktureinrichtungRequestBodyToJSON(requestParameters.infrastruktureinrichtungRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelInfrastruktureinrichtungFromJSON(jsonValue));
    }

    /**
     * create-infrastruktureinrichtung
     */
    async postCollectionResourceInfrastruktureinrichtungPost(requestParameters: PostCollectionResourceInfrastruktureinrichtungPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelInfrastruktureinrichtung> {
        const response = await this.postCollectionResourceInfrastruktureinrichtungPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update-infrastruktureinrichtung
     */
    async putItemResourceInfrastruktureinrichtungPutRaw(requestParameters: PutItemResourceInfrastruktureinrichtungPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelInfrastruktureinrichtung>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling putItemResourceInfrastruktureinrichtungPut.');
        }

        if (requestParameters.infrastruktureinrichtungRequestBody === null || requestParameters.infrastruktureinrichtungRequestBody === undefined) {
            throw new runtime.RequiredError('infrastruktureinrichtungRequestBody','Required parameter requestParameters.infrastruktureinrichtungRequestBody was null or undefined when calling putItemResourceInfrastruktureinrichtungPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/infrastruktureinrichtungs/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: InfrastruktureinrichtungRequestBodyToJSON(requestParameters.infrastruktureinrichtungRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelInfrastruktureinrichtungFromJSON(jsonValue));
    }

    /**
     * update-infrastruktureinrichtung
     */
    async putItemResourceInfrastruktureinrichtungPut(requestParameters: PutItemResourceInfrastruktureinrichtungPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelInfrastruktureinrichtung> {
        const response = await this.putItemResourceInfrastruktureinrichtungPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}