/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto } from './AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto';
import {
    AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto';

/**
 * 
 * @export
 * @interface WeiteresVerfahrenInBearbeitungFachreferatDtoAllOf
 */
export interface WeiteresVerfahrenInBearbeitungFachreferatDtoAllOf {
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto>}
     * @memberof WeiteresVerfahrenInBearbeitungFachreferatDtoAllOf
     */
    abfragevariantenWeiteresVerfahren?: Array<AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto>;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto>}
     * @memberof WeiteresVerfahrenInBearbeitungFachreferatDtoAllOf
     */
    abfragevariantenSachbearbeitungWeiteresVerfahren?: Array<AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto>;
}

/**
 * Check if a given object implements the WeiteresVerfahrenInBearbeitungFachreferatDtoAllOf interface.
 */
export function instanceOfWeiteresVerfahrenInBearbeitungFachreferatDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function WeiteresVerfahrenInBearbeitungFachreferatDtoAllOfFromJSON(json: any): WeiteresVerfahrenInBearbeitungFachreferatDtoAllOf {
    return WeiteresVerfahrenInBearbeitungFachreferatDtoAllOfFromJSONTyped(json, false);
}

export function WeiteresVerfahrenInBearbeitungFachreferatDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenInBearbeitungFachreferatDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'abfragevariantenWeiteresVerfahren': !exists(json, 'abfragevariantenWeiteresVerfahren') ? undefined : ((json['abfragevariantenWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': !exists(json, 'abfragevariantenSachbearbeitungWeiteresVerfahren') ? undefined : ((json['abfragevariantenSachbearbeitungWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSON)),
    };
}

export function WeiteresVerfahrenInBearbeitungFachreferatDtoAllOfToJSON(value?: WeiteresVerfahrenInBearbeitungFachreferatDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'abfragevariantenWeiteresVerfahren': value.abfragevariantenWeiteresVerfahren === undefined ? undefined : ((value.abfragevariantenWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoToJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': value.abfragevariantenSachbearbeitungWeiteresVerfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoToJSON)),
    };
}

