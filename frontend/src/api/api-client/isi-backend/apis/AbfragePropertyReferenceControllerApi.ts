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
  CollectionModelObject,
  EntityModelBauvorhaben,
} from '../models';
import {
    CollectionModelObjectFromJSON,
    CollectionModelObjectToJSON,
    EntityModelBauvorhabenFromJSON,
    EntityModelBauvorhabenToJSON,
} from '../models';

export interface CreatePropertyReferenceAbfragePatchRequest {
    id: string;
    collectionModelObject: CollectionModelObject;
}

export interface CreatePropertyReferenceAbfragePutRequest {
    id: string;
    collectionModelObject: CollectionModelObject;
}

export interface DeletePropertyReferenceAbfrageDeleteRequest {
    id: string;
}

export interface DeletePropertyReferenceIdAbfrageDeleteRequest {
    id: string;
    propertyId: string;
}

export interface FollowPropertyReferenceAbfrageGetRequest {
    id: string;
    propertyId: string;
}

export interface FollowPropertyReferenceAbfrageGet1Request {
    id: string;
}

/**
 * 
 */
export class AbfragePropertyReferenceControllerApi extends runtime.BaseAPI {

    /**
     * patch-bauvorhaben-by-abfrage-Id
     */
    async createPropertyReferenceAbfragePatchRaw(requestParameters: CreatePropertyReferenceAbfragePatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelBauvorhaben>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling createPropertyReferenceAbfragePatch.');
        }

        if (requestParameters.collectionModelObject === null || requestParameters.collectionModelObject === undefined) {
            throw new runtime.RequiredError('collectionModelObject','Required parameter requestParameters.collectionModelObject was null or undefined when calling createPropertyReferenceAbfragePatch.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/abfrages/{id}/bauvorhaben`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: CollectionModelObjectToJSON(requestParameters.collectionModelObject),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelBauvorhabenFromJSON(jsonValue));
    }

    /**
     * patch-bauvorhaben-by-abfrage-Id
     */
    async createPropertyReferenceAbfragePatch(requestParameters: CreatePropertyReferenceAbfragePatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelBauvorhaben> {
        const response = await this.createPropertyReferenceAbfragePatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update-bauvorhaben-by-abfrage-Id
     */
    async createPropertyReferenceAbfragePutRaw(requestParameters: CreatePropertyReferenceAbfragePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelBauvorhaben>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling createPropertyReferenceAbfragePut.');
        }

        if (requestParameters.collectionModelObject === null || requestParameters.collectionModelObject === undefined) {
            throw new runtime.RequiredError('collectionModelObject','Required parameter requestParameters.collectionModelObject was null or undefined when calling createPropertyReferenceAbfragePut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/abfrages/{id}/bauvorhaben`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CollectionModelObjectToJSON(requestParameters.collectionModelObject),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelBauvorhabenFromJSON(jsonValue));
    }

    /**
     * update-bauvorhaben-by-abfrage-Id
     */
    async createPropertyReferenceAbfragePut(requestParameters: CreatePropertyReferenceAbfragePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelBauvorhaben> {
        const response = await this.createPropertyReferenceAbfragePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * delete-bauvorhaben-by-abfrage-Id
     */
    async deletePropertyReferenceAbfrageDeleteRaw(requestParameters: DeletePropertyReferenceAbfrageDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deletePropertyReferenceAbfrageDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrages/{id}/bauvorhaben`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete-bauvorhaben-by-abfrage-Id
     */
    async deletePropertyReferenceAbfrageDelete(requestParameters: DeletePropertyReferenceAbfrageDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deletePropertyReferenceAbfrageDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * delete-bauvorhaben-by-abfrage-Id
     */
    async deletePropertyReferenceIdAbfrageDeleteRaw(requestParameters: DeletePropertyReferenceIdAbfrageDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deletePropertyReferenceIdAbfrageDelete.');
        }

        if (requestParameters.propertyId === null || requestParameters.propertyId === undefined) {
            throw new runtime.RequiredError('propertyId','Required parameter requestParameters.propertyId was null or undefined when calling deletePropertyReferenceIdAbfrageDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrages/{id}/bauvorhaben/{propertyId}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"propertyId"}}`, encodeURIComponent(String(requestParameters.propertyId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete-bauvorhaben-by-abfrage-Id
     */
    async deletePropertyReferenceIdAbfrageDelete(requestParameters: DeletePropertyReferenceIdAbfrageDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deletePropertyReferenceIdAbfrageDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * get-bauvorhaben-by-abfrage-Id
     */
    async followPropertyReferenceAbfrageGetRaw(requestParameters: FollowPropertyReferenceAbfrageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelBauvorhaben>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling followPropertyReferenceAbfrageGet.');
        }

        if (requestParameters.propertyId === null || requestParameters.propertyId === undefined) {
            throw new runtime.RequiredError('propertyId','Required parameter requestParameters.propertyId was null or undefined when calling followPropertyReferenceAbfrageGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrages/{id}/bauvorhaben/{propertyId}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"propertyId"}}`, encodeURIComponent(String(requestParameters.propertyId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelBauvorhabenFromJSON(jsonValue));
    }

    /**
     * get-bauvorhaben-by-abfrage-Id
     */
    async followPropertyReferenceAbfrageGet(requestParameters: FollowPropertyReferenceAbfrageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelBauvorhaben> {
        const response = await this.followPropertyReferenceAbfrageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get-bauvorhaben-by-abfrage-Id
     */
    async followPropertyReferenceAbfrageGet1Raw(requestParameters: FollowPropertyReferenceAbfrageGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelBauvorhaben>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling followPropertyReferenceAbfrageGet1.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrages/{id}/bauvorhaben`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelBauvorhabenFromJSON(jsonValue));
    }

    /**
     * get-bauvorhaben-by-abfrage-Id
     */
    async followPropertyReferenceAbfrageGet1(requestParameters: FollowPropertyReferenceAbfrageGet1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelBauvorhaben> {
        const response = await this.followPropertyReferenceAbfrageGet1Raw(requestParameters, initOverrides);
        return await response.value();
    }

}
