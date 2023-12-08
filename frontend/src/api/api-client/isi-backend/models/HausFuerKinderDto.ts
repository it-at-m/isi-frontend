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
import type { AdresseDto } from './AdresseDto';
import {
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import type { InfrastruktureinrichtungDto } from './InfrastruktureinrichtungDto';
import {
    InfrastruktureinrichtungDtoFromJSON,
    InfrastruktureinrichtungDtoFromJSONTyped,
    InfrastruktureinrichtungDtoToJSON,
} from './InfrastruktureinrichtungDto';

import {
} from './';

/**
 * 
 * @export
 * @interface HausFuerKinderDto
 */
export interface HausFuerKinderDto extends InfrastruktureinrichtungDto {
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlKinderkrippePlaetze?: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlKindergartenPlaetze?: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlHortPlaetze?: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlKinderkrippeGruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlKindergartenGruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlHortGruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    wohnungsnaheKinderkrippePlaetze?: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    wohnungsnaheKindergartenPlaetze?: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    wohnungsnaheHortPlaetze?: number;
    /**
     * 
     * @type {string}
     * @memberof HausFuerKinderDto
     */
    einrichtungstraeger?: HausFuerKinderDtoEinrichtungstraegerEnum;
}


/**
 * @export
 */
export const HausFuerKinderDtoEinrichtungstraegerEnum = {
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
export type HausFuerKinderDtoEinrichtungstraegerEnum = typeof HausFuerKinderDtoEinrichtungstraegerEnum[keyof typeof HausFuerKinderDtoEinrichtungstraegerEnum];


/**
 * Check if a given object implements the HausFuerKinderDto interface.
 */
export function instanceOfHausFuerKinderDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function HausFuerKinderDtoFromJSON(json: any): HausFuerKinderDto {
    return HausFuerKinderDtoFromJSONTyped(json, false);
}

export function HausFuerKinderDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): HausFuerKinderDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...InfrastruktureinrichtungDtoFromJSONTyped(json, ignoreDiscriminator),
        'anzahlKinderkrippePlaetze': !exists(json, 'anzahlKinderkrippePlaetze') ? undefined : json['anzahlKinderkrippePlaetze'],
        'anzahlKindergartenPlaetze': !exists(json, 'anzahlKindergartenPlaetze') ? undefined : json['anzahlKindergartenPlaetze'],
        'anzahlHortPlaetze': !exists(json, 'anzahlHortPlaetze') ? undefined : json['anzahlHortPlaetze'],
        'anzahlKinderkrippeGruppen': !exists(json, 'anzahlKinderkrippeGruppen') ? undefined : json['anzahlKinderkrippeGruppen'],
        'anzahlKindergartenGruppen': !exists(json, 'anzahlKindergartenGruppen') ? undefined : json['anzahlKindergartenGruppen'],
        'anzahlHortGruppen': !exists(json, 'anzahlHortGruppen') ? undefined : json['anzahlHortGruppen'],
        'wohnungsnaheKinderkrippePlaetze': !exists(json, 'wohnungsnaheKinderkrippePlaetze') ? undefined : json['wohnungsnaheKinderkrippePlaetze'],
        'wohnungsnaheKindergartenPlaetze': !exists(json, 'wohnungsnaheKindergartenPlaetze') ? undefined : json['wohnungsnaheKindergartenPlaetze'],
        'wohnungsnaheHortPlaetze': !exists(json, 'wohnungsnaheHortPlaetze') ? undefined : json['wohnungsnaheHortPlaetze'],
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : json['einrichtungstraeger'],
    };
}

export function HausFuerKinderDtoToJSON(value?: HausFuerKinderDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...InfrastruktureinrichtungDtoToJSON(value),
        'anzahlKinderkrippePlaetze': value.anzahlKinderkrippePlaetze,
        'anzahlKindergartenPlaetze': value.anzahlKindergartenPlaetze,
        'anzahlHortPlaetze': value.anzahlHortPlaetze,
        'anzahlKinderkrippeGruppen': value.anzahlKinderkrippeGruppen,
        'anzahlKindergartenGruppen': value.anzahlKindergartenGruppen,
        'anzahlHortGruppen': value.anzahlHortGruppen,
        'wohnungsnaheKinderkrippePlaetze': value.wohnungsnaheKinderkrippePlaetze,
        'wohnungsnaheKindergartenPlaetze': value.wohnungsnaheKindergartenPlaetze,
        'wohnungsnaheHortPlaetze': value.wohnungsnaheHortPlaetze,
        'einrichtungstraeger': value.einrichtungstraeger,
    };
}

