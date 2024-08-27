/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.4.0
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
 * @interface SuchwortSuggestionsDto
 */
export interface SuchwortSuggestionsDto {
    /**
     * 
     * @type {Array<string>}
     * @memberof SuchwortSuggestionsDto
     */
    suchwortSuggestions?: Array<string>;
}

/**
 * Check if a given object implements the SuchwortSuggestionsDto interface.
 */
export function instanceOfSuchwortSuggestionsDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SuchwortSuggestionsDtoFromJSON(json: any): SuchwortSuggestionsDto {
    return SuchwortSuggestionsDtoFromJSONTyped(json, false);
}

export function SuchwortSuggestionsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SuchwortSuggestionsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'suchwortSuggestions': !exists(json, 'suchwortSuggestions') ? undefined : json['suchwortSuggestions'],
    };
}

export function SuchwortSuggestionsDtoToJSON(value?: SuchwortSuggestionsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'suchwortSuggestions': value.suchwortSuggestions,
    };
}

