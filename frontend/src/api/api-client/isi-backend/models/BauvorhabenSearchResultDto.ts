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
import type { SearchResultDto } from './SearchResultDto';
import {
    SearchResultDtoFromJSON,
    SearchResultDtoFromJSONTyped,
    SearchResultDtoToJSON,
} from './SearchResultDto';
import type { StadtbezirkDto } from './StadtbezirkDto';
import {
    StadtbezirkDtoFromJSON,
    StadtbezirkDtoFromJSONTyped,
    StadtbezirkDtoToJSON,
} from './StadtbezirkDto';

import {
} from './';

/**
 * 
 * @export
 * @interface BauvorhabenSearchResultDto
 */
export interface BauvorhabenSearchResultDto extends SearchResultDto {
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenSearchResultDto
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenSearchResultDto
     */
    nameVorhaben?: string;
    /**
     * 
     * @type {Set<StadtbezirkDto>}
     * @memberof BauvorhabenSearchResultDto
     */
    stadtbezirke?: Set<StadtbezirkDto>;
    /**
     * 
     * @type {number}
     * @memberof BauvorhabenSearchResultDto
     */
    grundstuecksgroesse?: number;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenSearchResultDto
     */
    standVerfahren?: BauvorhabenSearchResultDtoStandVerfahrenEnum;
}


/**
 * @export
 */
export const BauvorhabenSearchResultDtoStandVerfahrenEnum = {
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
export type BauvorhabenSearchResultDtoStandVerfahrenEnum = typeof BauvorhabenSearchResultDtoStandVerfahrenEnum[keyof typeof BauvorhabenSearchResultDtoStandVerfahrenEnum];


/**
 * Check if a given object implements the BauvorhabenSearchResultDto interface.
 */
export function instanceOfBauvorhabenSearchResultDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BauvorhabenSearchResultDtoFromJSON(json: any): BauvorhabenSearchResultDto {
    return BauvorhabenSearchResultDtoFromJSONTyped(json, false);
}

export function BauvorhabenSearchResultDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauvorhabenSearchResultDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...SearchResultDtoFromJSONTyped(json, ignoreDiscriminator),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'nameVorhaben': !exists(json, 'nameVorhaben') ? undefined : json['nameVorhaben'],
        'stadtbezirke': !exists(json, 'stadtbezirke') ? undefined : (new Set((json['stadtbezirke'] as Array<any>).map(StadtbezirkDtoFromJSON))),
        'grundstuecksgroesse': !exists(json, 'grundstuecksgroesse') ? undefined : json['grundstuecksgroesse'],
        'standVerfahren': !exists(json, 'standVerfahren') ? undefined : json['standVerfahren'],
    };
}

export function BauvorhabenSearchResultDtoToJSON(value?: BauvorhabenSearchResultDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...SearchResultDtoToJSON(value),
        'id': value.id,
        'nameVorhaben': value.nameVorhaben,
        'stadtbezirke': value.stadtbezirke === undefined ? undefined : (Array.from(value.stadtbezirke as Set<any>).map(StadtbezirkDtoToJSON)),
        'grundstuecksgroesse': value.grundstuecksgroesse,
        'standVerfahren': value.standVerfahren,
    };
}

