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
 * @interface KindergartenDto
 */
export interface KindergartenDto extends InfrastruktureinrichtungDto {
    /**
     * 
     * @type {number}
     * @memberof KindergartenDto
     */
    anzahlKindergartenPlaetze: number;
    /**
     * 
     * @type {number}
     * @memberof KindergartenDto
     */
    anzahlKindergartenGruppen: number;
    /**
     * 
     * @type {number}
     * @memberof KindergartenDto
     */
    wohnungsnaheKindergartenPlaetze?: number;
    /**
     * 
     * @type {string}
     * @memberof KindergartenDto
     */
    einrichtungstraeger?: KindergartenDtoEinrichtungstraegerEnum;
}


/**
 * @export
 */
export const KindergartenDtoEinrichtungstraegerEnum = {
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
export type KindergartenDtoEinrichtungstraegerEnum = typeof KindergartenDtoEinrichtungstraegerEnum[keyof typeof KindergartenDtoEinrichtungstraegerEnum];


/**
 * Check if a given object implements the KindergartenDto interface.
 */
export function instanceOfKindergartenDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "anzahlKindergartenPlaetze" in value;
    isInstance = isInstance && "anzahlKindergartenGruppen" in value;

    return isInstance;
}

export function KindergartenDtoFromJSON(json: any): KindergartenDto {
    return KindergartenDtoFromJSONTyped(json, false);
}

export function KindergartenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): KindergartenDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...InfrastruktureinrichtungDtoFromJSONTyped(json, ignoreDiscriminator),
        'anzahlKindergartenPlaetze': json['anzahlKindergartenPlaetze'],
        'anzahlKindergartenGruppen': json['anzahlKindergartenGruppen'],
        'wohnungsnaheKindergartenPlaetze': !exists(json, 'wohnungsnaheKindergartenPlaetze') ? undefined : json['wohnungsnaheKindergartenPlaetze'],
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : json['einrichtungstraeger'],
    };
}

export function KindergartenDtoToJSON(value?: KindergartenDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...InfrastruktureinrichtungDtoToJSON(value),
        'anzahlKindergartenPlaetze': value.anzahlKindergartenPlaetze,
        'anzahlKindergartenGruppen': value.anzahlKindergartenGruppen,
        'wohnungsnaheKindergartenPlaetze': value.wohnungsnaheKindergartenPlaetze,
        'einrichtungstraeger': value.einrichtungstraeger,
    };
}

