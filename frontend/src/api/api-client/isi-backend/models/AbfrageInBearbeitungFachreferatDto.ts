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

import { exists, mapValues } from '../runtime';
import type { BaugenehmigungsverfahrenInBearbeitungFachreferatDto } from './BaugenehmigungsverfahrenInBearbeitungFachreferatDto';
import {
    BaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSON,
    BaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSONTyped,
    BaugenehmigungsverfahrenInBearbeitungFachreferatDtoToJSON,
} from './BaugenehmigungsverfahrenInBearbeitungFachreferatDto';
import type { BauleitplanverfahrenInBearbeitungFachreferatDto } from './BauleitplanverfahrenInBearbeitungFachreferatDto';
import {
    BauleitplanverfahrenInBearbeitungFachreferatDtoFromJSON,
    BauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped,
    BauleitplanverfahrenInBearbeitungFachreferatDtoToJSON,
} from './BauleitplanverfahrenInBearbeitungFachreferatDto';
import type { WeiteresVerfahrenInBearbeitungFachreferatDto } from './WeiteresVerfahrenInBearbeitungFachreferatDto';
import {
    WeiteresVerfahrenInBearbeitungFachreferatDtoFromJSON,
    WeiteresVerfahrenInBearbeitungFachreferatDtoFromJSONTyped,
    WeiteresVerfahrenInBearbeitungFachreferatDtoToJSON,
} from './WeiteresVerfahrenInBearbeitungFachreferatDto';

import {
     BaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSONTyped,
     BauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped,
     WeiteresVerfahrenInBearbeitungFachreferatDtoFromJSONTyped
} from './';

/**
 * AbfrageInBearbeitungFachreferatDto
 * @export
 * @interface AbfrageInBearbeitungFachreferatDto
 */
export interface AbfrageInBearbeitungFachreferatDto {
    /**
     * 
     * @type {number}
     * @memberof AbfrageInBearbeitungFachreferatDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfrageInBearbeitungFachreferatDto
     */
    artAbfrage?: AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum;
}


/**
 * @export
 */
export const AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum = typeof AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum[keyof typeof AbfrageInBearbeitungFachreferatDtoArtAbfrageEnum];


/**
 * Check if a given object implements the AbfrageInBearbeitungFachreferatDto interface.
 */
export function instanceOfAbfrageInBearbeitungFachreferatDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfrageInBearbeitungFachreferatDtoFromJSON(json: any): AbfrageInBearbeitungFachreferatDto {
    return AbfrageInBearbeitungFachreferatDtoFromJSONTyped(json, false);
}

export function AbfrageInBearbeitungFachreferatDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageInBearbeitungFachreferatDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['artAbfrage'] === 'BAUGENEHMIGUNGSVERFAHREN') {
            return BaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, true);
        }
        if (json['artAbfrage'] === 'BAULEITPLANVERFAHREN') {
            return BauleitplanverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, true);
        }
        if (json['artAbfrage'] === 'WEITERES_VERFAHREN') {
            return WeiteresVerfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, true);
        }
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfrage': !exists(json, 'artAbfrage') ? undefined : json['artAbfrage'],
    };
}

export function AbfrageInBearbeitungFachreferatDtoToJSON(value?: AbfrageInBearbeitungFachreferatDto | null): any {
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

