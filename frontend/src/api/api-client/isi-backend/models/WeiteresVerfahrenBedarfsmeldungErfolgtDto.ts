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
import type { AbfrageBedarfsmeldungErfolgtDto } from './AbfrageBedarfsmeldungErfolgtDto';
import {
    AbfrageBedarfsmeldungErfolgtDtoFromJSON,
    AbfrageBedarfsmeldungErfolgtDtoFromJSONTyped,
    AbfrageBedarfsmeldungErfolgtDtoToJSON,
} from './AbfrageBedarfsmeldungErfolgtDto';
import type { AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto } from './AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto';
import {
    AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto';

import {
} from './';

/**
 * 
 * @export
 * @interface WeiteresVerfahrenBedarfsmeldungErfolgtDto
 */
export interface WeiteresVerfahrenBedarfsmeldungErfolgtDto extends AbfrageBedarfsmeldungErfolgtDto {
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto>}
     * @memberof WeiteresVerfahrenBedarfsmeldungErfolgtDto
     */
    abfragevariantenWeiteresVerfahren: Array<AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto>;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto>}
     * @memberof WeiteresVerfahrenBedarfsmeldungErfolgtDto
     */
    abfragevariantenSachbearbeitungWeiteresVerfahren: Array<AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto>;
}



/**
 * Check if a given object implements the WeiteresVerfahrenBedarfsmeldungErfolgtDto interface.
 */
export function instanceOfWeiteresVerfahrenBedarfsmeldungErfolgtDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "abfragevariantenWeiteresVerfahren" in value;
    isInstance = isInstance && "abfragevariantenSachbearbeitungWeiteresVerfahren" in value;

    return isInstance;
}

export function WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON(json: any): WeiteresVerfahrenBedarfsmeldungErfolgtDto {
    return WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, false);
}

export function WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenBedarfsmeldungErfolgtDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...AbfrageBedarfsmeldungErfolgtDtoFromJSONTyped(json, ignoreDiscriminator),
        'abfragevariantenWeiteresVerfahren': ((json['abfragevariantenWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': ((json['abfragevariantenSachbearbeitungWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON)),
    };
}

export function WeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON(value?: WeiteresVerfahrenBedarfsmeldungErfolgtDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageBedarfsmeldungErfolgtDtoToJSON(value),
        'abfragevariantenWeiteresVerfahren': ((value.abfragevariantenWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': ((value.abfragevariantenSachbearbeitungWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON)),
    };
}

