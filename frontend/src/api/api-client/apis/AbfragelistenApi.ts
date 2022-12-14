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
    AbfrageListElementsDto,
    AbfrageListElementsDtoFromJSON,
    AbfrageListElementsDtoToJSON,
} from '../models';

/**
 * 
 */
export class AbfragelistenApi extends runtime.BaseAPI {

    /**
     * Lade alle Abfragen für die Listendarstellung
     */
    async getAbfrageListElementsRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<AbfrageListElementsDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/abfragen`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AbfrageListElementsDtoFromJSON(jsonValue));
    }

    /**
     * Lade alle Abfragen für die Listendarstellung
     */
    async getAbfrageListElements(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<AbfrageListElementsDto> {
        const response = await this.getAbfrageListElementsRaw(initOverrides);
        return await response.value();
    }

}
