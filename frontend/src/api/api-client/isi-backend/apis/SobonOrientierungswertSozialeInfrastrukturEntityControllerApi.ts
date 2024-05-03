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
  EntityModelSobonOrientierungswertSozialeInfrastruktur,
  PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur,
  SobonOrientierungswertSozialeInfrastrukturRequestBody,
} from '../models';
import {
    EntityModelSobonOrientierungswertSozialeInfrastrukturFromJSON,
    EntityModelSobonOrientierungswertSozialeInfrastrukturToJSON,
    PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturFromJSON,
    PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturToJSON,
    SobonOrientierungswertSozialeInfrastrukturRequestBodyFromJSON,
    SobonOrientierungswertSozialeInfrastrukturRequestBodyToJSON,
} from '../models';

export interface DeleteItemResourceSobonorientierungswertsozialeinfrastrukturDeleteRequest {
    id: string;
}

export interface GetCollectionResourceSobonorientierungswertsozialeinfrastrukturGet1Request {
    page?: number;
    size?: number;
    sort?: Array<string>;
}

export interface GetItemResourceSobonorientierungswertsozialeinfrastrukturGetRequest {
    id: string;
}

export interface PatchItemResourceSobonorientierungswertsozialeinfrastrukturPatchRequest {
    id: string;
    sobonOrientierungswertSozialeInfrastrukturRequestBody: SobonOrientierungswertSozialeInfrastrukturRequestBody;
}

export interface PostCollectionResourceSobonorientierungswertsozialeinfrastrukturPostRequest {
    sobonOrientierungswertSozialeInfrastrukturRequestBody: SobonOrientierungswertSozialeInfrastrukturRequestBody;
}

export interface PutItemResourceSobonorientierungswertsozialeinfrastrukturPutRequest {
    id: string;
    sobonOrientierungswertSozialeInfrastrukturRequestBody: SobonOrientierungswertSozialeInfrastrukturRequestBody;
}

/**
 * 
 */
export class SobonOrientierungswertSozialeInfrastrukturEntityControllerApi extends runtime.BaseAPI {

    /**
     * delete-sobonorientierungswertsozialeinfrastruktur
     */
    async deleteItemResourceSobonorientierungswertsozialeinfrastrukturDeleteRaw(requestParameters: DeleteItemResourceSobonorientierungswertsozialeinfrastrukturDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteItemResourceSobonorientierungswertsozialeinfrastrukturDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/sobonOrientierungswertSozialeInfrastrukturs/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete-sobonorientierungswertsozialeinfrastruktur
     */
    async deleteItemResourceSobonorientierungswertsozialeinfrastrukturDelete(requestParameters: DeleteItemResourceSobonorientierungswertsozialeinfrastrukturDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteItemResourceSobonorientierungswertsozialeinfrastrukturDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * get-sobonorientierungswertsozialeinfrastruktur
     */
    async getCollectionResourceSobonorientierungswertsozialeinfrastrukturGet1Raw(requestParameters: GetCollectionResourceSobonorientierungswertsozialeinfrastrukturGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur>> {
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
            path: `/sobonOrientierungswertSozialeInfrastrukturs`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PagedModelEntityModelSobonOrientierungswertSozialeInfrastrukturFromJSON(jsonValue));
    }

    /**
     * get-sobonorientierungswertsozialeinfrastruktur
     */
    async getCollectionResourceSobonorientierungswertsozialeinfrastrukturGet1(requestParameters: GetCollectionResourceSobonorientierungswertsozialeinfrastrukturGet1Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur> {
        const response = await this.getCollectionResourceSobonorientierungswertsozialeinfrastrukturGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get-sobonorientierungswertsozialeinfrastruktur
     */
    async getItemResourceSobonorientierungswertsozialeinfrastrukturGetRaw(requestParameters: GetItemResourceSobonorientierungswertsozialeinfrastrukturGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelSobonOrientierungswertSozialeInfrastruktur>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getItemResourceSobonorientierungswertsozialeinfrastrukturGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/sobonOrientierungswertSozialeInfrastrukturs/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelSobonOrientierungswertSozialeInfrastrukturFromJSON(jsonValue));
    }

    /**
     * get-sobonorientierungswertsozialeinfrastruktur
     */
    async getItemResourceSobonorientierungswertsozialeinfrastrukturGet(requestParameters: GetItemResourceSobonorientierungswertsozialeinfrastrukturGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelSobonOrientierungswertSozialeInfrastruktur> {
        const response = await this.getItemResourceSobonorientierungswertsozialeinfrastrukturGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * patch-sobonorientierungswertsozialeinfrastruktur
     */
    async patchItemResourceSobonorientierungswertsozialeinfrastrukturPatchRaw(requestParameters: PatchItemResourceSobonorientierungswertsozialeinfrastrukturPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelSobonOrientierungswertSozialeInfrastruktur>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling patchItemResourceSobonorientierungswertsozialeinfrastrukturPatch.');
        }

        if (requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody === null || requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody === undefined) {
            throw new runtime.RequiredError('sobonOrientierungswertSozialeInfrastrukturRequestBody','Required parameter requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody was null or undefined when calling patchItemResourceSobonorientierungswertsozialeinfrastrukturPatch.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/sobonOrientierungswertSozialeInfrastrukturs/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: SobonOrientierungswertSozialeInfrastrukturRequestBodyToJSON(requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelSobonOrientierungswertSozialeInfrastrukturFromJSON(jsonValue));
    }

    /**
     * patch-sobonorientierungswertsozialeinfrastruktur
     */
    async patchItemResourceSobonorientierungswertsozialeinfrastrukturPatch(requestParameters: PatchItemResourceSobonorientierungswertsozialeinfrastrukturPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelSobonOrientierungswertSozialeInfrastruktur> {
        const response = await this.patchItemResourceSobonorientierungswertsozialeinfrastrukturPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * create-sobonorientierungswertsozialeinfrastruktur
     */
    async postCollectionResourceSobonorientierungswertsozialeinfrastrukturPostRaw(requestParameters: PostCollectionResourceSobonorientierungswertsozialeinfrastrukturPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelSobonOrientierungswertSozialeInfrastruktur>> {
        if (requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody === null || requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody === undefined) {
            throw new runtime.RequiredError('sobonOrientierungswertSozialeInfrastrukturRequestBody','Required parameter requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody was null or undefined when calling postCollectionResourceSobonorientierungswertsozialeinfrastrukturPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/sobonOrientierungswertSozialeInfrastrukturs`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SobonOrientierungswertSozialeInfrastrukturRequestBodyToJSON(requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelSobonOrientierungswertSozialeInfrastrukturFromJSON(jsonValue));
    }

    /**
     * create-sobonorientierungswertsozialeinfrastruktur
     */
    async postCollectionResourceSobonorientierungswertsozialeinfrastrukturPost(requestParameters: PostCollectionResourceSobonorientierungswertsozialeinfrastrukturPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelSobonOrientierungswertSozialeInfrastruktur> {
        const response = await this.postCollectionResourceSobonorientierungswertsozialeinfrastrukturPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update-sobonorientierungswertsozialeinfrastruktur
     */
    async putItemResourceSobonorientierungswertsozialeinfrastrukturPutRaw(requestParameters: PutItemResourceSobonorientierungswertsozialeinfrastrukturPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelSobonOrientierungswertSozialeInfrastruktur>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling putItemResourceSobonorientierungswertsozialeinfrastrukturPut.');
        }

        if (requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody === null || requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody === undefined) {
            throw new runtime.RequiredError('sobonOrientierungswertSozialeInfrastrukturRequestBody','Required parameter requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody was null or undefined when calling putItemResourceSobonorientierungswertsozialeinfrastrukturPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/sobonOrientierungswertSozialeInfrastrukturs/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: SobonOrientierungswertSozialeInfrastrukturRequestBodyToJSON(requestParameters.sobonOrientierungswertSozialeInfrastrukturRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelSobonOrientierungswertSozialeInfrastrukturFromJSON(jsonValue));
    }

    /**
     * update-sobonorientierungswertsozialeinfrastruktur
     */
    async putItemResourceSobonorientierungswertsozialeinfrastrukturPut(requestParameters: PutItemResourceSobonorientierungswertsozialeinfrastrukturPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelSobonOrientierungswertSozialeInfrastruktur> {
        const response = await this.putItemResourceSobonorientierungswertsozialeinfrastrukturPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
