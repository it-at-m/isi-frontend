/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
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
import type { BedarfsmeldungFachreferateDto } from './BedarfsmeldungFachreferateDto';
import {
    BedarfsmeldungFachreferateDtoFromJSON,
    BedarfsmeldungFachreferateDtoFromJSONTyped,
    BedarfsmeldungFachreferateDtoToJSON,
} from './BedarfsmeldungFachreferateDto';

/**
 * 
 * @export
 * @interface AbfragevarianteBaugenehmigungsverfahrenDto
 */
export interface AbfragevarianteBaugenehmigungsverfahrenDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    abfragevariantenNr?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    artAbfragevariante?: AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    name?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    wesentlicheRechtsgrundlage?: Array<AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    realisierungVon?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    gfWohnenPlanungsursaechlich?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    weGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    weBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    weBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    weSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    weStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    weSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    weGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    weWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    sobonOrientierungswertJahr?: AbfragevarianteBaugenehmigungsverfahrenDtoSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {Array<BedarfsmeldungFachreferateDto>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    bedarfsmeldungFachreferate?: Array<BedarfsmeldungFachreferateDto>;
    /**
     * 
     * @type {Array<BauabschnittDto>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    bauabschnitte?: Array<BauabschnittDto>;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    ausgelBedarfImBaugebietBeruecksichtigenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    ausgelBedarfMitversorgungImBplanKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    ausgelBedarfMitversorgungInBestEinrichtungenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    ausgelBedarfImBaugebietBeruecksichtigenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    ausgelBedarfMitversorgungImBplanSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    ausgelBedarfMitversorgungInBestEinrichtungenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauSchule?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenDto
     */
    hinweisVersorgung?: string;
}


/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum = typeof AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenDtoArtAbfragevarianteEnum];

/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum = {
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
export type AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum = typeof AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenDtoWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenDtoSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenDtoSobonOrientierungswertJahrEnum = typeof AbfragevarianteBaugenehmigungsverfahrenDtoSobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenDtoSobonOrientierungswertJahrEnum];


/**
 * Check if a given object implements the AbfragevarianteBaugenehmigungsverfahrenDto interface.
 */
export function instanceOfAbfragevarianteBaugenehmigungsverfahrenDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfragevarianteBaugenehmigungsverfahrenDtoFromJSON(json: any): AbfragevarianteBaugenehmigungsverfahrenDto {
    return AbfragevarianteBaugenehmigungsverfahrenDtoFromJSONTyped(json, false);
}

export function AbfragevarianteBaugenehmigungsverfahrenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBaugenehmigungsverfahrenDto {
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
        'wesentlicheRechtsgrundlage': !exists(json, 'wesentlicheRechtsgrundlage') ? undefined : json['wesentlicheRechtsgrundlage'],
        'wesentlicheRechtsgrundlageFreieEingabe': !exists(json, 'wesentlicheRechtsgrundlageFreieEingabe') ? undefined : json['wesentlicheRechtsgrundlageFreieEingabe'],
        'realisierungVon': !exists(json, 'realisierungVon') ? undefined : json['realisierungVon'],
        'gfWohnenGesamt': !exists(json, 'gfWohnenGesamt') ? undefined : json['gfWohnenGesamt'],
        'gfWohnenBaurechtlichGenehmigt': !exists(json, 'gfWohnenBaurechtlichGenehmigt') ? undefined : json['gfWohnenBaurechtlichGenehmigt'],
        'gfWohnenBaurechtlichFestgesetzt': !exists(json, 'gfWohnenBaurechtlichFestgesetzt') ? undefined : json['gfWohnenBaurechtlichFestgesetzt'],
        'gfWohnenBestandswohnbaurecht': !exists(json, 'gfWohnenBestandswohnbaurecht') ? undefined : json['gfWohnenBestandswohnbaurecht'],
        'gfWohnenSonderwohnformen': !exists(json, 'gfWohnenSonderwohnformen') ? undefined : json['gfWohnenSonderwohnformen'],
        'gfWohnenStudentischesWohnen': !exists(json, 'gfWohnenStudentischesWohnen') ? undefined : json['gfWohnenStudentischesWohnen'],
        'gfWohnenSeniorinnenWohnen': !exists(json, 'gfWohnenSeniorinnenWohnen') ? undefined : json['gfWohnenSeniorinnenWohnen'],
        'gfWohnenGenossenschaftlichesWohnen': !exists(json, 'gfWohnenGenossenschaftlichesWohnen') ? undefined : json['gfWohnenGenossenschaftlichesWohnen'],
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen'],
        'gfWohnenPlanungsursaechlich': !exists(json, 'gfWohnenPlanungsursaechlich') ? undefined : json['gfWohnenPlanungsursaechlich'],
        'weGesamt': !exists(json, 'weGesamt') ? undefined : json['weGesamt'],
        'weBaurechtlichGenehmigt': !exists(json, 'weBaurechtlichGenehmigt') ? undefined : json['weBaurechtlichGenehmigt'],
        'weBaurechtlichFestgesetzt': !exists(json, 'weBaurechtlichFestgesetzt') ? undefined : json['weBaurechtlichFestgesetzt'],
        'weSonderwohnformen': !exists(json, 'weSonderwohnformen') ? undefined : json['weSonderwohnformen'],
        'weStudentischesWohnen': !exists(json, 'weStudentischesWohnen') ? undefined : json['weStudentischesWohnen'],
        'weSeniorinnenWohnen': !exists(json, 'weSeniorinnenWohnen') ? undefined : json['weSeniorinnenWohnen'],
        'weGenossenschaftlichesWohnen': !exists(json, 'weGenossenschaftlichesWohnen') ? undefined : json['weGenossenschaftlichesWohnen'],
        'weWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'weWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['weWeiteresNichtInfrastrukturrelevantesWohnen'],
        'sobonOrientierungswertJahr': !exists(json, 'sobonOrientierungswertJahr') ? undefined : json['sobonOrientierungswertJahr'],
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'bedarfsmeldungFachreferate': !exists(json, 'bedarfsmeldungFachreferate') ? undefined : ((json['bedarfsmeldungFachreferate'] as Array<any>).map(BedarfsmeldungFachreferateDtoFromJSON)),
        'bauabschnitte': !exists(json, 'bauabschnitte') ? undefined : ((json['bauabschnitte'] as Array<any>).map(BauabschnittDtoFromJSON)),
        'ausgelBedarfImBaugebietBeruecksichtigenKita': !exists(json, 'ausgelBedarfImBaugebietBeruecksichtigenKita') ? undefined : json['ausgelBedarfImBaugebietBeruecksichtigenKita'],
        'ausgelBedarfMitversorgungImBplanKita': !exists(json, 'ausgelBedarfMitversorgungImBplanKita') ? undefined : json['ausgelBedarfMitversorgungImBplanKita'],
        'ausgelBedarfMitversorgungInBestEinrichtungenKita': !exists(json, 'ausgelBedarfMitversorgungInBestEinrichtungenKita') ? undefined : json['ausgelBedarfMitversorgungInBestEinrichtungenKita'],
        'ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauKita': !exists(json, 'ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauKita') ? undefined : json['ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauKita'],
        'ausgelBedarfImBaugebietBeruecksichtigenSchule': !exists(json, 'ausgelBedarfImBaugebietBeruecksichtigenSchule') ? undefined : json['ausgelBedarfImBaugebietBeruecksichtigenSchule'],
        'ausgelBedarfMitversorgungImBplanSchule': !exists(json, 'ausgelBedarfMitversorgungImBplanSchule') ? undefined : json['ausgelBedarfMitversorgungImBplanSchule'],
        'ausgelBedarfMitversorgungInBestEinrichtungenSchule': !exists(json, 'ausgelBedarfMitversorgungInBestEinrichtungenSchule') ? undefined : json['ausgelBedarfMitversorgungInBestEinrichtungenSchule'],
        'ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauSchule': !exists(json, 'ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauSchule') ? undefined : json['ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauSchule'],
        'hinweisVersorgung': !exists(json, 'hinweisVersorgung') ? undefined : json['hinweisVersorgung'],
    };
}

export function AbfragevarianteBaugenehmigungsverfahrenDtoToJSON(value?: AbfragevarianteBaugenehmigungsverfahrenDto | null): any {
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
        'gfWohnenPlanungsursaechlich': value.gfWohnenPlanungsursaechlich,
        'weGesamt': value.weGesamt,
        'weBaurechtlichGenehmigt': value.weBaurechtlichGenehmigt,
        'weBaurechtlichFestgesetzt': value.weBaurechtlichFestgesetzt,
        'weSonderwohnformen': value.weSonderwohnformen,
        'weStudentischesWohnen': value.weStudentischesWohnen,
        'weSeniorinnenWohnen': value.weSeniorinnenWohnen,
        'weGenossenschaftlichesWohnen': value.weGenossenschaftlichesWohnen,
        'weWeiteresNichtInfrastrukturrelevantesWohnen': value.weWeiteresNichtInfrastrukturrelevantesWohnen,
        'sobonOrientierungswertJahr': value.sobonOrientierungswertJahr,
        'anmerkung': value.anmerkung,
        'bedarfsmeldungFachreferate': value.bedarfsmeldungFachreferate === undefined ? undefined : ((value.bedarfsmeldungFachreferate as Array<any>).map(BedarfsmeldungFachreferateDtoToJSON)),
        'bauabschnitte': value.bauabschnitte === undefined ? undefined : ((value.bauabschnitte as Array<any>).map(BauabschnittDtoToJSON)),
        'ausgelBedarfImBaugebietBeruecksichtigenKita': value.ausgelBedarfImBaugebietBeruecksichtigenKita,
        'ausgelBedarfMitversorgungImBplanKita': value.ausgelBedarfMitversorgungImBplanKita,
        'ausgelBedarfMitversorgungInBestEinrichtungenKita': value.ausgelBedarfMitversorgungInBestEinrichtungenKita,
        'ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauKita': value.ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauKita,
        'ausgelBedarfImBaugebietBeruecksichtigenSchule': value.ausgelBedarfImBaugebietBeruecksichtigenSchule,
        'ausgelBedarfMitversorgungImBplanSchule': value.ausgelBedarfMitversorgungImBplanSchule,
        'ausgelBedarfMitversorgungInBestEinrichtungenSchule': value.ausgelBedarfMitversorgungInBestEinrichtungenSchule,
        'ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauSchule': value.ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauSchule,
        'hinweisVersorgung': value.hinweisVersorgung,
    };
}

