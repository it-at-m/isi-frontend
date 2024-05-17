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
import type { AbfrageBedarfsmeldungErfolgtDto } from './AbfrageBedarfsmeldungErfolgtDto';
import {
    AbfrageBedarfsmeldungErfolgtDtoFromJSON,
    AbfrageBedarfsmeldungErfolgtDtoFromJSONTyped,
    AbfrageBedarfsmeldungErfolgtDtoToJSON,
} from './AbfrageBedarfsmeldungErfolgtDto';
import type { AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto } from './AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto';
import {
    AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
    AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoToJSON,
} from './AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto';

/**
 * 
 * @export
 * @interface BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto
 */
export interface BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto extends AbfrageBedarfsmeldungErfolgtDto {
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto>}
     * @memberof BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto
     */
    abfragevariantenBaugenehmigungsverfahren: Array<AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto>}
     * @memberof BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto
     */
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren: Array<AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto>;
}



/**
 * Check if a given object implements the BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto interface.
 */
export function instanceOfBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "abfragevariantenBaugenehmigungsverfahren" in value;
    isInstance = isInstance && "abfragevariantenSachbearbeitungBaugenehmigungsverfahren" in value;

    return isInstance;
}

export function BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSON(json: any): BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto {
    return BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, false);
}

export function BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...AbfrageBedarfsmeldungErfolgtDtoFromJSONTyped(json, ignoreDiscriminator),
        'abfragevariantenBaugenehmigungsverfahren': ((json['abfragevariantenBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': ((json['abfragevariantenSachbearbeitungBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSON)),
    };
}

export function BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoToJSON(value?: BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageBedarfsmeldungErfolgtDtoToJSON(value),
        'abfragevariantenBaugenehmigungsverfahren': ((value.abfragevariantenBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoToJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': ((value.abfragevariantenSachbearbeitungBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoToJSON)),
    };
}

