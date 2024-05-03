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
import type { EntityModelVersorgungsquoteGruppenstaerke } from './EntityModelVersorgungsquoteGruppenstaerke';
import {
    EntityModelVersorgungsquoteGruppenstaerkeFromJSON,
    EntityModelVersorgungsquoteGruppenstaerkeFromJSONTyped,
    EntityModelVersorgungsquoteGruppenstaerkeToJSON,
} from './EntityModelVersorgungsquoteGruppenstaerke';

/**
 * 
 * @export
 * @interface PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbedded
 */
export interface PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbedded {
    /**
     * 
     * @type {Array<EntityModelVersorgungsquoteGruppenstaerke>}
     * @memberof PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbedded
     */
    versorgungsquoteGruppenstaerkes?: Array<EntityModelVersorgungsquoteGruppenstaerke>;
}

/**
 * Check if a given object implements the PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbedded interface.
 */
export function instanceOfPagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbedded(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbeddedFromJSON(json: any): PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbedded {
    return PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbeddedFromJSONTyped(json, false);
}

export function PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbeddedFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbedded {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'versorgungsquoteGruppenstaerkes': !exists(json, 'versorgungsquoteGruppenstaerkes') ? undefined : ((json['versorgungsquoteGruppenstaerkes'] as Array<any>).map(EntityModelVersorgungsquoteGruppenstaerkeFromJSON)),
    };
}

export function PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbeddedToJSON(value?: PagedModelEntityModelVersorgungsquoteGruppenstaerkeEmbedded | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'versorgungsquoteGruppenstaerkes': value.versorgungsquoteGruppenstaerkes === undefined ? undefined : ((value.versorgungsquoteGruppenstaerkes as Array<any>).map(EntityModelVersorgungsquoteGruppenstaerkeToJSON)),
    };
}

