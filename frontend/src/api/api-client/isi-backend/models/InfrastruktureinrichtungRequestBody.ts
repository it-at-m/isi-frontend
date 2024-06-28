/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Adresse } from './Adresse';
import {
    AdresseFromJSON,
    AdresseFromJSONTyped,
    AdresseToJSON,
} from './Adresse';
import type { BearbeitendePerson } from './BearbeitendePerson';
import {
    BearbeitendePersonFromJSON,
    BearbeitendePersonFromJSONTyped,
    BearbeitendePersonToJSON,
} from './BearbeitendePerson';
import type { VerortungPoint } from './VerortungPoint';
import {
    VerortungPointFromJSON,
    VerortungPointFromJSONTyped,
    VerortungPointToJSON,
} from './VerortungPoint';

/**
 * 
 * @export
 * @interface InfrastruktureinrichtungRequestBody
 */
export interface InfrastruktureinrichtungRequestBody {
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {BearbeitendePerson}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    bearbeitendePerson?: BearbeitendePerson;
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    lfdNr?: number;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    bauvorhaben?: string;
    /**
     * 
     * @type {Adresse}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    adresse?: Adresse;
    /**
     * 
     * @type {VerortungPoint}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    verortung?: VerortungPoint;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    nameEinrichtung?: string;
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    fertigstellungsjahr?: number;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    status?: InfrastruktureinrichtungRequestBodyStatusEnum;
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    flaecheGesamtgrundstueck?: number;
    /**
     * 
     * @type {number}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    flaecheTeilgrundstueck?: number;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    idKibigWeb?: string;
    /**
     * 
     * @type {string}
     * @memberof InfrastruktureinrichtungRequestBody
     */
    infrastruktureinrichtungTyp?: InfrastruktureinrichtungRequestBodyInfrastruktureinrichtungTypEnum;
}


/**
 * @export
 */
export const InfrastruktureinrichtungRequestBodyStatusEnum = {
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
export type InfrastruktureinrichtungRequestBodyStatusEnum = typeof InfrastruktureinrichtungRequestBodyStatusEnum[keyof typeof InfrastruktureinrichtungRequestBodyStatusEnum];

/**
 * @export
 */
export const InfrastruktureinrichtungRequestBodyInfrastruktureinrichtungTypEnum = {
    Unspecified: 'UNSPECIFIED',
    Kinderkrippe: 'KINDERKRIPPE',
    Kindergarten: 'KINDERGARTEN',
    GsNachmittagBetreuung: 'GS_NACHMITTAG_BETREUUNG',
    HausFuerKinder: 'HAUS_FUER_KINDER',
    Grundschule: 'GRUNDSCHULE',
    Mittelschule: 'MITTELSCHULE'
} as const;
export type InfrastruktureinrichtungRequestBodyInfrastruktureinrichtungTypEnum = typeof InfrastruktureinrichtungRequestBodyInfrastruktureinrichtungTypEnum[keyof typeof InfrastruktureinrichtungRequestBodyInfrastruktureinrichtungTypEnum];


/**
 * Check if a given object implements the InfrastruktureinrichtungRequestBody interface.
 */
export function instanceOfInfrastruktureinrichtungRequestBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function InfrastruktureinrichtungRequestBodyFromJSON(json: any): InfrastruktureinrichtungRequestBody {
    return InfrastruktureinrichtungRequestBodyFromJSONTyped(json, false);
}

export function InfrastruktureinrichtungRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): InfrastruktureinrichtungRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'bearbeitendePerson': !exists(json, 'bearbeitendePerson') ? undefined : BearbeitendePersonFromJSON(json['bearbeitendePerson']),
        'lfdNr': !exists(json, 'lfdNr') ? undefined : json['lfdNr'],
        'bauvorhaben': !exists(json, 'bauvorhaben') ? undefined : json['bauvorhaben'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungPointFromJSON(json['verortung']),
        'nameEinrichtung': !exists(json, 'nameEinrichtung') ? undefined : json['nameEinrichtung'],
        'fertigstellungsjahr': !exists(json, 'fertigstellungsjahr') ? undefined : json['fertigstellungsjahr'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'flaecheGesamtgrundstueck': !exists(json, 'flaecheGesamtgrundstueck') ? undefined : json['flaecheGesamtgrundstueck'],
        'flaecheTeilgrundstueck': !exists(json, 'flaecheTeilgrundstueck') ? undefined : json['flaecheTeilgrundstueck'],
        'idKibigWeb': !exists(json, 'idKibigWeb') ? undefined : json['idKibigWeb'],
        'infrastruktureinrichtungTyp': !exists(json, 'infrastruktureinrichtungTyp') ? undefined : json['infrastruktureinrichtungTyp'],
    };
}

export function InfrastruktureinrichtungRequestBodyToJSON(value?: InfrastruktureinrichtungRequestBody | null): any {
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
        'bearbeitendePerson': BearbeitendePersonToJSON(value.bearbeitendePerson),
        'lfdNr': value.lfdNr,
        'bauvorhaben': value.bauvorhaben,
        'adresse': AdresseToJSON(value.adresse),
        'verortung': VerortungPointToJSON(value.verortung),
        'nameEinrichtung': value.nameEinrichtung,
        'fertigstellungsjahr': value.fertigstellungsjahr,
        'status': value.status,
        'flaecheGesamtgrundstueck': value.flaecheGesamtgrundstueck,
        'flaecheTeilgrundstueck': value.flaecheTeilgrundstueck,
        'idKibigWeb': value.idKibigWeb,
        'infrastruktureinrichtungTyp': value.infrastruktureinrichtungTyp,
    };
}

