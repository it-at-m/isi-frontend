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
    AbfragevarianteSachbearbeitungDto,
    AbfragevarianteSachbearbeitungDtoFromJSON,
    AbfragevarianteSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteSachbearbeitungDtoToJSON,
} from './AbfragevarianteSachbearbeitungDto';

/**
 * 
 * @export
 * @interface AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto
 */
export interface AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    version?: number;
    /**
     * 
     * @type {AbfragevarianteSachbearbeitungDto}
     * @memberof AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    abfragevarianteSachbearbeitung: AbfragevarianteSachbearbeitungDto;
}

export function AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON(json: any): AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto {
    return AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'abfragevarianteSachbearbeitung': AbfragevarianteSachbearbeitungDtoFromJSON(json['abfragevarianteSachbearbeitung']),
    };
}

export function AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON(value?: AbfragevarianteSachbearbeitungInBearbeitungSachbearbeitungDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'abfragevarianteSachbearbeitung': AbfragevarianteSachbearbeitungDtoToJSON(value.abfragevarianteSachbearbeitung),
    };
}

