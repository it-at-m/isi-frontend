/* tslint:disable */
/* eslint-disable */
/**
 * ISI GEODATA EAI
 * ISI GEODATA EAI - Service zum Abfragen von Geoinformationen
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    FeatureCollectionDtoFeatureDtoFlurstueckDto,
    FeatureCollectionDtoFeatureDtoFlurstueckDtoFromJSON,
    FeatureCollectionDtoFeatureDtoFlurstueckDtoToJSON,
    FeatureCollectionDtoFeatureDtoGemarkungDto,
    FeatureCollectionDtoFeatureDtoGemarkungDtoFromJSON,
    FeatureCollectionDtoFeatureDtoGemarkungDtoToJSON,
    FeatureCollectionDtoFeatureDtoSchulstandortDto,
    FeatureCollectionDtoFeatureDtoSchulstandortDtoFromJSON,
    FeatureCollectionDtoFeatureDtoSchulstandortDtoToJSON,
    FeatureCollectionDtoFeatureDtoStadtbezirkDto,
    FeatureCollectionDtoFeatureDtoStadtbezirkDtoFromJSON,
    FeatureCollectionDtoFeatureDtoStadtbezirkDtoToJSON,
    InformationResponseDto,
    InformationResponseDtoFromJSON,
    InformationResponseDtoToJSON,
    MultiPolygonGeometryDto,
    MultiPolygonGeometryDtoFromJSON,
    MultiPolygonGeometryDtoToJSON,
} from '../models';

export interface GetFlurstueckeRequest {
    multiPolygonGeometryDto: MultiPolygonGeometryDto;
}

export interface GetGemarkungenRequest {
    multiPolygonGeometryDto: MultiPolygonGeometryDto;
}

export interface GetSchulstandorteRequest {
    multiPolygonGeometryDto: MultiPolygonGeometryDto;
}

export interface GetStadtbezirkeRequest {
    multiPolygonGeometryDto: MultiPolygonGeometryDto;
}

/**
 * 
 */
export class ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api extends runtime.BaseAPI {

    /**
     * Holt die Flurstücke die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.
     */
    async getFlurstueckeRaw(requestParameters: GetFlurstueckeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<FeatureCollectionDtoFeatureDtoFlurstueckDto>> {
        if (requestParameters.multiPolygonGeometryDto === null || requestParameters.multiPolygonGeometryDto === undefined) {
            throw new runtime.RequiredError('multiPolygonGeometryDto','Required parameter requestParameters.multiPolygonGeometryDto was null or undefined when calling getFlurstuecke.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/polygon/flurstuecke`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MultiPolygonGeometryDtoToJSON(requestParameters.multiPolygonGeometryDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeatureCollectionDtoFeatureDtoFlurstueckDtoFromJSON(jsonValue));
    }

    /**
     * Holt die Flurstücke die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.
     */
    async getFlurstuecke(requestParameters: GetFlurstueckeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<FeatureCollectionDtoFeatureDtoFlurstueckDto> {
        const response = await this.getFlurstueckeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Holt die Gemarkungen die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.
     */
    async getGemarkungenRaw(requestParameters: GetGemarkungenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<FeatureCollectionDtoFeatureDtoGemarkungDto>> {
        if (requestParameters.multiPolygonGeometryDto === null || requestParameters.multiPolygonGeometryDto === undefined) {
            throw new runtime.RequiredError('multiPolygonGeometryDto','Required parameter requestParameters.multiPolygonGeometryDto was null or undefined when calling getGemarkungen.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/polygon/gemarkungen`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MultiPolygonGeometryDtoToJSON(requestParameters.multiPolygonGeometryDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeatureCollectionDtoFeatureDtoGemarkungDtoFromJSON(jsonValue));
    }

    /**
     * Holt die Gemarkungen die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.
     */
    async getGemarkungen(requestParameters: GetGemarkungenRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<FeatureCollectionDtoFeatureDtoGemarkungDto> {
        const response = await this.getGemarkungenRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Holt die Schulstandorte die sich mit dem Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.
     */
    async getSchulstandorteRaw(requestParameters: GetSchulstandorteRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<FeatureCollectionDtoFeatureDtoSchulstandortDto>> {
        if (requestParameters.multiPolygonGeometryDto === null || requestParameters.multiPolygonGeometryDto === undefined) {
            throw new runtime.RequiredError('multiPolygonGeometryDto','Required parameter requestParameters.multiPolygonGeometryDto was null or undefined when calling getSchulstandorte.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/polygon/schulstandorte`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MultiPolygonGeometryDtoToJSON(requestParameters.multiPolygonGeometryDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeatureCollectionDtoFeatureDtoSchulstandortDtoFromJSON(jsonValue));
    }

    /**
     * Holt die Schulstandorte die sich mit dem Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.
     */
    async getSchulstandorte(requestParameters: GetSchulstandorteRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<FeatureCollectionDtoFeatureDtoSchulstandortDto> {
        const response = await this.getSchulstandorteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Holt die Stadtbezirke die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.
     */
    async getStadtbezirkeRaw(requestParameters: GetStadtbezirkeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<FeatureCollectionDtoFeatureDtoStadtbezirkDto>> {
        if (requestParameters.multiPolygonGeometryDto === null || requestParameters.multiPolygonGeometryDto === undefined) {
            throw new runtime.RequiredError('multiPolygonGeometryDto','Required parameter requestParameters.multiPolygonGeometryDto was null or undefined when calling getStadtbezirke.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/polygon/stadtbezirke`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MultiPolygonGeometryDtoToJSON(requestParameters.multiPolygonGeometryDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeatureCollectionDtoFeatureDtoStadtbezirkDtoFromJSON(jsonValue));
    }

    /**
     * Holt die Stadtbezirke die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.
     */
    async getStadtbezirke(requestParameters: GetStadtbezirkeRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<FeatureCollectionDtoFeatureDtoStadtbezirkDto> {
        const response = await this.getStadtbezirkeRaw(requestParameters, initOverrides);
        return await response.value();
    }

}