/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
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
 * @interface BedarfsmeldungFachreferateDto
 */
export interface BedarfsmeldungFachreferateDto {
    /**
     * 
     * @type {string}
     * @memberof BedarfsmeldungFachreferateDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungFachreferateDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof BedarfsmeldungFachreferateDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BedarfsmeldungFachreferateDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungFachreferateDto
     */
    anzahlEinrichtungen?: number;
    /**
     * 
     * @type {string}
     * @memberof BedarfsmeldungFachreferateDto
     */
    infrastruktureinrichtungTyp?: BedarfsmeldungFachreferateDtoInfrastruktureinrichtungTypEnum;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungFachreferateDto
     */
    anzahlKinderkrippengruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungFachreferateDto
     */
    anzahlKindergartengruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungFachreferateDto
     */
    anzahlHortgruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof BedarfsmeldungFachreferateDto
     */
    anzahlGrundschulzuege?: number;
}


/**
 * @export
 */
export const BedarfsmeldungFachreferateDtoInfrastruktureinrichtungTypEnum = {
    Unspecified: 'UNSPECIFIED',
    Kinderkrippe: 'KINDERKRIPPE',
    Kindergarten: 'KINDERGARTEN',
    GsNachmittagBetreuung: 'GS_NACHMITTAG_BETREUUNG',
    HausFuerKinder: 'HAUS_FUER_KINDER',
    Grundschule: 'GRUNDSCHULE',
    Mittelschule: 'MITTELSCHULE'
} as const;
export type BedarfsmeldungFachreferateDtoInfrastruktureinrichtungTypEnum = typeof BedarfsmeldungFachreferateDtoInfrastruktureinrichtungTypEnum[keyof typeof BedarfsmeldungFachreferateDtoInfrastruktureinrichtungTypEnum];


/**
 * Check if a given object implements the BedarfsmeldungFachreferateDto interface.
 */
export function instanceOfBedarfsmeldungFachreferateDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BedarfsmeldungFachreferateDtoFromJSON(json: any): BedarfsmeldungFachreferateDto {
    return BedarfsmeldungFachreferateDtoFromJSONTyped(json, false);
}

export function BedarfsmeldungFachreferateDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BedarfsmeldungFachreferateDto {
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

export function BedarfsmeldungFachreferateDtoToJSON(value?: BedarfsmeldungFachreferateDto | null): any {
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

