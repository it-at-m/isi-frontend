/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    InfrastruktureinrichtungDto,
    InfrastruktureinrichtungDtoFromJSON,
    InfrastruktureinrichtungDtoFromJSONTyped,
    InfrastruktureinrichtungDtoToJSON,
} from './InfrastruktureinrichtungDto';

/**
 * 
 * @export
 * @interface HausFuerKinderDto
 */
export interface HausFuerKinderDto {
    /**
     * 
     * @type {string}
     * @memberof HausFuerKinderDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof HausFuerKinderDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof HausFuerKinderDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {InfrastruktureinrichtungDto}
     * @memberof HausFuerKinderDto
     */
    infrastruktureinrichtung: InfrastruktureinrichtungDto;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlKinderkrippePlaetze: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlKindergartenPlaetze: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlHortPlaetze: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlKinderkrippeGruppen: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlKindergartenGruppen: number;
    /**
     * 
     * @type {number}
     * @memberof HausFuerKinderDto
     */
    anzahlHortGruppen: number;
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
}

export function HausFuerKinderDtoFromJSON(json: any): HausFuerKinderDto {
    return HausFuerKinderDtoFromJSONTyped(json, false);
}

export function HausFuerKinderDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): HausFuerKinderDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'infrastruktureinrichtung': InfrastruktureinrichtungDtoFromJSON(json['infrastruktureinrichtung']),
        'anzahlKinderkrippePlaetze': json['anzahlKinderkrippePlaetze'],
        'anzahlKindergartenPlaetze': json['anzahlKindergartenPlaetze'],
        'anzahlHortPlaetze': json['anzahlHortPlaetze'],
        'anzahlKinderkrippeGruppen': json['anzahlKinderkrippeGruppen'],
        'anzahlKindergartenGruppen': json['anzahlKindergartenGruppen'],
        'anzahlHortGruppen': json['anzahlHortGruppen'],
        'wohnungsnaheKinderkrippePlaetze': !exists(json, 'wohnungsnaheKinderkrippePlaetze') ? undefined : json['wohnungsnaheKinderkrippePlaetze'],
        'wohnungsnaheKindergartenPlaetze': !exists(json, 'wohnungsnaheKindergartenPlaetze') ? undefined : json['wohnungsnaheKindergartenPlaetze'],
        'wohnungsnaheHortPlaetze': !exists(json, 'wohnungsnaheHortPlaetze') ? undefined : json['wohnungsnaheHortPlaetze'],
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
        
        'id': value.id,
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'infrastruktureinrichtung': InfrastruktureinrichtungDtoToJSON(value.infrastruktureinrichtung),
        'anzahlKinderkrippePlaetze': value.anzahlKinderkrippePlaetze,
        'anzahlKindergartenPlaetze': value.anzahlKindergartenPlaetze,
        'anzahlHortPlaetze': value.anzahlHortPlaetze,
        'anzahlKinderkrippeGruppen': value.anzahlKinderkrippeGruppen,
        'anzahlKindergartenGruppen': value.anzahlKindergartenGruppen,
        'anzahlHortGruppen': value.anzahlHortGruppen,
        'wohnungsnaheKinderkrippePlaetze': value.wohnungsnaheKinderkrippePlaetze,
        'wohnungsnaheKindergartenPlaetze': value.wohnungsnaheKindergartenPlaetze,
        'wohnungsnaheHortPlaetze': value.wohnungsnaheHortPlaetze,
    };
}

