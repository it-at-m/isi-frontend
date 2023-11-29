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
import {
     BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
     BauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped,
     WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped
} from './';

/**
 * AbfrageInBearbeitungSachbearbeitungDto
 * @export
 * @interface AbfrageInBearbeitungSachbearbeitungDto
 */
export interface AbfrageInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {number}
     * @memberof AbfrageInBearbeitungSachbearbeitungDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfrageInBearbeitungSachbearbeitungDto
     */
    artAbfrage?: AbfrageInBearbeitungSachbearbeitungDtoArtAbfrageEnum;
}


/**
 * @export
 */
export const AbfrageInBearbeitungSachbearbeitungDtoArtAbfrageEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfrageInBearbeitungSachbearbeitungDtoArtAbfrageEnum = typeof AbfrageInBearbeitungSachbearbeitungDtoArtAbfrageEnum[keyof typeof AbfrageInBearbeitungSachbearbeitungDtoArtAbfrageEnum];


export function AbfrageInBearbeitungSachbearbeitungDtoFromJSON(json: any): AbfrageInBearbeitungSachbearbeitungDto {
    return AbfrageInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function AbfrageInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['artAbfrage'] === 'BAUGENEHMIGUNGSVERFAHREN') {
            return BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, true);
        }
        if (json['artAbfrage'] === 'BAULEITPLANVERFAHREN') {
            return BauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, true);
        }
        if (json['artAbfrage'] === 'WEITERES_VERFAHREN') {
            return WeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, true);
        }
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfrage': !exists(json, 'artAbfrage') ? undefined : json['artAbfrage'],
    };
}

export function AbfrageInBearbeitungSachbearbeitungDtoToJSON(value?: AbfrageInBearbeitungSachbearbeitungDto | null): any {
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

