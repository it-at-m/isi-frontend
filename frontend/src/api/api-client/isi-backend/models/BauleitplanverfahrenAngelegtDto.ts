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
import type { AbfrageAngelegtDto } from './AbfrageAngelegtDto';
import {
    AbfrageAngelegtDtoFromJSON,
    AbfrageAngelegtDtoFromJSONTyped,
    AbfrageAngelegtDtoToJSON,
} from './AbfrageAngelegtDto';
import type { AbfragevarianteBauleitplanverfahrenAngelegtDto } from './AbfragevarianteBauleitplanverfahrenAngelegtDto';
import {
    AbfragevarianteBauleitplanverfahrenAngelegtDtoFromJSON,
    AbfragevarianteBauleitplanverfahrenAngelegtDtoFromJSONTyped,
    AbfragevarianteBauleitplanverfahrenAngelegtDtoToJSON,
} from './AbfragevarianteBauleitplanverfahrenAngelegtDto';
import type { AdresseDto } from './AdresseDto';
import {
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import type { DokumentDto } from './DokumentDto';
import {
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';
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
 * @interface BauleitplanverfahrenAngelegtDto
 */
export interface BauleitplanverfahrenAngelegtDto extends AbfrageAngelegtDto {
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    sobonRelevant: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    sobonJahr?: BauleitplanverfahrenAngelegtDtoSobonJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    standVerfahren: BauleitplanverfahrenAngelegtDtoStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    fristBearbeitung: Date;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    mitzeichnungBeschlussentwurf: UncertainBoolean;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenAngelegtDto>}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    abfragevariantenBauleitplanverfahren: Array<AbfragevarianteBauleitplanverfahrenAngelegtDto>;
}


/**
 * @export
 */
export const BauleitplanverfahrenAngelegtDtoSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type BauleitplanverfahrenAngelegtDtoSobonJahrEnum = typeof BauleitplanverfahrenAngelegtDtoSobonJahrEnum[keyof typeof BauleitplanverfahrenAngelegtDtoSobonJahrEnum];

/**
 * @export
 */
export const BauleitplanverfahrenAngelegtDtoStandVerfahrenEnum = {
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
export type BauleitplanverfahrenAngelegtDtoStandVerfahrenEnum = typeof BauleitplanverfahrenAngelegtDtoStandVerfahrenEnum[keyof typeof BauleitplanverfahrenAngelegtDtoStandVerfahrenEnum];


/**
 * Check if a given object implements the BauleitplanverfahrenAngelegtDto interface.
 */
export function instanceOfBauleitplanverfahrenAngelegtDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "sobonRelevant" in value;
    isInstance = isInstance && "standVerfahren" in value;
    isInstance = isInstance && "fristBearbeitung" in value;
    isInstance = isInstance && "mitzeichnungBeschlussentwurf" in value;
    isInstance = isInstance && "abfragevariantenBauleitplanverfahren" in value;

    return isInstance;
}

export function BauleitplanverfahrenAngelegtDtoFromJSON(json: any): BauleitplanverfahrenAngelegtDto {
    return BauleitplanverfahrenAngelegtDtoFromJSONTyped(json, false);
}

export function BauleitplanverfahrenAngelegtDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauleitplanverfahrenAngelegtDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...AbfrageAngelegtDtoFromJSONTyped(json, ignoreDiscriminator),
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'sobonRelevant': UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'standVerfahren': json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonDtoFromJSON(json['verortung']),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'fristBearbeitung': (new Date(json['fristBearbeitung'])),
        'mitzeichnungBeschlussentwurf': UncertainBooleanFromJSON(json['mitzeichnungBeschlussentwurf']),
        'abfragevariantenBauleitplanverfahren': ((json['abfragevariantenBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenAngelegtDtoFromJSON)),
    };
}

export function BauleitplanverfahrenAngelegtDtoToJSON(value?: BauleitplanverfahrenAngelegtDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageAngelegtDtoToJSON(value),
        'bebauungsplannummer': value.bebauungsplannummer,
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'sobonJahr': value.sobonJahr,
        'standVerfahren': value.standVerfahren,
        'standVerfahrenFreieEingabe': value.standVerfahrenFreieEingabe,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungMultiPolygonDtoToJSON(value.verortung),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'fristBearbeitung': (value.fristBearbeitung.toISOString().substr(0,10)),
        'mitzeichnungBeschlussentwurf': UncertainBooleanToJSON(value.mitzeichnungBeschlussentwurf),
        'abfragevariantenBauleitplanverfahren': ((value.abfragevariantenBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenAngelegtDtoToJSON)),
    };
}

