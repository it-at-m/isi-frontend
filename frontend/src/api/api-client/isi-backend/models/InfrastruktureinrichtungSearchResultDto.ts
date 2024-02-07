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
import type { SearchResultDto } from './SearchResultDto';
import {
    SearchResultDtoFromJSON,
    SearchResultDtoFromJSONTyped,
    SearchResultDtoToJSON,
} from './SearchResultDto';
import type { Wgs84Dto } from './Wgs84Dto';
import {
    Wgs84DtoFromJSON,
    Wgs84DtoFromJSONTyped,
    Wgs84DtoToJSON,
} from './Wgs84Dto';

import {
} from './';

/**
 * 
 * @export
 * @interface InfrastruktureinrichtungSearchResultDto
 */
export interface InfrastruktureinrichtungSearchResultDto extends SearchResultDto {
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungSearchResultDto
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungSearchResultDto
     */
    nameEinrichtung?: string;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungSearchResultDto
     */
    infrastruktureinrichtungTyp?: InfrastruktureinrichtungSearchResultDtoInfrastruktureinrichtungTypEnum;
    /**
     * 
     * @type {Wgs84Dto}
     * @memberof InfrastruktureinrichtungSearchResultDto
     */
    coordinate?: Wgs84Dto;
}


/**
 * @export
 */
export const InfrastruktureinrichtungSearchResultDtoInfrastruktureinrichtungTypEnum = {
    Unspecified: 'UNSPECIFIED',
    Kinderkrippe: 'KINDERKRIPPE',
    Kindergarten: 'KINDERGARTEN',
    GsNachmittagBetreuung: 'GS_NACHMITTAG_BETREUUNG',
    HausFuerKinder: 'HAUS_FUER_KINDER',
    Grundschule: 'GRUNDSCHULE',
    Mittelschule: 'MITTELSCHULE'
} as const;
export type InfrastruktureinrichtungSearchResultDtoInfrastruktureinrichtungTypEnum = typeof InfrastruktureinrichtungSearchResultDtoInfrastruktureinrichtungTypEnum[keyof typeof InfrastruktureinrichtungSearchResultDtoInfrastruktureinrichtungTypEnum];


/**
 * Check if a given object implements the InfrastruktureinrichtungSearchResultDto interface.
 */
export function instanceOfInfrastruktureinrichtungSearchResultDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function InfrastruktureinrichtungSearchResultDtoFromJSON(json: any): InfrastruktureinrichtungSearchResultDto {
    return InfrastruktureinrichtungSearchResultDtoFromJSONTyped(json, false);
}

export function InfrastruktureinrichtungSearchResultDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InfrastruktureinrichtungSearchResultDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...SearchResultDtoFromJSONTyped(json, ignoreDiscriminator),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'nameEinrichtung': !exists(json, 'nameEinrichtung') ? undefined : json['nameEinrichtung'],
        'infrastruktureinrichtungTyp': !exists(json, 'infrastruktureinrichtungTyp') ? undefined : json['infrastruktureinrichtungTyp'],
        'coordinate': !exists(json, 'coordinate') ? undefined : Wgs84DtoFromJSON(json['coordinate']),
    };
}

export function InfrastruktureinrichtungSearchResultDtoToJSON(value?: InfrastruktureinrichtungSearchResultDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...SearchResultDtoToJSON(value),
        'id': value.id,
        'nameEinrichtung': value.nameEinrichtung,
        'infrastruktureinrichtungTyp': value.infrastruktureinrichtungTyp,
        'coordinate': Wgs84DtoToJSON(value.coordinate),
    };
}

