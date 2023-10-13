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
/**
 * 
 * @export
 * @interface GsNachmittagBetreuungDtoAllOf
 */
export interface GsNachmittagBetreuungDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof GsNachmittagBetreuungDtoAllOf
     */
    artGsNachmittagBetreuung?: GsNachmittagBetreuungDtoAllOfArtGsNachmittagBetreuungEnum;
    /**
     * 
     * @type {number}
     * @memberof GsNachmittagBetreuungDtoAllOf
     */
    anzahlHortPlaetze?: number;
    /**
     * 
     * @type {number}
     * @memberof GsNachmittagBetreuungDtoAllOf
     */
    anzahlHortGruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof GsNachmittagBetreuungDtoAllOf
     */
    wohnungsnaheHortPlaetze?: number;
    /**
     * 
     * @type {string}
     * @memberof GsNachmittagBetreuungDtoAllOf
     */
    einrichtungstraeger?: GsNachmittagBetreuungDtoAllOfEinrichtungstraegerEnum;
}


/**
 * @export
 */
export const GsNachmittagBetreuungDtoAllOfArtGsNachmittagBetreuungEnum = {
    Hort: 'HORT',
    KooperativerGanztagFlexibleVariante: 'KOOPERATIVER_GANZTAG_FLEXIBLE_VARIANTE',
    KooperativerGanztagRhythmisierteVariante: 'KOOPERATIVER_GANZTAG_RHYTHMISIERTE_VARIANTE',
    Tagesheim: 'TAGESHEIM',
    Mittagsbetreuung: 'MITTAGSBETREUUNG'
} as const;
export type GsNachmittagBetreuungDtoAllOfArtGsNachmittagBetreuungEnum = typeof GsNachmittagBetreuungDtoAllOfArtGsNachmittagBetreuungEnum[keyof typeof GsNachmittagBetreuungDtoAllOfArtGsNachmittagBetreuungEnum];

/**
 * @export
 */
export const GsNachmittagBetreuungDtoAllOfEinrichtungstraegerEnum = {
    Unspecified: 'UNSPECIFIED',
    StaedtischeEinrichtung: 'STAEDTISCHE_EINRICHTUNG',
    EinrichtungBetriebstraegerschaft: 'EINRICHTUNG_BETRIEBSTRAEGERSCHAFT',
    FreieGemeinnuetzigeSonstige: 'FREIE_GEMEINNUETZIGE_SONSTIGE',
    EinrichtungGesamtstaedtisch: 'EINRICHTUNG_GESAMTSTAEDTISCH',
    ElternKindInitiative: 'ELTERN_KIND_INITIATIVE',
    StaatlicheEinrichtung: 'STAATLICHE_EINRICHTUNG'
} as const;
export type GsNachmittagBetreuungDtoAllOfEinrichtungstraegerEnum = typeof GsNachmittagBetreuungDtoAllOfEinrichtungstraegerEnum[keyof typeof GsNachmittagBetreuungDtoAllOfEinrichtungstraegerEnum];


export function GsNachmittagBetreuungDtoAllOfFromJSON(json: any): GsNachmittagBetreuungDtoAllOf {
    return GsNachmittagBetreuungDtoAllOfFromJSONTyped(json, false);
}

export function GsNachmittagBetreuungDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): GsNachmittagBetreuungDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'artGsNachmittagBetreuung': !exists(json, 'artGsNachmittagBetreuung') ? undefined : json['artGsNachmittagBetreuung'],
        'anzahlHortPlaetze': !exists(json, 'anzahlHortPlaetze') ? undefined : json['anzahlHortPlaetze'],
        'anzahlHortGruppen': !exists(json, 'anzahlHortGruppen') ? undefined : json['anzahlHortGruppen'],
        'wohnungsnaheHortPlaetze': !exists(json, 'wohnungsnaheHortPlaetze') ? undefined : json['wohnungsnaheHortPlaetze'],
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : json['einrichtungstraeger'],
    };
}

export function GsNachmittagBetreuungDtoAllOfToJSON(value?: GsNachmittagBetreuungDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'artGsNachmittagBetreuung': value.artGsNachmittagBetreuung,
        'anzahlHortPlaetze': value.anzahlHortPlaetze,
        'anzahlHortGruppen': value.anzahlHortGruppen,
        'wohnungsnaheHortPlaetze': value.wohnungsnaheHortPlaetze,
        'einrichtungstraeger': value.einrichtungstraeger,
    };
}

