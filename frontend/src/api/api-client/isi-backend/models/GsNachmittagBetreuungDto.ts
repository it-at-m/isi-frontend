/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.3.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AdresseDto } from './AdresseDto';
import {
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import type { BearbeitendePersonDto } from './BearbeitendePersonDto';
import {
    BearbeitendePersonDtoFromJSON,
    BearbeitendePersonDtoFromJSONTyped,
    BearbeitendePersonDtoToJSON,
} from './BearbeitendePersonDto';
import type { InfrastruktureinrichtungDto } from './InfrastruktureinrichtungDto';
import {
    InfrastruktureinrichtungDtoFromJSON,
    InfrastruktureinrichtungDtoFromJSONTyped,
    InfrastruktureinrichtungDtoToJSON,
} from './InfrastruktureinrichtungDto';
import type { VerortungPointDto } from './VerortungPointDto';
import {
    VerortungPointDtoFromJSON,
    VerortungPointDtoFromJSONTyped,
    VerortungPointDtoToJSON,
} from './VerortungPointDto';

import {
} from './';

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
    /**
     * 
     * @type {string}
     * @memberof GsNachmittagBetreuungDto
     */
    einrichtungstraeger?: GsNachmittagBetreuungDtoEinrichtungstraegerEnum;
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

/**
 * @export
 */
export const GsNachmittagBetreuungDtoEinrichtungstraegerEnum = {
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
export type GsNachmittagBetreuungDtoEinrichtungstraegerEnum = typeof GsNachmittagBetreuungDtoEinrichtungstraegerEnum[keyof typeof GsNachmittagBetreuungDtoEinrichtungstraegerEnum];


/**
 * Check if a given object implements the GsNachmittagBetreuungDto interface.
 */
export function instanceOfGsNachmittagBetreuungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "anzahlHortPlaetze" in value;
    isInstance = isInstance && "anzahlHortGruppen" in value;

    return isInstance;
}

export function GsNachmittagBetreuungDtoFromJSON(json: any): GsNachmittagBetreuungDto {
    return GsNachmittagBetreuungDtoFromJSONTyped(json, false);
}

export function GsNachmittagBetreuungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): GsNachmittagBetreuungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...InfrastruktureinrichtungDtoFromJSONTyped(json, ignoreDiscriminator),
        'artGsNachmittagBetreuung': !exists(json, 'artGsNachmittagBetreuung') ? undefined : json['artGsNachmittagBetreuung'],
        'anzahlHortPlaetze': json['anzahlHortPlaetze'],
        'anzahlHortGruppen': json['anzahlHortGruppen'],
        'wohnungsnaheHortPlaetze': !exists(json, 'wohnungsnaheHortPlaetze') ? undefined : json['wohnungsnaheHortPlaetze'],
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : json['einrichtungstraeger'],
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
        'einrichtungstraeger': value.einrichtungstraeger,
    };
}

