/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.3.0
 * Contact: noreply@mail.de
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
import type { AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto } from './AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto';
import {
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSONTyped,
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoToJSON,
} from './AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto';

import {
} from './';

/**
 * 
 * @export
 * @interface BaugenehmigungsverfahrenInBearbeitungFachreferatDto
 */
export interface BaugenehmigungsverfahrenInBearbeitungFachreferatDto extends AbfrageInBearbeitungFachreferatDto {
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto>}
     * @memberof BaugenehmigungsverfahrenInBearbeitungFachreferatDto
     */
    abfragevariantenBaugenehmigungsverfahren: Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto>}
     * @memberof BaugenehmigungsverfahrenInBearbeitungFachreferatDto
     */
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren: Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto>;
}



/**
 * Check if a given object implements the BaugenehmigungsverfahrenInBearbeitungFachreferatDto interface.
 */
export function instanceOfBaugenehmigungsverfahrenInBearbeitungFachreferatDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "abfragevariantenBaugenehmigungsverfahren" in value;
    isInstance = isInstance && "abfragevariantenSachbearbeitungBaugenehmigungsverfahren" in value;

    return isInstance;
}

export function BaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSON(json: any): BaugenehmigungsverfahrenInBearbeitungFachreferatDto {
    return BaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, false);
}

export function BaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugenehmigungsverfahrenInBearbeitungFachreferatDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...AbfrageInBearbeitungFachreferatDtoFromJSONTyped(json, ignoreDiscriminator),
        'abfragevariantenBaugenehmigungsverfahren': ((json['abfragevariantenBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': ((json['abfragevariantenSachbearbeitungBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSON)),
    };
}

export function BaugenehmigungsverfahrenInBearbeitungFachreferatDtoToJSON(value?: BaugenehmigungsverfahrenInBearbeitungFachreferatDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageInBearbeitungFachreferatDtoToJSON(value),
        'abfragevariantenBaugenehmigungsverfahren': ((value.abfragevariantenBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoToJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': ((value.abfragevariantenSachbearbeitungBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoToJSON)),
    };
}

