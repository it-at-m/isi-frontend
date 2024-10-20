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
import type { AbfragevarianteBaugenehmigungsverfahrenAngelegtDto } from './AbfragevarianteBaugenehmigungsverfahrenAngelegtDto';
import {
    AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoFromJSON,
    AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoFromJSONTyped,
    AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoToJSON,
} from './AbfragevarianteBaugenehmigungsverfahrenAngelegtDto';
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
 * @interface BaugenehmigungsverfahrenAngelegtDtoAllOf
 */
export interface BaugenehmigungsverfahrenAngelegtDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenAngelegtDtoAllOf
     */
    aktenzeichenProLbk?: string;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenAngelegtDtoAllOf
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenAngelegtDtoAllOf
     */
    standVerfahren?: BaugenehmigungsverfahrenAngelegtDtoAllOfStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenAngelegtDtoAllOf
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof BaugenehmigungsverfahrenAngelegtDtoAllOf
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof BaugenehmigungsverfahrenAngelegtDtoAllOf
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof BaugenehmigungsverfahrenAngelegtDtoAllOf
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof BaugenehmigungsverfahrenAngelegtDtoAllOf
     */
    fristBearbeitung?: Date;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenAngelegtDto>}
     * @memberof BaugenehmigungsverfahrenAngelegtDtoAllOf
     */
    abfragevariantenBaugenehmigungsverfahren?: Array<AbfragevarianteBaugenehmigungsverfahrenAngelegtDto>;
}


/**
 * @export
 */
export const BaugenehmigungsverfahrenAngelegtDtoAllOfStandVerfahrenEnum = {
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
export type BaugenehmigungsverfahrenAngelegtDtoAllOfStandVerfahrenEnum = typeof BaugenehmigungsverfahrenAngelegtDtoAllOfStandVerfahrenEnum[keyof typeof BaugenehmigungsverfahrenAngelegtDtoAllOfStandVerfahrenEnum];


/**
 * Check if a given object implements the BaugenehmigungsverfahrenAngelegtDtoAllOf interface.
 */
export function instanceOfBaugenehmigungsverfahrenAngelegtDtoAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BaugenehmigungsverfahrenAngelegtDtoAllOfFromJSON(json: any): BaugenehmigungsverfahrenAngelegtDtoAllOf {
    return BaugenehmigungsverfahrenAngelegtDtoAllOfFromJSONTyped(json, false);
}

export function BaugenehmigungsverfahrenAngelegtDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugenehmigungsverfahrenAngelegtDtoAllOf {
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
        'abfragevariantenBaugenehmigungsverfahren': !exists(json, 'abfragevariantenBaugenehmigungsverfahren') ? undefined : ((json['abfragevariantenBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoFromJSON)),
    };
}

export function BaugenehmigungsverfahrenAngelegtDtoAllOfToJSON(value?: BaugenehmigungsverfahrenAngelegtDtoAllOf | null): any {
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
        'abfragevariantenBaugenehmigungsverfahren': value.abfragevariantenBaugenehmigungsverfahren === undefined ? undefined : ((value.abfragevariantenBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoToJSON)),
    };
}

