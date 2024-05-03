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
  CollectionModelDokument,
  CollectionModelObject,
} from '../models';
import {
    CollectionModelDokumentFromJSON,
    CollectionModelDokumentToJSON,
    CollectionModelObjectFromJSON,
    CollectionModelObjectToJSON,
} from '../models';

export interface CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequest {
    id: string;
    collectionModelObject: CollectionModelObject;
}

export interface CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRequest {
    id: string;
    collectionModelObject: CollectionModelObject;
}

export interface DeletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDeleteRequest {
    id: string;
}

export interface DeletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRequest {
    id: string;
    propertyId: string;
}

export interface FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGetRequest {
    id: string;
    propertyId: string;
}

export interface FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1Request {
    id: string;
}

/**
 * 
 */
export class AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi extends runtime.BaseAPI {

    /**
     * patch-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRaw(requestParameters: CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CollectionModelDokument>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch.');
        }

        if (requestParameters.collectionModelObject === null || requestParameters.collectionModelObject === undefined) {
            throw new runtime.RequiredError('collectionModelObject','Required parameter requestParameters.collectionModelObject was null or undefined when calling createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: CollectionModelObjectToJSON(requestParameters.collectionModelObject),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CollectionModelDokumentFromJSON(jsonValue));
    }

    /**
     * patch-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch(requestParameters: CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CollectionModelDokument> {
        const response = await this.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRaw(requestParameters: CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CollectionModelDokument>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut.');
        }

        if (requestParameters.collectionModelObject === null || requestParameters.collectionModelObject === undefined) {
            throw new runtime.RequiredError('collectionModelObject','Required parameter requestParameters.collectionModelObject was null or undefined when calling createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CollectionModelObjectToJSON(requestParameters.collectionModelObject),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CollectionModelDokumentFromJSON(jsonValue));
    }

    /**
     * update-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut(requestParameters: CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CollectionModelDokument> {
        const response = await this.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * delete-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDeleteRaw(requestParameters: DeletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete(requestParameters: DeletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * delete-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRaw(requestParameters: DeletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete.');
        }

        if (requestParameters.propertyId === null || requestParameters.propertyId === undefined) {
            throw new runtime.RequiredError('propertyId','Required parameter requestParameters.propertyId was null or undefined when calling deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente/{propertyId}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"propertyId"}}`, encodeURIComponent(String(requestParameters.propertyId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete(requestParameters: DeletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * get-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGetRaw(requestParameters: FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CollectionModelDokument>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet.');
        }

        if (requestParameters.propertyId === null || requestParameters.propertyId === undefined) {
            throw new runtime.RequiredError('propertyId','Required parameter requestParameters.propertyId was null or undefined when calling followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente/{propertyId}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"propertyId"}}`, encodeURIComponent(String(requestParameters.propertyId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CollectionModelDokumentFromJSON(jsonValue));
    }

    /**
     * get-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet(requestParameters: FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CollectionModelDokument> {
        const response = await this.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1Raw(requestParameters: FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CollectionModelDokument>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CollectionModelDokumentFromJSON(jsonValue));
    }

    /**
     * get-dokument-by-abfragevariantebaugenehmigungsverfahren-Id
     */
    async followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1(requestParameters: FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CollectionModelDokument> {
        const response = await this.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

}
