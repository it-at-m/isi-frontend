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
  EntityModelIdealtypischeBaurate,
} from '../models';
import {
    EntityModelIdealtypischeBaurateFromJSON,
    EntityModelIdealtypischeBaurateToJSON,
} from '../models';

export interface ExecuteSearchIdealtypischebaurateGetRequest {
    typ?: ExecuteSearchIdealtypischebaurateGetTypEnum;
    von?: number;
    bisExklusiv?: number;
}

/**
 * 
 */
export class IdealtypischeBaurateSearchControllerApi extends runtime.BaseAPI {

    /**
     */
    async executeSearchIdealtypischebaurateGetRaw(requestParameters: ExecuteSearchIdealtypischebaurateGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelIdealtypischeBaurate>> {
        const queryParameters: any = {};

        if (requestParameters.typ !== undefined) {
            queryParameters['typ'] = requestParameters.typ;
        }

        if (requestParameters.von !== undefined) {
            queryParameters['von'] = requestParameters.von;
        }

        if (requestParameters.bisExklusiv !== undefined) {
            queryParameters['bisExklusiv'] = requestParameters.bisExklusiv;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/idealtypischeBaurates/search/findByTypAndVonLessThanEqualAndBisExklusivGreaterThan`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelIdealtypischeBaurateFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchIdealtypischebaurateGet(requestParameters: ExecuteSearchIdealtypischebaurateGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelIdealtypischeBaurate> {
        const response = await this.executeSearchIdealtypischebaurateGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const ExecuteSearchIdealtypischebaurateGetTypEnum = {
    AnzahlWohneinheitenGesamt: 'ANZAHL_WOHNEINHEITEN_GESAMT',
    GeschossflaecheWohnenGesamt: 'GESCHOSSFLAECHE_WOHNEN_GESAMT'
} as const;
export type ExecuteSearchIdealtypischebaurateGetTypEnum = typeof ExecuteSearchIdealtypischebaurateGetTypEnum[keyof typeof ExecuteSearchIdealtypischebaurateGetTypEnum];
