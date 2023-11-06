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
    AbfrageInBearbeitungSachbearbeitungDto,
    AbfrageInBearbeitungSachbearbeitungDtoFromJSON,
    AbfrageInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfrageInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfrageInBearbeitungSachbearbeitungDto';
import {
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto';
import {
    AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto,
    AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto';
import {
    BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf,
    BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSON,
    BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSONTyped,
    BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOfToJSON,
} from './BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoAllOf';
import {
    VerortungDto,
    VerortungDtoFromJSON,
    VerortungDtoFromJSONTyped,
    VerortungDtoToJSON,
} from './VerortungDto';

/**
 * 
 * @export
 * @interface BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
 */
export interface BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto extends AbfrageInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {VerortungDto}
     * @memberof BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    verortung?: VerortungDto;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>}
     * @memberof BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    abfragevariantenBaugenehmigungsverfahren: Array<AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto>}
     * @memberof BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren: Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto>;
}



export function BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSON(json: any): BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto {
    return BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...AbfrageInBearbeitungSachbearbeitungDtoFromJSONTyped(json, ignoreDiscriminator),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungDtoFromJSON(json['verortung']),
        'abfragevariantenBaugenehmigungsverfahren': ((json['abfragevariantenBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': ((json['abfragevariantenSachbearbeitungBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSON)),
    };
}

export function BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoToJSON(value?: BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageInBearbeitungSachbearbeitungDtoToJSON(value),
        'verortung': VerortungDtoToJSON(value.verortung),
        'abfragevariantenBaugenehmigungsverfahren': ((value.abfragevariantenBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': ((value.abfragevariantenSachbearbeitungBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoToJSON)),
    };
}

