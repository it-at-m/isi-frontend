/* tslint:disable */
/* eslint-disable */
/**
 * ISI GEODATA EAI
 * ISI GEODATA EAI - Service zum Abfragen von Geoinformationen
 *
 * The version of the OpenAPI document: 1.1.0
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { FeatureDtoMittelschulsprengelDto } from './FeatureDtoMittelschulsprengelDto';
import {
    FeatureDtoMittelschulsprengelDtoFromJSON,
    FeatureDtoMittelschulsprengelDtoFromJSONTyped,
    FeatureDtoMittelschulsprengelDtoToJSON,
} from './FeatureDtoMittelschulsprengelDto';

/**
 * 
 * @export
 * @interface FeatureCollectionDtoFeatureDtoMittelschulsprengelDto
 */
export interface FeatureCollectionDtoFeatureDtoMittelschulsprengelDto {
    /**
     * 
     * @type {string}
     * @memberof FeatureCollectionDtoFeatureDtoMittelschulsprengelDto
     */
    type?: string;
    /**
     * 
     * @type {Array<FeatureDtoMittelschulsprengelDto>}
     * @memberof FeatureCollectionDtoFeatureDtoMittelschulsprengelDto
     */
    features?: Array<FeatureDtoMittelschulsprengelDto>;
}

/**
 * Check if a given object implements the FeatureCollectionDtoFeatureDtoMittelschulsprengelDto interface.
 */
export function instanceOfFeatureCollectionDtoFeatureDtoMittelschulsprengelDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeatureCollectionDtoFeatureDtoMittelschulsprengelDtoFromJSON(json: any): FeatureCollectionDtoFeatureDtoMittelschulsprengelDto {
    return FeatureCollectionDtoFeatureDtoMittelschulsprengelDtoFromJSONTyped(json, false);
}

export function FeatureCollectionDtoFeatureDtoMittelschulsprengelDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureCollectionDtoFeatureDtoMittelschulsprengelDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'features': !exists(json, 'features') ? undefined : ((json['features'] as Array<any>).map(FeatureDtoMittelschulsprengelDtoFromJSON)),
    };
}

export function FeatureCollectionDtoFeatureDtoMittelschulsprengelDtoToJSON(value?: FeatureCollectionDtoFeatureDtoMittelschulsprengelDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'features': value.features === undefined ? undefined : ((value.features as Array<any>).map(FeatureDtoMittelschulsprengelDtoToJSON)),
    };
}
