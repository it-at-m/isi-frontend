/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AdresseDto } from './AdresseDto';
import {
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import type { GrundschuleDto } from './GrundschuleDto';
import {
    GrundschuleDtoFromJSON,
    GrundschuleDtoFromJSONTyped,
    GrundschuleDtoToJSON,
} from './GrundschuleDto';
import type { GsNachmittagBetreuungDto } from './GsNachmittagBetreuungDto';
import {
    GsNachmittagBetreuungDtoFromJSON,
    GsNachmittagBetreuungDtoFromJSONTyped,
    GsNachmittagBetreuungDtoToJSON,
} from './GsNachmittagBetreuungDto';
import type { HausFuerKinderDto } from './HausFuerKinderDto';
import {
    HausFuerKinderDtoFromJSON,
    HausFuerKinderDtoFromJSONTyped,
    HausFuerKinderDtoToJSON,
} from './HausFuerKinderDto';
import type { KindergartenDto } from './KindergartenDto';
import {
    KindergartenDtoFromJSON,
    KindergartenDtoFromJSONTyped,
    KindergartenDtoToJSON,
} from './KindergartenDto';
import type { KinderkrippeDto } from './KinderkrippeDto';
import {
    KinderkrippeDtoFromJSON,
    KinderkrippeDtoFromJSONTyped,
    KinderkrippeDtoToJSON,
} from './KinderkrippeDto';
import type { MittelschuleDto } from './MittelschuleDto';
import {
    MittelschuleDtoFromJSON,
    MittelschuleDtoFromJSONTyped,
    MittelschuleDtoToJSON,
} from './MittelschuleDto';

import {
     GrundschuleDtoFromJSONTyped,
     GsNachmittagBetreuungDtoFromJSONTyped,
     HausFuerKinderDtoFromJSONTyped,
     KindergartenDtoFromJSONTyped,
     KinderkrippeDtoFromJSONTyped,
     MittelschuleDtoFromJSONTyped
} from './';

/**
 * InfrastruktureinrichtungDto
 * @export
 * @interface InfrastruktureinrichtungDto
 */
export interface InfrastruktureinrichtungDto {
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof InfrastruktureinrichtungDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InfrastruktureinrichtungDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungDto
     */
    infrastruktureinrichtungTyp?: InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum;
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
}


/**
 * @export
 */
export const InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum = {
    Unspecified: 'UNSPECIFIED',
    Kinderkrippe: 'KINDERKRIPPE',
    Kindergarten: 'KINDERGARTEN',
    GsNachmittagBetreuung: 'GS_NACHMITTAG_BETREUUNG',
    HausFuerKinder: 'HAUS_FUER_KINDER',
    Grundschule: 'GRUNDSCHULE',
    Mittelschule: 'MITTELSCHULE'
} as const;
export type InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum = typeof InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum[keyof typeof InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum];

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
 * Check if a given object implements the InfrastruktureinrichtungDto interface.
 */
export function instanceOfInfrastruktureinrichtungDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "nameEinrichtung" in value;
    isInstance = isInstance && "status" in value;

    return isInstance;
}

export function InfrastruktureinrichtungDtoFromJSON(json: any): InfrastruktureinrichtungDto {
    return InfrastruktureinrichtungDtoFromJSONTyped(json, false);
}

export function InfrastruktureinrichtungDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InfrastruktureinrichtungDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['infrastruktureinrichtungTyp'] === 'GRUNDSCHULE') {
            return GrundschuleDtoFromJSONTyped(json, true);
        }
        if (json['infrastruktureinrichtungTyp'] === 'GS_NACHMITTAG_BETREUUNG') {
            return GsNachmittagBetreuungDtoFromJSONTyped(json, true);
        }
        if (json['infrastruktureinrichtungTyp'] === 'HAUS_FUER_KINDER') {
            return HausFuerKinderDtoFromJSONTyped(json, true);
        }
        if (json['infrastruktureinrichtungTyp'] === 'KINDERGARTEN') {
            return KindergartenDtoFromJSONTyped(json, true);
        }
        if (json['infrastruktureinrichtungTyp'] === 'KINDERKRIPPE') {
            return KinderkrippeDtoFromJSONTyped(json, true);
        }
        if (json['infrastruktureinrichtungTyp'] === 'MITTELSCHULE') {
            return MittelschuleDtoFromJSONTyped(json, true);
        }
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'infrastruktureinrichtungTyp': !exists(json, 'infrastruktureinrichtungTyp') ? undefined : json['infrastruktureinrichtungTyp'],
        'lfdNr': !exists(json, 'lfdNr') ? undefined : json['lfdNr'],
        'bauvorhaben': !exists(json, 'bauvorhaben') ? undefined : json['bauvorhaben'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'nameEinrichtung': json['nameEinrichtung'],
        'fertigstellungsjahr': !exists(json, 'fertigstellungsjahr') ? undefined : json['fertigstellungsjahr'],
        'status': json['status'],
        'flaecheGesamtgrundstueck': !exists(json, 'flaecheGesamtgrundstueck') ? undefined : json['flaecheGesamtgrundstueck'],
        'flaecheTeilgrundstueck': !exists(json, 'flaecheTeilgrundstueck') ? undefined : json['flaecheTeilgrundstueck'],
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
        
        'id': value.id,
        'version': value.version,
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'infrastruktureinrichtungTyp': value.infrastruktureinrichtungTyp,
        'lfdNr': value.lfdNr,
        'bauvorhaben': value.bauvorhaben,
        'adresse': AdresseDtoToJSON(value.adresse),
        'nameEinrichtung': value.nameEinrichtung,
        'fertigstellungsjahr': value.fertigstellungsjahr,
        'status': value.status,
        'flaecheGesamtgrundstueck': value.flaecheGesamtgrundstueck,
        'flaecheTeilgrundstueck': value.flaecheTeilgrundstueck,
    };
}

