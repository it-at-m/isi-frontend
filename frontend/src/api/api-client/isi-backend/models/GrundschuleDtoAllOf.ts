/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.3.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { SchuleDto } from './SchuleDto';
import {
    SchuleDtoFromJSON,
    SchuleDtoFromJSONTyped,
    SchuleDtoToJSON,
} from './SchuleDto';

/**
 * 
 * @export
 * @interface GrundschuleDtoAllOf
 */
export interface GrundschuleDtoAllOf {
    /**
     * 
     * @type {SchuleDto}
     * @memberof GrundschuleDtoAllOf
     */
    schule?: SchuleDto;
}

/**
 * Check if a given object implements the GrundschuleDtoAllOf interface.
 */
export function instanceOfGrundschuleDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GrundschuleDtoAllOfFromJSON(json: any): GrundschuleDtoAllOf {
    return GrundschuleDtoAllOfFromJSONTyped(json, false);
}

export function GrundschuleDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): GrundschuleDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'schule': !exists(json, 'schule') ? undefined : SchuleDtoFromJSON(json['schule']),
    };
}

export function GrundschuleDtoAllOfToJSON(value?: GrundschuleDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'schule': SchuleDtoToJSON(value.schule),
    };
}

