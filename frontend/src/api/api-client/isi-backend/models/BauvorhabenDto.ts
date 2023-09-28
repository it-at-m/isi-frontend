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
import {
    AbfragevarianteDto,
    AbfragevarianteDtoFromJSON,
    AbfragevarianteDtoFromJSONTyped,
    AbfragevarianteDtoToJSON,
} from './AbfragevarianteDto';
import {
    AdresseDto,
    AdresseDtoFromJSON,
    AdresseDtoFromJSONTyped,
    AdresseDtoToJSON,
} from './AdresseDto';
import {
    DokumentDto,
    DokumentDtoFromJSON,
    DokumentDtoFromJSONTyped,
    DokumentDtoToJSON,
} from './DokumentDto';
import {
    UncertainBoolean,
    UncertainBooleanFromJSON,
    UncertainBooleanFromJSONTyped,
    UncertainBooleanToJSON,
} from './UncertainBoolean';
import {
    VerortungDto,
    VerortungDtoFromJSON,
    VerortungDtoFromJSONTyped,
    VerortungDtoToJSON,
} from './VerortungDto';

/**
 * 
 * @export
 * @interface BauvorhabenDto
 */
export interface BauvorhabenDto {
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof BauvorhabenDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof BauvorhabenDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BauvorhabenDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    nameVorhaben: string;
    /**
     * 
     * @type {number}
     * @memberof BauvorhabenDto
     */
    grundstuecksgroesse?: number;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    standVorhaben: BauvorhabenDtoStandVorhabenEnum;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    bauvorhabenNummer: string;
    /**
     * 
     * @type {AdresseDto}
     * @memberof BauvorhabenDto
     */
    adresse?: AdresseDto;
    /**
     * 
     * @type {VerortungDto}
     * @memberof BauvorhabenDto
     */
    verortung?: VerortungDto;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    allgemeineOrtsangabe?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    bebauungsplannummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    fisNummer?: string;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    anmerkung?: string;
    /**
     * 
     * @type {UncertainBoolean}
     * @memberof BauvorhabenDto
     */
    sobonRelevant: UncertainBoolean;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    sobonJahr?: BauvorhabenDtoSobonJahrEnum;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    planungsrecht: BauvorhabenDtoPlanungsrechtEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof BauvorhabenDto
     */
    artFnp: Array<BauvorhabenDtoArtFnpEnum>;
    /**
     * 
     * @type {Array<DokumentDto>}
     * @memberof BauvorhabenDto
     */
    dokumente?: Array<DokumentDto>;
    /**
     * 
     * @type {AbfragevarianteDto}
     * @memberof BauvorhabenDto
     */
    relevanteAbfragevariante?: AbfragevarianteDto;
}


/**
 * @export
 */
export const BauvorhabenDtoStandVorhabenEnum = {
    Unspecified: 'UNSPECIFIED',
    GrundsatzEckdatenbeschluss: 'GRUNDSATZ_ECKDATENBESCHLUSS',
    Aufstellungsbeschluss: 'AUFSTELLUNGSBESCHLUSS',
    Parag31Baugb: 'PARAG_3_1_BAUGB',
    Parag32Baugb: 'PARAG_3_2_BAUGB',
    Parag412Baugb: 'PARAG_4_1_2_BAUGB',
    Billigungsbeschluss: 'BILLIGUNGSBESCHLUSS',
    Satzungsbeschluss: 'SATZUNGSBESCHLUSS',
    BplanInKraft: 'BPLAN_IN_KRAFT',
    VorbescheidEingereicht: 'VORBESCHEID_EINGEREICHT',
    BauantragEingereicht: 'BAUANTRAG_EINGEREICHT',
    BaugenehmigungErteilt: 'BAUGENEHMIGUNG_ERTEILT',
    BaubeginnAngezeigt: 'BAUBEGINN_ANGEZEIGT',
    BaufertigstellungGeplant: 'BAUFERTIGSTELLUNG_GEPLANT',
    BaufertigstellungAngezeigt: 'BAUFERTIGSTELLUNG_ANGEZEIGT'
} as const;
export type BauvorhabenDtoStandVorhabenEnum = typeof BauvorhabenDtoStandVorhabenEnum[keyof typeof BauvorhabenDtoStandVorhabenEnum];

/**
 * @export
 */
export const BauvorhabenDtoSobonJahrEnum = {
    _1995: 'JAHR_1995',
    _1997: 'JAHR_1997',
    _2001: 'JAHR_2001',
    _2006: 'JAHR_2006',
    _2012: 'JAHR_2012',
    _2017: 'JAHR_2017',
    _2017Plus: 'JAHR_2017_PLUS',
    _2021: 'JAHR_2021'
} as const;
export type BauvorhabenDtoSobonJahrEnum = typeof BauvorhabenDtoSobonJahrEnum[keyof typeof BauvorhabenDtoSobonJahrEnum];

/**
 * @export
 */
export const BauvorhabenDtoPlanungsrechtEnum = {
    Unspecified: 'UNSPECIFIED',
    BplanParag30: 'BPLAN_PARAG_30',
    BplanParag12: 'BPLAN_PARAG_12',
    BplanParag11: 'BPLAN_PARAG_11',
    BplanAendBbplan: 'BPLAN_AEND_BBPLAN',
    NachverdParag34: 'NACHVERD_PARAG_34',
    NachverdParag35: 'NACHVERD_PARAG_35',
    NachverdParag31: 'NACHVERD_PARAG_31',
    NachverdBaurechtsausschoepfung: 'NACHVERD_BAURECHTSAUSSCHOEPFUNG',
    SonstigesUmstrukturierung: 'SONSTIGES_UMSTRUKTURIERUNG',
    SonstigesParag165: 'SONSTIGES_PARAG_165',
    SonstigesParag246: 'SONSTIGES_PARAG_246'
} as const;
export type BauvorhabenDtoPlanungsrechtEnum = typeof BauvorhabenDtoPlanungsrechtEnum[keyof typeof BauvorhabenDtoPlanungsrechtEnum];

/**
 * @export
 */
export const BauvorhabenDtoArtFnpEnum = {
    Wr: 'WR',
    Wa: 'WA',
    Mu: 'MU',
    Mk: 'MK',
    Mi: 'MI',
    Ge: 'GE'
} as const;
export type BauvorhabenDtoArtFnpEnum = typeof BauvorhabenDtoArtFnpEnum[keyof typeof BauvorhabenDtoArtFnpEnum];


export function BauvorhabenDtoFromJSON(json: any): BauvorhabenDto {
    return BauvorhabenDtoFromJSONTyped(json, false);
}

export function BauvorhabenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BauvorhabenDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'nameVorhaben': json['nameVorhaben'],
        'grundstuecksgroesse': !exists(json, 'grundstuecksgroesse') ? undefined : json['grundstuecksgroesse'],
        'standVorhaben': json['standVorhaben'],
        'bauvorhabenNummer': json['bauvorhabenNummer'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'verortung': !exists(json, 'verortung') ? undefined : VerortungDtoFromJSON(json['verortung']),
        'allgemeineOrtsangabe': !exists(json, 'allgemeineOrtsangabe') ? undefined : json['allgemeineOrtsangabe'],
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'fisNummer': !exists(json, 'fisNummer') ? undefined : json['fisNummer'],
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'sobonRelevant': UncertainBooleanFromJSON(json['sobonRelevant']),
        'sobonJahr': !exists(json, 'sobonJahr') ? undefined : json['sobonJahr'],
        'planungsrecht': json['planungsrecht'],
        'artFnp': json['artFnp'],
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
        'relevanteAbfragevariante': !exists(json, 'relevanteAbfragevariante') ? undefined : AbfragevarianteDtoFromJSON(json['relevanteAbfragevariante']),
    };
}

export function BauvorhabenDtoToJSON(value?: BauvorhabenDto | null): any {
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
        'nameVorhaben': value.nameVorhaben,
        'grundstuecksgroesse': value.grundstuecksgroesse,
        'standVorhaben': value.standVorhaben,
        'bauvorhabenNummer': value.bauvorhabenNummer,
        'adresse': AdresseDtoToJSON(value.adresse),
        'verortung': VerortungDtoToJSON(value.verortung),
        'allgemeineOrtsangabe': value.allgemeineOrtsangabe,
        'bebauungsplannummer': value.bebauungsplannummer,
        'fisNummer': value.fisNummer,
        'anmerkung': value.anmerkung,
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'sobonJahr': value.sobonJahr,
        'planungsrecht': value.planungsrecht,
        'artFnp': value.artFnp,
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
        'relevanteAbfragevariante': AbfragevarianteDtoToJSON(value.relevanteAbfragevariante),
    };
}

