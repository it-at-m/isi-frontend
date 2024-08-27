/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.4.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BaurateDto,
  InformationResponseDto,
} from '../models';
import {
    BaurateDtoFromJSON,
    BaurateDtoToJSON,
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
} from '../models';

export interface DetermineBauratenRequest {
    realisierungsbeginn: number;
    wohneinheiten?: number;
    geschossflaecheWohnen?: number;
}

/**
 * 
 */
export class BaurateApi extends runtime.BaseAPI {

    /**
     * Ermittelt die Bauraten auf Basis der Stammdaten für idealtypische Bauraten
     */
    async determineBauratenRaw(requestParameters: DetermineBauratenRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<BaurateDto>>> {
        if (requestParameters.realisierungsbeginn === null || requestParameters.realisierungsbeginn === undefined) {
            throw new runtime.RequiredError('realisierungsbeginn','Required parameter requestParameters.realisierungsbeginn was null or undefined when calling determineBauraten.');
        }

        const queryParameters: any = {};

        if (requestParameters.realisierungsbeginn !== undefined) {
            queryParameters['realisierungsbeginn'] = requestParameters.realisierungsbeginn;
        }

        if (requestParameters.wohneinheiten !== undefined) {
            queryParameters['wohneinheiten'] = requestParameters.wohneinheiten;
        }

        if (requestParameters.geschossflaecheWohnen !== undefined) {
            queryParameters['geschossflaecheWohnen'] = requestParameters.geschossflaecheWohnen;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/baurate/determine`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(BaurateDtoFromJSON));
    }

    /**
     * Ermittelt die Bauraten auf Basis der Stammdaten für idealtypische Bauraten
     */
    async determineBauraten(requestParameters: DetermineBauratenRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<BaurateDto>> {
        const response = await this.determineBauratenRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
