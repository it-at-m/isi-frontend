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
 * @interface KindergartenDtoAllOf
 */
export interface KindergartenDtoAllOf {
    /**
     * 
     * @type {number}
     * @memberof KindergartenDtoAllOf
     */
    anzahlKindergartenPlaetze?: number;
    /**
     * 
     * @type {number}
     * @memberof KindergartenDtoAllOf
     */
    anzahlKindergartenGruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof KindergartenDtoAllOf
     */
    wohnungsnaheKindergartenPlaetze?: number;
    /**
     * 
     * @type {string}
     * @memberof KindergartenDtoAllOf
     */
    einrichtungstraeger?: KindergartenDtoAllOfEinrichtungstraegerEnum;
}


/**
 * @export
 */
export const KindergartenDtoAllOfEinrichtungstraegerEnum = {
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
export type KindergartenDtoAllOfEinrichtungstraegerEnum = typeof KindergartenDtoAllOfEinrichtungstraegerEnum[keyof typeof KindergartenDtoAllOfEinrichtungstraegerEnum];


/**
 * Check if a given object implements the KindergartenDtoAllOf interface.
 */
export function instanceOfKindergartenDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function KindergartenDtoAllOfFromJSON(json: any): KindergartenDtoAllOf {
    return KindergartenDtoAllOfFromJSONTyped(json, false);
}

export function KindergartenDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): KindergartenDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'anzahlKindergartenPlaetze': !exists(json, 'anzahlKindergartenPlaetze') ? undefined : json['anzahlKindergartenPlaetze'],
        'anzahlKindergartenGruppen': !exists(json, 'anzahlKindergartenGruppen') ? undefined : json['anzahlKindergartenGruppen'],
        'wohnungsnaheKindergartenPlaetze': !exists(json, 'wohnungsnaheKindergartenPlaetze') ? undefined : json['wohnungsnaheKindergartenPlaetze'],
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : json['einrichtungstraeger'],
    };
}

export function KindergartenDtoAllOfToJSON(value?: KindergartenDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'anzahlKindergartenPlaetze': value.anzahlKindergartenPlaetze,
        'anzahlKindergartenGruppen': value.anzahlKindergartenGruppen,
        'wohnungsnaheKindergartenPlaetze': value.wohnungsnaheKindergartenPlaetze,
        'einrichtungstraeger': value.einrichtungstraeger,
    };
}

