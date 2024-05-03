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
  JsonSchema,
  RepresentationModelObject,
} from '../models';
import {
    JsonSchemaFromJSON,
    JsonSchemaToJSON,
    RepresentationModelObjectFromJSON,
    RepresentationModelObjectToJSON,
} from '../models';

/**
 * 
 */
export class ProfileControllerApi extends runtime.BaseAPI {

    /**
     */
    async descriptor111Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/abfrages`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor111(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor111Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor1110Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/idealtypischeBaurates`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor1110(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor1110Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor1111Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/infrastruktureinrichtungs`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor1111(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor1111Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor1112Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/kommentars`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor1112(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor1112Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor1113Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/sobonOrientierungswertSozialeInfrastrukturs`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor1113(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor1113Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor1114Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/staedtebaulicheOrientierungswerts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor1114(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor1114Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor1115Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/umlegungFoerderartens`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor1115(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor1115Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor1116Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/versorgungsquoteGruppenstaerkes`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor1116(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor1116Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor112Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/abfragevarianteBaugenehmigungsverfahrens`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor112(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor112Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor113Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/abfragevarianteBauleitplanverfahrens`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor113(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor113Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor114Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/abfragevarianteWeiteresVerfahrens`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor114(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor114Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor115Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/abfragevariantes`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor115(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor115Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor116Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/bauvorhabens`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor116(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor116Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor117Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/dokuments`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor117(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor117Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor118Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/foerdermixStamms`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor118(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor118Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async descriptor119Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile/globalCounters`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async descriptor119(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.descriptor119Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async listAllFormsOfMetadata1Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RepresentationModelObject>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/profile`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RepresentationModelObjectFromJSON(jsonValue));
    }

    /**
     */
    async listAllFormsOfMetadata1(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RepresentationModelObject> {
        const response = await this.listAllFormsOfMetadata1Raw(initOverrides);
        return await response.value();
    }

}
