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
 * @interface KinderkrippeDto
 */
export interface KinderkrippeDto extends InfrastruktureinrichtungDto {
    /**
     * 
     * @type {number}
     * @memberof KinderkrippeDto
     */
    anzahlKinderkrippePlaetze: number;
    /**
     * 
     * @type {number}
     * @memberof KinderkrippeDto
     */
    anzahlKinderkrippeGruppen: number;
    /**
     * 
     * @type {number}
     * @memberof KinderkrippeDto
     */
    wohnungsnaheKinderkrippePlaetze?: number;
    /**
     * 
     * @type {string}
     * @memberof KinderkrippeDto
     */
    einrichtungstraeger?: KinderkrippeDtoEinrichtungstraegerEnum;
}


/**
 * @export
 */
export const KinderkrippeDtoEinrichtungstraegerEnum = {
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
export type KinderkrippeDtoEinrichtungstraegerEnum = typeof KinderkrippeDtoEinrichtungstraegerEnum[keyof typeof KinderkrippeDtoEinrichtungstraegerEnum];


/**
 * Check if a given object implements the KinderkrippeDto interface.
 */
export function instanceOfKinderkrippeDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "anzahlKinderkrippePlaetze" in value;
    isInstance = isInstance && "anzahlKinderkrippeGruppen" in value;

    return isInstance;
}

export function KinderkrippeDtoFromJSON(json: any): KinderkrippeDto {
    return KinderkrippeDtoFromJSONTyped(json, false);
}

export function KinderkrippeDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): KinderkrippeDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...InfrastruktureinrichtungDtoFromJSONTyped(json, ignoreDiscriminator),
        'anzahlKinderkrippePlaetze': json['anzahlKinderkrippePlaetze'],
        'anzahlKinderkrippeGruppen': json['anzahlKinderkrippeGruppen'],
        'wohnungsnaheKinderkrippePlaetze': !exists(json, 'wohnungsnaheKinderkrippePlaetze') ? undefined : json['wohnungsnaheKinderkrippePlaetze'],
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : json['einrichtungstraeger'],
    };
}

export function KinderkrippeDtoToJSON(value?: KinderkrippeDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...InfrastruktureinrichtungDtoToJSON(value),
        'anzahlKinderkrippePlaetze': value.anzahlKinderkrippePlaetze,
        'anzahlKinderkrippeGruppen': value.anzahlKinderkrippeGruppen,
        'wohnungsnaheKinderkrippePlaetze': value.wohnungsnaheKinderkrippePlaetze,
        'einrichtungstraeger': value.einrichtungstraeger,
    };
}

