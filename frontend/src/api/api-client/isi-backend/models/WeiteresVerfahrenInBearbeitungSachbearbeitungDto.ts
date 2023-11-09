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
    AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto,
    AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto';
import {
    AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto,
    AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON,
    AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto';
import {
    VerortungDto,
    VerortungDtoFromJSON,
    VerortungDtoFromJSONTyped,
    VerortungDtoToJSON,
} from './VerortungDto';
import {
    WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf,
    WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSON,
    WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOfFromJSONTyped,
    WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOfToJSON,
} from './WeiteresVerfahrenInBearbeitungSachbearbeitungDtoAllOf';

/**
 * 
 * @export
 * @interface WeiteresVerfahrenInBearbeitungSachbearbeitungDto
 */
export interface WeiteresVerfahrenInBearbeitungSachbearbeitungDto extends AbfrageInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {VerortungDto}
     * @memberof WeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    verortung?: VerortungDto;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>}
     * @memberof WeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    abfragevariantenWeiteresVerfahren: Array<AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>;
    /**
     * 
     * @type {Array<AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto>}
     * @memberof WeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    abfragevariantenSachbearbeitungWeiteresVerfahren: Array<AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto>;
}



export function WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSON(json: any): WeiteresVerfahrenInBearbeitungSachbearbeitungDto {
    return WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...AbfrageInBearbeitungSachbearbeitungDtoFromJSONTyped(json, ignoreDiscriminator),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungDtoFromJSON(json['verortung']),
        'abfragevariantenWeiteresVerfahren': ((json['abfragevariantenWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': ((json['abfragevariantenSachbearbeitungWeiteresVerfahren'] as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSON)),
    };
}

export function WeiteresVerfahrenInBearbeitungSachbearbeitungDtoToJSON(value?: WeiteresVerfahrenInBearbeitungSachbearbeitungDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageInBearbeitungSachbearbeitungDtoToJSON(value),
        'verortung': VerortungDtoToJSON(value.verortung),
        'abfragevariantenWeiteresVerfahren': ((value.abfragevariantenWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON)),
        'abfragevariantenSachbearbeitungWeiteresVerfahren': ((value.abfragevariantenSachbearbeitungWeiteresVerfahren as Array<any>).map(AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoToJSON)),
    };
}

