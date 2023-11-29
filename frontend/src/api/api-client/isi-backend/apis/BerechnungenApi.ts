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
import type {
  CalculationRequestDto,
  InformationResponseDto,
  LangfristigerPlanungsursaechlicherBedarfDto,
} from '../models';
import {
    CalculationRequestDtoFromJSON,
    CalculationRequestDtoToJSON,
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
    LangfristigerPlanungsursaechlicherBedarfDtoFromJSON,
    LangfristigerPlanungsursaechlicherBedarfDtoToJSON,
} from '../models';

export interface CalculateLangfristigerPlanungsursaechlicherBedarfRequest {
    calculationRequestDto: CalculationRequestDto;
}

/**
 * 
 */
export class BerechnungenApi extends runtime.BaseAPI {

    /**
     * Berechnung des langfristigen planungsursächlichen Bedarfes
     */
    async calculateLangfristigerPlanungsursaechlicherBedarfRaw(requestParameters: CalculateLangfristigerPlanungsursaechlicherBedarfRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LangfristigerPlanungsursaechlicherBedarfDto>> {
        if (requestParameters.calculationRequestDto === null || requestParameters.calculationRequestDto === undefined) {
            throw new runtime.RequiredError('calculationRequestDto','Required parameter requestParameters.calculationRequestDto was null or undefined when calling calculateLangfristigerPlanungsursaechlicherBedarf.');
        }

        const queryParameters: any = {};

        if (requestParameters.calculationRequestDto !== undefined) {
            queryParameters['calculationRequestDto'] = requestParameters.calculationRequestDto;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/calculation/planungsursaechlich`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LangfristigerPlanungsursaechlicherBedarfDtoFromJSON(jsonValue));
    }

    /**
     * Berechnung des langfristigen planungsursächlichen Bedarfes
     */
    async calculateLangfristigerPlanungsursaechlicherBedarf(requestParameters: CalculateLangfristigerPlanungsursaechlicherBedarfRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LangfristigerPlanungsursaechlicherBedarfDto> {
        const response = await this.calculateLangfristigerPlanungsursaechlicherBedarfRaw(requestParameters, initOverrides);
        return await response.value();
    }

}