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
/**
 * 
 * @export
 * @interface SchuleDto
 */
export interface SchuleDto {
    /**
     * 
     * @type {number}
     * @memberof SchuleDto
     */
    anzahlKlassen: number;
    /**
     * 
     * @type {number}
     * @memberof SchuleDto
     */
    anzahlPlaetze: number;
    /**
     * 
     * @type {string}
     * @memberof SchuleDto
     */
    einrichtungstraeger?: SchuleDtoEinrichtungstraegerEnum;
}


/**
 * @export
 */
export const SchuleDtoEinrichtungstraegerEnum = {
    Unspecified: 'UNSPECIFIED',
    StaedtischeEinrichtung: 'STAEDTISCHE_EINRICHTUNG',
    EinrichtungBetriebstraegerschaft: 'EINRICHTUNG_BETRIEBSTRAEGERSCHAFT',
    FreieGemeinnuetzigeSonstige: 'FREIE_GEMEINNUETZIGE_SONSTIGE',
    EinrichtungGesamtstaedtisch: 'EINRICHTUNG_GESAMTSTAEDTISCH',
    ElternKindInitiative: 'ELTERN_KIND_INITIATIVE',
    StaatlicheEinrichtung: 'STAATLICHE_EINRICHTUNG',
    PrivateTraegerschaft: 'PRIVATE_TRAEGERSCHAFT',
    KirchlicheTraegerschaft: 'KIRCHLICHE_TRAEGERSCHAFT'
} as const;
export type SchuleDtoEinrichtungstraegerEnum = typeof SchuleDtoEinrichtungstraegerEnum[keyof typeof SchuleDtoEinrichtungstraegerEnum];


/**
 * Check if a given object implements the SchuleDto interface.
 */
export function instanceOfSchuleDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "anzahlKlassen" in value;
    isInstance = isInstance && "anzahlPlaetze" in value;

    return isInstance;
}

export function SchuleDtoFromJSON(json: any): SchuleDto {
    return SchuleDtoFromJSONTyped(json, false);
}

export function SchuleDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SchuleDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'anzahlKlassen': json['anzahlKlassen'],
        'anzahlPlaetze': json['anzahlPlaetze'],
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : json['einrichtungstraeger'],
    };
}

export function SchuleDtoToJSON(value?: SchuleDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'anzahlKlassen': value.anzahlKlassen,
        'anzahlPlaetze': value.anzahlPlaetze,
        'einrichtungstraeger': value.einrichtungstraeger,
    };
}

