/* tslint:disable */
/* eslint-disable */
/**
 * ISI GEODATA EAI
 * ISI GEODATA EAI - Service zum Abfragen von Geoinformationen
 *
 * The version of the OpenAPI document: 1.4.0
 * Contact: unbekannt@muenchen.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SchulstandortDto
 */
export interface SchulstandortDto {
    /**
     * 
     * @type {number}
     * @memberof SchulstandortDto
     */
    objectId?: number;
    /**
     * 
     * @type {number}
     * @memberof SchulstandortDto
     */
    kreisschl?: number;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    kreis?: string;
    /**
     * 
     * @type {number}
     * @memberof SchulstandortDto
     */
    schulnummer?: number;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    schulname?: string;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    linkSchule?: string;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    verbundname?: string;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    verbundnummer?: string;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    schulamt?: string;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    rabl?: string;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    linkRabl?: string;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    schulart?: string;
    /**
     * 
     * @type {number}
     * @memberof SchulstandortDto
     */
    postleitzahl?: number;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    strasse?: string;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    internetadresse?: string;
    /**
     * 
     * @type {number}
     * @memberof SchulstandortDto
     */
    ebene?: number;
    /**
     * 
     * @type {number}
     * @memberof SchulstandortDto
     */
    winkel?: number;
    /**
     * 
     * @type {string}
     * @memberof SchulstandortDto
     */
    bedeutungEbene?: string;
}

/**
 * Check if a given object implements the SchulstandortDto interface.
 */
export function instanceOfSchulstandortDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SchulstandortDtoFromJSON(json: any): SchulstandortDto {
    return SchulstandortDtoFromJSONTyped(json, false);
}

export function SchulstandortDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SchulstandortDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'objectId': !exists(json, 'objectId') ? undefined : json['objectId'],
        'kreisschl': !exists(json, 'kreisschl') ? undefined : json['kreisschl'],
        'kreis': !exists(json, 'kreis') ? undefined : json['kreis'],
        'schulnummer': !exists(json, 'schulnummer') ? undefined : json['schulnummer'],
        'schulname': !exists(json, 'schulname') ? undefined : json['schulname'],
        'linkSchule': !exists(json, 'linkSchule') ? undefined : json['linkSchule'],
        'verbundname': !exists(json, 'verbundname') ? undefined : json['verbundname'],
        'verbundnummer': !exists(json, 'verbundnummer') ? undefined : json['verbundnummer'],
        'schulamt': !exists(json, 'schulamt') ? undefined : json['schulamt'],
        'rabl': !exists(json, 'rabl') ? undefined : json['rabl'],
        'linkRabl': !exists(json, 'linkRabl') ? undefined : json['linkRabl'],
        'schulart': !exists(json, 'schulart') ? undefined : json['schulart'],
        'postleitzahl': !exists(json, 'postleitzahl') ? undefined : json['postleitzahl'],
        'strasse': !exists(json, 'strasse') ? undefined : json['strasse'],
        'internetadresse': !exists(json, 'internetadresse') ? undefined : json['internetadresse'],
        'ebene': !exists(json, 'ebene') ? undefined : json['ebene'],
        'winkel': !exists(json, 'winkel') ? undefined : json['winkel'],
        'bedeutungEbene': !exists(json, 'bedeutungEbene') ? undefined : json['bedeutungEbene'],
    };
}

export function SchulstandortDtoToJSON(value?: SchulstandortDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'objectId': value.objectId,
        'kreisschl': value.kreisschl,
        'kreis': value.kreis,
        'schulnummer': value.schulnummer,
        'schulname': value.schulname,
        'linkSchule': value.linkSchule,
        'verbundname': value.verbundname,
        'verbundnummer': value.verbundnummer,
        'schulamt': value.schulamt,
        'rabl': value.rabl,
        'linkRabl': value.linkRabl,
        'schulart': value.schulart,
        'postleitzahl': value.postleitzahl,
        'strasse': value.strasse,
        'internetadresse': value.internetadresse,
        'ebene': value.ebene,
        'winkel': value.winkel,
        'bedeutungEbene': value.bedeutungEbene,
    };
}

