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
 * @interface KinderkrippeDto
 */
export interface KinderkrippeDto {
    /**
     * 
     * @type {string}
     * @memberof KinderkrippeDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof KinderkrippeDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof KinderkrippeDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof KinderkrippeDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {InfrastruktureinrichtungDto}
     * @memberof KinderkrippeDto
     */
    infrastruktureinrichtung: InfrastruktureinrichtungDto;
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
}

export function KinderkrippeDtoFromJSON(json: any): KinderkrippeDto {
    return KinderkrippeDtoFromJSONTyped(json, false);
}

export function KinderkrippeDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): KinderkrippeDto {
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
        'anzahlKinderkrippeGruppen': json['anzahlKinderkrippeGruppen'],
        'wohnungsnaheKinderkrippePlaetze': !exists(json, 'wohnungsnaheKinderkrippePlaetze') ? undefined : json['wohnungsnaheKinderkrippePlaetze'],
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
        
        'id': value.id,
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'infrastruktureinrichtung': InfrastruktureinrichtungDtoToJSON(value.infrastruktureinrichtung),
        'anzahlKinderkrippePlaetze': value.anzahlKinderkrippePlaetze,
        'anzahlKinderkrippeGruppen': value.anzahlKinderkrippeGruppen,
        'wohnungsnaheKinderkrippePlaetze': value.wohnungsnaheKinderkrippePlaetze,
    };
}

