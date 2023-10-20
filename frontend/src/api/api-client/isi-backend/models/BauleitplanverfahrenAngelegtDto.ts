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
import {
    AbfrageAngelegtDto,
    AbfrageAngelegtDtoFromJSON,
    AbfrageAngelegtDtoFromJSONTyped,
    AbfrageAngelegtDtoToJSON,
} from './AbfrageAngelegtDto';
import {
    AbfragevarianteBauleitplanverfahrenAngelegtDto,
    AbfragevarianteBauleitplanverfahrenAngelegtDtoFromJSON,
    AbfragevarianteBauleitplanverfahrenAngelegtDtoFromJSONTyped,
    AbfragevarianteBauleitplanverfahrenAngelegtDtoToJSON,
} from './AbfragevarianteBauleitplanverfahrenAngelegtDto';
import {
    AdresseDto,
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import {
    BauleitplanverfahrenAngelegtDtoAllOf,
    BauleitplanverfahrenAngelegtDtoAllOfFromJSON,
    BauleitplanverfahrenAngelegtDtoAllOfFromJSONTyped,
    BauleitplanverfahrenAngelegtDtoAllOfToJSON,
} from './BauleitplanverfahrenAngelegtDtoAllOf';
import {
    DokumentDto,
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';
import {
    UncertainBoolean,
    UncertainBooleanFromJSON,
    UncertainBooleanFromJSONTyped,
    UncertainBooleanToJSON,
} from './UncertainBoolean';
import {
    VerortungDto,
    VerortungDtoFromJSON,
    VerortungDtoFromJSONTyped,
    VerortungDtoToJSON,
} from './VerortungDto';

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
     * @type {VerortungDto}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    verortung?: VerortungDto;
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
    offizielleMitzeichnung: UncertainBoolean;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenAngelegtDto>}
     * @memberof BauleitplanverfahrenAngelegtDto
     */
    abfragevarianten?: Array<AbfragevarianteBauleitplanverfahrenAngelegtDto>;
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
export type BauleitplanverfahrenAngelegtDtoStandVerfahrenEnum = typeof BauleitplanverfahrenAngelegtDtoStandVerfahrenEnum[keyof typeof BauleitplanverfahrenAngelegtDtoStandVerfahrenEnum];


export function BauleitplanverfahrenAngelegtDtoFromJSON(json: any): BauleitplanverfahrenAngelegtDto {
    return BauleitplanverfahrenAngelegtDtoFromJSONTyped(json, false);
}

export function BauleitplanverfahrenAngelegtDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauleitplanverfahrenAngelegtDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...AbfrageAngelegtDtoFromJSONTyped(json, ignoreDiscriminator),
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'sobonRelevant': UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'standVerfahren': json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungDtoFromJSON(json['verortung']),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'fristBearbeitung': (new Date(json['fristBearbeitung'])),
        'offizielleMitzeichnung': UncertainBooleanFromJSON(json['offizielleMitzeichnung']),
        'abfragevarianten': !exists(json, 'abfragevarianten') ? undefined : ((json['abfragevarianten'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenAngelegtDtoFromJSON)),
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
        'verortung': VerortungDtoToJSON(value.verortung),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'fristBearbeitung': (value.fristBearbeitung.toISOString().substr(0,10)),
        'offizielleMitzeichnung': UncertainBooleanToJSON(value.offizielleMitzeichnung),
        'abfragevarianten': value.abfragevarianten === undefined ? undefined : ((value.abfragevarianten as Array<any>).map(AbfragevarianteBauleitplanverfahrenAngelegtDtoToJSON)),
    };
}
