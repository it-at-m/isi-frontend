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
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
} from './Link';
import type { SobonBerechnung } from './SobonBerechnung';
import {
    SobonBerechnungFromJSON,
    SobonBerechnungFromJSONTyped,
    SobonBerechnungToJSON,
} from './SobonBerechnung';

/**
 * 
 * @export
 * @interface EntityModelAbfragevarianteBauleitplanverfahren
 */
export interface EntityModelAbfragevarianteBauleitplanverfahren {
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    abfragevariantenNr?: number;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    name?: string;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    satzungsbeschluss?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    wesentlicheRechtsgrundlage?: Array<EntityModelAbfragevarianteBauleitplanverfahrenWesentlicheRechtsgrundlageEnum>;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    wesentlicheRechtsgrundlageFreieEingabe?: string;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    realisierungVon?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    gfWohnenGesamt?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    gfWohnenSobonUrsaechlich?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    gfWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    gfWohnenSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    gfWohnenStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    gfWohnenSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    gfWohnenGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    weGesamt?: number;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    weSonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    weStudentischesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    weSeniorinnenWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    weGenossenschaftlichesWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    weWeiteresNichtInfrastrukturrelevantesWohnen?: number;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    sobonOrientierungswertJahr?: EntityModelAbfragevarianteBauleitplanverfahrenSobonOrientierungswertJahrEnum;
    /**
     * 
     * @type {SobonBerechnung}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    sobonBerechnung?: SobonBerechnung;
    /**
     * 
     * @type {Date}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    stammdatenGueltigAb?: Date;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    anmerkung?: string;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    ausgeloesterBedarfMitversorgungImBplanKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    ausgeloesterBedarfImBaugebietBeruecksichtigenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    ausgeloesterBedarfMitversorgungImBplanSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule?: boolean;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    hinweisVersorgung?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    artAbfragevariante?: EntityModelAbfragevarianteBauleitplanverfahrenArtAbfragevarianteEnum;
    /**
     * 
     * @type {{ [key: string]: Link; }}
     * @memberof EntityModelAbfragevarianteBauleitplanverfahren
     */
    links?: { [key: string]: Link; };
}


/**
 * @export
 */
export const EntityModelAbfragevarianteBauleitplanverfahrenWesentlicheRechtsgrundlageEnum = {
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
export type EntityModelAbfragevarianteBauleitplanverfahrenWesentlicheRechtsgrundlageEnum = typeof EntityModelAbfragevarianteBauleitplanverfahrenWesentlicheRechtsgrundlageEnum[keyof typeof EntityModelAbfragevarianteBauleitplanverfahrenWesentlicheRechtsgrundlageEnum];

/**
 * @export
 */
export const EntityModelAbfragevarianteBauleitplanverfahrenSobonOrientierungswertJahrEnum = {
    Unspecified: 'UNSPECIFIED',
    Jahr2014: 'JAHR_2014',
    Jahr2017: 'JAHR_2017',
    Jahr2022: 'JAHR_2022',
    Standortabfrage: 'STANDORTABFRAGE'
} as const;
export type EntityModelAbfragevarianteBauleitplanverfahrenSobonOrientierungswertJahrEnum = typeof EntityModelAbfragevarianteBauleitplanverfahrenSobonOrientierungswertJahrEnum[keyof typeof EntityModelAbfragevarianteBauleitplanverfahrenSobonOrientierungswertJahrEnum];

/**
 * @export
 */
export const EntityModelAbfragevarianteBauleitplanverfahrenArtAbfragevarianteEnum = {
    Unspecified: 'UNSPECIFIED',
    Bauleitplanverfahren: 'BAULEITPLANVERFAHREN',
    Baugenehmigungsverfahren: 'BAUGENEHMIGUNGSVERFAHREN',
    WeiteresVerfahren: 'WEITERES_VERFAHREN'
} as const;
export type EntityModelAbfragevarianteBauleitplanverfahrenArtAbfragevarianteEnum = typeof EntityModelAbfragevarianteBauleitplanverfahrenArtAbfragevarianteEnum[keyof typeof EntityModelAbfragevarianteBauleitplanverfahrenArtAbfragevarianteEnum];


/**
 * Check if a given object implements the EntityModelAbfragevarianteBauleitplanverfahren interface.
 */
export function instanceOfEntityModelAbfragevarianteBauleitplanverfahren(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EntityModelAbfragevarianteBauleitplanverfahrenFromJSON(json: any): EntityModelAbfragevarianteBauleitplanverfahren {
    return EntityModelAbfragevarianteBauleitplanverfahrenFromJSONTyped(json, false);
}

export function EntityModelAbfragevarianteBauleitplanverfahrenFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityModelAbfragevarianteBauleitplanverfahren {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
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
        'gfWohnenSobonUrsaechlich': !exists(json, 'gfWohnenSobonUrsaechlich') ? undefined : json['gfWohnenSobonUrsaechlich'],
        'gfWohnenBestandswohnbaurecht': !exists(json, 'gfWohnenBestandswohnbaurecht') ? undefined : json['gfWohnenBestandswohnbaurecht'],
        'gfWohnenSonderwohnformen': !exists(json, 'gfWohnenSonderwohnformen') ? undefined : json['gfWohnenSonderwohnformen'],
        'gfWohnenStudentischesWohnen': !exists(json, 'gfWohnenStudentischesWohnen') ? undefined : json['gfWohnenStudentischesWohnen'],
        'gfWohnenSeniorinnenWohnen': !exists(json, 'gfWohnenSeniorinnenWohnen') ? undefined : json['gfWohnenSeniorinnenWohnen'],
        'gfWohnenGenossenschaftlichesWohnen': !exists(json, 'gfWohnenGenossenschaftlichesWohnen') ? undefined : json['gfWohnenGenossenschaftlichesWohnen'],
        'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen'],
        'weGesamt': !exists(json, 'weGesamt') ? undefined : json['weGesamt'],
        'weSonderwohnformen': !exists(json, 'weSonderwohnformen') ? undefined : json['weSonderwohnformen'],
        'weStudentischesWohnen': !exists(json, 'weStudentischesWohnen') ? undefined : json['weStudentischesWohnen'],
        'weSeniorinnenWohnen': !exists(json, 'weSeniorinnenWohnen') ? undefined : json['weSeniorinnenWohnen'],
        'weGenossenschaftlichesWohnen': !exists(json, 'weGenossenschaftlichesWohnen') ? undefined : json['weGenossenschaftlichesWohnen'],
        'weWeiteresNichtInfrastrukturrelevantesWohnen': !exists(json, 'weWeiteresNichtInfrastrukturrelevantesWohnen') ? undefined : json['weWeiteresNichtInfrastrukturrelevantesWohnen'],
        'sobonOrientierungswertJahr': !exists(json, 'sobonOrientierungswertJahr') ? undefined : json['sobonOrientierungswertJahr'],
        'sobonBerechnung': !exists(json, 'sobonBerechnung') ? undefined : SobonBerechnungFromJSON(json['sobonBerechnung']),
        'stammdatenGueltigAb': !exists(json, 'stammdatenGueltigAb') ? undefined : (new Date(json['stammdatenGueltigAb'])),
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
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
        'links': !exists(json, '_links') ? undefined : (mapValues(json['_links'], LinkFromJSON)),
    };
}

export function EntityModelAbfragevarianteBauleitplanverfahrenToJSON(value?: EntityModelAbfragevarianteBauleitplanverfahren | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
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
        'sobonOrientierungswertJahr': value.sobonOrientierungswertJahr,
        'sobonBerechnung': SobonBerechnungToJSON(value.sobonBerechnung),
        'stammdatenGueltigAb': value.stammdatenGueltigAb === undefined ? undefined : (value.stammdatenGueltigAb.toISOString().substr(0,10)),
        'anmerkung': value.anmerkung,
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
        '_links': value.links === undefined ? undefined : (mapValues(value.links, LinkToJSON)),
    };
}

