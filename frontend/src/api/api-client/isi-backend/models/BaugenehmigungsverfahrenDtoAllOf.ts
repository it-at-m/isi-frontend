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
import type { AbfragevarianteBaugenehmigungsverfahrenDto } from './AbfragevarianteBaugenehmigungsverfahrenDto';
import {
    AbfragevarianteBaugenehmigungsverfahrenDtoFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenDtoFromJSONTyped,
    AbfragevarianteBaugenehmigungsverfahrenDtoToJSON,
} from './AbfragevarianteBaugenehmigungsverfahrenDto';
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
import type { VerortungMultiPolygonDto } from './VerortungMultiPolygonDto';
import {
    VerortungMultiPolygonDtoFromJSON,
    VerortungMultiPolygonDtoFromJSONTyped,
    VerortungMultiPolygonDtoToJSON,
} from './VerortungMultiPolygonDto';

/**
 * 
 * @export
 * @interface BaugenehmigungsverfahrenDtoAllOf
 */
export interface BaugenehmigungsverfahrenDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    aktenzeichenProLbk?: string;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    standVerfahren?: BaugenehmigungsverfahrenDtoAllOfStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    fristBearbeitung?: Date;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenDto>}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    abfragevariantenBaugenehmigungsverfahren?: Array<AbfragevarianteBaugenehmigungsverfahrenDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenDto>}
     * @memberof BaugenehmigungsverfahrenDtoAllOf
     */
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren?: Array<AbfragevarianteBaugenehmigungsverfahrenDto>;
}


/**
 * @export
 */
export const BaugenehmigungsverfahrenDtoAllOfStandVerfahrenEnum = {
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
export type BaugenehmigungsverfahrenDtoAllOfStandVerfahrenEnum = typeof BaugenehmigungsverfahrenDtoAllOfStandVerfahrenEnum[keyof typeof BaugenehmigungsverfahrenDtoAllOfStandVerfahrenEnum];


/**
 * Check if a given object implements the BaugenehmigungsverfahrenDtoAllOf interface.
 */
export function instanceOfBaugenehmigungsverfahrenDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BaugenehmigungsverfahrenDtoAllOfFromJSON(json: any): BaugenehmigungsverfahrenDtoAllOf {
    return BaugenehmigungsverfahrenDtoAllOfFromJSONTyped(json, false);
}

export function BaugenehmigungsverfahrenDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugenehmigungsverfahrenDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'aktenzeichenProLbk': !exists(json, 'aktenzeichenProLbk') ? undefined : json['aktenzeichenProLbk'],
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'standVerfahren': !exists(json, 'standVerfahren') ? undefined : json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonDtoFromJSON(json['verortung']),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'fristBearbeitung': !exists(json, 'fristBearbeitung') ? undefined : (new Date(json['fristBearbeitung'])),
        'abfragevariantenBaugenehmigungsverfahren': !exists(json, 'abfragevariantenBaugenehmigungsverfahren') ? undefined : ((json['abfragevariantenBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenDtoFromJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': !exists(json, 'abfragevariantenSachbearbeitungBaugenehmigungsverfahren') ? undefined : ((json['abfragevariantenSachbearbeitungBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenDtoFromJSON)),
    };
}

export function BaugenehmigungsverfahrenDtoAllOfToJSON(value?: BaugenehmigungsverfahrenDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'aktenzeichenProLbk': value.aktenzeichenProLbk,
        'bebauungsplannummer': value.bebauungsplannummer,
        'standVerfahren': value.standVerfahren,
        'standVerfahrenFreieEingabe': value.standVerfahrenFreieEingabe,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungMultiPolygonDtoToJSON(value.verortung),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'fristBearbeitung': value.fristBearbeitung === undefined ? undefined : (value.fristBearbeitung.toISOString().substr(0,10)),
        'abfragevariantenBaugenehmigungsverfahren': value.abfragevariantenBaugenehmigungsverfahren === undefined ? undefined : ((value.abfragevariantenBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenDtoToJSON)),
        'abfragevariantenSachbearbeitungBaugenehmigungsverfahren': value.abfragevariantenSachbearbeitungBaugenehmigungsverfahren === undefined ? undefined : ((value.abfragevariantenSachbearbeitungBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenDtoToJSON)),
    };
}

