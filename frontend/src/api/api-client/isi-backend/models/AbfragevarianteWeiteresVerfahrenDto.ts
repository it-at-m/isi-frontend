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
 * @interface AbfragevarianteWeiteresVerfahrenDto
 */
export interface AbfragevarianteWeiteresVerfahrenDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    abfragevariantenNr?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    artAbfragevariante?: AbfragevarianteWeiteresVerfahrenDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    name?: string;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    satzungsbeschluss?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    wesentlicheRechtsgrundlage?: Array<AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    realisierungVon?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenSobonUrsaechlich?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    weGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    weBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    weBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    weSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    weStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    weSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    weGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    weWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    sobonOrientierungswertJahr?: AbfragevarianteWeiteresVerfahrenDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {SobonBerechnungDto}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    sobonBerechnung?: SobonBerechnungDto;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    stammdatenGueltigAb?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    hasBauratendateiInput?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    anmerkungBauratendateiInput?: string;
    /**
     * 
     * @type {BauratendateiInputDto}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    bauratendateiInputBasis?: BauratendateiInputDto;
    /**
     * 
     * @type {Array<BauratendateiInputDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    bauratendateiInput?: Array<BauratendateiInputDto>;
    /**
     * 
     * @type {Array<BedarfsmeldungDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    bedarfsmeldungFachreferate?: Array<BedarfsmeldungDto>;
    /**
     * 
     * @type {Array<BedarfsmeldungDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    bedarfsmeldungAbfrageersteller?: Array<BedarfsmeldungDto>;
    /**
     * 
     * @type {Array<BauabschnittDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    bauabschnitte?: Array<BauabschnittDto>;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    ausgeloesterBedarfMitversorgungImBplanKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    ausgeloesterBedarfMitversorgungImBplanSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    hinweisVersorgung?: string;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenDto
     */
    dokumente?: Array<DokumentDto>;
}


/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteWeiteresVerfahrenDtoArtAbfragevarianteEnum = typeof AbfragevarianteWeiteresVerfahrenDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteWeiteresVerfahrenDtoArtAbfragevarianteEnum];

/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum = {
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
export type AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum = typeof AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum[keyof typeof AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenDtoSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteWeiteresVerfahrenDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteWeiteresVerfahrenDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteWeiteresVerfahrenDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteWeiteresVerfahrenDto interface.
 */
export function instanceOfAbfragevarianteWeiteresVerfahrenDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfragevarianteWeiteresVerfahrenDtoFromJSON(json: any): AbfragevarianteWeiteresVerfahrenDto {
    return AbfragevarianteWeiteresVerfahrenDtoFromJSONTyped(json, false);
}

export function AbfragevarianteWeiteresVerfahrenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteWeiteresVerfahrenDto {
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
        'gfWohnenBaurechtlichGenehmigt': !exists(json, 'gfWohnenBaurechtlichGenehmigt') ? undefined : json['gfWohnenBaurechtlichGenehmigt'],
        'gfWohnenBaurechtlichFestgesetzt': !exists(json, 'gfWohnenBaurechtlichFestgesetzt') ? undefined : json['gfWohnenBaurechtlichFestgesetzt'],
        'gfWohnenSobonUrsaechlich': !exists(json, 'gfWohnenSobonUrsaechlich') ? undefined : json['gfWohnenSobonUrsaechlich'],
        'gfWohnenBestandswohnbaurecht': !exists(json, 'gfWohnenBestandswohnbaurecht') ? undefined : json['gfWohnenBestandswohnbaurecht'],
        'gfWohnenSonderwohnformen': !exists(json, 'gfWohnenSonderwohnformen') ? undefined : json['gfWohnenSonderwohnformen'],
        'gfWohnenStudentischesWohnen': !exists(json, 'gfWohnenStudentischesWohnen') ? undefined : json['gfWohnenStudentischesWohnen'],
        'gfWohnenSeniorinnenWohnen': !exists(json, 'gfWohnenSeniorinnenWohnen') ? undefined : json['gfWohnenSeniorinnenWohnen'],
        'gfWohnenGenossenschaftlichesWohnen': !exists(json, 'gfWohnenGenossenschaftlichesWohnen') ? undefined : json['gfWohnenGenossenschaftlichesWohnen'],
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen'],
        'weGesamt': !exists(json, 'weGesamt') ? undefined : json['weGesamt'],
        'weBaurechtlichGenehmigt': !exists(json, 'weBaurechtlichGenehmigt') ? undefined : json['weBaurechtlichGenehmigt'],
        'weBaurechtlichFestgesetzt': !exists(json, 'weBaurechtlichFestgesetzt') ? undefined : json['weBaurechtlichFestgesetzt'],
        'weSonderwohnformen': !exists(json, 'weSonderwohnformen') ? undefined : json['weSonderwohnformen'],
        'weStudentischesWohnen': !exists(json, 'weStudentischesWohnen') ? undefined : json['weStudentischesWohnen'],
        'weSeniorinnenWohnen': !exists(json, 'weSeniorinnenWohnen') ? undefined : json['weSeniorinnenWohnen'],
        'weGenossenschaftlichesWohnen': !exists(json, 'weGenossenschaftlichesWohnen') ? undefined : json['weGenossenschaftlichesWohnen'],
        'weWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'weWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['weWeiteresNichtInfrastrukturrelevantesWohnen'],
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
        'hinweisVersorgung': !exists(json, 'hinweisVersorgung') ? undefined : json['hinweisVersorgung'],
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
    };
}

export function AbfragevarianteWeiteresVerfahrenDtoToJSON(value?: AbfragevarianteWeiteresVerfahrenDto | null): any {
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
        'gfWohnenBaurechtlichGenehmigt': value.gfWohnenBaurechtlichGenehmigt,
        'gfWohnenBaurechtlichFestgesetzt': value.gfWohnenBaurechtlichFestgesetzt,
        'gfWohnenSobonUrsaechlich': value.gfWohnenSobonUrsaechlich,
        'gfWohnenBestandswohnbaurecht': value.gfWohnenBestandswohnbaurecht,
        'gfWohnenSonderwohnformen': value.gfWohnenSonderwohnformen,
        'gfWohnenStudentischesWohnen': value.gfWohnenStudentischesWohnen,
        'gfWohnenSeniorinnenWohnen': value.gfWohnenSeniorinnenWohnen,
        'gfWohnenGenossenschaftlichesWohnen': value.gfWohnenGenossenschaftlichesWohnen,
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': value.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen,
        'weGesamt': value.weGesamt,
        'weBaurechtlichGenehmigt': value.weBaurechtlichGenehmigt,
        'weBaurechtlichFestgesetzt': value.weBaurechtlichFestgesetzt,
        'weSonderwohnformen': value.weSonderwohnformen,
        'weStudentischesWohnen': value.weStudentischesWohnen,
        'weSeniorinnenWohnen': value.weSeniorinnenWohnen,
        'weGenossenschaftlichesWohnen': value.weGenossenschaftlichesWohnen,
        'weWeiteresNichtInfrastrukturrelevantesWohnen': value.weWeiteresNichtInfrastrukturrelevantesWohnen,
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
        'hinweisVersorgung': value.hinweisVersorgung,
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
    };
}

