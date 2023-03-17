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

import * as runtime from "../runtime";
import {
  GsNachmittagBetreuungDto,
  GsNachmittagBetreuungDtoFromJSON,
  GsNachmittagBetreuungDtoToJSON,
  InformationResponseDto,
  InformationResponseDtoFromJSON,
  InformationResponseDtoToJSON,
} from "../models";

export interface CreateGsNachmittagBetreuungRequest {
  gsNachmittagBetreuungDto: GsNachmittagBetreuungDto;
}

export interface DeleteGsNachmittagBetreuungByIdRequest {
  id: string;
}

export interface GetGsNachmittagBetreuungByIdRequest {
  id: string;
}

export interface UpdateGsNachmittagBetreuungRequest {
  gsNachmittagBetreuungDto: GsNachmittagBetreuungDto;
}

/**
 *
 */
export class GsNachmittagBetreuungApi extends runtime.BaseAPI {
  /**
   * Anlegen einer neuen Nachmittagsbetreuung für Grundschulkinder
   */
  async createGsNachmittagBetreuungRaw(
    requestParameters: CreateGsNachmittagBetreuungRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<GsNachmittagBetreuungDto>> {
    if (
      requestParameters.gsNachmittagBetreuungDto === null ||
      requestParameters.gsNachmittagBetreuungDto === undefined
    ) {
      throw new runtime.RequiredError(
        "gsNachmittagBetreuungDto",
        "Required parameter requestParameters.gsNachmittagBetreuungDto was null or undefined when calling createGsNachmittagBetreuung."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request(
      {
        path: `/gs-nachmittag-betreuung`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: GsNachmittagBetreuungDtoToJSON(requestParameters.gsNachmittagBetreuungDto),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => GsNachmittagBetreuungDtoFromJSON(jsonValue));
  }

  /**
   * Anlegen einer neuen Nachmittagsbetreuung für Grundschulkinder
   */
  async createGsNachmittagBetreuung(
    requestParameters: CreateGsNachmittagBetreuungRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<GsNachmittagBetreuungDto> {
    const response = await this.createGsNachmittagBetreuungRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Löschen einer Nachmittagsbetreuung für Grundschulkinder
   */
  async deleteGsNachmittagBetreuungByIdRaw(
    requestParameters: DeleteGsNachmittagBetreuungByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling deleteGsNachmittagBetreuungById."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/gs-nachmittag-betreuung/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Löschen einer Nachmittagsbetreuung für Grundschulkinder
   */
  async deleteGsNachmittagBetreuungById(
    requestParameters: DeleteGsNachmittagBetreuungByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<void> {
    await this.deleteGsNachmittagBetreuungByIdRaw(requestParameters, initOverrides);
  }

  /**
   * Lesen einer Nachmittagsbetreuung für Grundschulkinder
   */
  async getGsNachmittagBetreuungByIdRaw(
    requestParameters: GetGsNachmittagBetreuungByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<GsNachmittagBetreuungDto>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling getGsNachmittagBetreuungById."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/gs-nachmittag-betreuung/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => GsNachmittagBetreuungDtoFromJSON(jsonValue));
  }

  /**
   * Lesen einer Nachmittagsbetreuung für Grundschulkinder
   */
  async getGsNachmittagBetreuungById(
    requestParameters: GetGsNachmittagBetreuungByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<GsNachmittagBetreuungDto> {
    const response = await this.getGsNachmittagBetreuungByIdRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Das Ergebnis wird nach Name der Einrichtung aufsteigend sortiert
   * Lade alle Nachmittagsbetreuungen für Grundschulkinder
   */
  async getGsNachmittagBetreuungenRaw(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<Array<GsNachmittagBetreuungDto>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/gs-nachmittag-betreuungen`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(GsNachmittagBetreuungDtoFromJSON));
  }

  /**
   * Das Ergebnis wird nach Name der Einrichtung aufsteigend sortiert
   * Lade alle Nachmittagsbetreuungen für Grundschulkinder
   */
  async getGsNachmittagBetreuungen(
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<Array<GsNachmittagBetreuungDto>> {
    const response = await this.getGsNachmittagBetreuungenRaw(initOverrides);
    return await response.value();
  }

  /**
   * Aktualisierung einer Nachmittagsbetreuung für Grundschulkinder
   */
  async updateGsNachmittagBetreuungRaw(
    requestParameters: UpdateGsNachmittagBetreuungRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<runtime.ApiResponse<GsNachmittagBetreuungDto>> {
    if (
      requestParameters.gsNachmittagBetreuungDto === null ||
      requestParameters.gsNachmittagBetreuungDto === undefined
    ) {
      throw new runtime.RequiredError(
        "gsNachmittagBetreuungDto",
        "Required parameter requestParameters.gsNachmittagBetreuungDto was null or undefined when calling updateGsNachmittagBetreuung."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request(
      {
        path: `/gs-nachmittag-betreuung`,
        method: "PUT",
        headers: headerParameters,
        query: queryParameters,
        body: GsNachmittagBetreuungDtoToJSON(requestParameters.gsNachmittagBetreuungDto),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => GsNachmittagBetreuungDtoFromJSON(jsonValue));
  }

  /**
   * Aktualisierung einer Nachmittagsbetreuung für Grundschulkinder
   */
  async updateGsNachmittagBetreuung(
    requestParameters: UpdateGsNachmittagBetreuungRequest,
    initOverrides?: RequestInit | runtime.InitOverideFunction
  ): Promise<GsNachmittagBetreuungDto> {
    const response = await this.updateGsNachmittagBetreuungRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
