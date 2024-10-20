/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.4.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { FoerdermixDto } from './FoerdermixDto';
import {
    FoerdermixDtoFromJSON,
    FoerdermixDtoFromJSONTyped,
    FoerdermixDtoToJSON,
} from './FoerdermixDto';

/**
 * 
 * @export
 * @interface FoerdermixStammDto
 */
export interface FoerdermixStammDto {
    /**
     * 
     * @type {string}
     * @memberof FoerdermixStammDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof FoerdermixStammDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof FoerdermixStammDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof FoerdermixStammDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {FoerdermixDto}
     * @memberof FoerdermixStammDto
     */
    foerdermix: FoerdermixDto;
}

/**
 * Check if a given object implements the FoerdermixStammDto interface.
 */
export function instanceOfFoerdermixStammDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "foerdermix" in value;

    return isInstance;
}

export function FoerdermixStammDtoFromJSON(json: any): FoerdermixStammDto {
    return FoerdermixStammDtoFromJSONTyped(json, false);
}

export function FoerdermixStammDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FoerdermixStammDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'foerdermix': FoerdermixDtoFromJSON(json['foerdermix']),
    };
}

export function FoerdermixStammDtoToJSON(value?: FoerdermixStammDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'foerdermix': FoerdermixDtoToJSON(value.foerdermix),
    };
}

