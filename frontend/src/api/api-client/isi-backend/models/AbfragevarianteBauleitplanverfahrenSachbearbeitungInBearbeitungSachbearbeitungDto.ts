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
/**
 * 
 * @export
 * @interface AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
 */
export interface AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    artAbfragevariante?: AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    sobonOrientierungswertJahr: AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    stammdatenGueltigAb: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    anmerkung?: string;
}


/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = typeof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum];

/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto interface.
 */
export function instanceOfAbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "sobonOrientierungswertJahr" in value;
    isInstance = isInstance && "stammdatenGueltigAb" in value;

    return isInstance;
}

export function AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON(json: any): AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    return AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
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
    };
}

export function AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON(value?: AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto | null): any {
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
    };
}

