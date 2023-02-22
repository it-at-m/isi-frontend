/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    HausFuerKinderDto,
    HausFuerKinderDtoFromJSON,
    HausFuerKinderDtoToJSON,
    InformationResponseDto,
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
} from '../models';

export interface CreateHausFuerKinderRequest {
    hausFuerKinderDto: HausFuerKinderDto;
}

export interface DeleteHausFuerKinderByIdRequest {
    id: string;
}

export interface GetHausFuerKinderByIdRequest {
    id: string;
}

export interface UpdateHausFuerKinderRequest {
    hausFuerKinderDto: HausFuerKinderDto;
}

/**
 * 
 */
export class HausFuerKinderApi extends runtime.BaseAPI {

    /**
     * Anlegen eines neuen Hauses für Kinder
     */
    async createHausFuerKinderRaw(requestParameters: CreateHausFuerKinderRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HausFuerKinderDto>> {
        if (requestParameters.hausFuerKinderDto === null || requestParameters.hausFuerKinderDto === undefined) {
            throw new runtime.RequiredError('hausFuerKinderDto','Required parameter requestParameters.hausFuerKinderDto was null or undefined when calling createHausFuerKinder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/haus-fuer-kinder`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: HausFuerKinderDtoToJSON(requestParameters.hausFuerKinderDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HausFuerKinderDtoFromJSON(jsonValue));
    }

    /**
     * Anlegen eines neuen Hauses für Kinder
     */
    async createHausFuerKinder(requestParameters: CreateHausFuerKinderRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HausFuerKinderDto> {
        const response = await this.createHausFuerKinderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Löschen eines Hauses für Kinder
     */
    async deleteHausFuerKinderByIdRaw(requestParameters: DeleteHausFuerKinderByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteHausFuerKinderById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/haus-fuer-kinder/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Löschen eines Hauses für Kinder
     */
    async deleteHausFuerKinderById(requestParameters: DeleteHausFuerKinderByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.deleteHausFuerKinderByIdRaw(requestParameters, initOverrides);
    }

    /**
     * Das Ergebnis wird nach Name der Einrichtung aufsteigend sortiert
     * Lade alle Häuser für Kinder
     */
    async getHaeuserFuerKinderRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<HausFuerKinderDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/haeuser-fuer-kinder`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HausFuerKinderDtoFromJSON));
    }

    /**
     * Das Ergebnis wird nach Name der Einrichtung aufsteigend sortiert
     * Lade alle Häuser für Kinder
     */
    async getHaeuserFuerKinder(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<HausFuerKinderDto>> {
        const response = await this.getHaeuserFuerKinderRaw(initOverrides);
        return await response.value();
    }

    /**
     * Lesen eines Hauses für Kinder
     */
    async getHausFuerKinderByIdRaw(requestParameters: GetHausFuerKinderByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HausFuerKinderDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getHausFuerKinderById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/haus-fuer-kinder/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HausFuerKinderDtoFromJSON(jsonValue));
    }

    /**
     * Lesen eines Hauses für Kinder
     */
    async getHausFuerKinderById(requestParameters: GetHausFuerKinderByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HausFuerKinderDto> {
        const response = await this.getHausFuerKinderByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Aktualisierung einer Hauses für Kinder
     */
    async updateHausFuerKinderRaw(requestParameters: UpdateHausFuerKinderRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<HausFuerKinderDto>> {
        if (requestParameters.hausFuerKinderDto === null || requestParameters.hausFuerKinderDto === undefined) {
            throw new runtime.RequiredError('hausFuerKinderDto','Required parameter requestParameters.hausFuerKinderDto was null or undefined when calling updateHausFuerKinder.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/haus-fuer-kinder`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: HausFuerKinderDtoToJSON(requestParameters.hausFuerKinderDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HausFuerKinderDtoFromJSON(jsonValue));
    }

    /**
     * Aktualisierung einer Hauses für Kinder
     */
    async updateHausFuerKinder(requestParameters: UpdateHausFuerKinderRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<HausFuerKinderDto> {
        const response = await this.updateHausFuerKinderRaw(requestParameters, initOverrides);
        return await response.value();
    }

}