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
import type { AdresseDto } from './AdresseDto';
import {
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import type { BearbeitendePersonDto } from './BearbeitendePersonDto';
import {
    BearbeitendePersonDtoFromJSON,
    BearbeitendePersonDtoFromJSONTyped,
    BearbeitendePersonDtoToJSON,
} from './BearbeitendePersonDto';
import type { InfrastruktureinrichtungDto } from './InfrastruktureinrichtungDto';
import {
    InfrastruktureinrichtungDtoFromJSON,
    InfrastruktureinrichtungDtoFromJSONTyped,
    InfrastruktureinrichtungDtoToJSON,
} from './InfrastruktureinrichtungDto';
import type { SchuleDto } from './SchuleDto';
import {
    SchuleDtoFromJSON,
    SchuleDtoFromJSONTyped,
    SchuleDtoToJSON,
} from './SchuleDto';
import type { VerortungPointDto } from './VerortungPointDto';
import {
    VerortungPointDtoFromJSON,
    VerortungPointDtoFromJSONTyped,
    VerortungPointDtoToJSON,
} from './VerortungPointDto';

import {
} from './';

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



/**
 * Check if a given object implements the GrundschuleDto interface.
 */
export function instanceOfGrundschuleDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "schule" in value;

    return isInstance;
}

export function GrundschuleDtoFromJSON(json: any): GrundschuleDto {
    return GrundschuleDtoFromJSONTyped(json, false);
}

export function GrundschuleDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): GrundschuleDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
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

