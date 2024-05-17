/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.2.0
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
 * @interface BaugenehmigungsverfahrenAngelegtDto
 */
export interface BaugenehmigungsverfahrenAngelegtDto extends AbfrageAngelegtDto {
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenAngelegtDto
     */
    aktenzeichenProLbk?: string;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenAngelegtDto
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenAngelegtDto
     */
    standVerfahren: BaugenehmigungsverfahrenAngelegtDtoStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenAngelegtDto
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof BaugenehmigungsverfahrenAngelegtDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof BaugenehmigungsverfahrenAngelegtDto
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof BaugenehmigungsverfahrenAngelegtDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof BaugenehmigungsverfahrenAngelegtDto
     */
    fristBearbeitung: Date;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenAngelegtDto>}
     * @memberof BaugenehmigungsverfahrenAngelegtDto
     */
    abfragevariantenBaugenehmigungsverfahren: Array<AbfragevarianteBaugenehmigungsverfahrenAngelegtDto>;
}


/**
 * @export
 */
export const BaugenehmigungsverfahrenAngelegtDtoStandVerfahrenEnum = {
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
export type BaugenehmigungsverfahrenAngelegtDtoStandVerfahrenEnum = typeof BaugenehmigungsverfahrenAngelegtDtoStandVerfahrenEnum[keyof typeof BaugenehmigungsverfahrenAngelegtDtoStandVerfahrenEnum];


/**
 * Check if a given object implements the BaugenehmigungsverfahrenAngelegtDto interface.
 */
export function instanceOfBaugenehmigungsverfahrenAngelegtDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "standVerfahren" in value;
    isInstance = isInstance && "fristBearbeitung" in value;
    isInstance = isInstance && "abfragevariantenBaugenehmigungsverfahren" in value;

    return isInstance;
}

export function BaugenehmigungsverfahrenAngelegtDtoFromJSON(json: any): BaugenehmigungsverfahrenAngelegtDto {
    return BaugenehmigungsverfahrenAngelegtDtoFromJSONTyped(json, false);
}

export function BaugenehmigungsverfahrenAngelegtDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugenehmigungsverfahrenAngelegtDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...AbfrageAngelegtDtoFromJSONTyped(json, ignoreDiscriminator),
        'aktenzeichenProLbk': !exists(json, 'aktenzeichenProLbk') ? undefined : json['aktenzeichenProLbk'],
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'standVerfahren': json['standVerfahren'],
        'standVerfahrenFreieEingabe': !exists(json, 'standVerfahrenFreieEingabe') ? undefined : json['standVerfahrenFreieEingabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungMultiPolygonDtoFromJSON(json['verortung']),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'fristBearbeitung': (new Date(json['fristBearbeitung'])),
        'abfragevariantenBaugenehmigungsverfahren': ((json['abfragevariantenBaugenehmigungsverfahren'] as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoFromJSON)),
    };
}

export function BaugenehmigungsverfahrenAngelegtDtoToJSON(value?: BaugenehmigungsverfahrenAngelegtDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageAngelegtDtoToJSON(value),
        'aktenzeichenProLbk': value.aktenzeichenProLbk,
        'bebauungsplannummer': value.bebauungsplannummer,
        'standVerfahren': value.standVerfahren,
        'standVerfahrenFreieEingabe': value.standVerfahrenFreieEingabe,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungMultiPolygonDtoToJSON(value.verortung),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'fristBearbeitung': (value.fristBearbeitung.toISOString().substr(0,10)),
        'abfragevariantenBaugenehmigungsverfahren': ((value.abfragevariantenBaugenehmigungsverfahren as Array<any>).map(AbfragevarianteBaugenehmigungsverfahrenAngelegtDtoToJSON)),
    };
}

