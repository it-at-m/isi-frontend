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
/**
 * 
 * @export
 * @interface InformationResponseDto
 */
export interface InformationResponseDto {
    /**
     * 
     * @type {string}
     * @memberof InformationResponseDto
     */
    type?: InformationResponseDtoTypeEnum;
    /**
     * 
     * @type {Date}
     * @memberof InformationResponseDto
     */
    timestamp?: Date;
    /**
     * 
     * @type {string}
     * @memberof InformationResponseDto
     */
    traceId?: string;
    /**
     * 
     * @type {string}
     * @memberof InformationResponseDto
     */
    spanId?: string;
    /**
     * 
     * @type {number}
     * @memberof InformationResponseDto
     */
    httpStatus?: number;
    /**
     * 
     * @type {string}
     * @memberof InformationResponseDto
     */
    originalException?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof InformationResponseDto
     */
    messages?: Array<string>;
}


/**
 * @export
 */
export const InformationResponseDtoTypeEnum = {
    Error: 'ERROR',
    Warning: 'WARNING',
    InformationSuccess: 'INFORMATION_SUCCESS',
    InformationNeutral: 'INFORMATION_NEUTRAL'
} as const;
export type InformationResponseDtoTypeEnum = typeof InformationResponseDtoTypeEnum[keyof typeof InformationResponseDtoTypeEnum];


export function InformationResponseDtoFromJSON(json: any): InformationResponseDto {
    return InformationResponseDtoFromJSONTyped(json, false);
}

export function InformationResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InformationResponseDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'timestamp': !exists(json, 'timestamp') ? undefined : (new Date(json['timestamp'])),
        'traceId': !exists(json, 'traceId') ? undefined : json['traceId'],
        'spanId': !exists(json, 'spanId') ? undefined : json['spanId'],
        'httpStatus': !exists(json, 'httpStatus') ? undefined : json['httpStatus'],
        'originalException': !exists(json, 'originalException') ? undefined : json['originalException'],
        'messages': !exists(json, 'messages') ? undefined : json['messages'],
    };
}

export function InformationResponseDtoToJSON(value?: InformationResponseDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'timestamp': value.timestamp === undefined ? undefined : (value.timestamp.toISOString()),
        'traceId': value.traceId,
        'spanId': value.spanId,
        'httpStatus': value.httpStatus,
        'originalException': value.originalException,
        'messages': value.messages,
    };
}

