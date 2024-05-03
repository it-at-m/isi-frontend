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


/**
 * 
 * @export
 */
export const StatusAbfrage = {
    Angelegt: 'ANGELEGT',
    Offen: 'OFFEN',
    InBearbeitungSachbearbeitung: 'IN_BEARBEITUNG_SACHBEARBEITUNG',
    InBearbeitungFachreferate: 'IN_BEARBEITUNG_FACHREFERATE',
    BedarfsmeldungErfolgt: 'BEDARFSMELDUNG_ERFOLGT',
    ErledigtMitFachreferat: 'ERLEDIGT_MIT_FACHREFERAT',
    ErledigtOhneFachreferat: 'ERLEDIGT_OHNE_FACHREFERAT',
    Abbruch: 'ABBRUCH'
} as const;
export type StatusAbfrage = typeof StatusAbfrage[keyof typeof StatusAbfrage];


export function StatusAbfrageFromJSON(json: any): StatusAbfrage {
    return StatusAbfrageFromJSONTyped(json, false);
}

export function StatusAbfrageFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatusAbfrage {
    return json as StatusAbfrage;
}

export function StatusAbfrageToJSON(value?: StatusAbfrage | null): any {
    return value as any;
}

