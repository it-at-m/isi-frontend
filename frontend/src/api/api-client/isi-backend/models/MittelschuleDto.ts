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
 * @interface MittelschuleDto
 */
export interface MittelschuleDto extends InfrastruktureinrichtungDto {
    /**
     * 
     * @type {SchuleDto}
     * @memberof MittelschuleDto
     */
    schule: SchuleDto;
}



/**
 * Check if a given object implements the MittelschuleDto interface.
 */
export function instanceOfMittelschuleDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "schule" in value;

    return isInstance;
}

export function MittelschuleDtoFromJSON(json: any): MittelschuleDto {
    return MittelschuleDtoFromJSONTyped(json, false);
}

export function MittelschuleDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MittelschuleDto {
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

export function MittelschuleDtoToJSON(value?: MittelschuleDto | null): any {
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

