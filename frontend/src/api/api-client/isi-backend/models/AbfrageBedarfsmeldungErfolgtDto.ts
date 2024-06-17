/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto } from './BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto';
import {
    BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSON,
    BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
    BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoToJSON,
} from './BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto';
import type { BauleitplanverfahrenBedarfsmeldungErfolgtDto } from './BauleitplanverfahrenBedarfsmeldungErfolgtDto';
import {
    BauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSON,
    BauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
    BauleitplanverfahrenBedarfsmeldungErfolgtDtoToJSON,
} from './BauleitplanverfahrenBedarfsmeldungErfolgtDto';
import type { WeiteresVerfahrenBedarfsmeldungErfolgtDto } from './WeiteresVerfahrenBedarfsmeldungErfolgtDto';
import {
    WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON,
    WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
    WeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON,
} from './WeiteresVerfahrenBedarfsmeldungErfolgtDto';

import {
     BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
     BauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped,
     WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped
} from './';

/**
 * AbfrageBedarfsmeldungErfolgtDto
 * @export
 * @interface AbfrageBedarfsmeldungErfolgtDto
 */
export interface AbfrageBedarfsmeldungErfolgtDto {
    /**
     * 
     * @type {number}
     * @memberof AbfrageBedarfsmeldungErfolgtDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfrageBedarfsmeldungErfolgtDto
     */
    artAbfrage?: AbfrageBedarfsmeldungErfolgtDtoArtAbfrageEnum;
}


/**
 * @export
 */
export const AbfrageBedarfsmeldungErfolgtDtoArtAbfrageEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfrageBedarfsmeldungErfolgtDtoArtAbfrageEnum = typeof AbfrageBedarfsmeldungErfolgtDtoArtAbfrageEnum[keyof typeof AbfrageBedarfsmeldungErfolgtDtoArtAbfrageEnum];


/**
 * Check if a given object implements the AbfrageBedarfsmeldungErfolgtDto interface.
 */
export function instanceOfAbfrageBedarfsmeldungErfolgtDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfrageBedarfsmeldungErfolgtDtoFromJSON(json: any): AbfrageBedarfsmeldungErfolgtDto {
    return AbfrageBedarfsmeldungErfolgtDtoFromJSONTyped(json, false);
}

export function AbfrageBedarfsmeldungErfolgtDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageBedarfsmeldungErfolgtDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['artAbfrage'] === 'BAUGENEHMIGUNGSVERFAHREN') {
            return BaugenehmigungsverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, true);
        }
        if (json['artAbfrage'] === 'BAULEITPLANVERFAHREN') {
            return BauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, true);
        }
        if (json['artAbfrage'] === 'WEITERES_VERFAHREN') {
            return WeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, true);
        }
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfrage': !exists(json, 'artAbfrage') ? undefined : json['artAbfrage'],
    };
}

export function AbfrageBedarfsmeldungErfolgtDtoToJSON(value?: AbfrageBedarfsmeldungErfolgtDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'artAbfrage': value.artAbfrage,
    };
}

