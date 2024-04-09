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
 * @interface AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
 */
export interface AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    artAbfragevariante?: AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    abfragevariantenNr: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    name: string;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    satzungsbeschluss?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    wesentlicheRechtsgrundlage: Array<AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    realisierungVon: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenSobonUrsaechlich?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenSonderwohnformen: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    weGesamt?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    weSonderwohnformen: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    weStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    weSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    weGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    weWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {Array<BauabschnittDto>}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    bauabschnitte?: Array<BauabschnittDto>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    sobonOrientierungswertJahr: AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {SobonBerechnungDto}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    sobonBerechnung?: SobonBerechnungDto;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    stammdatenGueltigAb: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto
     */
    dokumente?: Array<DokumentDto>;
}


/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = typeof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum];

/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum = {
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
export type AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum = typeof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum[keyof typeof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto interface.
 */
export function instanceOfAbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "abfragevariantenNr" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "wesentlicheRechtsgrundlage" in value;
    isInstance = isInstance && "realisierungVon" in value;
    isInstance = isInstance && "gfWohnenSonderwohnformen" in value;
    isInstance = isInstance && "weSonderwohnformen" in value;
    isInstance = isInstance && "sobonOrientierungswertJahr" in value;
    isInstance = isInstance && "stammdatenGueltigAb" in value;

    return isInstance;
}

export function AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSON(json: any): AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto {
    return AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
        'abfragevariantenNr': json['abfragevariantenNr'],
        'name': json['name'],
        'satzungsbeschluss': !exists(json, 'satzungsbeschluss') ? undefined : (new Date(json['satzungsbeschluss'])),
        'wesentlicheRechtsgrundlage': json['wesentlicheRechtsgrundlage'],
        'wesentlicheRechtsgrundlageFreieEingabe': !exists(json, 'wesentlicheRechtsgrundlageFreieEingabe') ? undefined : json['wesentlicheRechtsgrundlageFreieEingabe'],
        'realisierungVon': json['realisierungVon'],
        'gfWohnenGesamt': !exists(json, 'gfWohnenGesamt') ? undefined : json['gfWohnenGesamt'],
        'gfWohnenSobonUrsaechlich': !exists(json, 'gfWohnenSobonUrsaechlich') ? undefined : json['gfWohnenSobonUrsaechlich'],
        'gfWohnenBestandswohnbaurecht': !exists(json, 'gfWohnenBestandswohnbaurecht') ? undefined : json['gfWohnenBestandswohnbaurecht'],
        'gfWohnenSonderwohnformen': json['gfWohnenSonderwohnformen'],
        'gfWohnenStudentischesWohnen': !exists(json, 'gfWohnenStudentischesWohnen') ? undefined : json['gfWohnenStudentischesWohnen'],
        'gfWohnenSeniorinnenWohnen': !exists(json, 'gfWohnenSeniorinnenWohnen') ? undefined : json['gfWohnenSeniorinnenWohnen'],
        'gfWohnenGenossenschaftlichesWohnen': !exists(json, 'gfWohnenGenossenschaftlichesWohnen') ? undefined : json['gfWohnenGenossenschaftlichesWohnen'],
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen'],
        'weGesamt': !exists(json, 'weGesamt') ? undefined : json['weGesamt'],
        'weSonderwohnformen': json['weSonderwohnformen'],
        'weStudentischesWohnen': !exists(json, 'weStudentischesWohnen') ? undefined : json['weStudentischesWohnen'],
        'weSeniorinnenWohnen': !exists(json, 'weSeniorinnenWohnen') ? undefined : json['weSeniorinnenWohnen'],
        'weGenossenschaftlichesWohnen': !exists(json, 'weGenossenschaftlichesWohnen') ? undefined : json['weGenossenschaftlichesWohnen'],
        'weWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'weWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['weWeiteresNichtInfrastrukturrelevantesWohnen'],
        'bauabschnitte': !exists(json, 'bauabschnitte') ? undefined : ((json['bauabschnitte'] as Array<any>).map(BauabschnittDtoFromJSON)),
        'sobonOrientierungswertJahr': json['sobonOrientierungswertJahr'],
        'sobonBerechnung': !exists(json, 'sobonBerechnung') ? undefined : SobonBerechnungDtoFromJSON(json['sobonBerechnung']),
        'stammdatenGueltigAb': (new Date(json['stammdatenGueltigAb'])),
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
    };
}

export function AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDtoToJSON(value?: AbfragevarianteBauleitplanverfahrenInBearbeitungSachbearbeitungDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'version': value.version,
        'artAbfragevariante': value.artAbfragevariante,
        'abfragevariantenNr': value.abfragevariantenNr,
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
        'weGesamt': value.weGesamt,
        'weSonderwohnformen': value.weSonderwohnformen,
        'weStudentischesWohnen': value.weStudentischesWohnen,
        'weSeniorinnenWohnen': value.weSeniorinnenWohnen,
        'weGenossenschaftlichesWohnen': value.weGenossenschaftlichesWohnen,
        'weWeiteresNichtInfrastrukturrelevantesWohnen': value.weWeiteresNichtInfrastrukturrelevantesWohnen,
        'bauabschnitte': value.bauabschnitte === undefined ? undefined : ((value.bauabschnitte as Array<any>).map(BauabschnittDtoToJSON)),
        'sobonOrientierungswertJahr': value.sobonOrientierungswertJahr,
        'sobonBerechnung': SobonBerechnungDtoToJSON(value.sobonBerechnung),
        'stammdatenGueltigAb': (value.stammdatenGueltigAb.toISOString().substr(0,10)),
        'anmerkung': value.anmerkung,
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
    };
}

