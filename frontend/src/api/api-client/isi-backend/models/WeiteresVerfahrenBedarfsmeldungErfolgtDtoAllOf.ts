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
import type { AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto } from './AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto';
import {
    AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto';

/**
 * 
 * @export
 * @interface WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOf
 */
export interface WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOf {
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto>}
     * @memberof WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOf
     */
    abfragevariantenWeiteresVerfahren?: Array<AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto>;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto>}
     * @memberof WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOf
     */
    abfragevariantenSachbearbeitungWeiteresVerfahren?: Array<AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto>;
}

/**
 * Check if a given object implements the WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOf interface.
 */
export function instanceOfWeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOfFromJSON(json: any): WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOf {
    return WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOfFromJSONTyped(json, false);
}

export function WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'abfragevariantenWeiteresVerfahren': !exists(json, 'abfragevariantenWeiteresVerfahren') ? undefined : ((json['abfragevariantenWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': !exists(json, 'abfragevariantenSachbearbeitungWeiteresVerfahren') ? undefined : ((json['abfragevariantenSachbearbeitungWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON)),
    };
}

export function WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOfToJSON(value?: WeiteresVerfahrenBedarfsmeldungErfolgtDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'abfragevariantenWeiteresVerfahren': value.abfragevariantenWeiteresVerfahren === undefined ? undefined : ((value.abfragevariantenWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': value.abfragevariantenSachbearbeitungWeiteresVerfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON)),
    };
}

