/* tslint:disable */
/* eslint-disable */
/**
 * ISI MAstER EAI
 * ISI MAstER EAI - Service zum Abfragen von Adressen von MAstER
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
    MuenchenAdresseDto,
    MuenchenAdresseDtoFromJSON,
    MuenchenAdresseDtoFromJSONTyped,
    MuenchenAdresseDtoToJSON,
} from './MuenchenAdresseDto';

/**
 * 
 * @export
 * @interface MuenchenAdresseCollectionDto
 */
export interface MuenchenAdresseCollectionDto {
    /**
     * 
     * @type {Array<MuenchenAdresseDto>}
     * @memberof MuenchenAdresseCollectionDto
     */
    adressen?: Array<MuenchenAdresseDto>;
}

export function MuenchenAdresseCollectionDtoFromJSON(json: any): MuenchenAdresseCollectionDto {
    return MuenchenAdresseCollectionDtoFromJSONTyped(json, false);
}

export function MuenchenAdresseCollectionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MuenchenAdresseCollectionDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'adressen': !exists(json, 'adressen') ? undefined : ((json['adressen'] as Array<any>).map(MuenchenAdresseDtoFromJSON)),
    };
}

export function MuenchenAdresseCollectionDtoToJSON(value?: MuenchenAdresseCollectionDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'adressen': value.adressen === undefined ? undefined : ((value.adressen as Array<any>).map(MuenchenAdresseDtoToJSON)),
    };
}
