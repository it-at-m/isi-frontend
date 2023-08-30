/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AbfrageDto,
    AbfrageDtoFromJSON,
    AbfrageDtoFromJSONTyped,
    AbfrageDtoToJSON,
} from './AbfrageDto';
import {
    AbfragevarianteDto,
    AbfragevarianteDtoFromJSON,
    AbfragevarianteDtoFromJSONTyped,
    AbfragevarianteDtoToJSON,
} from './AbfragevarianteDto';
import {
    UncertainBoolean,
    UncertainBooleanFromJSON,
    UncertainBooleanFromJSONTyped,
    UncertainBooleanToJSON,
} from './UncertainBoolean';

/**
 * 
 * @export
 * @interface InfrastrukturabfrageDto
 */
export interface InfrastrukturabfrageDto {
    /**
     * 
     * @type {string}
     * @memberof InfrastrukturabfrageDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof InfrastrukturabfrageDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof InfrastrukturabfrageDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InfrastrukturabfrageDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {AbfrageDto}
     * @memberof InfrastrukturabfrageDto
     */
    abfrage?: AbfrageDto;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof InfrastrukturabfrageDto
     */
    sobonRelevant?: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof InfrastrukturabfrageDto
     */
    sobonJahr?: InfrastrukturabfrageDtoSobonJahrEnum;
    /**
     * 
     * @type {Array<AbfragevarianteDto>}
     * @memberof InfrastrukturabfrageDto
     */
    abfragevarianten?: Array<AbfragevarianteDto>;
    /**
     * 
     * @type {Array<AbfragevarianteDto>}
     * @memberof InfrastrukturabfrageDto
     */
    abfragevariantenSachbearbeitung?: Array<AbfragevarianteDto>;
    /**
     * 
     * @type {string}
     * @memberof InfrastrukturabfrageDto
     */
    aktenzeichenProLbk?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof InfrastrukturabfrageDto
     */
    offiziellerVerfahrensschritt?: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof InfrastrukturabfrageDto
     */
    displayName?: string;
}


/**
 * @export
 */
export const InfrastrukturabfrageDtoSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type InfrastrukturabfrageDtoSobonJahrEnum = typeof InfrastrukturabfrageDtoSobonJahrEnum[keyof typeof InfrastrukturabfrageDtoSobonJahrEnum];


export function InfrastrukturabfrageDtoFromJSON(json: any): InfrastrukturabfrageDto {
    return InfrastrukturabfrageDtoFromJSONTyped(json, false);
}

export function InfrastrukturabfrageDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InfrastrukturabfrageDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'abfrage': !exists(json, 'abfrage') ? undefined : AbfrageDtoFromJSON(json['abfrage']),
        'sobonRelevant': !exists(json, 'sobonRelevant') ? undefined : UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'abfragevarianten': !exists(json, 'abfragevarianten') ? undefined : ((json['abfragevarianten'] as Array<any>).map(AbfragevarianteDtoFromJSON)),
        'abfragevariantenSachbearbeitung': !exists(json, 'abfragevariantenSachbearbeitung') ? undefined : ((json['abfragevariantenSachbearbeitung'] as Array<any>).map(AbfragevarianteDtoFromJSON)),
        'aktenzeichenProLbk': !exists(json, 'aktenzeichenProLbk') ? undefined : json['aktenzeichenProLbk'],
        'offiziellerVerfahrensschritt': !exists(json, 'offiziellerVerfahrensschritt') ? undefined : UncertainBooleanFromJSON(json['offiziellerVerfahrensschritt']),
        'displayName': !exists(json, 'displayName') ? undefined : json['displayName'],
    };
}

export function InfrastrukturabfrageDtoToJSON(value?: InfrastrukturabfrageDto | null): any {
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
        'abfrage': AbfrageDtoToJSON(value.abfrage),
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'sobonJahr': value.sobonJahr,
        'abfragevarianten': value.abfragevarianten === undefined ? undefined : ((value.abfragevarianten as Array<any>).map(AbfragevarianteDtoToJSON)),
        'abfragevariantenSachbearbeitung': value.abfragevariantenSachbearbeitung === undefined ? undefined : ((value.abfragevariantenSachbearbeitung as Array<any>).map(AbfragevarianteDtoToJSON)),
        'aktenzeichenProLbk': value.aktenzeichenProLbk,
        'offiziellerVerfahrensschritt': UncertainBooleanToJSON(value.offiziellerVerfahrensschritt),
        'displayName': value.displayName,
    };
}

