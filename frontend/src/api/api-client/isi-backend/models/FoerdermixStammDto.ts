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

import { exists, mapValues } from "../runtime";
import { FoerdermixDto, FoerdermixDtoFromJSON, FoerdermixDtoFromJSONTyped, FoerdermixDtoToJSON } from "./FoerdermixDto";

/**
 *
 * @export
 * @interface FoerdermixStammDto
 */
export interface FoerdermixStammDto {
  /**
   *
   * @type {string}
   * @memberof FoerdermixStammDto
   */
  id?: string;
  /**
   *
   * @type {number}
   * @memberof FoerdermixStammDto
   */
  version?: number;
  /**
   *
   * @type {Date}
   * @memberof FoerdermixStammDto
   */
  createdDateTime?: Date;
  /**
   *
   * @type {Date}
   * @memberof FoerdermixStammDto
   */
  lastModifiedDateTime?: Date;
  /**
   *
   * @type {string}
   * @memberof FoerdermixStammDto
   */
  bezeichnungJahr: string;
  /**
   *
   * @type {string}
   * @memberof FoerdermixStammDto
   */
  bezeichnung: string;
  /**
   *
   * @type {FoerdermixDto}
   * @memberof FoerdermixStammDto
   */
  foerdermix: FoerdermixDto;
}

export function FoerdermixStammDtoFromJSON(json: any): FoerdermixStammDto {
  return FoerdermixStammDtoFromJSONTyped(json, false);
}

export function FoerdermixStammDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FoerdermixStammDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    version: !exists(json, "version") ? undefined : json["version"],
    createdDateTime: !exists(json, "createdDateTime") ? undefined : new Date(json["createdDateTime"]),
    lastModifiedDateTime: !exists(json, "lastModifiedDateTime") ? undefined : new Date(json["lastModifiedDateTime"]),
    bezeichnungJahr: json["bezeichnungJahr"],
    bezeichnung: json["bezeichnung"],
    foerdermix: FoerdermixDtoFromJSON(json["foerdermix"]),
  };
}

export function FoerdermixStammDtoToJSON(value?: FoerdermixStammDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    version: value.version,
    createdDateTime: value.createdDateTime === undefined ? undefined : value.createdDateTime.toISOString(),
    lastModifiedDateTime:
      value.lastModifiedDateTime === undefined ? undefined : value.lastModifiedDateTime.toISOString(),
    bezeichnungJahr: value.bezeichnungJahr,
    bezeichnung: value.bezeichnung,
    foerdermix: FoerdermixDtoToJSON(value.foerdermix),
  };
}
