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
 * @interface AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
 */
export interface AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    version?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    artAbfragevariante?: AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    abfragevariantenNr: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    name: string;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    satzungsbeschluss?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    wesentlicheRechtsgrundlage: Array<AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    realisierungVon: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenSobonUrsaechlich?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenSonderwohnformen: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    weGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    weBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    weBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    weSonderwohnformen: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    weStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    weSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    weGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    weWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {Array<BauabschnittDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    bauabschnitte?: Array<BauabschnittDto>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    sobonOrientierungswertJahr: AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {SobonBerechnungDto}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    sobonBerechnung?: SobonBerechnungDto;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    stammdatenGueltigAb: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    hasBauratendateiInput?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    anmerkungBauratendateiInput?: string;
    /**
     * 
     * @type {BauratendateiInputDto}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    bauratendateiInputBasis?: BauratendateiInputDto;
    /**
     * 
     * @type {Array<BauratendateiInputDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    bauratendateiInput?: Array<BauratendateiInputDto>;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto
     */
    dokumente?: Array<DokumentDto>;
}


/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum = typeof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoArtAbfragevarianteEnum];

/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum = {
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
export type AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum = typeof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum[keyof typeof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto interface.
 */
export function instanceOfAbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto(value: object): boolean {
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

export function AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSON(json: any): AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto {
    return AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json, false);
}

export function AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto {
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
        'gfWohnenBaurechtlichGenehmigt': !exists(json, 'gfWohnenBaurechtlichGenehmigt') ? undefined : json['gfWohnenBaurechtlichGenehmigt'],
        'gfWohnenBaurechtlichFestgesetzt': !exists(json, 'gfWohnenBaurechtlichFestgesetzt') ? undefined : json['gfWohnenBaurechtlichFestgesetzt'],
        'gfWohnenSobonUrsaechlich': !exists(json, 'gfWohnenSobonUrsaechlich') ? undefined : json['gfWohnenSobonUrsaechlich'],
        'gfWohnenBestandswohnbaurecht': !exists(json, 'gfWohnenBestandswohnbaurecht') ? undefined : json['gfWohnenBestandswohnbaurecht'],
        'gfWohnenSonderwohnformen': json['gfWohnenSonderwohnformen'],
        'gfWohnenStudentischesWohnen': !exists(json, 'gfWohnenStudentischesWohnen') ? undefined : json['gfWohnenStudentischesWohnen'],
        'gfWohnenSeniorinnenWohnen': !exists(json, 'gfWohnenSeniorinnenWohnen') ? undefined : json['gfWohnenSeniorinnenWohnen'],
        'gfWohnenGenossenschaftlichesWohnen': !exists(json, 'gfWohnenGenossenschaftlichesWohnen') ? undefined : json['gfWohnenGenossenschaftlichesWohnen'],
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen'],
        'weGesamt': !exists(json, 'weGesamt') ? undefined : json['weGesamt'],
        'weBaurechtlichGenehmigt': !exists(json, 'weBaurechtlichGenehmigt') ? undefined : json['weBaurechtlichGenehmigt'],
        'weBaurechtlichFestgesetzt': !exists(json, 'weBaurechtlichFestgesetzt') ? undefined : json['weBaurechtlichFestgesetzt'],
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
        'hasBauratendateiInput': !exists(json, 'hasBauratendateiInput') ? undefined : json['hasBauratendateiInput'],
        'anmerkungBauratendateiInput': !exists(json, 'anmerkungBauratendateiInput') ? undefined : json['anmerkungBauratendateiInput'],
        'bauratendateiInputBasis': !exists(json, 'bauratendateiInputBasis') ? undefined : BauratendateiInputDtoFromJSON(json['bauratendateiInputBasis']),
        'bauratendateiInput': !exists(json, 'bauratendateiInput') ? undefined : ((json['bauratendateiInput'] as Array<any>).map(BauratendateiInputDtoFromJSON)),
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
    };
}

export function AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDtoToJSON(value?: AbfragevarianteWeiteresVerfahrenInBearbeitungSachbearbeitungDto | null): any {
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
        'bauabschnitte': value.bauabschnitte === undefined ? undefined : ((value.bauabschnitte as Array<any>).map(BauabschnittDtoToJSON)),
        'sobonOrientierungswertJahr': value.sobonOrientierungswertJahr,
        'sobonBerechnung': SobonBerechnungDtoToJSON(value.sobonBerechnung),
        'stammdatenGueltigAb': (value.stammdatenGueltigAb.toISOString().substr(0,10)),
        'anmerkung': value.anmerkung,
        'hasBauratendateiInput': value.hasBauratendateiInput,
        'anmerkungBauratendateiInput': value.anmerkungBauratendateiInput,
        'bauratendateiInputBasis': BauratendateiInputDtoToJSON(value.bauratendateiInputBasis),
        'bauratendateiInput': value.bauratendateiInput === undefined ? undefined : ((value.bauratendateiInput as Array<any>).map(BauratendateiInputDtoToJSON)),
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
    };
}

