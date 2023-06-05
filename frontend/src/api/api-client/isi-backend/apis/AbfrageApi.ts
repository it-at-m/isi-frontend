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
    AbfrageerstellungInfrastrukturabfrageAngelegtDto,
    AbfrageerstellungInfrastrukturabfrageAngelegtDtoFromJSON,
    AbfrageerstellungInfrastrukturabfrageAngelegtDtoToJSON,
    InformationResponseDto,
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
    InfrastrukturabfrageDto,
    InfrastrukturabfrageDtoFromJSON,
    InfrastrukturabfrageDtoToJSON,
} from '../models';

export interface CreateInfrastrukturabfrageRequest {
    abfrageerstellungInfrastrukturabfrageAngelegtDto: AbfrageerstellungInfrastrukturabfrageAngelegtDto;
}

export interface DeleteInfrastrukturabfrageByIdRequest {
    id: string;
}

export interface GetInfrastrukturabfrageByIdRequest {
    id: string;
}

export interface PatchAbfrageAngelegtRequest {
    id: string;
    abfrageerstellungInfrastrukturabfrageAngelegtDto: AbfrageerstellungInfrastrukturabfrageAngelegtDto;
}

export interface PutAbfragevarianteRelevantRequest {
    abfrageId: string;
    abfragevarianteId: string;
}

/**
 * 
 */
export class AbfrageApi extends runtime.BaseAPI {

    /**
     * Anlegen einer neuen Infrastrukturabfrage
     */
    async createInfrastrukturabfrageRaw(requestParameters: CreateInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<InfrastrukturabfrageDto>> {
        if (requestParameters.abfrageerstellungInfrastrukturabfrageAngelegtDto === null || requestParameters.abfrageerstellungInfrastrukturabfrageAngelegtDto === undefined) {
            throw new runtime.RequiredError('abfrageerstellungInfrastrukturabfrageAngelegtDto','Required parameter requestParameters.abfrageerstellungInfrastrukturabfrageAngelegtDto was null or undefined when calling createInfrastrukturabfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/infrastruktur-abfragen`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AbfrageerstellungInfrastrukturabfrageAngelegtDtoToJSON(requestParameters.abfrageerstellungInfrastrukturabfrageAngelegtDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InfrastrukturabfrageDtoFromJSON(jsonValue));
    }

    /**
     * Anlegen einer neuen Infrastrukturabfrage
     */
    async createInfrastrukturabfrage(requestParameters: CreateInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<InfrastrukturabfrageDto> {
        const response = await this.createInfrastrukturabfrageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Löschen einer Infrastrukturabfrage
     */
    async deleteInfrastrukturabfrageByIdRaw(requestParameters: DeleteInfrastrukturabfrageByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteInfrastrukturabfrageById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfragen/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Löschen einer Infrastrukturabfrage
     */
    async deleteInfrastrukturabfrageById(requestParameters: DeleteInfrastrukturabfrageByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.deleteInfrastrukturabfrageByIdRaw(requestParameters, initOverrides);
    }

    /**
     * Lesen einer Infrastrukturabfrage
     */
    async getInfrastrukturabfrageByIdRaw(requestParameters: GetInfrastrukturabfrageByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<InfrastrukturabfrageDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getInfrastrukturabfrageById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfragen/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InfrastrukturabfrageDtoFromJSON(jsonValue));
    }

    /**
     * Lesen einer Infrastrukturabfrage
     */
    async getInfrastrukturabfrageById(requestParameters: GetInfrastrukturabfrageByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<InfrastrukturabfrageDto> {
        const response = await this.getInfrastrukturabfrageByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Das Ergebnis wird nach Frist Stellungnahme absteigend sortiert
     * Lade alle Infrastrukturabfragen
     */
    async getInfrastrukturabfragenRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<InfrastrukturabfrageDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfragen`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(InfrastrukturabfrageDtoFromJSON));
    }

    /**
     * Das Ergebnis wird nach Frist Stellungnahme absteigend sortiert
     * Lade alle Infrastrukturabfragen
     */
    async getInfrastrukturabfragen(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<InfrastrukturabfrageDto>> {
        const response = await this.getInfrastrukturabfragenRaw(initOverrides);
        return await response.value();
    }

    /**
     * Aktualisierung einer Infrastrukturabfrage im Status ANGELEGT.
     */
    async patchAbfrageAngelegtRaw(requestParameters: PatchAbfrageAngelegtRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<InfrastrukturabfrageDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling patchAbfrageAngelegt.');
        }

        if (requestParameters.abfrageerstellungInfrastrukturabfrageAngelegtDto === null || requestParameters.abfrageerstellungInfrastrukturabfrageAngelegtDto === undefined) {
            throw new runtime.RequiredError('abfrageerstellungInfrastrukturabfrageAngelegtDto','Required parameter requestParameters.abfrageerstellungInfrastrukturabfrageAngelegtDto was null or undefined when calling patchAbfrageAngelegt.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/infrastruktur-abfragen/abfrage/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: AbfrageerstellungInfrastrukturabfrageAngelegtDtoToJSON(requestParameters.abfrageerstellungInfrastrukturabfrageAngelegtDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InfrastrukturabfrageDtoFromJSON(jsonValue));
    }

    /**
     * Aktualisierung einer Infrastrukturabfrage im Status ANGELEGT.
     */
    async patchAbfrageAngelegt(requestParameters: PatchAbfrageAngelegtRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<InfrastrukturabfrageDto> {
        const response = await this.patchAbfrageAngelegtRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Markiert für Abfragen im Status IN_BEARBEITUNG_SACHBEARBEITUNG eine Abfragevariante als relevant.Eine Relevantsetzung kann nur vorgenommen werden, wenn die Abfrage ein Bauvorhaben referenziertund noch keine andere Abfrage als relevant markiert wurde.
     */
    async putAbfragevarianteRelevantRaw(requestParameters: PutAbfragevarianteRelevantRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<InfrastrukturabfrageDto>> {
        if (requestParameters.abfrageId === null || requestParameters.abfrageId === undefined) {
            throw new runtime.RequiredError('abfrageId','Required parameter requestParameters.abfrageId was null or undefined when calling putAbfragevarianteRelevant.');
        }

        if (requestParameters.abfragevarianteId === null || requestParameters.abfragevarianteId === undefined) {
            throw new runtime.RequiredError('abfragevarianteId','Required parameter requestParameters.abfragevarianteId was null or undefined when calling putAbfragevarianteRelevant.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfragen/abfrage/{abfrageId}/abfragevariante/relevant/{abfragevarianteId}`.replace(`{${"abfrageId"}}`, encodeURIComponent(String(requestParameters.abfrageId))).replace(`{${"abfragevarianteId"}}`, encodeURIComponent(String(requestParameters.abfragevarianteId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InfrastrukturabfrageDtoFromJSON(jsonValue));
    }

    /**
     * Markiert für Abfragen im Status IN_BEARBEITUNG_SACHBEARBEITUNG eine Abfragevariante als relevant.Eine Relevantsetzung kann nur vorgenommen werden, wenn die Abfrage ein Bauvorhaben referenziertund noch keine andere Abfrage als relevant markiert wurde.
     */
    async putAbfragevarianteRelevant(requestParameters: PutAbfragevarianteRelevantRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<InfrastrukturabfrageDto> {
        const response = await this.putAbfragevarianteRelevantRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
