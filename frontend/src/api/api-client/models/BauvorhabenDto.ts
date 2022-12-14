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
     * @type {string}
     * @memberof BauvorhabenDto
     */
    eigentuemer: string;
    /**
     * 
     * @type {number}
     * @memberof BauvorhabenDto
     */
    grundstuecksgroesse: number;
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
    planungsrecht: BauvorhabenDtoPlanungsrechtEnum;
    /**
     * 
     * @type {string}
     * @memberof BauvorhabenDto
     */
    zustaendigkeit: BauvorhabenDtoZustaendigkeitEnum;
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
export const BauvorhabenDtoZustaendigkeitEnum = {
    Unspecified: 'UNSPECIFIED',
    PlanHa2: 'PLAN_HA_2',
    Kr: 'KR',
    PlanHa3: 'PLAN_HA_3',
    PlanHa4: 'PLAN_HA_4',
    PlanHa1112: 'PLAN_HA_1_11_2',
    PlanHa14: 'PLAN_HA_1_4',
    RbsSb: 'RBS_SB',
    RbsZimN: 'RBS_ZIM_N'
} as const;
export type BauvorhabenDtoZustaendigkeitEnum = typeof BauvorhabenDtoZustaendigkeitEnum[keyof typeof BauvorhabenDtoZustaendigkeitEnum];

/**
 * @export
 */
export const BauvorhabenDtoArtFnpEnum = {
    Mi: 'MI',
    Wa: 'WA',
    Mu: 'MU',
    Mk: 'MK',
    Wr: 'WR',
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
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'nameVorhaben': json['nameVorhaben'],
        'eigentuemer': json['eigentuemer'],
        'grundstuecksgroesse': json['grundstuecksgroesse'],
        'standVorhaben': json['standVorhaben'],
        'bauvorhabenNummer': json['bauvorhabenNummer'],
        'adresse': !exists(json, 'adresse') ? undefined : AdresseDtoFromJSON(json['adresse']),
        'allgemeineOrtsangabe': !exists(json, 'allgemeineOrtsangabe') ? undefined : json['allgemeineOrtsangabe'],
        'bebauungsplannummer': !exists(json, 'bebauungsplannummer') ? undefined : json['bebauungsplannummer'],
        'fisNummer': !exists(json, 'fisNummer') ? undefined : json['fisNummer'],
        'anmerkung': !exists(json, 'anmerkung') ? undefined : json['anmerkung'],
        'sobonRelevant': UncertainBooleanFromJSON(json['sobonRelevant']),
        'planungsrecht': json['planungsrecht'],
        'zustaendigkeit': json['zustaendigkeit'],
        'artFnp': json['artFnp'],
        'dokumente': !exists(json, 'dokumente') ? undefined : ((json['dokumente'] as Array<any>).map(DokumentDtoFromJSON)),
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
        'createdDateTime': value.createdDateTime === undefined ? undefined : (value.createdDateTime.toISOString()),
        'lastModifiedDateTime': value.lastModifiedDateTime === undefined ? undefined : (value.lastModifiedDateTime.toISOString()),
        'nameVorhaben': value.nameVorhaben,
        'eigentuemer': value.eigentuemer,
        'grundstuecksgroesse': value.grundstuecksgroesse,
        'standVorhaben': value.standVorhaben,
        'bauvorhabenNummer': value.bauvorhabenNummer,
        'adresse': AdresseDtoToJSON(value.adresse),
        'allgemeineOrtsangabe': value.allgemeineOrtsangabe,
        'bebauungsplannummer': value.bebauungsplannummer,
        'fisNummer': value.fisNummer,
        'anmerkung': value.anmerkung,
        'sobonRelevant': UncertainBooleanToJSON(value.sobonRelevant),
        'planungsrecht': value.planungsrecht,
        'zustaendigkeit': value.zustaendigkeit,
        'artFnp': value.artFnp,
        'dokumente': value.dokumente === undefined ? undefined : ((value.dokumente as Array<any>).map(DokumentDtoToJSON)),
    };
}

