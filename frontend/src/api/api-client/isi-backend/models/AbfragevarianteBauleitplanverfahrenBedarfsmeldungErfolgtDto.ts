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
 * @interface AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto
 */
export interface AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto
     */
    artAbfragevariante?: AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {Array<BedarfsmeldungDto>}
     * @memberof AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto
     */
    bedarfsmeldungAbfrageersteller?: Array<BedarfsmeldungDto>;
}


/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum = typeof AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDtoArtAbfragevarianteEnum];


/**
 * Check if a given object implements the AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto interface.
 */
export function instanceOfAbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSON(json: any): AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto {
    return AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto {
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

export function AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDtoToJSON(value?: AbfragevarianteBauleitplanverfahrenBedarfsmeldungErfolgtDto | null): any {
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

