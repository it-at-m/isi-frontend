/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.1.0
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
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';
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
 * @interface EntityModelBauvorhaben
 */
export interface EntityModelBauvorhaben {
    /**
     * 
     * @type {number}
     * @memberof EntityModelBauvorhaben
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelBauvorhaben
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelBauvorhaben
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof EntityModelBauvorhaben
     */
    nameVorhaben?: string;
    /**
     * 
     * @type {number}
     * @memberof EntityModelBauvorhaben
     */
    grundstuecksgroesse?: number;
    /**
     * 
     * @type {string}
     * @memberof EntityModelBauvorhaben
     */
    standVerfahren?: EntityModelBauvorhabenStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof EntityModelBauvorhaben
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelBauvorhaben
     */
    bauvorhabenNummer?: string;
    /**
     * 
     * @type {Adresse}
     * @memberof EntityModelBauvorhaben
     */
    adresse?: Adresse;
    /**
     * 
     * @type {VerortungMultiPolygon}
     * @memberof EntityModelBauvorhaben
     */
    verortung?: VerortungMultiPolygon;
    /**
     * 
     * @type {string}
     * @memberof EntityModelBauvorhaben
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelBauvorhaben
     */
    fisNummer?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelBauvorhaben
     */
    anmerkung?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof EntityModelBauvorhaben
     */
    sobonRelevant?: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof EntityModelBauvorhaben
     */
    sobonJahr?: EntityModelBauvorhabenSobonJahrEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof EntityModelBauvorhaben
     */
    wesentlicheRechtsgrundlage?: Array<EntityModelBauvorhabenWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof EntityModelBauvorhaben
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof EntityModelBauvorhaben
     */
    artFnp?: Array<EntityModelBauvorhabenArtFnpEnum>;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof EntityModelBauvorhaben
     */
    links?: { [key: string]: Link; };
}


/**
 * @export
 */
export const EntityModelBauvorhabenStandVerfahrenEnum = {
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
    FreieEingabe: 'FREIE_EINGABE',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type EntityModelBauvorhabenStandVerfahrenEnum = typeof EntityModelBauvorhabenStandVerfahrenEnum[keyof typeof EntityModelBauvorhabenStandVerfahrenEnum];

/**
 * @export
 */
export const EntityModelBauvorhabenSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type EntityModelBauvorhabenSobonJahrEnum = typeof EntityModelBauvorhabenSobonJahrEnum[keyof typeof EntityModelBauvorhabenSobonJahrEnum];

/**
 * @export
 */
export const EntityModelBauvorhabenWesentlicheRechtsgrundlageEnum = {
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
export type EntityModelBauvorhabenWesentlicheRechtsgrundlageEnum = typeof EntityModelBauvorhabenWesentlicheRechtsgrundlageEnum[keyof typeof EntityModelBauvorhabenWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const EntityModelBauvorhabenArtFnpEnum = {
    Unspecified: 'UNSPECIFIED',
    Wr: 'WR',
    Wa: 'WA',
    Mu: 'MU',
    Mk: 'MK',
    Mi: 'MI',
    Ge: 'GE',
    InfoFehlt: 'INFO_FEHLT'
} as const;
export type EntityModelBauvorhabenArtFnpEnum = typeof EntityModelBauvorhabenArtFnpEnum[keyof typeof EntityModelBauvorhabenArtFnpEnum];


/**
 * Check if a given object implements the EntityModelBauvorhaben interface.
 */
export function instanceOfEntityModelBauvorhaben(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EntityModelBauvorhabenFromJSON(json: any): EntityModelBauvorhaben {
    return EntityModelBauvorhabenFromJSONTyped(json, false);
}

export function EntityModelBauvorhabenFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityModelBauvorhaben {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
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
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
    };
}

export function EntityModelBauvorhabenToJSON(value?: EntityModelBauvorhaben | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
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
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
    };
}
