/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Wgs84Dto
 */
export interface Wgs84Dto {
    /**
     * 
     * @type {number}
     * @memberof Wgs84Dto
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof Wgs84Dto
     */
    longitude: number;
}

export function Wgs84DtoFromJSON(json: any): Wgs84Dto {
    return Wgs84DtoFromJSONTyped(json, false);
}

export function Wgs84DtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): Wgs84Dto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latitude': json['latitude'],
        'longitude': json['longitude'],
    };
}

export function Wgs84DtoToJSON(value?: Wgs84Dto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'latitude': value.latitude,
        'longitude': value.longitude,
    };
}

