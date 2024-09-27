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
import type { Adresse } from './Adresse';
import {
    AdresseFromJSON,
    AdresseFromJSONTyped,
    AdresseToJSON,
} from './Adresse';
import type { BearbeitendePerson } from './BearbeitendePerson';
import {
    BearbeitendePersonFromJSON,
    BearbeitendePersonFromJSONTyped,
    BearbeitendePersonToJSON,
} from './BearbeitendePerson';
import type { UncertainBoolean } from './UncertainBoolean';
import {
    UncertainBooleanFromJSON,
    UncertainBooleanFromJSONTyped,
    UncertainBooleanToJSON,
} from './UncertainBoolean';
import type { VerortungMultiPolygon } from './VerortungMultiPolygon';
import {
    VerortungMultiPolygonFromJSON,
    VerortungMultiPolygonFromJSONTyped,
    VerortungMultiPolygonToJSON,
} from './VerortungMultiPolygon';

/**
 * 
 * @export
 * @interface BauvorhabenRequestBody
 */
export interface BauvorhabenRequestBody {
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof BauvorhabenRequestBody
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof BauvorhabenRequestBody
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BauvorhabenRequestBody
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {BearbeitendePerson}
     * @memberof BauvorhabenRequestBody
     */
    bearbeitendePerson?: BearbeitendePerson;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    nameVorhaben?: string;
    /**
     * 
     * @type {number}
     * @memberof BauvorhabenRequestBody
     */
    grundstuecksgroesse?: number;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    standVerfahren?: BauvorhabenRequestBodyStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    bauvorhabenNummer?: string;
    /**
     * 
     * @type {Adresse}
     * @memberof BauvorhabenRequestBody
     */
    adresse?: Adresse;
    /**
     * 
     * @type {VerortungMultiPolygon}
     * @memberof BauvorhabenRequestBody
     */
    verortung?: VerortungMultiPolygon;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    fisNummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    anmerkung?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof BauvorhabenRequestBody
     */
    sobonRelevant?: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    sobonJahr?: BauvorhabenRequestBodySobonJahrEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof BauvorhabenRequestBody
     */
    wesentlicheRechtsgrundlage?: Array<BauvorhabenRequestBodyWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof BauvorhabenRequestBody
     */
    artFnp?: Array<BauvorhabenRequestBodyArtFnpEnum>;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    artFnpFreieEingabe?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof BauvorhabenRequestBody
     */
    dokumente?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenRequestBody
     */
    relevanteAbfragevariante?: string;
}


/**
 * @export
 */
export const BauvorhabenRequestBodyStandVerfahrenEnum = {
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
export type BauvorhabenRequestBodyStandVerfahrenEnum = typeof BauvorhabenRequestBodyStandVerfahrenEnum[keyof typeof BauvorhabenRequestBodyStandVerfahrenEnum];

/**
 * @export
 */
export const BauvorhabenRequestBodySobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type BauvorhabenRequestBodySobonJahrEnum = typeof BauvorhabenRequestBodySobonJahrEnum[keyof typeof BauvorhabenRequestBodySobonJahrEnum];

/**
 * @export
 */
export const BauvorhabenRequestBodyWesentlicheRechtsgrundlageEnum = {
    QualifizierterBebauungsplan: 'QUALIFIZIERTER_BEBAUUNGSPLAN',
    VorhabensbezogenerBebauungsplan: 'VORHABENSBEZOGENER_BEBAUUNGSPLAN',
    EinfacherBebauungsplanParagraph30: 'EINFACHER_BEBAUUNGSPLAN_PARAGRAPH_30',
    EinfacherBebauungsplanParagraph30Ivm3435: 'EINFACHER_BEBAUUNGSPLAN_PARAGRAPH_30_IVM_34_35',
    SektoralerBebauungsplanParagraph9: 'SEKTORALER_BEBAUUNGSPLAN_PARAGRAPH_9',
    SektoralerBebauungsplanParagraph30Ivm3435: 'SEKTORALER_BEBAUUNGSPLAN_PARAGRAPH_30_IVM_34_35',
    Innenbereich: 'INNENBEREICH',
    Aussenbereich: 'AUSSENBEREICH',
    Befreiung: 'BEFREIUNG',
    InfoFehlt: 'INFO_FEHLT',
    FreieEingabe: 'FREIE_EINGABE'
} as const;
export type BauvorhabenRequestBodyWesentlicheRechtsgrundlageEnum = typeof BauvorhabenRequestBodyWesentlicheRechtsgrundlageEnum[keyof typeof BauvorhabenRequestBodyWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const BauvorhabenRequestBodyArtFnpEnum = {
    Unspecified: 'UNSPECIFIED',
    Wr: 'WR',
    Wa: 'WA',
    Mu: 'MU',
    Mk: 'MK',
    Mi: 'MI',
    Ge: 'GE',
    InfoFehlt: 'INFO_FEHLT',
    FreieEingabe: 'FREIE_EINGABE'
} as const;
export type BauvorhabenRequestBodyArtFnpEnum = typeof BauvorhabenRequestBodyArtFnpEnum[keyof typeof BauvorhabenRequestBodyArtFnpEnum];


/**
 * Check if a given object implements the BauvorhabenRequestBody interface.
 */
export function instanceOfBauvorhabenRequestBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BauvorhabenRequestBodyFromJSON(json: any): BauvorhabenRequestBody {
    return BauvorhabenRequestBodyFromJSONTyped(json, false);
}

export function BauvorhabenRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauvorhabenRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'bearbeitendePerson': !exists(json, 'bearbeitendePerson') ? undefined : BearbeitendePersonFromJSON(json['bearbeitendePerson']),
        'nameVorhaben': !exists(json, 'nameVorhaben') ? undefined : json['nameVorhaben'],
        'grundstuecksgroesse': !exists(json, 'grundstuecksgroesse') ? undefined : json['grundstuecksgroesse'],
        'standVerfahren': !exists(json, 'standVerfahren') ? undefined : json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'bauvorhabenNummer': !exists(json, 'bauvorhabenNummer') ? undefined : json['bauvorhabenNummer'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonFromJSON(json['verortung']),
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'fisNummer': !exists(json, 'fisNummer') ? undefined : json['fisNummer'],
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'sobonRelevant': !exists(json, 'sobonRelevant') ? undefined : UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'wesentlicheRechtsgrundlage': !exists(json, 'wesentlicheRechtsgrundlage') ? undefined : json['wesentlicheRechtsgrundlage'],
        'wesentlicheRechtsgrundlageFreieEingabe': !exists(json, 'wesentlicheRechtsgrundlageFreieEingabe') ? undefined : json['wesentlicheRechtsgrundlageFreieEingabe'],
        'artFnp': !exists(json, 'artFnp') ? undefined : json['artFnp'],
        'artFnpFreieEingabe': !exists(json, 'artFnpFreieEingabe') ? undefined : json['artFnpFreieEingabe'],
        'dokumente': !exists(json, 'dokumente') ? undefined : json['dokumente'],
        'relevanteAbfragevariante': !exists(json, 'relevanteAbfragevariante') ? undefined : json['relevanteAbfragevariante'],
    };
}

export function BauvorhabenRequestBodyToJSON(value?: BauvorhabenRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'bearbeitendePerson': BearbeitendePersonToJSON(value.bearbeitendePerson),
        'nameVorhaben': value.nameVorhaben,
        'grundstuecksgroesse': value.grundstuecksgroesse,
        'standVerfahren': value.standVerfahren,
        'standVerfahrenFreieEingabe': value.standVerfahrenFreieEingabe,
        'bauvorhabenNummer': value.bauvorhabenNummer,
        'adresse': AdresseToJSON(value.adresse),
        'verortung': VerortungMultiPolygonToJSON(value.verortung),
        'bebauungsplannummer': value.bebauungsplannummer,
        'fisNummer': value.fisNummer,
        'anmerkung': value.anmerkung,
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'sobonJahr': value.sobonJahr,
        'wesentlicheRechtsgrundlage': value.wesentlicheRechtsgrundlage,
        'wesentlicheRechtsgrundlageFreieEingabe': value.wesentlicheRechtsgrundlageFreieEingabe,
        'artFnp': value.artFnp,
        'artFnpFreieEingabe': value.artFnpFreieEingabe,
        'dokumente': value.dokumente,
        'relevanteAbfragevariante': value.relevanteAbfragevariante,
    };
}

