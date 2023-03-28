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
/**
 * 
 * @export
 * @interface AbfrageListElementDto
 */
export interface AbfrageListElementDto {
    /**
     * 
     * @type {string}
     * @memberof AbfrageListElementDto
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageListElementDto
     */
    nameAbfrage?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfrageListElementDto
     */
    standVorhaben?: AbfrageListElementDtoStandVorhabenEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfrageListElementDto
     */
    statusAbfrage?: AbfrageListElementDtoStatusAbfrageEnum;
    /**
     * 
     * @type {Date}
     * @memberof AbfrageListElementDto
     */
    fristStellungnahme?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfrageListElementDto
     */
    type?: AbfrageListElementDtoTypeEnum;
}


/**
 * @export
 */
export const AbfrageListElementDtoStandVorhabenEnum = {
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
export type AbfrageListElementDtoStandVorhabenEnum = typeof AbfrageListElementDtoStandVorhabenEnum[keyof typeof AbfrageListElementDtoStandVorhabenEnum];

/**
 * @export
 */
export const AbfrageListElementDtoStatusAbfrageEnum = {
    Angelegt: 'ANGELEGT',
    Offen: 'OFFEN',
    InBearbeitungPlan: 'IN_BEARBEITUNG_PLAN',
    InBearbeitungFachreferate: 'IN_BEARBEITUNG_FACHREFERATE',
    BedarfsmeldungErfolgt: 'BEDARFSMELDUNG_ERFOLGT',
    Erledigt: 'ERLEDIGT',
    Abbruch: 'ABBRUCH'
} as const;
export type AbfrageListElementDtoStatusAbfrageEnum = typeof AbfrageListElementDtoStatusAbfrageEnum[keyof typeof AbfrageListElementDtoStatusAbfrageEnum];

/**
 * @export
 */
export const AbfrageListElementDtoTypeEnum = {
    Infrastrukturabfrage: 'INFRASTRUKTURABFRAGE',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfrageListElementDtoTypeEnum = typeof AbfrageListElementDtoTypeEnum[keyof typeof AbfrageListElementDtoTypeEnum];


export function AbfrageListElementDtoFromJSON(json: any): AbfrageListElementDto {
    return AbfrageListElementDtoFromJSONTyped(json, false);
}

export function AbfrageListElementDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfrageListElementDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'nameAbfrage': !exists(json, 'nameAbfrage') ? undefined : json['nameAbfrage'],
        'standVorhaben': !exists(json, 'standVorhaben') ? undefined : json['standVorhaben'],
        'statusAbfrage': !exists(json, 'statusAbfrage') ? undefined : json['statusAbfrage'],
        'fristStellungnahme': !exists(json, 'fristStellungnahme') ? undefined : (new Date(json['fristStellungnahme'])),
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function AbfrageListElementDtoToJSON(value?: AbfrageListElementDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'nameAbfrage': value.nameAbfrage,
        'standVorhaben': value.standVorhaben,
        'statusAbfrage': value.statusAbfrage,
        'fristStellungnahme': value.fristStellungnahme === undefined ? undefined : (value.fristStellungnahme.toISOString().substr(0,10)),
        'type': value.type,
    };
}

