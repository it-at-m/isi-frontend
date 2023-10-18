/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AdresseDto,
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import {
    GsNachmittagBetreuungDtoAllOf,
    GsNachmittagBetreuungDtoAllOfFromJSON,
    GsNachmittagBetreuungDtoAllOfFromJSONTyped,
    GsNachmittagBetreuungDtoAllOfToJSON,
} from './GsNachmittagBetreuungDtoAllOf';
import {
    InfrastruktureinrichtungDto,
    InfrastruktureinrichtungDtoFromJSON,
    InfrastruktureinrichtungDtoFromJSONTyped,
    InfrastruktureinrichtungDtoToJSON,
} from './InfrastruktureinrichtungDto';

/**
 * 
 * @export
 * @interface GsNachmittagBetreuungDto
 */
export interface GsNachmittagBetreuungDto extends InfrastruktureinrichtungDto {
    /**
     * 
     * @type {string}
     * @memberof GsNachmittagBetreuungDto
     */
    artGsNachmittagBetreuung?: GsNachmittagBetreuungDtoArtGsNachmittagBetreuungEnum;
    /**
     * 
     * @type {number}
     * @memberof GsNachmittagBetreuungDto
     */
    anzahlHortPlaetze: number;
    /**
     * 
     * @type {number}
     * @memberof GsNachmittagBetreuungDto
     */
    anzahlHortGruppen: number;
    /**
     * 
     * @type {number}
     * @memberof GsNachmittagBetreuungDto
     */
    wohnungsnaheHortPlaetze?: number;
}


/**
 * @export
 */
export const GsNachmittagBetreuungDtoArtGsNachmittagBetreuungEnum = {
    Hort: 'HORT',
    KooperativerGanztagFlexibleVariante: 'KOOPERATIVER_GANZTAG_FLEXIBLE_VARIANTE',
    KooperativerGanztagRhythmisierteVariante: 'KOOPERATIVER_GANZTAG_RHYTHMISIERTE_VARIANTE',
    Tagesheim: 'TAGESHEIM',
    Mittagsbetreuung: 'MITTAGSBETREUUNG'
} as const;
export type GsNachmittagBetreuungDtoArtGsNachmittagBetreuungEnum = typeof GsNachmittagBetreuungDtoArtGsNachmittagBetreuungEnum[keyof typeof GsNachmittagBetreuungDtoArtGsNachmittagBetreuungEnum];


export function GsNachmittagBetreuungDtoFromJSON(json: any): GsNachmittagBetreuungDto {
    return GsNachmittagBetreuungDtoFromJSONTyped(json, false);
}

export function GsNachmittagBetreuungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): GsNachmittagBetreuungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...InfrastruktureinrichtungDtoFromJSONTyped(json, ignoreDiscriminator),
        'artGsNachmittagBetreuung': !exists(json, 'artGsNachmittagBetreuung') ? undefined : json['artGsNachmittagBetreuung'],
        'anzahlHortPlaetze': json['anzahlHortPlaetze'],
        'anzahlHortGruppen': json['anzahlHortGruppen'],
        'wohnungsnaheHortPlaetze': !exists(json, 'wohnungsnaheHortPlaetze') ? undefined : json['wohnungsnaheHortPlaetze'],
    };
}

export function GsNachmittagBetreuungDtoToJSON(value?: GsNachmittagBetreuungDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...InfrastruktureinrichtungDtoToJSON(value),
        'artGsNachmittagBetreuung': value.artGsNachmittagBetreuung,
        'anzahlHortPlaetze': value.anzahlHortPlaetze,
        'anzahlHortGruppen': value.anzahlHortGruppen,
        'wohnungsnaheHortPlaetze': value.wohnungsnaheHortPlaetze,
    };
}

