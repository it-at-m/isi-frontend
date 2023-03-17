/* tslint:disable */
/* eslint-disable */
/**
 * ISI MAstER EAI
 * ISI MAstER EAI - Service zum Abfragen von Adressen von MAstER
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import {
  AdressSucheDto,
  AdressSucheDtoFromJSON,
  AdressSucheDtoToJSON,
  InformationResponseDto,
  InformationResponseDtoFromJSON,
  InformationResponseDtoToJSON,
  MuenchenAdressenDto,
  MuenchenAdressenDtoFromJSON,
  MuenchenAdressenDtoToJSON,
} from "../models";

export interface GetAdressenRequest {
  adressSucheDto: AdressSucheDto;
}

/**
 *
 */
export class MasterEaiApi extends runtime.BaseAPI {
  /**
   * Holt die Adressen bei denen die Suchkriterien übereinstimmen.
   */
  async getAdressenRaw(
    requestParameters: GetAdressenRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<MuenchenAdressenDto>> {
    if (requestParameters.adressSucheDto === null || requestParameters.adressSucheDto === undefined) {
      throw new runtime.RequiredError(
        "adressSucheDto",
        "Required parameter requestParameters.adressSucheDto was null or undefined when calling getAdressen."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request(
      {
        path: `/adresse/search`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: AdressSucheDtoToJSON(requestParameters.adressSucheDto),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => MuenchenAdressenDtoFromJSON(jsonValue));
  }

  /**
   * Holt die Adressen bei denen die Suchkriterien übereinstimmen.
   */
  async getAdressen(
    requestParameters: GetAdressenRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<MuenchenAdressenDto> {
    const response = await this.getAdressenRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
