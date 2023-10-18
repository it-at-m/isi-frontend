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
    FileInformationDto,
    FileInformationDtoFromJSON,
    FileInformationDtoToJSON,
} from '../models';

/**
 * 
 */
export class FileInfoStammApi extends runtime.BaseAPI {

    /**
     * Gibt die in der Anwendung erlaubten Dateiendungen, maximalen Dateigrößen, ... zurück (z.B. .pdf).
     */
    async getFileInformationRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<FileInformationDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stammdaten/file-information`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FileInformationDtoFromJSON(jsonValue));
    }

    /**
     * Gibt die in der Anwendung erlaubten Dateiendungen, maximalen Dateigrößen, ... zurück (z.B. .pdf).
     */
    async getFileInformation(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<FileInformationDto> {
        const response = await this.getFileInformationRaw(initOverrides);
        return await response.value();
    }

}
