/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AdresseDto,
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import {
    DokumentDto,
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';
import {
    StatusAbfrage,
    StatusAbfrageFromJSON,
    StatusAbfrageFromJSONTyped,
    StatusAbfrageToJSON,
} from './StatusAbfrage';
import {
    VerortungDto,
    VerortungDtoFromJSON,
    VerortungDtoFromJSONTyped,
    VerortungDtoToJSON,
} from './VerortungDto';

/**
 * 
 * @export
 * @interface AbfrageDto
 */
export interface AbfrageDto {
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof AbfrageDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    allgemeineOrtsangabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof AbfrageDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungDto}
     * @memberof AbfrageDto
     */
    verortung?: VerortungDto;
    /**
     * 
     * @type {Date}
     * @memberof AbfrageDto
     */
    fristStellungnahme: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {StatusAbfrage}
     * @memberof AbfrageDto
     */
    statusAbfrage?: StatusAbfrage;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    nameAbfrage?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    standVorhaben?: AbfrageDtoStandVorhabenEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfrageDto
     */
    bauvorhaben?: string;
}


/**
 * @export
 */
export const AbfrageDtoStandVorhabenEnum = {
    Unspecified: 'UNSPECIFIED',
    GrundsatzEckdatenbeschluss: 'GRUNDSATZ_ECKDATENBESCHLUSS',
    Aufstellungsbeschluss: 'AUFSTELLUNGSBESCHLUSS',
    Parag31Baugb: 'PARAG_3_1_BAUGB',
    Parag32Baugb: 'PARAG_3_2_BAUGB',
    Parag412Baugb: 'PARAG_4_1_2_BAUGB',
    Billigungsbeschluss: 'BILLIGUNGSBESCHLUSS',
    Satzungsbeschluss: 'SATZUNGSBESCHLUSS',
    BplanInKraft: 'BPLAN_IN_KRAFT',
    VorbescheidEingereicht: 'VORBESCHEID_EINGEREICHT',
    BauantragEingereicht: 'BAUANTRAG_EINGEREICHT',
    BaugenehmigungErteilt: 'BAUGENEHMIGUNG_ERTEILT',
    BaubeginnAngezeigt: 'BAUBEGINN_ANGEZEIGT',
    BaufertigstellungGeplant: 'BAUFERTIGSTELLUNG_GEPLANT',
    BaufertigstellungAngezeigt: 'BAUFERTIGSTELLUNG_ANGEZEIGT'
} as const;
export type AbfrageDtoStandVorhabenEnum = typeof AbfrageDtoStandVorhabenEnum[keyof typeof AbfrageDtoStandVorhabenEnum];


export function AbfrageDtoFromJSON(json: any): AbfrageDto {
    return AbfrageDtoFromJSONTyped(json, false);
}

export function AbfrageDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'allgemeineOrtsangabe': !exists(json, 'allgemeineOrtsangabe') ? undefined : json['allgemeineOrtsangabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungDtoFromJSON(json['verortung']),
        'fristStellungnahme': (new Date(json['fristStellungnahme'])),
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'statusAbfrage': !exists(json, 'statusAbfrage') ? undefined : StatusAbfrageFromJSON(json['statusAbfrage']),
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'nameAbfrage': !exists(json, 'nameAbfrage') ? undefined : json['nameAbfrage'],
        'standVorhaben': !exists(json, 'standVorhaben') ? undefined : json['standVorhaben'],
        'bauvorhaben': !exists(json, 'bauvorhaben') ? undefined : json['bauvorhaben'],
    };
}

export function AbfrageDtoToJSON(value?: AbfrageDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'allgemeineOrtsangabe': value.allgemeineOrtsangabe,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungDtoToJSON(value.verortung),
        'fristStellungnahme': (value.fristStellungnahme.toISOString().substr(0,10)),
        'anmerkung': value.anmerkung,
        'statusAbfrage': StatusAbfrageToJSON(value.statusAbfrage),
        'bebauungsplannummer': value.bebauungsplannummer,
        'nameAbfrage': value.nameAbfrage,
        'standVorhaben': value.standVorhaben,
        'bauvorhaben': value.bauvorhaben,
    };
}

