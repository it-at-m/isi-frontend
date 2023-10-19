/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
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
    AdresseDto,
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import {
    GrundschuleDtoAllOf,
    GrundschuleDtoAllOfFromJSON,
    GrundschuleDtoAllOfFromJSONTyped,
    GrundschuleDtoAllOfToJSON,
} from './GrundschuleDtoAllOf';
import {
    InfrastruktureinrichtungDto,
    InfrastruktureinrichtungDtoFromJSON,
    InfrastruktureinrichtungDtoFromJSONTyped,
    InfrastruktureinrichtungDtoToJSON,
} from './InfrastruktureinrichtungDto';
import {
    SchuleDto,
    SchuleDtoFromJSON,
    SchuleDtoFromJSONTyped,
    SchuleDtoToJSON,
} from './SchuleDto';

/**
 * 
 * @export
 * @interface GrundschuleDto
 */
export interface GrundschuleDto extends InfrastruktureinrichtungDto {
    /**
     * 
     * @type {SchuleDto}
     * @memberof GrundschuleDto
     */
    schule: SchuleDto;
}



export function GrundschuleDtoFromJSON(json: any): GrundschuleDto {
    return GrundschuleDtoFromJSONTyped(json, false);
}

export function GrundschuleDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): GrundschuleDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...InfrastruktureinrichtungDtoFromJSONTyped(json, ignoreDiscriminator),
        'schule': SchuleDtoFromJSON(json['schule']),
    };
}

export function GrundschuleDtoToJSON(value?: GrundschuleDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...InfrastruktureinrichtungDtoToJSON(value),
        'schule': SchuleDtoToJSON(value.schule),
    };
}

