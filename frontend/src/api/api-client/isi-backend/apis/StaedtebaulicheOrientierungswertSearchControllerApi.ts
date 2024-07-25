/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.3.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  EntityModelStaedtebaulicheOrientierungswert,
} from '../models';
import {
    EntityModelStaedtebaulicheOrientierungswertFromJSON,
    EntityModelStaedtebaulicheOrientierungswertToJSON,
} from '../models';

export interface ExecuteSearchStaedtebaulicheorientierungswertGetRequest {
    foerderartBezeichnung?: string;
    gueltigAb?: Date;
}

/**
 * 
 */
export class StaedtebaulicheOrientierungswertSearchControllerApi extends runtime.BaseAPI {

    /**
     */
    async executeSearchStaedtebaulicheorientierungswertGetRaw(requestParameters: ExecuteSearchStaedtebaulicheorientierungswertGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EntityModelStaedtebaulicheOrientierungswert>> {
        const queryParameters: any = {};

        if (requestParameters.foerderartBezeichnung !== undefined) {
            queryParameters['foerderartBezeichnung'] = requestParameters.foerderartBezeichnung;
        }

        if (requestParameters.gueltigAb !== undefined) {
            queryParameters['gueltigAb'] = (requestParameters.gueltigAb as any).toISOString().substr(0,10);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/staedtebaulicheOrientierungswerts/search/findFirstByFoerderartBezeichnungAndGueltigAbIsLessThanEqualOrderByGueltigAbDesc`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelStaedtebaulicheOrientierungswertFromJSON(jsonValue));
    }

    /**
     */
    async executeSearchStaedtebaulicheorientierungswertGet(requestParameters: ExecuteSearchStaedtebaulicheorientierungswertGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EntityModelStaedtebaulicheOrientierungswert> {
        const response = await this.executeSearchStaedtebaulicheorientierungswertGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
