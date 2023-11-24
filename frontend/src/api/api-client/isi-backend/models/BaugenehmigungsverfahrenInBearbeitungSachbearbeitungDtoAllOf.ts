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
import type { AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto } from './AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto';
import {
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto';
import type { AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto } from './AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto';
import {
    AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto';
import type { VerortungMultiPolygonDto } from './VerortungMultiPolygonDto';
import {
    VerortungMultiPolygonDtoFromJSON,
    VerortungMultiPolygonDtoFromJSONTyped,
    VerortungMultiPolygonDtoToJSON,
} from './VerortungMultiPolygonDto';

/**
 * 
 * @export
 * @interface BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf
 */
export interface BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf {
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>}
     * @memberof BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf
     */
    abfragevariantenBaugenehmigungsverfahren?: Array<AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto>}
     * @memberof BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf
     */
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren?: Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto>;
}

/**
 * Check if a given object implements the BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf interface.
 */
export function instanceOfBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSON(json: any): BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf {
    return BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSONTyped(json, false);
}

export function BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonDtoFromJSON(json['verortung']),
        'abfragevariantenBaugenehmigungsverfahren': !exists(json, 'abfragevariantenBaugenehmigungsverfahren') ? undefined : ((json['abfragevariantenBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': !exists(json, 'abfragevariantenSachbearbeitungBaugenehmigungsverfahren') ? undefined : ((json['abfragevariantenSachbearbeitungBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSON)),
    };
}

export function BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOfToJSON(value?: BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'verortung': VerortungMultiPolygonDtoToJSON(value.verortung),
        'abfragevariantenBaugenehmigungsverfahren': value.abfragevariantenBaugenehmigungsverfahren === undefined ? undefined : ((value.abfragevariantenBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': value.abfragevariantenSachbearbeitungBaugenehmigungsverfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoToJSON)),
    };
}

