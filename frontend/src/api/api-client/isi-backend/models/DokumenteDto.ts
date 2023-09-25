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
    DokumentDto,
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';

/**
 * 
 * @export
 * @interface DokumenteDto
 */
export interface DokumenteDto {
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof DokumenteDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {number}
     * @memberof DokumenteDto
     */
    pageNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof DokumenteDto
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof DokumenteDto
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof DokumenteDto
     */
    totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof DokumenteDto
     */
    last?: boolean;
}

export function DokumenteDtoFromJSON(json: any): DokumenteDto {
    return DokumenteDtoFromJSONTyped(json, false);
}

export function DokumenteDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): DokumenteDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'pageNumber': !exists(json, 'pageNumber') ? undefined : json['pageNumber'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'totalElements': !exists(json, 'totalElements') ? undefined : json['totalElements'],
        'totalPages': !exists(json, 'totalPages') ? undefined : json['totalPages'],
        'last': !exists(json, 'last') ? undefined : json['last'],
    };
}

export function DokumenteDtoToJSON(value?: DokumenteDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'pageNumber': value.pageNumber,
        'pageSize': value.pageSize,
        'totalElements': value.totalElements,
        'totalPages': value.totalPages,
        'last': value.last,
    };
}

