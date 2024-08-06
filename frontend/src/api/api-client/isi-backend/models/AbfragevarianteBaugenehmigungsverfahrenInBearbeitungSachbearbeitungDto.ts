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
import type { DokumentDto } from './DokumentDto';
import {
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';

/**
 * 
 * @export
 * @interface AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
 */
export interface AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    artAbfragevariante?: AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    abfragevariantenNr: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    name: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    wesentlicheRechtsgrundlage: Array<AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    realisierungVon: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenSonderwohnformen: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    gfAnmerkung?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    weGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    weBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    weBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    weSonderwohnformen: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    weStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    weSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    weGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    weWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    weAnmerkung?: string;
    /**
     * 
     * @type {Array<BauabschnittDto>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    bauabschnitte: Array<BauabschnittDto>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    sobonOrientierungswertJahr: AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    stammdatenGueltigAb: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    hasBauratendateiInput?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    anmerkungBauratendateiInput?: string;
    /**
     * 
     * @type {BauratendateiInputDto}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    bauratendateiInputBasis?: BauratendateiInputDto;
    /**
     * 
     * @type {Array<BauratendateiInputDto>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    bauratendateiInput?: Array<BauratendateiInputDto>;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
     */
    dokumente?: Array<DokumentDto>;
}


/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = typeof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum];

/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum = {
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
export type AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum = typeof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto interface.
 */
export function instanceOfAbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "abfragevariantenNr" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "wesentlicheRechtsgrundlage" in value;
    isInstance = isInstance && "realisierungVon" in value;
    isInstance = isInstance && "gfWohnenSonderwohnformen" in value;
    isInstance = isInstance && "weSonderwohnformen" in value;
    isInstance = isInstance && "bauabschnitte" in value;
    isInstance = isInstance && "sobonOrientierungswertJahr" in value;
    isInstance = isInstance && "stammdatenGueltigAb" in value;

    return isInstance;
}

export function AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSON(json: any): AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto {
    return AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
        'abfragevariantenNr': json['abfragevariantenNr'],
        'name': json['name'],
        'wesentlicheRechtsgrundlage': json['wesentlicheRechtsgrundlage'],
        'wesentlicheRechtsgrundlageFreieEingabe': !exists(json, 'wesentlicheRechtsgrundlageFreieEingabe') ? undefined : json['wesentlicheRechtsgrundlageFreieEingabe'],
        'realisierungVon': json['realisierungVon'],
        'gfWohnenGesamt': !exists(json, 'gfWohnenGesamt') ? undefined : json['gfWohnenGesamt'],
        'gfWohnenBaurechtlichGenehmigt': !exists(json, 'gfWohnenBaurechtlichGenehmigt') ? undefined : json['gfWohnenBaurechtlichGenehmigt'],
        'gfWohnenBaurechtlichFestgesetzt': !exists(json, 'gfWohnenBaurechtlichFestgesetzt') ? undefined : json['gfWohnenBaurechtlichFestgesetzt'],
        'gfWohnenBestandswohnbaurecht': !exists(json, 'gfWohnenBestandswohnbaurecht') ? undefined : json['gfWohnenBestandswohnbaurecht'],
        'gfWohnenSonderwohnformen': json['gfWohnenSonderwohnformen'],
        'gfWohnenStudentischesWohnen': !exists(json, 'gfWohnenStudentischesWohnen') ? undefined : json['gfWohnenStudentischesWohnen'],
        'gfWohnenSeniorinnenWohnen': !exists(json, 'gfWohnenSeniorinnenWohnen') ? undefined : json['gfWohnenSeniorinnenWohnen'],
        'gfWohnenGenossenschaftlichesWohnen': !exists(json, 'gfWohnenGenossenschaftlichesWohnen') ? undefined : json['gfWohnenGenossenschaftlichesWohnen'],
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen'],
        'gfAnmerkung': !exists(json, 'gfAnmerkung') ? undefined : json['gfAnmerkung'],
        'weGesamt': !exists(json, 'weGesamt') ? undefined : json['weGesamt'],
        'weBaurechtlichGenehmigt': !exists(json, 'weBaurechtlichGenehmigt') ? undefined : json['weBaurechtlichGenehmigt'],
        'weBaurechtlichFestgesetzt': !exists(json, 'weBaurechtlichFestgesetzt') ? undefined : json['weBaurechtlichFestgesetzt'],
        'weSonderwohnformen': json['weSonderwohnformen'],
        'weStudentischesWohnen': !exists(json, 'weStudentischesWohnen') ? undefined : json['weStudentischesWohnen'],
        'weSeniorinnenWohnen': !exists(json, 'weSeniorinnenWohnen') ? undefined : json['weSeniorinnenWohnen'],
        'weGenossenschaftlichesWohnen': !exists(json, 'weGenossenschaftlichesWohnen') ? undefined : json['weGenossenschaftlichesWohnen'],
        'weWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'weWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['weWeiteresNichtInfrastrukturrelevantesWohnen'],
        'weAnmerkung': !exists(json, 'weAnmerkung') ? undefined : json['weAnmerkung'],
        'bauabschnitte': ((json['bauabschnitte'] as Array<any>).map(BauabschnittDtoFromJSON)),
        'sobonOrientierungswertJahr': json['sobonOrientierungswertJahr'],
        'stammdatenGueltigAb': (new Date(json['stammdatenGueltigAb'])),
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'hasBauratendateiInput': !exists(json, 'hasBauratendateiInput') ? undefined : json['hasBauratendateiInput'],
        'anmerkungBauratendateiInput': !exists(json, 'anmerkungBauratendateiInput') ? undefined : json['anmerkungBauratendateiInput'],
        'bauratendateiInputBasis': !exists(json, 'bauratendateiInputBasis') ? undefined : BauratendateiInputDtoFromJSON(json['bauratendateiInputBasis']),
        'bauratendateiInput': !exists(json, 'bauratendateiInput') ? undefined : ((json['bauratendateiInput'] as Array<any>).map(BauratendateiInputDtoFromJSON)),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
    };
}

export function AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDtoToJSON(value?: AbfragevarianteBaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto | null): any {
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
        'wesentlicheRechtsgrundlage': value.wesentlicheRechtsgrundlage,
        'wesentlicheRechtsgrundlageFreieEingabe': value.wesentlicheRechtsgrundlageFreieEingabe,
        'realisierungVon': value.realisierungVon,
        'gfWohnenGesamt': value.gfWohnenGesamt,
        'gfWohnenBaurechtlichGenehmigt': value.gfWohnenBaurechtlichGenehmigt,
        'gfWohnenBaurechtlichFestgesetzt': value.gfWohnenBaurechtlichFestgesetzt,
        'gfWohnenBestandswohnbaurecht': value.gfWohnenBestandswohnbaurecht,
        'gfWohnenSonderwohnformen': value.gfWohnenSonderwohnformen,
        'gfWohnenStudentischesWohnen': value.gfWohnenStudentischesWohnen,
        'gfWohnenSeniorinnenWohnen': value.gfWohnenSeniorinnenWohnen,
        'gfWohnenGenossenschaftlichesWohnen': value.gfWohnenGenossenschaftlichesWohnen,
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': value.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen,
        'gfAnmerkung': value.gfAnmerkung,
        'weGesamt': value.weGesamt,
        'weBaurechtlichGenehmigt': value.weBaurechtlichGenehmigt,
        'weBaurechtlichFestgesetzt': value.weBaurechtlichFestgesetzt,
        'weSonderwohnformen': value.weSonderwohnformen,
        'weStudentischesWohnen': value.weStudentischesWohnen,
        'weSeniorinnenWohnen': value.weSeniorinnenWohnen,
        'weGenossenschaftlichesWohnen': value.weGenossenschaftlichesWohnen,
        'weWeiteresNichtInfrastrukturrelevantesWohnen': value.weWeiteresNichtInfrastrukturrelevantesWohnen,
        'weAnmerkung': value.weAnmerkung,
        'bauabschnitte': ((value.bauabschnitte as Array<any>).map(BauabschnittDtoToJSON)),
        'sobonOrientierungswertJahr': value.sobonOrientierungswertJahr,
        'stammdatenGueltigAb': (value.stammdatenGueltigAb.toISOString().substr(0,10)),
        'anmerkung': value.anmerkung,
        'hasBauratendateiInput': value.hasBauratendateiInput,
        'anmerkungBauratendateiInput': value.anmerkungBauratendateiInput,
        'bauratendateiInputBasis': BauratendateiInputDtoToJSON(value.bauratendateiInputBasis),
        'bauratendateiInput': value.bauratendateiInput === undefined ? undefined : ((value.bauratendateiInput as Array<any>).map(BauratendateiInputDtoToJSON)),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
    };
}

