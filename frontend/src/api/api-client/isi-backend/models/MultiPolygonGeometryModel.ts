/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.1.0
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
 * @interface MultiPolygonGeometryModel
 */
export interface MultiPolygonGeometryModel {
    /**
     * 
     * @type {string}
     * @memberof MultiPolygonGeometryModel
     */
    type?: string;
    /**
     * 
     * @type {Array<Array<Array<Array<number>>>>}
     * @memberof MultiPolygonGeometryModel
     */
    coordinates?: Array<Array<Array<Array<number>>>>;
}

/**
 * Check if a given object implements the MultiPolygonGeometryModel interface.
 */
export function instanceOfMultiPolygonGeometryModel(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MultiPolygonGeometryModelFromJSON(json: any): MultiPolygonGeometryModel {
    return MultiPolygonGeometryModelFromJSONTyped(json, false);
}

export function MultiPolygonGeometryModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultiPolygonGeometryModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'coordinates': !exists(json, 'coordinates') ? undefined : json['coordinates'],
    };
}

export function MultiPolygonGeometryModelToJSON(value?: MultiPolygonGeometryModel | null): any {
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

