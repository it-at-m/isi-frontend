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

import { exists, mapValues } from '../runtime';
import type { BedarfsmeldungFachreferateDto } from './BedarfsmeldungFachreferateDto';
import {
    BedarfsmeldungFachreferateDtoFromJSON,
    BedarfsmeldungFachreferateDtoFromJSONTyped,
    BedarfsmeldungFachreferateDtoToJSON,
} from './BedarfsmeldungFachreferateDto';

/**
 * 
 * @export
 * @interface AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto
 */
export interface AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto
     */
    artAbfragevariante?: AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {Array<BedarfsmeldungFachreferateDto>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto
     */
    bedarfsmeldungFachreferate?: Array<BedarfsmeldungFachreferateDto>;
}


/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum = typeof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum];


/**
 * Check if a given object implements the AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto interface.
 */
export function instanceOfAbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSON(json: any): AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto {
    return AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
        'bedarfsmeldungFachreferate': !exists(json, 'bedarfsmeldungFachreferate') ? undefined : ((json['bedarfsmeldungFachreferate'] as Array<any>).map(BedarfsmeldungFachreferateDtoFromJSON)),
    };
}

export function AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDtoToJSON(value?: AbfragevarianteBaugenehmigungsverfahrenInBearbeitungFachreferatDto | null): any {
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
        'bedarfsmeldungFachreferate': value.bedarfsmeldungFachreferate === undefined ? undefined : ((value.bedarfsmeldungFachreferate as Array<any>).map(BedarfsmeldungFachreferateDtoToJSON)),
    };
}

