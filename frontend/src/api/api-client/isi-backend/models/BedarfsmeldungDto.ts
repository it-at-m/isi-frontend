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
/**
 * 
 * @export
 * @interface BedarfsmeldungDto
 */
export interface BedarfsmeldungDto {
    /**
     * 
     * @type {string}
     * @memberof BedarfsmeldungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof BedarfsmeldungDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BedarfsmeldungDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungDto
     */
    anzahlEinrichtungen?: number;
    /**
     * 
     * @type {string}
     * @memberof BedarfsmeldungDto
     */
    infrastruktureinrichtungTyp?: BedarfsmeldungDtoInfrastruktureinrichtungTypEnum;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungDto
     */
    anzahlKinderkrippengruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungDto
     */
    anzahlKindergartengruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungDto
     */
    anzahlHortgruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungDto
     */
    anzahlGrundschulzuege?: number;
}


/**
 * @export
 */
export const BedarfsmeldungDtoInfrastruktureinrichtungTypEnum = {
    Unspecified: 'UNSPECIFIED',
    Kinderkrippe: 'KINDERKRIPPE',
    Kindergarten: 'KINDERGARTEN',
    GsNachmittagBetreuung: 'GS_NACHMITTAG_BETREUUNG',
    HausFuerKinder: 'HAUS_FUER_KINDER',
    Grundschule: 'GRUNDSCHULE',
    Mittelschule: 'MITTELSCHULE'
} as const;
export type BedarfsmeldungDtoInfrastruktureinrichtungTypEnum = typeof BedarfsmeldungDtoInfrastruktureinrichtungTypEnum[keyof typeof BedarfsmeldungDtoInfrastruktureinrichtungTypEnum];


/**
 * Check if a given object implements the BedarfsmeldungDto interface.
 */
export function instanceOfBedarfsmeldungDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BedarfsmeldungDtoFromJSON(json: any): BedarfsmeldungDto {
    return BedarfsmeldungDtoFromJSONTyped(json, false);
}

export function BedarfsmeldungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BedarfsmeldungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'anzahlEinrichtungen': !exists(json, 'anzahlEinrichtungen') ? undefined : json['anzahlEinrichtungen'],
        'infrastruktureinrichtungTyp': !exists(json, 'infrastruktureinrichtungTyp') ? undefined : json['infrastruktureinrichtungTyp'],
        'anzahlKinderkrippengruppen': !exists(json, 'anzahlKinderkrippengruppen') ? undefined : json['anzahlKinderkrippengruppen'],
        'anzahlKindergartengruppen': !exists(json, 'anzahlKindergartengruppen') ? undefined : json['anzahlKindergartengruppen'],
        'anzahlHortgruppen': !exists(json, 'anzahlHortgruppen') ? undefined : json['anzahlHortgruppen'],
        'anzahlGrundschulzuege': !exists(json, 'anzahlGrundschulzuege') ? undefined : json['anzahlGrundschulzuege'],
    };
}

export function BedarfsmeldungDtoToJSON(value?: BedarfsmeldungDto | null): any {
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
        'anzahlEinrichtungen': value.anzahlEinrichtungen,
        'infrastruktureinrichtungTyp': value.infrastruktureinrichtungTyp,
        'anzahlKinderkrippengruppen': value.anzahlKinderkrippengruppen,
        'anzahlKindergartengruppen': value.anzahlKindergartengruppen,
        'anzahlHortgruppen': value.anzahlHortgruppen,
        'anzahlGrundschulzuege': value.anzahlGrundschulzuege,
    };
}
