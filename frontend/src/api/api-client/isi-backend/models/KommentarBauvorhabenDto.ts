/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.4.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { DokumentDto } from './DokumentDto';
import {
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';

/**
 * 
 * @export
 * @interface KommentarBauvorhabenDto
 */
export interface KommentarBauvorhabenDto {
    /**
     * 
     * @type {string}
     * @memberof KommentarBauvorhabenDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof KommentarBauvorhabenDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof KommentarBauvorhabenDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof KommentarBauvorhabenDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof KommentarBauvorhabenDto
     */
    datum?: string;
    /**
     * 
     * @type {string}
     * @memberof KommentarBauvorhabenDto
     */
    text?: string;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof KommentarBauvorhabenDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {string}
     * @memberof KommentarBauvorhabenDto
     */
    bauvorhaben?: string;
}

/**
 * Check if a given object implements the KommentarBauvorhabenDto interface.
 */
export function instanceOfKommentarBauvorhabenDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function KommentarBauvorhabenDtoFromJSON(json: any): KommentarBauvorhabenDto {
    return KommentarBauvorhabenDtoFromJSONTyped(json, false);
}

export function KommentarBauvorhabenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): KommentarBauvorhabenDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'datum': !exists(json, 'datum') ? undefined : json['datum'],
        'text': !exists(json, 'text') ? undefined : json['text'],
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'bauvorhaben': !exists(json, 'bauvorhaben') ? undefined : json['bauvorhaben'],
    };
}

export function KommentarBauvorhabenDtoToJSON(value?: KommentarBauvorhabenDto | null): any {
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
        'datum': value.datum,
        'text': value.text,
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'bauvorhaben': value.bauvorhaben,
    };
}

