/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { BaugebietDto } from './BaugebietDto';
import {
    BaugebietDtoFromJSON,
    BaugebietDtoFromJSONTyped,
    BaugebietDtoToJSON,
} from './BaugebietDto';

/**
 * 
 * @export
 * @interface BauabschnittDto
 */
export interface BauabschnittDto {
    /**
     * 
     * @type {string}
     * @memberof BauabschnittDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof BauabschnittDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof BauabschnittDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BauabschnittDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof BauabschnittDto
     */
    bezeichnung: string;
    /**
     * 
     * @type {Array<BaugebietDto>}
     * @memberof BauabschnittDto
     */
    baugebiete: Array<BaugebietDto>;
    /**
     * 
     * @type {boolean}
     * @memberof BauabschnittDto
     */
    technical: boolean;
}

/**
 * Check if a given object implements the BauabschnittDto interface.
 */
export function instanceOfBauabschnittDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "bezeichnung" in value;
    isInstance = isInstance && "baugebiete" in value;
    isInstance = isInstance && "technical" in value;

    return isInstance;
}

export function BauabschnittDtoFromJSON(json: any): BauabschnittDto {
    return BauabschnittDtoFromJSONTyped(json, false);
}

export function BauabschnittDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauabschnittDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'bezeichnung': json['bezeichnung'],
        'baugebiete': ((json['baugebiete'] as Array<any>).map(BaugebietDtoFromJSON)),
        'technical': json['technical'],
    };
}

export function BauabschnittDtoToJSON(value?: BauabschnittDto | null): any {
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
        'baugebiete': ((value.baugebiete as Array<any>).map(BaugebietDtoToJSON)),
        'technical': value.technical,
    };
}

