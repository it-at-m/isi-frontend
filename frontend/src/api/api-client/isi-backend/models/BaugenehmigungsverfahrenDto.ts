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
import type { AbfrageDto } from './AbfrageDto';
import {
    AbfrageDtoFromJSON,
    AbfrageDtoFromJSONTyped,
    AbfrageDtoToJSON,
} from './AbfrageDto';
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
 * @interface BaugenehmigungsverfahrenDto
 */
export interface BaugenehmigungsverfahrenDto extends AbfrageDto {
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenDto
     */
    aktenzeichenProLbk?: string;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenDto
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenDto
     */
    standVerfahren?: BaugenehmigungsverfahrenDtoStandVerfahrenEnum;
    /**
     * 
     * @type {string}
     * @memberof BaugenehmigungsverfahrenDto
     */
    standVerfahrenFreieEingabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof BaugenehmigungsverfahrenDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungMultiPolygonDto}
     * @memberof BaugenehmigungsverfahrenDto
     */
    verortung?: VerortungMultiPolygonDto;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof BaugenehmigungsverfahrenDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {Date}
     * @memberof BaugenehmigungsverfahrenDto
     */
    fristBearbeitung?: Date;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenDto>}
     * @memberof BaugenehmigungsverfahrenDto
     */
    abfragevariantenBaugenehmigungsverfahren?: Array<AbfragevarianteBaugenehmigungsverfahrenDto>;
    /**
     * 
     * @type {Array<AbfragevarianteBaugenehmigungsverfahrenDto>}
     * @memberof BaugenehmigungsverfahrenDto
     */
    abfragevariantenSachbearbeitungBaugenehmigungsverfahren?: Array<AbfragevarianteBaugenehmigungsverfahrenDto>;
}


/**
 * @export
 */
export const BaugenehmigungsverfahrenDtoStandVerfahrenEnum = {
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
export type BaugenehmigungsverfahrenDtoStandVerfahrenEnum = typeof BaugenehmigungsverfahrenDtoStandVerfahrenEnum[keyof typeof BaugenehmigungsverfahrenDtoStandVerfahrenEnum];


/**
 * Check if a given object implements the BaugenehmigungsverfahrenDto interface.
 */
export function instanceOfBaugenehmigungsverfahrenDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BaugenehmigungsverfahrenDtoFromJSON(json: any): BaugenehmigungsverfahrenDto {
    return BaugenehmigungsverfahrenDtoFromJSONTyped(json, false);
}

export function BaugenehmigungsverfahrenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaugenehmigungsverfahrenDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        ...AbfrageDtoFromJSONTyped(json, ignoreDiscriminator),
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

export function BaugenehmigungsverfahrenDtoToJSON(value?: BaugenehmigungsverfahrenDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AbfrageDtoToJSON(value),
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

