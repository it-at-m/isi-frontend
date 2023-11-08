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

import {
    AbfrageAngelegtDto,
    AbfrageAngelegtDtoFromJSON,
    AbfrageAngelegtDtoFromJSONTyped,
    AbfrageAngelegtDtoToJSON,
} from './AbfrageAngelegtDto';
import {
    BaugenehmigungsverfahrenAngelegtDto,
    BaugenehmigungsverfahrenAngelegtDtoFromJSON,
    BaugenehmigungsverfahrenAngelegtDtoFromJSONTyped,
    BaugenehmigungsverfahrenAngelegtDtoToJSON,
} from './BaugenehmigungsverfahrenAngelegtDto';
import {
    BauleitplanverfahrenAngelegtDto,
    BauleitplanverfahrenAngelegtDtoFromJSON,
    BauleitplanverfahrenAngelegtDtoFromJSONTyped,
    BauleitplanverfahrenAngelegtDtoToJSON,
} from './BauleitplanverfahrenAngelegtDto';
import {
    WeiteresVerfahrenAngelegtDto,
    WeiteresVerfahrenAngelegtDtoFromJSON,
    WeiteresVerfahrenAngelegtDtoFromJSONTyped,
    WeiteresVerfahrenAngelegtDtoToJSON,
} from './WeiteresVerfahrenAngelegtDto';

/**
 * @type SaveRequest
 * 
 * @export
 */
export type SaveRequest = AbfrageAngelegtDto | BaugenehmigungsverfahrenAngelegtDto | BauleitplanverfahrenAngelegtDto | WeiteresVerfahrenAngelegtDto;

export function SaveRequestFromJSON(json: any): SaveRequest {
    return SaveRequestFromJSONTyped(json, false);
}

export function SaveRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SaveRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...AbfrageAngelegtDtoFromJSONTyped(json, true), ...BaugenehmigungsverfahrenAngelegtDtoFromJSONTyped(json, true), ...BauleitplanverfahrenAngelegtDtoFromJSONTyped(json, true), ...WeiteresVerfahrenAngelegtDtoFromJSONTyped(json, true) };
}

export function SaveRequestToJSON(value?: SaveRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return { ...AbfrageAngelegtDtoToJSON(value), ...BaugenehmigungsverfahrenAngelegtDtoToJSON(value), ...BauleitplanverfahrenAngelegtDtoToJSON(value), ...WeiteresVerfahrenAngelegtDtoToJSON(value) };
}

