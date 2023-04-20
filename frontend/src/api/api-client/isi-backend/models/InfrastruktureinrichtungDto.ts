/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Serivce für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AdresseDto,
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';

/**
 * 
 * @export
 * @interface InfrastruktureinrichtungDto
 */
export interface InfrastruktureinrichtungDto {
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungDto
     */
    lfdNr?: number;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungDto
     */
    bauvorhaben?: string;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungDto
     */
    allgemeineOrtsangabe?: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof InfrastruktureinrichtungDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungDto
     */
    nameEinrichtung: string;
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungDto
     */
    fertigstellungsjahr?: number;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungDto
     */
    status: InfrastruktureinrichtungDtoStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungDto
     */
    einrichtungstraeger?: InfrastruktureinrichtungDtoEinrichtungstraegerEnum;
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungDto
     */
    flaecheGesamtgrundstueck?: number;
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungDto
     */
    flaecheTeilgrundstueck?: number;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungDto
     */
    zugeordnetesBaugebiet?: string;
}


/**
 * @export
 */
export const InfrastruktureinrichtungDtoStatusEnum = {
    Unspecified: 'UNSPECIFIED',
    UngesichertePlanung: 'UNGESICHERTE_PLANUNG',
    GesichertePlanungNeueEinr: 'GESICHERTE_PLANUNG_NEUE_EINR',
    GesichertePlanungErwPlaetzeBestEinr: 'GESICHERTE_PLANUNG_ERW_PLAETZE_BEST_EINR',
    GesichertePlanungTfKitaStandort: 'GESICHERTE_PLANUNG_TF_KITA_STANDORT',
    GesichertePlanungReduzierungPlaetze: 'GESICHERTE_PLANUNG_REDUZIERUNG_PLAETZE',
    GesichertePlanungInterimsstandort: 'GESICHERTE_PLANUNG_INTERIMSSTANDORT',
    UngesichertePlanungTfKitaStandort: 'UNGESICHERTE_PLANUNG_TF_KITA_STANDORT',
    Bestand: 'BESTAND'
} as const;
export type InfrastruktureinrichtungDtoStatusEnum = typeof InfrastruktureinrichtungDtoStatusEnum[keyof typeof InfrastruktureinrichtungDtoStatusEnum];

/**
 * @export
 */
export const InfrastruktureinrichtungDtoEinrichtungstraegerEnum = {
    Unspecified: 'UNSPECIFIED',
    KitaStaedtischeEinrichtung: 'KITA_STAEDTISCHE_EINRICHTUNG',
    KitaEinrichtungBetriebstraegerschaft: 'KITA_EINRICHTUNG_BETRIEBSTRAEGERSCHAFT',
    KitaFreieGemeinnuetzigeSonstige: 'KITA_FREIE_GEMEINNUETZIGE_SONSTIGE',
    KitaEinrichtungGesamtstaedtisch: 'KITA_EINRICHTUNG_GESAMTSTAEDTISCH',
    GsBetreuungStaedtischeEinrichtung: 'GS_BETREUUNG_STAEDTISCHE_EINRICHTUNG',
    GsBetreuungElternKindInitiative: 'GS_BETREUUNG_ELTERN_KIND_INITIATIVE',
    GsBetreuungStaatlicheEinrichtung: 'GS_BETREUUNG_STAATLICHE_EINRICHTUNG',
    GsBetreuungPrivateTraegerschaft: 'GS_BETREUUNG_PRIVATE_TRAEGERSCHAFT',
    GsBetreuungKirchlicheTraegerschaft: 'GS_BETREUUNG_KIRCHLICHE_TRAEGERSCHAFT',
    SchuleStaedtischeEinrichtung: 'SCHULE_STAEDTISCHE_EINRICHTUNG',
    SchuleStaatlicheEinrichtung: 'SCHULE_STAATLICHE_EINRICHTUNG',
    SchulePrivateTraegerschaft: 'SCHULE_PRIVATE_TRAEGERSCHAFT',
    SchuleKirchlicheTraegerschaft: 'SCHULE_KIRCHLICHE_TRAEGERSCHAFT'
} as const;
export type InfrastruktureinrichtungDtoEinrichtungstraegerEnum = typeof InfrastruktureinrichtungDtoEinrichtungstraegerEnum[keyof typeof InfrastruktureinrichtungDtoEinrichtungstraegerEnum];


export function InfrastruktureinrichtungDtoFromJSON(json: any): InfrastruktureinrichtungDto {
    return InfrastruktureinrichtungDtoFromJSONTyped(json, false);
}

export function InfrastruktureinrichtungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InfrastruktureinrichtungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lfdNr': !exists(json, 'lfdNr') ? undefined : json['lfdNr'],
        'bauvorhaben': !exists(json, 'bauvorhaben') ? undefined : json['bauvorhaben'],
        'allgemeineOrtsangabe': !exists(json, 'allgemeineOrtsangabe') ? undefined : json['allgemeineOrtsangabe'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'nameEinrichtung': json['nameEinrichtung'],
        'fertigstellungsjahr': !exists(json, 'fertigstellungsjahr') ? undefined : json['fertigstellungsjahr'],
        'status': json['status'],
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : json['einrichtungstraeger'],
        'flaecheGesamtgrundstueck': !exists(json, 'flaecheGesamtgrundstueck') ? undefined : json['flaecheGesamtgrundstueck'],
        'flaecheTeilgrundstueck': !exists(json, 'flaecheTeilgrundstueck') ? undefined : json['flaecheTeilgrundstueck'],
        'zugeordnetesBaugebiet': !exists(json, 'zugeordnetesBaugebiet') ? undefined : json['zugeordnetesBaugebiet'],
    };
}

export function InfrastruktureinrichtungDtoToJSON(value?: InfrastruktureinrichtungDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lfdNr': value.lfdNr,
        'bauvorhaben': value.bauvorhaben,
        'allgemeineOrtsangabe': value.allgemeineOrtsangabe,
        'adresse': AdresseDtoToJSON(value.adresse),
        'nameEinrichtung': value.nameEinrichtung,
        'fertigstellungsjahr': value.fertigstellungsjahr,
        'status': value.status,
        'einrichtungstraeger': value.einrichtungstraeger,
        'flaecheGesamtgrundstueck': value.flaecheGesamtgrundstueck,
        'flaecheTeilgrundstueck': value.flaecheTeilgrundstueck,
        'zugeordnetesBaugebiet': value.zugeordnetesBaugebiet,
    };
}

