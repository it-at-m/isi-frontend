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

import {
    BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
    instanceOfBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
    BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSON,
    BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
    BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoToJSON,
} from './BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto';
import {
    BauleitplanverfahrenInBearbeitungSachbearbeitungDto,
    instanceOfBauleitplanverfahrenInBearbeitungSachbearbeitungDto,
    BauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSON,
    BauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
    BauleitplanverfahrenInBearbeitungSachbearbeitungDtoToJSON,
} from './BauleitplanverfahrenInBearbeitungSachbearbeitungDto';
import {
    WeiteresVerfahrenInBearbeitungSachbearbeitungDto,
    instanceOfWeiteresVerfahrenInBearbeitungSachbearbeitungDto,
    WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSON,
    WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
    WeiteresVerfahrenInBearbeitungSachbearbeitungDtoToJSON,
} from './WeiteresVerfahrenInBearbeitungSachbearbeitungDto';

/**
 * @type PatchInBearbeitungSachbearbeitungRequest
 * 
 * @export
 */
export type PatchInBearbeitungSachbearbeitungRequest = { artAbfrage: 'BAUGENEHMIGUNGSVERFAHREN' } & BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto | { artAbfrage: 'BAULEITPLANVERFAHREN' } & BauleitplanverfahrenInBearbeitungSachbearbeitungDto | { artAbfrage: 'BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto' } & BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto | { artAbfrage: 'BauleitplanverfahrenInBearbeitungSachbearbeitungDto' } & BauleitplanverfahrenInBearbeitungSachbearbeitungDto | { artAbfrage: 'WEITERES_VERFAHREN' } & WeiteresVerfahrenInBearbeitungSachbearbeitungDto | { artAbfrage: 'WeiteresVerfahrenInBearbeitungSachbearbeitungDto' } & WeiteresVerfahrenInBearbeitungSachbearbeitungDto;

export function PatchInBearbeitungSachbearbeitungRequestFromJSON(json: any): PatchInBearbeitungSachbearbeitungRequest {
    return PatchInBearbeitungSachbearbeitungRequestFromJSONTyped(json, false);
}

export function PatchInBearbeitungSachbearbeitungRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchInBearbeitungSachbearbeitungRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    switch (json['artAbfrage']) {
        case 'BAUGENEHMIGUNGSVERFAHREN':
            return {...BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, true), artAbfrage: 'BAUGENEHMIGUNGSVERFAHREN'};
        case 'BAULEITPLANVERFAHREN':
            return {...BauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, true), artAbfrage: 'BAULEITPLANVERFAHREN'};
        case 'BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto':
            return {...BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, true), artAbfrage: 'BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto'};
        case 'BauleitplanverfahrenInBearbeitungSachbearbeitungDto':
            return {...BauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, true), artAbfrage: 'BauleitplanverfahrenInBearbeitungSachbearbeitungDto'};
        case 'WEITERES_VERFAHREN':
            return {...WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, true), artAbfrage: 'WEITERES_VERFAHREN'};
        case 'WeiteresVerfahrenInBearbeitungSachbearbeitungDto':
            return {...WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, true), artAbfrage: 'WeiteresVerfahrenInBearbeitungSachbearbeitungDto'};
        default:
            throw new Error(`No variant of PatchInBearbeitungSachbearbeitungRequest exists with 'artAbfrage=${json['artAbfrage']}'`);
    }
}

export function PatchInBearbeitungSachbearbeitungRequestToJSON(value?: PatchInBearbeitungSachbearbeitungRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    switch (value['artAbfrage']) {
        case 'BAUGENEHMIGUNGSVERFAHREN':
            return BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoToJSON(value);
        case 'BAULEITPLANVERFAHREN':
            return BauleitplanverfahrenInBearbeitungSachbearbeitungDtoToJSON(value);
        case 'BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto':
            return BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoToJSON(value);
        case 'BauleitplanverfahrenInBearbeitungSachbearbeitungDto':
            return BauleitplanverfahrenInBearbeitungSachbearbeitungDtoToJSON(value);
        case 'WEITERES_VERFAHREN':
            return WeiteresVerfahrenInBearbeitungSachbearbeitungDtoToJSON(value);
        case 'WeiteresVerfahrenInBearbeitungSachbearbeitungDto':
            return WeiteresVerfahrenInBearbeitungSachbearbeitungDtoToJSON(value);
        default:
            throw new Error(`No variant of PatchInBearbeitungSachbearbeitungRequest exists with 'artAbfrage=${value['artAbfrage']}'`);
    }

}

