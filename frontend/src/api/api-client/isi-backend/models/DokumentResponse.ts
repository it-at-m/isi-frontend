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
import type { Filepath } from './Filepath';
import {
    FilepathFromJSON,
    FilepathFromJSONTyped,
    FilepathToJSON,
} from './Filepath';

/**
 * 
 * @export
 * @interface DokumentResponse
 */
export interface DokumentResponse {
    /**
     * 
     * @type {number}
     * @memberof DokumentResponse
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof DokumentResponse
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof DokumentResponse
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {Filepath}
     * @memberof DokumentResponse
     */
    filePath?: Filepath;
    /**
     * 
     * @type {string}
     * @memberof DokumentResponse
     */
    artDokument?: DokumentResponseArtDokumentEnum;
    /**
     * 
     * @type {number}
     * @memberof DokumentResponse
     */
    sizeInBytes?: number;
    /**
     * 
     * @type {string}
     * @memberof DokumentResponse
     */
    typDokument?: string;
}


/**
 * @export
 */
export const DokumentResponseArtDokumentEnum = {
    Unspecified: 'UNSPECIFIED',
    Email: 'EMAIL',
    Beschluss: 'BESCHLUSS',
    Anlage: 'ANLAGE',
    Antrag: 'ANTRAG',
    Karte: 'KARTE',
    Stellungnahme: 'STELLUNGNAHME',
    DatenBauvorhaben: 'DATEN_BAUVORHABEN',
    Gebaeudeplan: 'GEBAEUDEPLAN',
    Berechnung: 'BERECHNUNG',
    InfosBaugenehmigung: 'INFOS_BAUGENEHMIGUNG',
    Presseartikel: 'PRESSEARTIKEL',
    InfosZuSozInfrastruktur: 'INFOS_ZU_SOZ_INFRASTRUKTUR',
    Protokoll: 'PROTOKOLL',
    Sonstiges: 'SONSTIGES'
} as const;
export type DokumentResponseArtDokumentEnum = typeof DokumentResponseArtDokumentEnum[keyof typeof DokumentResponseArtDokumentEnum];


/**
 * Check if a given object implements the DokumentResponse interface.
 */
export function instanceOfDokumentResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DokumentResponseFromJSON(json: any): DokumentResponse {
    return DokumentResponseFromJSONTyped(json, false);
}

export function DokumentResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): DokumentResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'filePath': !exists(json, 'filePath') ? undefined : FilepathFromJSON(json['filePath']),
        'artDokument': !exists(json, 'artDokument') ? undefined : json['artDokument'],
        'sizeInBytes': !exists(json, 'sizeInBytes') ? undefined : json['sizeInBytes'],
        'typDokument': !exists(json, 'typDokument') ? undefined : json['typDokument'],
    };
}

export function DokumentResponseToJSON(value?: DokumentResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'filePath': FilepathToJSON(value.filePath),
        'artDokument': value.artDokument,
        'sizeInBytes': value.sizeInBytes,
        'typDokument': value.typDokument,
    };
}

