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
import type { BedarfsmeldungFachreferateDto } from './BedarfsmeldungFachreferateDto';
import {
    BedarfsmeldungFachreferateDtoFromJSON,
    BedarfsmeldungFachreferateDtoFromJSONTyped,
    BedarfsmeldungFachreferateDtoToJSON,
} from './BedarfsmeldungFachreferateDto';

/**
 * 
 * @export
 * @interface AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
 */
export interface AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    artAbfragevariante?: AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {Array<BedarfsmeldungFachreferateDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    bedarfsmeldungFachreferate?: Array<BedarfsmeldungFachreferateDto>;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    ausgeloesterBedarfMitversorgungImBplanKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    ausgeloesterBedarfMitversorgungImBplanSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto
     */
    hinweisVersorgung?: string;
}


/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum = typeof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoArtAbfragevarianteEnum];


/**
 * Check if a given object implements the AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto interface.
 */
export function instanceOfAbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSON(json: any): AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto {
    return AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSONTyped(json, false);
}

export function AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
        'bedarfsmeldungFachreferate': !exists(json, 'bedarfsmeldungFachreferate') ? undefined : ((json['bedarfsmeldungFachreferate'] as Array<any>).map(BedarfsmeldungFachreferateDtoFromJSON)),
        'ausgeloesterBedarfImBaugebietBeruecksichtigenKita': !exists(json, 'ausgeloesterBedarfImBaugebietBeruecksichtigenKita') ? undefined : json['ausgeloesterBedarfImBaugebietBeruecksichtigenKita'],
        'ausgeloesterBedarfMitversorgungImBplanKita': !exists(json, 'ausgeloesterBedarfMitversorgungImBplanKita') ? undefined : json['ausgeloesterBedarfMitversorgungImBplanKita'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenKita': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenKita') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenKita'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita'],
        'ausgeloesterBedarfImBaugebietBeruecksichtigenSchule': !exists(json, 'ausgeloesterBedarfImBaugebietBeruecksichtigenSchule') ? undefined : json['ausgeloesterBedarfImBaugebietBeruecksichtigenSchule'],
        'ausgeloesterBedarfMitversorgungImBplanSchule': !exists(json, 'ausgeloesterBedarfMitversorgungImBplanSchule') ? undefined : json['ausgeloesterBedarfMitversorgungImBplanSchule'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule'],
        'hinweisVersorgung': !exists(json, 'hinweisVersorgung') ? undefined : json['hinweisVersorgung'],
    };
}

export function AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDtoToJSON(value?: AbfragevarianteWeiteresVerfahrenInBearbeitungFachreferatDto | null): any {
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
        'ausgeloesterBedarfImBaugebietBeruecksichtigenKita': value.ausgeloesterBedarfImBaugebietBeruecksichtigenKita,
        'ausgeloesterBedarfMitversorgungImBplanKita': value.ausgeloesterBedarfMitversorgungImBplanKita,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenKita': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenKita,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita,
        'ausgeloesterBedarfImBaugebietBeruecksichtigenSchule': value.ausgeloesterBedarfImBaugebietBeruecksichtigenSchule,
        'ausgeloesterBedarfMitversorgungImBplanSchule': value.ausgeloesterBedarfMitversorgungImBplanSchule,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule,
        'hinweisVersorgung': value.hinweisVersorgung,
    };
}

