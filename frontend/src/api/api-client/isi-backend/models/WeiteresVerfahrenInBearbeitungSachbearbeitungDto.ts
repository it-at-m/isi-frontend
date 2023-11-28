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
import type { AbfrageInBearbeitungSachbearbeitungDto } from './AbfrageInBearbeitungSachbearbeitungDto';
import {
    AbfrageInBearbeitungSachbearbeitungDtoFromJSON,
    AbfrageInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfrageInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfrageInBearbeitungSachbearbeitungDto';
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
import type { VerortungDto } from './VerortungDto';
import {
    VerortungDtoFromJSON,
    VerortungDtoFromJSONTyped,
    VerortungDtoToJSON,
} from './VerortungDto';

import {
} from './';

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



/**
 * Check if a given object implements the WeiteresVerfahrenInBearbeitungSachbearbeitungDto interface.
 */
export function instanceOfWeiteresVerfahrenInBearbeitungSachbearbeitungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "abfragevariantenWeiteresVerfahren" in value;
    isInstance = isInstance && "abfragevariantenSachbearbeitungWeiteresVerfahren" in value;

    return isInstance;
}

export function WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSON(json: any): WeiteresVerfahrenInBearbeitungSachbearbeitungDto {
    return WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeiteresVerfahrenInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
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

