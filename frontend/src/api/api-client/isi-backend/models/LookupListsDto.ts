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
    LookupListDto,
    LookupListDtoFromJSON,
    LookupListDtoFromJSONTyped,
    LookupListDtoToJSON,
} from './LookupListDto';

/**
 * 
 * @export
 * @interface LookupListsDto
 */
export interface LookupListsDto {
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    uncertainBoolean?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    artDokument?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    artAbfrage?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    sobonVerfahrensgrundsaetzeJahr?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    standVorhaben?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    statusAbfrage?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    planungsrecht?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    baugebietArt?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    statusInfrastruktureinrichtung?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    einrichtungstraeger?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    infrastruktureinrichtungTyp?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    artGsNachmittagBetreuung?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    sobonOrientierungswertJahr?: LookupListDto;
}

export function LookupListsDtoFromJSON(json: any): LookupListsDto {
    return LookupListsDtoFromJSONTyped(json, false);
}

export function LookupListsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LookupListsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uncertainBoolean': !exists(json, 'uncertainBoolean') ? undefined : LookupListDtoFromJSON(json['uncertainBoolean']),
        'artDokument': !exists(json, 'artDokument') ? undefined : LookupListDtoFromJSON(json['artDokument']),
        'artAbfrage': !exists(json, 'artAbfrage') ? undefined : LookupListDtoFromJSON(json['artAbfrage']),
        'sobonVerfahrensgrundsaetzeJahr': !exists(json, 'sobonVerfahrensgrundsaetzeJahr') ? undefined : LookupListDtoFromJSON(json['sobonVerfahrensgrundsaetzeJahr']),
        'standVorhaben': !exists(json, 'standVorhaben') ? undefined : LookupListDtoFromJSON(json['standVorhaben']),
        'statusAbfrage': !exists(json, 'statusAbfrage') ? undefined : LookupListDtoFromJSON(json['statusAbfrage']),
        'planungsrecht': !exists(json, 'planungsrecht') ? undefined : LookupListDtoFromJSON(json['planungsrecht']),
        'baugebietArt': !exists(json, 'baugebietArt') ? undefined : LookupListDtoFromJSON(json['baugebietArt']),
        'statusInfrastruktureinrichtung': !exists(json, 'statusInfrastruktureinrichtung') ? undefined : LookupListDtoFromJSON(json['statusInfrastruktureinrichtung']),
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : LookupListDtoFromJSON(json['einrichtungstraeger']),
        'infrastruktureinrichtungTyp': !exists(json, 'infrastruktureinrichtungTyp') ? undefined : LookupListDtoFromJSON(json['infrastruktureinrichtungTyp']),
        'artGsNachmittagBetreuung': !exists(json, 'artGsNachmittagBetreuung') ? undefined : LookupListDtoFromJSON(json['artGsNachmittagBetreuung']),
        'sobonOrientierungswertJahr': !exists(json, 'sobonOrientierungswertJahr') ? undefined : LookupListDtoFromJSON(json['sobonOrientierungswertJahr']),
    };
}

export function LookupListsDtoToJSON(value?: LookupListsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uncertainBoolean': LookupListDtoToJSON(value.uncertainBoolean),
        'artDokument': LookupListDtoToJSON(value.artDokument),
        'artAbfrage': LookupListDtoToJSON(value.artAbfrage),
        'sobonVerfahrensgrundsaetzeJahr': LookupListDtoToJSON(value.sobonVerfahrensgrundsaetzeJahr),
        'standVorhaben': LookupListDtoToJSON(value.standVorhaben),
        'statusAbfrage': LookupListDtoToJSON(value.statusAbfrage),
        'planungsrecht': LookupListDtoToJSON(value.planungsrecht),
        'baugebietArt': LookupListDtoToJSON(value.baugebietArt),
        'statusInfrastruktureinrichtung': LookupListDtoToJSON(value.statusInfrastruktureinrichtung),
        'einrichtungstraeger': LookupListDtoToJSON(value.einrichtungstraeger),
        'infrastruktureinrichtungTyp': LookupListDtoToJSON(value.infrastruktureinrichtungTyp),
        'artGsNachmittagBetreuung': LookupListDtoToJSON(value.artGsNachmittagBetreuung),
        'sobonOrientierungswertJahr': LookupListDtoToJSON(value.sobonOrientierungswertJahr),
    };
}

