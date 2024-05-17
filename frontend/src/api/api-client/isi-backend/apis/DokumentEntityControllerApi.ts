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
  DokumentRequestBody,
  EntityModelDokument,
  PagedModelEntityModelDokument,
} from '../models';
import {
    DokumentRequestBodyFromJSON,
    DokumentRequestBodyToJSON,
    EntityModelDokumentFromJSON,
    EntityModelDokumentToJSON,
    PagedModelEntityModelDokumentFromJSON,
    PagedModelEntityModelDokumentToJSON,
} from '../models';

export interface DeleteItemResourceDokumentDeleteRequest {
    id: string;
}

export interface GetCollectionResourceDokumentGet1Request {
    page?: number;
    size?: number;
    sort?: Array<string>;
}

export interface GetItemResourceDokumentGetRequest {
    id: string;
}

export interface PatchItemResourceDokumentPatchRequest {
    id: string;
    dokumentRequestBody: DokumentRequestBody;
}

export interface PostCollectionResourceDokumentPostRequest {
    dokumentRequestBody: DokumentRequestBody;
}

export interface PutItemResourceDokumentPutRequest {
    id: string;
    dokumentRequestBody: DokumentRequestBody;
}

/**
 * 
 */
export class DokumentEntityControllerApi extends runtime.BaseAPI {

    /**
     * delete-dokument
     */
    async deleteItemResourceDokumentDeleteRaw(requestParameters: DeleteItemResourceDokumentDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteItemResourceDokumentDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/dokuments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete-dokument
     */
    async deleteItemResourceDokumentDelete(requestParameters: DeleteItemResourceDokumentDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteItemResourceDokumentDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * get-dokument
     */
    async getCollectionResourceDokumentGet1Raw(requestParameters: GetCollectionResourceDokumentGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PagedModelEntityModelDokument>> {
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
            path: `/dokuments`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PagedModelEntityModelDokumentFromJSON(jsonValue));
    }

    /**
     * get-dokument
     */
    async getCollectionResourceDokumentGet1(requestParameters: GetCollectionResourceDokumentGet1Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PagedModelEntityModelDokument> {
        const response = await this.getCollectionResourceDokumentGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get-dokument
     */
    async getItemResourceDokumentGetRaw(requestParameters: GetItemResourceDokumentGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelDokument>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getItemResourceDokumentGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/dokuments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelDokumentFromJSON(jsonValue));
    }

    /**
     * get-dokument
     */
    async getItemResourceDokumentGet(requestParameters: GetItemResourceDokumentGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelDokument> {
        const response = await this.getItemResourceDokumentGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * patch-dokument
     */
    async patchItemResourceDokumentPatchRaw(requestParameters: PatchItemResourceDokumentPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelDokument>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling patchItemResourceDokumentPatch.');
        }

        if (requestParameters.dokumentRequestBody === null || requestParameters.dokumentRequestBody === undefined) {
            throw new runtime.RequiredError('dokumentRequestBody','Required parameter requestParameters.dokumentRequestBody was null or undefined when calling patchItemResourceDokumentPatch.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/dokuments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: DokumentRequestBodyToJSON(requestParameters.dokumentRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelDokumentFromJSON(jsonValue));
    }

    /**
     * patch-dokument
     */
    async patchItemResourceDokumentPatch(requestParameters: PatchItemResourceDokumentPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelDokument> {
        const response = await this.patchItemResourceDokumentPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * create-dokument
     */
    async postCollectionResourceDokumentPostRaw(requestParameters: PostCollectionResourceDokumentPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelDokument>> {
        if (requestParameters.dokumentRequestBody === null || requestParameters.dokumentRequestBody === undefined) {
            throw new runtime.RequiredError('dokumentRequestBody','Required parameter requestParameters.dokumentRequestBody was null or undefined when calling postCollectionResourceDokumentPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/dokuments`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DokumentRequestBodyToJSON(requestParameters.dokumentRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelDokumentFromJSON(jsonValue));
    }

    /**
     * create-dokument
     */
    async postCollectionResourceDokumentPost(requestParameters: PostCollectionResourceDokumentPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelDokument> {
        const response = await this.postCollectionResourceDokumentPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update-dokument
     */
    async putItemResourceDokumentPutRaw(requestParameters: PutItemResourceDokumentPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelDokument>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling putItemResourceDokumentPut.');
        }

        if (requestParameters.dokumentRequestBody === null || requestParameters.dokumentRequestBody === undefined) {
            throw new runtime.RequiredError('dokumentRequestBody','Required parameter requestParameters.dokumentRequestBody was null or undefined when calling putItemResourceDokumentPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/dokuments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: DokumentRequestBodyToJSON(requestParameters.dokumentRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelDokumentFromJSON(jsonValue));
    }

    /**
     * update-dokument
     */
    async putItemResourceDokumentPut(requestParameters: PutItemResourceDokumentPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelDokument> {
        const response = await this.putItemResourceDokumentPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
