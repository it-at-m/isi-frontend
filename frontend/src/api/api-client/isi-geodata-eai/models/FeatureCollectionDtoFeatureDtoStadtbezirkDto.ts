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
    FeatureDtoStadtbezirkDto,
    FeatureDtoStadtbezirkDtoFromJSON,
    FeatureDtoStadtbezirkDtoFromJSONTyped,
    FeatureDtoStadtbezirkDtoToJSON,
} from './FeatureDtoStadtbezirkDto';

/**
 * 
 * @export
 * @interface FeatureCollectionDtoFeatureDtoStadtbezirkDto
 */
export interface FeatureCollectionDtoFeatureDtoStadtbezirkDto {
    /**
     * 
     * @type {string}
     * @memberof FeatureCollectionDtoFeatureDtoStadtbezirkDto
     */
    type?: string;
    /**
     * 
     * @type {Array<FeatureDtoStadtbezirkDto>}
     * @memberof FeatureCollectionDtoFeatureDtoStadtbezirkDto
     */
    features?: Array<FeatureDtoStadtbezirkDto>;
}

export function FeatureCollectionDtoFeatureDtoStadtbezirkDtoFromJSON(json: any): FeatureCollectionDtoFeatureDtoStadtbezirkDto {
    return FeatureCollectionDtoFeatureDtoStadtbezirkDtoFromJSONTyped(json, false);
}

export function FeatureCollectionDtoFeatureDtoStadtbezirkDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureCollectionDtoFeatureDtoStadtbezirkDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'features': !exists(json, 'features') ? undefined : ((json['features'] as Array<any>).map(FeatureDtoStadtbezirkDtoFromJSON)),
    };
}

export function FeatureCollectionDtoFeatureDtoStadtbezirkDtoToJSON(value?: FeatureCollectionDtoFeatureDtoStadtbezirkDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'features': value.features === undefined ? undefined : ((value.features as Array<any>).map(FeatureDtoStadtbezirkDtoToJSON)),
    };
}

