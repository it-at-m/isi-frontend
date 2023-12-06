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
import type { BaurateDto } from './BaurateDto';
import {
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
    artBaulicheNutzung: BaugebietDtoArtBaulicheNutzungEnum;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    realisierungVon: number;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    gfWohnenGeplant?: number;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    gfWohnenBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    gfWohnenBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    weGeplant?: number;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    weBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof BaugebietDto
     */
    weBaurechtlichFestgesetzt?: number;
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
export const BaugebietDtoArtBaulicheNutzungEnum = {
    Wr: 'WR',
    Wa: 'WA',
    Mu: 'MU',
    Mk: 'MK',
    Mi: 'MI',
    Ge: 'GE'
} as const;
export type BaugebietDtoArtBaulicheNutzungEnum = typeof BaugebietDtoArtBaulicheNutzungEnum[keyof typeof BaugebietDtoArtBaulicheNutzungEnum];


/**
 * Check if a given object implements the BaugebietDto interface.
 */
export function instanceOfBaugebietDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "bezeichnung" in value;
    isInstance = isInstance && "artBaulicheNutzung" in value;
    isInstance = isInstance && "realisierungVon" in value;
    isInstance = isInstance && "bauraten" in value;
    isInstance = isInstance && "technical" in value;

    return isInstance;
}

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
        'artBaulicheNutzung': json['artBaulicheNutzung'],
        'realisierungVon': json['realisierungVon'],
        'gfWohnenGeplant': !exists(json, 'gfWohnenGeplant') ? undefined : json['gfWohnenGeplant'],
        'gfWohnenBaurechtlichGenehmigt': !exists(json, 'gfWohnenBaurechtlichGenehmigt') ? undefined : json['gfWohnenBaurechtlichGenehmigt'],
        'gfWohnenBaurechtlichFestgesetzt': !exists(json, 'gfWohnenBaurechtlichFestgesetzt') ? undefined : json['gfWohnenBaurechtlichFestgesetzt'],
        'weGeplant': !exists(json, 'weGeplant') ? undefined : json['weGeplant'],
        'weBaurechtlichGenehmigt': !exists(json, 'weBaurechtlichGenehmigt') ? undefined : json['weBaurechtlichGenehmigt'],
        'weBaurechtlichFestgesetzt': !exists(json, 'weBaurechtlichFestgesetzt') ? undefined : json['weBaurechtlichFestgesetzt'],
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
        'artBaulicheNutzung': value.artBaulicheNutzung,
        'realisierungVon': value.realisierungVon,
        'gfWohnenGeplant': value.gfWohnenGeplant,
        'gfWohnenBaurechtlichGenehmigt': value.gfWohnenBaurechtlichGenehmigt,
        'gfWohnenBaurechtlichFestgesetzt': value.gfWohnenBaurechtlichFestgesetzt,
        'weGeplant': value.weGeplant,
        'weBaurechtlichGenehmigt': value.weBaurechtlichGenehmigt,
        'weBaurechtlichFestgesetzt': value.weBaurechtlichFestgesetzt,
        'bauraten': ((value.bauraten as Array<any>).map(BaurateDtoToJSON)),
        'technical': value.technical,
    };
}

