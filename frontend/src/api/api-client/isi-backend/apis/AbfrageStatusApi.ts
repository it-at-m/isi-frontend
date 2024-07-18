/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.3.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  InformationResponseDto,
  TransitionDto,
} from '../models';
import {
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
    TransitionDtoFromJSON,
    TransitionDtoToJSON,
} from '../models';

export interface AbbrechenAbfrageRequest {
    id: string;
    anmerkung?: string;
}

export interface BedarfsmeldungErfolgtRequest {
    id: string;
    anmerkung?: string;
}

export interface ErledigtMitFachreferatRequest {
    id: string;
    anmerkung?: string;
}

export interface ErledigtOhneFachreferatRequest {
    id: string;
    anmerkung?: string;
}

export interface ErneuteBearbeitungSachbearbeitungRequest {
    id: string;
    anmerkung?: string;
}

export interface FreigabeAbfrageRequest {
    id: string;
    anmerkung?: string;
}

export interface InBearbeitungSetzenAbfrageRequest {
    id: string;
    anmerkung?: string;
}

export interface TransitionsAbfrageRequest {
    id: string;
}

export interface VerschickenDerStellungnahmeRequest {
    id: string;
    anmerkung?: string;
}

export interface ZurueckAnAbfrageerstellungAbfrageRequest {
    id: string;
    anmerkung?: string;
}

export interface ZurueckAnSachbearbeitungAbfrageRequest {
    id: string;
    anmerkung?: string;
}

/**
 * 
 */
export class AbfrageStatusApi extends runtime.BaseAPI {

    /**
     * Setzt eine Abfrage auf den Status ABBRUCH
     */
    async abbrechenAbfrageRaw(requestParameters: AbbrechenAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling abbrechenAbfrage.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/abbrechen`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status ABBRUCH
     */
    async abbrechenAbfrage(requestParameters: AbbrechenAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.abbrechenAbfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Abfrage auf den Status BEDARFSMELDUNG_ERFOLGT
     */
    async bedarfsmeldungErfolgtRaw(requestParameters: BedarfsmeldungErfolgtRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling bedarfsmeldungErfolgt.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/bedarfsmeldung-erfolgt`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status BEDARFSMELDUNG_ERFOLGT
     */
    async bedarfsmeldungErfolgt(requestParameters: BedarfsmeldungErfolgtRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.bedarfsmeldungErfolgtRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Abfrage auf den Status ERLEDIGT_MIT_FACHREFERAT
     */
    async erledigtMitFachreferatRaw(requestParameters: ErledigtMitFachreferatRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling erledigtMitFachreferat.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/erledigt-mit-fachreferat`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status ERLEDIGT_MIT_FACHREFERAT
     */
    async erledigtMitFachreferat(requestParameters: ErledigtMitFachreferatRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.erledigtMitFachreferatRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Abfrage auf den Status ERLEDIGT_OHNE_FACHREFERAT
     */
    async erledigtOhneFachreferatRaw(requestParameters: ErledigtOhneFachreferatRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling erledigtOhneFachreferat.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/erledigt-ohne-fachreferat`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status ERLEDIGT_OHNE_FACHREFERAT
     */
    async erledigtOhneFachreferat(requestParameters: ErledigtOhneFachreferatRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.erledigtOhneFachreferatRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Abfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async erneuteBearbeitungSachbearbeitungRaw(requestParameters: ErneuteBearbeitungSachbearbeitungRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling erneuteBearbeitungSachbearbeitung.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/erneute-bearbeitung-sachbearbeitung`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async erneuteBearbeitungSachbearbeitung(requestParameters: ErneuteBearbeitungSachbearbeitungRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.erneuteBearbeitungSachbearbeitungRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Abfrage auf den Status OFFEN
     */
    async freigabeAbfrageRaw(requestParameters: FreigabeAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling freigabeAbfrage.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/freigabe`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status OFFEN
     */
    async freigabeAbfrage(requestParameters: FreigabeAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.freigabeAbfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Abfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async inBearbeitungSetzenAbfrageRaw(requestParameters: InBearbeitungSetzenAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling inBearbeitungSetzenAbfrage.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/in-bearbeitung-setzen`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async inBearbeitungSetzenAbfrage(requestParameters: InBearbeitungSetzenAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.inBearbeitungSetzenAbfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Holt alle möglichen StatusAbfrage Transitions auf Basis der Authorities und des aktuellen Status
     */
    async transitionsAbfrageRaw(requestParameters: TransitionsAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TransitionDto>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling transitionsAbfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/transitions`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TransitionDtoFromJSON));
    }

    /**
     * Holt alle möglichen StatusAbfrage Transitions auf Basis der Authorities und des aktuellen Status
     */
    async transitionsAbfrage(requestParameters: TransitionsAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TransitionDto>> {
        const response = await this.transitionsAbfrageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Setzt eine Abfrage auf den Status IN_BEARBEITUNG_FACHREFERATE
     */
    async verschickenDerStellungnahmeRaw(requestParameters: VerschickenDerStellungnahmeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling verschickenDerStellungnahme.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/verschicken-der-stellungnahme`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status IN_BEARBEITUNG_FACHREFERATE
     */
    async verschickenDerStellungnahme(requestParameters: VerschickenDerStellungnahmeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.verschickenDerStellungnahmeRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Abfrage auf den Status ANGELEGT
     */
    async zurueckAnAbfrageerstellungAbfrageRaw(requestParameters: ZurueckAnAbfrageerstellungAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling zurueckAnAbfrageerstellungAbfrage.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/zurueck-an-abfrageerstellung`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status ANGELEGT
     */
    async zurueckAnAbfrageerstellungAbfrage(requestParameters: ZurueckAnAbfrageerstellungAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.zurueckAnAbfrageerstellungAbfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Abfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async zurueckAnSachbearbeitungAbfrageRaw(requestParameters: ZurueckAnSachbearbeitungAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling zurueckAnSachbearbeitungAbfrage.');
        }

        const queryParameters: any = {};

        if (requestParameters.anmerkung !== undefined) {
            queryParameters['anmerkung'] = requestParameters.anmerkung;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfrage-status/{id}/zurueck-an-sachbearbeitung`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Abfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async zurueckAnSachbearbeitungAbfrage(requestParameters: ZurueckAnSachbearbeitungAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.zurueckAnSachbearbeitungAbfrageRaw(requestParameters, initOverrides);
    }

}
