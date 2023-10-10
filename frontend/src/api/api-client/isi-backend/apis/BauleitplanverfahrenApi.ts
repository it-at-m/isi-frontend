/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
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
    BauleitplanverfahrenDto,
    BauleitplanverfahrenDtoFromJSON,
    BauleitplanverfahrenDtoToJSON,
    InformationResponseDto,
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
} from '../models';

export interface GetBauleitplanverfahrenRequest {
    id: string;
}

/**
 * 
 */
export class BauleitplanverfahrenApi extends runtime.BaseAPI {

    /**
     * Lesen einer Abfrage vom Typ Bauleitplanverfahren.
     */
    async getBauleitplanverfahrenRaw(requestParameters: GetBauleitplanverfahrenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<BauleitplanverfahrenDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getBauleitplanverfahren.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/bauleitplanverfahren/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BauleitplanverfahrenDtoFromJSON(jsonValue));
    }

    /**
     * Lesen einer Abfrage vom Typ Bauleitplanverfahren.
     */
    async getBauleitplanverfahren(requestParameters: GetBauleitplanverfahrenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<BauleitplanverfahrenDto> {
        const response = await this.getBauleitplanverfahrenRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
