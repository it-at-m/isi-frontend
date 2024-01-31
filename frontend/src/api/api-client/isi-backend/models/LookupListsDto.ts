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
import type { LookupListDto } from './LookupListDto';
import {
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
    standVerfahrenBauleitplanverfahren?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    standVerfahrenBaugenehmigungsverfahren?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    standVerfahrenWeiteresVerfahren?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    standVerfahren?: LookupListDto;
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
    wesentlicheRechtsgrundlageBauleitplanverfahren?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    wesentlicheRechtsgrundlageBaugenehmigungsverfahren?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    wesentlicheRechtsgrundlage?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    artBaulicheNutzung?: LookupListDto;
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    artBaulicheNutzungBauvorhaben?: LookupListDto;
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
    einrichtungstraegerSchulen?: LookupListDto;
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
    /**
     * 
     * @type {LookupListDto}
     * @memberof LookupListsDto
     */
    sobonOrientierungswertJahrWithoutStandortabfrage?: LookupListDto;
}

/**
 * Check if a given object implements the LookupListsDto interface.
 */
export function instanceOfLookupListsDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
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
        'standVerfahrenBauleitplanverfahren': !exists(json, 'standVerfahrenBauleitplanverfahren') ? undefined : LookupListDtoFromJSON(json['standVerfahrenBauleitplanverfahren']),
        'standVerfahrenBaugenehmigungsverfahren': !exists(json, 'standVerfahrenBaugenehmigungsverfahren') ? undefined : LookupListDtoFromJSON(json['standVerfahrenBaugenehmigungsverfahren']),
        'standVerfahrenWeiteresVerfahren': !exists(json, 'standVerfahrenWeiteresVerfahren') ? undefined : LookupListDtoFromJSON(json['standVerfahrenWeiteresVerfahren']),
        'standVerfahren': !exists(json, 'standVerfahren') ? undefined : LookupListDtoFromJSON(json['standVerfahren']),
        'statusAbfrage': !exists(json, 'statusAbfrage') ? undefined : LookupListDtoFromJSON(json['statusAbfrage']),
        'wesentlicheRechtsgrundlageBauleitplanverfahren': !exists(json, 'wesentlicheRechtsgrundlageBauleitplanverfahren') ? undefined : LookupListDtoFromJSON(json['wesentlicheRechtsgrundlageBauleitplanverfahren']),
        'wesentlicheRechtsgrundlageBaugenehmigungsverfahren': !exists(json, 'wesentlicheRechtsgrundlageBaugenehmigungsverfahren') ? undefined : LookupListDtoFromJSON(json['wesentlicheRechtsgrundlageBaugenehmigungsverfahren']),
        'wesentlicheRechtsgrundlage': !exists(json, 'wesentlicheRechtsgrundlage') ? undefined : LookupListDtoFromJSON(json['wesentlicheRechtsgrundlage']),
        'artBaulicheNutzung': !exists(json, 'artBaulicheNutzung') ? undefined : LookupListDtoFromJSON(json['artBaulicheNutzung']),
        'artBaulicheNutzungBauvorhaben': !exists(json, 'artBaulicheNutzungBauvorhaben') ? undefined : LookupListDtoFromJSON(json['artBaulicheNutzungBauvorhaben']),
        'statusInfrastruktureinrichtung': !exists(json, 'statusInfrastruktureinrichtung') ? undefined : LookupListDtoFromJSON(json['statusInfrastruktureinrichtung']),
        'einrichtungstraeger': !exists(json, 'einrichtungstraeger') ? undefined : LookupListDtoFromJSON(json['einrichtungstraeger']),
        'einrichtungstraegerSchulen': !exists(json, 'einrichtungstraegerSchulen') ? undefined : LookupListDtoFromJSON(json['einrichtungstraegerSchulen']),
        'infrastruktureinrichtungTyp': !exists(json, 'infrastruktureinrichtungTyp') ? undefined : LookupListDtoFromJSON(json['infrastruktureinrichtungTyp']),
        'artGsNachmittagBetreuung': !exists(json, 'artGsNachmittagBetreuung') ? undefined : LookupListDtoFromJSON(json['artGsNachmittagBetreuung']),
        'sobonOrientierungswertJahr': !exists(json, 'sobonOrientierungswertJahr') ? undefined : LookupListDtoFromJSON(json['sobonOrientierungswertJahr']),
        'sobonOrientierungswertJahrWithoutStandortabfrage': !exists(json, 'sobonOrientierungswertJahrWithoutStandortabfrage') ? undefined : LookupListDtoFromJSON(json['sobonOrientierungswertJahrWithoutStandortabfrage']),
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
        'standVerfahrenBauleitplanverfahren': LookupListDtoToJSON(value.standVerfahrenBauleitplanverfahren),
        'standVerfahrenBaugenehmigungsverfahren': LookupListDtoToJSON(value.standVerfahrenBaugenehmigungsverfahren),
        'standVerfahrenWeiteresVerfahren': LookupListDtoToJSON(value.standVerfahrenWeiteresVerfahren),
        'standVerfahren': LookupListDtoToJSON(value.standVerfahren),
        'statusAbfrage': LookupListDtoToJSON(value.statusAbfrage),
        'wesentlicheRechtsgrundlageBauleitplanverfahren': LookupListDtoToJSON(value.wesentlicheRechtsgrundlageBauleitplanverfahren),
        'wesentlicheRechtsgrundlageBaugenehmigungsverfahren': LookupListDtoToJSON(value.wesentlicheRechtsgrundlageBaugenehmigungsverfahren),
        'wesentlicheRechtsgrundlage': LookupListDtoToJSON(value.wesentlicheRechtsgrundlage),
        'artBaulicheNutzung': LookupListDtoToJSON(value.artBaulicheNutzung),
        'artBaulicheNutzungBauvorhaben': LookupListDtoToJSON(value.artBaulicheNutzungBauvorhaben),
        'statusInfrastruktureinrichtung': LookupListDtoToJSON(value.statusInfrastruktureinrichtung),
        'einrichtungstraeger': LookupListDtoToJSON(value.einrichtungstraeger),
        'einrichtungstraegerSchulen': LookupListDtoToJSON(value.einrichtungstraegerSchulen),
        'infrastruktureinrichtungTyp': LookupListDtoToJSON(value.infrastruktureinrichtungTyp),
        'artGsNachmittagBetreuung': LookupListDtoToJSON(value.artGsNachmittagBetreuung),
        'sobonOrientierungswertJahr': LookupListDtoToJSON(value.sobonOrientierungswertJahr),
        'sobonOrientierungswertJahrWithoutStandortabfrage': LookupListDtoToJSON(value.sobonOrientierungswertJahrWithoutStandortabfrage),
    };
}

