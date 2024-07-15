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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface MultiPolygonGeometry
 */
export interface MultiPolygonGeometry {
    /**
     * 
     * @type {string}
     * @memberof MultiPolygonGeometry
     */
    type?: string;
    /**
     * 
     * @type {Array<Array<Array<Array<number>>>>}
     * @memberof MultiPolygonGeometry
     */
    coordinates?: Array<Array<Array<Array<number>>>>;
}

/**
 * Check if a given object implements the MultiPolygonGeometry interface.
 */
export function instanceOfMultiPolygonGeometry(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MultiPolygonGeometryFromJSON(json: any): MultiPolygonGeometry {
    return MultiPolygonGeometryFromJSONTyped(json, false);
}

export function MultiPolygonGeometryFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultiPolygonGeometry {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'coordinates': !exists(json, 'coordinates') ? undefined : json['coordinates'],
    };
}

export function MultiPolygonGeometryToJSON(value?: MultiPolygonGeometry | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'coordinates': value.coordinates,
    };
}

