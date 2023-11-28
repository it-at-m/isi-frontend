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

import {
    BaugenehmigungsverfahrenAngelegtDto,
    instanceOfBaugenehmigungsverfahrenAngelegtDto,
    BaugenehmigungsverfahrenAngelegtDtoFromJSON,
    BaugenehmigungsverfahrenAngelegtDtoFromJSONTyped,
    BaugenehmigungsverfahrenAngelegtDtoToJSON,
} from './BaugenehmigungsverfahrenAngelegtDto';
import {
    BauleitplanverfahrenAngelegtDto,
    instanceOfBauleitplanverfahrenAngelegtDto,
    BauleitplanverfahrenAngelegtDtoFromJSON,
    BauleitplanverfahrenAngelegtDtoFromJSONTyped,
    BauleitplanverfahrenAngelegtDtoToJSON,
} from './BauleitplanverfahrenAngelegtDto';
import {
    WeiteresVerfahrenAngelegtDto,
    instanceOfWeiteresVerfahrenAngelegtDto,
    WeiteresVerfahrenAngelegtDtoFromJSON,
    WeiteresVerfahrenAngelegtDtoFromJSONTyped,
    WeiteresVerfahrenAngelegtDtoToJSON,
} from './WeiteresVerfahrenAngelegtDto';

/**
 * @type SaveRequest
 * 
 * @export
 */
export type SaveRequest = { artAbfrage: 'BAUGENEHMIGUNGSVERFAHREN' } & BaugenehmigungsverfahrenAngelegtDto | { artAbfrage: 'BAULEITPLANVERFAHREN' } & BauleitplanverfahrenAngelegtDto | { artAbfrage: 'BaugenehmigungsverfahrenAngelegtDto' } & BaugenehmigungsverfahrenAngelegtDto | { artAbfrage: 'BauleitplanverfahrenAngelegtDto' } & BauleitplanverfahrenAngelegtDto | { artAbfrage: 'WEITERES_VERFAHREN' } & WeiteresVerfahrenAngelegtDto | { artAbfrage: 'WeiteresVerfahrenAngelegtDto' } & WeiteresVerfahrenAngelegtDto;

export function SaveRequestFromJSON(json: any): SaveRequest {
    return SaveRequestFromJSONTyped(json, false);
}

export function SaveRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SaveRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    switch (json['artAbfrage']) {
        case 'BAUGENEHMIGUNGSVERFAHREN':
            return {...BaugenehmigungsverfahrenAngelegtDtoFromJSONTyped(json, true), artAbfrage: 'BAUGENEHMIGUNGSVERFAHREN'};
        case 'BAULEITPLANVERFAHREN':
            return {...BauleitplanverfahrenAngelegtDtoFromJSONTyped(json, true), artAbfrage: 'BAULEITPLANVERFAHREN'};
        case 'BaugenehmigungsverfahrenAngelegtDto':
            return {...BaugenehmigungsverfahrenAngelegtDtoFromJSONTyped(json, true), artAbfrage: 'BaugenehmigungsverfahrenAngelegtDto'};
        case 'BauleitplanverfahrenAngelegtDto':
            return {...BauleitplanverfahrenAngelegtDtoFromJSONTyped(json, true), artAbfrage: 'BauleitplanverfahrenAngelegtDto'};
        case 'WEITERES_VERFAHREN':
            return {...WeiteresVerfahrenAngelegtDtoFromJSONTyped(json, true), artAbfrage: 'WEITERES_VERFAHREN'};
        case 'WeiteresVerfahrenAngelegtDto':
            return {...WeiteresVerfahrenAngelegtDtoFromJSONTyped(json, true), artAbfrage: 'WeiteresVerfahrenAngelegtDto'};
        default:
            throw new Error(`No variant of SaveRequest exists with 'artAbfrage=${json['artAbfrage']}'`);
    }
}

export function SaveRequestToJSON(value?: SaveRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    switch (value['artAbfrage']) {
        case 'BAUGENEHMIGUNGSVERFAHREN':
            return BaugenehmigungsverfahrenAngelegtDtoToJSON(value);
        case 'BAULEITPLANVERFAHREN':
            return BauleitplanverfahrenAngelegtDtoToJSON(value);
        case 'BaugenehmigungsverfahrenAngelegtDto':
            return BaugenehmigungsverfahrenAngelegtDtoToJSON(value);
        case 'BauleitplanverfahrenAngelegtDto':
            return BauleitplanverfahrenAngelegtDtoToJSON(value);
        case 'WEITERES_VERFAHREN':
            return WeiteresVerfahrenAngelegtDtoToJSON(value);
        case 'WeiteresVerfahrenAngelegtDto':
            return WeiteresVerfahrenAngelegtDtoToJSON(value);
        default:
            throw new Error(`No variant of SaveRequest exists with 'artAbfrage=${value['artAbfrage']}'`);
    }

}

