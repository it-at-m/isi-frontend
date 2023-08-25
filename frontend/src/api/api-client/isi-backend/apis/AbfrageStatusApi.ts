/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InformationResponseDto,
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
    TransitionDto,
    TransitionDtoFromJSON,
    TransitionDtoToJSON,
} from '../models';

export interface AbbrechenInfrastrukturabfrageRequest {
    id: string;
}

export interface AbfrageSchliessenInfrastrukturAbfrageRequest {
    id: string;
}

export interface BedarfsmeldungErfolgtInfrastrukturAbfrageRequest {
    id: string;
}

export interface ErneuteBearbeitungInfrastrukturabfrageRequest {
    id: string;
}

export interface FreigabeInfrastrukturabfrageRequest {
    id: string;
}

export interface InBearbeitungSetzenInfrastrukturabfrageRequest {
    id: string;
}

export interface SpeichernVonSozialinfrastrukturVersorgungInfrastrukturAbfrageRequest {
    id: string;
}

export interface TransitionsInfrastrukturabfrageRequest {
    id: string;
}

export interface VerschickenDerStellungnahmeInfrastrukturabfrageRequest {
    id: string;
}

export interface ZurueckAbfrageerstellungInfrastrukturabfrageRequest {
    id: string;
}

export interface ZurueckAnSachbearbeitungInfrastrukturabfrageRequest {
    id: string;
}

/**
 * 
 */
export class AbfrageStatusApi extends runtime.BaseAPI {

    /**
     * Setzt eine Infrastrukturabfrage auf den Status ABBRUCH
     */
    async abbrechenInfrastrukturabfrageRaw(requestParameters: AbbrechenInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling abbrechenInfrastrukturabfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/abbrechen`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status ABBRUCH
     */
    async abbrechenInfrastrukturabfrage(requestParameters: AbbrechenInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.abbrechenInfrastrukturabfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status ERLEDIGT
     */
    async abfrageSchliessenInfrastrukturAbfrageRaw(requestParameters: AbfrageSchliessenInfrastrukturAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling abfrageSchliessenInfrastrukturAbfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/abfrage-schliessen`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status ERLEDIGT
     */
    async abfrageSchliessenInfrastrukturAbfrage(requestParameters: AbfrageSchliessenInfrastrukturAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.abfrageSchliessenInfrastrukturAbfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status BEDARFSMELDUNG_ERFOLGT
     */
    async bedarfsmeldungErfolgtInfrastrukturAbfrageRaw(requestParameters: BedarfsmeldungErfolgtInfrastrukturAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling bedarfsmeldungErfolgtInfrastrukturAbfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/bedarfsmeldung-erfolgt`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status BEDARFSMELDUNG_ERFOLGT
     */
    async bedarfsmeldungErfolgtInfrastrukturAbfrage(requestParameters: BedarfsmeldungErfolgtInfrastrukturAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.bedarfsmeldungErfolgtInfrastrukturAbfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async erneuteBearbeitungInfrastrukturabfrageRaw(requestParameters: ErneuteBearbeitungInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling erneuteBearbeitungInfrastrukturabfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/erneute-bearbeitung`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async erneuteBearbeitungInfrastrukturabfrage(requestParameters: ErneuteBearbeitungInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.erneuteBearbeitungInfrastrukturabfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status OFFEN
     */
    async freigabeInfrastrukturabfrageRaw(requestParameters: FreigabeInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling freigabeInfrastrukturabfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/freigabe`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status OFFEN
     */
    async freigabeInfrastrukturabfrage(requestParameters: FreigabeInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.freigabeInfrastrukturabfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async inBearbeitungSetzenInfrastrukturabfrageRaw(requestParameters: InBearbeitungSetzenInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling inBearbeitungSetzenInfrastrukturabfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/in-bearbeitung-setzen`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async inBearbeitungSetzenInfrastrukturabfrage(requestParameters: InBearbeitungSetzenInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.inBearbeitungSetzenInfrastrukturabfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status ERLEDIGT
     */
    async speichernVonSozialinfrastrukturVersorgungInfrastrukturAbfrageRaw(requestParameters: SpeichernVonSozialinfrastrukturVersorgungInfrastrukturAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling speichernVonSozialinfrastrukturVersorgungInfrastrukturAbfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/speicher-von-soz-infrastruktur-versorgung`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status ERLEDIGT
     */
    async speichernVonSozialinfrastrukturVersorgungInfrastrukturAbfrage(requestParameters: SpeichernVonSozialinfrastrukturVersorgungInfrastrukturAbfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.speichernVonSozialinfrastrukturVersorgungInfrastrukturAbfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Holt alle möglichen StatusAbfrage Transitions auf Basis der Authorities und des aktuellen Status
     */
    async transitionsInfrastrukturabfrageRaw(requestParameters: TransitionsInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<TransitionDto>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling transitionsInfrastrukturabfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/transitions`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TransitionDtoFromJSON));
    }

    /**
     * Holt alle möglichen StatusAbfrage Transitions auf Basis der Authorities und des aktuellen Status
     */
    async transitionsInfrastrukturabfrage(requestParameters: TransitionsInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<TransitionDto>> {
        const response = await this.transitionsInfrastrukturabfrageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status IN_BEARBEITUNG_FACHREFERATE
     */
    async verschickenDerStellungnahmeInfrastrukturabfrageRaw(requestParameters: VerschickenDerStellungnahmeInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling verschickenDerStellungnahmeInfrastrukturabfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/verschicken-der-stellungnahme`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status IN_BEARBEITUNG_FACHREFERATE
     */
    async verschickenDerStellungnahmeInfrastrukturabfrage(requestParameters: VerschickenDerStellungnahmeInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.verschickenDerStellungnahmeInfrastrukturabfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status ANGELEGT
     */
    async zurueckAbfrageerstellungInfrastrukturabfrageRaw(requestParameters: ZurueckAbfrageerstellungInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling zurueckAbfrageerstellungInfrastrukturabfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/zurueck-an-abfrageerstellung`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status ANGELEGT
     */
    async zurueckAbfrageerstellungInfrastrukturabfrage(requestParameters: ZurueckAbfrageerstellungInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.zurueckAbfrageerstellungInfrastrukturabfrageRaw(requestParameters, initOverrides);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async zurueckAnSachbearbeitungInfrastrukturabfrageRaw(requestParameters: ZurueckAnSachbearbeitungInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling zurueckAnSachbearbeitungInfrastrukturabfrage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/infrastruktur-abfrage/{id}/zurueck-an-sachbearbeitung`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Setzt eine Infrastrukturabfrage auf den Status IN_BEARBEITUNG_SACHBEARBEITUNG
     */
    async zurueckAnSachbearbeitungInfrastrukturabfrage(requestParameters: ZurueckAnSachbearbeitungInfrastrukturabfrageRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.zurueckAnSachbearbeitungInfrastrukturabfrageRaw(requestParameters, initOverrides);
    }

}
