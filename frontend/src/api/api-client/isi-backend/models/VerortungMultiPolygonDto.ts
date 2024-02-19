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
import type { BezirksteilDto } from './BezirksteilDto';
import {
    BezirksteilDtoFromJSON,
    BezirksteilDtoFromJSONTyped,
    BezirksteilDtoToJSON,
} from './BezirksteilDto';
import type { GemarkungDto } from './GemarkungDto';
import {
    GemarkungDtoFromJSON,
    GemarkungDtoFromJSONTyped,
    GemarkungDtoToJSON,
} from './GemarkungDto';
import type { GrundschulsprengelDto } from './GrundschulsprengelDto';
import {
    GrundschulsprengelDtoFromJSON,
    GrundschulsprengelDtoFromJSONTyped,
    GrundschulsprengelDtoToJSON,
} from './GrundschulsprengelDto';
import type { KitaplanungsbereichDto } from './KitaplanungsbereichDto';
import {
    KitaplanungsbereichDtoFromJSON,
    KitaplanungsbereichDtoFromJSONTyped,
    KitaplanungsbereichDtoToJSON,
} from './KitaplanungsbereichDto';
import type { MittelschulsprengelDto } from './MittelschulsprengelDto';
import {
    MittelschulsprengelDtoFromJSON,
    MittelschulsprengelDtoFromJSONTyped,
    MittelschulsprengelDtoToJSON,
} from './MittelschulsprengelDto';
import type { MultiPolygonGeometryDto } from './MultiPolygonGeometryDto';
import {
    MultiPolygonGeometryDtoFromJSON,
    MultiPolygonGeometryDtoFromJSONTyped,
    MultiPolygonGeometryDtoToJSON,
} from './MultiPolygonGeometryDto';
import type { StadtbezirkDto } from './StadtbezirkDto';
import {
    StadtbezirkDtoFromJSON,
    StadtbezirkDtoFromJSONTyped,
    StadtbezirkDtoToJSON,
} from './StadtbezirkDto';

/**
 * 
 * @export
 * @interface VerortungMultiPolygonDto
 */
export interface VerortungMultiPolygonDto {
    /**
     * 
     * @type {Set<StadtbezirkDto>}
     * @memberof VerortungMultiPolygonDto
     */
    stadtbezirke: Set<StadtbezirkDto>;
    /**
     * 
     * @type {Set<BezirksteilDto>}
     * @memberof VerortungMultiPolygonDto
     */
    bezirksteile: Set<BezirksteilDto>;
    /**
     * 
     * @type {Set<GemarkungDto>}
     * @memberof VerortungMultiPolygonDto
     */
    gemarkungen: Set<GemarkungDto>;
    /**
     * 
     * @type {Set<KitaplanungsbereichDto>}
     * @memberof VerortungMultiPolygonDto
     */
    kitaplanungsbereiche: Set<KitaplanungsbereichDto>;
    /**
     * 
     * @type {Set<GrundschulsprengelDto>}
     * @memberof VerortungMultiPolygonDto
     */
    grundschulsprengel: Set<GrundschulsprengelDto>;
    /**
     * 
     * @type {Set<MittelschulsprengelDto>}
     * @memberof VerortungMultiPolygonDto
     */
    mittelschulsprengel: Set<MittelschulsprengelDto>;
    /**
     * 
     * @type {MultiPolygonGeometryDto}
     * @memberof VerortungMultiPolygonDto
     */
    multiPolygon: MultiPolygonGeometryDto;
}

/**
 * Check if a given object implements the VerortungMultiPolygonDto interface.
 */
export function instanceOfVerortungMultiPolygonDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "stadtbezirke" in value;
    isInstance = isInstance && "bezirksteile" in value;
    isInstance = isInstance && "gemarkungen" in value;
    isInstance = isInstance && "kitaplanungsbereiche" in value;
    isInstance = isInstance && "grundschulsprengel" in value;
    isInstance = isInstance && "mittelschulsprengel" in value;
    isInstance = isInstance && "multiPolygon" in value;

    return isInstance;
}

export function VerortungMultiPolygonDtoFromJSON(json: any): VerortungMultiPolygonDto {
    return VerortungMultiPolygonDtoFromJSONTyped(json, false);
}

export function VerortungMultiPolygonDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerortungMultiPolygonDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'stadtbezirke': (new Set((json['stadtbezirke'] as Array<any>).map(StadtbezirkDtoFromJSON))),
        'bezirksteile': (new Set((json['bezirksteile'] as Array<any>).map(BezirksteilDtoFromJSON))),
        'gemarkungen': (new Set((json['gemarkungen'] as Array<any>).map(GemarkungDtoFromJSON))),
        'kitaplanungsbereiche': (new Set((json['kitaplanungsbereiche'] as Array<any>).map(KitaplanungsbereichDtoFromJSON))),
        'grundschulsprengel': (new Set((json['grundschulsprengel'] as Array<any>).map(GrundschulsprengelDtoFromJSON))),
        'mittelschulsprengel': (new Set((json['mittelschulsprengel'] as Array<any>).map(MittelschulsprengelDtoFromJSON))),
        'multiPolygon': MultiPolygonGeometryDtoFromJSON(json['multiPolygon']),
    };
}

export function VerortungMultiPolygonDtoToJSON(value?: VerortungMultiPolygonDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'stadtbezirke': (Array.from(value.stadtbezirke as Set<any>).map(StadtbezirkDtoToJSON)),
        'bezirksteile': (Array.from(value.bezirksteile as Set<any>).map(BezirksteilDtoToJSON)),
        'gemarkungen': (Array.from(value.gemarkungen as Set<any>).map(GemarkungDtoToJSON)),
        'kitaplanungsbereiche': (Array.from(value.kitaplanungsbereiche as Set<any>).map(KitaplanungsbereichDtoToJSON)),
        'grundschulsprengel': (Array.from(value.grundschulsprengel as Set<any>).map(GrundschulsprengelDtoToJSON)),
        'mittelschulsprengel': (Array.from(value.mittelschulsprengel as Set<any>).map(MittelschulsprengelDtoToJSON)),
        'multiPolygon': MultiPolygonGeometryDtoToJSON(value.multiPolygon),
    };
}

