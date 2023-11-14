/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    AbfrageSearchResultDto,
    AbfrageSearchResultDtoFromJSON,
    AbfrageSearchResultDtoToJSON,
    BauvorhabenDto,
    BauvorhabenDtoFromJSON,
    BauvorhabenDtoToJSON,
    InformationResponseDto,
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
    InfrastruktureinrichtungSearchResultDto,
    InfrastruktureinrichtungSearchResultDtoFromJSON,
    InfrastruktureinrichtungSearchResultDtoToJSON,
} from '../models';

export interface CreateBauvorhabenRequest {
    bauvorhabenDto: BauvorhabenDto;
    abfrageId?: string;
}

export interface DeleteBauvorhabenRequest {
    id: string;
}

export interface GetBauvorhabenByIdRequest {
    id: string;
}

export interface GetReferencedAbfrageRequest {
    id: string;
}

export interface GetReferencedInfrastruktureinrichtungRequest {
    id: string;
}

export interface PutChangeRelevanteAbfragevarianteRequest {
    abfragevarianteId: string;
}

export interface UpdateBauvorhabenRequest {
    bauvorhabenDto: BauvorhabenDto;
}

/**
 * 
 */
export class BauvorhabenApi extends runtime.BaseAPI {

    /**
     * Anlegen eines neuen Bauvorhabens
     */
    async createBauvorhabenRaw(requestParameters: CreateBauvorhabenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<BauvorhabenDto>> {
        if (requestParameters.bauvorhabenDto === null || requestParameters.bauvorhabenDto === undefined) {
            throw new runtime.RequiredError('bauvorhabenDto','Required parameter requestParameters.bauvorhabenDto was null or undefined when calling createBauvorhaben.');
        }

        const queryParameters: any = {};

        if (requestParameters.abfrageId !== undefined) {
            queryParameters['abfrageId'] = requestParameters.abfrageId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/bauvorhaben`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BauvorhabenDtoToJSON(requestParameters.bauvorhabenDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BauvorhabenDtoFromJSON(jsonValue));
    }

    /**
     * Anlegen eines neuen Bauvorhabens
     */
    async createBauvorhaben(requestParameters: CreateBauvorhabenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<BauvorhabenDto> {
        const response = await this.createBauvorhabenRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Löschen eines Bauvorhabens
     */
    async deleteBauvorhabenRaw(requestParameters: DeleteBauvorhabenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteBauvorhaben.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/bauvorhaben/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Löschen eines Bauvorhabens
     */
    async deleteBauvorhaben(requestParameters: DeleteBauvorhabenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.deleteBauvorhabenRaw(requestParameters, initOverrides);
    }

    /**
     * Lesen eines Bauvorhabens
     */
    async getBauvorhabenByIdRaw(requestParameters: GetBauvorhabenByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<BauvorhabenDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getBauvorhabenById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/bauvorhaben/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BauvorhabenDtoFromJSON(jsonValue));
    }

    /**
     * Lesen eines Bauvorhabens
     */
    async getBauvorhabenById(requestParameters: GetBauvorhabenByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<BauvorhabenDto> {
        const response = await this.getBauvorhabenByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Das Ergebnis wird anhand des Erstellungsdatums aufsteigend sortiert.
     * Lade alle Abfragen die einem Bauvorhaben angehören
     */
    async getReferencedAbfrageRaw(requestParameters: GetReferencedAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<AbfrageSearchResultDto>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getReferencedAbfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/bauvorhaben/referenced/abfragen/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AbfrageSearchResultDtoFromJSON));
    }

    /**
     * Das Ergebnis wird anhand des Erstellungsdatums aufsteigend sortiert.
     * Lade alle Abfragen die einem Bauvorhaben angehören
     */
    async getReferencedAbfrage(requestParameters: GetReferencedAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<AbfrageSearchResultDto>> {
        const response = await this.getReferencedAbfrageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Das Ergebnis wird anhand des InfrastruktureinrichtungTyps und innerhalb des Types alphabetisch sortiert
     * Lade alle Infrastruktureinrichtungen die einem Bauvorhaben angehören
     */
    async getReferencedInfrastruktureinrichtungRaw(requestParameters: GetReferencedInfrastruktureinrichtungRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<InfrastruktureinrichtungSearchResultDto>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getReferencedInfrastruktureinrichtung.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/bauvorhaben/referenced/infrastruktureinrichtung/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(InfrastruktureinrichtungSearchResultDtoFromJSON));
    }

    /**
     * Das Ergebnis wird anhand des InfrastruktureinrichtungTyps und innerhalb des Types alphabetisch sortiert
     * Lade alle Infrastruktureinrichtungen die einem Bauvorhaben angehören
     */
    async getReferencedInfrastruktureinrichtung(requestParameters: GetReferencedInfrastruktureinrichtungRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<InfrastruktureinrichtungSearchResultDto>> {
        const response = await this.getReferencedInfrastruktureinrichtungRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Setzt die übergebene Abfragevariante als relevante Abfrage beim Bauvorhaben, welches mit der Abfrage der Abfragevariante verknüpft ist.Ist die Abfragevariante bereits als relevant markiert, wird die relevante Abfragevariante des Bauvorhabens entfernt.Eine Relevantsetzung kann nur vorgenommen werden, wenn die Abfrage ein Bauvorhaben referenziert,die Abfrage im Status {@link StatusAbfrage#IN_BEARBEITUNG_SACHBEARBEITUNG} istund noch keine andere Abfrage als relevant markiert wurde.
     */
    async putChangeRelevanteAbfragevarianteRaw(requestParameters: PutChangeRelevanteAbfragevarianteRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<BauvorhabenDto>> {
        if (requestParameters.abfragevarianteId === null || requestParameters.abfragevarianteId === undefined) {
            throw new runtime.RequiredError('abfragevarianteId','Required parameter requestParameters.abfragevarianteId was null or undefined when calling putChangeRelevanteAbfragevariante.');
        }

        const queryParameters: any = {};

        if (requestParameters.abfragevarianteId !== undefined) {
            queryParameters['abfragevariante-id'] = requestParameters.abfragevarianteId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/bauvorhaben/change-relevante-abfragevariante`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BauvorhabenDtoFromJSON(jsonValue));
    }

    /**
     * Setzt die übergebene Abfragevariante als relevante Abfrage beim Bauvorhaben, welches mit der Abfrage der Abfragevariante verknüpft ist.Ist die Abfragevariante bereits als relevant markiert, wird die relevante Abfragevariante des Bauvorhabens entfernt.Eine Relevantsetzung kann nur vorgenommen werden, wenn die Abfrage ein Bauvorhaben referenziert,die Abfrage im Status {@link StatusAbfrage#IN_BEARBEITUNG_SACHBEARBEITUNG} istund noch keine andere Abfrage als relevant markiert wurde.
     */
    async putChangeRelevanteAbfragevariante(requestParameters: PutChangeRelevanteAbfragevarianteRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<BauvorhabenDto> {
        const response = await this.putChangeRelevanteAbfragevarianteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Aktualisierung eines Bauvorhabens
     */
    async updateBauvorhabenRaw(requestParameters: UpdateBauvorhabenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<BauvorhabenDto>> {
        if (requestParameters.bauvorhabenDto === null || requestParameters.bauvorhabenDto === undefined) {
            throw new runtime.RequiredError('bauvorhabenDto','Required parameter requestParameters.bauvorhabenDto was null or undefined when calling updateBauvorhaben.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/bauvorhaben`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: BauvorhabenDtoToJSON(requestParameters.bauvorhabenDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BauvorhabenDtoFromJSON(jsonValue));
    }

    /**
     * Aktualisierung eines Bauvorhabens
     */
    async updateBauvorhaben(requestParameters: UpdateBauvorhabenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<BauvorhabenDto> {
        const response = await this.updateBauvorhabenRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
