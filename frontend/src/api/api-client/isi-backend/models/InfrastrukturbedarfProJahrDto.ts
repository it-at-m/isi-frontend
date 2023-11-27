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
/**
 * 
 * @export
 * @interface InfrastrukturbedarfProJahrDto
 */
export interface InfrastrukturbedarfProJahrDto {
    /**
     * 
     * @type {string}
     * @memberof InfrastrukturbedarfProJahrDto
     */
    jahr: string;
    /**
     * 
     * @type {number}
     * @memberof InfrastrukturbedarfProJahrDto
     */
    anzahlKinderGesamt: number;
    /**
     * 
     * @type {number}
     * @memberof InfrastrukturbedarfProJahrDto
     */
    anzahlKinderZuVersorgen: number;
    /**
     * 
     * @type {number}
     * @memberof InfrastrukturbedarfProJahrDto
     */
    anzahlGruppen: number;
}

/**
 * Check if a given object implements the InfrastrukturbedarfProJahrDto interface.
 */
export function instanceOfInfrastrukturbedarfProJahrDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "jahr" in value;
    isInstance = isInstance && "anzahlKinderGesamt" in value;
    isInstance = isInstance && "anzahlKinderZuVersorgen" in value;
    isInstance = isInstance && "anzahlGruppen" in value;

    return isInstance;
}

export function InfrastrukturbedarfProJahrDtoFromJSON(json: any): InfrastrukturbedarfProJahrDto {
    return InfrastrukturbedarfProJahrDtoFromJSONTyped(json, false);
}

export function InfrastrukturbedarfProJahrDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InfrastrukturbedarfProJahrDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'jahr': json['jahr'],
        'anzahlKinderGesamt': json['anzahlKinderGesamt'],
        'anzahlKinderZuVersorgen': json['anzahlKinderZuVersorgen'],
        'anzahlGruppen': json['anzahlGruppen'],
    };
}

export function InfrastrukturbedarfProJahrDtoToJSON(value?: InfrastrukturbedarfProJahrDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'jahr': value.jahr,
        'anzahlKinderGesamt': value.anzahlKinderGesamt,
        'anzahlKinderZuVersorgen': value.anzahlKinderZuVersorgen,
        'anzahlGruppen': value.anzahlGruppen,
    };
}

