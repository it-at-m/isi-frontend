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
import type { AbfrageDto } from './AbfrageDto';
import {
    AbfrageDtoFromJSON,
    AbfrageDtoFromJSONTyped,
    AbfrageDtoToJSON,
} from './AbfrageDto';
import type { AbfragevarianteBauleitplanverfahrenDto } from './AbfragevarianteBauleitplanverfahrenDto';
import {
    AbfragevarianteBauleitplanverfahrenDtoFromJSON,
    AbfragevarianteBauleitplanverfahrenDtoFromJSONTyped,
    AbfragevarianteBauleitplanverfahrenDtoToJSON,
} from './AbfragevarianteBauleitplanverfahrenDto';
import type { AdresseDto } from './AdresseDto';
import {
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import type { BearbeitungshistorieDto } from './BearbeitungshistorieDto';
import {
    BearbeitungshistorieDtoFromJSON,
    BearbeitungshistorieDtoFromJSONTyped,
    BearbeitungshistorieDtoToJSON,
} from './BearbeitungshistorieDto';
import type { DokumentDto } from './DokumentDto';
import {
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';
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
import type { VerortungMultiPolygonDto } from './VerortungMultiPolygonDto';
import {
    VerortungMultiPolygonDtoFromJSON,
    VerortungMultiPolygonDtoFromJSONTyped,
    VerortungMultiPolygonDtoToJSON,
} from './VerortungMultiPolygonDto';

import {
} from './';

/**
 * 
 * @export
 * @interface BauleitplanverfahrenDto
 */
export interface BauleitplanverfahrenDto extends AbfrageDto {
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenDto
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof BauleitplanverfahrenDto
     */
    sobonRelevant?: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenDto
     */
    sobonJahr?: BauleitplanverfahrenDtoSobonJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenDto
     */
    standVerfahren?: BauleitplanverfahrenDtoStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenDto
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof BauleitplanverfahrenDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof BauleitplanverfahrenDto
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof BauleitplanverfahrenDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof BauleitplanverfahrenDto
     */
    fristBearbeitung?: Date;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof BauleitplanverfahrenDto
     */
    mitzeichnungBeschlussentwurf?: UncertainBoolean;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenDto>}
     * @memberof BauleitplanverfahrenDto
     */
    abfragevariantenBauleitplanverfahren?: Array<AbfragevarianteBauleitplanverfahrenDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenDto>}
     * @memberof BauleitplanverfahrenDto
     */
    abfragevariantenSachbearbeitungBauleitplanverfahren?: Array<AbfragevarianteBauleitplanverfahrenDto>;
}


/**
 * @export
 */
export const BauleitplanverfahrenDtoSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type BauleitplanverfahrenDtoSobonJahrEnum = typeof BauleitplanverfahrenDtoSobonJahrEnum[keyof typeof BauleitplanverfahrenDtoSobonJahrEnum];

/**
 * @export
 */
export const BauleitplanverfahrenDtoStandVerfahrenEnum = {
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
export type BauleitplanverfahrenDtoStandVerfahrenEnum = typeof BauleitplanverfahrenDtoStandVerfahrenEnum[keyof typeof BauleitplanverfahrenDtoStandVerfahrenEnum];


/**
 * Check if a given object implements the BauleitplanverfahrenDto interface.
 */
export function instanceOfBauleitplanverfahrenDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BauleitplanverfahrenDtoFromJSON(json: any): BauleitplanverfahrenDto {
    return BauleitplanverfahrenDtoFromJSONTyped(json, false);
}

export function BauleitplanverfahrenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauleitplanverfahrenDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...AbfrageDtoFromJSONTyped(json, ignoreDiscriminator),
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'sobonRelevant': !exists(json, 'sobonRelevant') ? undefined : UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'standVerfahren': !exists(json, 'standVerfahren') ? undefined : json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonDtoFromJSON(json['verortung']),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'fristBearbeitung': !exists(json, 'fristBearbeitung') ? undefined : (new Date(json['fristBearbeitung'])),
        'mitzeichnungBeschlussentwurf': !exists(json, 'mitzeichnungBeschlussentwurf') ? undefined : UncertainBooleanFromJSON(json['mitzeichnungBeschlussentwurf']),
        'abfragevariantenBauleitplanverfahren': !exists(json, 'abfragevariantenBauleitplanverfahren') ? undefined : ((json['abfragevariantenBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenDtoFromJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': !exists(json, 'abfragevariantenSachbearbeitungBauleitplanverfahren') ? undefined : ((json['abfragevariantenSachbearbeitungBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenDtoFromJSON)),
    };
}

export function BauleitplanverfahrenDtoToJSON(value?: BauleitplanverfahrenDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageDtoToJSON(value),
        'bebauungsplannummer': value.bebauungsplannummer,
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'sobonJahr': value.sobonJahr,
        'standVerfahren': value.standVerfahren,
        'standVerfahrenFreieEingabe': value.standVerfahrenFreieEingabe,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungMultiPolygonDtoToJSON(value.verortung),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'fristBearbeitung': value.fristBearbeitung === undefined ? undefined : (value.fristBearbeitung.toISOString().substr(0,10)),
        'mitzeichnungBeschlussentwurf': UncertainBooleanToJSON(value.mitzeichnungBeschlussentwurf),
        'abfragevariantenBauleitplanverfahren': value.abfragevariantenBauleitplanverfahren === undefined ? undefined : ((value.abfragevariantenBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenDtoToJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': value.abfragevariantenSachbearbeitungBauleitplanverfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenDtoToJSON)),
    };
}

