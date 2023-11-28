/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { StadtbezirkDto } from './StadtbezirkDto';
import {
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
    standVerfahren?: BauvorhabenSearchResultDtoAllOfStandVerfahrenEnum;
}


/**
 * @export
 */
export const BauvorhabenSearchResultDtoAllOfStandVerfahrenEnum = {
    Unspecified: 'UNSPECIFIED',
    VorbereitungEckdatenbeschluss: 'VORBEREITUNG_ECKDATENBESCHLUSS',
    VorbereitungWettbewerbauslobung: 'VORBEREITUNG_WETTBEWERBAUSLOBUNG',
    VorbereitungAufstellungsbeschluss: 'VORBEREITUNG_AUFSTELLUNGSBESCHLUSS',
    VorbereitungBilligungsbeschlussStaedtebaulicherVertrag: 'VORBEREITUNG_BILLIGUNGSBESCHLUSS_STAEDTEBAULICHER_VERTRAG',
    VorliegenderSatzungsbeschluss: 'VORLIEGENDER_SATZUNGSBESCHLUSS',
    RechtsverbindlichkeitAmtsblatt: 'RECHTSVERBINDLICHKEIT_AMTSBLATT',
    Aufteilungsplan: 'AUFTEILUNGSPLAN',
    VorbereitungVorbescheid: 'VORBEREITUNG_VORBESCHEID',
    VorbereitungBaugenehmigung: 'VORBEREITUNG_BAUGENEHMIGUNG',
    VorabfrageOhneKonkretenStand: 'VORABFRAGE_OHNE_KONKRETEN_STAND',
    Strukturkonzept: 'STRUKTURKONZEPT',
    Rahmenplanung: 'RAHMENPLANUNG',
    Potentialuntersuchung: 'POTENTIALUNTERSUCHUNG',
    StaedtebaulicheSanierungsmassnahme: 'STAEDTEBAULICHE_SANIERUNGSMASSNAHME',
    StaedtebaulicheEntwicklungsmassnahme: 'STAEDTEBAULICHE_ENTWICKLUNGSMASSNAHME',
    InfoFehlt: 'INFO_FEHLT',
    FreieEingabe: 'FREIE_EINGABE'
} as const;
export type BauvorhabenSearchResultDtoAllOfStandVerfahrenEnum = typeof BauvorhabenSearchResultDtoAllOfStandVerfahrenEnum[keyof typeof BauvorhabenSearchResultDtoAllOfStandVerfahrenEnum];


/**
 * Check if a given object implements the BauvorhabenSearchResultDtoAllOf interface.
 */
export function instanceOfBauvorhabenSearchResultDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

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
        'standVerfahren': !exists(json, 'standVerfahren') ? undefined : json['standVerfahren'],
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
        'standVerfahren': value.standVerfahren,
    };
}

