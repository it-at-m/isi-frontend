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
    AbfragevarianteSachbearbeitungDto,
    AbfragevarianteSachbearbeitungDtoFromJSON,
    AbfragevarianteSachbearbeitungDtoFromJSONTyped,
    AbfragevarianteSachbearbeitungDtoToJSON,
} from './AbfragevarianteSachbearbeitungDto';
import {
    BauabschnittDto,
    BauabschnittDtoFromJSON,
    BauabschnittDtoFromJSONTyped,
    BauabschnittDtoToJSON,
} from './BauabschnittDto';

/**
 * 
 * @export
 * @interface AbfragevarianteDto
 */
export interface AbfragevarianteDto {
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteDto
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteDto
     */
    createdDateTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbfragevarianteDto
     */
    lastModifiedDateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    abfragevariantenNr?: number;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteDto
     */
    abfragevariantenName?: string;
    /**
     * 
     * @type {string}
     * @memberof AbfragevarianteDto
     */
    planungsrecht?: AbfragevarianteDtoPlanungsrechtEnum;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    geschossflaecheWohnen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    geschossflaecheWohnenGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    geschossflaecheWohnenFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    geschossflaecheWohnenSoBoNursaechlich?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    geschossflaecheWohnenBestandswohnbaurecht?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    gesamtanzahlWe?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    anzahlWeBaurechtlichGenehmigt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    anzahlWeBaurechtlichFestgesetzt?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    realisierungVon?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    geschossflaecheGenossenschaftlicheWohnungen?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteDto
     */
    sonderwohnformen?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    geschossflaecheStudentenwohnungen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    geschossflaecheSeniorenwohnungen?: number;
    /**
     * 
     * @type {number}
     * @memberof AbfragevarianteDto
     */
    geschossflaecheSonstiges?: number;
    /**
     * 
     * @type {Array<BauabschnittDto>}
     * @memberof AbfragevarianteDto
     */
    bauabschnitte?: Array<BauabschnittDto>;
    /**
     * 
     * @type {AbfragevarianteSachbearbeitungDto}
     * @memberof AbfragevarianteDto
     */
    abfragevarianteSachbearbeitung?: AbfragevarianteSachbearbeitungDto;
    /**
     * 
     * @type {boolean}
     * @memberof AbfragevarianteDto
     */
    relevant?: boolean;
}


/**
 * @export
 */
export const AbfragevarianteDtoPlanungsrechtEnum = {
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
export type AbfragevarianteDtoPlanungsrechtEnum = typeof AbfragevarianteDtoPlanungsrechtEnum[keyof typeof AbfragevarianteDtoPlanungsrechtEnum];


export function AbfragevarianteDtoFromJSON(json: any): AbfragevarianteDto {
    return AbfragevarianteDtoFromJSONTyped(json, false);
}

export function AbfragevarianteDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbfragevarianteDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'createdDateTime': !exists(json, 'createdDateTime') ? undefined : (new Date(json['createdDateTime'])),
        'lastModifiedDateTime': !exists(json, 'lastModifiedDateTime') ? undefined : (new Date(json['lastModifiedDateTime'])),
        'abfragevariantenNr': !exists(json, 'abfragevariantenNr') ? undefined : json['abfragevariantenNr'],
        'abfragevariantenName': !exists(json, 'abfragevariantenName') ? undefined : json['abfragevariantenName'],
        'planungsrecht': !exists(json, 'planungsrecht') ? undefined : json['planungsrecht'],
        'geschossflaecheWohnen': !exists(json, 'geschossflaecheWohnen') ? undefined : json['geschossflaecheWohnen'],
        'geschossflaecheWohnenGenehmigt': !exists(json, 'geschossflaecheWohnenGenehmigt') ? undefined : json['geschossflaecheWohnenGenehmigt'],
        'geschossflaecheWohnenFestgesetzt': !exists(json, 'geschossflaecheWohnenFestgesetzt') ? undefined : json['geschossflaecheWohnenFestgesetzt'],
        'geschossflaecheWohnenSoBoNursaechlich': !exists(json, 'geschossflaecheWohnenSoBoNursaechlich') ? undefined : json['geschossflaecheWohnenSoBoNursaechlich'],
        'geschossflaecheWohnenBestandswohnbaurecht': !exists(json, 'geschossflaecheWohnenBestandswohnbaurecht') ? undefined : json['geschossflaecheWohnenBestandswohnbaurecht'],
        'gesamtanzahlWe': !exists(json, 'gesamtanzahlWe') ? undefined : json['gesamtanzahlWe'],
        'anzahlWeBaurechtlichGenehmigt': !exists(json, 'anzahlWeBaurechtlichGenehmigt') ? undefined : json['anzahlWeBaurechtlichGenehmigt'],
        'anzahlWeBaurechtlichFestgesetzt': !exists(json, 'anzahlWeBaurechtlichFestgesetzt') ? undefined : json['anzahlWeBaurechtlichFestgesetzt'],
        'realisierungVon': !exists(json, 'realisierungVon') ? undefined : json['realisierungVon'],
        'geschossflaecheGenossenschaftlicheWohnungen': !exists(json, 'geschossflaecheGenossenschaftlicheWohnungen') ? undefined : json['geschossflaecheGenossenschaftlicheWohnungen'],
        'sonderwohnformen': !exists(json, 'sonderwohnformen') ? undefined : json['sonderwohnformen'],
        'geschossflaecheStudentenwohnungen': !exists(json, 'geschossflaecheStudentenwohnungen') ? undefined : json['geschossflaecheStudentenwohnungen'],
        'geschossflaecheSeniorenwohnungen': !exists(json, 'geschossflaecheSeniorenwohnungen') ? undefined : json['geschossflaecheSeniorenwohnungen'],
        'geschossflaecheSonstiges': !exists(json, 'geschossflaecheSonstiges') ? undefined : json['geschossflaecheSonstiges'],
        'bauabschnitte': !exists(json, 'bauabschnitte') ? undefined : ((json['bauabschnitte'] as Array<any>).map(BauabschnittDtoFromJSON)),
        'abfragevarianteSachbearbeitung': !exists(json, 'abfragevarianteSachbearbeitung') ? undefined : AbfragevarianteSachbearbeitungDtoFromJSON(json['abfragevarianteSachbearbeitung']),
        'relevant': !exists(json, 'relevant') ? undefined : json['relevant'],
    };
}

export function AbfragevarianteDtoToJSON(value?: AbfragevarianteDto | null): any {
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
        'abfragevariantenNr': value.abfragevariantenNr,
        'abfragevariantenName': value.abfragevariantenName,
        'planungsrecht': value.planungsrecht,
        'geschossflaecheWohnen': value.geschossflaecheWohnen,
        'geschossflaecheWohnenGenehmigt': value.geschossflaecheWohnenGenehmigt,
        'geschossflaecheWohnenFestgesetzt': value.geschossflaecheWohnenFestgesetzt,
        'geschossflaecheWohnenSoBoNursaechlich': value.geschossflaecheWohnenSoBoNursaechlich,
        'geschossflaecheWohnenBestandswohnbaurecht': value.geschossflaecheWohnenBestandswohnbaurecht,
        'gesamtanzahlWe': value.gesamtanzahlWe,
        'anzahlWeBaurechtlichGenehmigt': value.anzahlWeBaurechtlichGenehmigt,
        'anzahlWeBaurechtlichFestgesetzt': value.anzahlWeBaurechtlichFestgesetzt,
        'realisierungVon': value.realisierungVon,
        'geschossflaecheGenossenschaftlicheWohnungen': value.geschossflaecheGenossenschaftlicheWohnungen,
        'sonderwohnformen': value.sonderwohnformen,
        'geschossflaecheStudentenwohnungen': value.geschossflaecheStudentenwohnungen,
        'geschossflaecheSeniorenwohnungen': value.geschossflaecheSeniorenwohnungen,
        'geschossflaecheSonstiges': value.geschossflaecheSonstiges,
        'bauabschnitte': value.bauabschnitte === undefined ? undefined : ((value.bauabschnitte as Array<any>).map(BauabschnittDtoToJSON)),
        'abfragevarianteSachbearbeitung': AbfragevarianteSachbearbeitungDtoToJSON(value.abfragevarianteSachbearbeitung),
        'relevant': value.relevant,
    };
}

