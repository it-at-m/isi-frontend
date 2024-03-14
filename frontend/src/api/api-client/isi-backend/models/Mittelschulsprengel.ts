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
import type { MultiPolygonGeometry } from './MultiPolygonGeometry';
import {
    MultiPolygonGeometryFromJSON,
    MultiPolygonGeometryFromJSONTyped,
    MultiPolygonGeometryToJSON,
} from './MultiPolygonGeometry';

/**
 * 
 * @export
 * @interface Mittelschulsprengel
 */
export interface Mittelschulsprengel {
    /**
     * 
     * @type {number}
     * @memberof Mittelschulsprengel
     */
    nummer?: number;
    /**
     * 
     * @type {MultiPolygonGeometry}
     * @memberof Mittelschulsprengel
     */
    multiPolygon?: MultiPolygonGeometry;
}

/**
 * Check if a given object implements the Mittelschulsprengel interface.
 */
export function instanceOfMittelschulsprengel(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MittelschulsprengelFromJSON(json: any): Mittelschulsprengel {
    return MittelschulsprengelFromJSONTyped(json, false);
}

export function MittelschulsprengelFromJSONTyped(json: any, ignoreDiscriminator: boolean): Mittelschulsprengel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nummer': !exists(json, 'nummer') ? undefined : json['nummer'],
        'multiPolygon': !exists(json, 'multiPolygon') ? undefined : MultiPolygonGeometryFromJSON(json['multiPolygon']),
    };
}

export function MittelschulsprengelToJSON(value?: Mittelschulsprengel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nummer': value.nummer,
        'multiPolygon': MultiPolygonGeometryToJSON(value.multiPolygon),
    };
}

