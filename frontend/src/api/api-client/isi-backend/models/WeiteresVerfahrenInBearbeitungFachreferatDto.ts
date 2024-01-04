/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AbfrageInBearbeitungFachreferatDto } from './AbfrageInBearbeitungFachreferatDto';
import {
    AbfrageInBearbeitungFachreferatDtoFromJSON,
    AbfrageInBearbeitungFachreferatDtoFromJSONTyped,
    AbfrageInBearbeitungFachreferatDtoToJSON,
} from './AbfrageInBearbeitungFachreferatDto';
import type { AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto } from './AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto';
import {
    AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto';

import {
} from './';

/**
 * 
 * @export
 * @interface WeiteresVerfahrenInBearbeitungFachreferatDto
 */
export interface WeiteresVerfahrenInBearbeitungFachreferatDto extends AbfrageInBearbeitungFachreferatDto {
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto>}
     * @memberof WeiteresVerfahrenInBearbeitungFachreferatDto
     */
    abfragevariantenWeiteresVerfahren: Array<AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto>;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto>}
     * @memberof WeiteresVerfahrenInBearbeitungFachreferatDto
     */
    abfragevariantenSachbearbeitungWeiteresVerfahren: Array<AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto>;
}



/**
 * Check if a given object implements the WeiteresVerfahrenInBearbeitungFachreferatDto interface.
 */
export function instanceOfWeiteresVerfahrenInBearbeitungFachreferatDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "abfragevariantenWeiteresVerfahren" in value;
    isInstance = isInstance && "abfragevariantenSachbearbeitungWeiteresVerfahren" in value;

    return isInstance;
}

export function WeiteresVerfahrenInBearbeitungFachreferatDtoFromJSON(json: any): WeiteresVerfahrenInBearbeitungFachreferatDto {
    return WeiteresVerfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, false);
}

export function WeiteresVerfahrenInBearbeitungFachreferatDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenInBearbeitungFachreferatDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...AbfrageInBearbeitungFachreferatDtoFromJSONTyped(json, ignoreDiscriminator),
        'abfragevariantenWeiteresVerfahren': ((json['abfragevariantenWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': ((json['abfragevariantenSachbearbeitungWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSON)),
    };
}

export function WeiteresVerfahrenInBearbeitungFachreferatDtoToJSON(value?: WeiteresVerfahrenInBearbeitungFachreferatDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageInBearbeitungFachreferatDtoToJSON(value),
        'abfragevariantenWeiteresVerfahren': ((value.abfragevariantenWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoToJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': ((value.abfragevariantenSachbearbeitungWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoToJSON)),
    };
}

