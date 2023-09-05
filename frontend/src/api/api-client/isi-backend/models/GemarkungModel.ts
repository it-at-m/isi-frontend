/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    FlurstueckModel,
    FlurstueckModelFromJSON,
    FlurstueckModelFromJSONTyped,
    FlurstueckModelToJSON,
} from './FlurstueckModel';
import {
    MultiPolygonGeometryModel,
    MultiPolygonGeometryModelFromJSON,
    MultiPolygonGeometryModelFromJSONTyped,
    MultiPolygonGeometryModelToJSON,
} from './MultiPolygonGeometryModel';

/**
 * 
 * @export
 * @interface GemarkungModel
 */
export interface GemarkungModel {
    /**
     * 
     * @type {number}
     * @memberof GemarkungModel
     */
    nummer?: number;
    /**
     * 
     * @type {string}
     * @memberof GemarkungModel
     */
    name?: string;
    /**
     * 
     * @type {Set<FlurstueckModel>}
     * @memberof GemarkungModel
     */
    flurstuecke?: Set<FlurstueckModel>;
    /**
     * 
     * @type {MultiPolygonGeometryModel}
     * @memberof GemarkungModel
     */
    multiPolygon?: MultiPolygonGeometryModel;
}

export function GemarkungModelFromJSON(json: any): GemarkungModel {
    return GemarkungModelFromJSONTyped(json, false);
}

export function GemarkungModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): GemarkungModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nummer': !exists(json, 'nummer') ? undefined : json['nummer'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'flurstuecke': !exists(json, 'flurstuecke') ? undefined : (new Set((json['flurstuecke'] as Array<any>).map(FlurstueckModelFromJSON))),
        'multiPolygon': !exists(json, 'multiPolygon') ? undefined : MultiPolygonGeometryModelFromJSON(json['multiPolygon']),
    };
}

export function GemarkungModelToJSON(value?: GemarkungModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nummer': value.nummer,
        'name': value.name,
        'flurstuecke': value.flurstuecke === undefined ? undefined : (Array.from(value.flurstuecke as Set<any>).map(FlurstueckModelToJSON)),
        'multiPolygon': MultiPolygonGeometryModelToJSON(value.multiPolygon),
    };
}

