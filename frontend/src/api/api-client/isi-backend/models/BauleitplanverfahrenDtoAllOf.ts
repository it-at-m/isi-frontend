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

/**
 * 
 * @export
 * @interface BauleitplanverfahrenDtoAllOf
 */
export interface BauleitplanverfahrenDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    sobonRelevant?: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    sobonJahr?: BauleitplanverfahrenDtoAllOfSobonJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    standVerfahren?: BauleitplanverfahrenDtoAllOfStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    fristBearbeitung?: Date;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    offizielleMitzeichnung?: UncertainBoolean;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenDto>}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    abfragevariantenBauleitplanverfahren?: Array<AbfragevarianteBauleitplanverfahrenDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBauleitplanverfahrenDto>}
     * @memberof BauleitplanverfahrenDtoAllOf
     */
    abfragevariantenSachbearbeitungBauleitplanverfahren?: Array<AbfragevarianteBauleitplanverfahrenDto>;
}


/**
 * @export
 */
export const BauleitplanverfahrenDtoAllOfSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type BauleitplanverfahrenDtoAllOfSobonJahrEnum = typeof BauleitplanverfahrenDtoAllOfSobonJahrEnum[keyof typeof BauleitplanverfahrenDtoAllOfSobonJahrEnum];

/**
 * @export
 */
export const BauleitplanverfahrenDtoAllOfStandVerfahrenEnum = {
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
export type BauleitplanverfahrenDtoAllOfStandVerfahrenEnum = typeof BauleitplanverfahrenDtoAllOfStandVerfahrenEnum[keyof typeof BauleitplanverfahrenDtoAllOfStandVerfahrenEnum];


/**
 * Check if a given object implements the BauleitplanverfahrenDtoAllOf interface.
 */
export function instanceOfBauleitplanverfahrenDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BauleitplanverfahrenDtoAllOfFromJSON(json: any): BauleitplanverfahrenDtoAllOf {
    return BauleitplanverfahrenDtoAllOfFromJSONTyped(json, false);
}

export function BauleitplanverfahrenDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauleitplanverfahrenDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'sobonRelevant': !exists(json, 'sobonRelevant') ? undefined : UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'standVerfahren': !exists(json, 'standVerfahren') ? undefined : json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonDtoFromJSON(json['verortung']),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'fristBearbeitung': !exists(json, 'fristBearbeitung') ? undefined : (new Date(json['fristBearbeitung'])),
        'offizielleMitzeichnung': !exists(json, 'offizielleMitzeichnung') ? undefined : UncertainBooleanFromJSON(json['offizielleMitzeichnung']),
        'abfragevariantenBauleitplanverfahren': !exists(json, 'abfragevariantenBauleitplanverfahren') ? undefined : ((json['abfragevariantenBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenDtoFromJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': !exists(json, 'abfragevariantenSachbearbeitungBauleitplanverfahren') ? undefined : ((json['abfragevariantenSachbearbeitungBauleitplanverfahren'] as Array<any>).map(AbfragevarianteBauleitplanverfahrenDtoFromJSON)),
    };
}

export function BauleitplanverfahrenDtoAllOfToJSON(value?: BauleitplanverfahrenDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'bebauungsplannummer': value.bebauungsplannummer,
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'sobonJahr': value.sobonJahr,
        'standVerfahren': value.standVerfahren,
        'standVerfahrenFreieEingabe': value.standVerfahrenFreieEingabe,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungMultiPolygonDtoToJSON(value.verortung),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'fristBearbeitung': value.fristBearbeitung === undefined ? undefined : (value.fristBearbeitung.toISOString().substr(0,10)),
        'offizielleMitzeichnung': UncertainBooleanToJSON(value.offizielleMitzeichnung),
        'abfragevariantenBauleitplanverfahren': value.abfragevariantenBauleitplanverfahren === undefined ? undefined : ((value.abfragevariantenBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenDtoToJSON)),
        'abfragevariantenSachbearbeitungBauleitplanverfahren': value.abfragevariantenSachbearbeitungBauleitplanverfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungBauleitplanverfahren as Array<any>).map(AbfragevarianteBauleitplanverfahrenDtoToJSON)),
    };
}

