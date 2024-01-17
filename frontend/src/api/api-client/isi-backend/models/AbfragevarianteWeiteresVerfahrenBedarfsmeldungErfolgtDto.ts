/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.1.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { BedarfsmeldungDto } from './BedarfsmeldungDto';
import {
    BedarfsmeldungDtoFromJSON,
    BedarfsmeldungDtoFromJSONTyped,
    BedarfsmeldungDtoToJSON,
} from './BedarfsmeldungDto';

/**
 * 
 * @export
 * @interface AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto
 */
export interface AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto
     */
    artAbfragevariante?: AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {Array<BedarfsmeldungDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto
     */
    bedarfsmeldungAbfrageersteller?: Array<BedarfsmeldungDto>;
}


/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum = typeof AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum];


/**
 * Check if a given object implements the AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto interface.
 */
export function instanceOfAbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSON(json: any): AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto {
    return AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, false);
}

export function AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
        'bedarfsmeldungAbfrageersteller': !exists(json, 'bedarfsmeldungAbfrageersteller') ? undefined : ((json['bedarfsmeldungAbfrageersteller'] as Array<any>).map(BedarfsmeldungDtoFromJSON)),
    };
}

export function AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDtoToJSON(value?: AbfragevarianteWeiteresVerfahrenBedarfsmeldungErfolgtDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'artAbfragevariante': value.artAbfragevariante,
        'bedarfsmeldungAbfrageersteller': value.bedarfsmeldungAbfrageersteller === undefined ? undefined : ((value.bedarfsmeldungAbfrageersteller as Array<any>).map(BedarfsmeldungDtoToJSON)),
    };
}

