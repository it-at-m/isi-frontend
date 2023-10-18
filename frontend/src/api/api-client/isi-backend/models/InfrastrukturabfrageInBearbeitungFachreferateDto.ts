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
    AbfragevarianteInBearbeitungFachreferateDto,
    AbfragevarianteInBearbeitungFachreferateDtoFromJSON,
    AbfragevarianteInBearbeitungFachreferateDtoFromJSONTyped,
    AbfragevarianteInBearbeitungFachreferateDtoToJSON,
} from './AbfragevarianteInBearbeitungFachreferateDto';

/**
 * 
 * @export
 * @interface InfrastrukturabfrageInBearbeitungFachreferateDto
 */
export interface InfrastrukturabfrageInBearbeitungFachreferateDto {
    /**
     * 
     * @type {number}
     * @memberof InfrastrukturabfrageInBearbeitungFachreferateDto
     */
    version?: number;
    /**
     * 
     * @type {Array<AbfragevarianteInBearbeitungFachreferateDto>}
     * @memberof InfrastrukturabfrageInBearbeitungFachreferateDto
     */
    abfragevarianten: Array<AbfragevarianteInBearbeitungFachreferateDto>;
    /**
     * 
     * @type {Array<AbfragevarianteInBearbeitungFachreferateDto>}
     * @memberof InfrastrukturabfrageInBearbeitungFachreferateDto
     */
    abfragevariantenSachbearbeitung: Array<AbfragevarianteInBearbeitungFachreferateDto>;
}

export function InfrastrukturabfrageInBearbeitungFachreferateDtoFromJSON(json: any): InfrastrukturabfrageInBearbeitungFachreferateDto {
    return InfrastrukturabfrageInBearbeitungFachreferateDtoFromJSONTyped(json, false);
}

export function InfrastrukturabfrageInBearbeitungFachreferateDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InfrastrukturabfrageInBearbeitungFachreferateDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'abfragevarianten': ((json['abfragevarianten'] as Array<any>).map(AbfragevarianteInBearbeitungFachreferateDtoFromJSON)),
        'abfragevariantenSachbearbeitung': ((json['abfragevariantenSachbearbeitung'] as Array<any>).map(AbfragevarianteInBearbeitungFachreferateDtoFromJSON)),
    };
}

export function InfrastrukturabfrageInBearbeitungFachreferateDtoToJSON(value?: InfrastrukturabfrageInBearbeitungFachreferateDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'abfragevarianten': ((value.abfragevarianten as Array<any>).map(AbfragevarianteInBearbeitungFachreferateDtoToJSON)),
        'abfragevariantenSachbearbeitung': ((value.abfragevariantenSachbearbeitung as Array<any>).map(AbfragevarianteInBearbeitungFachreferateDtoToJSON)),
    };
}
