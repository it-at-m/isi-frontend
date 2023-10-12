/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
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
 * @interface AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
 */
export interface AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    version?: number;
    /**
     * 
     * @type {AbfragevarianteSachbearbeitungDto}
     * @memberof AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto
     */
    abfragevarianteSachbearbeitung: AbfragevarianteSachbearbeitungDto;
}

export function AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSON(json: any): AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    return AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'abfragevarianteSachbearbeitung': AbfragevarianteSachbearbeitungDtoFromJSON(json['abfragevarianteSachbearbeitung']),
    };
}

export function AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDtoToJSON(value?: AbfragevarianteBauleitplanverfahrenSachbearbeitungInBearbeitungSachbearbeitungDto | null): any {
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

