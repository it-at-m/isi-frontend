/* tslint:disable */
/* eslint-disable */
/**
 * ISI Backend API
 * ISI Backend - Service für das Informationssystem für soziale Infrastrukturplanung
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: noreply@mail.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { InfrastrukturbedarfProJahrDto } from './InfrastrukturbedarfProJahrDto';
import {
    InfrastrukturbedarfProJahrDtoFromJSON,
    InfrastrukturbedarfProJahrDtoFromJSONTyped,
    InfrastrukturbedarfProJahrDtoToJSON,
} from './InfrastrukturbedarfProJahrDto';
import type { PersonenProJahrDto } from './PersonenProJahrDto';
import {
    PersonenProJahrDtoFromJSON,
    PersonenProJahrDtoFromJSONTyped,
    PersonenProJahrDtoToJSON,
} from './PersonenProJahrDto';
import type { WohneinheitenProFoerderartProJahrDto } from './WohneinheitenProFoerderartProJahrDto';
import {
    WohneinheitenProFoerderartProJahrDtoFromJSON,
    WohneinheitenProFoerderartProJahrDtoFromJSONTyped,
    WohneinheitenProFoerderartProJahrDtoToJSON,
} from './WohneinheitenProFoerderartProJahrDto';

/**
 * 
 * @export
 * @interface LangfristigerPlanungsursaechlicherBedarfDto
 */
export interface LangfristigerPlanungsursaechlicherBedarfDto {
    /**
     * 
     * @type {Array<WohneinheitenProFoerderartProJahrDto>}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    wohneinheiten: Array<WohneinheitenProFoerderartProJahrDto>;
    /**
     * 
     * @type {Array<WohneinheitenProFoerderartProJahrDto>}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    wohneinheitenSumme10Jahre: Array<WohneinheitenProFoerderartProJahrDto>;
    /**
     * 
     * @type {Array<WohneinheitenProFoerderartProJahrDto>}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    wohneinheitenSumme15Jahre: Array<WohneinheitenProFoerderartProJahrDto>;
    /**
     * 
     * @type {Array<WohneinheitenProFoerderartProJahrDto>}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    wohneinheitenSumme20Jahre: Array<WohneinheitenProFoerderartProJahrDto>;
    /**
     * 
     * @type {Array<WohneinheitenProFoerderartProJahrDto>}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    wohneinheitenGesamt: Array<WohneinheitenProFoerderartProJahrDto>;
    /**
     * 
     * @type {Array<InfrastrukturbedarfProJahrDto>}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    bedarfKinderkrippe: Array<InfrastrukturbedarfProJahrDto>;
    /**
     * 
     * @type {InfrastrukturbedarfProJahrDto}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    bedarfKinderkrippeMittelwert10: InfrastrukturbedarfProJahrDto;
    /**
     * 
     * @type {InfrastrukturbedarfProJahrDto}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    bedarfKinderkrippeMittelwert15: InfrastrukturbedarfProJahrDto;
    /**
     * 
     * @type {InfrastrukturbedarfProJahrDto}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    bedarfKinderkrippeMittelwert20: InfrastrukturbedarfProJahrDto;
    /**
     * 
     * @type {Array<InfrastrukturbedarfProJahrDto>}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    bedarfKindergarten: Array<InfrastrukturbedarfProJahrDto>;
    /**
     * 
     * @type {InfrastrukturbedarfProJahrDto}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    bedarfKindergartenMittelwert10: InfrastrukturbedarfProJahrDto;
    /**
     * 
     * @type {InfrastrukturbedarfProJahrDto}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    bedarfKindergartenMittelwert15: InfrastrukturbedarfProJahrDto;
    /**
     * 
     * @type {InfrastrukturbedarfProJahrDto}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    bedarfKindergartenMittelwert20: InfrastrukturbedarfProJahrDto;
    /**
     * 
     * @type {Array<PersonenProJahrDto>}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    alleEinwohner: Array<PersonenProJahrDto>;
    /**
     * 
     * @type {PersonenProJahrDto}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    alleEinwohnerMittelwert10: PersonenProJahrDto;
    /**
     * 
     * @type {PersonenProJahrDto}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    alleEinwohnerMittelwert15: PersonenProJahrDto;
    /**
     * 
     * @type {PersonenProJahrDto}
     * @memberof LangfristigerPlanungsursaechlicherBedarfDto
     */
    alleEinwohnerMittelwert20: PersonenProJahrDto;
}

/**
 * Check if a given object implements the LangfristigerPlanungsursaechlicherBedarfDto interface.
 */
export function instanceOfLangfristigerPlanungsursaechlicherBedarfDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "wohneinheiten" in value;
    isInstance = isInstance && "wohneinheitenSumme10Jahre" in value;
    isInstance = isInstance && "wohneinheitenSumme15Jahre" in value;
    isInstance = isInstance && "wohneinheitenSumme20Jahre" in value;
    isInstance = isInstance && "wohneinheitenGesamt" in value;
    isInstance = isInstance && "bedarfKinderkrippe" in value;
    isInstance = isInstance && "bedarfKinderkrippeMittelwert10" in value;
    isInstance = isInstance && "bedarfKinderkrippeMittelwert15" in value;
    isInstance = isInstance && "bedarfKinderkrippeMittelwert20" in value;
    isInstance = isInstance && "bedarfKindergarten" in value;
    isInstance = isInstance && "bedarfKindergartenMittelwert10" in value;
    isInstance = isInstance && "bedarfKindergartenMittelwert15" in value;
    isInstance = isInstance && "bedarfKindergartenMittelwert20" in value;
    isInstance = isInstance && "alleEinwohner" in value;
    isInstance = isInstance && "alleEinwohnerMittelwert10" in value;
    isInstance = isInstance && "alleEinwohnerMittelwert15" in value;
    isInstance = isInstance && "alleEinwohnerMittelwert20" in value;

    return isInstance;
}

export function LangfristigerPlanungsursaechlicherBedarfDtoFromJSON(json: any): LangfristigerPlanungsursaechlicherBedarfDto {
    return LangfristigerPlanungsursaechlicherBedarfDtoFromJSONTyped(json, false);
}

export function LangfristigerPlanungsursaechlicherBedarfDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LangfristigerPlanungsursaechlicherBedarfDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'wohneinheiten': ((json['wohneinheiten'] as Array<any>).map(WohneinheitenProFoerderartProJahrDtoFromJSON)),
        'wohneinheitenSumme10Jahre': ((json['wohneinheitenSumme10Jahre'] as Array<any>).map(WohneinheitenProFoerderartProJahrDtoFromJSON)),
        'wohneinheitenSumme15Jahre': ((json['wohneinheitenSumme15Jahre'] as Array<any>).map(WohneinheitenProFoerderartProJahrDtoFromJSON)),
        'wohneinheitenSumme20Jahre': ((json['wohneinheitenSumme20Jahre'] as Array<any>).map(WohneinheitenProFoerderartProJahrDtoFromJSON)),
        'wohneinheitenGesamt': ((json['wohneinheitenGesamt'] as Array<any>).map(WohneinheitenProFoerderartProJahrDtoFromJSON)),
        'bedarfKinderkrippe': ((json['bedarfKinderkrippe'] as Array<any>).map(InfrastrukturbedarfProJahrDtoFromJSON)),
        'bedarfKinderkrippeMittelwert10': InfrastrukturbedarfProJahrDtoFromJSON(json['bedarfKinderkrippeMittelwert10']),
        'bedarfKinderkrippeMittelwert15': InfrastrukturbedarfProJahrDtoFromJSON(json['bedarfKinderkrippeMittelwert15']),
        'bedarfKinderkrippeMittelwert20': InfrastrukturbedarfProJahrDtoFromJSON(json['bedarfKinderkrippeMittelwert20']),
        'bedarfKindergarten': ((json['bedarfKindergarten'] as Array<any>).map(InfrastrukturbedarfProJahrDtoFromJSON)),
        'bedarfKindergartenMittelwert10': InfrastrukturbedarfProJahrDtoFromJSON(json['bedarfKindergartenMittelwert10']),
        'bedarfKindergartenMittelwert15': InfrastrukturbedarfProJahrDtoFromJSON(json['bedarfKindergartenMittelwert15']),
        'bedarfKindergartenMittelwert20': InfrastrukturbedarfProJahrDtoFromJSON(json['bedarfKindergartenMittelwert20']),
        'alleEinwohner': ((json['alleEinwohner'] as Array<any>).map(PersonenProJahrDtoFromJSON)),
        'alleEinwohnerMittelwert10': PersonenProJahrDtoFromJSON(json['alleEinwohnerMittelwert10']),
        'alleEinwohnerMittelwert15': PersonenProJahrDtoFromJSON(json['alleEinwohnerMittelwert15']),
        'alleEinwohnerMittelwert20': PersonenProJahrDtoFromJSON(json['alleEinwohnerMittelwert20']),
    };
}

export function LangfristigerPlanungsursaechlicherBedarfDtoToJSON(value?: LangfristigerPlanungsursaechlicherBedarfDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'wohneinheiten': ((value.wohneinheiten as Array<any>).map(WohneinheitenProFoerderartProJahrDtoToJSON)),
        'wohneinheitenSumme10Jahre': ((value.wohneinheitenSumme10Jahre as Array<any>).map(WohneinheitenProFoerderartProJahrDtoToJSON)),
        'wohneinheitenSumme15Jahre': ((value.wohneinheitenSumme15Jahre as Array<any>).map(WohneinheitenProFoerderartProJahrDtoToJSON)),
        'wohneinheitenSumme20Jahre': ((value.wohneinheitenSumme20Jahre as Array<any>).map(WohneinheitenProFoerderartProJahrDtoToJSON)),
        'wohneinheitenGesamt': ((value.wohneinheitenGesamt as Array<any>).map(WohneinheitenProFoerderartProJahrDtoToJSON)),
        'bedarfKinderkrippe': ((value.bedarfKinderkrippe as Array<any>).map(InfrastrukturbedarfProJahrDtoToJSON)),
        'bedarfKinderkrippeMittelwert10': InfrastrukturbedarfProJahrDtoToJSON(value.bedarfKinderkrippeMittelwert10),
        'bedarfKinderkrippeMittelwert15': InfrastrukturbedarfProJahrDtoToJSON(value.bedarfKinderkrippeMittelwert15),
        'bedarfKinderkrippeMittelwert20': InfrastrukturbedarfProJahrDtoToJSON(value.bedarfKinderkrippeMittelwert20),
        'bedarfKindergarten': ((value.bedarfKindergarten as Array<any>).map(InfrastrukturbedarfProJahrDtoToJSON)),
        'bedarfKindergartenMittelwert10': InfrastrukturbedarfProJahrDtoToJSON(value.bedarfKindergartenMittelwert10),
        'bedarfKindergartenMittelwert15': InfrastrukturbedarfProJahrDtoToJSON(value.bedarfKindergartenMittelwert15),
        'bedarfKindergartenMittelwert20': InfrastrukturbedarfProJahrDtoToJSON(value.bedarfKindergartenMittelwert20),
        'alleEinwohner': ((value.alleEinwohner as Array<any>).map(PersonenProJahrDtoToJSON)),
        'alleEinwohnerMittelwert10': PersonenProJahrDtoToJSON(value.alleEinwohnerMittelwert10),
        'alleEinwohnerMittelwert15': PersonenProJahrDtoToJSON(value.alleEinwohnerMittelwert15),
        'alleEinwohnerMittelwert20': PersonenProJahrDtoToJSON(value.alleEinwohnerMittelwert20),
    };
}

