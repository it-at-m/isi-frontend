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
import type { AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto } from './AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto';
import {
    AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto';
import type { AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto } from './AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto';
import {
    AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto';
import type { VerortungMultiPolygonDto } from './VerortungMultiPolygonDto';
import {
    VerortungMultiPolygonDtoFromJSON,
    VerortungMultiPolygonDtoFromJSONTyped,
    VerortungMultiPolygonDtoToJSON,
} from './VerortungMultiPolygonDto';

/**
 * 
 * @export
 * @interface WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf
 */
export interface WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf {
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>}
     * @memberof WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf
     */
    abfragevariantenWeiteresVerfahren?: Array<AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto>}
     * @memberof WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf
     */
    abfragevariantenSachbearbeitungWeiteresVerfahren?: Array<AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto>;
}

/**
 * Check if a given object implements the WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf interface.
 */
export function instanceOfWeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSON(json: any): WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf {
    return WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSONTyped(json, false);
}

export function WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonDtoFromJSON(json['verortung']),
        'abfragevariantenWeiteresVerfahren': !exists(json, 'abfragevariantenWeiteresVerfahren') ? undefined : ((json['abfragevariantenWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': !exists(json, 'abfragevariantenSachbearbeitungWeiteresVerfahren') ? undefined : ((json['abfragevariantenSachbearbeitungWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSON)),
    };
}

export function WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOfToJSON(value?: WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'verortung': VerortungMultiPolygonDtoToJSON(value.verortung),
        'abfragevariantenWeiteresVerfahren': value.abfragevariantenWeiteresVerfahren === undefined ? undefined : ((value.abfragevariantenWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': value.abfragevariantenSachbearbeitungWeiteresVerfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoToJSON)),
    };
}

