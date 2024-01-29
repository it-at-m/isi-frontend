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
  AbfragevarianteBaugenehmigungsverfahrenRequestBody,
  EntityModelAbfragevarianteBaugenehmigungsverfahren,
  PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahren,
} from '../models';
import {
    AbfragevarianteBaugenehmigungsverfahrenRequestBodyFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenRequestBodyToJSON,
    EntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSON,
    EntityModelAbfragevarianteBaugenehmigungsverfahrenToJSON,
    PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSON,
    PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenToJSON,
} from '../models';

export interface DeleteItemResourceAbfragevariantebaugenehmigungsverfahrenDeleteRequest {
    id: string;
}

export interface GetCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet1Request {
    page?: number;
    size?: number;
    sort?: Array<string>;
}

export interface GetItemResourceAbfragevariantebaugenehmigungsverfahrenGetRequest {
    id: string;
}

export interface PatchItemResourceAbfragevariantebaugenehmigungsverfahrenPatchRequest {
    id: string;
    abfragevarianteBaugenehmigungsverfahrenRequestBody: AbfragevarianteBaugenehmigungsverfahrenRequestBody;
}

export interface PostCollectionResourceAbfragevariantebaugenehmigungsverfahrenPostRequest {
    abfragevarianteBaugenehmigungsverfahrenRequestBody: AbfragevarianteBaugenehmigungsverfahrenRequestBody;
}

export interface PutItemResourceAbfragevariantebaugenehmigungsverfahrenPutRequest {
    id: string;
    abfragevarianteBaugenehmigungsverfahrenRequestBody: AbfragevarianteBaugenehmigungsverfahrenRequestBody;
}

/**
 * 
 */
export class AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi extends runtime.BaseAPI {

    /**
     * delete-abfragevariantebaugenehmigungsverfahren
     */
    async deleteItemResourceAbfragevariantebaugenehmigungsverfahrenDeleteRaw(requestParameters: DeleteItemResourceAbfragevariantebaugenehmigungsverfahrenDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteItemResourceAbfragevariantebaugenehmigungsverfahrenDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete-abfragevariantebaugenehmigungsverfahren
     */
    async deleteItemResourceAbfragevariantebaugenehmigungsverfahrenDelete(requestParameters: DeleteItemResourceAbfragevariantebaugenehmigungsverfahrenDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteItemResourceAbfragevariantebaugenehmigungsverfahrenDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * get-abfragevariantebaugenehmigungsverfahren
     */
    async getCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet1Raw(requestParameters: GetCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahren>> {
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
            path: `/abfragevarianteBaugenehmigungsverfahrens`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSON(jsonValue));
    }

    /**
     * get-abfragevariantebaugenehmigungsverfahren
     */
    async getCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet1(requestParameters: GetCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet1Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahren> {
        const response = await this.getCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get-abfragevariantebaugenehmigungsverfahren
     */
    async getItemResourceAbfragevariantebaugenehmigungsverfahrenGetRaw(requestParameters: GetItemResourceAbfragevariantebaugenehmigungsverfahrenGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfragevarianteBaugenehmigungsverfahren>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getItemResourceAbfragevariantebaugenehmigungsverfahrenGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSON(jsonValue));
    }

    /**
     * get-abfragevariantebaugenehmigungsverfahren
     */
    async getItemResourceAbfragevariantebaugenehmigungsverfahrenGet(requestParameters: GetItemResourceAbfragevariantebaugenehmigungsverfahrenGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfragevarianteBaugenehmigungsverfahren> {
        const response = await this.getItemResourceAbfragevariantebaugenehmigungsverfahrenGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * patch-abfragevariantebaugenehmigungsverfahren
     */
    async patchItemResourceAbfragevariantebaugenehmigungsverfahrenPatchRaw(requestParameters: PatchItemResourceAbfragevariantebaugenehmigungsverfahrenPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfragevarianteBaugenehmigungsverfahren>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling patchItemResourceAbfragevariantebaugenehmigungsverfahrenPatch.');
        }

        if (requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody === null || requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody === undefined) {
            throw new runtime.RequiredError('abfragevarianteBaugenehmigungsverfahrenRequestBody','Required parameter requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody was null or undefined when calling patchItemResourceAbfragevariantebaugenehmigungsverfahrenPatch.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: AbfragevarianteBaugenehmigungsverfahrenRequestBodyToJSON(requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSON(jsonValue));
    }

    /**
     * patch-abfragevariantebaugenehmigungsverfahren
     */
    async patchItemResourceAbfragevariantebaugenehmigungsverfahrenPatch(requestParameters: PatchItemResourceAbfragevariantebaugenehmigungsverfahrenPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfragevarianteBaugenehmigungsverfahren> {
        const response = await this.patchItemResourceAbfragevariantebaugenehmigungsverfahrenPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * create-abfragevariantebaugenehmigungsverfahren
     */
    async postCollectionResourceAbfragevariantebaugenehmigungsverfahrenPostRaw(requestParameters: PostCollectionResourceAbfragevariantebaugenehmigungsverfahrenPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfragevarianteBaugenehmigungsverfahren>> {
        if (requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody === null || requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody === undefined) {
            throw new runtime.RequiredError('abfragevarianteBaugenehmigungsverfahrenRequestBody','Required parameter requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody was null or undefined when calling postCollectionResourceAbfragevariantebaugenehmigungsverfahrenPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AbfragevarianteBaugenehmigungsverfahrenRequestBodyToJSON(requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSON(jsonValue));
    }

    /**
     * create-abfragevariantebaugenehmigungsverfahren
     */
    async postCollectionResourceAbfragevariantebaugenehmigungsverfahrenPost(requestParameters: PostCollectionResourceAbfragevariantebaugenehmigungsverfahrenPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfragevarianteBaugenehmigungsverfahren> {
        const response = await this.postCollectionResourceAbfragevariantebaugenehmigungsverfahrenPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update-abfragevariantebaugenehmigungsverfahren
     */
    async putItemResourceAbfragevariantebaugenehmigungsverfahrenPutRaw(requestParameters: PutItemResourceAbfragevariantebaugenehmigungsverfahrenPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelAbfragevarianteBaugenehmigungsverfahren>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling putItemResourceAbfragevariantebaugenehmigungsverfahrenPut.');
        }

        if (requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody === null || requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody === undefined) {
            throw new runtime.RequiredError('abfragevarianteBaugenehmigungsverfahrenRequestBody','Required parameter requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody was null or undefined when calling putItemResourceAbfragevariantebaugenehmigungsverfahrenPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AbfragevarianteBaugenehmigungsverfahrenRequestBodyToJSON(requestParameters.abfragevarianteBaugenehmigungsverfahrenRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAbfragevarianteBaugenehmigungsverfahrenFromJSON(jsonValue));
    }

    /**
     * update-abfragevariantebaugenehmigungsverfahren
     */
    async putItemResourceAbfragevariantebaugenehmigungsverfahrenPut(requestParameters: PutItemResourceAbfragevariantebaugenehmigungsverfahrenPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelAbfragevarianteBaugenehmigungsverfahren> {
        const response = await this.putItemResourceAbfragevariantebaugenehmigungsverfahrenPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
