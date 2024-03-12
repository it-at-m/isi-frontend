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
import type { BauratendateiInputDto } from './BauratendateiInputDto';
import {
    BauratendateiInputDtoFromJSON,
    BauratendateiInputDtoFromJSONTyped,
    BauratendateiInputDtoToJSON,
} from './BauratendateiInputDto';

/**
 * 
 * @export
 * @interface AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
 */
export interface AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    artAbfragevariante?: AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    sobonOrientierungswertJahr: AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    stammdatenGueltigAb: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    hasBauratendateiInputs: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    anmerkungBauratendateiInputs?: string;
    /**
     * 
     * @type {Array<BauratendateiInputDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    bauratendateiInputs?: Array<BauratendateiInputDto>;
}


/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = typeof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum];

/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto interface.
 */
export function instanceOfAbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "sobonOrientierungswertJahr" in value;
    isInstance = isInstance && "stammdatenGueltigAb" in value;
    isInstance = isInstance && "hasBauratendateiInputs" in value;

    return isInstance;
}

export function AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON(json: any): AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    return AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
        'sobonOrientierungswertJahr': json['sobonOrientierungswertJahr'],
        'stammdatenGueltigAb': (new Date(json['stammdatenGueltigAb'])),
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'hasBauratendateiInputs': json['hasBauratendateiInputs'],
        'anmerkungBauratendateiInputs': !exists(json, 'anmerkungBauratendateiInputs') ? undefined : json['anmerkungBauratendateiInputs'],
        'bauratendateiInputs': !exists(json, 'bauratendateiInputs') ? undefined : ((json['bauratendateiInputs'] as Array<any>).map(BauratendateiInputDtoFromJSON)),
    };
}

export function AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON(value?: AbfragevarianteWeiteresVerfahrenSachbearbeitungInBearbeitungSachbearbeitungDto | null): any {
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
        'sobonOrientierungswertJahr': value.sobonOrientierungswertJahr,
        'stammdatenGueltigAb': (value.stammdatenGueltigAb.toISOString().substr(0,10)),
        'anmerkung': value.anmerkung,
        'hasBauratendateiInputs': value.hasBauratendateiInputs,
        'anmerkungBauratendateiInputs': value.anmerkungBauratendateiInputs,
        'bauratendateiInputs': value.bauratendateiInputs === undefined ? undefined : ((value.bauratendateiInputs as Array<any>).map(BauratendateiInputDtoToJSON)),
    };
}

