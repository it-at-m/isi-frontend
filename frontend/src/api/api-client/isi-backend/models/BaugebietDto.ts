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
    BaurateDto,
    BaurateDtoFromJSON,
    BaurateDtoFromJSONTyped,
    BaurateDtoToJSON,
} from './BaurateDto';

/**
 * 
 * @export
 * @interface BaugebietDto
 */
export interface BaugebietDto {
    /**
     * 
     * @type {string}
     * @memberof BaugebietDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof BaugebietDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BaugebietDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof BaugebietDto
     */
    bezeichnung: string;
    /**
     * 
     * @type {string}
     * @memberof BaugebietDto
     */
    baugebietTyp: BaugebietDtoBaugebietTypEnum;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    anzahlWohneinheitenBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    anzahlWohneinheitenBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    geschossflaecheWohnenGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    geschossflaecheWohnenFestgesetzt?: number;
    /**
     * 
     * @type {Array<BaurateDto>}
     * @memberof BaugebietDto
     */
    bauraten: Array<BaurateDto>;
    /**
     * 
     * @type {boolean}
     * @memberof BaugebietDto
     */
    technical: boolean;
}


/**
 * @export
 */
export const BaugebietDtoBaugebietTypEnum = {
    Mi: 'MI',
    Wa: 'WA',
    Mu: 'MU',
    Mk: 'MK',
    Wr: 'WR',
    Ge: 'GE'
} as const;
export type BaugebietDtoBaugebietTypEnum = typeof BaugebietDtoBaugebietTypEnum[keyof typeof BaugebietDtoBaugebietTypEnum];


export function BaugebietDtoFromJSON(json: any): BaugebietDto {
    return BaugebietDtoFromJSONTyped(json, false);
}

export function BaugebietDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugebietDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'bezeichnung': json['bezeichnung'],
        'baugebietTyp': json['baugebietTyp'],
        'anzahlWohneinheitenBaurechtlichGenehmigt': !exists(json, 'anzahlWohneinheitenBaurechtlichGenehmigt') ? undefined : json['anzahlWohneinheitenBaurechtlichGenehmigt'],
        'anzahlWohneinheitenBaurechtlichFestgesetzt': !exists(json, 'anzahlWohneinheitenBaurechtlichFestgesetzt') ? undefined : json['anzahlWohneinheitenBaurechtlichFestgesetzt'],
        'geschossflaecheWohnenGenehmigt': !exists(json, 'geschossflaecheWohnenGenehmigt') ? undefined : json['geschossflaecheWohnenGenehmigt'],
        'geschossflaecheWohnenFestgesetzt': !exists(json, 'geschossflaecheWohnenFestgesetzt') ? undefined : json['geschossflaecheWohnenFestgesetzt'],
        'bauraten': ((json['bauraten'] as Array<any>).map(BaurateDtoFromJSON)),
        'technical': json['technical'],
    };
}

export function BaugebietDtoToJSON(value?: BaugebietDto | null): any {
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
        'bezeichnung': value.bezeichnung,
        'baugebietTyp': value.baugebietTyp,
        'anzahlWohneinheitenBaurechtlichGenehmigt': value.anzahlWohneinheitenBaurechtlichGenehmigt,
        'anzahlWohneinheitenBaurechtlichFestgesetzt': value.anzahlWohneinheitenBaurechtlichFestgesetzt,
        'geschossflaecheWohnenGenehmigt': value.geschossflaecheWohnenGenehmigt,
        'geschossflaecheWohnenFestgesetzt': value.geschossflaecheWohnenFestgesetzt,
        'bauraten': ((value.bauraten as Array<any>).map(BaurateDtoToJSON)),
        'technical': value.technical,
    };
}

