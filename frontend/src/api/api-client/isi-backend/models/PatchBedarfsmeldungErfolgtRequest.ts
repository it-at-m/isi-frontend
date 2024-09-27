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
    BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto,
    instanceOfBaugenehmigungsverfahrenBedarfsmeldungErfolgtDto,
    BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSON,
    BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
    BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoToJSON,
} from './BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto';
import {
    BauleitplanverfahrenBedarfsmeldungErfolgtDto,
    instanceOfBauleitplanverfahrenBedarfsmeldungErfolgtDto,
    BauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSON,
    BauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
    BauleitplanverfahrenBedarfsmeldungErfolgtDtoToJSON,
} from './BauleitplanverfahrenBedarfsmeldungErfolgtDto';
import {
    WeiteresVerfahrenBedarfsmeldungErfolgtDto,
    instanceOfWeiteresVerfahrenBedarfsmeldungErfolgtDto,
    WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON,
    WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
    WeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON,
} from './WeiteresVerfahrenBedarfsmeldungErfolgtDto';

/**
 * @type PatchBedarfsmeldungErfolgtRequest
 * 
 * @export
 */
export type PatchBedarfsmeldungErfolgtRequest = { artAbfrage: 'BAUGENEHMIGUNGSVERFAHREN' } & BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto | { artAbfrage: 'BAULEITPLANVERFAHREN' } & BauleitplanverfahrenBedarfsmeldungErfolgtDto | { artAbfrage: 'BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto' } & BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto | { artAbfrage: 'BauleitplanverfahrenBedarfsmeldungErfolgtDto' } & BauleitplanverfahrenBedarfsmeldungErfolgtDto | { artAbfrage: 'WEITERES_VERFAHREN' } & WeiteresVerfahrenBedarfsmeldungErfolgtDto | { artAbfrage: 'WeiteresVerfahrenBedarfsmeldungErfolgtDto' } & WeiteresVerfahrenBedarfsmeldungErfolgtDto;

export function PatchBedarfsmeldungErfolgtRequestFromJSON(json: any): PatchBedarfsmeldungErfolgtRequest {
    return PatchBedarfsmeldungErfolgtRequestFromJSONTyped(json, false);
}

export function PatchBedarfsmeldungErfolgtRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchBedarfsmeldungErfolgtRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    switch (json['artAbfrage']) {
        case 'BAUGENEHMIGUNGSVERFAHREN':
            return {...BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, true), artAbfrage: 'BAUGENEHMIGUNGSVERFAHREN'};
        case 'BAULEITPLANVERFAHREN':
            return {...BauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, true), artAbfrage: 'BAULEITPLANVERFAHREN'};
        case 'BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto':
            return {...BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, true), artAbfrage: 'BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto'};
        case 'BauleitplanverfahrenBedarfsmeldungErfolgtDto':
            return {...BauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, true), artAbfrage: 'BauleitplanverfahrenBedarfsmeldungErfolgtDto'};
        case 'WEITERES_VERFAHREN':
            return {...WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, true), artAbfrage: 'WEITERES_VERFAHREN'};
        case 'WeiteresVerfahrenBedarfsmeldungErfolgtDto':
            return {...WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, true), artAbfrage: 'WeiteresVerfahrenBedarfsmeldungErfolgtDto'};
        default:
            throw new Error(`No variant of PatchBedarfsmeldungErfolgtRequest exists with 'artAbfrage=${json['artAbfrage']}'`);
    }
}

export function PatchBedarfsmeldungErfolgtRequestToJSON(value?: PatchBedarfsmeldungErfolgtRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    switch (value['artAbfrage']) {
        case 'BAUGENEHMIGUNGSVERFAHREN':
            return BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoToJSON(value);
        case 'BAULEITPLANVERFAHREN':
            return BauleitplanverfahrenBedarfsmeldungErfolgtDtoToJSON(value);
        case 'BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto':
            return BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoToJSON(value);
        case 'BauleitplanverfahrenBedarfsmeldungErfolgtDto':
            return BauleitplanverfahrenBedarfsmeldungErfolgtDtoToJSON(value);
        case 'WEITERES_VERFAHREN':
            return WeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON(value);
        case 'WeiteresVerfahrenBedarfsmeldungErfolgtDto':
            return WeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON(value);
        default:
            throw new Error(`No variant of PatchBedarfsmeldungErfolgtRequest exists with 'artAbfrage=${value['artAbfrage']}'`);
    }

}

