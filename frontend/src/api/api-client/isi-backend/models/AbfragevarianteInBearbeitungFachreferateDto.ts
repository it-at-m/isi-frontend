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
    BedarfsmeldungFachabteilungenDto,
    BedarfsmeldungFachabteilungenDtoFromJSON,
    BedarfsmeldungFachabteilungenDtoFromJSONTyped,
    BedarfsmeldungFachabteilungenDtoToJSON,
} from './BedarfsmeldungFachabteilungenDto';

/**
 * 
 * @export
 * @interface AbfragevarianteInBearbeitungFachreferateDto
 */
export interface AbfragevarianteInBearbeitungFachreferateDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteInBearbeitungFachreferateDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteInBearbeitungFachreferateDto
     */
    version?: number;
    /**
     * 
     * @type {Array<BedarfsmeldungFachabteilungenDto>}
     * @memberof AbfragevarianteInBearbeitungFachreferateDto
     */
    bedarfsmeldungFachreferate?: Array<BedarfsmeldungFachabteilungenDto>;
}

export function AbfragevarianteInBearbeitungFachreferateDtoFromJSON(json: any): AbfragevarianteInBearbeitungFachreferateDto {
    return AbfragevarianteInBearbeitungFachreferateDtoFromJSONTyped(json, false);
}

export function AbfragevarianteInBearbeitungFachreferateDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteInBearbeitungFachreferateDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'bedarfsmeldungFachreferate': !exists(json, 'bedarfsmeldungFachreferate') ? undefined : ((json['bedarfsmeldungFachreferate'] as Array<any>).map(BedarfsmeldungFachabteilungenDtoFromJSON)),
    };
}

export function AbfragevarianteInBearbeitungFachreferateDtoToJSON(value?: AbfragevarianteInBearbeitungFachreferateDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'bedarfsmeldungFachreferate': value.bedarfsmeldungFachreferate === undefined ? undefined : ((value.bedarfsmeldungFachreferate as Array<any>).map(BedarfsmeldungFachabteilungenDtoToJSON)),
    };
}
