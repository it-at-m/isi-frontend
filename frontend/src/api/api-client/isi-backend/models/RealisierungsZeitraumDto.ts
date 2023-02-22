/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
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
 * @interface RealisierungsZeitraumDto
 */
export interface RealisierungsZeitraumDto {
    /**
     * 
     * @type {number}
     * @memberof RealisierungsZeitraumDto
     */
    realisierungVon?: number;
    /**
     * 
     * @type {number}
     * @memberof RealisierungsZeitraumDto
     */
    realisierungBis?: number;
}

export function RealisierungsZeitraumDtoFromJSON(json: any): RealisierungsZeitraumDto {
    return RealisierungsZeitraumDtoFromJSONTyped(json, false);
}

export function RealisierungsZeitraumDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RealisierungsZeitraumDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'realisierungVon': !exists(json, 'realisierungVon') ? undefined : json['realisierungVon'],
        'realisierungBis': !exists(json, 'realisierungBis') ? undefined : json['realisierungBis'],
    };
}

export function RealisierungsZeitraumDtoToJSON(value?: RealisierungsZeitraumDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'realisierungVon': value.realisierungVon,
        'realisierungBis': value.realisierungBis,
    };
}
