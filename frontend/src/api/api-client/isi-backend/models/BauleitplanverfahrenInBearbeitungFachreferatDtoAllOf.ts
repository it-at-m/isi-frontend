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
    AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto,
    AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSON,
    AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped,
    AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoToJSON,
} from './AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto';

/**
 * 
 * @export
 * @interface BauleitplanverfahrenInBearbeitungFachreferatDtoAllOf
 */
export interface BauleitplanverfahrenInBearbeitungFachreferatDtoAllOf {
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto>}
     * @memberof BauleitplanverfahrenInBearbeitungFachreferatDtoAllOf
     */
    abfragevariantenBauleitplanverfahren?: Array<AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto>}
     * @memberof BauleitplanverfahrenInBearbeitungFachreferatDtoAllOf
     */
    abfragevariantenSachbearbeitungBauleitplanverfahren?: Array<AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDto>;
}

export function BauleitplanverfahrenInBearbeitungFachreferatDtoAllOfFromJSON(json: any): BauleitplanverfahrenInBearbeitungFachreferatDtoAllOf {
    return BauleitplanverfahrenInBearbeitungFachreferatDtoAllOfFromJSONTyped(json, false);
}

export function BauleitplanverfahrenInBearbeitungFachreferatDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauleitplanverfahrenInBearbeitungFachreferatDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'abfragevariantenBauleitplanverfahren': !exists(json, 'abfragevariantenBauleitplanverfahren') ? undefined : ((json['abfragevariantenBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': !exists(json, 'abfragevariantenSachbearbeitungBauleitplanverfahren') ? undefined : ((json['abfragevariantenSachbearbeitungBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoFromJSON)),
    };
}

export function BauleitplanverfahrenInBearbeitungFachreferatDtoAllOfToJSON(value?: BauleitplanverfahrenInBearbeitungFachreferatDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'abfragevariantenBauleitplanverfahren': value.abfragevariantenBauleitplanverfahren === undefined ? undefined : ((value.abfragevariantenBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoToJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': value.abfragevariantenSachbearbeitungBauleitplanverfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungFachreferatDtoToJSON)),
    };
}

