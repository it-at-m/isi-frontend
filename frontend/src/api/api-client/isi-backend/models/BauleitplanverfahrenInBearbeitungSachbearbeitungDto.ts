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
import type { AbfrageInBearbeitungSachbearbeitungDto } from './AbfrageInBearbeitungSachbearbeitungDto';
import {
    AbfrageInBearbeitungSachbearbeitungDtoFromJSON,
    AbfrageInBearbeitungSachbearbeitungDtoFromJSONTyped,
    AbfrageInBearbeitungSachbearbeitungDtoToJSON,
} from './AbfrageInBearbeitungSachbearbeitungDto';
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
 * @interface BauleitplanverfahrenInBearbeitungSachbearbeitungDto
 */
export interface BauleitplanverfahrenInBearbeitungSachbearbeitungDto extends AbfrageInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {VerortungDto}
     * @memberof BauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    verortung?: VerortungDto;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>}
     * @memberof BauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    abfragevariantenBauleitplanverfahren: Array<AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto>}
     * @memberof BauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    abfragevariantenSachbearbeitungBauleitplanverfahren: Array<AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto>;
}



/**
 * Check if a given object implements the BauleitplanverfahrenInBearbeitungSachbearbeitungDto interface.
 */
export function instanceOfBauleitplanverfahrenInBearbeitungSachbearbeitungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "abfragevariantenBauleitplanverfahren" in value;
    isInstance = isInstance && "abfragevariantenSachbearbeitungBauleitplanverfahren" in value;

    return isInstance;
}

export function BauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSON(json: any): BauleitplanverfahrenInBearbeitungSachbearbeitungDto {
    return BauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function BauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauleitplanverfahrenInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...AbfrageInBearbeitungSachbearbeitungDtoFromJSONTyped(json, ignoreDiscriminator),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungDtoFromJSON(json['verortung']),
        'abfragevariantenBauleitplanverfahren': ((json['abfragevariantenBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': ((json['abfragevariantenSachbearbeitungBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSON)),
    };
}

export function BauleitplanverfahrenInBearbeitungSachbearbeitungDtoToJSON(value?: BauleitplanverfahrenInBearbeitungSachbearbeitungDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageInBearbeitungSachbearbeitungDtoToJSON(value),
        'verortung': VerortungDtoToJSON(value.verortung),
        'abfragevariantenBauleitplanverfahren': ((value.abfragevariantenBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': ((value.abfragevariantenSachbearbeitungBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoToJSON)),
    };
}

