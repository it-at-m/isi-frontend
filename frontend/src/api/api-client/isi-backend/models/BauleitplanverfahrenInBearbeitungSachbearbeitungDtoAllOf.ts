/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto } from './AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto';
import {
    AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto';
import type { AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto } from './AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto';
import {
    AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto';
import type { VerortungMultiPolygonDto } from './VerortungMultiPolygonDto';
import {
    VerortungMultiPolygonDtoFromJSON,
    VerortungMultiPolygonDtoFromJSONTyped,
    VerortungMultiPolygonDtoToJSON,
} from './VerortungMultiPolygonDto';

/**
 * 
 * @export
 * @interface BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf
 */
export interface BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf {
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>}
     * @memberof BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf
     */
    abfragevariantenBauleitplanverfahren?: Array<AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto>}
     * @memberof BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf
     */
    abfragevariantenSachbearbeitungBauleitplanverfahren?: Array<AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto>;
}

/**
 * Check if a given object implements the BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf interface.
 */
export function instanceOfBauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSON(json: any): BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf {
    return BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSONTyped(json, false);
}

export function BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonDtoFromJSON(json['verortung']),
        'abfragevariantenBauleitplanverfahren': !exists(json, 'abfragevariantenBauleitplanverfahren') ? undefined : ((json['abfragevariantenBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': !exists(json, 'abfragevariantenSachbearbeitungBauleitplanverfahren') ? undefined : ((json['abfragevariantenSachbearbeitungBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSON)),
    };
}

export function BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOfToJSON(value?: BauleitplanverfahrenInBearbeitungSachbearbeitungDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'verortung': VerortungMultiPolygonDtoToJSON(value.verortung),
        'abfragevariantenBauleitplanverfahren': value.abfragevariantenBauleitplanverfahren === undefined ? undefined : ((value.abfragevariantenBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': value.abfragevariantenSachbearbeitungBauleitplanverfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoToJSON)),
    };
}

