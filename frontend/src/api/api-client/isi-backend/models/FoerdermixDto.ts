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
    FoerderartDto,
    FoerderartDtoFromJSON,
    FoerderartDtoFromJSONTyped,
    FoerderartDtoToJSON,
} from './FoerderartDto';

/**
 * 
 * @export
 * @interface FoerdermixDto
 */
export interface FoerdermixDto {
    /**
     * 
     * @type {Array<FoerderartDto>}
     * @memberof FoerdermixDto
     */
    foerderarten?: Array<FoerderartDto>;
}

export function FoerdermixDtoFromJSON(json: any): FoerdermixDto {
    return FoerdermixDtoFromJSONTyped(json, false);
}

export function FoerdermixDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FoerdermixDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'foerderarten': !exists(json, 'foerderarten') ? undefined : ((json['foerderarten'] as Array<any>).map(FoerderartDtoFromJSON)),
    };
}

export function FoerdermixDtoToJSON(value?: FoerdermixDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'foerderarten': value.foerderarten === undefined ? undefined : ((value.foerderarten as Array<any>).map(FoerderartDtoToJSON)),
    };
}

