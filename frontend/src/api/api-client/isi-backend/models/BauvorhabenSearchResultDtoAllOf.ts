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
    StadtbezirkDto,
    StadtbezirkDtoFromJSON,
    StadtbezirkDtoFromJSONTyped,
    StadtbezirkDtoToJSON,
} from './StadtbezirkDto';

/**
 * 
 * @export
 * @interface BauvorhabenSearchResultDtoAllOf
 */
export interface BauvorhabenSearchResultDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenSearchResultDtoAllOf
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenSearchResultDtoAllOf
     */
    nameVorhaben?: string;
    /**
     * 
     * @type {Set<StadtbezirkDto>}
     * @memberof BauvorhabenSearchResultDtoAllOf
     */
    stadtbezirke?: Set<StadtbezirkDto>;
    /**
     * 
     * @type {number}
     * @memberof BauvorhabenSearchResultDtoAllOf
     */
    grundstuecksgroesse?: number;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenSearchResultDtoAllOf
     */
    standVorhaben?: BauvorhabenSearchResultDtoAllOfStandVorhabenEnum;
}


/**
 * @export
 */
export const BauvorhabenSearchResultDtoAllOfStandVorhabenEnum = {
    Unspecified: 'UNSPECIFIED',
    GrundsatzEckdatenbeschluss: 'GRUNDSATZ_ECKDATENBESCHLUSS',
    Aufstellungsbeschluss: 'AUFSTELLUNGSBESCHLUSS',
    Parag31Baugb: 'PARAG_3_1_BAUGB',
    Parag32Baugb: 'PARAG_3_2_BAUGB',
    Parag412Baugb: 'PARAG_4_1_2_BAUGB',
    Billigungsbeschluss: 'BILLIGUNGSBESCHLUSS',
    Satzungsbeschluss: 'SATZUNGSBESCHLUSS',
    BplanInKraft: 'BPLAN_IN_KRAFT',
    VorbescheidEingereicht: 'VORBESCHEID_EINGEREICHT',
    BauantragEingereicht: 'BAUANTRAG_EINGEREICHT',
    BaugenehmigungErteilt: 'BAUGENEHMIGUNG_ERTEILT',
    BaubeginnAngezeigt: 'BAUBEGINN_ANGEZEIGT',
    BaufertigstellungGeplant: 'BAUFERTIGSTELLUNG_GEPLANT',
    BaufertigstellungAngezeigt: 'BAUFERTIGSTELLUNG_ANGEZEIGT'
} as const;
export type BauvorhabenSearchResultDtoAllOfStandVorhabenEnum = typeof BauvorhabenSearchResultDtoAllOfStandVorhabenEnum[keyof typeof BauvorhabenSearchResultDtoAllOfStandVorhabenEnum];


export function BauvorhabenSearchResultDtoAllOfFromJSON(json: any): BauvorhabenSearchResultDtoAllOf {
    return BauvorhabenSearchResultDtoAllOfFromJSONTyped(json, false);
}

export function BauvorhabenSearchResultDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauvorhabenSearchResultDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'nameVorhaben': !exists(json, 'nameVorhaben') ? undefined : json['nameVorhaben'],
        'stadtbezirke': !exists(json, 'stadtbezirke') ? undefined : (new Set((json['stadtbezirke'] as Array<any>).map(StadtbezirkDtoFromJSON))),
        'grundstuecksgroesse': !exists(json, 'grundstuecksgroesse') ? undefined : json['grundstuecksgroesse'],
        'standVorhaben': !exists(json, 'standVorhaben') ? undefined : json['standVorhaben'],
    };
}

export function BauvorhabenSearchResultDtoAllOfToJSON(value?: BauvorhabenSearchResultDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'nameVorhaben': value.nameVorhaben,
        'stadtbezirke': value.stadtbezirke === undefined ? undefined : (Array.from(value.stadtbezirke as Set<any>).map(StadtbezirkDtoToJSON)),
        'grundstuecksgroesse': value.grundstuecksgroesse,
        'standVorhaben': value.standVorhaben,
    };
}
