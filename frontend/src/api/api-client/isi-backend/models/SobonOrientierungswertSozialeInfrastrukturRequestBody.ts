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
 * @interface SobonOrientierungswertSozialeInfrastrukturRequestBody
 */
export interface SobonOrientierungswertSozialeInfrastrukturRequestBody {
    /**
     * 
     * @type {string}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    gueltigAb?: Date;
    /**
     * 
     * @type {string}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einrichtungstyp?: SobonOrientierungswertSozialeInfrastrukturRequestBodyEinrichtungstypEnum;
    /**
     * 
     * @type {string}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    altersklasse?: SobonOrientierungswertSozialeInfrastrukturRequestBodyAltersklasseEnum;
    /**
     * 
     * @type {string}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    foerderartBezeichnung?: string;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr1NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr2NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr3NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr4NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr5NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr6NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr7NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr8NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr9NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    einwohnerJahr10NachErsterstellung?: number;
    /**
     * 
     * @type {number}
     * @memberof SobonOrientierungswertSozialeInfrastrukturRequestBody
     */
    stammwertArbeitsgruppe?: number;
}


/**
 * @export
 */
export const SobonOrientierungswertSozialeInfrastrukturRequestBodyEinrichtungstypEnum = {
    Unspecified: 'UNSPECIFIED',
    Kinderkrippe: 'KINDERKRIPPE',
    Kindergarten: 'KINDERGARTEN',
    GsNachmittagBetreuung: 'GS_NACHMITTAG_BETREUUNG',
    HausFuerKinder: 'HAUS_FUER_KINDER',
    Grundschule: 'GRUNDSCHULE',
    Mittelschule: 'MITTELSCHULE'
} as const;
export type SobonOrientierungswertSozialeInfrastrukturRequestBodyEinrichtungstypEnum = typeof SobonOrientierungswertSozialeInfrastrukturRequestBodyEinrichtungstypEnum[keyof typeof SobonOrientierungswertSozialeInfrastrukturRequestBodyEinrichtungstypEnum];

/**
 * @export
 */
export const SobonOrientierungswertSozialeInfrastrukturRequestBodyAltersklasseEnum = {
    NullZwei: 'NULL_ZWEI',
    DreiSechseinhalb: 'DREI_SECHSEINHALB',
    SechseinhalbNeuneinhalb: 'SECHSEINHALB_NEUNEINHALB',
    ZehneinhalbFuenfzehn: 'ZEHNEINHALB_FUENFZEHN',
    SechszehnAchtzehn: 'SECHSZEHN_ACHTZEHN',
    AlleEwo: 'ALLE_EWO'
} as const;
export type SobonOrientierungswertSozialeInfrastrukturRequestBodyAltersklasseEnum = typeof SobonOrientierungswertSozialeInfrastrukturRequestBodyAltersklasseEnum[keyof typeof SobonOrientierungswertSozialeInfrastrukturRequestBodyAltersklasseEnum];


/**
 * Check if a given object implements the SobonOrientierungswertSozialeInfrastrukturRequestBody interface.
 */
export function instanceOfSobonOrientierungswertSozialeInfrastrukturRequestBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SobonOrientierungswertSozialeInfrastrukturRequestBodyFromJSON(json: any): SobonOrientierungswertSozialeInfrastrukturRequestBody {
    return SobonOrientierungswertSozialeInfrastrukturRequestBodyFromJSONTyped(json, false);
}

export function SobonOrientierungswertSozialeInfrastrukturRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): SobonOrientierungswertSozialeInfrastrukturRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'gueltigAb': !exists(json, 'gueltigAb') ? undefined : (new Date(json['gueltigAb'])),
        'einrichtungstyp': !exists(json, 'einrichtungstyp') ? undefined : json['einrichtungstyp'],
        'altersklasse': !exists(json, 'altersklasse') ? undefined : json['altersklasse'],
        'foerderartBezeichnung': !exists(json, 'foerderartBezeichnung') ? undefined : json['foerderartBezeichnung'],
        'einwohnerJahr1NachErsterstellung': !exists(json, 'einwohnerJahr1NachErsterstellung') ? undefined : json['einwohnerJahr1NachErsterstellung'],
        'einwohnerJahr2NachErsterstellung': !exists(json, 'einwohnerJahr2NachErsterstellung') ? undefined : json['einwohnerJahr2NachErsterstellung'],
        'einwohnerJahr3NachErsterstellung': !exists(json, 'einwohnerJahr3NachErsterstellung') ? undefined : json['einwohnerJahr3NachErsterstellung'],
        'einwohnerJahr4NachErsterstellung': !exists(json, 'einwohnerJahr4NachErsterstellung') ? undefined : json['einwohnerJahr4NachErsterstellung'],
        'einwohnerJahr5NachErsterstellung': !exists(json, 'einwohnerJahr5NachErsterstellung') ? undefined : json['einwohnerJahr5NachErsterstellung'],
        'einwohnerJahr6NachErsterstellung': !exists(json, 'einwohnerJahr6NachErsterstellung') ? undefined : json['einwohnerJahr6NachErsterstellung'],
        'einwohnerJahr7NachErsterstellung': !exists(json, 'einwohnerJahr7NachErsterstellung') ? undefined : json['einwohnerJahr7NachErsterstellung'],
        'einwohnerJahr8NachErsterstellung': !exists(json, 'einwohnerJahr8NachErsterstellung') ? undefined : json['einwohnerJahr8NachErsterstellung'],
        'einwohnerJahr9NachErsterstellung': !exists(json, 'einwohnerJahr9NachErsterstellung') ? undefined : json['einwohnerJahr9NachErsterstellung'],
        'einwohnerJahr10NachErsterstellung': !exists(json, 'einwohnerJahr10NachErsterstellung') ? undefined : json['einwohnerJahr10NachErsterstellung'],
        'stammwertArbeitsgruppe': !exists(json, 'stammwertArbeitsgruppe') ? undefined : json['stammwertArbeitsgruppe'],
    };
}

export function SobonOrientierungswertSozialeInfrastrukturRequestBodyToJSON(value?: SobonOrientierungswertSozialeInfrastrukturRequestBody | null): any {
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
        'gueltigAb': value.gueltigAb === undefined ? undefined : (value.gueltigAb.toISOString().substr(0,10)),
        'einrichtungstyp': value.einrichtungstyp,
        'altersklasse': value.altersklasse,
        'foerderartBezeichnung': value.foerderartBezeichnung,
        'einwohnerJahr1NachErsterstellung': value.einwohnerJahr1NachErsterstellung,
        'einwohnerJahr2NachErsterstellung': value.einwohnerJahr2NachErsterstellung,
        'einwohnerJahr3NachErsterstellung': value.einwohnerJahr3NachErsterstellung,
        'einwohnerJahr4NachErsterstellung': value.einwohnerJahr4NachErsterstellung,
        'einwohnerJahr5NachErsterstellung': value.einwohnerJahr5NachErsterstellung,
        'einwohnerJahr6NachErsterstellung': value.einwohnerJahr6NachErsterstellung,
        'einwohnerJahr7NachErsterstellung': value.einwohnerJahr7NachErsterstellung,
        'einwohnerJahr8NachErsterstellung': value.einwohnerJahr8NachErsterstellung,
        'einwohnerJahr9NachErsterstellung': value.einwohnerJahr9NachErsterstellung,
        'einwohnerJahr10NachErsterstellung': value.einwohnerJahr10NachErsterstellung,
        'stammwertArbeitsgruppe': value.stammwertArbeitsgruppe,
    };
}

