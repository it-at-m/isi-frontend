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
import type { AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto } from './AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto';
import {
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSONTyped,
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoToJSON,
} from './AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto';

/**
 * 
 * @export
 * @interface BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOf
 */
export interface BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOf {
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto>}
     * @memberof BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOf
     */
    abfragevariantenBaugenehmigungsverfahren?: Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto>}
     * @memberof BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOf
     */
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren?: Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto>;
}

/**
 * Check if a given object implements the BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOf interface.
 */
export function instanceOfBaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOfFromJSON(json: any): BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOf {
    return BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOfFromJSONTyped(json, false);
}

export function BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'abfragevariantenBaugenehmigungsverfahren': !exists(json, 'abfragevariantenBaugenehmigungsverfahren') ? undefined : ((json['abfragevariantenBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': !exists(json, 'abfragevariantenSachbearbeitungBaugenehmigungsverfahren') ? undefined : ((json['abfragevariantenSachbearbeitungBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSON)),
    };
}

export function BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOfToJSON(value?: BaugenehmigungsverfahrenInBearbeitungFachreferatDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'abfragevariantenBaugenehmigungsverfahren': value.abfragevariantenBaugenehmigungsverfahren === undefined ? undefined : ((value.abfragevariantenBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoToJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': value.abfragevariantenSachbearbeitungBaugenehmigungsverfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoToJSON)),
    };
}

