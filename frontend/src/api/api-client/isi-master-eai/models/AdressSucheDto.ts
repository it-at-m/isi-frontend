/* tslint:disable */
/* eslint-disable */
/**
 * ISI MAstER EAI
 * ISI MAstER EAI - Service zum Abfragen von Adressen von MAstER
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * Kriterien für die Adress-Suche
 * @export
 * @interface AdressSucheDto
 */
export interface AdressSucheDto {
    /**
     * Suchtext mit Adressteilen.
     * @type {string}
     * @memberof AdressSucheDto
     */
    query: string;
    /**
     * Seitennummer (optional, default = 0)
     * @type {number}
     * @memberof AdressSucheDto
     */
    page?: number;
    /**
     * Seitengröße. Anzahl maximal angezeigter Ergebnisse pro Seite (optional, default = 20)
     * @type {number}
     * @memberof AdressSucheDto
     */
    pagesize?: number;
}

export function AdressSucheDtoFromJSON(json: any): AdressSucheDto {
    return AdressSucheDtoFromJSONTyped(json, false);
}

export function AdressSucheDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AdressSucheDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'query': json['query'],
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pagesize': !exists(json, 'pagesize') ? undefined : json['pagesize'],
    };
}

export function AdressSucheDtoToJSON(value?: AdressSucheDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'query': value.query,
        'page': value.page,
        'pagesize': value.pagesize,
    };
}
