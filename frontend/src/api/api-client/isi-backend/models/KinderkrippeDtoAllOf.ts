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
 * @interface KinderkrippeDtoAllOf
 */
export interface KinderkrippeDtoAllOf {
    /**
     * 
     * @type {number}
     * @memberof KinderkrippeDtoAllOf
     */
    anzahlKinderkrippePlaetze?: number;
    /**
     * 
     * @type {number}
     * @memberof KinderkrippeDtoAllOf
     */
    anzahlKinderkrippeGruppen?: number;
    /**
     * 
     * @type {number}
     * @memberof KinderkrippeDtoAllOf
     */
    wohnungsnaheKinderkrippePlaetze?: number;
}

export function KinderkrippeDtoAllOfFromJSON(json: any): KinderkrippeDtoAllOf {
    return KinderkrippeDtoAllOfFromJSONTyped(json, false);
}

export function KinderkrippeDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): KinderkrippeDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'anzahlKinderkrippePlaetze': !exists(json, 'anzahlKinderkrippePlaetze') ? undefined : json['anzahlKinderkrippePlaetze'],
        'anzahlKinderkrippeGruppen': !exists(json, 'anzahlKinderkrippeGruppen') ? undefined : json['anzahlKinderkrippeGruppen'],
        'wohnungsnaheKinderkrippePlaetze': !exists(json, 'wohnungsnaheKinderkrippePlaetze') ? undefined : json['wohnungsnaheKinderkrippePlaetze'],
    };
}

export function KinderkrippeDtoAllOfToJSON(value?: KinderkrippeDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'anzahlKinderkrippePlaetze': value.anzahlKinderkrippePlaetze,
        'anzahlKinderkrippeGruppen': value.anzahlKinderkrippeGruppen,
        'wohnungsnaheKinderkrippePlaetze': value.wohnungsnaheKinderkrippePlaetze,
    };
}

