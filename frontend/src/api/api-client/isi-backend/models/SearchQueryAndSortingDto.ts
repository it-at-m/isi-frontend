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
import type { StatusAbfrage } from './StatusAbfrage';
import {
    StatusAbfrageFromJSON,
    StatusAbfrageFromJSONTyped,
    StatusAbfrageToJSON,
} from './StatusAbfrage';
import type { UncertainBoolean } from './UncertainBoolean';
import {
    UncertainBooleanFromJSON,
    UncertainBooleanFromJSONTyped,
    UncertainBooleanToJSON,
} from './UncertainBoolean';

/**
 * 
 * @export
 * @interface SearchQueryAndSortingDto
 */
export interface SearchQueryAndSortingDto {
    /**
     * 
     * @type {string}
     * @memberof SearchQueryAndSortingDto
     */
    searchQuery: string;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectBauleitplanverfahren: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectBaugenehmigungsverfahren: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectWeiteresVerfahren: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectBauvorhaben: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectGrundschule: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectGsNachmittagBetreuung: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectHausFuerKinder: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectKindergarten: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectKinderkrippe: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    selectMittelschule: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchQueryAndSortingDto
     */
    filterStadtbezirkNummer?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchQueryAndSortingDto
     */
    filterKitaplanungsbereichKitaPlbT?: Array<string>;
    /**
     * 
     * @type {Array<number>}
     * @memberof SearchQueryAndSortingDto
     */
    filterGrundschulsprengelNummer?: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof SearchQueryAndSortingDto
     */
    filterMittelschulsprengelNummer?: Array<number>;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    filterRealisierungsbeginnVon?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    filterRealisierungsbeginnBis?: number;
    /**
     * 
     * @type {boolean}
     * @memberof SearchQueryAndSortingDto
     */
    filterNurEigeneAbfragen?: boolean;
    /**
     * 
     * @type {Array<StatusAbfrage>}
     * @memberof SearchQueryAndSortingDto
     */
    filterStatusAbfrage?: Array<StatusAbfrage>;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof SearchQueryAndSortingDto
     */
    filterSobonRelevant?: UncertainBoolean;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    filterWeGesamtVon?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    filterWeGesamtBis?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    filterGfWohnenGeplantVon?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    filterGfWohnenGeplantBis?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchQueryAndSortingDto
     */
    filterStandVerfahrenAbfrage?: Array<SearchQueryAndSortingDtoFilterStandVerfahrenAbfrageEnum>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchQueryAndSortingDto
     */
    filterInfrastruktureinrichtungStatus?: Array<SearchQueryAndSortingDtoFilterInfrastruktureinrichtungStatusEnum>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchQueryAndSortingDto
     */
    filterStandVerfahrenBauvorhaben?: Array<SearchQueryAndSortingDtoFilterStandVerfahrenBauvorhabenEnum>;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQueryAndSortingDto
     */
    pageSize?: number;
    /**
     * 
     * @type {string}
     * @memberof SearchQueryAndSortingDto
     */
    sortBy: SearchQueryAndSortingDtoSortByEnum;
    /**
     * 
     * @type {string}
     * @memberof SearchQueryAndSortingDto
     */
    sortOrder: SearchQueryAndSortingDtoSortOrderEnum;
}


/**
 * @export
 */
export const SearchQueryAndSortingDtoFilterStandVerfahrenAbfrageEnum = {
    Unspecified: 'UNSPECIFIED',
    VorbereitungEckdatenbeschluss: 'VORBEREITUNG_ECKDATENBESCHLUSS',
    VorbereitungWettbewerbauslobung: 'VORBEREITUNG_WETTBEWERBAUSLOBUNG',
    VorbereitungAufstellungsbeschluss: 'VORBEREITUNG_AUFSTELLUNGSBESCHLUSS',
    VorbereitungBilligungsbeschlussStaedtebaulicherVertrag: 'VORBEREITUNG_BILLIGUNGSBESCHLUSS_STAEDTEBAULICHER_VERTRAG',
    VorbereitungSatzungsbeschluss: 'VORBEREITUNG_SATZUNGSBESCHLUSS',
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
    FreieEingabe: 'FREIE_EINGABE',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type SearchQueryAndSortingDtoFilterStandVerfahrenAbfrageEnum = typeof SearchQueryAndSortingDtoFilterStandVerfahrenAbfrageEnum[keyof typeof SearchQueryAndSortingDtoFilterStandVerfahrenAbfrageEnum];

/**
 * @export
 */
export const SearchQueryAndSortingDtoFilterInfrastruktureinrichtungStatusEnum = {
    Unspecified: 'UNSPECIFIED',
    UngesichertePlanung: 'UNGESICHERTE_PLANUNG',
    GesichertePlanungNeueEinr: 'GESICHERTE_PLANUNG_NEUE_EINR',
    GesichertePlanungErwPlaetzeBestEinr: 'GESICHERTE_PLANUNG_ERW_PLAETZE_BEST_EINR',
    GesichertePlanungTfKitaStandort: 'GESICHERTE_PLANUNG_TF_KITA_STANDORT',
    GesichertePlanungReduzierungPlaetze: 'GESICHERTE_PLANUNG_REDUZIERUNG_PLAETZE',
    GesichertePlanungInterimsstandort: 'GESICHERTE_PLANUNG_INTERIMSSTANDORT',
    UngesichertePlanungTfKitaStandort: 'UNGESICHERTE_PLANUNG_TF_KITA_STANDORT',
    Bestand: 'BESTAND'
} as const;
export type SearchQueryAndSortingDtoFilterInfrastruktureinrichtungStatusEnum = typeof SearchQueryAndSortingDtoFilterInfrastruktureinrichtungStatusEnum[keyof typeof SearchQueryAndSortingDtoFilterInfrastruktureinrichtungStatusEnum];

/**
 * @export
 */
export const SearchQueryAndSortingDtoFilterStandVerfahrenBauvorhabenEnum = {
    Unspecified: 'UNSPECIFIED',
    VorbereitungEckdatenbeschluss: 'VORBEREITUNG_ECKDATENBESCHLUSS',
    VorbereitungWettbewerbauslobung: 'VORBEREITUNG_WETTBEWERBAUSLOBUNG',
    VorbereitungAufstellungsbeschluss: 'VORBEREITUNG_AUFSTELLUNGSBESCHLUSS',
    VorbereitungBilligungsbeschlussStaedtebaulicherVertrag: 'VORBEREITUNG_BILLIGUNGSBESCHLUSS_STAEDTEBAULICHER_VERTRAG',
    VorbereitungSatzungsbeschluss: 'VORBEREITUNG_SATZUNGSBESCHLUSS',
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
    FreieEingabe: 'FREIE_EINGABE',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type SearchQueryAndSortingDtoFilterStandVerfahrenBauvorhabenEnum = typeof SearchQueryAndSortingDtoFilterStandVerfahrenBauvorhabenEnum[keyof typeof SearchQueryAndSortingDtoFilterStandVerfahrenBauvorhabenEnum];

/**
 * @export
 */
export const SearchQueryAndSortingDtoSortByEnum = {
    Name: 'NAME',
    CreatedDateTime: 'CREATED_DATE_TIME',
    LastModifiedDateTime: 'LAST_MODIFIED_DATE_TIME'
} as const;
export type SearchQueryAndSortingDtoSortByEnum = typeof SearchQueryAndSortingDtoSortByEnum[keyof typeof SearchQueryAndSortingDtoSortByEnum];

/**
 * @export
 */
export const SearchQueryAndSortingDtoSortOrderEnum = {
    Asc: 'ASC',
    Desc: 'DESC'
} as const;
export type SearchQueryAndSortingDtoSortOrderEnum = typeof SearchQueryAndSortingDtoSortOrderEnum[keyof typeof SearchQueryAndSortingDtoSortOrderEnum];


/**
 * Check if a given object implements the SearchQueryAndSortingDto interface.
 */
export function instanceOfSearchQueryAndSortingDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "searchQuery" in value;
    isInstance = isInstance && "selectBauleitplanverfahren" in value;
    isInstance = isInstance && "selectBaugenehmigungsverfahren" in value;
    isInstance = isInstance && "selectWeiteresVerfahren" in value;
    isInstance = isInstance && "selectBauvorhaben" in value;
    isInstance = isInstance && "selectGrundschule" in value;
    isInstance = isInstance && "selectGsNachmittagBetreuung" in value;
    isInstance = isInstance && "selectHausFuerKinder" in value;
    isInstance = isInstance && "selectKindergarten" in value;
    isInstance = isInstance && "selectKinderkrippe" in value;
    isInstance = isInstance && "selectMittelschule" in value;
    isInstance = isInstance && "sortBy" in value;
    isInstance = isInstance && "sortOrder" in value;

    return isInstance;
}

export function SearchQueryAndSortingDtoFromJSON(json: any): SearchQueryAndSortingDto {
    return SearchQueryAndSortingDtoFromJSONTyped(json, false);
}

export function SearchQueryAndSortingDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchQueryAndSortingDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'searchQuery': json['searchQuery'],
        'selectBauleitplanverfahren': json['selectBauleitplanverfahren'],
        'selectBaugenehmigungsverfahren': json['selectBaugenehmigungsverfahren'],
        'selectWeiteresVerfahren': json['selectWeiteresVerfahren'],
        'selectBauvorhaben': json['selectBauvorhaben'],
        'selectGrundschule': json['selectGrundschule'],
        'selectGsNachmittagBetreuung': json['selectGsNachmittagBetreuung'],
        'selectHausFuerKinder': json['selectHausFuerKinder'],
        'selectKindergarten': json['selectKindergarten'],
        'selectKinderkrippe': json['selectKinderkrippe'],
        'selectMittelschule': json['selectMittelschule'],
        'filterStadtbezirkNummer': !exists(json, 'filterStadtbezirkNummer') ? undefined : json['filterStadtbezirkNummer'],
        'filterKitaplanungsbereichKitaPlbT': !exists(json, 'filterKitaplanungsbereichKitaPlbT') ? undefined : json['filterKitaplanungsbereichKitaPlbT'],
        'filterGrundschulsprengelNummer': !exists(json, 'filterGrundschulsprengelNummer') ? undefined : json['filterGrundschulsprengelNummer'],
        'filterMittelschulsprengelNummer': !exists(json, 'filterMittelschulsprengelNummer') ? undefined : json['filterMittelschulsprengelNummer'],
        'filterRealisierungsbeginnVon': !exists(json, 'filterRealisierungsbeginnVon') ? undefined : json['filterRealisierungsbeginnVon'],
        'filterRealisierungsbeginnBis': !exists(json, 'filterRealisierungsbeginnBis') ? undefined : json['filterRealisierungsbeginnBis'],
        'filterNurEigeneAbfragen': !exists(json, 'filterNurEigeneAbfragen') ? undefined : json['filterNurEigeneAbfragen'],
        'filterStatusAbfrage': !exists(json, 'filterStatusAbfrage') ? undefined : ((json['filterStatusAbfrage'] as Array<any>).map(StatusAbfrageFromJSON)),
        'filterSobonRelevant': !exists(json, 'filterSobonRelevant') ? undefined : UncertainBooleanFromJSON(json['filterSobonRelevant']),
        'filterWeGesamtVon': !exists(json, 'filterWeGesamtVon') ? undefined : json['filterWeGesamtVon'],
        'filterWeGesamtBis': !exists(json, 'filterWeGesamtBis') ? undefined : json['filterWeGesamtBis'],
        'filterGfWohnenGeplantVon': !exists(json, 'filterGfWohnenGeplantVon') ? undefined : json['filterGfWohnenGeplantVon'],
        'filterGfWohnenGeplantBis': !exists(json, 'filterGfWohnenGeplantBis') ? undefined : json['filterGfWohnenGeplantBis'],
        'filterStandVerfahrenAbfrage': !exists(json, 'filterStandVerfahrenAbfrage') ? undefined : json['filterStandVerfahrenAbfrage'],
        'filterInfrastruktureinrichtungStatus': !exists(json, 'filterInfrastruktureinrichtungStatus') ? undefined : json['filterInfrastruktureinrichtungStatus'],
        'filterStandVerfahrenBauvorhaben': !exists(json, 'filterStandVerfahrenBauvorhaben') ? undefined : json['filterStandVerfahrenBauvorhaben'],
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'sortBy': json['sortBy'],
        'sortOrder': json['sortOrder'],
    };
}

export function SearchQueryAndSortingDtoToJSON(value?: SearchQueryAndSortingDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'searchQuery': value.searchQuery,
        'selectBauleitplanverfahren': value.selectBauleitplanverfahren,
        'selectBaugenehmigungsverfahren': value.selectBaugenehmigungsverfahren,
        'selectWeiteresVerfahren': value.selectWeiteresVerfahren,
        'selectBauvorhaben': value.selectBauvorhaben,
        'selectGrundschule': value.selectGrundschule,
        'selectGsNachmittagBetreuung': value.selectGsNachmittagBetreuung,
        'selectHausFuerKinder': value.selectHausFuerKinder,
        'selectKindergarten': value.selectKindergarten,
        'selectKinderkrippe': value.selectKinderkrippe,
        'selectMittelschule': value.selectMittelschule,
        'filterStadtbezirkNummer': value.filterStadtbezirkNummer,
        'filterKitaplanungsbereichKitaPlbT': value.filterKitaplanungsbereichKitaPlbT,
        'filterGrundschulsprengelNummer': value.filterGrundschulsprengelNummer,
        'filterMittelschulsprengelNummer': value.filterMittelschulsprengelNummer,
        'filterRealisierungsbeginnVon': value.filterRealisierungsbeginnVon,
        'filterRealisierungsbeginnBis': value.filterRealisierungsbeginnBis,
        'filterNurEigeneAbfragen': value.filterNurEigeneAbfragen,
        'filterStatusAbfrage': value.filterStatusAbfrage === undefined ? undefined : ((value.filterStatusAbfrage as Array<any>).map(StatusAbfrageToJSON)),
        'filterSobonRelevant': UncertainBooleanToJSON(value.filterSobonRelevant),
        'filterWeGesamtVon': value.filterWeGesamtVon,
        'filterWeGesamtBis': value.filterWeGesamtBis,
        'filterGfWohnenGeplantVon': value.filterGfWohnenGeplantVon,
        'filterGfWohnenGeplantBis': value.filterGfWohnenGeplantBis,
        'filterStandVerfahrenAbfrage': value.filterStandVerfahrenAbfrage,
        'filterInfrastruktureinrichtungStatus': value.filterInfrastruktureinrichtungStatus,
        'filterStandVerfahrenBauvorhaben': value.filterStandVerfahrenBauvorhaben,
        'page': value.page,
        'pageSize': value.pageSize,
        'sortBy': value.sortBy,
        'sortOrder': value.sortOrder,
    };
}

