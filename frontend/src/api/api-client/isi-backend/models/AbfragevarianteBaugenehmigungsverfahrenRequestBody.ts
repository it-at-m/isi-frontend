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
/**
 * 
 * @export
 * @interface AbfragevarianteBaugenehmigungsverfahrenRequestBody
 */
export interface AbfragevarianteBaugenehmigungsverfahrenRequestBody {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    abfragevariantenNr?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    name?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    wesentlicheRechtsgrundlage?: Array<AbfragevarianteBaugenehmigungsverfahrenRequestBodyWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    realisierungVon?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    gfWohnenPlanungsursaechlich?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    weGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    weBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    weBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    weSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    weStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    weSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    weGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    weWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    sobonOrientierungswertJahr?: AbfragevarianteBaugenehmigungsverfahrenRequestBodySobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    stammdatenGueltigAb?: Date;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    anmerkung?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    bedarfsmeldungFachreferate?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    bedarfsmeldungAbfrageersteller?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    bauabschnitte?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungImBplanKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungImBplanSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    hinweisVersorgung?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteBaugenehmigungsverfahrenRequestBody
     */
    artAbfragevariante?: AbfragevarianteBaugenehmigungsverfahrenRequestBodyArtAbfragevarianteEnum;
}


/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenRequestBodyWesentlicheRechtsgrundlageEnum = {
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
export type AbfragevarianteBaugenehmigungsverfahrenRequestBodyWesentlicheRechtsgrundlageEnum = typeof AbfragevarianteBaugenehmigungsverfahrenRequestBodyWesentlicheRechtsgrundlageEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenRequestBodyWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenRequestBodySobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenRequestBodySobonOrientierungswertJahrEnum = typeof AbfragevarianteBaugenehmigungsverfahrenRequestBodySobonOrientierungswertJahrEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenRequestBodySobonOrientierungswertJahrEnum];

/**
 * @export
 */
export const AbfragevarianteBaugenehmigungsverfahrenRequestBodyArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type AbfragevarianteBaugenehmigungsverfahrenRequestBodyArtAbfragevarianteEnum = typeof AbfragevarianteBaugenehmigungsverfahrenRequestBodyArtAbfragevarianteEnum[keyof typeof AbfragevarianteBaugenehmigungsverfahrenRequestBodyArtAbfragevarianteEnum];


/**
 * Check if a given object implements the AbfragevarianteBaugenehmigungsverfahrenRequestBody interface.
 */
export function instanceOfAbfragevarianteBaugenehmigungsverfahrenRequestBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbfragevarianteBaugenehmigungsverfahrenRequestBodyFromJSON(json: any): AbfragevarianteBaugenehmigungsverfahrenRequestBody {
    return AbfragevarianteBaugenehmigungsverfahrenRequestBodyFromJSONTyped(json, false);
}

export function AbfragevarianteBaugenehmigungsverfahrenRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteBaugenehmigungsverfahrenRequestBody {
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

export function AbfragevarianteBaugenehmigungsverfahrenRequestBodyToJSON(value?: AbfragevarianteBaugenehmigungsverfahrenRequestBody | null): any {
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
