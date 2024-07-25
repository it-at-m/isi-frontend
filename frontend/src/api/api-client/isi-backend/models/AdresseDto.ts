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
import type { UtmDto } from './UtmDto';
import {
    UtmDtoFromJSON,
    UtmDtoFromJSONTyped,
    UtmDtoToJSON,
} from './UtmDto';
import type { Wgs84Dto } from './Wgs84Dto';
import {
    Wgs84DtoFromJSON,
    Wgs84DtoFromJSONTyped,
    Wgs84DtoToJSON,
} from './Wgs84Dto';

/**
 * 
 * @export
 * @interface AdresseDto
 */
export interface AdresseDto {
    /**
     * 
     * @type {string}
     * @memberof AdresseDto
     */
    plz?: string;
    /**
     * 
     * @type {string}
     * @memberof AdresseDto
     */
    ort?: string;
    /**
     * 
     * @type {string}
     * @memberof AdresseDto
     */
    strasse?: string;
    /**
     * 
     * @type {string}
     * @memberof AdresseDto
     */
    hausnummer?: string;
    /**
     * 
     * @type {Wgs84Dto}
     * @memberof AdresseDto
     */
    coordinate?: Wgs84Dto;
    /**
     * 
     * @type {UtmDto}
     * @memberof AdresseDto
     */
    coordinateUtm?: UtmDto;
    /**
     * 
     * @type {string}
     * @memberof AdresseDto
     */
    angabeLageErgaenzendeAdressinformation?: string;
}

/**
 * Check if a given object implements the AdresseDto interface.
 */
export function instanceOfAdresseDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AdresseDtoFromJSON(json: any): AdresseDto {
    return AdresseDtoFromJSONTyped(json, false);
}

export function AdresseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AdresseDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'plz': !exists(json, 'plz') ? undefined : json['plz'],
        'ort': !exists(json, 'ort') ? undefined : json['ort'],
        'strasse': !exists(json, 'strasse') ? undefined : json['strasse'],
        'hausnummer': !exists(json, 'hausnummer') ? undefined : json['hausnummer'],
        'coordinate': !exists(json, 'coordinate') ? undefined : Wgs84DtoFromJSON(json['coordinate']),
        'coordinateUtm': !exists(json, 'coordinateUtm') ? undefined : UtmDtoFromJSON(json['coordinateUtm']),
        'angabeLageErgaenzendeAdressinformation': !exists(json, 'angabeLageErgaenzendeAdressinformation') ? undefined : json['angabeLageErgaenzendeAdressinformation'],
    };
}

export function AdresseDtoToJSON(value?: AdresseDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'plz': value.plz,
        'ort': value.ort,
        'strasse': value.strasse,
        'hausnummer': value.hausnummer,
        'coordinate': Wgs84DtoToJSON(value.coordinate),
        'coordinateUtm': UtmDtoToJSON(value.coordinateUtm),
        'angabeLageErgaenzendeAdressinformation': value.angabeLageErgaenzendeAdressinformation,
    };
}

