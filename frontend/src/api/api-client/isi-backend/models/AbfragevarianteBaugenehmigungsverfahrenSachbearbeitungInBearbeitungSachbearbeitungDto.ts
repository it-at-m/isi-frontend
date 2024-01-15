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
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    gfWohnenPlanungsursaechlich?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    sobonOrientierungswertJahr: AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    anmerkung?: string;
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
    Jahr2022: 'JAHR_2022'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto interface.
 */
export function instanceOfAbfragevarianteBaugenehmigungsverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "sobonOrientierungswertJahr" in value;

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
        'gfWohnenPlanungsursaechlich': !exists(json, 'gfWohnenPlanungsursaechlich') ? undefined : json['gfWohnenPlanungsursaechlich'],
        'sobonOrientierungswertJahr': json['sobonOrientierungswertJahr'],
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
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
        'gfWohnenPlanungsursaechlich': value.gfWohnenPlanungsursaechlich,
        'sobonOrientierungswertJahr': value.sobonOrientierungswertJahr,
        'anmerkung': value.anmerkung,
    };
}

