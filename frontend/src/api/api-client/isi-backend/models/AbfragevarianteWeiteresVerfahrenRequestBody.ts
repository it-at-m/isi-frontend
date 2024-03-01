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
import type { Foerdermix } from './Foerdermix';
import {
    FoerdermixFromJSON,
    FoerdermixFromJSONTyped,
    FoerdermixToJSON,
} from './Foerdermix';

/**
 * 
 * @export
 * @interface AbfragevarianteWeiteresVerfahrenRequestBody
 */
export interface AbfragevarianteWeiteresVerfahrenRequestBody {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    abfragevariantenNr?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    name?: string;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    satzungsbeschluss?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    wesentlicheRechtsgrundlage?: Array<AbfragevarianteWeiteresVerfahrenRequestBodyWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    realisierungVon?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenSobonUrsaechlich?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    weGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    weBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    weBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    weSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    weStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    weSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    weGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    weWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    sobonOrientierungswertJahr?: AbfragevarianteWeiteresVerfahrenRequestBodySobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    isASobonBerechnung?: boolean;
    /**
     * 
     * @type {Foerdermix}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    sobonFoerdermix?: Foerdermix;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    stammdatenGueltigAb?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    anmerkung?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    bedarfsmeldungFachreferate?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    bedarfsmeldungAbfrageersteller?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    bauabschnitte?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungImBplanKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungImBplanSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    hinweisVersorgung?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteWeiteresVerfahrenRequestBody
     */
    artAbfragevariante?: AbfragevarianteWeiteresVerfahrenRequestBodyArtAbfragevarianteEnum;
}


/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenRequestBodyWesentlicheRechtsgrundlageEnum = {
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
export type AbfragevarianteWeiteresVerfahrenRequestBodyWesentlicheRechtsgrundlageEnum = typeof AbfragevarianteWeiteresVerfahrenRequestBodyWesentlicheRechtsgrundlageEnum[keyof typeof AbfragevarianteWeiteresVerfahrenRequestBodyWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenRequestBodySobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteWeiteresVerfahrenRequestBodySobonOrientierungswertJahrEnum = typeof AbfragevarianteWeiteresVerfahrenRequestBodySobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteWeiteresVerfahrenRequestBodySobonOrientierungswertJahrEnum];

/**
 * @export
 */
export const AbfragevarianteWeiteresVerfahrenRequestBodyArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteWeiteresVerfahrenRequestBodyArtAbfragevarianteEnum = typeof AbfragevarianteWeiteresVerfahrenRequestBodyArtAbfragevarianteEnum[keyof typeof AbfragevarianteWeiteresVerfahrenRequestBodyArtAbfragevarianteEnum];


/**
 * Check if a given object implements the AbfragevarianteWeiteresVerfahrenRequestBody interface.
 */
export function instanceOfAbfragevarianteWeiteresVerfahrenRequestBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfragevarianteWeiteresVerfahrenRequestBodyFromJSON(json: any): AbfragevarianteWeiteresVerfahrenRequestBody {
    return AbfragevarianteWeiteresVerfahrenRequestBodyFromJSONTyped(json, false);
}

export function AbfragevarianteWeiteresVerfahrenRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteWeiteresVerfahrenRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'abfragevariantenNr': !exists(json, 'abfragevariantenNr') ? undefined : json['abfragevariantenNr'],
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
        'isASobonBerechnung': !exists(json, 'isASobonBerechnung') ? undefined : json['isASobonBerechnung'],
        'sobonFoerdermix': !exists(json, 'sobonFoerdermix') ? undefined : FoerdermixFromJSON(json['sobonFoerdermix']),
        'stammdatenGueltigAb': !exists(json, 'stammdatenGueltigAb') ? undefined : (new Date(json['stammdatenGueltigAb'])),
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'bedarfsmeldungFachreferate': !exists(json, 'bedarfsmeldungFachreferate') ? undefined : json['bedarfsmeldungFachreferate'],
        'bedarfsmeldungAbfrageersteller': !exists(json, 'bedarfsmeldungAbfrageersteller') ? undefined : json['bedarfsmeldungAbfrageersteller'],
        'bauabschnitte': !exists(json, 'bauabschnitte') ? undefined : json['bauabschnitte'],
        'ausgeloesterBedarfImBaugebietBeruecksichtigenKita': !exists(json, 'ausgeloesterBedarfImBaugebietBeruecksichtigenKita') ? undefined : json['ausgeloesterBedarfImBaugebietBeruecksichtigenKita'],
        'ausgeloesterBedarfMitversorgungImBplanKita': !exists(json, 'ausgeloesterBedarfMitversorgungImBplanKita') ? undefined : json['ausgeloesterBedarfMitversorgungImBplanKita'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenKita': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenKita') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenKita'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita'],
        'ausgeloesterBedarfImBaugebietBeruecksichtigenSchule': !exists(json, 'ausgeloesterBedarfImBaugebietBeruecksichtigenSchule') ? undefined : json['ausgeloesterBedarfImBaugebietBeruecksichtigenSchule'],
        'ausgeloesterBedarfMitversorgungImBplanSchule': !exists(json, 'ausgeloesterBedarfMitversorgungImBplanSchule') ? undefined : json['ausgeloesterBedarfMitversorgungImBplanSchule'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule'],
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule': !exists(json, 'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule') ? undefined : json['ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule'],
        'hinweisVersorgung': !exists(json, 'hinweisVersorgung') ? undefined : json['hinweisVersorgung'],
        'artAbfragevariante': !exists(json, 'artAbfragevariante') ? undefined : json['artAbfragevariante'],
    };
}

export function AbfragevarianteWeiteresVerfahrenRequestBodyToJSON(value?: AbfragevarianteWeiteresVerfahrenRequestBody | null): any {
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
        'isASobonBerechnung': value.isASobonBerechnung,
        'sobonFoerdermix': FoerdermixToJSON(value.sobonFoerdermix),
        'stammdatenGueltigAb': value.stammdatenGueltigAb === undefined ? undefined : (value.stammdatenGueltigAb.toISOString().substr(0,10)),
        'anmerkung': value.anmerkung,
        'bedarfsmeldungFachreferate': value.bedarfsmeldungFachreferate,
        'bedarfsmeldungAbfrageersteller': value.bedarfsmeldungAbfrageersteller,
        'bauabschnitte': value.bauabschnitte,
        'ausgeloesterBedarfImBaugebietBeruecksichtigenKita': value.ausgeloesterBedarfImBaugebietBeruecksichtigenKita,
        'ausgeloesterBedarfMitversorgungImBplanKita': value.ausgeloesterBedarfMitversorgungImBplanKita,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenKita': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenKita,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita,
        'ausgeloesterBedarfImBaugebietBeruecksichtigenSchule': value.ausgeloesterBedarfImBaugebietBeruecksichtigenSchule,
        'ausgeloesterBedarfMitversorgungImBplanSchule': value.ausgeloesterBedarfMitversorgungImBplanSchule,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule,
        'ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule': value.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule,
        'hinweisVersorgung': value.hinweisVersorgung,
        'artAbfragevariante': value.artAbfragevariante,
    };
}

