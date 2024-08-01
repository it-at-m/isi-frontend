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
import type { BauabschnittDto } from './BauabschnittDto';
import {
    BauabschnittDtoFromJSON,
    BauabschnittDtoFromJSONTyped,
    BauabschnittDtoToJSON,
} from './BauabschnittDto';
import type { BauratendateiInputDto } from './BauratendateiInputDto';
import {
    BauratendateiInputDtoFromJSON,
    BauratendateiInputDtoFromJSONTyped,
    BauratendateiInputDtoToJSON,
} from './BauratendateiInputDto';
import type { BedarfsmeldungDto } from './BedarfsmeldungDto';
import {
    BedarfsmeldungDtoFromJSON,
    BedarfsmeldungDtoFromJSONTyped,
    BedarfsmeldungDtoToJSON,
} from './BedarfsmeldungDto';
import type { DokumentDto } from './DokumentDto';
import {
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';
import type { SobonBerechnungDto } from './SobonBerechnungDto';
import {
    SobonBerechnungDtoFromJSON,
    SobonBerechnungDtoFromJSONTyped,
    SobonBerechnungDtoToJSON,
} from './SobonBerechnungDto';

/**
 * 
 * @export
 * @interface AbfragevarianteBauleitplanverfahrenDto
 */
export interface AbfragevarianteBauleitplanverfahrenDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    abfragevariantenNr?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    artAbfragevariante?: AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    name?: string;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    satzungsbeschluss?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    wesentlicheRechtsgrundlage?: Array<AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    realisierungVon?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    gfWohnenGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    gfWohnenSobonUrsaechlich?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    gfWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    gfWohnenSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    gfWohnenStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    gfWohnenSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    gfWohnenGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    gfAnmerkung?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    weGesamt?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    weSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    weStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    weSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    weGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    weWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    weAnmerkung?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    sobonOrientierungswertJahr?: AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {SobonBerechnungDto}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    sobonBerechnung?: SobonBerechnungDto;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    stammdatenGueltigAb?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    hasBauratendateiInput?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    anmerkungBauratendateiInput?: string;
    /**
     * 
     * @type {BauratendateiInputDto}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    bauratendateiInputBasis?: BauratendateiInputDto;
    /**
     * 
     * @type {Array<BauratendateiInputDto>}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    bauratendateiInput?: Array<BauratendateiInputDto>;
    /**
     * 
     * @type {Array<BedarfsmeldungDto>}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    bedarfsmeldungFachreferate?: Array<BedarfsmeldungDto>;
    /**
     * 
     * @type {Array<BedarfsmeldungDto>}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    bedarfsmeldungAbfrageersteller?: Array<BedarfsmeldungDto>;
    /**
     * 
     * @type {Array<BauabschnittDto>}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    bauabschnitte?: Array<BauabschnittDto>;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    ausgeloesterBedarfMitversorgungImBplanKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    ausgeloesterBedarfMitversorgungImBplanSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    anmerkungFachreferate?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    anmerkungAbfrageersteller?: string;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof AbfragevarianteBauleitplanverfahrenDto
     */
    dokumente?: Array<DokumentDto>;
}


/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum = typeof AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum];

/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum = {
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
export type AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum = typeof AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum[keyof typeof AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteBauleitplanverfahrenDto interface.
 */
export function instanceOfAbfragevarianteBauleitplanverfahrenDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfragevarianteBauleitplanverfahrenDtoFromJSON(json: any): AbfragevarianteBauleitplanverfahrenDto {
    return AbfragevarianteBauleitplanverfahrenDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBauleitplanverfahrenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBauleitplanverfahrenDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'abfragevariantenNr': !exists(json, 'abfragevariantenNr') ? undefined : json['abfragevariantenNr'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'satzungsbeschluss': !exists(json, 'satzungsbeschluss') ? undefined : (new Date(json['satzungsbeschluss'])),
        'wesentlicheRechtsgrundlage': !exists(json, 'wesentlicheRechtsgrundlage') ? undefined : json['wesentlicheRechtsgrundlage'],
        'wesentlicheRechtsgrundlageFreieEingabe': !exists(json, 'wesentlicheRechtsgrundlageFreieEingabe') ? undefined : json['wesentlicheRechtsgrundlageFreieEingabe'],
        'realisierungVon': !exists(json, 'realisierungVon') ? undefined : json['realisierungVon'],
        'gfWohnenGesamt': !exists(json, 'gfWohnenGesamt') ? undefined : json['gfWohnenGesamt'],
        'gfWohnenSobonUrsaechlich': !exists(json, 'gfWohnenSobonUrsaechlich') ? undefined : json['gfWohnenSobonUrsaechlich'],
        'gfWohnenBestandswohnbaurecht': !exists(json, 'gfWohnenBestandswohnbaurecht') ? undefined : json['gfWohnenBestandswohnbaurecht'],
        'gfWohnenSonderwohnformen': !exists(json, 'gfWohnenSonderwohnformen') ? undefined : json['gfWohnenSonderwohnformen'],
        'gfWohnenStudentischesWohnen': !exists(json, 'gfWohnenStudentischesWohnen') ? undefined : json['gfWohnenStudentischesWohnen'],
        'gfWohnenSeniorinnenWohnen': !exists(json, 'gfWohnenSeniorinnenWohnen') ? undefined : json['gfWohnenSeniorinnenWohnen'],
        'gfWohnenGenossenschaftlichesWohnen': !exists(json, 'gfWohnenGenossenschaftlichesWohnen') ? undefined : json['gfWohnenGenossenschaftlichesWohnen'],
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen'],
        'gfAnmerkung': !exists(json, 'gfAnmerkung') ? undefined : json['gfAnmerkung'],
        'weGesamt': !exists(json, 'weGesamt') ? undefined : json['weGesamt'],
        'weSonderwohnformen': !exists(json, 'weSonderwohnformen') ? undefined : json['weSonderwohnformen'],
        'weStudentischesWohnen': !exists(json, 'weStudentischesWohnen') ? undefined : json['weStudentischesWohnen'],
        'weSeniorinnenWohnen': !exists(json, 'weSeniorinnenWohnen') ? undefined : json['weSeniorinnenWohnen'],
        'weGenossenschaftlichesWohnen': !exists(json, 'weGenossenschaftlichesWohnen') ? undefined : json['weGenossenschaftlichesWohnen'],
        'weWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'weWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['weWeiteresNichtInfrastrukturrelevantesWohnen'],
        'weAnmerkung': !exists(json, 'weAnmerkung') ? undefined : json['weAnmerkung'],
        'sobonOrientierungswertJahr': !exists(json, 'sobonOrientierungswertJahr') ? undefined : json['sobonOrientierungswertJahr'],
        'sobonBerechnung': !exists(json, 'sobonBerechnung') ? undefined : SobonBerechnungDtoFromJSON(json['sobonBerechnung']),
        'stammdatenGueltigAb': !exists(json, 'stammdatenGueltigAb') ? undefined : (new Date(json['stammdatenGueltigAb'])),
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'hasBauratendateiInput': !exists(json, 'hasBauratendateiInput') ? undefined : json['hasBauratendateiInput'],
        'anmerkungBauratendateiInput': !exists(json, 'anmerkungBauratendateiInput') ? undefined : json['anmerkungBauratendateiInput'],
        'bauratendateiInputBasis': !exists(json, 'bauratendateiInputBasis') ? undefined : BauratendateiInputDtoFromJSON(json['bauratendateiInputBasis']),
        'bauratendateiInput': !exists(json, 'bauratendateiInput') ? undefined : ((json['bauratendateiInput'] as Array<any>).map(BauratendateiInputDtoFromJSON)),
        'bedarfsmeldungFachreferate': !exists(json, 'bedarfsmeldungFachreferate') ? undefined : ((json['bedarfsmeldungFachreferate'] as Array<any>).map(BedarfsmeldungDtoFromJSON)),
        'bedarfsmeldungAbfrageersteller': !exists(json, 'bedarfsmeldungAbfrageersteller') ? undefined : ((json['bedarfsmeldungAbfrageersteller'] as Array<any>).map(BedarfsmeldungDtoFromJSON)),
        'bauabschnitte': !exists(json, 'bauabschnitte') ? undefined : ((json['bauabschnitte'] as Array<any>).map(BauabschnittDtoFromJSON)),
        'ausgeloesterBedarfImBaugebietBeruecksichtigenKita': !exists(json, 'ausgeloesterBedarfImBaugebietBeruecksichtigenKita') ? undefined : json['ausgeloesterBedarfImBaugebietBeruecksichtigenKita'],
        'ausgeloesterBedarfMitversorgungImBplanKita': !exists(json, 'ausgeloesterBedarfMitversorgungImBplanKita') ? undefined : json['ausgeloesterBedarfMitversorgungImBplanKita'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenKita': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenKita') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenKita'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita'],
        'ausgeloesterBedarfImBaugebietBeruecksichtigenSchule': !exists(json, 'ausgeloesterBedarfImBaugebietBeruecksichtigenSchule') ? undefined : json['ausgeloesterBedarfImBaugebietBeruecksichtigenSchule'],
        'ausgeloesterBedarfMitversorgungImBplanSchule': !exists(json, 'ausgeloesterBedarfMitversorgungImBplanSchule') ? undefined : json['ausgeloesterBedarfMitversorgungImBplanSchule'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule'],
        'anmerkungFachreferate': !exists(json, 'anmerkungFachreferate') ? undefined : json['anmerkungFachreferate'],
        'anmerkungAbfrageersteller': !exists(json, 'anmerkungAbfrageersteller') ? undefined : json['anmerkungAbfrageersteller'],
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
    };
}

export function AbfragevarianteBauleitplanverfahrenDtoToJSON(value?: AbfragevarianteBauleitplanverfahrenDto | null): any {
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
        'abfragevariantenNr': value.abfragevariantenNr,
        'artAbfragevariante': value.artAbfragevariante,
        'name': value.name,
        'satzungsbeschluss': value.satzungsbeschluss === undefined ? undefined : (value.satzungsbeschluss.toISOString().substr(0,10)),
        'wesentlicheRechtsgrundlage': value.wesentlicheRechtsgrundlage,
        'wesentlicheRechtsgrundlageFreieEingabe': value.wesentlicheRechtsgrundlageFreieEingabe,
        'realisierungVon': value.realisierungVon,
        'gfWohnenGesamt': value.gfWohnenGesamt,
        'gfWohnenSobonUrsaechlich': value.gfWohnenSobonUrsaechlich,
        'gfWohnenBestandswohnbaurecht': value.gfWohnenBestandswohnbaurecht,
        'gfWohnenSonderwohnformen': value.gfWohnenSonderwohnformen,
        'gfWohnenStudentischesWohnen': value.gfWohnenStudentischesWohnen,
        'gfWohnenSeniorinnenWohnen': value.gfWohnenSeniorinnenWohnen,
        'gfWohnenGenossenschaftlichesWohnen': value.gfWohnenGenossenschaftlichesWohnen,
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': value.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen,
        'gfAnmerkung': value.gfAnmerkung,
        'weGesamt': value.weGesamt,
        'weSonderwohnformen': value.weSonderwohnformen,
        'weStudentischesWohnen': value.weStudentischesWohnen,
        'weSeniorinnenWohnen': value.weSeniorinnenWohnen,
        'weGenossenschaftlichesWohnen': value.weGenossenschaftlichesWohnen,
        'weWeiteresNichtInfrastrukturrelevantesWohnen': value.weWeiteresNichtInfrastrukturrelevantesWohnen,
        'weAnmerkung': value.weAnmerkung,
        'sobonOrientierungswertJahr': value.sobonOrientierungswertJahr,
        'sobonBerechnung': SobonBerechnungDtoToJSON(value.sobonBerechnung),
        'stammdatenGueltigAb': value.stammdatenGueltigAb === undefined ? undefined : (value.stammdatenGueltigAb.toISOString().substr(0,10)),
        'anmerkung': value.anmerkung,
        'hasBauratendateiInput': value.hasBauratendateiInput,
        'anmerkungBauratendateiInput': value.anmerkungBauratendateiInput,
        'bauratendateiInputBasis': BauratendateiInputDtoToJSON(value.bauratendateiInputBasis),
        'bauratendateiInput': value.bauratendateiInput === undefined ? undefined : ((value.bauratendateiInput as Array<any>).map(BauratendateiInputDtoToJSON)),
        'bedarfsmeldungFachreferate': value.bedarfsmeldungFachreferate === undefined ? undefined : ((value.bedarfsmeldungFachreferate as Array<any>).map(BedarfsmeldungDtoToJSON)),
        'bedarfsmeldungAbfrageersteller': value.bedarfsmeldungAbfrageersteller === undefined ? undefined : ((value.bedarfsmeldungAbfrageersteller as Array<any>).map(BedarfsmeldungDtoToJSON)),
        'bauabschnitte': value.bauabschnitte === undefined ? undefined : ((value.bauabschnitte as Array<any>).map(BauabschnittDtoToJSON)),
        'ausgeloesterBedarfImBaugebietBeruecksichtigenKita': value.ausgeloesterBedarfImBaugebietBeruecksichtigenKita,
        'ausgeloesterBedarfMitversorgungImBplanKita': value.ausgeloesterBedarfMitversorgungImBplanKita,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenKita': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenKita,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita,
        'ausgeloesterBedarfImBaugebietBeruecksichtigenSchule': value.ausgeloesterBedarfImBaugebietBeruecksichtigenSchule,
        'ausgeloesterBedarfMitversorgungImBplanSchule': value.ausgeloesterBedarfMitversorgungImBplanSchule,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule,
        'anmerkungFachreferate': value.anmerkungFachreferate,
        'anmerkungAbfrageersteller': value.anmerkungAbfrageersteller,
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
    };
}

