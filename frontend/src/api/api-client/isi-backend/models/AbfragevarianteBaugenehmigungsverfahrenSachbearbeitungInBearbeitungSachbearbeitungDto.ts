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
import type { DokumentDto } from './DokumentDto';
import {
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';

/**
 * 
 * @export
 * @interface AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
 */
export interface AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    artAbfragevariante?: AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    sobonOrientierungswertJahr: AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    stammdatenGueltigAb: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    hasBauratendateiInput?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    anmerkungBauratendateiInput?: string;
    /**
     * 
     * @type {BauratendateiInputDto}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    bauratendateiInputBasis?: BauratendateiInputDto;
    /**
     * 
     * @type {Array<BauratendateiInputDto>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    bauratendateiInput?: Array<BauratendateiInputDto>;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    dokumente?: Array<DokumentDto>;
}


/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = typeof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum];

/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto interface.
 */
export function instanceOfAbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "sobonOrientierungswertJahr" in value;
    isInstance = isInstance && "stammdatenGueltigAb" in value;

    return isInstance;
}

export function AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON(json: any): AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    return AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
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
        'hasBauratendateiInput': !exists(json, 'hasBauratendateiInput') ? undefined : json['hasBauratendateiInput'],
        'anmerkungBauratendateiInput': !exists(json, 'anmerkungBauratendateiInput') ? undefined : json['anmerkungBauratendateiInput'],
        'bauratendateiInputBasis': !exists(json, 'bauratendateiInputBasis') ? undefined : BauratendateiInputDtoFromJSON(json['bauratendateiInputBasis']),
        'bauratendateiInput': !exists(json, 'bauratendateiInput') ? undefined : ((json['bauratendateiInput'] as Array<any>).map(BauratendateiInputDtoFromJSON)),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
    };
}

export function AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON(value?: AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto | null): any {
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
        'hasBauratendateiInput': value.hasBauratendateiInput,
        'anmerkungBauratendateiInput': value.anmerkungBauratendateiInput,
        'bauratendateiInputBasis': BauratendateiInputDtoToJSON(value.bauratendateiInputBasis),
        'bauratendateiInput': value.bauratendateiInput === undefined ? undefined : ((value.bauratendateiInput as Array<any>).map(BauratendateiInputDtoToJSON)),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
    };
}

