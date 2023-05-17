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

import { exists, mapValues } from '../runtime';
import {
    FeatureDtoFlurstueckDto,
    FeatureDtoFlurstueckDtoFromJSON,
    FeatureDtoFlurstueckDtoFromJSONTyped,
    FeatureDtoFlurstueckDtoToJSON,
} from './FeatureDtoFlurstueckDto';

/**
 * 
 * @export
 * @interface FeatureCollectionDtoFeatureDtoFlurstueckDto
 */
export interface FeatureCollectionDtoFeatureDtoFlurstueckDto {
    /**
     * 
     * @type {string}
     * @memberof FeatureCollectionDtoFeatureDtoFlurstueckDto
     */
    type?: string;
    /**
     * 
     * @type {Array<FeatureDtoFlurstueckDto>}
     * @memberof FeatureCollectionDtoFeatureDtoFlurstueckDto
     */
    features?: Array<FeatureDtoFlurstueckDto>;
}

export function FeatureCollectionDtoFeatureDtoFlurstueckDtoFromJSON(json: any): FeatureCollectionDtoFeatureDtoFlurstueckDto {
    return FeatureCollectionDtoFeatureDtoFlurstueckDtoFromJSONTyped(json, false);
}

export function FeatureCollectionDtoFeatureDtoFlurstueckDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureCollectionDtoFeatureDtoFlurstueckDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'features': !exists(json, 'features') ? undefined : ((json['features'] as Array<any>).map(FeatureDtoFlurstueckDtoFromJSON)),
    };
}

export function FeatureCollectionDtoFeatureDtoFlurstueckDtoToJSON(value?: FeatureCollectionDtoFeatureDtoFlurstueckDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'features': value.features === undefined ? undefined : ((value.features as Array<any>).map(FeatureDtoFlurstueckDtoToJSON)),
    };
}
