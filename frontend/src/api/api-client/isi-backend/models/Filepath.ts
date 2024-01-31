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
 * @interface Filepath
 */
export interface Filepath {
    /**
     * 
     * @type {string}
     * @memberof Filepath
     */
    pathToFile?: string;
}

/**
 * Check if a given object implements the Filepath interface.
 */
export function instanceOfFilepath(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FilepathFromJSON(json: any): Filepath {
    return FilepathFromJSONTyped(json, false);
}

export function FilepathFromJSONTyped(json: any, ignoreDiscriminator: boolean): Filepath {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pathToFile': !exists(json, 'pathToFile') ? undefined : json['pathToFile'],
    };
}

export function FilepathToJSON(value?: Filepath | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pathToFile': value.pathToFile,
    };
}

