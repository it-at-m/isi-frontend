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
import type { MultiPolygonGeometryModel } from './MultiPolygonGeometryModel';
import {
    MultiPolygonGeometryModelFromJSON,
    MultiPolygonGeometryModelFromJSONTyped,
    MultiPolygonGeometryModelToJSON,
} from './MultiPolygonGeometryModel';

/**
 * 
 * @export
 * @interface MittelschulsprengelDto
 */
export interface MittelschulsprengelDto {
    /**
     * 
     * @type {number}
     * @memberof MittelschulsprengelDto
     */
    nummer?: number;
    /**
     * 
     * @type {MultiPolygonGeometryModel}
     * @memberof MittelschulsprengelDto
     */
    multiPolygon: MultiPolygonGeometryModel;
}

/**
 * Check if a given object implements the MittelschulsprengelDto interface.
 */
export function instanceOfMittelschulsprengelDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "multiPolygon" in value;

    return isInstance;
}

export function MittelschulsprengelDtoFromJSON(json: any): MittelschulsprengelDto {
    return MittelschulsprengelDtoFromJSONTyped(json, false);
}

export function MittelschulsprengelDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MittelschulsprengelDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nummer': !exists(json, 'nummer') ? undefined : json['nummer'],
        'multiPolygon': MultiPolygonGeometryModelFromJSON(json['multiPolygon']),
    };
}

export function MittelschulsprengelDtoToJSON(value?: MittelschulsprengelDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nummer': value.nummer,
        'multiPolygon': MultiPolygonGeometryModelToJSON(value.multiPolygon),
    };
}

