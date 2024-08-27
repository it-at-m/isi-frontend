/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.4.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    BaugenehmigungsverfahrenDto,
    instanceOfBaugenehmigungsverfahrenDto,
    BaugenehmigungsverfahrenDtoFromJSON,
    BaugenehmigungsverfahrenDtoFromJSONTyped,
    BaugenehmigungsverfahrenDtoToJSON,
} from './BaugenehmigungsverfahrenDto';
import {
    BauleitplanverfahrenDto,
    instanceOfBauleitplanverfahrenDto,
    BauleitplanverfahrenDtoFromJSON,
    BauleitplanverfahrenDtoFromJSONTyped,
    BauleitplanverfahrenDtoToJSON,
} from './BauleitplanverfahrenDto';
import {
    WeiteresVerfahrenDto,
    instanceOfWeiteresVerfahrenDto,
    WeiteresVerfahrenDtoFromJSON,
    WeiteresVerfahrenDtoFromJSONTyped,
    WeiteresVerfahrenDtoToJSON,
} from './WeiteresVerfahrenDto';

/**
 * @type Save201Response
 * 
 * @export
 */
export type Save201Response = { artAbfrage: 'BAUGENEHMIGUNGSVERFAHREN' } & BaugenehmigungsverfahrenDto | { artAbfrage: 'BAULEITPLANVERFAHREN' } & BauleitplanverfahrenDto | { artAbfrage: 'BaugenehmigungsverfahrenDto' } & BaugenehmigungsverfahrenDto | { artAbfrage: 'BauleitplanverfahrenDto' } & BauleitplanverfahrenDto | { artAbfrage: 'WEITERES_VERFAHREN' } & WeiteresVerfahrenDto | { artAbfrage: 'WeiteresVerfahrenDto' } & WeiteresVerfahrenDto;

export function Save201ResponseFromJSON(json: any): Save201Response {
    return Save201ResponseFromJSONTyped(json, false);
}

export function Save201ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): Save201Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    switch (json['artAbfrage']) {
        case 'BAUGENEHMIGUNGSVERFAHREN':
            return {...BaugenehmigungsverfahrenDtoFromJSONTyped(json, true), artAbfrage: 'BAUGENEHMIGUNGSVERFAHREN'};
        case 'BAULEITPLANVERFAHREN':
            return {...BauleitplanverfahrenDtoFromJSONTyped(json, true), artAbfrage: 'BAULEITPLANVERFAHREN'};
        case 'BaugenehmigungsverfahrenDto':
            return {...BaugenehmigungsverfahrenDtoFromJSONTyped(json, true), artAbfrage: 'BaugenehmigungsverfahrenDto'};
        case 'BauleitplanverfahrenDto':
            return {...BauleitplanverfahrenDtoFromJSONTyped(json, true), artAbfrage: 'BauleitplanverfahrenDto'};
        case 'WEITERES_VERFAHREN':
            return {...WeiteresVerfahrenDtoFromJSONTyped(json, true), artAbfrage: 'WEITERES_VERFAHREN'};
        case 'WeiteresVerfahrenDto':
            return {...WeiteresVerfahrenDtoFromJSONTyped(json, true), artAbfrage: 'WeiteresVerfahrenDto'};
        default:
            throw new Error(`No variant of Save201Response exists with 'artAbfrage=${json['artAbfrage']}'`);
    }
}

export function Save201ResponseToJSON(value?: Save201Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    switch (value['artAbfrage']) {
        case 'BAUGENEHMIGUNGSVERFAHREN':
            return BaugenehmigungsverfahrenDtoToJSON(value);
        case 'BAULEITPLANVERFAHREN':
            return BauleitplanverfahrenDtoToJSON(value);
        case 'BaugenehmigungsverfahrenDto':
            return BaugenehmigungsverfahrenDtoToJSON(value);
        case 'BauleitplanverfahrenDto':
            return BauleitplanverfahrenDtoToJSON(value);
        case 'WEITERES_VERFAHREN':
            return WeiteresVerfahrenDtoToJSON(value);
        case 'WeiteresVerfahrenDto':
            return WeiteresVerfahrenDtoToJSON(value);
        default:
            throw new Error(`No variant of Save201Response exists with 'artAbfrage=${value['artAbfrage']}'`);
    }

}

