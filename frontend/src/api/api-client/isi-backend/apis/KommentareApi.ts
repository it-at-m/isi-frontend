/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  InformationResponseDto,
  KommentarDto,
} from '../models';
import {
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
    KommentarDtoFromJSON,
    KommentarDtoToJSON,
} from '../models';

export interface CreateKommentarRequest {
    kommentarDto: KommentarDto;
}

export interface DeleteKommentarRequest {
    id: string;
}

export interface GetKommentareForBauvorhabenRequest {
    bauvorhabenId: string;
}

export interface GetKommentareForInfrastruktureinrichtungRequest {
    infrastruktureinrichtungId: string;
}

export interface UpdateKommentarRequest {
    kommentarDto: KommentarDto;
}

/**
 * 
 */
export class KommentareApi extends runtime.BaseAPI {

    /**
     * Anlegen eines neuen Kommentars
     */
    async createKommentarRaw(requestParameters: CreateKommentarRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<KommentarDto>> {
        if (requestParameters.kommentarDto === null || requestParameters.kommentarDto === undefined) {
            throw new runtime.RequiredError('kommentarDto','Required parameter requestParameters.kommentarDto was null or undefined when calling createKommentar.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/kommentar`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: KommentarDtoToJSON(requestParameters.kommentarDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => KommentarDtoFromJSON(jsonValue));
    }

    /**
     * Anlegen eines neuen Kommentars
     */
    async createKommentar(requestParameters: CreateKommentarRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<KommentarDto> {
        const response = await this.createKommentarRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Löschen eines Kommentars
     */
    async deleteKommentarRaw(requestParameters: DeleteKommentarRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteKommentar.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/kommentar/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Löschen eines Kommentars
     */
    async deleteKommentar(requestParameters: DeleteKommentarRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteKommentarRaw(requestParameters, initOverrides);
    }

    /**
     * Holen der Kommentare eines Bauvorhabens
     */
    async getKommentareForBauvorhabenRaw(requestParameters: GetKommentareForBauvorhabenRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<KommentarDto>>> {
        if (requestParameters.bauvorhabenId === null || requestParameters.bauvorhabenId === undefined) {
            throw new runtime.RequiredError('bauvorhabenId','Required parameter requestParameters.bauvorhabenId was null or undefined when calling getKommentareForBauvorhaben.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/kommentar/all/bauvorhaben/{bauvorhabenId}`.replace(`{${"bauvorhabenId"}}`, encodeURIComponent(String(requestParameters.bauvorhabenId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(KommentarDtoFromJSON));
    }

    /**
     * Holen der Kommentare eines Bauvorhabens
     */
    async getKommentareForBauvorhaben(requestParameters: GetKommentareForBauvorhabenRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<KommentarDto>> {
        const response = await this.getKommentareForBauvorhabenRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Holen der Kommentare einer Infrastruktureinrichtung
     */
    async getKommentareForInfrastruktureinrichtungRaw(requestParameters: GetKommentareForInfrastruktureinrichtungRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<KommentarDto>>> {
        if (requestParameters.infrastruktureinrichtungId === null || requestParameters.infrastruktureinrichtungId === undefined) {
            throw new runtime.RequiredError('infrastruktureinrichtungId','Required parameter requestParameters.infrastruktureinrichtungId was null or undefined when calling getKommentareForInfrastruktureinrichtung.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/kommentar/all/infrastruktureinrichtung/{infrastruktureinrichtungId}`.replace(`{${"infrastruktureinrichtungId"}}`, encodeURIComponent(String(requestParameters.infrastruktureinrichtungId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(KommentarDtoFromJSON));
    }

    /**
     * Holen der Kommentare einer Infrastruktureinrichtung
     */
    async getKommentareForInfrastruktureinrichtung(requestParameters: GetKommentareForInfrastruktureinrichtungRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<KommentarDto>> {
        const response = await this.getKommentareForInfrastruktureinrichtungRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Aktualisierung eines Kommentars
     */
    async updateKommentarRaw(requestParameters: UpdateKommentarRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<KommentarDto>> {
        if (requestParameters.kommentarDto === null || requestParameters.kommentarDto === undefined) {
            throw new runtime.RequiredError('kommentarDto','Required parameter requestParameters.kommentarDto was null or undefined when calling updateKommentar.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/kommentar`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: KommentarDtoToJSON(requestParameters.kommentarDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => KommentarDtoFromJSON(jsonValue));
    }

    /**
     * Aktualisierung eines Kommentars
     */
    async updateKommentar(requestParameters: UpdateKommentarRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<KommentarDto> {
        const response = await this.updateKommentarRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
