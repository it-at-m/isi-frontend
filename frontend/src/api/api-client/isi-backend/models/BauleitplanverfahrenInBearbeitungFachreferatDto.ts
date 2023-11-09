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
    AbfrageInBearbeitungFachreferatDto,
    AbfrageInBearbeitungFachreferatDtoFromJSON,
    AbfrageInBearbeitungFachreferatDtoFromJSONTyped,
    AbfrageInBearbeitungFachreferatDtoToJSON,
} from './AbfrageInBearbeitungFachreferatDto';
import {
    AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto,
    AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSON,
    AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped,
    AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoToJSON,
} from './AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto';
import {
    BauleitplanverfahrenInBearbeitungFachreferatDtoAllOf,
    BauleitplanverfahrenInBearbeitungFachreferatDtoAllOfFromJSON,
    BauleitplanverfahrenInBearbeitungFachreferatDtoAllOfFromJSONTyped,
    BauleitplanverfahrenInBearbeitungFachreferatDtoAllOfToJSON,
} from './BauleitplanverfahrenInBearbeitungFachreferatDtoAllOf';

/**
 * 
 * @export
 * @interface BauleitplanverfahrenInBearbeitungFachreferatDto
 */
export interface BauleitplanverfahrenInBearbeitungFachreferatDto extends AbfrageInBearbeitungFachreferatDto {
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto>}
     * @memberof BauleitplanverfahrenInBearbeitungFachreferatDto
     */
    abfragevariantenBauleitplanverfahren: Array<AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto>}
     * @memberof BauleitplanverfahrenInBearbeitungFachreferatDto
     */
    abfragevariantenSachbearbeitungBauleitplanverfahren: Array<AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto>;
}



export function BauleitplanverfahrenInBearbeitungFachreferatDtoFromJSON(json: any): BauleitplanverfahrenInBearbeitungFachreferatDto {
    return BauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, false);
}

export function BauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauleitplanverfahrenInBearbeitungFachreferatDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...AbfrageInBearbeitungFachreferatDtoFromJSONTyped(json, ignoreDiscriminator),
        'abfragevariantenBauleitplanverfahren': ((json['abfragevariantenBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': ((json['abfragevariantenSachbearbeitungBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSON)),
    };
}

export function BauleitplanverfahrenInBearbeitungFachreferatDtoToJSON(value?: BauleitplanverfahrenInBearbeitungFachreferatDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageInBearbeitungFachreferatDtoToJSON(value),
        'abfragevariantenBauleitplanverfahren': ((value.abfragevariantenBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoToJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': ((value.abfragevariantenSachbearbeitungBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoToJSON)),
    };
}

